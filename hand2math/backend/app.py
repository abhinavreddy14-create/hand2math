"""
Hand2Math - Flask Backend Server
Hybrid Deep Learning and Symbolic AI Tutor for Handwritten Mathematics

Endpoints:
- POST /api/recognize
- POST /api/solve
- POST /api/explain
- POST /api/chat
"""

import sys
import os
import json
from flask import Flask, request, jsonify

# Include backend path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from recognition.recognizer import ExpressionRecognizer
from solver.symbolic_solver import SymbolicSolver
from tutor.ai_tutor import AITutor

app = Flask(__name__)

recognizer = ExpressionRecognizer()
solver = SymbolicSolver()
tutor = AITutor()


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "app": "Hand2Math",
        "sympy": solver.sympy_ready
    })


@app.route("/api/recognize", methods=["POST"])
def recognize():
    data = request.get_json(silent=True) or {}
    image_base64 = data.get("image", "")
    hint = data.get("hint", None)

    result = recognizer.process_canvas(image_base64, recognized_hint=hint)
    return jsonify(result), (200 if result.get("success") else 400)


@app.route("/api/solve", methods=["POST"])
def solve_expression():
    data = request.get_json(silent=True) or {}
    expression = data.get("expression", "")

    result = solver.solve(expression)
    return jsonify(result), (200 if result.get("isValid") else 400)


@app.route("/api/explain", methods=["POST"])
def explain():
    data = request.get_json(silent=True) or {}
    expression = data.get("expression", "")
    steps = data.get("steps", [])
    final_answer = data.get("finalAnswer", "")
    llm_text = data.get("llmText", None)

    result = tutor.generate_explanation(expression, steps, final_answer, llm_text=llm_text)
    return jsonify(result), 200


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    question = data.get("question", "")
    expression = data.get("expression", "")
    steps = data.get("steps", [])
    final_answer = data.get("finalAnswer", "")
    llm_answer = data.get("llmAnswer", None)

    reply = tutor.answer_follow_up(question, expression, steps, final_answer, llm_answer=llm_answer)
    return jsonify({"answer": reply}), 200


if __name__ == "__main__":
    port = int(os.environ.get("BACKEND_PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)
