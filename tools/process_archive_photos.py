#!/usr/bin/env python3
"""
Pipeline de Processamento Iconográfico Noir para 'Águas de Ferro'
Converte matrizes escaneadas do Museu da Cidade do Recife e fotografias de referência
em ativos WebP/JPEG otimizados de alta definição (Arquitetura Híbrida §3.2–3.4).
"""
import argparse
import io
import os
import sys
import numpy as np
from PIL import Image

PRESETS = {
    'widescreen': (1200, 570),   # 2.1:1 (40:19) — Paridade exata com SVG procedural (800x380)
    'documental': (1200, 800),   # 3:2 — Fotografia 35mm clássica
    'retrato': (450, 600),       # 3:4 — Prontuário DOPS / Relações
    'quadrado': (600, 600),      # 1:1 — Evidência recortada / Dossiê
}


def extract_photo_from_mcr_pdf(
    pdf_path: str,
    page_number: int,
    photo_index: int = 0,
    rotate_cw: bool = False,
    rotate_ccw: bool = False,
) -> Image.Image:
    """
    Extrai a matriz fotográfica de uma página do PDF do Acervo MCR (Vol. 99),
    isolando a coluna esquerda da ficha catalográfica, separando fotos empilhadas
    (photo_index=0 para superior, 1 para inferior) e permitindo rotação horária
    quando a fotografia foi colada de lado na cartolina.
    """
    try:
        import pymupdf as fitz  # PyMuPDF
    except ImportError:
        try:
            import fitz
        except ImportError as exc:
            raise RuntimeError(
                "PyMuPDF (pymupdf) é necessário para extrair páginas diretamente do PDF."
            ) from exc

    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF do acervo não encontrado: {pdf_path}")

    doc = fitz.open(pdf_path)
    if page_number < 1 or page_number > len(doc):
        raise ValueError(f"Página {page_number} fora do intervalo (1..{len(doc)}).")

    page = doc[page_number - 1]
    images = page.get_images()
    if not images:
        raise RuntimeError(f"Nenhuma imagem encontrada na página {page_number} do PDF.")

    xref = images[0][0]
    base_img = doc.extract_image(xref)
    img = Image.open(io.BytesIO(base_img["image"])).convert("RGB")

    arr = np.array(img).astype(np.float32)
    h, w, _ = arr.shape
    # Isola a área útil da coluna esquerda da ficha (exclui cabeçalho TOMBO e coluna direita pautada)
    y_start = int(h * 0.105)
    y_end = int(h * 0.955)
    x_start = int(w * 0.025)
    x_end = int(w * 0.755)

    sub = arr[y_start:y_end, x_start:x_end]
    gray = 0.299 * sub[:, :, 0] + 0.587 * sub[:, :, 1] + 0.114 * sub[:, :, 2]

    # Pixels pertencentes à emulsão fotográfica (mais escuros que o suporte de cartolina ~235)
    mask = gray < 208.0
    row_density = mask.mean(axis=1)

    # Identifica segmentos verticais contínuos correspondentes a cada fotografia colada na folha
    active_rows = row_density > 0.18
    segments = []
    in_seg = False
    seg_start = 0
    for idx, val in enumerate(active_rows):
        if val and not in_seg:
            in_seg = True
            seg_start = idx
        elif not val and in_seg:
            # Fecha o segmento se houver uma lacuna real (> 25px)
            if idx - seg_start > int(h * 0.08):
                segments.append((seg_start, idx - 1))
            in_seg = False
    if in_seg and (len(active_rows) - seg_start > int(h * 0.08)):
        segments.append((seg_start, len(active_rows) - 1))

    # Agrupa segmentos muito próximos (caso haja faixa clara horizontal dentro da mesma foto)
    merged_segments = []
    for seg in segments:
        if merged_segments and (seg[0] - merged_segments[-1][1] < int(h * 0.035)):
            merged_segments[-1] = (merged_segments[-1][0], seg[1])
        else:
            merged_segments.append(seg)

    if merged_segments:
        chosen_idx = min(max(0, photo_index), len(merged_segments) - 1)
        r0, r1 = merged_segments[chosen_idx]
        seg_mask = mask[r0:r1, :]
        col_density = seg_mask.mean(axis=0)
        valid_cols = np.where(col_density > 0.35)[0]
        if len(valid_cols) < 50:
            valid_cols = np.where(col_density > 0.15)[0]
        if len(valid_cols) > 50:
            c0, c1 = int(valid_cols[0]), int(valid_cols[-1])
        else:
            c0, c1 = 0, sub.shape[1] - 1

        # Margem interna de 2.5% para expurgar a borda branca do papel baritado
        pad_y = int((r1 - r0) * 0.025)
        pad_x = int((c1 - c0) * 0.025)
        crop_box = (
            x_start + c0 + pad_x,
            y_start + r0 + pad_y,
            x_start + c1 - pad_x,
            y_start + r1 - pad_y,
        )
        cropped = img.crop(crop_box)
    else:
        cropped = img.crop((x_start, y_start, x_end, y_end))

    if rotate_cw:
        cropped = cropped.rotate(-90, expand=True)
    elif rotate_ccw:
        cropped = cropped.rotate(90, expand=True)

    return cropped


