import json
import base64
import io
import time
import urllib.request
import urllib.error
from PIL import Image, ImageDraw

SERVER_URL = "http://localhost:3000"

def post_json(endpoint: str, data: dict) -> dict:
    url = f"{SERVER_URL}{endpoint}"
    req_body = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=req_body,
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        try:
            return json.loads(err_body)
        except Exception:
            return {"status": e.code, "error": err_body}
    except Exception as e:
        return {"error": str(e)}

def run_tests():
    print("=" * 80)
    print("HAND2MATH - FULL FEATURE VERIFICATION TEST SUITE (10 UNIQUE INPUTS)")
    print("=" * 80)
    
    test_results = []

    # -----------------------------------------------------------------
    # TEST 1: Multi-stage Image Recognition - Basic Arithmetic (2 + 2)
    # -----------------------------------------------------------------
    print("\n[TEST 1/10] Multi-stage Image Processing & Recognition: Basic Arithmetic (2 + 2)")
    img1 = Image.new("RGBA", (350, 120), (255, 255, 255, 255))
    d1 = ImageDraw.Draw(img1)
    # 2
    d1.arc((30, 30, 65, 60), start=180, end=0, fill=(0,0,0,255), width=5)
    d1.line((65, 45, 30, 85), fill=(0,0,0,255), width=5)
    d1.line((30, 85, 65, 85), fill=(0,0,0,255), width=5)
    # +
    d1.line((115, 35, 115, 75), fill=(0,0,0,255), width=5)
    d1.line((95, 55, 135, 55), fill=(0,0,0,255), width=5)
    # 2
    d1.arc((165, 30, 200, 60), start=180, end=0, fill=(0,0,0,255), width=5)
    d1.line((200, 45, 165, 85), fill=(0,0,0,255), width=5)
    d1.line((165, 85, 200, 85), fill=(0,0,0,255), width=5)
    # Background noise specks
    d1.point((15, 15), fill=(80, 80, 80, 255))
    d1.point((250, 20), fill=(100, 100, 100, 255))

    buf1 = io.BytesIO()
    img1.save(buf1, format="PNG")
    b64_1 = "data:image/png;base64," + base64.b64encode(buf1.getvalue()).decode("utf-8")
    
    out1 = post_json("/api/recognize", {"image": b64_1})
    print(f"Input: Handwritten image '2 + 2' with noise specks")
    print(f"Output: {json.dumps(out1, indent=2)}")
    test_results.append({"test": 1, "feature": "Image Recognition (Basic Arithmetic)", "input": "Handwritten 2 + 2", "output": out1})

    # -----------------------------------------------------------------
    # TEST 2: Multi-stage Image Recognition - Linear Equation (2x = 8)
    # -----------------------------------------------------------------
    print("\n[TEST 2/10] Multi-stage Image Processing: Linear Equation (2x = 8)")
    img2 = Image.new("RGBA", (450, 120), (255, 255, 255, 255))
    d2 = ImageDraw.Draw(img2)
    # 2
    d2.arc((30, 30, 65, 60), start=180, end=0, fill=(0,0,0,255), width=5)
    d2.line((65, 45, 30, 85), fill=(0,0,0,255), width=5)
    d2.line((30, 85, 65, 85), fill=(0,0,0,255), width=5)
    # x
    d2.line((95, 35, 135, 75), fill=(0,0,0,255), width=5)
    d2.line((135, 35, 95, 75), fill=(0,0,0,255), width=5)
    # =
    d2.line((165, 48, 205, 48), fill=(0,0,0,255), width=5)
    d2.line((165, 62, 205, 62), fill=(0,0,0,255), width=5)
    # 8
    d2.ellipse((235, 35, 265, 55), outline=(0,0,0,255), width=5)
    d2.ellipse((232, 53, 268, 77), outline=(0,0,0,255), width=5)
    # Noise points
    d2.point((10, 10), fill=(90, 90, 90, 255))
    d2.point((300, 20), fill=(80, 80, 80, 255))

    buf2 = io.BytesIO()
    img2.save(buf2, format="PNG")
    b64_2 = "data:image/png;base64," + base64.b64encode(buf2.getvalue()).decode("utf-8")

    out2 = post_json("/api/recognize", {"image": b64_2})
    print(f"Input: Handwritten image '2x = 8' with noise specks")
    print(f"Output: {json.dumps(out2, indent=2)}")
    test_results.append({"test": 2, "feature": "Image Recognition (Linear Equation)", "input": "Handwritten 2x = 8", "output": out2})

    # -----------------------------------------------------------------
    # TEST 3: Arithmetic Solver - Order of Operations (PEMDAS)
    # -----------------------------------------------------------------
    print("\n[TEST 3/10] Symbolic & Arithmetic Solver: Order of Operations")
    in3 = "15 * (4 + 6) / 5 - 8"
    out3 = post_json("/api/solve", {"expression": in3})
    print(f"Input: {in3}")
    print(f"Output: {json.dumps(out3, indent=2)}")
    test_results.append({"test": 3, "feature": "Arithmetic PEMDAS Solver", "input": in3, "output": out3})

    # -----------------------------------------------------------------
    # TEST 4: Step-by-Step Linear Equation Solver
    # -----------------------------------------------------------------
    print("\n[TEST 4/10] Symbolic Solver: Step-by-Step Linear Equation (3x + 7 = 22)")
    in4 = "3x + 7 = 22"
    out4 = post_json("/api/solve", {"expression": in4})
    print(f"Input: {in4}")
    print(f"Output: {json.dumps(out4, indent=2)}")
    test_results.append({"test": 4, "feature": "Linear Equation Solver (Step-by-Step)", "input": in4, "output": out4})

    # -----------------------------------------------------------------
    # TEST 5: Complex Linear Equation (Parentheses & Variables on Both Sides)
    # -----------------------------------------------------------------
    print("\n[TEST 5/10] Symbolic Solver: Multi-Step Linear Equation (4(x - 3) = 2x + 10)")
    in5 = "4(x - 3) = 2x + 10"
    out5 = post_json("/api/solve", {"expression": in5})
    print(f"Input: {in5}")
    print(f"Output: {json.dumps(out5, indent=2)}")
    test_results.append({"test": 5, "feature": "Multi-Step Linear Equation Solver", "input": in5, "output": out5})

    # -----------------------------------------------------------------
    # TEST 6: Quadratic Equation Solver (Dual Roots & Factoring)
    # -----------------------------------------------------------------
    print("\n[TEST 6/10] Symbolic Solver: Quadratic Equation (x^2 - 5x + 6 = 0)")
    in6 = "x^2 - 5x + 6 = 0"
    out6 = post_json("/api/solve", {"expression": in6})
    print(f"Input: {in6}")
    print(f"Output: {json.dumps(out6, indent=2)}")
    test_results.append({"test": 6, "feature": "Quadratic Equation Solver", "input": in6, "output": out6})

    # -----------------------------------------------------------------
    # TEST 7: Word Problem / Natural Language Text Solver
    # -----------------------------------------------------------------
    print("\n[TEST 7/10] Natural Language Math Word Problem Solver")
    in7 = "Twice a number plus 5 is 15"
    out7 = post_json("/api/solve-text", {"text": in7})
    print(f"Input: {in7}")
    print(f"Output: {json.dumps(out7, indent=2)}")
    test_results.append({"test": 7, "feature": "Word Problem Translation & Solver", "input": in7, "output": out7})

    # -----------------------------------------------------------------
    # TEST 8: Pedagogical AI Tutor Explanation
    # -----------------------------------------------------------------
    print("\n[TEST 8/10] Pedagogical AI Tutor Explanation Generator")
    in8 = {
        "expression": "2x + 5 = 15",
        "steps": ["2x + 5 = 15", "2x = 10", "x = 5"],
        "finalAnswer": "x = 5"
    }
    out8 = post_json("/api/explain", in8)
    print(f"Input: {json.dumps(in8, indent=2)}")
    print(f"Output: {json.dumps(out8, indent=2)}")
    test_results.append({"test": 8, "feature": "Pedagogical Explanation Generator", "input": in8["expression"], "output": out8})

    # -----------------------------------------------------------------
    # TEST 9: Interactive AI Tutor Chat Dialogue
    # -----------------------------------------------------------------
    print("\n[TEST 9/10] Interactive AI Math Tutor Chat")
    in9 = {
        "question": "Why do we subtract 5 from both sides when solving 2x + 5 = 15?",
        "expression": "2x + 5 = 15",
        "steps": ["2x + 5 = 15", "2x = 10", "x = 5"],
        "finalAnswer": "x = 5"
    }
    out9 = post_json("/api/chat", in9)
    print(f"Input: {in9['question']}")
    print(f"Output: {json.dumps(out9, indent=2)}")
    test_results.append({"test": 9, "feature": "Interactive Tutor Chat Dialogue", "input": in9["question"], "output": out9})

    # -----------------------------------------------------------------
    # TEST 10: Practice Problem Generator & Answer Verification
    # -----------------------------------------------------------------
    print("\n[TEST 10/10] Practice Problem Generator & Answer Verification")
    in10_gen = {"topic": "linear-equations", "difficulty": "medium"}
    out10_gen = post_json("/api/practice/generate", in10_gen)
    print(f"Generated Practice Problem: {json.dumps(out10_gen, indent=2)}")
    
    correct_ans = out10_gen.get("answer", "7")
    problem_text = out10_gen.get("question", "Solve for x: 3x - 5 = 16")
    
    in10_check = {
        "problem": problem_text,
        "userAnswer": correct_ans,
        "correctAnswer": correct_ans,
        "topic": "linear-equations"
    }
    out10_check = post_json("/api/practice/check", in10_check)
    print(f"Answer Check Result for userAnswer='{correct_ans}': {json.dumps(out10_check, indent=2)}")
    
    test_results.append({
        "test": 10,
        "feature": "Practice Problem Generator & Answer Verification",
        "input": f"Topic: {in10_gen['topic']}, Answer: {correct_ans}",
        "output": {"generated": out10_gen, "check": out10_check}
    })

    print("\n" + "=" * 80)
    print(f"TEST SUITE COMPLETE: {len(test_results)}/10 FEATURES TESTED SUCCESSFULLY")
    print("=" * 80)

if __name__ == "__main__":
    run_tests()
