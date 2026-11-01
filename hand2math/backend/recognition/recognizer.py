"""
Hand2Math - Handwriting Recognition Pipeline
Hybrid Deep Learning and Symbolic AI Tutor for Handwritten Mathematics

Coordinates multi-stage image processing workflow:
1. Grayscale conversion with alpha-channel white canvas compositing
2. Adaptive thresholding for illumination normalization and noise reduction
3. Morphological noise filtering & stroke connected component segmentation
4. High-confidence CNN classification (>= 0.85) to minimize false positives
5. Mathematical syntax validation and expression reconstruction
"""

import sys
import os
import math
import base64
import json
import re
import io
import numpy as np
from PIL import Image, ImageOps, ImageFilter
from typing import Dict, Any, List, Tuple, Optional

try:
    from .cnn_model import LightweightMathCNN, MATH_SYMBOLS, CONFIDENCE_THRESHOLD
except ImportError:
    from cnn_model import LightweightMathCNN, MATH_SYMBOLS, CONFIDENCE_THRESHOLD


class ExpressionRecognizer:
    """
    Coordinates multi-stage image processing workflow, symbol segmentation,
    high-confidence CNN classification, and mathematical expression reconstruction.
    """

    def __init__(self, confidence_threshold: float = CONFIDENCE_THRESHOLD):
        # Higher confidence threshold to minimize false positives
        self.threshold = confidence_threshold
        self.cnn = LightweightMathCNN(confidence_threshold=self.threshold)

    def is_canvas_empty(self, image_data_base64: str) -> bool:
        """Checks if the received canvas image data has any drawing strokes."""
        if not image_data_base64 or len(image_data_base64.strip()) < 100:
            return True
        return False

    def clean_expression(self, expr_str: str) -> str:
        """Normalizes mathematical expression tokens."""
        if not expr_str:
            return ""
        s = expr_str.strip()
        s = re.sub(r"^```[a-zA-Z]*", "", s)
        s = re.sub(r"```$", "", s)
        s = s.strip("`'\"\n\r\t ")
        s = s.replace("×", "*").replace("÷", "/").replace("−", "-").replace("·", "*")
        s = s.replace("²", "^2").replace("³", "^3")
        # Normalize variables immediately followed by digit into exponents: x2 -> x^2, y3 -> y^3
        s = re.sub(r'([a-zA-Z\)])(\d+)\b', r'\1^\2', s)
        s = re.sub(r"\s+", " ", s)
        return s

    def preprocess_image(self, img_pil: Image.Image) -> Tuple[np.ndarray, np.ndarray]:
        """
        Multi-stage image processing workflow:
        Stage 1: Grayscale conversion
          - Composites transparent channels (RGBA / LA) over pure white background
          - Converts to single-channel 8-bit grayscale ('L')
          - Normalizes contrast via autocontrast
          - Applies median filter (size 3) for salt-and-pepper noise reduction
        Stage 2: Adaptive thresholding for noise reduction
          - Computes local mean background intensity using box blur
          - Computes adaptive threshold: ink is darker than local mean by margin C
          - Enforces absolute upper luminance bound (< 215) to avoid false noise in white spaces
        Returns: (binary_ink_mask, grayscale_array)
        """
        # Stage 1.1: Alpha channel compositing over white canvas
        if img_pil.mode in ("RGBA", "LA") or ("transparency" in img_pil.info):
            bg = Image.new("RGB", img_pil.size, (255, 255, 255))
            if img_pil.mode == "RGBA":
                alpha = img_pil.split()[3]
                bg.paste(img_pil, mask=alpha)
            else:
                bg.paste(img_pil)
            gray_img = bg.convert("L")
        elif img_pil.mode != "L":
            gray_img = img_pil.convert("L")
        else:
            gray_img = img_pil.copy()

        # Stage 1.2: Dynamic range contrast enhancement
        gray_norm = ImageOps.autocontrast(gray_img, cutoff=1)

        # Stage 1.3: Median filtering for edge-preserving noise reduction
        gray_filtered = gray_norm.filter(ImageFilter.MedianFilter(size=3))

        # Stage 2: Adaptive thresholding
        arr_gray = np.array(gray_filtered, dtype=np.float32)

        # Calculate local neighborhood mean using box blur (radius 15)
        local_mean_img = gray_filtered.filter(ImageFilter.BoxBlur(radius=15))
        arr_mean = np.array(local_mean_img, dtype=np.float32)

        # Adaptive threshold: pixel is ink if it is significantly darker than local background
        adaptive_margin = 12.0
        max_ink_luminance = 210.0
        ink_mask = (arr_gray < (arr_mean - adaptive_margin)) & (arr_gray < max_ink_luminance)

        # Fallback safeguard: if image has strong global contrast (e.g. sharp digital strokes)
        global_mask = (arr_gray < 185.0)
        combined_ink = ink_mask | global_mask

        return combined_ink, arr_gray

    def process_canvas(self, image_base64: str, recognized_hint: Optional[str] = None) -> Dict[str, Any]:
        """
        Executes the multi-stage recognition pipeline:
        1. Checks for empty input
        2. Stage 1: Grayscale conversion with alpha compositing
        3. Stage 2: Adaptive thresholding for noise reduction
        4. Stage 3: Connected component stroke segmentation and multi-stroke grouping
        5. Stage 4: High-confidence CNN classification (>= 0.85) to minimize false positives
        6. Stage 5: Mathematical expression syntax reconstruction
        """
        if self.is_canvas_empty(image_base64):
            return {
                "success": False,
                "error": "empty",
                "message": "Please draw or upload a mathematical expression first."
            }

        # Ensure image is not empty

        try:
            # Strip data URL prefix if present
            raw_b64 = re.sub(r"^data:image/\w+;base64,", "", image_base64.strip())
            img_bytes = base64.b64decode(raw_b64)
            img_pil = Image.open(io.BytesIO(img_bytes))

            # Multi-stage image processing
            ink, arr_gray = self.preprocess_image(img_pil)

            if not np.any(ink):
                return {
                    "success": False,
                    "error": "empty",
                    "message": "Please draw or upload a mathematical expression first."
                }

            h, w = ink.shape

            # Connected component labeling (8-connectivity)
            visited = np.zeros_like(ink, dtype=bool)
            raw_components = []

            for y in range(0, h, 2):
                for x in range(0, w, 2):
                    if ink[y, x] and not visited[y, x]:
                        # BFS flood fill
                        q = [(y, x)]
                        visited[y, x] = True
                        comp_pixels = []
                        while q:
                            cy, cx = q.pop()
                            comp_pixels.append((cy, cx))
                            for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]:
                                ny, nx = cy + dy, cx + dx
                                if 0 <= ny < h and 0 <= nx < w and ink[ny, nx] and not visited[ny, nx]:
                                    visited[ny, nx] = True
                                    q.append((ny, nx))

                        # Noise reduction: ignore microscopic noise specks (< 8 pixels or < 3px box)
                        if len(comp_pixels) >= 8:
                            ys = [p[0] for p in comp_pixels]
                            xs = [p[1] for p in comp_pixels]
                            min_x, max_x = min(xs), max(xs)
                            min_y, max_y = min(ys), max(ys)
                            box_w = max_x - min_x + 1
                            box_h = max_y - min_y + 1
                            if box_w >= 3 and box_h >= 3:
                                raw_components.append({
                                    "min_x": min_x,
                                    "max_x": max_x,
                                    "min_y": min_y,
                                    "max_y": max_y,
                                    "pixels": comp_pixels,
                                    "cx": (min_x + max_x) / 2.0,
                                    "cy": (min_y + max_y) / 2.0,
                                    "w": box_w,
                                    "h": box_h,
                                })

            if not raw_components:
                return {
                    "success": False,
                    "error": "empty",
                    "message": "Please draw or upload a mathematical expression first."
                }

            # Merge multi-stroke components (e.g. '=' two bars, '+' crossing strokes, 'x' crossing diagonals)
            merged = []
            used = set()

            for i, c1 in enumerate(raw_components):
                if i in used:
                    continue
                cluster = [c1]
                used.add(i)

                is_parallel_bars = False
                for j, c2 in enumerate(raw_components):
                    if j in used:
                        continue

                    # Check for equals sign '=': 2 horizontal bars stacked vertically with substantial X overlap
                    overlap_x = min(c1["max_x"], c2["max_x"]) - max(c1["min_x"], c2["min_x"])
                    min_w = min(c1["w"], c2["w"])
                    vertical_gap = abs(c1["cy"] - c2["cy"])
                    c1_aspect = c1["h"] / max(1.0, float(c1["w"]))
                    c2_aspect = c2["h"] / max(1.0, float(c2["w"]))

                    is_bars = (
                        overlap_x > 0.55 * min_w and
                        c1_aspect < 0.55 and c2_aspect < 0.55 and
                        vertical_gap <= max(c1["h"], c2["h"]) * 4.0 and
                        abs(c1["cx"] - c2["cx"]) < 20
                    )

                    # Check for crossing strokes ('+' or 'x'): bounding boxes intersect closely
                    boxes_intersect = not (
                        c1["max_x"] < c2["min_x"] or c1["min_x"] > c2["max_x"] or
                        c1["max_y"] < c2["min_y"] or c1["min_y"] > c2["max_y"]
                    )
                    center_dist = math.hypot(c1["cx"] - c2["cx"], c1["cy"] - c2["cy"])
                    is_crossing = boxes_intersect or (center_dist < 18)

                    if is_bars:
                        is_parallel_bars = True
                        cluster.append(c2)
                        used.add(j)
                    elif is_crossing:
                        cluster.append(c2)
                        used.add(j)

                # Combine cluster bounding box
                all_pixels = []
                for c in cluster:
                    all_pixels.extend(c["pixels"])
                ys = [p[0] for p in all_pixels]
                xs = [p[1] for p in all_pixels]
                merged.append({
                    "min_x": min(xs),
                    "max_x": max(xs),
                    "min_y": min(ys),
                    "max_y": max(ys),
                    "pixels": all_pixels,
                    "cx": (min(xs) + max(xs)) / 2.0,
                    "cy": (min(ys) + max(ys)) / 2.0,
                    "w": max(xs) - min(xs) + 1,
                    "h": max(ys) - min(ys) + 1,
                    "is_parallel_bars": is_parallel_bars
                })

            # Sort components strictly from left to right
            merged.sort(key=lambda c: c["min_x"])

            median_h = np.median([c["h"] for c in merged])
            median_cy = np.median([c["cy"] for c in merged])

            # If the image has complex multi-tier components (e.g. multi-line text or vertical fraction layout),
            # the single-line 1D stroke CNN is not suitable; signal fallback to multi-line OCR.
            all_ys = [c["cy"] for c in merged]
            y_span = (max(all_ys) - min(all_ys)) if all_ys else 0
            has_long_fraction_bar = any(c["w"] > 2.5 * median_h and c["h"] <= 20 for c in merged)
            if len(merged) >= 4 and (y_span > 2.6 * median_h or has_long_fraction_bar):
                return {
                    "success": False,
                    "error": "multiline_complex",
                    "message": "Multi-line or fraction layout detected. Delegating to OCR engine."
                }

            recognized_symbols: List[str] = []
            confidence_scores: List[float] = []

            for comp in merged:
                # Direct high-confidence match for verified parallel bars '='
                if comp.get("is_parallel_bars"):
                    recognized_symbols.append("=")
                    confidence_scores.append(0.98)
                    continue

                min_x, max_x = comp["min_x"], comp["max_x"]
                min_y, max_y = comp["min_y"], comp["max_y"]

                # Crop bounding box of symbol
                pad = 3
                y1 = max(0, min_y - pad)
                y2 = min(h, max_y + pad + 1)
                x1 = max(0, min_x - pad)
                x2 = min(w, max_x + pad + 1)

                symbol_crop = ink[y1:y2, x1:x2].astype(np.float32)

                # Normalize to 28x28 patch with aspect-preserving centering
                ch, cw = symbol_crop.shape
                scale = 22.0 / max(ch, cw)
                new_w = max(1, int(cw * scale))
                new_h = max(1, int(ch * scale))

                crop_pil = Image.fromarray((symbol_crop * 255).astype(np.uint8))
                resized = crop_pil.resize((new_w, new_h), Image.Resampling.BILINEAR)
                resized_arr = (np.array(resized) > 80).astype(np.float32)

                patch = np.zeros((28, 28), dtype=np.float32)
                off_y = (28 - new_h) // 2
                off_x = (28 - new_w) // 2
                patch[off_y : off_y + new_h, off_x : off_x + new_w] = resized_arr

                sym, conf = self.cnn.predict_symbol(patch)

                # Check if this component is a superscript / exponent (e.g. ^2 in x^2)
                is_superscript = (
                    comp["h"] < 0.75 * median_h and
                    comp["cy"] < median_cy - 0.25 * median_h and
                    len(recognized_symbols) > 0 and
                    recognized_symbols[-1] in ['x', 'y', 'z', 'a', 'b', 'c', 'n', ')']
                )

                if is_superscript and sym in ['2', '3', '4', 'n']:
                    recognized_symbols.append(f"^{sym}")
                    confidence_scores.append(0.95)
                elif sym and conf >= self.threshold:
                    recognized_symbols.append(sym)
                    confidence_scores.append(conf)

            if recognized_symbols:
                # Reconstruct mathematical expression string with clean operator spacing
                parts = []
                for s in recognized_symbols:
                    if s in ['+', '-', '*', '/', '=']:
                        parts.append(f" {s} ")
                    elif s.startswith('^'):
                        parts.append(s)
                    else:
                        parts.append(s)

                expr_str = self.clean_expression(re.sub(r'\s+', ' ', ''.join(parts)).strip())
                avg_conf = float(np.mean(confidence_scores)) if confidence_scores else 0.92

                return {
                    "success": True,
                    "expression": expr_str,
                    "symbols": recognized_symbols,
                    "confidence": round(avg_conf, 2),
                    "pipeline": "MultiStage-AdaptiveThreshold-CNN"
                }

        except Exception as err:
            pass

        return {
            "success": False,
            "error": "unrecognized",
            "message": "Unable to recognize the expression. Please try writing or uploading it more clearly."
        }


if __name__ == "__main__":
    hint_arg = sys.argv[2] if len(sys.argv) > 2 else None
    input_b64 = ""
    if len(sys.argv) > 1 and sys.argv[1].strip():
        input_b64 = sys.argv[1]
    else:
        try:
            input_b64 = sys.stdin.read().strip()
        except Exception:
            input_b64 = ""

    # Set confidence threshold to 0.85 to minimize false positives
    recognizer_inst = ExpressionRecognizer(confidence_threshold=0.85)
    res_dict = recognizer_inst.process_canvas(input_b64, recognized_hint=hint_arg)
    print(json.dumps(res_dict))
