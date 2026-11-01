import { TopicContent } from '../mathCurriculum';

export const ALGEBRA_TOPICS: Record<string, TopicContent> = {
  'variables-constants': {
    id: 'variables-constants',
    title: 'Variables and Constants',
    category: 'Algebra',
    subTopics: ['Definition of Variable (x, y)', 'Fixed Constants', 'Evaluating Expressions', 'Domain of a Variable'],
    whatIsIt: {
      definition: 'A variable is an alphabetical symbol representing an unknown or changing quantity; a constant has a fixed numerical value.',
      terms: ['Variable: symbol (e.g. x, y)', 'Constant: fixed number (e.g. 5, -2, π)', 'Coefficient: numerical multiplier of a variable'],
      formulaOrRule: 'Evaluation: Replace variable with assigned value and compute using order of operations.',
      whyUsed: 'Allows writing general formulas and solving for unknown quantities across all branches of science and engineering.',
    },
    example1: {
      problem: 'Evaluate the expression 3x - 7 when x = 5.',
      steps: [
        { action: 'Substitute x = 5 into the expression.', math: '3(5) - 7' },
        { action: 'Multiply 3 by 5, then subtract 7.', math: '15 - 7 = 8' },
      ],
      finalAnswer: '8',
    },
    example2: {
      problem: 'Evaluate 2a^2 - 3b when a = -3 and b = 4.',
      steps: [
        { action: 'Substitute values.', math: '2(-3)^2 - 3(4)' },
        { action: 'Evaluate exponents first.', math: '(-3)^2 = 9\n2(9) - 12' },
        { action: 'Perform multiplications and subtraction.', math: '18 - 12 = 6' },
      ],
      finalAnswer: '6',
    },
    keyRules: [
      'In algebraic terms like 4x, the multiplication sign is implied: 4x = 4 * x.',
      'A negative variable squared is positive: (-x)^2 = x^2, but -x^2 = -(x^2).',
      'Variables can only be evaluated when numerical values are specified.',
    ],
    commonMistakes: [
      { mistake: 'Calculating -3^2 as 9.', correct: 'Without parentheses -3^2 = -(3*3) = -9. Parentheses (-3)^2 = 9.' },
    ],
    practice: {
      easy: [
        { id: 'vc-e1', question: 'Evaluate 4x + 2 when x = 3.', answer: '14', hint: '4(3) + 2 = 12 + 2.', solutionSteps: ['4*3 + 2 = 14'] },
        { id: 'vc-e2', question: 'What is the coefficient of x in the term -7x?', answer: '-7', hint: 'The multiplier is -7.', solutionSteps: ['Coefficient is -7'] },
        { id: 'vc-e3', question: 'Evaluate 10 - 2y when y = 4.', answer: '2', hint: '10 - 2(4) = 10 - 8 = 2.', solutionSteps: ['10 - 8 = 2'] },
      ],
      medium: [
        { id: 'vc-m1', question: 'Evaluate x^2 - 4x + 3 when x = 5.', answer: '8', hint: '25 - 20 + 3 = 8.', solutionSteps: ['25 - 20 + 3 = 8'] },
        { id: 'vc-m2', question: 'Evaluate 3(2a + b) when a = 2 and b = -1.', answer: '9', hint: '3(4 - 1) = 3(3) = 9.', solutionSteps: ['3(3) = 9'] },
        { id: 'vc-m3', question: 'Evaluate (a + b)^2 when a = 3 and b = 4.', answer: '49', hint: '(3 + 4)^2 = 7^2 = 49.', solutionSteps: ['7^2 = 49'] },
      ],
      challenge: [
        { id: 'vc-c1', question: 'Evaluate (x^2 - y^2) / (x - y) when x = 8 and y = 3.', answer: '11', hint: 'Recognize (x+y)(x-y)/(x-y) = x + y = 8 + 3 = 11.', solutionSteps: ['(64 - 9)/5 = 55/5 = 11'] },
        { id: 'vc-c2', question: 'If 2x + 3k = 26 and x = 4, find constant k.', answer: '6', hint: '8 + 3k = 26 => 3k = 18 => k = 6.', solutionSteps: ['8 + 3k = 26', '3k = 18', 'k = 6'] },
      ],
    },
  },

  'algebraic-expressions': {
    id: 'algebraic-expressions',
    title: 'Algebraic Expressions',
    category: 'Algebra',
    subTopics: ['Terms and Factors', 'Degree of Expressions', 'Word-to-Algebra Translation', 'Expanding Brackets'],
    whatIsIt: {
      definition: 'An algebraic expression is a mathematical phrase combining numbers, variables, and operational symbols without an equal sign.',
      terms: ['Term: separated by + or -', 'Monomial (1 term)', 'Binomial (2 terms)', 'Trinomial (3 terms)'],
      formulaOrRule: 'Distributive law: a(b + c) = ab + ac. Double bracket expansion: (a + b)(c + d) = ac + ad + bc + bd.',
      whyUsed: 'Provides mathematical representation for cost formulas, geometric perimeters, physics models, and revenue functions.',
    },
    example1: {
      problem: 'Expand and simplify: 4(2x - 3) + 5(x + 2)',
      steps: [
        { action: 'Distribute 4 and 5 across their respective parentheses.', math: '4 * 2x - 4 * 3 + 5 * x + 5 * 2\n= 8x - 12 + 5x + 10' },
        { action: 'Combine like terms.', math: '(8x + 5x) + (-12 + 10)\n= 13x - 2' },
      ],
      finalAnswer: '13x - 2',
    },
    example2: {
      problem: 'Translate to algebra: "Five less than three times the square of a number x."',
      steps: [
        { action: 'Three times the square of x.', math: '3 * x^2 = 3x^2' },
        { action: 'Five less than this quantity.', math: '3x^2 - 5' },
      ],
      finalAnswer: '3x^2 - 5',
    },
    keyRules: [
      'Expressions do not have equals signs (=); equations do.',
      'When expanding negative signs: -(a - b) = -a + b.',
      'Terms are separated only by addition (+) and subtraction (-); multiplication and division bind parts into a single term.',
    ],
    commonMistakes: [
      { mistake: 'Writing "5 less than x" as 5 - x.', correct: '"5 less than x" means start with x and subtract 5: x - 5.' },
    ],
    practice: {
      easy: [
        { id: 'ae-e1', question: 'Expand: 3(x + 4)', answer: '3x + 12', hint: '3*x + 3*4.', solutionSteps: ['3x + 12'] },
        { id: 'ae-e2', question: 'How many terms are in the expression 4x^2 - 3x + 7?', answer: '3', hint: 'Separated by + and -: 4x^2, -3x, 7.', solutionSteps: ['3 terms'] },
        { id: 'ae-e3', question: 'Simplify: 5x + 8x', answer: '13x', hint: '(5 + 8)x.', solutionSteps: ['13x'] },
      ],
      medium: [
        { id: 'ae-m1', question: 'Expand and simplify: 2(3x - 5) - 4(x - 2)', answer: '2x - 2', hint: '6x - 10 - 4x + 8 = 2x - 2.', solutionSteps: ['6x - 10 - 4x + 8 = 2x - 2'] },
        { id: 'ae-m2', question: 'What is the degree of the polynomial 5x^3 - 2x^2 + 8?', answer: '3', hint: 'Highest exponent on variable is 3.', solutionSteps: ['Degree is 3'] },
        { id: 'ae-m3', question: 'Expand: (x + 3)(x + 5)', answer: 'x^2 + 8x + 15', hint: 'FOIL: x^2 + 5x + 3x + 15.', solutionSteps: ['x^2 + 8x + 15'] },
      ],
      challenge: [
        { id: 'ae-c1', question: 'Expand and simplify: (2x - 3)(3x + 4)', answer: '6x^2 - x - 12', hint: '6x^2 + 8x - 9x - 12 = 6x^2 - x - 12.', solutionSteps: ['6x^2 - x - 12'] },
        { id: 'ae-c2', question: 'Simplify: 3x(x - 2) - x(2x - 5)', answer: 'x^2 - x', hint: '3x^2 - 6x - 2x^2 + 5x = x^2 - x.', solutionSteps: ['x^2 - x'] },
      ],
    },
  },

  'like-unlike-terms': {
    id: 'like-unlike-terms',
    title: 'Like and Unlike Terms',
    category: 'Algebra',
    subTopics: ['Identifying Like Terms', 'Combining Coefficients', 'Different Variable Powers', 'Simplification Strategy'],
    whatIsIt: {
      definition: 'Like terms have identical variables raised to the exact same powers; unlike terms have different variables or different powers.',
      terms: ['Like terms: e.g. 5x and -2x, or 3xy^2 and 7xy^2', 'Unlike terms: e.g. 4x and 4x^2, or 2x and 2y'],
      formulaOrRule: 'Combine coefficients: ax + bx = (a + b)x. Unlike terms cannot be combined: ax + by remains ax + by.',
      whyUsed: 'Simplifies complex algebraic formulas into compact, solvable equations.',
    },
    example1: {
      problem: 'Simplify: 7x + 4y - 3x + 2y - 5',
      steps: [
        { action: 'Group like x terms and like y terms together.', math: '(7x - 3x) + (4y + 2y) - 5' },
        { action: 'Combine coefficients.', math: '4x + 6y - 5' },
      ],
      finalAnswer: '4x + 6y - 5',
    },
    example2: {
      problem: 'Simplify: 5x^2 + 3x - 2x^2 + 8 - 7x',
      steps: [
        { action: 'Group quadratic x^2 terms, linear x terms, and constant terms.', math: '(5x^2 - 2x^2) + (3x - 7x) + 8' },
        { action: 'Combine like terms.', math: '3x^2 - 4x + 8' },
      ],
      finalAnswer: '3x^2 - 4x + 8',
    },
    keyRules: [
      'Only like terms can be added or subtracted.',
      'Powers must match exactly: x and x^2 are UNLIKE terms and cannot be combined into x^3.',
      'Variables in products can be in any order: 3ab and 5ba are like terms because ab = ba.',
    ],
    commonMistakes: [
      { mistake: 'Writing 2x + 3y = 5xy.', correct: '2x + 3y cannot be simplified; they are unlike terms.' },
      { mistake: 'Writing x^2 + x^3 = x^5.', correct: 'Powers cannot be added when adding terms (only when multiplying: x^2 * x^3 = x^5).' },
    ],
    practice: {
      easy: [
        { id: 'lu-e1', question: 'Simplify: 4x + 9x', answer: '13x', hint: '4 + 9 = 13.', solutionSteps: ['13x'] },
        { id: 'lu-e2', question: 'Simplify: 12y - 5y', answer: '7y', hint: '12 - 5 = 7.', solutionSteps: ['7y'] },
        { id: 'lu-e3', question: 'Are 3x^2 and 5x like or unlike terms?', answer: 'unlike', hint: 'Different exponents (2 vs 1).', solutionSteps: ['Unlike'] },
      ],
      medium: [
        { id: 'lu-m1', question: 'Simplify: 8a + 3b - 5a + 4b', answer: '3a + 7b', hint: '(8-5)a + (3+4)b.', solutionSteps: ['3a + 7b'] },
        { id: 'lu-m2', question: 'Simplify: 4x^2 + 2x - x^2 + 5x', answer: '3x^2 + 7x', hint: '(4-1)x^2 + (2+5)x.', solutionSteps: ['3x^2 + 7x'] },
        { id: 'lu-m3', question: 'Simplify: 6xy - 2yx + 4x', answer: '4xy + 4x', hint: 'xy = yx, so 6xy - 2xy = 4xy.', solutionSteps: ['4xy + 4x'] },
      ],
      challenge: [
        { id: 'lu-c1', question: 'Simplify: 3(x^2 - 2x) + 2(2x^2 + 5x)', answer: '7x^2 + 4x', hint: '3x^2 - 6x + 4x^2 + 10x = 7x^2 + 4x.', solutionSteps: ['7x^2 + 4x'] },
        { id: 'lu-c2', question: 'Simplify: 5a^2b - 2ab^2 + 3a^2b + 6ab^2', answer: '8a^2b + 4ab^2', hint: 'Group a^2b and ab^2 separately.', solutionSteps: ['8a^2b + 4ab^2'] },
      ],
    },
  },

  'linear-equations': {
    id: 'linear-equations',
    title: 'Linear Equations',
    category: 'Algebra',
    subTopics: ['One-Step & Two-Step Equations', 'Variables on Both Sides', 'Distributive Property & Fractions', 'Word Problem Modeling'],
    whatIsIt: {
      definition: 'A linear equation is an algebraic equation in which the highest exponent of the variable is 1.',
      terms: ['Linear equation', 'Solution / Root', 'Balance method: whatever you do to one side, do to the other'],
      formulaOrRule: 'Standard form: ax + b = c. Solution: x = (c - b) / a (for a ≠ 0).',
      whyUsed: 'The foundation of solving for unknown values in finance, physics, engineering, and data science.',
    },
    example1: {
      problem: 'Solve for x: 2x + 5 = 15',
      steps: [
        { action: 'Subtract 5 from both sides.', math: '2x + 5 - 5 = 15 - 5\n2x = 10' },
        { action: 'Divide both sides by 2.', math: '2x / 2 = 10 / 2\nx = 5' },
      ],
      finalAnswer: 'x = 5',
    },
    example2: {
      problem: 'Solve for x: 5x + 3 = 2x + 18',
      steps: [
        { action: 'Subtract 2x from both sides.', math: '5x - 2x + 3 = 18\n3x + 3 = 18' },
        { action: 'Subtract 3 from both sides.', math: '3x = 15' },
        { action: 'Divide by 3.', math: 'x = 5' },
      ],
      finalAnswer: 'x = 5',
    },
    keyRules: [
      'Whatever operation you apply to one side of the equals sign must be applied equally to the other.',
      'Isolate variable terms on one side and constant numbers on the opposite side.',
      'Check solutions by substituting the result back into the original equation.',
    ],
    commonMistakes: [
      { mistake: 'Changing sign of only one side when moving terms.', correct: 'Apply inverse operation to both sides.' },
    ],
    practice: {
      easy: [
        { id: 'le-e1', question: 'Solve for x: x + 9 = 21', answer: '12', hint: '21 - 9 = 12.', solutionSteps: ['x = 12'] },
        { id: 'le-e2', question: 'Solve for x: 4x = 32', answer: '8', hint: '32 / 4 = 8.', solutionSteps: ['x = 8'] },
        { id: 'le-e3', question: 'Solve for y: 2y - 6 = 14', answer: '10', hint: '2y = 20 => y = 10.', solutionSteps: ['y = 10'] },
      ],
      medium: [
        { id: 'le-m1', question: 'Solve for x: 3x - 7 = 20', answer: '9', hint: '3x = 27 => x = 9.', solutionSteps: ['x = 9'] },
        { id: 'le-m2', question: 'Solve for x: 7x - 4 = 3x + 16', answer: '5', hint: '4x = 20 => x = 5.', solutionSteps: ['x = 5'] },
        { id: 'le-m3', question: 'Solve for x: 3(x - 4) = 18', answer: '10', hint: 'x - 4 = 6 => x = 10.', solutionSteps: ['x = 10'] },
      ],
      challenge: [
        { id: 'le-c1', question: 'Solve for x: (2x + 1) / 3 = (x - 2) / 2', answer: '-8', hint: '2(2x + 1) = 3(x - 2) => 4x + 2 = 3x - 6 => x = -8.', solutionSteps: ['4x + 2 = 3x - 6', 'x = -8'] },
        { id: 'le-c2', question: 'Solve for x: 4(2x - 3) = 3(x + 6) - 5', answer: '5', hint: '8x - 12 = 3x + 18 - 5 => 8x - 12 = 3x + 13 => 5x = 25 => x = 5.', solutionSteps: ['5x = 25', 'x = 5'] },
      ],
    },
  },

  'linear-inequalities': {
    id: 'linear-inequalities',
    title: 'Linear Inequalities',
    category: 'Algebra',
    subTopics: ['Inequality Symbols (<, >, ≤, ≥)', 'Number Line Graphing', 'Negative Flip Rule', 'Compound Inequalities'],
    whatIsIt: {
      definition: 'A linear inequality compares two algebraic expressions using inequality symbols rather than strict equality.',
      terms: ['< (less than)', '> (greater than)', '≤ (less than or equal)', '≥ (greater than or equal)', 'Interval notation'],
      formulaOrRule: 'GOLDEN RULE: Reversing inequality: When multiplying or dividing both sides by a NEGATIVE number, FLIP the inequality sign.',
      whyUsed: 'Models constraints in budgets, speed limits, tolerance bounds, and linear programming.',
    },
    example1: {
      problem: 'Solve the inequality: 3x - 5 < 16',
      steps: [
        { action: 'Add 5 to both sides.', math: '3x < 21' },
        { action: 'Divide by positive 3 (sign remains unchanged).', math: 'x < 7' },
      ],
      finalAnswer: 'x < 7',
    },
    example2: {
      problem: 'Solve: -4x + 8 ≤ 24',
      steps: [
        { action: 'Subtract 8 from both sides.', math: '-4x ≤ 16' },
        { action: 'Divide by -4 and FLIP the inequality sign from ≤ to ≥.', math: 'x ≥ 16 / (-4)\nx ≥ -4' },
      ],
      finalAnswer: 'x ≥ -4',
    },
    keyRules: [
      'Multiplying or dividing by a negative number reverses the direction of the inequality sign.',
      'Adding or subtracting any number never changes the inequality sign.',
      'Strict inequalities (<, >) use open circles on number lines; non-strict (≤, ≥) use solid dots.',
    ],
    commonMistakes: [
      { mistake: 'Forgetting to flip the sign when dividing by a negative: -2x < 6 => x < -3.', correct: 'Must flip: x > -3.' },
    ],
    practice: {
      easy: [
        { id: 'li-e1', question: 'Solve: x + 4 > 10', answer: 'x > 6', hint: 'Subtract 4.', solutionSteps: ['x > 6'] },
        { id: 'li-e2', question: 'Solve: 2x ≤ 14', answer: 'x <= 7', hint: 'Divide by 2.', solutionSteps: ['x <= 7'] },
        { id: 'li-e3', question: 'If -x < 5, what is x?', answer: 'x > -5', hint: 'Flip sign when multiplying by -1.', solutionSteps: ['x > -5'] },
      ],
      medium: [
        { id: 'li-m1', question: 'Solve: 5x - 7 ≥ 18', answer: 'x >= 5', hint: '5x >= 25 => x >= 5.', solutionSteps: ['x >= 5'] },
        { id: 'li-m2', question: 'Solve: -3x + 4 < 19', answer: 'x > -5', hint: '-3x < 15 => flip sign => x > -5.', solutionSteps: ['x > -5'] },
        { id: 'li-m3', question: 'Solve: 2(x - 3) ≤ 8', answer: 'x <= 7', hint: 'x - 3 <= 4 => x <= 7.', solutionSteps: ['x <= 7'] },
      ],
      challenge: [
        { id: 'li-c1', question: 'Solve: 4 - 3x ≥ 2x - 11', answer: 'x <= 3', hint: '-5x >= -15 => x <= 3.', solutionSteps: ['-5x >= -15', 'x <= 3'] },
        { id: 'li-c2', question: 'Solve compound inequality: 5 < 2x + 1 ≤ 13. What is maximum integer x?', answer: '6', hint: '4 < 2x <= 12 => 2 < x <= 6. Max integer is 6.', solutionSteps: ['2 < x <= 6', 'Max integer = 6'] },
      ],
    },
  },

  'laws-of-exponents': {
    id: 'laws-of-exponents',
    title: 'Laws of Exponents',
    category: 'Algebra',
    subTopics: ['Product & Quotient Rules', 'Power of a Power', 'Zero Exponent', 'Negative Exponents', 'Fractional Exponents'],
    whatIsIt: {
      definition: 'Exponents indicate repeated multiplication of a base number; exponent laws define the algebraic rules for simplifying powers.',
      terms: ['Base (b)', 'Exponent / Power (n)', 'b^n = b * b * ... (n times)', 'Radical notation: b^(1/n) = n√b'],
      formulaOrRule: 'Product: a^m * a^n = a^(m+n). Quotient: a^m / a^n = a^(m-n). Power: (a^m)^n = a^(mn). Zero: a^0 = 1. Negative: a^(-n) = 1 / a^n.',
      whyUsed: 'Essential for scientific notation (astronomy, microbiology), compound interest, exponential growth, and calculus.',
    },
    example1: {
      problem: 'Simplify: (x^4 * x^7) / x^5',
      steps: [
        { action: 'Apply product rule to numerator: add exponents.', math: 'x^(4 + 7) = x^11' },
        { action: 'Apply quotient rule: subtract denominator exponent.', math: 'x^(11 - 5) = x^6' },
      ],
      finalAnswer: 'x^6',
    },
    example2: {
      problem: 'Evaluate: (2^3)^2 * 2^(-4)',
      steps: [
        { action: 'Apply power of a power rule.', math: '2^(3 * 2) = 2^6 = 64' },
        { action: 'Apply product rule with negative exponent.', math: '2^(6 + (-4)) = 2^2 = 4' },
      ],
      finalAnswer: '4',
    },
    keyRules: [
      'Product rule only works when bases are identical: x^2 * y^3 cannot be combined.',
      'Any non-zero quantity raised to power 0 equals 1: a^0 = 1.',
      'A negative power moves the factor across the fraction bar: a^(-n) = 1/a^n.',
    ],
    commonMistakes: [
      { mistake: 'Multiplying bases in 2^3 * 2^4 = 4^7.', correct: 'Keep the base identical: 2^(3+4) = 2^7.' },
      { mistake: 'Writing (x + y)^2 = x^2 + y^2.', correct: 'Exponents do not distribute over addition: (x+y)^2 = x^2 + 2xy + y^2.' },
    ],
    practice: {
      easy: [
        { id: 'le-e1', question: 'Simplify: x^3 * x^5', answer: 'x^8', hint: '3 + 5 = 8.', solutionSteps: ['x^8'] },
        { id: 'le-e2', question: 'Simplify: y^9 / y^4', answer: 'y^5', hint: '9 - 4 = 5.', solutionSteps: ['y^5'] },
        { id: 'le-e3', question: 'What is 5^0?', answer: '1', hint: 'Any non-zero number to power 0 is 1.', solutionSteps: ['1'] },
      ],
      medium: [
        { id: 'le-m1', question: 'Simplify: (x^3)^4', answer: 'x^12', hint: 'Multiply powers: 3 * 4 = 12.', solutionSteps: ['x^12'] },
        { id: 'le-m2', question: 'Evaluate: 2^(-3)', answer: '0.125', hint: '1 / 2^3 = 1/8 = 0.125.', solutionSteps: ['1/8 = 0.125'] },
        { id: 'le-m3', question: 'Evaluate: 8^(2/3)', answer: '4', hint: '(3√8)^2 = 2^2 = 4.', solutionSteps: ['4'] },
      ],
      challenge: [
        { id: 'le-c1', question: 'Simplify: (2x^2 y^3)^3', answer: '8x^6 y^9', hint: '2^3 * x^(2*3) * y^(3*3) = 8x^6 y^9.', solutionSteps: ['8x^6 y^9'] },
        { id: 'le-c2', question: 'If 3^(x+2) = 81, find x.', answer: '2', hint: '81 = 3^4 => x + 2 = 4 => x = 2.', solutionSteps: ['3^(x+2) = 3^4', 'x = 2'] },
      ],
    },
  },

  polynomials: {
    id: 'polynomials',
    title: 'Polynomials',
    category: 'Algebra',
    subTopics: ['Classification by Terms & Degree', 'Standard Form', 'Addition & Subtraction of Polynomials', 'Polynomial Multiplication'],
    whatIsIt: {
      definition: 'A polynomial is an expression consisting of variables and coefficients, involving only the operations of addition, subtraction, multiplication, and non-negative integer exponents.',
      terms: ['Monomial, Binomial, Trinomial', 'Degree: highest power of the variable', 'Leading Coefficient: coefficient of highest-degree term'],
      formulaOrRule: 'Standard form: a_n x^n + a_(n-1) x^(n-1) + ... + a_1 x + a_0 (terms in descending power order).',
      whyUsed: 'Used to model projectile trajectories, cost curves, computer graphics curves (Bézier splines), and signal processing.',
    },
    example1: {
      problem: 'Add the polynomials: (3x^2 - 5x + 7) + (2x^2 + 8x - 12)',
      steps: [
        { action: 'Align like terms.', math: '(3x^2 + 2x^2) + (-5x + 8x) + (7 - 12)' },
        { action: 'Combine coefficients.', math: '5x^2 + 3x - 5' },
      ],
      finalAnswer: '5x^2 + 3x - 5',
    },
    example2: {
      problem: 'Multiply: (2x - 3)(x^2 + 4x - 5)',
      steps: [
        { action: 'Distribute 2x to all terms.', math: '2x(x^2 + 4x - 5) = 2x^3 + 8x^2 - 10x' },
        { action: 'Distribute -3 to all terms.', math: '-3(x^2 + 4x - 5) = -3x^2 - 12x + 15' },
        { action: 'Combine like terms.', math: '2x^3 + (8 - 3)x^2 + (-10 - 12)x + 15\n= 2x^3 + 5x^2 - 22x + 15' },
      ],
      finalAnswer: '2x^3 + 5x^2 - 22x + 15',
    },
    keyRules: [
      'Exponents in polynomials must be non-negative integers (no negative powers, no variable in denominators).',
      'Always write polynomials in descending order of exponents (Standard Form).',
      'Subtracting a polynomial means distributing a -1 across every term inside parentheses.',
    ],
    commonMistakes: [
      { mistake: 'Forgetting to distribute negative when subtracting: (x^2 + 3) - (2x^2 - 5) written as x^2 + 3 - 2x^2 - 5.', correct: 'Distribute negative: x^2 + 3 - 2x^2 + 5 = -x^2 + 8.' },
    ],
    practice: {
      easy: [
        { id: 'po-e1', question: 'What is the degree of 7x^4 - 2x + 5?', answer: '4', hint: 'Highest exponent is 4.', solutionSteps: ['Degree = 4'] },
        { id: 'po-e2', question: 'Classify 4x^2 - 9 by number of terms (monomial, binomial, trinomial).', answer: 'binomial', hint: '2 terms.', solutionSteps: ['Binomial'] },
        { id: 'po-e3', question: 'Add: (2x + 5) + (3x - 2)', answer: '5x + 3', hint: '2x+3x=5x, 5-2=3.', solutionSteps: ['5x + 3'] },
      ],
      medium: [
        { id: 'po-m1', question: 'Subtract: (5x^2 + 3x) - (2x^2 - 4x)', answer: '3x^2 + 7x', hint: '5x^2 - 2x^2 = 3x^2, 3x - (-4x) = 7x.', solutionSteps: ['3x^2 + 7x'] },
        { id: 'po-m2', question: 'Multiply: (x + 4)(x^2 - 2x + 3)', answer: 'x^3 + 2x^2 - 5x + 12', hint: 'x^3 - 2x^2 + 3x + 4x^2 - 8x + 12.', solutionSteps: ['x^3 + 2x^2 - 5x + 12'] },
        { id: 'po-m3', question: 'What is the leading coefficient of 9 - 4x^3 + 6x?', answer: '-4', hint: 'Coefficient of highest power x^3 is -4.', solutionSteps: ['-4'] },
      ],
      challenge: [
        { id: 'po-c1', question: 'Find remainder when x^2 + 5x + 6 is divided by (x + 2).', answer: '0', hint: 'x^2 + 5x + 6 = (x+2)(x+3), perfectly divisible.', solutionSteps: ['Remainder = 0'] },
        { id: 'po-c2', question: 'If P(x) = 2x^3 - 3x^2 + 4x - 5, find P(2).', answer: '7', hint: '2(8) - 3(4) + 4(2) - 5 = 16 - 12 + 8 - 5 = 7.', solutionSteps: ['P(2) = 7'] },
      ],
    },
  },

  factorization: {
    id: 'factorization',
    title: 'Factorization',
    category: 'Algebra',
    subTopics: ['Common Factor Extraction', 'Grouping Method', 'Difference of Two Squares', 'Trinomial Factoring (ac method)'],
    whatIsIt: {
      definition: 'Factorization is the process of breaking down an algebraic expression into a product of simpler irreducible factors.',
      terms: ['GCF of terms', 'Grouping', 'Difference of squares: a^2 - b^2 = (a-b)(a+b)', 'Irreducible factor'],
      formulaOrRule: 'Difference of squares: a^2 - b^2 = (a + b)(a - b). Trinomial: x^2 + (p+q)x + pq = (x + p)(x + q).',
      whyUsed: 'Essential for solving quadratic equations, simplifying rational algebraic fractions, and finding roots.',
    },
    example1: {
      problem: 'Factor completely: 6x^3 - 18x^2',
      steps: [
        { action: 'Find the GCF of coefficients (6 and 18) and variable powers (x^3 and x^2).', math: 'GCF = 6x^2' },
        { action: 'Factor out 6x^2 from each term.', math: '6x^2(x - 3)' },
      ],
      finalAnswer: '6x^2(x - 3)',
    },
    example2: {
      problem: 'Factor the quadratic trinomial: x^2 - 7x + 12',
      steps: [
        { action: 'Find two numbers that multiply to +12 and add to -7.', math: 'Factors of 12: (-3) * (-4) = 12\nSum: (-3) + (-4) = -7' },
        { action: 'Write as product of binomials.', math: '(x - 3)(x - 4)' },
      ],
      finalAnswer: '(x - 3)(x - 4)',
    },
    keyRules: [
      'Always extract the Greatest Common Factor (GCF) first before applying other factoring techniques.',
      'Difference of squares requires a minus sign: a^2 - b^2 = (a+b)(a-b). Sum of squares a^2 + b^2 is not factorable over real numbers.',
      'Check factors by expanding them back to see if they yield the original expression.',
    ],
    commonMistakes: [
      { mistake: 'Factoring x^2 + 16 as (x + 4)(x + 4).', correct: '(x+4)(x+4) = x^2 + 8x + 16. Sum of squares cannot be factored over reals.' },
    ],
    practice: {
      easy: [
        { id: 'fa-e1', question: 'Factor out common term: 5x + 15', answer: '5(x + 3)', hint: 'GCF is 5.', solutionSteps: ['5(x + 3)'] },
        { id: 'fa-e2', question: 'Factor: x^2 - 25', answer: '(x - 5)(x + 5)', hint: 'Difference of squares: a^2 - 5^2.', solutionSteps: ['(x - 5)(x + 5)'] },
        { id: 'fa-e3', question: 'Factor: x^2 - 9', answer: '(x - 3)(x + 3)', hint: 'a^2 - 3^2.', solutionSteps: ['(x - 3)(x + 3)'] },
      ],
      medium: [
        { id: 'fa-m1', question: 'Factor: x^2 + 7x + 10', answer: '(x + 2)(x + 5)', hint: 'Multiply to 10, add to 7: 2 and 5.', solutionSteps: ['(x + 2)(x + 5)'] },
        { id: 'fa-m2', question: 'Factor: x^2 - 5x - 14', answer: '(x - 7)(x + 2)', hint: 'Multiply to -14, add to -5: -7 and 2.', solutionSteps: ['(x - 7)(x + 2)'] },
        { id: 'fa-m3', question: 'Factor: 4x^2 - 49', answer: '(2x - 7)(2x + 7)', hint: '(2x)^2 - 7^2.', solutionSteps: ['(2x - 7)(2x + 7)'] },
      ],
      challenge: [
        { id: 'fa-c1', question: 'Factor by grouping: x^3 + 3x^2 + 2x + 6', answer: '(x + 3)(x^2 + 2)', hint: 'x^2(x + 3) + 2(x + 3) = (x + 3)(x^2 + 2).', solutionSteps: ['(x + 3)(x^2 + 2)'] },
        { id: 'fa-c2', question: 'Factor: 2x^2 + 7x + 3', answer: '(2x + 1)(x + 3)', hint: 'ac = 6. Split: 2x^2 + 6x + x + 3 = 2x(x+3) + 1(x+3).', solutionSteps: ['(2x + 1)(x + 3)'] },
      ],
    },
  },

  'quadratic-equations': {
    id: 'quadratic-equations',
    title: 'Quadratic Equations',
    category: 'Algebra',
    subTopics: ['Standard Form ax² + bx + c = 0', 'Factoring & Zero-Product Property', 'Quadratic Formula', 'Discriminant D = b² - 4ac'],
    whatIsIt: {
      definition: 'A quadratic equation is a second-degree polynomial equation where the highest exponent of the unknown is 2.',
      terms: ['Standard Form: ax^2 + bx + c = 0', 'Roots / Solutions', 'Discriminant: D = b^2 - 4ac', 'Parabola'],
      formulaOrRule: 'Quadratic Formula: x = (-b ± √(b^2 - 4ac)) / (2a). Nature of roots: D > 0 (2 real roots), D = 0 (1 repeated root), D < 0 (complex roots).',
      whyUsed: 'Calculates projectile motion, parabolic antenna profiles, profit maximization vertices, and physics kinetics.',
    },
    example1: {
      problem: 'Solve by factoring: x^2 - 5x + 6 = 0',
      steps: [
        { action: 'Factor the quadratic trinomial into two binomials.', math: '(x - 2)(x - 3) = 0' },
        { action: 'Apply Zero-Product Property: set each factor to 0.', math: 'x - 2 = 0 => x = 2\nx - 3 = 0 => x = 3' },
      ],
      finalAnswer: 'x = 2, 3',
    },
    example2: {
      problem: 'Solve using the quadratic formula: x^2 - 4x - 5 = 0',
      steps: [
        { action: 'Identify coefficients.', math: 'a = 1, b = -4, c = -5' },
        { action: 'Calculate discriminant D.', math: 'D = b^2 - 4ac = (-4)^2 - 4(1)(-5) = 16 + 20 = 36' },
        { action: 'Substitute into quadratic formula.', math: 'x = (-(-4) ± √36) / (2 * 1) = (4 ± 6) / 2' },
        { action: 'Compute the two roots.', math: 'x = (4 + 6) / 2 = 5\nx = (4 - 6) / 2 = -1' },
      ],
      finalAnswer: 'x = 5, -1',
    },
    keyRules: [
      'Always rearrange equation into standard form ax^2 + bx + c = 0 before applying formulas.',
      'If b^2 - 4ac < 0, there are no real roots (the parabola does not cross the x-axis).',
      'The sum of roots is -b/a and product of roots is c/a (Vieta\'s formulas).',
    ],
    commonMistakes: [
      { mistake: 'Forgetting ± sign: x^2 = 9 solved only as x = 3.', correct: 'x = ±√9 = ±3 (two roots: 3 and -3).' },
    ],
    practice: {
      easy: [
        { id: 'qe-e1', question: 'Solve: x^2 - 16 = 0. Give positive root.', answer: '4', hint: 'x^2 = 16 => x = ±4.', solutionSteps: ['x = 4'] },
        { id: 'qe-e2', question: 'Solve: x(x - 5) = 0. What is non-zero root?', answer: '5', hint: 'x = 0 or x = 5.', solutionSteps: ['x = 5'] },
        { id: 'qe-e3', question: 'Find discriminant of x^2 - 6x + 9 = 0.', answer: '0', hint: 'b^2 - 4ac = 36 - 36 = 0.', solutionSteps: ['D = 0'] },
      ],
      medium: [
        { id: 'qe-m1', question: 'Solve by factoring: x^2 - 8x + 15 = 0. What is the smaller root?', answer: '3', hint: '(x - 3)(x - 5) = 0.', solutionSteps: ['Roots: 3, 5. Smaller is 3'] },
        { id: 'qe-m2', question: 'Solve: x^2 + 7x + 12 = 0. What is larger root?', answer: '-3', hint: '(x + 3)(x + 4) = 0 => x = -3, -4. Larger is -3.', solutionSteps: ['x = -3'] },
        { id: 'qe-m3', question: 'How many real roots does x^2 + 2x + 5 = 0 have?', answer: '0', hint: 'D = 4 - 20 = -16 < 0 => 0 real roots.', solutionSteps: ['0 real roots'] },
      ],
      challenge: [
        { id: 'qe-c1', question: 'Solve using formula: 2x^2 - 7x + 3 = 0. What is larger root?', answer: '3', hint: 'D = 49 - 24 = 25. x = (7 ± 5)/4 => x = 3 or 0.5.', solutionSteps: ['x = 3'] },
        { id: 'qe-c2', question: 'For what value of k does x^2 - kx + 9 = 0 have exactly one real root (k > 0)?', answer: '6', hint: 'D = k^2 - 36 = 0 => k = 6.', solutionSteps: ['k^2 = 36 => k = 6'] },
      ],
    },
  },

  'algebraic-identities': {
    id: 'algebraic-identities',
    title: 'Algebraic Identities',
    category: 'Algebra',
    subTopics: ['Square of a Binomial (a ± b)²', 'Difference of Squares (a² - b²)', 'Product of Binomials (x+a)(x+b)', 'Cube Identities (a ± b)³'],
    whatIsIt: {
      definition: 'An algebraic identity is an equation that holds true for all possible values of its variables.',
      terms: ['Identity (holds for all x)', 'Expansion', 'Binomial theorem', 'Cross term (2ab)'],
      formulaOrRule: '(a + b)^2 = a^2 + 2ab + b^2. (a - b)^2 = a^2 - 2ab + b^2. (a + b)(a - b) = a^2 - b^2. (x + a)(x + b) = x^2 + (a + b)x + ab.',
      whyUsed: 'Provides lightning-fast mental math shortcuts, simplifies polynomial expansions, and powers trigonometric proofs.',
    },
    example1: {
      problem: 'Expand using identity: (3x + 4)^2',
      steps: [
        { action: 'Apply (a + b)^2 = a^2 + 2ab + b^2 where a = 3x, b = 4.', math: '(3x)^2 + 2(3x)(4) + 4^2' },
        { action: 'Compute each term.', math: '9x^2 + 24x + 16' },
      ],
      finalAnswer: '9x^2 + 24x + 16',
    },
    example2: {
      problem: 'Evaluate mentally using difference of squares: 105 * 95',
      steps: [
        { action: 'Express both numbers relative to 100.', math: '(100 + 5)(100 - 5)' },
        { action: 'Apply (a + b)(a - b) = a^2 - b^2.', math: '100^2 - 5^2 = 10000 - 25 = 9975' },
      ],
      finalAnswer: '9975',
    },
    keyRules: [
      'Never forget the middle term 2ab in (a ± b)^2.',
      'Identities are true for EVERY real number (unlike equations which are true only for specific roots).',
      '(a - b)^2 is always equal to (b - a)^2.',
    ],
    commonMistakes: [
      { mistake: '(a + b)^2 = a^2 + b^2 (The Freshman\'s Dream).', correct: 'Must include middle term: a^2 + 2ab + b^2.' },
    ],
    practice: {
      easy: [
        { id: 'ai-e1', question: 'Expand: (x + 5)^2', answer: 'x^2 + 10x + 25', hint: 'x^2 + 2(5)x + 25.', solutionSteps: ['x^2 + 10x + 25'] },
        { id: 'ai-e2', question: 'Expand: (x - 3)^2', answer: 'x^2 - 6x + 9', hint: 'x^2 - 2(3)x + 9.', solutionSteps: ['x^2 - 6x + 9'] },
        { id: 'ai-e3', question: 'Expand: (x + 7)(x - 7)', answer: 'x^2 - 49', hint: 'a^2 - b^2.', solutionSteps: ['x^2 - 49'] },
      ],
      medium: [
        { id: 'ai-m1', question: 'Expand: (2x - 5)^2', answer: '4x^2 - 20x + 25', hint: '(2x)^2 - 2(2x)(5) + 25 = 4x^2 - 20x + 25.', solutionSteps: ['4x^2 - 20x + 25'] },
        { id: 'ai-m2', question: 'Compute 52 * 48 using difference of squares.', answer: '2496', hint: '(50 + 2)(50 - 2) = 2500 - 4 = 2496.', solutionSteps: ['2496'] },
        { id: 'ai-m3', question: 'If a + b = 10 and ab = 21, find a^2 + b^2.', answer: '58', hint: 'a^2 + b^2 = (a+b)^2 - 2ab = 100 - 42 = 58.', solutionSteps: ['100 - 42 = 58'] },
      ],
      challenge: [
        { id: 'ai-c1', question: 'If x + 1/x = 5, find x^2 + 1/x^2.', answer: '23', hint: '(x + 1/x)^2 = x^2 + 2 + 1/x^2 = 25 => x^2 + 1/x^2 = 23.', solutionSteps: ['25 - 2 = 23'] },
        { id: 'ai-c2', question: 'Expand: (a + b + c)^2', answer: 'a^2 + b^2 + c^2 + 2ab + 2bc + 2ca', hint: 'Sum of squares plus 2 times all pair products.', solutionSteps: ['a^2 + b^2 + c^2 + 2ab + 2bc + 2ca'] },
      ],
    },
  },

  'simultaneous-equations': {
    id: 'simultaneous-equations',
    title: 'Simultaneous Equations',
    category: 'Algebra',
    subTopics: ['Systems of 2 Linear Equations', 'Substitution Method', 'Elimination Method', 'Graphical Intersection Point'],
    whatIsIt: {
      definition: 'Simultaneous equations (system of equations) consist of two or more equations with shared variables that must be satisfied at the same time.',
      terms: ['System of equations', 'Substitution', 'Elimination', 'Point of intersection (x, y)'],
      formulaOrRule: 'Standard system: a1*x + b1*y = c1 and a2*x + b2*y = c2. Solution is the unique ordered pair (x, y) satisfying both.',
      whyUsed: 'Determines economic market equilibrium (supply = demand), electrical circuit mesh analysis, and collision trajectories.',
    },
    example1: {
      problem: 'Solve by elimination:\n1) x + y = 10\n2) x - y = 4',
      steps: [
        { action: 'Add equations (1) and (2) to eliminate y.', math: '(x + y) + (x - y) = 10 + 4\n2x = 14' },
        { action: 'Solve for x.', math: 'x = 14 / 2 = 7' },
        { action: 'Substitute x = 7 back into equation (1).', math: '7 + y = 10\ny = 3' },
      ],
      finalAnswer: 'x = 7, y = 3 (Point: (7, 3))',
    },
    example2: {
      problem: 'Solve by substitution:\n1) y = 2x + 1\n2) 3x + y = 16',
      steps: [
        { action: 'Substitute (2x + 1) for y in equation (2).', math: '3x + (2x + 1) = 16' },
        { action: 'Combine like terms and solve for x.', math: '5x + 1 = 16\n5x = 15\nx = 3' },
        { action: 'Compute y.', math: 'y = 2(3) + 1 = 7' },
      ],
      finalAnswer: 'x = 3, y = 7',
    },
    keyRules: [
      'If two lines are parallel (same slope, different intercept), the system has NO solution.',
      'If two lines are identical, the system has INFINITELY MANY solutions.',
      'Always check the found (x, y) in BOTH equations.',
    ],
    commonMistakes: [
      { mistake: 'Finding only x and forgetting to calculate y.', correct: 'A system in two variables requires both coordinates (x, y).' },
    ],
    practice: {
      easy: [
        { id: 'se-e1', question: 'If x + y = 8 and x - y = 2, find x.', answer: '5', hint: 'Add equations: 2x = 10 => x = 5.', solutionSteps: ['x = 5'] },
        { id: 'se-e2', question: 'If x + y = 8 and x = 5, find y.', answer: '3', hint: '8 - 5 = 3.', solutionSteps: ['y = 3'] },
        { id: 'se-e3', question: 'If y = 3x and x + y = 12, find x.', answer: '3', hint: '4x = 12 => x = 3.', solutionSteps: ['x = 3'] },
      ],
      medium: [
        { id: 'se-m1', question: 'Solve: 2x + y = 11 and x - y = 1. What is x?', answer: '4', hint: 'Add: 3x = 12 => x = 4.', solutionSteps: ['x = 4'] },
        { id: 'se-m2', question: 'In the system above (2x + y = 11, x - y = 1), what is y?', answer: '3', hint: 'y = x - 1 = 4 - 1 = 3.', solutionSteps: ['y = 3'] },
        { id: 'se-m3', question: 'Solve: 3x + 2y = 16 and y = x - 2. What is x?', answer: '4', hint: '3x + 2(x - 2) = 16 => 5x - 4 = 16 => 5x = 20 => x = 4.', solutionSteps: ['x = 4'] },
      ],
      challenge: [
        { id: 'se-c1', question: 'Solve: 3x + 4y = 25 and 2x - 3y = -6. What is x?', answer: '3', hint: 'Multiply eq1 by 3, eq2 by 4: 9x + 12y = 75, 8x - 12y = -24. Add: 17x = 51 => x = 3.', solutionSteps: ['x = 3'] },
        { id: 'se-c2', question: '2 pens and 3 pencils cost $13. 1 pen and 4 pencils cost $14. Find cost of 1 pen.', answer: '2', hint: '2p + 3q = 13 and p + 4q = 14 => p = 14 - 4q. 2(14 - 4q) + 3q = 13 => 28 - 5q = 13 => 5q = 15 => q = 3 (pencil). Pen = 14 - 12 = 2.', solutionSteps: ['Pen = $2'] },
      ],
    },
  },
};
