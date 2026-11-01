"""
Hand2Math - Symbolic Mathematics Engine
Hybrid Deep Learning and Symbolic AI Tutor for Handwritten Mathematics

Responsible for:
Expression -> Verified mathematical solution
Uses SymPy for exact mathematical verification, step-by-step resolution, and simplification.
The symbolic engine is the source of mathematical truth.
"""

import re
import sys
import math
from typing import Dict, Any, List, Optional

try:
    import sympy
    from sympy import (
        symbols, Eq, solve, simplify, factor, expand,
        sympify, latex, sqrt, Rational, Float, Integer, gcd
    )
    SYMPY_AVAILABLE = True
except ImportError:
    SYMPY_AVAILABLE = False


class SymbolicSolver:
    """
    Parses expressions, verifies mathematical validity, solves equations,
    simplifies expressions, and generates rich pedagogical intermediate mathematical steps.
    """

    def __init__(self):
        self.sympy_ready = SYMPY_AVAILABLE

    def clean_and_prepare(self, raw_expression: str) -> str:
        """Prepares expression string for symbolic parsing (implicit multiplication, caret powers)."""
        expr = raw_expression.strip()
        expr = expr.replace("^", "**")
        expr = expr.replace("√", "sqrt")
        expr = expr.replace("×", "*").replace("÷", "/")
        
        # Add implicit multiplication e.g. 2x -> 2*x, 3(x+1) -> 3*(x+1)
        expr = re.sub(r'(\d)([a-zA-Z(])', r'\1*\2', expr)
        expr = re.sub(r'([a-zA-Z)])(\d)', r'\1*\2', expr)
        expr = re.sub(r'(\))(\()', r'\1*\2', expr)
        # Variable letter followed by '(': e.g. x(5 - x) -> x*(5 - x)
        expr = re.sub(r'(?<![a-zA-Z])([a-zA-Z])\(', r'\1*(', expr)
        # ')' followed by variable: e.g. (5-x)x -> (5-x)*x
        expr = re.sub(r'\)([a-zA-Z])', r')*\1', expr)
        return expr

    def solve(self, raw_expression: str) -> Dict[str, Any]:
        """
        Main solver method.
        Returns:
            isValid: bool
            expression: original cleaned expression
            equationSteps: list of intermediate mathematical steps
            finalAnswer: verified final answer string
            latex: LaTeX representation for academic display
            errorType: 'invalid' | 'unsupported' | None
        """
        if not raw_expression or not raw_expression.strip():
            return {
                "isValid": False,
                "errorType": "empty",
                "message": "Please draw or provide a mathematical expression first."
            }

        cleaned = raw_expression.strip()

        # Check if it is an equation (contains '=')
        if "=" in cleaned:
            return self._solve_equation(cleaned)
        else:
            return self._solve_expression(cleaned)

    def _solve_equation(self, eq_str: str) -> Dict[str, Any]:
        """Solves algebraic equations (linear, multi-step, quadratic, systems)."""
        parts = eq_str.split("=")
        if len(parts) != 2:
            return {
                "isValid": False,
                "errorType": "invalid",
                "message": "The recognized expression could not be solved. Please check the equation and try again."
            }

        left_raw, right_raw = parts[0].strip(), parts[1].strip()
        if not left_raw or not right_raw:
            return {
                "isValid": False,
                "errorType": "invalid",
                "message": "The recognized expression could not be solved. Please check the equation and try again."
            }

        # 1. Specialized step-by-step solvers
        # Check parentheses linear: e.g. 3(x - 4) = 18
        paren_res = self._try_parentheses_linear_solve(eq_str)
        if paren_res:
            return paren_res

        # Check variables on both sides: e.g. 5x + 3 = 2x + 18
        both_sides_res = self._try_both_sides_linear_solve(eq_str)
        if both_sides_res:
            return both_sides_res

        # Check standard linear: ax + b = c or ax = c
        linear_res = self._try_linear_step_solve(eq_str)
        if linear_res:
            return linear_res

        # Check quadratic: ax^2 + bx + c = 0 or x^2 - 9 = 0
        quad_res = self._try_quadratic_step_solve(eq_str)
        if quad_res:
            return quad_res

        # If SymPy is available, general symbolic solver with full steps
        if self.sympy_ready:
            try:
                prep_left = self.clean_and_prepare(left_raw)
                prep_right = self.clean_and_prepare(right_raw)

                var_match = re.findall(r'[a-zA-Z]', eq_str)
                variables = sorted(list(set(var_match)))
                sym_vars = [symbols(v) for v in variables] if variables else [symbols('x')]
                target_var = sym_vars[0]

                lhs = sympify(prep_left)
                rhs = sympify(prep_right)
                equation = Eq(lhs, rhs)

                solutions = solve(equation, target_var)
                diff = simplify(lhs - rhs)

                steps = [eq_str]
                if str(diff) != str(lhs) and str(rhs) != "0":
                    steps.append(f"{str(diff).replace('**', '^')} = 0")

                try:
                    factored = factor(diff)
                    if str(factored) != str(diff) and "=" not in str(factored):
                        steps.append(f"{str(factored).replace('**', '^')} = 0")
                except Exception:
                    pass

                if not solutions:
                    final_ans = "No solution"
                    steps.append(final_ans)
                else:
                    ans_strings = [str(s).replace('**', '^') for s in solutions]
                    final_ans = f"{target_var} = {', '.join(ans_strings)}"
                    steps.append(final_ans)

                latex_str = f"{latex(lhs)} = {latex(rhs)}"

                return {
                    "isValid": True,
                    "expression": eq_str,
                    "equationSteps": self._deduplicate_steps(steps),
                    "finalAnswer": final_ans,
                    "latex": latex_str,
                    "errorType": None
                }
            except Exception:
                pass

        return {
            "isValid": False,
            "errorType": "invalid",
            "message": "The recognized expression could not be solved. Please check the handwriting and try again."
        }

    def _solve_expression(self, expr_str: str) -> Dict[str, Any]:
        """Calculates arithmetic, fractions, powers, roots, or algebraic simplification."""
        # 1. Check fractions: e.g. (3/4) + (1/2) or 3/4 + 1/2
        frac_res = self._try_fraction_step_solve(expr_str)
        if frac_res:
            return frac_res

        # 2. Check PEMDAS multi-operation arithmetic: e.g. 15 * 8 - 40 / 2
        pemdas_res = self._try_pemdas_step_solve(expr_str)
        if pemdas_res:
            return pemdas_res

        # 3. Check square roots: e.g. sqrt(144)
        sqrt_match = re.match(r'^(?:sqrt|√)\s*[\(]?\s*(\d+(?:\.\d+)?)\s*[\)]?$', expr_str.strip(), re.IGNORECASE)
        if sqrt_match:
            n = float(sqrt_match.group(1))
            root = math.isqrt(int(n)) if n.is_integer() and int(n) >= 0 else math.sqrt(n)
            if isinstance(root, int) and root * root == int(n):
                return {
                    "isValid": True,
                    "expression": expr_str,
                    "equationSteps": [
                        expr_str,
                        f"√{int(n)} = {root} (since {root}² = {int(n)})"
                    ],
                    "finalAnswer": str(root),
                    "latex": f"\\sqrt{{{int(n)}}} = {root}",
                    "errorType": None
                }

        # 4. If SymPy is available, handle algebraic expansions, factoring, derivatives
        if self.sympy_ready:
            try:
                # Factorization: factor(x^2 - 5x + 6) or factor x^2 - 5x + 6
                factor_match = re.match(r'^(?:factor|factorize)\s*[\(:\[]?\s*(.*?)\s*[\):\]]?$', expr_str, re.IGNORECASE)
                if factor_match:
                    inner = factor_match.group(1).rstrip(')')
                    prep = self.clean_and_prepare(inner)
                    parsed = sympify(prep)
                    res = factor(parsed)
                    final_ans = str(res).replace('**', '^')
                    return {
                        "isValid": True,
                        "expression": expr_str,
                        "equationSteps": [f"Factor {inner}", f"= {final_ans}"],
                        "finalAnswer": final_ans,
                        "latex": f"\\text{{factor}}\\left({latex(parsed)}\\right) = {latex(res)}",
                        "errorType": None
                    }

                # General simplification & rational combination
                prep = self.clean_and_prepare(expr_str)
                parsed = sympify(prep)
                from sympy import together, expand

                steps = [expr_str]
                expanded_prod = expand(parsed)
                comb = together(parsed)
                simplified = simplify(parsed)

                # Check if there are polynomial products to expand (e.g. 2x(5 - x))
                if "(" in expr_str and ")" in expr_str:
                    step_expand = str(expanded_prod).replace('**', '^')
                    if step_expand != expr_str and step_expand != str(comb).replace('**', '^'):
                        steps.append(f"Expand product terms: {step_expand}")

                # Combine over common denominator if rational fraction
                num, den = comb.as_numer_denom()
                comb_clean = expand(num) / den
                comb_str = str(comb_clean).replace('**', '^')
                if comb_str != expr_str and comb_str != steps[-1]:
                    steps.append(f"Combine over common denominator: = {comb_str}")
                elif str(simplified).replace('**', '^') != expr_str and str(simplified).replace('**', '^') != steps[-1]:
                    steps.append(f"= {str(simplified).replace('**', '^')}")

                final_ans = comb_str if comb_str != expr_str else str(simplified).replace('**', '^')

                return {
                    "isValid": True,
                    "expression": expr_str,
                    "equationSteps": self._deduplicate_steps(steps),
                    "finalAnswer": final_ans,
                    "latex": latex(comb_clean),
                    "errorType": None
                }
            except Exception:
                pass

        # 5. Arithmetic evaluation fallback (e.g. 2 + 2)
        try:
            safe_expr = expr_str.replace("^", "**").replace("×", "*").replace("÷", "/")
            if re.match(r'^[\d\s\+\-\*\/\(\)\.]+$', safe_expr):
                val = eval(safe_expr, {"__builtins__": {}}, {})
                formatted_val = int(val) if isinstance(val, float) and val.is_integer() else round(val, 4)
                return {
                    "isValid": True,
                    "expression": expr_str,
                    "equationSteps": [expr_str, f"= {formatted_val}"],
                    "finalAnswer": str(formatted_val),
                    "latex": expr_str,
                    "errorType": None
                }
        except Exception:
            pass

        return {
            "isValid": False,
            "errorType": "invalid",
            "message": "The recognized expression could not be solved. Please check the handwriting and try again."
        }

    def _try_linear_step_solve(self, eq_str: str) -> Optional[Dict[str, Any]]:
        """ax + b = c, ax - b = c, ax = c"""
        pattern = r'^\s*(-?\d*)([a-zA-Z])\s*([\+\-])\s*(\d+(?:\.\d+)?)\s*=\s*(-?\d+(?:\.\d+)?)\s*$'
        m = re.match(pattern, eq_str)
        if not m:
            simple_pattern = r'^\s*(-?\d*)([a-zA-Z])\s*=\s*(-?\d+(?:\.\d+)?)\s*$'
            sm = re.match(simple_pattern, eq_str)
            if sm:
                coeff_str, var, rhs_str = sm.group(1), sm.group(2), sm.group(3)
                coeff = 1 if coeff_str == '' else (-1 if coeff_str == '-' else float(coeff_str))
                rhs = float(rhs_str)
                ans = rhs / coeff
                ans_str = str(int(ans)) if ans.is_integer() else f"{ans:.2f}"
                coeff_disp = int(coeff) if coeff.is_integer() else coeff
                return {
                    "isValid": True,
                    "expression": eq_str,
                    "equationSteps": [
                        eq_str,
                        f"Divide both sides by {coeff_disp}:",
                        f"{var} = {rhs_str} / {coeff_disp}",
                        f"{var} = {ans_str}"
                    ],
                    "finalAnswer": f"{var} = {ans_str}",
                    "latex": f"{coeff_str}{var} = {rhs_str}",
                    "errorType": None
                }
            return None

        coeff_str, var, sign, b_str, c_str = m.group(1), m.group(2), m.group(3), m.group(4), m.group(5)
        coeff = 1 if coeff_str == '' else (-1 if coeff_str == '-' else float(coeff_str))
        b = float(b_str) if sign == '+' else -float(b_str)
        c = float(c_str)

        rhs_after_sub = c - b
        rhs_after_str = str(int(rhs_after_sub)) if rhs_after_sub.is_integer() else f"{rhs_after_sub:.2f}"
        coeff_display = "" if coeff == 1 else ("-" if coeff == -1 else str(int(coeff) if coeff.is_integer() else coeff))
        
        final_val = rhs_after_sub / coeff
        final_str = str(int(final_val)) if final_val.is_integer() else f"{final_val:.2f}"

        action_desc = f"Subtract {b_str} from both sides" if sign == '+' else f"Add {b_str} to both sides"
        step2 = f"{coeff_display}{var} = {rhs_after_str}"
        step3 = f"{var} = {final_str}"

        steps = [
            eq_str,
            f"{action_desc}:",
            step2,
            f"Divide both sides by {coeff_display or '1'}:",
            step3
        ]

        return {
            "isValid": True,
            "expression": eq_str,
            "equationSteps": steps,
            "finalAnswer": f"{var} = {final_str}",
            "latex": f"{coeff_display}{var} {sign} {b_str} = {c_str}",
            "errorType": None
        }

    def _try_parentheses_linear_solve(self, eq_str: str) -> Optional[Dict[str, Any]]:
        """e.g. 3(x - 4) = 18 or 2(3x + 1) = 20"""
        pattern = r'^\s*(-?\d*)\s*\(\s*(-?\d*)([a-zA-Z])\s*([\+\-])\s*(\d+(?:\.\d+)?)\s*\)\s*=\s*(-?\d+(?:\.\d+)?)\s*$'
        m = re.match(pattern, eq_str)
        if not m:
            return None

        out_coeff_str, in_coeff_str, var, sign, b_str, c_str = m.group(1), m.group(2), m.group(3), m.group(4), m.group(5), m.group(6)
        out_coeff = 1 if out_coeff_str == '' else (-1 if out_coeff_str == '-' else float(out_coeff_str))
        in_coeff = 1 if in_coeff_str == '' else (-1 if in_coeff_str == '-' else float(in_coeff_str))
        b = float(b_str) if sign == '+' else -float(b_str)
        c = float(c_str)

        total_coeff = out_coeff * in_coeff
        total_const = out_coeff * b
        c_val = c

        # Option: Distribute
        distrib_const_str = f"+ {int(total_const)}" if total_const >= 0 else f"- {abs(int(total_const))}"
        tot_coeff_str = "" if total_coeff == 1 else ("-" if total_coeff == -1 else str(int(total_coeff)))
        step1 = f"{tot_coeff_str}{var} {distrib_const_str} = {int(c_val)}"

        rhs_after = c_val - total_const
        step2 = f"{tot_coeff_str}{var} = {int(rhs_after)}"

        final_ans = rhs_after / total_coeff
        final_str = str(int(final_ans)) if final_ans.is_integer() else f"{final_ans:.2f}"
        step3 = f"{var} = {final_str}"

        steps = [
            eq_str,
            f"Apply the Distributive Property (multiply {int(out_coeff)} by each term inside):",
            step1,
            f"Isolate variable term:",
            step2,
            f"Divide by {int(total_coeff)}:",
            step3
        ]

        return {
            "isValid": True,
            "expression": eq_str,
            "equationSteps": steps,
            "finalAnswer": f"{var} = {final_str}",
            "latex": eq_str,
            "errorType": None
        }

    def _try_both_sides_linear_solve(self, eq_str: str) -> Optional[Dict[str, Any]]:
        """e.g. 5x + 3 = 2x + 18"""
        pattern = r'^\s*(-?\d*)([a-zA-Z])\s*([\+\-])\s*(\d+(?:\.\d+)?)\s*=\s*(-?\d*)([a-zA-Z])\s*([\+\-])\s*(\d+(?:\.\d+)?)\s*$'
        m = re.match(pattern, eq_str)
        if not m:
            return None

        c1_str, v1, s1, b1_str, c2_str, v2, s2, b2_str = m.groups()
        if v1.lower() != v2.lower():
            return None
        var = v1

        c1 = 1 if c1_str == '' else (-1 if c1_str == '-' else float(c1_str))
        c2 = 1 if c2_str == '' else (-1 if c2_str == '-' else float(c2_str))
        b1 = float(b1_str) if s1 == '+' else -float(b1_str)
        b2 = float(b2_str) if s2 == '+' else -float(b2_str)

        diff_coeff = c1 - c2
        if diff_coeff == 0:
            return None

        diff_coeff_str = "" if diff_coeff == 1 else ("-" if diff_coeff == -1 else str(int(diff_coeff)))
        b1_disp = f"+ {int(b1)}" if b1 >= 0 else f"- {abs(int(b1))}"
        step1 = f"{diff_coeff_str}{var} {b1_disp} = {int(b2)}"

        rhs_after = b2 - b1
        step2 = f"{diff_coeff_str}{var} = {int(rhs_after)}"

        final_ans = rhs_after / diff_coeff
        final_str = str(int(final_ans)) if final_ans.is_integer() else f"{final_ans:.2f}"
        step3 = f"{var} = {final_str}"

        steps = [
            eq_str,
            f"Subtract {int(c2)}{var} from both sides:",
            step1,
            f"Subtract {int(b1)} from both sides:",
            step2,
            f"Divide both sides by {int(diff_coeff)}:",
            step3
        ]

        return {
            "isValid": True,
            "expression": eq_str,
            "equationSteps": steps,
            "finalAnswer": f"{var} = {final_str}",
            "latex": eq_str,
            "errorType": None
        }

    def _try_quadratic_step_solve(self, eq_str: str) -> Optional[Dict[str, Any]]:
        """e.g. x^2 - 5x + 6 = 0 or x^2 - 9 = 0 or 2x^2 + 5x - 3 = 0"""
        compact = eq_str.replace(" ", "")

        # 1. Pure quadratic: x^2 - k = 0
        pure_m = re.match(r'^([a-zA-Z])\^2\s*-\s*(\d+(?:\.\d+)?)\s*=\s*0$', compact)
        if pure_m:
            v = pure_m.group(1)
            k = float(pure_m.group(2))
            root = math.isqrt(int(k)) if k.is_integer() else math.sqrt(k)
            if isinstance(root, int) and root * root == int(k):
                return {
                    "isValid": True,
                    "expression": eq_str,
                    "equationSteps": [
                        eq_str,
                        f"Add {int(k)} to both sides: {v}² = {int(k)}",
                        f"Take the square root of both sides: {v} = ±√{int(k)}",
                        f"{v} = {root} or {v} = -{root}"
                    ],
                    "finalAnswer": f"{v} = ±{root}",
                    "latex": f"{v}^2 - {int(k)} = 0",
                    "errorType": None
                }

        # 2. Standard quadratic: ax^2 + bx + c = 0
        quad_m = re.match(r'^(-?\d*)([a-zA-Z])\^2\s*([\+\-]\s*\d*)\s*([a-zA-Z])\s*([\+\-]\s*\d+(?:\.\d+)?)\s*=\s*0$', eq_str.replace(" ", ""))
        if not quad_m:
            return None

        a_str, v1, b_str, v2, c_str = quad_m.groups()
        if v1 != v2:
            return None
        v = v1

        a = 1 if a_str == '' else (-1 if a_str == '-' else float(a_str))
        
        b_clean = b_str.replace(" ", "")
        if b_clean in ['+', '']:
            b = 1.0
        elif b_clean == '-':
            b = -1.0
        else:
            b = float(b_clean)

        c = float(c_str.replace(" ", ""))

        # Discriminant: Δ = b^2 - 4ac
        disc = b**2 - 4 * a * c
        disc_int = int(disc) if disc.is_integer() else disc

        if a == 1 and disc >= 0 and math.isqrt(int(disc))**2 == int(disc):
            # Check integer factoring: (x - r1)(x - r2) = 0
            sqrt_d = math.isqrt(int(disc))
            r1 = (-b + sqrt_d) / 2.0
            r2 = (-b - sqrt_d) / 2.0
            p1 = -r1
            p2 = -r2

            p1_str = f"+ {int(p1)}" if p1 >= 0 else f"- {abs(int(p1))}"
            p2_str = f"+ {int(p2)}" if p2 >= 0 else f"- {abs(int(p2))}"
            factor_step = f"({v} {p1_str})({v} {p2_str}) = 0"

            r1_str = str(int(r1)) if r1.is_integer() else f"{r1:.2f}"
            r2_str = str(int(r2)) if r2.is_integer() else f"{r2:.2f}"

            steps = [
                eq_str,
                f"Standard Form: a = {int(a)}, b = {int(b)}, c = {int(c)}",
                f"Factor the quadratic into binomials:",
                factor_step,
                f"Apply Zero-Product Property ({v} {p1_str} = 0 or {v} {p2_str} = 0):",
                f"{v} = {r1_str} or {v} = {r2_str}"
            ]

            return {
                "isValid": True,
                "expression": eq_str,
                "equationSteps": steps,
                "finalAnswer": f"{v} = {r1_str}, {r2_str}" if r1 != r2 else f"{v} = {r1_str}",
                "latex": eq_str,
                "errorType": None
            }

        # Quadratic Formula
        if disc >= 0:
            sqrt_d = math.sqrt(disc)
            r1 = (-b + sqrt_d) / (2 * a)
            r2 = (-b - sqrt_d) / (2 * a)
            r1_str = str(int(r1)) if r1.is_integer() else f"{r1:.2f}"
            r2_str = str(int(r2)) if r2.is_integer() else f"{r2:.2f}"
            ans_str = f"{v} = {r1_str}, {r2_str}" if r1 != r2 else f"{v} = {r1_str}"
        else:
            ans_str = "No real solutions (complex roots)"

        steps = [
            eq_str,
            f"Use Quadratic Formula: {v} = (-b ± √(b² - 4ac)) / (2a)",
            f"Coefficients: a = {int(a) if a.is_integer() else a}, b = {int(b) if b.is_integer() else b}, c = {int(c) if c.is_integer() else c}",
            f"Discriminant: Δ = ({int(b)})² - 4({int(a)})({int(c)}) = {disc_int}",
            ans_str
        ]

        return {
            "isValid": True,
            "expression": eq_str,
            "equationSteps": steps,
            "finalAnswer": ans_str,
            "latex": eq_str,
            "errorType": None
        }

    def _try_fraction_step_solve(self, expr_str: str) -> Optional[Dict[str, Any]]:
        """e.g. (3/4) + (1/2) or 3/4 + 1/2"""
        pattern = r'^\s*\(?\s*(\d+)\s*\/\s*(\d+)\s*\)?\s*([\+\-\*\/])\s*\(?\s*(\d+)\s*\/\s*(\d+)\s*\)?\s*$'
        m = re.match(pattern, expr_str)
        if not m:
            return None

        n1, d1, op, n2, d2 = int(m.group(1)), int(m.group(2)), m.group(3), int(m.group(4)), int(m.group(5))
        if d1 == 0 or d2 == 0:
            return None

        if op == '+':
            # Common denominator: lcm = (d1 * d2) // gcd(d1, d2)
            common_d = (d1 * d2) // math.gcd(d1, d2)
            m1 = common_d // d1
            m2 = common_d // d2
            new_n1 = n1 * m1
            new_n2 = n2 * m2
            res_num = new_n1 + new_n2
            g = math.gcd(res_num, common_d)
            fin_n = res_num // g
            fin_d = common_d // g

            steps = [
                expr_str,
                f"Find Least Common Denominator (LCD) of {d1} and {d2}: LCD = {common_d}",
                f"Convert fractions to common denominator:",
                f"({new_n1}/{common_d}) + ({new_n2}/{common_d})",
                f"Add numerators over common denominator:",
                f"({new_n1} + {new_n2}) / {common_d} = {res_num}/{common_d}",
            ]
            if g > 1:
                steps.append(f"Simplify by dividing numerator and denominator by {g}: = {fin_n}/{fin_d}")

            final_ans = f"{fin_n}/{fin_d}" if fin_d != 1 else str(fin_n)
            return {
                "isValid": True,
                "expression": expr_str,
                "equationSteps": steps,
                "finalAnswer": final_ans,
                "latex": f"\\frac{{{n1}}}{{{d1}}} + \\frac{{{n2}}}{{{d2}}} = \\frac{{{fin_n}}}{{{fin_d}}}",
                "errorType": None
            }

        elif op == '-':
            common_d = (d1 * d2) // math.gcd(d1, d2)
            m1 = common_d // d1
            m2 = common_d // d2
            new_n1 = n1 * m1
            new_n2 = n2 * m2
            res_num = new_n1 - new_n2
            g = math.gcd(abs(res_num), common_d)
            fin_n = res_num // g
            fin_d = common_d // g

            steps = [
                expr_str,
                f"Find Least Common Denominator (LCD) of {d1} and {d2}: LCD = {common_d}",
                f"Convert fractions: ({new_n1}/{common_d}) - ({new_n2}/{common_d})",
                f"Subtract numerators: ({new_n1} - {new_n2}) / {common_d} = {res_num}/{common_d}",
            ]
            if g > 1:
                steps.append(f"Simplify: = {fin_n}/{fin_d}")

            final_ans = f"{fin_n}/{fin_d}" if fin_d != 1 else str(fin_n)
            return {
                "isValid": True,
                "expression": expr_str,
                "equationSteps": steps,
                "finalAnswer": final_ans,
                "latex": f"\\frac{{{n1}}}{{{d1}}} - \\frac{{{n2}}}{{{d2}}} = \\frac{{{fin_n}}}{{{fin_d}}}",
                "errorType": None
            }

        elif op == '*':
            res_num = n1 * n2
            res_den = d1 * d2
            g = math.gcd(res_num, res_den)
            fin_n = res_num // g
            fin_d = res_den // g

            steps = [
                expr_str,
                f"Multiply numerators and denominators: ({n1} * {n2}) / ({d1} * {d2}) = {res_num}/{res_den}",
            ]
            if g > 1:
                steps.append(f"Reduce fraction by dividing by {g}: = {fin_n}/{fin_d}")

            final_ans = f"{fin_n}/{fin_d}" if fin_d != 1 else str(fin_n)
            return {
                "isValid": True,
                "expression": expr_str,
                "equationSteps": steps,
                "finalAnswer": final_ans,
                "latex": f"\\frac{{{n1}}}{{{d1}}} \\cdot \\frac{{{n2}}}{{{d2}}} = \\frac{{{fin_n}}}{{{fin_d}}}",
                "errorType": None
            }

        return None

    def _try_pemdas_step_solve(self, expr_str: str) -> Optional[Dict[str, Any]]:
        """e.g. 15 * 8 - 40 / 2 or 3 * 5 + 4"""
        if not re.match(r'^[\d\s\+\-\*\/]+$', expr_str):
            return None
        # Check if contains both multiply/divide AND add/subtract
        has_md = '*' in expr_str or '/' in expr_str
        has_as = '+' in expr_str or '-' in expr_str
        if not (has_md and has_as):
            return None

        try:
            val = eval(expr_str.replace("^", "**"), {"__builtins__": {}}, {})
            ans_str = str(int(val)) if isinstance(val, float) and val.is_integer() else f"{val:.2f}"

            # Break into steps
            steps = [
                expr_str,
                f"Apply Order of Operations (PEMDAS: Multiplication & Division first):",
            ]

            # Simplify sub-terms
            tokens = re.split(r'(\s*[\+\-]\s*)', expr_str)
            sub_results = []
            for t in tokens:
                if '*' in t or '/' in t:
                    sub_v = eval(t, {"__builtins__": {}}, {})
                    sub_results.append(str(int(sub_v) if isinstance(sub_v, float) and sub_v.is_integer() else sub_v))
                else:
                    sub_results.append(t)

            inter_str = "".join(sub_results).strip()
            if inter_str != expr_str:
                steps.append(f"= {inter_str}")

            steps.append(f"Perform Addition & Subtraction:")
            steps.append(f"= {ans_str}")

            return {
                "isValid": True,
                "expression": expr_str,
                "equationSteps": self._deduplicate_steps(steps),
                "finalAnswer": ans_str,
                "latex": expr_str,
                "errorType": None
            }
        except Exception:
            return None

    def _deduplicate_steps(self, steps: List[str]) -> List[str]:
        deduped = []
        for s in steps:
            s_clean = s.strip()
            if s_clean and (not deduped or deduped[-1] != s_clean):
                deduped.append(s_clean)
        return deduped


if __name__ == "__main__":
    import json
    expr_arg = sys.argv[1] if len(sys.argv) > 1 else ""
    solver_instance = SymbolicSolver()
    result_dict = solver_instance.solve(expr_arg)
    print(json.dumps(result_dict))
