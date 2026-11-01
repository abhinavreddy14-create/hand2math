"""
Hand2Math - PyTorch Math CNN Model Training Pipeline
Trains a genuine Convolutional Neural Network on 24 mathematical symbols:
0-9, +, -, *, /, =, (, ), ^, x, y, z, a, b, sqrt

Saves:
- models/handwritten_math_cnn/weights.pth
- models/handwritten_math_cnn/model_weights.json
- models/handwritten_math_cnn/model_metadata.json
- dataset/train/ & dataset/val/
"""

import os
import sys
import math
import json
import random
import time
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models", "handwritten_math_cnn")
DATASET_DIR = os.path.join(BASE_DIR, "dataset")

os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(os.path.join(DATASET_DIR, "train"), exist_ok=True)
os.makedirs(os.path.join(DATASET_DIR, "val"), exist_ok=True)

# 24 Math Symbol Classes
MATH_CLASSES = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '+', '-', '*', '/', '=', '(', ')', '^',
    'x', 'y', 'z', 'a', 'b', 'sqrt'
]

CLASS_TO_IDX = {cls: idx for idx, cls in enumerate(MATH_CLASSES)}
IDX_TO_CLASS = {idx: cls for idx, cls in enumerate(MATH_CLASSES)}


class MathCNN(nn.Module):
    """
    Standard High-Performance 2D CNN for 28x28 Math Symbol Recognition.
    Architecture:
    Input: (1, 28, 28)
    Conv2D(1 -> 16, 3x3) + BatchNorm2d + ReLU + MaxPool2d(2, 2) -> (16, 14, 14)
    Conv2D(16 -> 32, 3x3) + BatchNorm2d + ReLU + MaxPool2d(2, 2) -> (32, 7, 7)
    Flatten -> 32 * 7 * 7 = 1568
    Linear(1568 -> 128) + ReLU + Dropout(0.2)
    Linear(128 -> 24) -> Class Logits
    """
    def __init__(self, num_classes=len(MATH_CLASSES)):
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
        feat = self.features(x)
        logits = self.classifier(feat)
        return logits


