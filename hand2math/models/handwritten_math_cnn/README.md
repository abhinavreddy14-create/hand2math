# Handwritten Mathematical Symbol CNN Model Weights

This directory holds the CNN model weights and configuration for the Hand2Math symbol recognition pipeline.

## Model Architecture

- **Input Dimension**: `(1, 28, 28)` grayscale image patch
- **Layer 1**: Conv2D (16 filters, 3x3 kernel, stride 1) + ReLU
- **Layer 2**: MaxPooling2D (2x2 pool size, stride 2)
- **Layer 3**: Conv2D (32 filters, 3x3 kernel, stride 1) + ReLU
- **Layer 4**: MaxPooling2D (2x2 pool size, stride 2)
- **Layer 5**: Flatten
- **Layer 6**: Dense (64 units) + ReLU
- **Layer 7**: Dense (24 units) + Softmax

## Classes (24 Symbols)

`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, +, -, *, /, =, (, ), ^, x, y, z, a, b, sqrt`

## Loading Pretrained Weights

Place trained weights (`model_weights.json`, `weights.pth`, or `model.onnx`) in this folder.
The `LightweightMathCNN` class in `backend/recognition/cnn_model.py` automatically loads weights from this location.