def process_historical_photo(
    input_path: str,
    output_path: str,
    target_width: int = 1200,
    target_height: int = 570,  # Proporção 2.1:1 para paridade com cenários procedurais
    noise_sigma: float = 6.0,
    preserve_color: bool = False,
    crop_vertical_bias: float = 0.5,
    source_image: Image.Image = None,
):
    """
    Processa um recorte de foto de tombo aplicando curva S,
    grão de prata baritada e redimensionamento de alta qualidade.
    """
    if source_image is None:
        if not os.path.exists(input_path):
            raise FileNotFoundError(f"Arquivo de entrada não encontrado: {input_path}")
        img = Image.open(input_path).convert('RGB')
    else:
        img = source_image.convert('RGB')

    out_dir = os.path.dirname(output_path)
    if out_dir:
        os.makedirs(out_dir, exist_ok=True)

    # 1. Carrega a imagem e converte para array de ponto flutuante
    arr = np.array(img).astype(np.float32)

    # 2. Converte para luminância monocromática de gelatina e prata
    # Coeficientes do padrão ITU-R BT.601
    gray = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    norm = gray / 255.0

    # 3. Aplica a Curva S Cinematográfica Assimétrica
    scurve = np.where(
        norm < 0.5,
        0.5 * np.power(2.0 * norm, 1.35),
        1.0 - 0.5 * np.power(2.0 * (1.0 - norm), 1.25)
    )

    if preserve_color:
        # Preserva a matriz cromática noturna (ex: RecifeVibe.JPG) aplicando a curva S
        # e garantindo os limites do Visual Blacklist (#1A1815 a #EAE2D2)
        ratio = scurve / np.maximum(norm, 1e-4)
        r_base = arr[:, :, 0] * (0.65 * ratio + 0.35)
        g_base = arr[:, :, 1] * (0.65 * ratio + 0.35)
        b_base = arr[:, :, 2] * (0.65 * ratio + 0.35)
    else:
        # 4. Mapeamento Tonal Base (Gelatina e Prata Neutra com leve oxidação de arquivo)
        # Sombras profundas: #1A1815 (RGB [26, 24, 21]) | Meios-Tons: #807261 | Altas Luzes: #EAE2D2 (RGB [234, 226, 210])
        r_base = np.interp(scurve, [0.0, 0.5, 1.0], [26.0, 128.0, 234.0])
        g_base = np.interp(scurve, [0.0, 0.5, 1.0], [24.0, 114.0, 226.0])
        b_base = np.interp(scurve, [0.0, 0.5, 1.0], [21.0,  97.0, 210.0])

    # 5. Injeção de Grão Fotográfico Orgânico Ponderado
    np.random.seed(42)  # Determinismo de geração
    grain = np.random.normal(0.0, noise_sigma, gray.shape)
    grain_mask = 4.0 * scurve * (1.0 - scurve)  # Pico nos meios-tons

    # Clamping estrito para garantir conformidade com o Visual Blacklist (sem #000000 nem #FFFFFF puros)
    # Piso escuro limitado a #1A1815 ([26, 24, 21]) e teto claro limitado a #EAE2D2 ([234, 226, 210])
    r_final = np.clip(r_base + grain * grain_mask, 26.0, 234.0)
    g_final = np.clip(g_base + grain * grain_mask, 24.0, 226.0)
    b_final = np.clip(b_base + grain * grain_mask, 21.0, 210.0)

    processed_arr = np.stack([r_final, g_final, b_final], axis=-1).astype(np.uint8)
    processed_img = Image.fromarray(processed_arr)

    # 6. Recorte Inteligente Centralizado (Smart Center-Crop)
    orig_w, orig_h = processed_img.size
    aspect_target = target_width / target_height
    aspect_orig = orig_w / orig_h

    if aspect_orig > aspect_target:
        new_w = int(orig_h * aspect_target)
        left = (orig_w - new_w) // 2
        processed_img = processed_img.crop((left, 0, left + new_w, orig_h))
    else:
        new_h = int(orig_w / aspect_target)
        top = int((orig_h - new_h) * crop_vertical_bias)
        top = max(0, min(orig_h - new_h, top))
        processed_img = processed_img.crop((0, top, orig_w, top + new_h))

    # 7. Redimensionamento via Lanczos de Alta Fidelidade
    final_img = processed_img.resize((target_width, target_height), Image.Resampling.LANCZOS)

    # 8. Exportação Otimizada (WebP para menor overhead de memória no Electron)
    output_ext = os.path.splitext(output_path)[1].lower()
    if output_ext == '.webp':
        final_img.save(output_path, 'WEBP', quality=88, method=6)
    else:
        final_img.save(output_path, 'JPEG', quality=90, optimize=True, progressive=True)

    size_kb = os.path.getsize(output_path) / 1024.0
    print(f"[OK] Ativo gerado com sucesso: {output_path} ({target_width}x{target_height}, {size_kb:.1f} KB)")


