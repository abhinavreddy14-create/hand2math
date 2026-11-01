import { TopicContent } from '../mathCurriculum';

export const ARITHMETIC_TOPICS: Record<string, TopicContent> = {
  'number-systems': {
    id: 'number-systems',
    title: 'Number Systems',
    category: 'Arithmetic Foundations',
    subTopics: ['Natural Numbers (N)', 'Whole Numbers (W)', 'Integers (Z)', 'Rational Numbers (Q)', 'Irrational Numbers (I)', 'Real Numbers (R)'],
    whatIsIt: {
      definition: 'Number systems classify numbers into hierarchical sets based on their algebraic and arithmetic properties.',
      terms: ['Natural: {1, 2, 3...}', 'Whole: {0, 1, 2...}', 'Integers: {...-2, -1, 0, 1, 2...}', 'Rational: a/b where b ≠ 0', 'Irrational: non-repeating non-terminating decimals (e.g. √2, π)'],
      formulaOrRule: 'N ⊂ W ⊂ Z ⊂ Q ⊂ R',
      whyUsed: 'Provides the foundation for all arithmetic operations, computer science data types, and algebraic proofs.',
    },
    example1: {
      problem: 'Classify the number -7 into all applicable number sets.',
      steps: [
        { action: 'Check if it is a counting number greater than 0.', math: '-7 is negative, so not Natural or Whole.' },
        { action: 'Check if it is a whole number with negative sign.', math: '-7 is in {...-3, -2, -1, 0, 1...} => Integer (Z).' },
        { action: 'Check if it can be written as a fraction a/b.', math: '-7 = -7/1 => Rational (Q) and Real (R).' },
      ],
      finalAnswer: 'Integer, Rational, Real',
    },
    example2: {
      problem: 'Determine whether √49 and √50 are rational or irrational.',
      steps: [
        { action: 'Evaluate √49.', math: '√49 = 7 = 7/1 => Rational Number.' },
        { action: 'Evaluate √50.', math: '√50 = 5√2 ≈ 7.071067... (non-terminating decimal) => Irrational Number.' },
      ],
      finalAnswer: '√49 is Rational (7); √50 is Irrational',
    },
    keyRules: [
      'Every whole number can be expressed as a rational fraction: n = n/1.',
      'Square roots of non-perfect squares are always irrational.',
      'Zero is an integer, whole number, and rational, but NOT a natural number.',
    ],
    commonMistakes: [
      { mistake: 'Believing 0 is a natural number.', correct: 'Natural numbers start from 1 (counting numbers).' },
      { mistake: 'Thinking all fractions are decimals and therefore irrational.', correct: 'Terminating or repeating decimals are Rational (Q).' },
    ],
    practice: {
      easy: [
        { id: 'ns-e1', question: 'Is -15 an integer? (yes or no)', answer: 'yes', hint: 'Negative whole numbers belong to the set of integers.', solutionSteps: ['-15 has no decimal part', 'Belongs to Z (Integers)'] },
        { id: 'ns-e2', question: 'Is √16 rational? (yes or no)', answer: 'yes', hint: '√16 = 4.', solutionSteps: ['√16 = 4', '4 = 4/1 => Rational'] },
        { id: 'ns-e3', question: 'What is the smallest natural number?', answer: '1', hint: 'Counting numbers start at 1.', solutionSteps: ['Natural numbers = {1, 2, 3...}', 'Smallest = 1'] },
      ],
      medium: [
        { id: 'ns-m1', question: 'Is 0.75 a rational number? (yes or no)', answer: 'yes', hint: '0.75 can be written as 3/4.', solutionSteps: ['0.75 = 75/100 = 3/4', 'Can be written as a/b => Rational'] },
        { id: 'ns-m2', question: 'Is π (pi) rational or irrational?', answer: 'irrational', hint: 'Pi never repeats or terminates.', solutionSteps: ['π = 3.14159...', 'Irrational'] },
        { id: 'ns-m3', question: 'What is the integer value of √144?', answer: '12', hint: '12 * 12 = 144.', solutionSteps: ['12^2 = 144', '√144 = 12'] },
      ],
      challenge: [
        { id: 'ns-c1', question: 'Convert 0.333... (recurring) to a simplified fraction a/b. What is the denominator b?', answer: '3', hint: '0.333... = 1/3.', solutionSteps: ['10x - x = 3', '9x = 3 => x = 1/3', 'Denominator is 3'] },
        { id: 'ns-c2', question: 'Is the sum of rational number 5 and irrational number √2 rational or irrational?', answer: 'irrational', hint: 'Rational + Irrational is always Irrational.', solutionSteps: ['5 + √2 cannot be written as a single integer fraction', 'Irrational'] },
      ],
    },
  },

  bodmas: {
    id: 'bodmas',
    title: 'BODMAS / Order of Operations',
    category: 'Arithmetic Foundations',
    subTopics: ['Brackets (Parentheses, Square, Curly)', 'Orders (Exponents, Roots)', 'Division & Multiplication', 'Addition & Subtraction'],
    whatIsIt: {
      definition: 'BODMAS determines the exact order in which mathematical operations must be evaluated.',
      terms: ['B: Brackets', 'O: Orders (powers/roots)', 'D: Division', 'M: Multiplication', 'A: Addition', 'S: Subtraction'],
      formulaOrRule: 'B → O → (D & M from left to right) → (A & S from left to right)',
      whyUsed: 'Removes ambiguity so that equations have one universally agreed-upon answer.',
    },
    example1: {
      problem: 'Evaluate: 18 / 3 * 4 + 7',
      steps: [
        { action: 'Division and multiplication have equal precedence; compute left to right.', math: '18 / 3 = 6\n6 * 4 = 24' },
        { action: 'Add 7 to the result.', math: '24 + 7 = 31' },
      ],
      finalAnswer: '31',
    },
    example2: {
      problem: 'Evaluate: 4 * (3 + 2)^2 - 50',
      steps: [
        { action: 'Evaluate inside brackets.', math: '(3 + 2) = 5' },
        { action: 'Evaluate exponent (Order).', math: '5^2 = 25' },
        { action: 'Multiply by 4.', math: '4 * 25 = 100' },
        { action: 'Subtract 50.', math: '100 - 50 = 50' },
      ],
      finalAnswer: '50',
    },
    keyRules: [
      'Multiplication does NOT come before division; they are equal priority, calculated left to right.',
      'Addition does NOT come before subtraction; they are equal priority, calculated left to right.',
      'Parentheses always take absolute priority.',
    ],
    commonMistakes: [
      { mistake: 'Calculating 20 / 4 * 5 as 20 / 20 = 1.', correct: 'Work left to right: 20 / 4 = 5, then 5 * 5 = 25.' },
      { mistake: 'Adding before multiplying in 3 + 4 * 2 = 14.', correct: 'Multiply first: 4 * 2 = 8, then 3 + 8 = 11.' },
    ],
    practice: {
      easy: [
        { id: 'bm-e1', question: 'Evaluate: 5 + 3 * 6', answer: '23', hint: '3 * 6 = 18. Add 5.', solutionSteps: ['5 + 18 = 23'] },
        { id: 'bm-e2', question: 'Evaluate: (14 - 4) / 2', answer: '5', hint: 'Parentheses first.', solutionSteps: ['10 / 2 = 5'] },
        { id: 'bm-e3', question: 'Evaluate: 20 - 3 * 4', answer: '8', hint: 'Multiply 3 * 4 = 12 first.', solutionSteps: ['20 - 12 = 8'] },
      ],
      medium: [
        { id: 'bm-m1', question: 'Evaluate: 2^3 + 4 * 5', answer: '28', hint: '2^3 = 8. 4 * 5 = 20.', solutionSteps: ['8 + 20 = 28'] },
        { id: 'bm-m2', question: 'Evaluate: 36 / (4 + 2) * 3', answer: '18', hint: 'Bracket: 4 + 2 = 6. Then 36 / 6 * 3.', solutionSteps: ['36 / 6 = 6', '6 * 3 = 18'] },
        { id: 'bm-m3', question: 'Evaluate: 100 - 4 * (5 - 2)^2', answer: '64', hint: '(5-2)=3. 3^2=9. 4*9=36.', solutionSteps: ['100 - 4 * 9 = 100 - 36 = 64'] },
      ],
      challenge: [
        { id: 'bm-c1', question: 'Evaluate: [18 + (6 - 2)^2] / (10 - 2)', answer: '4.25', hint: '(6-2)^2 = 16. 18 + 16 = 34. 34 / 8 = 4.25.', solutionSteps: ['18 + 16 = 34', '34 / 8 = 4.25'] },
        { id: 'bm-c2', question: 'Evaluate: 5 * 2^3 - 3 * sqrt(64) + 12 / 4', answer: '19', hint: '2^3=8, sqrt(64)=8. 5*8 - 3*8 + 3 = 40 - 24 + 3 = 19.', solutionSteps: ['40 - 24 + 3 = 19'] },
      ],
    },
  },

  fractions: {
    id: 'fractions',
    title: 'Fractions',
    category: 'Arithmetic Foundations',
    subTopics: ['Proper & Improper Fractions', 'Mixed Numbers', 'Common Denominator (LCM)', 'Multiplication & Division (Reciprocals)'],
    whatIsIt: {
      definition: 'A fraction represents a part of a whole, written as a/b where a is the numerator and b is the non-zero denominator.',
      terms: ['Numerator (top)', 'Denominator (bottom)', 'LCD (Least Common Denominator)', 'Reciprocal: flip a/b to b/a'],
      formulaOrRule: 'Addition: a/c + b/c = (a+b)/c. Multiplication: (a/b) * (c/d) = (ac)/(bd). Division: (a/b) ÷ (c/d) = (a/b) * (d/c).',
      whyUsed: 'Used for exact proportional sharing, probability, scale factors, and rational algebraic manipulation.',
    },
    example1: {
      problem: 'Add the fractions: (3/4) + (1/6)',
      steps: [
        { action: 'Find the Least Common Denominator (LCD) of 4 and 6.', math: 'LCD(4, 6) = 12' },
        { action: 'Convert both fractions to have denominator 12.', math: '(3/4) * (3/3) = 9/12\n(1/6) * (2/2) = 2/12' },
        { action: 'Add the numerators over the common denominator.', math: '(9 + 2) / 12 = 11/12' },
      ],
      finalAnswer: '11/12',
    },
    example2: {
      problem: 'Divide: (5/8) ÷ (3/4)',
      steps: [
        { action: 'Multiply by the reciprocal of the divisor.', math: '(5/8) * (4/3)' },
        { action: 'Multiply numerators and denominators, simplifying common factors.', math: '(5 * 4) / (8 * 3) = 20 / 24 = 5/6' },
      ],
      finalAnswer: '5/6',
    },
    keyRules: [
      'Never add denominators directly: 1/2 + 1/3 is NOT 2/5.',
      'To divide fractions: keep the first, change ÷ to ×, flip the second (Keep-Change-Flip).',
      'Always simplify fractions to lowest terms by dividing numerator and denominator by their HCF.',
    ],
    commonMistakes: [
      { mistake: 'Adding denominators: 1/3 + 2/3 = 3/6.', correct: 'Keep common denominator: (1+2)/3 = 3/3 = 1.' },
      { mistake: 'Forgetting to invert when dividing: 1/2 ÷ 1/4 = 1/8.', correct: '1/2 * 4/1 = 4/2 = 2.' },
    ],
    practice: {
      easy: [
        { id: 'fr-e1', question: 'Evaluate: (1/4) + (2/4)', answer: '3/4', hint: 'Same denominator: add numerators.', solutionSteps: ['(1 + 2) / 4 = 3/4'] },
        { id: 'fr-e2', question: 'Evaluate: (5/7) - (2/7)', answer: '3/7', hint: 'Subtract numerators.', solutionSteps: ['(5 - 2) / 7 = 3/7'] },
        { id: 'fr-e3', question: 'Simplify to lowest terms: 8/12', answer: '2/3', hint: 'Divide both by 4.', solutionSteps: ['8 ÷ 4 = 2', '12 ÷ 4 = 3', '2/3'] },
      ],
      medium: [
        { id: 'fr-m1', question: 'Evaluate: (1/2) + (1/3)', answer: '5/6', hint: 'LCD = 6: 3/6 + 2/6.', solutionSteps: ['3/6 + 2/6 = 5/6'] },
        { id: 'fr-m2', question: 'Multiply: (3/5) * (10/9)', answer: '2/3', hint: '(3*10)/(5*9) = 30/45 = 2/3.', solutionSteps: ['30 / 45 = 2/3'] },
        { id: 'fr-m3', question: 'Divide: (2/3) ÷ (4/9)', answer: '1.5', hint: '(2/3) * (9/4) = 18/12 = 3/2 = 1.5.', solutionSteps: ['18 / 12 = 3/2 = 1.5'] },
      ],
      challenge: [
        { id: 'fr-c1', question: 'Evaluate: (3/4) + (2/5) - (1/2)', answer: '13/20', hint: 'LCD = 20: 15/20 + 8/20 - 10/20.', solutionSteps: ['15 + 8 - 10 = 13', '13/20'] },
        { id: 'fr-c2', question: 'Evaluate: (2/3 + 1/4) ÷ (5/6)', answer: '1.1', hint: 'Numerator = 11/12. (11/12) * (6/5) = 11/10 = 1.1.', solutionSteps: ['11/12 * 6/5 = 66/60 = 11/10 = 1.1'] },
      ],
    },
  },

  decimals: {
    id: 'decimals',
    title: 'Decimals',
    category: 'Arithmetic Foundations',
    subTopics: ['Place Value (Tenths, Hundredths)', 'Decimal Arithmetic', 'Rounding Decimals', 'Converting to Fractions'],
    whatIsIt: {
      definition: 'Decimals express rational numbers in a base-10 positional notation with a decimal point.',
      terms: ['Tenths (0.1)', 'Hundredths (0.01)', 'Thousandths (0.001)', 'Terminating vs Repeating'],
      formulaOrRule: 'Addition/Subtraction: Align decimal points vertically. Multiplication: count total decimal places.',
      whyUsed: 'Essential for currency, precision measurements, physics calculations, and digital computation.',
    },
    example1: {
      problem: 'Evaluate: 14.75 + 8.6',
      steps: [
        { action: 'Align the numbers by their decimal points.', math: '  14.75\n+  8.60' },
        { action: 'Add column by column from right to left.', math: '5 + 0 = 5\n7 + 6 = 13 (carry 1)\n4 + 8 + 1 = 13 (carry 1)\n1 + 1 = 2' },
      ],
      finalAnswer: '23.35',
    },
    example2: {
      problem: 'Multiply: 3.4 * 0.12',
      steps: [
        { action: 'Multiply ignoring decimal points.', math: '34 * 12 = 408' },
        { action: 'Count total decimal places (1 in 3.4, 2 in 0.12 = 3 places).', math: 'Shift decimal point 3 positions left: 0.408' },
      ],
      finalAnswer: '0.408',
    },
    keyRules: [
      'Always line up decimal points for addition and subtraction.',
      'In multiplication, the product has as many decimal places as the sum of decimal places in factors.',
      'To divide by a decimal, shift the decimal point in divisor and dividend to make divisor an integer.',
    ],
    commonMistakes: [
      { mistake: 'Misaligning decimals: 3.5 + 1.25 calculated as 35 + 125.', correct: 'Write as 3.50 + 1.25 = 4.75.' },
      { mistake: 'Placing decimal point incorrectly in 0.2 * 0.3 = 0.6.', correct: '1 + 1 = 2 places => 0.06.' },
    ],
    practice: {
      easy: [
        { id: 'dc-e1', question: 'Evaluate: 4.2 + 3.7', answer: '7.9', hint: 'Add: 4.2 + 3.7.', solutionSteps: ['4.2 + 3.7 = 7.9'] },
        { id: 'dc-e2', question: 'Evaluate: 10.5 - 4.2', answer: '6.3', hint: 'Subtract: 10.5 - 4.2.', solutionSteps: ['10.5 - 4.2 = 6.3'] },
        { id: 'dc-e3', question: 'Convert 1/4 to a decimal.', answer: '0.25', hint: '1 ÷ 4 = 0.25.', solutionSteps: ['1/4 = 0.25'] },
      ],
      medium: [
        { id: 'dc-m1', question: 'Multiply: 2.5 * 1.4', answer: '3.5', hint: '25 * 14 = 350. Two decimal places = 3.50.', solutionSteps: ['3.5'] },
        { id: 'dc-m2', question: 'Evaluate: 18.6 / 3', answer: '6.2', hint: '18 / 3 = 6, 0.6 / 3 = 0.2.', solutionSteps: ['6.2'] },
        { id: 'dc-m3', question: 'Round 3.846 to 2 decimal places.', answer: '3.85', hint: 'Third digit is 6 (>= 5), so round 4 up to 5.', solutionSteps: ['3.85'] },
      ],
      challenge: [
        { id: 'dc-c1', question: 'Evaluate: 0.04 * 0.025', answer: '0.001', hint: '4 * 25 = 100. Decimal places = 2 + 3 = 5. 0.00100 = 0.001.', solutionSteps: ['0.001'] },
        { id: 'dc-c2', question: 'Evaluate: 1.44 / 0.12', answer: '12', hint: 'Shift 2 places: 144 / 12 = 12.', solutionSteps: ['144 / 12 = 12'] },
      ],
    },
  },

  percentages: {
    id: 'percentages',
    title: 'Percentages',
    category: 'Arithmetic Foundations',
    subTopics: ['Percent as a Fraction (x/100)', 'Percentage of a Quantity', 'Percentage Increase & Decrease', 'Discount & Markup'],
    whatIsIt: {
      definition: 'A percentage is a ratio or number expressed as a fraction of 100 (from Latin per centum).',
      terms: ['Base: whole amount', 'Rate: percentage rate (%)', 'Percentage: Part = (Rate / 100) * Base', 'Multiplier: (1 ± r)'],
      formulaOrRule: 'Part = (P / 100) * Whole. Percentage Change = ((New - Old) / Old) * 100%.',
      whyUsed: 'Standard metric for financial interest, discounts, economic inflation, and statistical metrics.',
    },
    example1: {
      problem: 'Find 15% of 240.',
      steps: [
        { action: 'Convert 15% to a decimal or fraction.', math: '15% = 15/100 = 0.15' },
        { action: 'Multiply by the base amount 240.', math: '0.15 * 240 = 36' },
      ],
      finalAnswer: '36',
    },
    example2: {
      problem: 'An item originally priced at $80 is discounted by 25%. Find the sale price.',
      steps: [
        { action: 'Calculate the discount multiplier.', math: 'Multiplier = 1 - 0.25 = 0.75' },
        { action: 'Multiply the original price by the multiplier.', math: '80 * 0.75 = 60' },
      ],
      finalAnswer: '$60',
    },
    keyRules: [
      'To convert percent to decimal: divide by 100 (shift decimal 2 places left).',
      'To find percentage increase: multiply by (1 + rate/100).',
      'To find percentage decrease: multiply by (1 - rate/100).',
    ],
    commonMistakes: [
      { mistake: 'Calculating 20% increase on 100, then 20% decrease, assuming price is still 100.', correct: '100 * 1.20 = 120, then 120 * 0.80 = 96.' },
      { mistake: 'Confusing 0.5% with 50%.', correct: '0.5% = 0.005, whereas 50% = 0.50.' },
    ],
    practice: {
      easy: [
        { id: 'pc-e1', question: 'What is 50% of 90?', answer: '45', hint: 'Half of 90.', solutionSteps: ['0.50 * 90 = 45'] },
        { id: 'pc-e2', question: 'What is 10% of 350?', answer: '35', hint: 'Divide 350 by 10.', solutionSteps: ['350 / 10 = 35'] },
        { id: 'pc-e3', question: 'Convert 75% to a simplified fraction.', answer: '3/4', hint: '75/100 = 3/4.', solutionSteps: ['3/4'] },
      ],
      medium: [
        { id: 'pc-m1', question: 'What is 25% of 160?', answer: '40', hint: '160 / 4 = 40.', solutionSteps: ['40'] },
        { id: 'pc-m2', question: 'A $120 jacket is on 30% sale. What is the sale price?', answer: '84', hint: '120 * 0.70 = 84.', solutionSteps: ['120 * 0.70 = 84'] },
        { id: 'pc-m3', question: 'If 30 out of 50 students passed, what percentage passed?', answer: '60', hint: '(30/50) * 100% = 60%.', solutionSteps: ['60%'] },
      ],
      challenge: [
        { id: 'pc-c1', question: 'A price increased from 80 to 100. Find percentage increase.', answer: '25', hint: '(100 - 80) / 80 * 100% = 20/80 = 25%.', solutionSteps: ['20 / 80 = 0.25 => 25%'] },
        { id: 'pc-c2', question: 'After a 20% discount, an item costs $96. What was the original price?', answer: '120', hint: 'Original * 0.80 = 96 => Original = 96 / 0.80 = 120.', solutionSteps: ['96 / 0.8 = 120'] },
      ],
    },
  },

  'ratios-proportions': {
    id: 'ratios-proportions',
    title: 'Ratios and Proportions',
    category: 'Arithmetic Foundations',
    subTopics: ['Ratio Simplification', 'Part-to-Part & Part-to-Whole', 'Direct Proportion', 'Inverse Proportion'],
    whatIsIt: {
      definition: 'A ratio compares two quantities by division; a proportion is an equation stating that two ratios are equal.',
      terms: ['Ratio (a : b)', 'Proportion: a/b = c/d', 'Extremes & Means', 'Constant of proportionality (k)'],
      formulaOrRule: 'Cross-multiplication rule: If a/b = c/d, then a * d = b * c.',
      whyUsed: 'Scaling maps, cooking recipes, financial allocation, speed/gear ratios, and model building.',
    },
    example1: {
      problem: 'Divide $150 in the ratio 2 : 3.',
      steps: [
        { action: 'Calculate total ratio parts.', math: 'Total parts = 2 + 3 = 5' },
        { action: 'Determine the value of 1 part.', math: 'Value per part = $150 / 5 = $30' },
        { action: 'Multiply each ratio share by part value.', math: 'Part 1 = 2 * $30 = $60\nPart 2 = 3 * $30 = $90' },
      ],
      finalAnswer: '$60 and $90',
    },
    example2: {
      problem: 'Solve the proportion: 4 / x = 12 / 21',
      steps: [
        { action: 'Cross multiply.', math: '4 * 21 = 12 * x\n84 = 12x' },
        { action: 'Solve for x.', math: 'x = 84 / 12 = 7' },
      ],
      finalAnswer: 'x = 7',
    },
    keyRules: [
      'In any true proportion a/b = c/d, the product of extremes equals product of means (ad = bc).',
      'Both quantities in a ratio must be in the same measurement units before simplifying.',
      'In direct proportion y = kx; in inverse proportion y = k/x.',
    ],
    commonMistakes: [
      { mistake: 'Adding same constant to both ratio parts assuming ratio stays identical.', correct: '2:3 is not equivalent to (2+1):(3+1) = 3:4.' },
    ],
    practice: {
      easy: [
        { id: 'rp-e1', question: 'Simplify the ratio 18 : 24.', answer: '3:4', hint: 'Divide both by 6.', solutionSteps: ['18/6 = 3', '24/6 = 4', '3:4'] },
        { id: 'rp-e2', question: 'Solve for x: x / 5 = 6 / 10', answer: '3', hint: 'Cross multiply: 10x = 30.', solutionSteps: ['10x = 30 => x = 3'] },
        { id: 'rp-e3', question: 'If 3 apples cost $6, how much do 5 apples cost?', answer: '10', hint: '$2 per apple. 5 * 2 = 10.', solutionSteps: ['5 * 2 = 10'] },
      ],
      medium: [
        { id: 'rp-m1', question: 'Divide 80 in ratio 3 : 5. What is the smaller part?', answer: '30', hint: 'Total parts = 8. Each part = 10. 3 * 10 = 30.', solutionSteps: ['30'] },
        { id: 'rp-m2', question: 'Solve for y: 7 / 3 = y / 15', answer: '35', hint: '3y = 7 * 15 = 105 => y = 35.', solutionSteps: ['35'] },
        { id: 'rp-m3', question: 'The ratio of boys to girls is 4:5. If there are 20 boys, how many girls?', answer: '25', hint: '4 parts = 20 => 1 part = 5. 5 parts = 25.', solutionSteps: ['25'] },
      ],
      challenge: [
        { id: 'rp-c1', question: 'If 6 workers complete a job in 10 days, how many days will 15 workers take (inverse proportion)?', answer: '4', hint: 'Workers * Days = constant = 60. 60 / 15 = 4 days.', solutionSteps: ['6 * 10 = 60', '60 / 15 = 4 days'] },
        { id: 'rp-c2', question: 'If (x + 2) / 3 = (2x - 1) / 5, find x.', answer: '13', hint: '5(x + 2) = 3(2x - 1) => 5x + 10 = 6x - 3 => x = 13.', solutionSteps: ['5x + 10 = 6x - 3', 'x = 13'] },
      ],
    },
  },

  averages: {
    id: 'averages',
    title: 'Averages',
    category: 'Arithmetic Foundations',
    subTopics: ['Arithmetic Mean', 'Weighted Average', 'Finding Total from Average', 'Missing Value in an Average'],
    whatIsIt: {
      definition: 'The average (arithmetic mean) is the sum of a collection of numbers divided by the count of numbers in the collection.',
      terms: ['Sum (Σx)', 'Count (n)', 'Arithmetic Mean (x̄ = Σx / n)', 'Weighted Mean'],
      formulaOrRule: 'Average = (Sum of Values) / (Number of Values). Sum = Average * Count.',
      whyUsed: 'Provides a single representative central value for a dataset in testing, sports, economics, and climate.',
    },
    example1: {
      problem: 'Find the average of: 12, 18, 24, 30, 36',
      steps: [
        { action: 'Sum all values.', math: '12 + 18 + 24 + 30 + 36 = 120' },
        { action: 'Divide by the count of numbers (n = 5).', math: 'Average = 120 / 5 = 24' },
      ],
      finalAnswer: '24',
    },
    example2: {
      problem: 'A student scored 82, 88, and 90 on three tests. What score is needed on the 4th test to average 88?',
      steps: [
        { action: 'Find total points needed for 4 tests to average 88.', math: 'Total required = 88 * 4 = 352' },
        { action: 'Find sum of the first 3 tests.', math: '82 + 88 + 90 = 260' },
        { action: 'Subtract current total from required total.', math: '4th score = 352 - 260 = 92' },
      ],
      finalAnswer: '92',
    },
    keyRules: [
      'The average must always lie strictly between the minimum and maximum values.',
      'If every number in a dataset increases by k, the average increases by k.',
      'Sum = Average * Count is the key to solving missing value problems.',
    ],
    commonMistakes: [
      { mistake: 'Averaging averages of groups with different sizes directly.', correct: 'Must use weighted average: Σ(mean * size) / total size.' },
    ],
    practice: {
      easy: [
        { id: 'av-e1', question: 'Find average of 10, 20, 30.', answer: '20', hint: '60 / 3 = 20.', solutionSteps: ['(10 + 20 + 30) / 3 = 20'] },
        { id: 'av-e2', question: 'Find average of 4, 8, 12, 16.', answer: '10', hint: '40 / 4 = 10.', solutionSteps: ['40 / 4 = 10'] },
        { id: 'av-e3', question: 'If 3 numbers sum to 45, what is their average?', answer: '15', hint: '45 / 3 = 15.', solutionSteps: ['15'] },
      ],
      medium: [
        { id: 'av-m1', question: 'Average of 5 numbers is 18. What is their sum?', answer: '90', hint: '18 * 5 = 90.', solutionSteps: ['90'] },
        { id: 'av-m2', question: 'Find average of 15, 25, 35, 45, 50.', answer: '34', hint: '170 / 5 = 34.', solutionSteps: ['170 / 5 = 34'] },
        { id: 'av-m3', question: 'Scores on 4 tests are 70, 75, 80, 95. Find mean.', answer: '80', hint: '320 / 4 = 80.', solutionSteps: ['320 / 4 = 80'] },
      ],
      challenge: [
        { id: 'av-c1', question: 'The average of 6 numbers is 15. If a 7th number 29 is added, what is the new average?', answer: '17', hint: 'Sum = 6 * 15 = 90. New sum = 90 + 29 = 119. 119 / 7 = 17.', solutionSteps: ['90 + 29 = 119', '119 / 7 = 17'] },
        { id: 'av-c2', question: 'Average of 3 numbers is 40. If ratio is 1:2:5, what is the largest number?', answer: '75', hint: 'Sum = 120. Parts = 8. 1 part = 15. Largest = 5 * 15 = 75.', solutionSteps: ['Sum = 120', '8 parts = 120 => 1 part = 15', 'Largest = 75'] },
      ],
    },
  },

  'factors-multiples': {
    id: 'factors-multiples',
    title: 'Factors and Multiples',
    category: 'Arithmetic Foundations',
    subTopics: ['Divisibility Rules', 'Prime vs Composite', 'Prime Factorization', 'Multiples'],
    whatIsIt: {
      definition: 'A factor divides a number completely with zero remainder; a multiple is the product of that number and any non-zero integer.',
      terms: ['Factor: divides evenly', 'Multiple: n * k', 'Prime: exactly 2 factors (1 and itself)', 'Composite: >2 factors'],
      formulaOrRule: 'Fundamental Theorem of Arithmetic: Every integer > 1 can be uniquely factored into primes.',
      whyUsed: 'Critical for cryptography (RSA encryption), simplifying algebraic fractions, and modular clocks.',
    },
    example1: {
      problem: 'Find all factors of 36.',
      steps: [
        { action: 'Test integer pairs whose product equals 36.', math: '1 * 36 = 36\n2 * 18 = 36\n3 * 12 = 36\n4 * 9 = 36\n6 * 6 = 36' },
        { action: 'List all unique factors in ascending order.', math: 'Factors: 1, 2, 3, 4, 6, 9, 12, 18, 36' },
      ],
      finalAnswer: '1, 2, 3, 4, 6, 9, 12, 18, 36 (Total 9 factors)',
    },
    example2: {
      problem: 'Write the prime factorization of 60 in exponential form.',
      steps: [
        { action: 'Divide 60 by the smallest prime factor.', math: '60 / 2 = 30' },
        { action: 'Continue dividing by prime factors.', math: '30 / 2 = 15\n15 / 3 = 5\n5 / 5 = 1' },
        { action: 'Write prime factors with powers.', math: '2 * 2 * 3 * 5 = 2^2 * 3 * 5' },
      ],
      finalAnswer: '2^2 * 3 * 5',
    },
    keyRules: [
      '1 is neither prime nor composite.',
      '2 is the only even prime number.',
      'A number is divisible by 3 if the sum of its digits is divisible by 3.',
    ],
    commonMistakes: [
      { mistake: 'Treating 1 as a prime number.', correct: '1 has only 1 factor, while primes must have exactly two distinct factors.' },
    ],
    practice: {
      easy: [
        { id: 'fm-e1', question: 'Is 29 prime or composite?', answer: 'prime', hint: 'Factors are only 1 and 29.', solutionSteps: ['Prime'] },
        { id: 'fm-e2', question: 'How many factors does 12 have?', answer: '6', hint: '1, 2, 3, 4, 6, 12.', solutionSteps: ['6 factors'] },
        { id: 'fm-e3', question: 'What is the smallest prime number?', answer: '2', hint: '2 is the smallest prime.', solutionSteps: ['2'] },
      ],
      medium: [
        { id: 'fm-m1', question: 'Find prime factorization of 84. What is the power of 2?', answer: '2', hint: '84 = 4 * 21 = 2^2 * 3 * 7.', solutionSteps: ['2^2 * 3 * 7', 'Power of 2 is 2'] },
        { id: 'fm-m2', question: 'What is the 5th multiple of 14?', answer: '70', hint: '14 * 5 = 70.', solutionSteps: ['70'] },
        { id: 'fm-m3', question: 'Is 111 divisible by 3? (yes or no)', answer: 'yes', hint: '1 + 1 + 1 = 3, which is divisible by 3.', solutionSteps: ['Sum = 3 => yes'] },
      ],
      challenge: [
        { id: 'fm-c1', question: 'How many total factors does 120 have?', answer: '16', hint: '120 = 2^3 * 3^1 * 5^1. Formula: (3+1)(1+1)(1+1) = 4 * 2 * 2 = 16.', solutionSteps: ['(3+1)(1+1)(1+1) = 16'] },
        { id: 'fm-c2', question: 'Find smallest number with exactly 3 factors.', answer: '4', hint: 'Numbers with 3 factors are squares of primes: 2^2 = 4 (factors: 1, 2, 4).', solutionSteps: ['2^2 = 4'] },
      ],
    },
  },

  'hcf-lcm': {
    id: 'hcf-lcm',
    title: 'HCF and LCM',
    category: 'Arithmetic Foundations',
    subTopics: ['Highest Common Factor (GCF)', 'Lowest Common Multiple', 'Prime Factorization Method', 'Product Property: HCF * LCM = a * b'],
    whatIsIt: {
      definition: 'HCF (Greatest Common Divisor) is the largest integer dividing all given numbers; LCM is the smallest positive integer divisible by all given numbers.',
      terms: ['HCF / GCD', 'LCM', 'Co-prime: HCF = 1', 'Common factor'],
      formulaOrRule: 'For two numbers a and b: HCF(a, b) * LCM(a, b) = a * b.',
      whyUsed: 'Used to simplify fractions, solve synchronous cycle problems (clocks, traffic lights), and modular arithmetic.',
    },
    example1: {
      problem: 'Find HCF and LCM of 24 and 36.',
      steps: [
        { action: 'Write prime factorizations.', math: '24 = 2^3 * 3^1\n36 = 2^2 * 3^2' },
        { action: 'HCF: take lowest powers of common primes.', math: 'HCF = 2^2 * 3^1 = 4 * 3 = 12' },
        { action: 'LCM: take highest powers of all primes.', math: 'LCM = 2^3 * 3^2 = 8 * 9 = 72' },
      ],
      finalAnswer: 'HCF = 12, LCM = 72',
    },
    example2: {
      problem: 'Two bells toll at intervals of 12 and 18 seconds. If they toll together now, in how many seconds will they next toll together?',
      steps: [
        { action: 'The next coincidence occurs at the LCM of intervals.', math: 'LCM(12, 18)' },
        { action: 'Compute LCM.', math: '12 = 2^2 * 3\n18 = 2 * 3^2\nLCM = 2^2 * 3^2 = 36' },
      ],
      finalAnswer: '36 seconds',
    },
    keyRules: [
      'HCF(a, b) <= min(a, b), whereas LCM(a, b) >= max(a, b).',
      'If two numbers are co-prime, HCF = 1 and LCM = a * b.',
      'HCF * LCM = a * b works strictly for two numbers.',
    ],
    commonMistakes: [
      { mistake: 'Applying HCF * LCM = a * b * c for three numbers.', correct: 'The direct product formula applies strictly to two numbers.' },
    ],
    practice: {
      easy: [
        { id: 'hl-e1', question: 'Find HCF of 15 and 25.', answer: '5', hint: 'Largest number dividing 15 and 25 is 5.', solutionSteps: ['HCF = 5'] },
        { id: 'hl-e2', question: 'Find LCM of 4 and 6.', answer: '12', hint: 'Multiples of 6: 6, 12.', solutionSteps: ['LCM = 12'] },
        { id: 'hl-e3', question: 'What is HCF of 7 and 13 (both prime)?', answer: '1', hint: 'Prime numbers have HCF = 1.', solutionSteps: ['1'] },
      ],
      medium: [
        { id: 'hl-m1', question: 'Find HCF of 48 and 72.', answer: '24', hint: '48 = 24 * 2, 72 = 24 * 3.', solutionSteps: ['HCF = 24'] },
        { id: 'hl-m2', question: 'Find LCM of 15 and 20.', answer: '60', hint: 'Multiples: 60 is divisible by both.', solutionSteps: ['LCM = 60'] },
        { id: 'hl-m3', question: 'If HCF(a, b) = 6 and a * b = 180, find LCM(a, b).', answer: '30', hint: 'LCM = (a * b) / HCF = 180 / 6 = 30.', solutionSteps: ['180 / 6 = 30'] },
      ],
      challenge: [
        { id: 'hl-c1', question: 'Find LCM of 12, 15, and 20.', answer: '60', hint: '12=2^2*3, 15=3*5, 20=2^2*5 => 2^2*3*5 = 60.', solutionSteps: ['LCM = 60'] },
        { id: 'hl-c2', question: 'Two numbers in ratio 3:4 have HCF 5. What is their LCM?', answer: '60', hint: 'Numbers are 15 and 20. LCM(15, 20) = 60.', solutionSteps: ['Numbers = 15, 20', 'LCM = 60'] },
      ],
    },
  },

  'pos-neg-numbers': {
    id: 'pos-neg-numbers',
    title: 'Positive and Negative Numbers',
    category: 'Arithmetic Foundations',
    subTopics: ['The Number Line', 'Absolute Value |x|', 'Addition & Subtraction Rules', 'Multiplication & Division Sign Rules'],
    whatIsIt: {
      definition: 'Signed numbers represent quantities having both magnitude and direction along a 1D reference axis.',
      terms: ['Positive: > 0', 'Negative: < 0', 'Absolute Value (|x|)', 'Additive Inverse (-x)'],
      formulaOrRule: 'Signs Rule: (+) * (+) = (+), (-) * (-) = (+), (+) * (-) = (-), (-) * (+) = (-). Subtracting is adding the opposite: a - (-b) = a + b.',
      whyUsed: 'Represents bank balances, temperatures below zero, elevation below sea level, and coordinate vectors.',
    },
    example1: {
      problem: 'Evaluate: -15 - (-22) + (-8)',
      steps: [
        { action: 'Convert minus negative to addition.', math: '-15 + 22 + (-8)' },
        { action: 'Add positive and negative integers.', math: '(-15 + 22) = 7\n7 + (-8) = -1' },
      ],
      finalAnswer: '-1',
    },
    example2: {
      problem: 'Evaluate: (-6) * (-4) / (-3)',
      steps: [
        { action: 'Multiply two negatives: product is positive.', math: '(-6) * (-4) = +24' },
        { action: 'Divide positive by negative: quotient is negative.', math: '24 / (-3) = -8' },
      ],
      finalAnswer: '-8',
    },
    keyRules: [
      'Two negatives make a positive ONLY when multiplying, dividing, or double-negating: -(-a) = +a.',
      'Adding two negatives yields a more negative number: -5 + (-3) = -8 (NOT positive 8).',
      'Absolute value |x| is always non-negative: |-7| = 7 and |0| = 0.',
    ],
    commonMistakes: [
      { mistake: 'Writing -4 - 3 = +7 (confusing addition with multiplication).', correct: '-4 - 3 = -7.' },
      { mistake: 'Assuming -x is always negative.', correct: 'If x is negative (e.g. x = -5), then -x = -(-5) = +5.' },
    ],
    practice: {
      easy: [
        { id: 'pn-e1', question: 'Evaluate: -8 + 5', answer: '-3', hint: 'Start at -8, move right 5.', solutionSteps: ['-8 + 5 = -3'] },
        { id: 'pn-e2', question: 'Evaluate: (-7) * 4', answer: '-28', hint: 'Negative * Positive = Negative.', solutionSteps: ['-28'] },
        { id: 'pn-e3', question: 'What is |-19|?', answer: '19', hint: 'Distance from 0 is always positive.', solutionSteps: ['19'] },
      ],
      medium: [
        { id: 'pn-m1', question: 'Evaluate: -12 - (-18)', answer: '6', hint: '-12 + 18 = 6.', solutionSteps: ['-12 + 18 = 6'] },
        { id: 'pn-m2', question: 'Evaluate: (-36) / (-4)', answer: '9', hint: 'Negative / Negative = Positive.', solutionSteps: ['9'] },
        { id: 'pn-m3', question: 'Evaluate: (-2)^3', answer: '-8', hint: '(-2)*(-2)*(-2) = 4*(-2) = -8.', solutionSteps: ['-8'] },
      ],
      challenge: [
        { id: 'pn-c1', question: 'Evaluate: (-3)^2 - 4 * (-2) * (-5)', answer: '-31', hint: '9 - 4 * (10) = 9 - 40 = -31.', solutionSteps: ['9 - 40 = -31'] },
        { id: 'pn-c2', question: 'Evaluate: |-15 + 3| - |-8| * 2', answer: '-4', hint: '|-12| - 8 * 2 = 12 - 16 = -4.', solutionSteps: ['12 - 16 = -4'] },
      ],
    },
  },
};
