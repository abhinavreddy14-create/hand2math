# Handwritten Mathematical Symbols Dataset Directory

This directory is designated for handwritten mathematical symbol datasets (such as CROHME, HASYv2, or Kaggle Handwritten Math Symbols).

## Directory Structure

```text
dataset/
├── train/
│   ├── 0/
│   ├── 1/
│   ...
│   ├── plus/
│   ├── minus/
│   └── x/
├── val/
└── test/
```

## Dataset Specifications

- **Image Format**: PNG / JPEG
- **Color Space**: 8-bit grayscale
- **Default Resolution**: 28x28 or 32x32 pixels
- **Background**: White (255) with dark strokes (0), or inverted (0 background, 255 stroke)
- **Normalization**: Normalized to float `[0.0, 1.0]` during preprocessing in `backend/recognition/recognizer.py`
