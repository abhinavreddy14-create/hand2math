# Hand2Math

### Hybrid Deep Learning and Symbolic AI Tutor for Handwritten Mathematics

A clean, lightweight, and functional academic AI system designed to recognize handwritten mathematical expressions, verify and solve them symbolically with SymPy, generate step-by-step pedagogical explanations, and answer contextual follow-up questions.

---

## Processing Pipeline

```text
Handwritten Canvas
       ↓
Image Preprocessing
       ↓
CNN Handwriting Recognition
       ↓
Recognized Mathematical Expression
       ↓
Symbolic Math Engine (SymPy)
       ↓
Solution / Verification
       ↓
AI Tutor
       ↓
Step-by-Step Explanation
       ↓
User Follow-up Question
```

---

## Architectural Separation of Concerns

1. **CNN Recognition Component**:
   - Converts raw canvas strokes and bounding boxes into isolated mathematical symbols (`0-9`, `+`, `-`, `*`, `/`, `=`, `x`, `y`, `^`, `()`).
   - Defined in `backend/recognition/cnn_model.py` and `backend/recognition/recognizer.py`.

2. **Symbolic Mathematics Engine**:
   - Source of mathematical truth.
   - Parses mathematical expressions, validates algebra, calculates arithmetic, simplifies terms, and generates intermediate steps using SymPy.
   - Defined in `backend/solver/symbolic_solver.py`.

3. **AI Tutor**:
   - Uses the verified symbolic solution as factual ground truth.
   - Produces human-friendly explanations and answers follow-up student queries.
   - Defined in `backend/tutor/ai_tutor.py` and server integration.

---

## API Endpoints

- `POST /api/recognize`: Processes base64 canvas image into recognized mathematical expression.
- `POST /api/solve`: Symbolically verifies, simplifies, and solves expressions.
- `POST /api/explain`: Formulates step-by-step tutoring explanations from verified solutions.
- `POST /api/chat`: Contextual Q&A tutor for student questions.