def draw_math_symbol(char: str, size=(64, 64), stroke_width=4, jitter=True) -> Image.Image:
    """Renders diverse realistic strokes for each mathematical symbol."""
    img = Image.new("L", size, 0)  # 0 background, 255 stroke
    draw = ImageDraw.Draw(img)
    w, h = size
    cx = w // 2 + (random.randint(-2, 2) if jitter else 0)
    cy = h // 2 + (random.randint(-2, 2) if jitter else 0)
    sw = stroke_width + (random.choice([-1, 0, 1]) if jitter else 0)
    sw = max(2, min(sw, 7))

    if char == "0":
        rx = random.randint(14, 20)
        ry = random.randint(22, 28)
        draw.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), outline=255, width=sw)
    elif char == "1":
        h_len = random.randint(22, 27)
        draw.line((cx, cy - h_len, cx, cy + h_len), fill=255, width=sw)
        if random.random() > 0.3:
            draw.line((cx - random.randint(6, 12), cy - h_len + random.randint(6, 12), cx, cy - h_len), fill=255, width=sw)
        if random.random() > 0.4:
            draw.line((cx - random.randint(8, 14), cy + h_len, cx + random.randint(8, 14), cy + h_len), fill=255, width=sw)
    elif char == "2":
        r = random.randint(14, 18)
        draw.arc((cx - r, cy - 25, cx + r, cy - 5), start=180, end=0, fill=255, width=sw)
        draw.line((cx + r, cy - 15, cx - r, cy + 24), fill=255, width=sw)
        draw.line((cx - r, cy + 24, cx + r, cy + 24), fill=255, width=sw)
    elif char == "3":
        r = random.randint(13, 17)
        draw.arc((cx - r, cy - 25, cx + r, cy - 2), start=270, end=90, fill=255, width=sw)
        draw.arc((cx - r - 2, cy - 2, cx + r + 2, cy + 24), start=270, end=90, fill=255, width=sw)
    elif char == "4":
        draw.line((cx + 10, cy - 26, cx + 10, cy + 26), fill=255, width=sw)
        draw.line((cx + 10, cy + 6, cx - 18, cy + 6), fill=255, width=sw)
        draw.line((cx - 18, cy + 6, cx + 8, cy - 24), fill=255, width=sw)
    elif char == "5":
        draw.line((cx + 15, cy - 25, cx - 14, cy - 25), fill=255, width=sw)
        draw.line((cx - 14, cy - 25, cx - 14, cy - 5), fill=255, width=sw)
        draw.arc((cx - 18, cy - 7, cx + 18, cy + 25), start=270, end=90, fill=255, width=sw)
    elif char == "6":
        r = random.randint(14, 18)
        draw.ellipse((cx - r, cy - 4, cx + r, cy + 25), outline=255, width=sw)
        draw.arc((cx - r, cy - 26, cx + r, cy + 10), start=90, end=270, fill=255, width=sw)
    elif char == "7":
        draw.line((cx - 18, cy - 25, cx + 18, cy - 25), fill=255, width=sw)
        draw.line((cx + 18, cy - 25, cx - 6, cy + 25), fill=255, width=sw)
        if random.random() > 0.5:
            draw.line((cx - 8, cy, cx + 6, cy), fill=255, width=sw - 1)
    elif char == "8":
        r1 = random.randint(12, 15)
        r2 = random.randint(14, 18)
        draw.ellipse((cx - r1, cy - 26, cx + r1, cy - 2), outline=255, width=sw)
        draw.ellipse((cx - r2, cy - 4, cx + r2, cy + 25), outline=255, width=sw)
    elif char == "9":
        r = random.randint(14, 18)
        draw.ellipse((cx - r, cy - 26, cx + r, cy + 4), outline=255, width=sw)
        draw.arc((cx - r, cy - 10, cx + r, cy + 26), start=270, end=90, fill=255, width=sw)
    elif char == "+":
        arm = random.randint(18, 24)
        draw.line((cx, cy - arm, cx, cy + arm), fill=255, width=sw)
        draw.line((cx - arm, cy, cx + arm, cy), fill=255, width=sw)
    elif char == "-":
        arm = random.randint(18, 25)
        draw.line((cx - arm, cy, cx + arm, cy), fill=255, width=sw)
    elif char == "*":
        arm = random.randint(14, 18)
        draw.line((cx, cy - arm, cx, cy + arm), fill=255, width=sw)
        draw.line((cx - arm, cy, cx + arm, cy), fill=255, width=sw)
        draw.line((cx - int(arm*0.7), cy - int(arm*0.7), cx + int(arm*0.7), cy + int(arm*0.7)), fill=255, width=sw)
        draw.line((cx + int(arm*0.7), cy - int(arm*0.7), cx - int(arm*0.7), cy + int(arm*0.7)), fill=255, width=sw)
    elif char == "/":
        arm = random.randint(20, 26)
        draw.line((cx - int(arm*0.6), cy + arm, cx + int(arm*0.6), cy - arm), fill=255, width=sw)
    elif char == "=":
        arm = random.randint(18, 25)
        gap = random.randint(6, 9)
        draw.line((cx - arm, cy - gap, cx + arm, cy - gap), fill=255, width=sw)
        draw.line((cx - arm, cy + gap, cx + arm, cy + gap), fill=255, width=sw)
    elif char == "(":
        draw.arc((cx - 8, cy - 26, cx + 18, cy + 26), start=90, end=270, fill=255, width=sw)
    elif char == ")":
        draw.arc((cx - 18, cy - 26, cx + 8, cy + 26), start=270, end=90, fill=255, width=sw)
    elif char == "^":
        arm = random.randint(12, 16)
        draw.line((cx - arm, cy + arm // 2, cx, cy - arm // 2), fill=255, width=sw)
        draw.line((cx, cy - arm // 2, cx + arm, cy + arm // 2), fill=255, width=sw)
    elif char == "x":
        arm = random.randint(16, 22)
        draw.line((cx - arm, cy - arm, cx + arm, cy + arm), fill=255, width=sw)
        draw.line((cx + arm, cy - arm, cx - arm, cy + arm), fill=255, width=sw)
    elif char == "y":
        arm = random.randint(14, 20)
        draw.line((cx - arm, cy - arm, cx, cy), fill=255, width=sw)
        draw.line((cx + arm, cy - arm, cx - arm // 2, cy + arm + 6), fill=255, width=sw)
    elif char == "z":
        arm = random.randint(14, 20)
        draw.line((cx - arm, cy - arm, cx + arm, cy - arm), fill=255, width=sw)
        draw.line((cx + arm, cy - arm, cx - arm, cy + arm), fill=255, width=sw)
        draw.line((cx - arm, cy + arm, cx + arm, cy + arm), fill=255, width=sw)
    elif char == "a":
        draw.ellipse((cx - 14, cy - 8, cx + 12, cy + 18), outline=255, width=sw)
        draw.line((cx + 12, cy - 10, cx + 12, cy + 18), fill=255, width=sw)
    elif char == "b":
        draw.line((cx - 14, cy - 26, cx - 14, cy + 22), fill=255, width=sw)
        draw.ellipse((cx - 14, cy - 2, cx + 14, cy + 22), outline=255, width=sw)
    elif char == "sqrt":
        draw.line((cx - 24, cy + 4, cx - 18, cy + 4), fill=255, width=sw)
        draw.line((cx - 18, cy + 4, cx - 10, cy + 22), fill=255, width=sw)
        draw.line((cx - 10, cy + 22, cx - 2, cy - 24), fill=255, width=sw)
        draw.line((cx - 2, cy - 24, cx + 24, cy - 24), fill=255, width=sw)

    # Center bounding box into 28x28 normalized patch
    arr = np.array(img)
    ys, xs = np.where(arr > 40)
    if len(ys) > 0:
        y1, y2 = ys.min(), ys.max()
        x1, x2 = xs.min(), xs.max()
        crop = img.crop((x1, y1, x2 + 1, y2 + 1))
        
        # Random rotation between -12 and +12 degrees
        if jitter and random.random() > 0.3:
            deg = random.uniform(-12, 12)
            crop = crop.rotate(deg, expand=True)

        cw, ch = crop.size
        scale = 20.0 / max(cw, ch)
        nw, nh = max(1, int(cw * scale)), max(1, int(ch * scale))
        crop_res = crop.resize((nw, nh), Image.Resampling.BILINEAR)

        patch = Image.new("L", (28, 28), 0)
        ox = (28 - nw) // 2 + (random.randint(-1, 1) if jitter else 0)
        oy = (28 - nh) // 2 + (random.randint(-1, 1) if jitter else 0)
        ox = max(0, min(ox, 28 - nw))
        oy = max(0, min(oy, 28 - nh))
        patch.paste(crop_res, (ox, oy))
        return patch

    return img.resize((28, 28))


class MathSymbolDataset(Dataset):
    def __init__(self, samples_per_class=120, is_train=True):
        self.data = []
        self.labels = []
        for c_idx, symbol in enumerate(MATH_CLASSES):
            for i in range(samples_per_class):
                patch_img = draw_math_symbol(symbol, jitter=is_train)
                arr = np.array(patch_img, dtype=np.float32) / 255.0  # normalize [0, 1]
                
                # Add slight noise if training
                if is_train and random.random() > 0.5:
                    noise = np.random.normal(0, 0.05, arr.shape)
                    arr = np.clip(arr + noise, 0.0, 1.0)
                
                # Tensor: (1, 28, 28)
                tensor = torch.from_numpy(arr).unsqueeze(0).float()
                self.data.append(tensor)
                self.labels.append(c_idx)

                # Save a subset of actual images to dataset/ folders
                if i < 5:
                    split_dir = "train" if is_train else "val"
                    cls_dir = os.path.join(DATASET_DIR, split_dir, symbol.replace('/', 'div').replace('*', 'mul'))
                    os.makedirs(cls_dir, exist_ok=True)
                    patch_img.save(os.path.join(cls_dir, f"sample_{i}.png"))

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return self.data[idx], self.labels[idx]


def train_and_export():
    print("=" * 80)
    print("HAND2MATH - TRAINING GENUINE PYTORCH CNN MATHEMATICAL SYMBOL MODEL")
    print(f"Target Classes ({len(MATH_CLASSES)}): {', '.join(MATH_CLASSES)}")
    print("=" * 80)

    # 1. Build Datasets
    print("\n1. Generating synthetic handwriting stroke dataset...")
    train_dataset = MathSymbolDataset(samples_per_class=160, is_train=True)
    val_dataset = MathSymbolDataset(samples_per_class=40, is_train=False)

    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)
    print(f"   • Train Set: {len(train_dataset)} samples ({len(train_dataset)//len(MATH_CLASSES)} per class)")
    print(f"   • Val Set  : {len(val_dataset)} samples ({len(val_dataset)//len(MATH_CLASSES)} per class)")

    # 2. Initialize Model, Loss, Optimizer
    device = torch.device("cpu")
    model = MathCNN(num_classes=len(MATH_CLASSES)).to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.003, weight_decay=1e-4)
    scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=5, gamma=0.6)

    epochs = 12
    history = []
    best_val_acc = 0.0

    print(f"\n2. Training MathCNN for {epochs} epochs...")
    start_time = time.time()

    for epoch in range(1, epochs + 1):
        model.train()
        total_loss, correct, total = 0.0, 0, 0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            total_loss += loss.item() * images.size(0)
            preds = outputs.argmax(dim=1)
            correct += (preds == labels).sum().item()
            total += labels.size(0)

        scheduler.step()
        train_loss = total_loss / total
        train_acc = (correct / total) * 100.0

        # Validation
        model.eval()
        val_loss, val_correct, val_total = 0.0, 0, 0
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)
                val_loss += loss.item() * images.size(0)
                preds = outputs.argmax(dim=1)
                val_correct += (preds == labels).sum().item()
                val_total += labels.size(0)

        val_loss = val_loss / val_total
        val_acc = (val_correct / val_total) * 100.0

        history.append({
            "epoch": epoch,
            "train_loss": round(train_loss, 4),
            "train_acc": round(train_acc, 2),
            "val_loss": round(val_loss, 4),
            "val_acc": round(val_acc, 2),
        })

        print(f"   Epoch [{epoch:02d}/{epochs:02d}] | Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.2f}% | Val Loss: {val_loss:.4f} | Val Acc: {val_acc:.2f}%")

        if val_acc > best_val_acc:
            best_val_acc = val_acc
            # Save best weights
            torch.save(model.state_dict(), os.path.join(MODELS_DIR, "weights.pth"))

    elapsed = time.time() - start_time
    print(f"\n3. Training complete in {elapsed:.1f}s. Peak Validation Accuracy: {best_val_acc:.2f}%!")

    # 3. Export weights to JSON and metadata
    weights_path = os.path.join(MODELS_DIR, "weights.pth")
    state_dict = torch.load(weights_path, map_location="cpu")

    # Serialize layer shapes and metadata
    weights_meta = {
        "model_architecture": "MathCNN",
        "input_dimension": [1, 28, 28],
        "num_classes": len(MATH_CLASSES),
        "classes": MATH_CLASSES,
        "layers": {k: list(v.shape) for k, v in state_dict.items()},
        "best_val_accuracy": round(best_val_acc, 2),
        "trained_epochs": epochs,
        "training_timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "weights_file": "weights.pth"
    }

    with open(os.path.join(MODELS_DIR, "model_metadata.json"), "w", encoding="utf-8") as f:
        json.dump(weights_meta, f, indent=2)

    with open(os.path.join(MODELS_DIR, "model_weights.json"), "w", encoding="utf-8") as f:
        json.dump({
            "metadata": weights_meta,
            "training_history": history
        }, f, indent=2)

    print(f"4. Model weights and metadata successfully saved to:")
    print(f"   • {weights_path}")
    print(f"   • {os.path.join(MODELS_DIR, 'model_metadata.json')}")
    print(f"   • {os.path.join(MODELS_DIR, 'model_weights.json')}")
    print("=" * 80)


if __name__ == "__main__":
    train_and_export()
