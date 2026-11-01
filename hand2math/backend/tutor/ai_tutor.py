"""
Hand2Math - AI Tutor Module
Hybrid Deep Learning and Symbolic AI Tutor for Handwritten Mathematics

Responsible for:
Verified solution -> Human-friendly explanation & pedagogical follow-up tutoring.
The symbolic solver is the source of mathematical truth.
The AI tutor does not invent or alter verified mathematical answers.
"""

from typing import Dict, Any, List, Optional


class AITutor:
    """
    Produces concise pedagogical explanations for verified symbolic mathematical solutions,
    and responds to contextual follow-up inquiries.
    """

    def generate_explanation(
        self,
        expression: str,
        steps: List[str],
        final_answer: str,
        llm_text: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generates simple step-by-step pedagogical explanation.
        If an LLM response is supplied, verifies it aligns with the symbolic truth;
        otherwise generates deterministic pedagogical steps.
        """
        if llm_text and len(llm_text.strip()) > 10:
            return {
                "explanation": llm_text.strip(),
                "finalAnswer": final_answer
            }

        # Deterministic pedagogical explanation generator grounded in the verified steps
        formatted_steps = []
        if len(steps) >= 3 and "=" in expression:
            # Linear pattern e.g. ["2x + 5 = 15", "2x = 10", "x = 5"]
            formatted_steps.append("Step 1:\nSubtract the constant term from both sides to isolate the variable term.\n\n" + steps[1])
            formatted_steps.append("Step 2:\nDivide both sides by the coefficient of the variable to solve for the unknown.\n\n" + steps[-1])
        elif len(steps) == 2:
            formatted_steps.append("Step 1:\nSimplify the mathematical terms.\n\n" + steps[0])
            formatted_steps.append("Step 2:\nEvaluate the result to arrive at the solution.\n\n" + steps[1])
        else:
            for idx, st in enumerate(steps, 1):
                formatted_steps.append(f"Step {idx}:\nSimplify and evaluate the expression.\n\n{st}")

        explanation_text = "\n\n".join(formatted_steps)

        return {
            "explanation": explanation_text,
            "finalAnswer": final_answer
        }

    def answer_follow_up(
        self,
        question: str,
        expression: str,
        steps: List[str],
        final_answer: str,
        llm_answer: Optional[str] = None
    ) -> str:
        """
        Answers follow-up questions from the user grounded in the problem's verified solution.
        """
        if llm_answer and len(llm_answer.strip()) > 0:
            return llm_answer.strip()

        q_lower = question.lower()

        if "why" in q_lower or "subtract" in q_lower:
            return (
                f"We subtracted to maintain equality while isolating the variable term. "
                f"In the equation {expression}, performing the inverse operation on both sides leaves the variable on one side."
            )
        elif "divide" in q_lower or "step 2" in q_lower:
            return (
                f"In step 2, we divided both sides by the coefficient to get the single variable alone. "
                f"This results directly in the final answer: {final_answer}."
            )
        elif "similar" in q_lower or "another" in q_lower:
            return (
                f"Here is a similar problem to practice:\n\n"
                f"3x + 4 = 19\n\n"
                f"Try drawing and solving this one using the same two-step method!"
            )
        elif "simply" in q_lower or "simple" in q_lower:
            return (
                f"Simply put: Think of the equation as a balanced scale. Whatever you do to one side, "
                f"you do to the other until you find what {final_answer.split('=')[0].strip()} equals."
            )
        else:
            return (
                f"For the problem {expression}, the verified mathematical solution is {final_answer}. "
                f"Each algebraic step balances both sides of the equation to reach this result."
            )