def main():
    parser = argparse.ArgumentParser(
        description="Pipeline de Processamento Iconográfico Noir para 'Águas de Ferro'"
    )
    parser.add_argument("input", help="Caminho da imagem de origem (ou do PDF quando usado com --pdf-page)")
    parser.add_argument("output", help="Caminho do ativo de saída (.webp ou .jpg)")
    parser.add_argument(
        "--preset",
        choices=list(PRESETS.keys()),
        default="widescreen",
        help="Proporção canônica: widescreen (1200x570), documental (1200x800), retrato (450x600), quadrado (600x600)",
    )
    parser.add_argument("--width", type=int, default=None, help="Largura customizada em pixels")
    parser.add_argument("--height", type=int, default=None, help="Altura customizada em pixels")
    parser.add_argument("--sigma", type=float, default=6.0, help="Intensidade do grão de prata (padrão: 6.0)")
    parser.add_argument(
        "--preserve-color",
        action="store_true",
        help="Preserva a paleta cromática noturna original aplicando a curva S e grão nos meios-tons",
    )
    parser.add_argument(
        "--pdf-page",
        type=int,
        default=None,
        help="Extrai e recorta automaticamente a foto da página N do PDF do Acervo MCR",
    )
    parser.add_argument(
        "--photo-index",
        type=int,
        default=0,
        help="Índice da foto na página do PDF (0 = superior/única, 1 = inferior)",
    )
    parser.add_argument(
        "--rotate-cw",
        action="store_true",
        help="Gira a foto extraída em 90 graus no sentido horário (para fotos coladas de lado)",
    )
    parser.add_argument(
        "--rotate-ccw",
        action="store_true",
        help="Gira a foto extraída em 90 graus no sentido anti-horário",
    )
    parser.add_argument(
        "--vertical-bias",
        type=float,
        default=0.5,
        help="Posição vertical do recorte (0.0=topo, 0.5=centro, 1.0=base)",
    )

    args = parser.parse_args()
    w, h = PRESETS[args.preset]
    if args.width:
        w = args.width
    if args.height:
        h = args.height

    src_img = None
    if args.pdf_page is not None:
        src_img = extract_photo_from_mcr_pdf(
            args.input,
            args.pdf_page,
            photo_index=args.photo_index,
            rotate_cw=args.rotate_cw,
            rotate_ccw=args.rotate_ccw,
        )

    process_historical_photo(
        input_path=args.input,
        output_path=args.output,
        target_width=w,
        target_height=h,
        noise_sigma=args.sigma,
        preserve_color=args.preserve_color,
        crop_vertical_bias=args.vertical_bias,
        source_image=src_img,
    )


if __name__ == '__main__':
    if len(sys.argv) > 2:
        main()
    else:
        print("Uso: python tools/process_archive_photos.py <origem.jpg> <destino.webp> [--preset widescreen|documental|retrato|quadrado] [--pdf-page N] [--preserve-color]")
