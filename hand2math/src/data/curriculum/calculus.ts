import { TopicContent } from '../mathCurriculum';

export const CALCULUS_TOPICS: Record<string, TopicContent> = {
  functions: {
    id: 'functions',
    title: 'Functions & Relations',
    category: 'Calculus Foundations',
    subTopics: ['Definition of Function f(x)', 'Domain and Range', 'Vertical Line Test', 'Composite Functions', 'Inverse Functions'],
    whatIsIt: {
      definition: 'A function f: A → B is a mathematical relation that maps every input element x in domain A to exactly one output value y in codomain B, expressed as y = f(x).',
      terms: ['Domain: set of permissible inputs x', 'Range: set of all achievable outputs y', 'Composite Function: (f ∘ g)(x) = f(g(x))', 'Inverse Function: f⁻¹(x) where f(f⁻¹(x)) = x'],
      formulaOrRule: 'y = f(x), \\quad (f \\circ g)(x) = f(g(x)), \\quad f^{-1}(f(x)) = x',
      whyUsed: 'Functions model quantitative dependencies in science, computing, and economics: velocity from time, profit from sales, and neural network transformations.',
    },
    example1: {
      problem: 'Given f(x) = 2x^2 - 3x + 1, evaluate f(-3).',
      steps: [
        { action: 'Substitute x = -3 into the expression.', math: 'f(-3) = 2(-3)^2 - 3(-3) + 1' },
        { action: 'Evaluate exponents with negative sign preserved in parentheses.', math: '(-3)^2 = 9 \\implies 2(9) = 18' },
        { action: 'Perform multiplications and additions.', math: '18 - (-9) + 1 = 18 + 9 + 1 = 28' },
      ],
      finalAnswer: '28',
    },
    example2: {
      problem: 'Given f(x) = 3x + 2 and g(x) = x^2 - 1, find the composite function (f ∘ g)(4).',
      steps: [
        { action: 'Evaluate the inner function g(4) first.', math: 'g(4) = 4^2 - 1 = 16 - 1 = 15' },
        { action: 'Substitute this result into the outer function f(15).', math: 'f(15) = 3(15) + 2 = 45 + 2 = 47' },
      ],
      finalAnswer: '47',
    },
    keyRules: [
      'Each input x must produce exactly one output y; if a vertical line cuts the graph more than once, it is not a function.',
      'To find domain restrictions: avoid dividing by zero (denominator ≠ 0) and avoid negative numbers inside even roots (radicand ≥ 0).',
      'For composite functions (f ∘ g)(x), evaluate the inside function g(x) first.',
    ],
    commonMistakes: [
      { mistake: 'Confusing f(x) with multiplication f * x.', correct: 'f(x) denotes the function f evaluated at input value x.' },
      { mistake: 'Assuming f(g(x)) = g(f(x)).', correct: 'Function composition is non-commutative; f(g(x)) is rarely equal to g(f(x)).' },
    ],
    practice: {
      easy: [
        { id: 'fn-e1', question: 'If f(x) = 5x - 7, what is f(4)?', answer: '13', hint: 'Multiply 5 by 4, then subtract 7.', solutionSteps: ['f(4) = 5(4) - 7 = 20 - 7 = 13'] },
        { id: 'fn-e2', question: 'If g(x) = x^2 + 4, what is g(-5)?', answer: '29', hint: '(-5)^2 = 25.', solutionSteps: ['g(-5) = (-5)^2 + 4 = 25 + 4 = 29'] },
        { id: 'fn-e3', question: 'What value of x is NOT in the domain of f(x) = 1 / (x - 6)?', answer: '6', hint: 'The denominator cannot equal zero.', solutionSteps: ['x - 6 = 0 => x = 6'] },
      ],
      medium: [
        { id: 'fn-m1', question: 'If f(x) = 2x + 1 and g(x) = 4, what is (f ∘ g)(2)?', answer: '9', hint: 'g(2) is always 4. Then find f(4).', solutionSteps: ['g(2) = 4', 'f(4) = 2(4) + 1 = 9'] },
        { id: 'fn-m2', question: 'Find f(3) if f(x) = x^3 - 2x^2 + 5.', answer: '14', hint: '3^3 = 27, 2(3^2) = 18.', solutionSteps: ['f(3) = 27 - 18 + 5 = 14'] },
        { id: 'fn-m3', question: 'If f(x) = 4x - 8, what is the root x where f(x) = 0?', answer: '2', hint: 'Set 4x - 8 = 0 and solve for x.', solutionSteps: ['4x = 8 => x = 2'] },
      ],
      challenge: [
        { id: 'fn-c1', question: 'If f(x) = (x + 1) / (x - 1), evaluate f(f(3)).', answer: '3', hint: 'Calculate f(3) first, then plug that output into f.', solutionSteps: ['f(3) = (3+1)/(3-1) = 4/2 = 2', 'f(2) = (2+1)/(2-1) = 3/1 = 3'] },
        { id: 'fn-c2', question: 'Find the minimum value of f(x) = x^2 - 6x + 14.', answer: '5', hint: 'Vertex form: (x - 3)^2 + 5.', solutionSteps: ['x = -b/(2a) = 6/2 = 3', 'f(3) = 9 - 18 + 14 = 5'] },
      ],
    },
  },

  limits: {
    id: 'limits',
    title: 'Limits & Continuity',
    category: 'Calculus Foundations',
    subTopics: ['Intuitive Concept of Limits', 'Left and Right Hand Limits', 'Indeterminate Forms (0/0)', 'Algebraic Techniques (Factoring, Rationalizing)', 'Continuity at a Point'],
    whatIsIt: {
      definition: 'A limit describes the value L that a function f(x) approaches as the input x approaches a specific value c from both sides, written lim_{x → c} f(x) = L.',
      terms: ['Limit: value approached by f(x)', 'Indeterminate Form: 0/0 or ∞/∞ requiring simplification', 'Continuity: lim_{x → c} f(x) = f(c)', 'One-Sided Limit: approaching from left (c⁻) or right (c⁺)'],
      formulaOrRule: '\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L',
      whyUsed: 'Limits provide the rigorous foundation of all calculus, allowing calculation of instantaneous velocity, tangent slopes, and convergence of infinite series.',
    },
    example1: {
      problem: 'Evaluate \\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}.',
      steps: [
        { action: 'Test direct substitution.', math: '\\frac{3^2 - 9}{3 - 3} = \\frac{0}{0} \\quad (\\text{Indeterminate})' },
        { action: 'Factor numerator as difference of squares.', math: 'x^2 - 9 = (x - 3)(x + 3)' },
        { action: 'Cancel common factor (x - 3) and evaluate limit.', math: '\\lim_{x \\to 3} (x + 3) = 3 + 3 = 6' },
      ],
      finalAnswer: '6',
    },
    example2: {
      problem: 'Evaluate \\lim_{x \\to \\infty} \\frac{6x^2 + 5}{2x^2 - 3x}.',
      steps: [
        { action: 'Divide numerator and denominator by the highest denominator power x^2.', math: '\\lim_{x \\to \\infty} \\frac{6 + 5/x^2}{2 - 3/x}' },
        { action: 'Evaluate limits as terms 5/x^2 and 3/x approach 0.', math: '\\frac{6 + 0}{2 - 0} = \\frac{6}{2} = 3' },
      ],
      finalAnswer: '3',
    },
    keyRules: [
      'Direct substitution is always the first step to test.',
      'If you get 0/0, factor and cancel the zero-producing binomial or multiply by the conjugate.',
      'A two-sided limit exists if and only if both one-sided limits exist and are equal: L_left = L_right.',
    ],
    commonMistakes: [
      { mistake: 'Assuming 0/0 is 0 or 1 or undefined.', correct: '0/0 is an indeterminate form; simplifying reveals the true finite limit.' },
      { mistake: 'Confusing the function value f(c) with the limit lim_{x → c} f(x).', correct: 'The limit describes behavior near c, regardless of whether f(c) exists.' },
    ],
    practice: {
      easy: [
        { id: 'lim-e1', question: 'Evaluate: lim_{x → 2} (3x^2 - 4x + 1)', answer: '5', hint: 'Direct substitution of x = 2.', solutionSteps: ['3(2)^2 - 4(2) + 1 = 12 - 8 + 1 = 5'] },
        { id: 'lim-e2', question: 'Evaluate: lim_{x → 5} (x^2 - 25) / (x - 5)', answer: '10', hint: 'Factor x^2 - 25 = (x - 5)(x + 5).', solutionSteps: ['(x - 5)(x + 5) / (x - 5) = x + 5', '5 + 5 = 10'] },
        { id: 'lim-e3', question: 'Evaluate: lim_{x → 0} (7x) / x', answer: '7', hint: 'Cancel x for x ≠ 0.', solutionSteps: ['7x / x = 7'] },
      ],
      medium: [
        { id: 'lim-m1', question: 'Evaluate: lim_{x → 4} (x^2 - 7x + 12) / (x - 4)', answer: '1', hint: 'Factor numerator as (x - 4)(x - 3).', solutionSteps: ['(x - 4)(x - 3) / (x - 4) = x - 3', '4 - 3 = 1'] },
        { id: 'lim-m2', question: 'Evaluate: lim_{x → ∞} (8x^3 - 2) / (4x^3 + 5x)', answer: '2', hint: 'Divide leading coefficients 8 / 4.', solutionSteps: ['8 / 4 = 2'] },
        { id: 'lim-m3', question: 'Evaluate: lim_{x → 1} (x^3 - 1) / (x - 1)', answer: '3', hint: 'x^3 - 1 = (x - 1)(x^2 + x + 1).', solutionSteps: ['1^2 + 1 + 1 = 3'] },
      ],
      challenge: [
        { id: 'lim-c1', question: 'Evaluate: lim_{x → 0} (sin(4x)) / x', answer: '4', hint: 'Use lim_{u → 0} sin(u)/u = 1: multiply and divide by 4.', solutionSteps: ['4 * lim sin(4x)/(4x) = 4 * 1 = 4'] },
        { id: 'lim-c2', question: 'Evaluate: lim_{x → 9} (√x - 3) / (x - 9)', answer: '1/6', hint: 'Multiply numerator and denominator by conjugate (√x + 3).', solutionSteps: ['(x - 9) / [(x - 9)(√x + 3)] = 1 / (√9 + 3) = 1/6'] },
      ],
    },
  },

  'intro-derivatives': {
    id: 'intro-derivatives',
    title: 'Introduction to Derivatives',
    category: 'Calculus Foundations',
    subTopics: ['Secant Lines vs Tangent Lines', 'Instantaneous Rate of Change', 'Limit Definition of Derivative', 'Derivative as Slope', 'Notation (f\'(x), dy/dx)'],
    whatIsIt: {
      definition: 'The derivative of f(x) at x measures the instantaneous rate of change of y with respect to x, representing the slope of the tangent line to y = f(x) at that point.',
      terms: ['Difference Quotient: [f(x+h) - f(x)] / h', 'Tangent Line: limiting position of secant line as h → 0', 'Instantaneous Velocity: derivative of position function s\'(t)', 'Differentiability: existence of derivative'],
      formulaOrRule: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h} = \\frac{dy}{dx}',
      whyUsed: 'Derivatives power physics (velocity, acceleration), economics (marginal cost, profit optimization), and machine learning (gradient descent backpropagation).',
    },
    example1: {
      problem: 'Find the derivative of f(x) = x^2 from first principles using the limit definition.',
      steps: [
        { action: 'Set up difference quotient with f(x) = x^2.', math: 'f\'(x) = \\lim_{h \\to 0} \\frac{(x+h)^2 - x^2}{h}' },
        { action: 'Expand numerator.', math: 'x^2 + 2xh + h^2 - x^2 = 2xh + h^2' },
        { action: 'Factor out h and cancel.', math: '\\lim_{h \\to 0} \\frac{h(2x + h)}{h} = \\lim_{h \\to 0} (2x + h) = 2x' },
      ],
      finalAnswer: 'f\'(x) = 2x',
    },
    example2: {
      problem: 'Find the slope of the tangent line to y = x^2 at x = 3, and write the equation of the tangent line at (3, 9).',
      steps: [
        { action: 'Calculate slope m using the derivative f\'(x) = 2x.', math: 'm = f\'(3) = 2(3) = 6' },
        { action: 'Use point-slope form: y - y1 = m(x - x1) with point (3, 9).', math: 'y - 9 = 6(x - 3) \\implies y - 9 = 6x - 18' },
        { action: 'Rearrange into slope-intercept form.', math: 'y = 6x - 9' },
      ],
      finalAnswer: 'Slope m = 6, Equation: y = 6x - 9',
    },
    keyRules: [
      'The derivative of any constant number is zero: d/dx(c) = 0.',
      'If f\'(x) > 0, the function is strictly increasing; if f\'(x) < 0, it is decreasing.',
      'A horizontal tangent line occurs when f\'(x) = 0.',
    ],
    commonMistakes: [
      { mistake: 'Confusing average rate of change with instantaneous rate of change.', correct: 'Average is over an interval Δx; instantaneous is the limit as Δx → 0 at a single instant.' },
      { mistake: 'Forgetting to take the limit h → 0 in the difference quotient.', correct: 'You must cancel h from the denominator before taking the limit.' },
    ],
    practice: {
      easy: [
        { id: 'der-e1', question: 'What is the derivative of the constant function f(x) = 12?', answer: '0', hint: 'The rate of change of a constant is zero.', solutionSteps: ['d/dx(12) = 0'] },
        { id: 'der-e2', question: 'If f\'(x) = 2x, what is the slope of the tangent line at x = 5?', answer: '10', hint: 'Substitute x = 5 into 2x.', solutionSteps: ['f\'(5) = 2(5) = 10'] },
        { id: 'der-e3', question: 'What is the slope of a horizontal tangent line?', answer: '0', hint: 'Horizontal lines have zero slope.', solutionSteps: ['Slope = 0'] },
      ],
      medium: [
        { id: 'der-m1', question: 'If position s(t) = t^2 + 4t, what is the velocity at t = 3? (s\'(t) = 2t + 4)', answer: '10', hint: 'v(3) = 2(3) + 4.', solutionSteps: ['v(t) = 2t + 4', 'v(3) = 6 + 4 = 10'] },
        { id: 'der-m2', question: 'Find the slope of tangent to y = 3x^2 at x = 2. (dy/dx = 6x)', answer: '12', hint: 'Evaluate 6x at x = 2.', solutionSteps: ['m = 6(2) = 12'] },
        { id: 'der-m3', question: 'At what x value does y = x^2 - 8x have a horizontal tangent line? (2x - 8 = 0)', answer: '4', hint: 'Set derivative 2x - 8 = 0.', solutionSteps: ['2x = 8 => x = 4'] },
      ],
      challenge: [
        { id: 'der-c1', question: 'Find the y-intercept of the tangent line to y = x^2 at the point (2, 4).', answer: '-4', hint: 'Equation is y - 4 = 4(x - 2) => y = 4x - 4.', solutionSteps: ['m = 2(2) = 4', 'y - 4 = 4x - 8 => y = 4x - 4', 'y-intercept is -4'] },
        { id: 'der-c2', question: 'If f(x) = 5x^2 - 20x + 7, at what x does the slope equal 10?', answer: '3', hint: 'f\'(x) = 10x - 20 = 10.', solutionSteps: ['10x - 20 = 10 => 10x = 30 => x = 3'] },
      ],
    },
  },

  'basic-differentiation': {
    id: 'basic-differentiation',
    title: 'Basic Differentiation Rules',
    category: 'Calculus Foundations',
    subTopics: ['Power Rule', 'Constant Multiple Rule', 'Sum and Difference Rule', 'Product Rule', 'Quotient Rule', 'Chain Rule'],
    whatIsIt: {
      definition: 'Differentiation rules provide algebraic shortcuts to compute derivatives of polynomials, products, quotients, and composite functions without using limits.',
      terms: ['Power Rule: d/dx(x^n) = n * x^(n-1)', 'Product Rule: (uv)\' = u\'v + uv\'', 'Quotient Rule: (u/v)\' = (u\'v - uv\') / v^2', 'Chain Rule: d/dx[f(g(x))] = f\'(g(x)) * g\'(x)'],
      formulaOrRule: '\\frac{d}{dx}[x^n] = n x^{n-1}, \\quad (uv)\' = u\'v + uv\', \\quad \\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}',
      whyUsed: 'Turns calculus into direct algebraic calculation, making computer algebra systems and automatic differentiation possible.',
    },
    example1: {
      problem: 'Find the derivative of f(x) = 4x^3 - 5x^2 + 7x - 9.',
      steps: [
        { action: 'Apply power rule to each term individually.', math: '4(3x^2) - 5(2x) + 7(1) - 0' },
        { action: 'Simplify coefficients.', math: '12x^2 - 10x + 7' },
      ],
      finalAnswer: 'f\'(x) = 12x^2 - 10x + 7',
    },
    example2: {
      problem: 'Differentiate y = (3x^2 + 1)^4 using the Chain Rule.',
      steps: [
        { action: 'Identify inner function u = 3x^2 + 1 and outer function y = u^4.', math: 'dy/du = 4u^3, \\quad du/dx = 6x' },
        { action: 'Multiply by chain rule: dy/dx = (dy/du) * (du/dx).', math: 'dy/dx = 4(3x^2 + 1)^3 \\cdot (6x)' },
        { action: 'Simplify product.', math: '24x(3x^2 + 1)^3' },
      ],
      finalAnswer: '24x(3x^2 + 1)^3',
    },
    keyRules: [
      'Power rule applies to any real exponent, including fractions (√x = x^(1/2)) and negatives (1/x = x^(-1)).',
      'The derivative of a product is NOT the product of derivatives: (uv)\' = u\'v + uv\'.',
      'Always remember to multiply by the inner derivative in the chain rule.',
    ],
    commonMistakes: [
      { mistake: 'Writing d/dx(x^5) = 5x^5.', correct: 'You must decrease the exponent by 1: 5x^(5-1) = 5x^4.' },
      { mistake: 'Quotient rule sign error: writing (uv\' - u\'v) / v^2.', correct: 'It is low d-high minus high d-low: (u\'v - uv\') / v^2.' },
    ],
    practice: {
      easy: [
        { id: 'bdf-e1', question: 'What is the derivative of f(x) = x^5?', answer: '5x^4', hint: 'd/dx(x^n) = n*x^(n-1).', solutionSteps: ['5 * x^(5-1) = 5x^4'] },
        { id: 'bdf-e2', question: 'Differentiate: f(x) = 3x^2 + 4x - 8', answer: '6x + 4', hint: 'Apply power rule term by term.', solutionSteps: ['3(2x) + 4(1) - 0 = 6x + 4'] },
        { id: 'bdf-e3', question: 'What is the derivative of 1/x? (rewrite as x^(-1))', answer: '-1/x^2', hint: '-1 * x^(-2).', solutionSteps: ['d/dx(x^-1) = -1*x^-2 = -1/x^2'] },
      ],
      medium: [
        { id: 'bdf-m1', question: 'Evaluate the derivative of f(x) = 2x^4 - 6x at x = 2.', answer: '58', hint: 'f\'(x) = 8x^3 - 6. Substitute x = 2.', solutionSteps: ['f\'(x) = 8x^3 - 6', 'f\'(2) = 8(8) - 6 = 64 - 6 = 58'] },
        { id: 'bdf-m2', question: 'Differentiate y = (2x + 1)^3. What is the coefficient of (2x+1)^2?', answer: '6', hint: '3*(2x+1)^2 * 2 = 6(2x+1)^2.', solutionSteps: ['3 * (2x+1)^2 * d/dx(2x+1) = 3 * 2 * (2x+1)^2 = 6(2x+1)^2'] },
        { id: 'bdf-m3', question: 'What is the second derivative f\'\'(x) of f(x) = x^4?', answer: '12x^2', hint: 'f\'(x) = 4x^3. Differentiate again.', solutionSteps: ['f\'(x) = 4x^3', 'f\'\'(x) = 12x^2'] },
      ],
      challenge: [
        { id: 'bdf-c1', question: 'Using product rule on f(x) = x^2 * (3x - 1), find f\'(2).', answer: '32', hint: 'f\'(x) = 2x(3x - 1) + x^2(3). Plug in x = 2.', solutionSteps: ['f\'(2) = 2(2)(6 - 1) + (4)(3) = 4(5) + 12 = 20 + 12 = 32'] },
        { id: 'bdf-c2', question: 'What is the derivative of f(x) = √x at x = 9?', answer: '1/6', hint: 'd/dx(x^(1/2)) = 1/(2√x).', solutionSteps: ['1/(2√9) = 1/(2*3) = 1/6'] },
      ],
    },
  },

  'applications-derivatives': {
    id: 'applications-derivatives',
    title: 'Applications of Derivatives',
    category: 'Calculus Foundations',
    subTopics: ['Critical Points', 'First Derivative Test', 'Second Derivative Test', 'Optimization Problems', 'Concavity and Inflection Points'],
    whatIsIt: {
      definition: 'Applications of derivatives use tangent slopes and rates of change to find local/global maximums and minimums, determine graph concavity, and solve optimization problems.',
      terms: ['Critical Point: where f\'(x) = 0 or undefined', 'Local Maximum: peak where f\' changes + to -', 'Local Minimum: trough where f\' changes - to +', 'Inflection Point: point where concavity changes (f\'\' = 0)'],
      formulaOrRule: 'f\'(c) = 0 \\implies \\text{Critical Point}; \\quad f\'\'(c) > 0 \\implies \\text{Min}, \\quad f\'\'(c) < 0 \\implies \\text{Max}',
      whyUsed: 'Essential in engineering, business, and artificial intelligence to find optimal designs, minimize cost, maximize profit, and train deep models.',
    },
    example1: {
      problem: 'Find the minimum value of f(x) = x^2 - 6x + 11.',
      steps: [
        { action: 'Compute the first derivative and set to zero.', math: 'f\'(x) = 2x - 6 = 0 \\implies 2x = 6 \\implies x = 3' },
        { action: 'Check concavity with second derivative.', math: 'f\'\'(x) = 2 > 0 \\quad (\\text{Concave up } \\implies \\text{Local Min})' },
        { action: 'Evaluate f(3) to obtain minimum value.', math: 'f(3) = 3^2 - 6(3) + 11 = 9 - 18 + 11 = 2' },
      ],
      finalAnswer: 'Minimum value = 2 at x = 3',
    },
    example2: {
      problem: 'A rancher has 100 meters of fencing to build a rectangular corral against a barn wall (3 fenced sides). Find width x that maximizes enclosed area.',
      steps: [
        { action: 'Express area as a function of width x: length = 100 - 2x.', math: 'A(x) = x(100 - 2x) = 100x - 2x^2' },
        { action: 'Take derivative and set equal to zero.', math: 'A\'(x) = 100 - 4x = 0 \\implies 4x = 100 \\implies x = 25\\text{ m}' },
        { action: 'Calculate dimensions and maximum area.', math: 'Length = 100 - 2(25) = 50\\text{ m}, \\quad A_{max} = 25 \\times 50 = 1250\\text{ m}^2' },
      ],
      finalAnswer: 'Width = 25 m, Max Area = 1250 m²',
    },
    keyRules: [
      'Critical points occur where f\'(x) = 0 or where f\'(x) does not exist.',
      'Second derivative test: f\'(c) = 0 and f\'\'(c) > 0 means concave up (local min). f\'\'(c) < 0 means concave down (local max).',
      'For closed interval optimization, always evaluate critical points AND boundary endpoints.',
    ],
    commonMistakes: [
      { mistake: 'Assuming f\'(x) = 0 always means a maximum or minimum.', correct: 'Points like x = 0 on y = x^3 have f\'(0) = 0 but are inflection points, not extrema.' },
      { mistake: 'Giving the x-coordinate instead of the maximum/minimum value.', correct: 'The x is the location; the value is f(x).' },
    ],
    practice: {
      easy: [
        { id: 'app-e1', question: 'Find the critical point x of f(x) = x^2 - 8x + 12.', answer: '4', hint: 'f\'(x) = 2x - 8 = 0.', solutionSteps: ['2x - 8 = 0 => 2x = 8 => x = 4'] },
        { id: 'app-e2', question: 'What is the maximum value of f(x) = -x^2 + 10?', answer: '10', hint: 'Max occurs at x = 0.', solutionSteps: ['At x = 0, f(0) = 10'] },
        { id: 'app-e3', question: 'If f\'\'(x) > 0 everywhere, the curve is concave _____ (up or down)?', answer: 'up', hint: 'Concave upward holds water.', solutionSteps: ['Positive second derivative = Concave up'] },
      ],
      medium: [
        { id: 'app-m1', question: 'Find the positive critical point of f(x) = 2x^3 - 6x.', answer: '1', hint: 'f\'(x) = 6x^2 - 6 = 0.', solutionSteps: ['6x^2 - 6 = 0 => x^2 = 1 => x = 1'] },
        { id: 'app-m2', question: 'Find the inflection point x of f(x) = x^3 - 3x^2 + 4. (f\'\'(x) = 6x - 6 = 0)', answer: '1', hint: 'Set 6x - 6 = 0.', solutionSteps: ['6x = 6 => x = 1'] },
        { id: 'app-m3', question: 'A particle moves with position s(t) = t^2 - 10t + 5. At what time t is it at rest (v = 0)?', answer: '5', hint: 'v(t) = 2t - 10 = 0.', solutionSteps: ['2t = 10 => t = 5'] },
      ],
      challenge: [
        { id: 'app-c1', question: 'Two non-negative numbers sum to 20. What is their maximum possible product?', answer: '100', hint: 'P(x) = x(20 - x). Max occurs when numbers are equal: 10 * 10.', solutionSteps: ['P\'(x) = 20 - 2x = 0 => x = 10', '10 * 10 = 100'] },
        { id: 'app-c2', question: 'Find the absolute minimum value of f(x) = x^2 - 4x + 9 on the interval [0, 5].', answer: '5', hint: 'Critical point at x = 2 gives f(2) = 4 - 8 + 9 = 5. Endpoints: f(0)=9, f(5)=14.', solutionSteps: ['f\'(x) = 2x - 4 = 0 => x = 2', 'f(2) = 5, f(0) = 9, f(5) = 14', 'Minimum is 5'] },
      ],
    },
  },

  'intro-integration': {
    id: 'intro-integration',
    title: 'Introduction to Integration',
    category: 'Calculus Foundations',
    subTopics: ['Concept of Antiderivative', 'Indefinite Integral and Constant C', 'Definite Integral as Signed Area', 'Fundamental Theorem of Calculus', 'Geometric Interpretation'],
    whatIsIt: {
      definition: 'Integration is the inverse operation of differentiation. An indefinite integral finds the general antiderivative family F(x) + C, while a definite integral evaluates the exact net signed area under a curve between x = a and x = b.',
      terms: ['Antiderivative: function F(x) where F\'(x) = f(x)', 'Constant of Integration (C): accounts for constant terms lost during differentiation', 'Definite Integral: \\int_a^b f(x) dx', 'Fundamental Theorem of Calculus: links antiderivatives with area evaluation'],
      formulaOrRule: '\\int f(x)\\,dx = F(x) + C, \\quad \\int_a^b f(x)\\,dx = F(b) - F(a)',
      whyUsed: 'Used to calculate total accumulated quantity: distance from velocity, total energy from power, mass from density, and continuous probabilities.',
    },
    example1: {
      problem: 'Find the indefinite integral \\int 6x^2 dx.',
      steps: [
        { action: 'Apply the reverse power rule: add 1 to exponent and divide by new exponent.', math: '\\int 6x^2 dx = 6 \\cdot \\frac{x^{2+1}}{2+1} + C' },
        { action: 'Simplify fraction.', math: '6 \\cdot \\frac{x^3}{3} + C = 2x^3 + C' },
      ],
      finalAnswer: '2x^3 + C',
    },
    example2: {
      problem: 'Evaluate the definite integral \\int_1^3 2x dx.',
      steps: [
        { action: 'Find the antiderivative F(x).', math: 'F(x) = x^2' },
        { action: 'Apply the Fundamental Theorem of Calculus: F(3) - F(1).', math: 'F(3) = 3^2 = 9, \\quad F(1) = 1^2 = 1' },
        { action: 'Subtract lower limit value from upper limit value.', math: '9 - 1 = 8' },
      ],
      finalAnswer: '8',
    },
    keyRules: [
      'Always append + C to indefinite integrals.',
      'Definite integrals yield a single numerical value, representing net signed area.',
      'Integral of a sum equals sum of integrals: ∫[f(x) + g(x)] dx = ∫f(x) dx + ∫g(x) dx.',
    ],
    commonMistakes: [
      { mistake: 'Forgetting "+ C" in indefinite integrals.', correct: 'Because d/dx(c) = 0, an infinite family of antiderivatives exists differing by constant C.' },
      { mistake: 'Subtracting in the wrong order: F(a) - F(b).', correct: 'Fundamental theorem is top minus bottom: F(b) - F(a).' },
    ],
    practice: {
      easy: [
        { id: 'int-e1', question: 'What is the indefinite integral \\int 4 dx?', answer: '4x + C', hint: 'The antiderivative of constant k is kx + C.', solutionSteps: ['4x + C'] },
        { id: 'int-e2', question: 'Evaluate the definite integral: \\int_0^2 3x^2 dx. (Antiderivative is x^3)', answer: '8', hint: '2^3 - 0^3 = 8.', solutionSteps: ['[x^3]_0^2 = 8 - 0 = 8'] },
        { id: 'int-e3', question: 'Evaluate: \\int_1^4 1 dx', answer: '3', hint: '4 - 1 = 3.', solutionSteps: ['[x]_1^4 = 4 - 1 = 3'] },
      ],
      medium: [
        { id: 'int-m1', question: 'Find the area under y = 2x from x = 0 to x = 5.', answer: '25', hint: '∫_0^5 2x dx = [x^2]_0^5 = 25 - 0.', solutionSteps: ['x^2 evaluated at 5 and 0 = 25 - 0 = 25'] },
        { id: 'int-m2', question: 'Evaluate: \\int_0^1 (4x^3 + 6x) dx.', answer: '4', hint: 'Antiderivative is x^4 + 3x^2. Evaluate at 1.', solutionSteps: ['[x^4 + 3x^2]_0^1 = (1 + 3) - 0 = 4'] },
        { id: 'int-m3', question: 'Evaluate: \\int_2^3 2x dx.', answer: '5', hint: '3^2 - 2^2 = 9 - 4 = 5.', solutionSteps: ['[x^2]_2^3 = 9 - 4 = 5'] },
      ],
      challenge: [
        { id: 'int-c1', question: 'Evaluate: \\int_0^2 (6x^2 - 2x + 3) dx.', answer: '18', hint: 'Antiderivative is 2x^3 - x^2 + 3x.', solutionSteps: ['2(8) - 4 + 3(2) = 16 - 4 + 6 = 18'] },
        { id: 'int-c2', question: 'Find the total area bounded between y = x^2 and the x-axis from x = 0 to x = 3.', answer: '9', hint: '∫_0^3 x^2 dx = [x^3 / 3]_0^3 = 27/3 = 9.', solutionSteps: ['[x^3 / 3]_0^3 = 27/3 - 0 = 9'] },
      ],
    },
  },

  'basic-integration': {
    id: 'basic-integration',
    title: 'Basic Integration Rules',
    category: 'Calculus Foundations',
    subTopics: ['Reverse Power Rule', 'Integral of 1/x', 'Exponential Integrals (e^x)', 'Constant Multiplier Rule', 'Introduction to u-Substitution'],
    whatIsIt: {
      definition: 'Basic integration rules provide standard antiderivative formulas and substitution techniques for integrating powers, reciprocals, exponentials, and composite functions.',
      terms: ['Reverse Power Rule: ∫x^n dx = x^(n+1)/(n+1) + C (n ≠ -1)', 'Logarithmic Form: ∫(1/x) dx = ln|x| + C', 'Exponential Form: ∫e^(kx) dx = (1/k)e^(kx) + C', 'u-Substitution: reverse chain rule'],
      formulaOrRule: '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\;(n \\neq -1), \\quad \\int \\frac{1}{x}\\,dx = \\ln|x| + C, \\quad \\int f(g(x))g\'(x)\\,dx = \\int f(u)\\,du',
      whyUsed: 'Provides the mathematical engine to solve differential equations governing fluid flow, electrical circuits, radioactive decay, and capital accumulation.',
    },
    example1: {
      problem: 'Evaluate \\int (8x^3 - 3x^2 + 4) dx.',
      steps: [
        { action: 'Apply reverse power rule to each term.', math: '8 \\cdot \\frac{x^4}{4} - 3 \\cdot \\frac{x^3}{3} + 4x + C' },
        { action: 'Simplify coefficients.', math: '2x^4 - x^3 + 4x + C' },
      ],
      finalAnswer: '2x^4 - x^3 + 4x + C',
    },
    example2: {
      problem: 'Evaluate \\int 2x(x^2 + 5)^3 dx using u-substitution.',
      steps: [
        { action: 'Choose u = x^2 + 5, then differentiate to find du = 2x dx.', math: 'u = x^2 + 5 \\implies du = 2x\\,dx' },
        { action: 'Substitute u and du into integral.', math: '\\int u^3 du = \\frac{u^4}{4} + C' },
        { action: 'Substitute back u = x^2 + 5.', math: '\\frac{(x^2 + 5)^4}{4} + C' },
      ],
      finalAnswer: '\\frac{(x^2 + 5)^4}{4} + C',
    },
    keyRules: [
      'The reverse power rule works for all exponents EXCEPT n = -1. When n = -1, the integral is ln|x| + C.',
      'For u-substitution, choose u such that its derivative du appears as a multiplier in the integrand.',
      'Remember to adjust limits of integration when using substitution on definite integrals.',
    ],
    commonMistakes: [
      { mistake: 'Trying to use the power rule on 1/x to get x^0 / 0.', correct: 'Division by zero is undefined; the antiderivative of 1/x is ln|x| + C.' },
      { mistake: 'Forgetting to replace dx with du/u\' in substitution.', correct: 'All original variable terms and the differential dx must be converted to u.' },
    ],
    practice: {
      easy: [
        { id: 'bin-e1', question: 'What is the indefinite integral of x^6?', answer: 'x^7 / 7 + C', hint: 'Add 1 to exponent: 6 + 1 = 7. Divide by 7.', solutionSteps: ['x^(6+1)/(6+1) + C = x^7/7 + C'] },
        { id: 'bin-e2', question: 'What is the integral of 1/x for x > 0?', answer: 'ln(x) + C', hint: 'The antiderivative of 1/x is the natural log.', solutionSteps: ['ln(x) + C'] },
        { id: 'bin-e3', question: 'What is the integral of e^x?', answer: 'e^x + C', hint: 'e^x differentiates and integrates to itself.', solutionSteps: ['e^x + C'] },
      ],
      medium: [
        { id: 'bin-m1', question: 'Evaluate: \\int_0^1 (3x^2 + 1) dx.', answer: '2', hint: 'Antiderivative is x^3 + x. (1 + 1) - 0 = 2.', solutionSteps: ['[x^3 + x]_0^1 = 2 - 0 = 2'] },
        { id: 'bin-m2', question: 'Evaluate \\int (6x^2 + 2x) dx without constant C at x = 1.', answer: '3', hint: 'Antiderivative is 2x^3 + x^2. Evaluate at x = 1.', solutionSteps: ['2(1)^3 + 1^2 = 2 + 1 = 3'] },
        { id: 'bin-m3', question: 'What is the coefficient of e^(3x) in \\int e^(3x) dx?', answer: '1/3', hint: 'Divide by 3.', solutionSteps: ['(1/3) * e^(3x) + C => coefficient is 1/3'] },
      ],
      challenge: [
        { id: 'bin-c1', question: 'Evaluate \\int_0^2 2x(x^2 + 1) dx.', answer: '12', hint: 'Expand to 2x^3 + 2x. Antiderivative is (1/2)x^4 + x^2. Evaluate at 2: (1/2)(16) + 4 = 8 + 4 = 12.', solutionSteps: ['∫ (2x^3 + 2x) dx = x^4/2 + x^2', 'At 2: 16/2 + 4 = 8 + 4 = 12'] },
        { id: 'bin-c2', question: 'Using substitution u = 2x + 1, what is the power of (2x + 1) in the antiderivative of (2x + 1)^4 * 2?', answer: '5', hint: '∫ u^4 du = u^5 / 5 + C.', solutionSteps: ['Power becomes 4 + 1 = 5'] },
      ],
    },
  },
};
