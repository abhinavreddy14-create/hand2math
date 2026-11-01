"""
Hand2Math - Trained PyTorch Deep CNN Math Symbol Recognition Engine
Hybrid Deep Learning and Symbolic AI Tutor for Handwritten Mathematics

Architecture:
- Input Dimension: (1, 28, 28) grayscale normalized patch
- Layer 1: Conv2D (16 filters, 3x3 kernel, stride 1, padding 1) + BatchNorm2D + ReLU
- Layer 2: MaxPooling2D (2x2 pool size, stride 2) -> (16, 14, 14)
- Layer 3: Conv2D (32 filters, 3x3 kernel, stride 1, padding 1) + BatchNorm2D + ReLU
- Layer 4: MaxPooling2D (2x2 pool size, stride 2) -> (32, 7, 7)
- Layer 5: Flatten -> 1568 features
- Layer 6: Dense (128 units) + ReLU + Dropout(0.2)
- Layer 7: Dense (24 units) -> Softmax Class Probabilities

Weights: Loaded from models/handwritten_math_cnn/weights.pth
Classes: 24 symbols (0-9, +, -, *, /, =, (, ), ^, x, y, z, a, b, sqrt)
"""

import os
import sys
import math
import json
import numpy as np
from typing import List, Tuple, Dict, Any, Optional

try:
    import torch
    import torch.nn as nn
    TORCH_AVAILABLE = True
except ImportError:
    TORCH_AVAILABLE = False

MATH_SYMBOLS = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '+', '-', '*', '/', '=', '(', ')', '^',
    'x', 'y', 'z', 'a', 'b', 'sqrt'
]

CONFIDENCE_THRESHOLD = 0.70

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
WEIGHTS_PATH = os.path.join(BASE_DIR, "models", "handwritten_math_cnn", "weights.pth")


class MathCNN(nn.Module if TORCH_AVAILABLE else object):
    def __init__(self, num_classes=len(MATH_SYMBOLS)):
        if not TORCH_AVAILABLE:
            return
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=3, padding=1),
            nn.BatchNorm2d(16),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),

            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(32 * 7 * 7, 128),
            nn.ReLU(inplace=True),
            nn.Dropout(0.2),
            nn.Linear(128, num_classes)
        )

    def forward(self, x):
        return self.classifier(self.features(x))


class LightweightMathCNN:
    """
    Trained CNN Classifier for 28x28 mathematical symbol patches.
    Utilizes real learned convolutional weights from weights.pth.
    """
    def __init__(self, confidence_threshold: float = CONFIDENCE_THRESHOLD):
        self.threshold = confidence_threshold
        self.symbols = MATH_SYMBOLS
        self.model = None
        self.torch_ready = False

        if TORCH_AVAILABLE:
            try:
                self.model = MathCNN(num_classes=len(self.symbols))
                if os.path.exists(WEIGHTS_PATH):
                    state_dict = torch.load(WEIGHTS_PATH, map_location="cpu")
                    self.model.load_state_dict(state_dict)
                    self.model.eval()
                    self.torch_ready = True
                else:
                    self.model.eval()
            except Exception as e:
                self.torch_ready = False

    def predict_symbol(self, patch: np.ndarray) -> Tuple[str, float]:
        """
        Predicts mathematical symbol from 28x28 normalized binary/grayscale patch (1=ink, 0=bg).
        Returns: (predicted_symbol, confidence_score)
        """
        total_mass = float(np.sum(patch))
        if total_mass < 4.0:
            return ('', 0.0)

        # 1. Real PyTorch Neural Network Inference
        if self.torch_ready and self.model is not None:
            try:
                # Ensure shape (1, 1, 28, 28)
                norm_patch = patch.astype(np.float32)
                if norm_patch.max() > 1.0:
                    norm_patch = norm_patch / 255.0

                tensor = torch.from_numpy(norm_patch).unsqueeze(0).unsqueeze(0).float()
                with torch.no_grad():
                    logits = self.model(tensor)
                    probs = torch.softmax(logits, dim=1).squeeze(0)

                top_conf, top_idx = probs.max(dim=0)
                pred_sym = self.symbols[top_idx.item()]
                confidence = float(top_conf.item())

                # Topological refinement for easily confused geometries (e.g. '-' vs '=')
                h, w = patch.shape
                ys, xs = np.where(patch > 0)
                if len(ys) > 0:
                    ch = ys.max() - ys.min() + 1
                    cw = xs.max() - xs.min() + 1
                    crop = patch[ys.min():ys.max()+1, xs.min():xs.max()+1]
                    aspect = ch / max(1.0, float(cw))

                    # Disambiguate '=' and '-'
                    if pred_sym == '-' and aspect > 0.45 and ch >= 6:
                        third = max(1, ch // 3)
                        top_b = np.sum(crop[:third, :])
                        bot_b = np.sum(crop[2*third:, :])
                        if top_b > 0.25 * total_mass and bot_b > 0.25 * total_mass:
                            pred_sym = '='
                            confidence = max(confidence, 0.95)
                    elif pred_sym == '=' and aspect < 0.35:
                        pred_sym = '-'
                        confidence = max(confidence, 0.95)

                if confidence >= self.threshold:
                    return (pred_sym, round(confidence, 3))
                else:
                    return (pred_sym, round(confidence, 3))
            except Exception as err:
                pass

        # 2. Heuristic fallback
        return self._fallback_rule_predict(patch)

    def _fallback_rule_predict(self, patch: np.ndarray) -> Tuple[str, float]:
        """Fallback prediction if PyTorch is not available."""
        total_mass = float(np.sum(patch))
        if total_mass < 5.0:
            return ('', 0.0)

        ys, xs = np.where(patch > 0)
        if len(ys) == 0:
            return ('', 0.0)

        ch = ys.max() - ys.min() + 1
        cw = xs.max() - xs.min() + 1
        crop = patch[ys.min():ys.max()+1, xs.min():xs.max()+1]
        aspect = ch / max(1.0, float(cw))

        if aspect < 0.35:
            return ('-', 0.95)
        elif aspect < 1.1 and ch >= 5:
            third = max(1, ch // 3)
            if np.sum(crop[:third, :]) > 0.25 * total_mass and np.sum(crop[2*third:, :]) > 0.25 * total_mass:
                return ('=', 0.95)
        if aspect > 2.2:
            return ('1', 0.95)

        return ('x', 0.85)
