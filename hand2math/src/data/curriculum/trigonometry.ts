import { TopicContent } from '../mathCurriculum';

export const TRIGONOMETRY_TOPICS: Record<string, TopicContent> = {
  'intro-trig': {
    id: 'intro-trig',
    title: 'Introduction to Trigonometry',
    category: 'Trigonometry',
    subTopics: ['Right Triangle Nomenclature', 'Opposite, Adjacent & Hypotenuse', 'Standard Reference Angle θ', 'SOH CAH TOA Overview'],
    whatIsIt: {
      definition: 'Trigonometry is the branch of mathematics studying relationships between side lengths and angles of triangles (from Greek trigonon "triangle" + metron "measure").',
      terms: ['Hypotenuse: longest side opposite 90°', 'Opposite side: directly across from reference angle θ', 'Adjacent side: adjacent to angle θ (between θ and 90°)', 'SOH-CAH-TOA'],
      formulaOrRule: 'sin(θ) = Opposite / Hypotenuse. cos(θ) = Adjacent / Hypotenuse. tan(θ) = Opposite / Adjacent.',
      whyUsed: 'Calculates celestial distances, GPS triangulation, satellite orbits, radio wave frequencies, and computer graphics lighting.',
    },
    example1: {
      problem: 'In a right triangle, angle θ has opposite side 3 and adjacent side 4. Find the hypotenuse and sin(θ).',
      steps: [
        { action: 'Calculate hypotenuse using Pythagorean theorem.', math: 'c = √(3^2 + 4^2) = √(9 + 16) = √25 = 5' },
        { action: 'Compute sin(θ) = Opposite / Hypotenuse.', math: 'sin(θ) = 3 / 5 = 0.6' },
      ],
      finalAnswer: 'Hypotenuse = 5, sin(θ) = 0.6',
    },
    example2: {
      problem: 'If hypotenuse is 13 and adjacent side is 12, find cos(θ).',
      steps: [
        { action: 'Apply definition: cos(θ) = Adjacent / Hypotenuse.', math: 'cos(θ) = 12 / 13' },
      ],
      finalAnswer: 'cos(θ) = 12/13 (approx 0.923)',
    },
    keyRules: [
      'The labels "Opposite" and "Adjacent" depend entirely on which acute angle is chosen as reference angle θ.',
      'The hypotenuse is ALWAYS fixed as the side opposite the 90° right angle.',
      'For any acute angle θ: 0 < sin(θ) < 1 and 0 < cos(θ) < 1.',
    ],
    commonMistakes: [
      { mistake: 'Labeling the adjacent side as the hypotenuse.', correct: 'The hypotenuse is always the longest side directly opposite the 90° angle.' },
    ],
    practice: {
      easy: [
        { id: 'it-e1', question: 'In right triangle with opp = 6, hyp = 10, find sin(θ).', answer: '0.6', hint: '6 / 10 = 0.6.', solutionSteps: ['0.6'] },
        { id: 'it-e2', question: 'In right triangle with adj = 8, hyp = 10, find cos(θ).', answer: '0.8', hint: '8 / 10 = 0.8.', solutionSteps: ['0.8'] },
        { id: 'it-e3', question: 'In right triangle with opp = 3, adj = 4, find tan(θ).', answer: '0.75', hint: '3 / 4 = 0.75.', solutionSteps: ['0.75'] },
      ],
      medium: [
        { id: 'it-m1', question: 'If opp = 5 and hyp = 13, find adjacent side length.', answer: '12', hint: '√(169 - 25) = √144 = 12.', solutionSteps: ['12'] },
        { id: 'it-m2', question: 'If sin(θ) = 3/5, what is cos(θ)?', answer: '0.8', hint: 'cos(θ) = √(1 - 9/25) = √(16/25) = 4/5 = 0.8.', solutionSteps: ['0.8'] },
        { id: 'it-m3', question: 'If tan(θ) = 1, what is angle θ in degrees for an acute angle?', answer: '45', hint: 'tan(45°) = 1.', solutionSteps: ['45°'] },
      ],
      challenge: [
        { id: 'it-c1', question: 'If cos(θ) = 5/13, what is tan(θ)?', answer: '2.4', hint: 'opp = 12, adj = 5. tan(θ) = 12/5 = 2.4.', solutionSteps: ['12/5 = 2.4'] },
        { id: 'it-c2', question: 'A right triangle has area 24 and hyp = 10. Find sin(2θ).', answer: '0.96', hint: 'Area = (1/2)ab = 24 => ab = 48. sin(2θ) = 2 sinθ cosθ = 2(ab/c^2) = 2(48/100) = 0.96.', solutionSteps: ['0.96'] },
      ],
    },
  },

  sine: {
    id: 'sine',
    title: 'Sine',
    category: 'Trigonometry',
    subTopics: ['Definition: sin(θ) = Opp / Hyp', 'Standard Angle Values (0°, 30°, 45°, 60°, 90°)', 'The Unit Circle Definition', 'Sine Waves & Periodic Functions'],
    whatIsIt: {
      definition: 'The sine of an angle is the trigonometric ratio of the length of the opposite side to the length of the hypotenuse in a right triangle.',
      terms: ['sin(θ)', 'Unit circle: y-coordinate of a point on circle radius 1', 'Period: 360° (2π radians)', 'Amplitude: 1'],
      formulaOrRule: 'sin(0°) = 0, sin(30°) = 1/2 = 0.5, sin(45°) = 1/√2 = √2/2, sin(60°) = √3/2, sin(90°) = 1.',
      whyUsed: 'Models alternating electrical currents (AC), sound waveforms, light oscillations, and tidal ocean movements.',
    },
    example1: {
      problem: 'Find the height of a kite flying on a 40-meter taut string at an angle of 30° to the horizontal ground.',
      steps: [
        { action: 'Identify knowns: Hypotenuse = 40 m, angle θ = 30°.', math: 'sin(30°) = Opposite / Hypotenuse' },
        { action: 'Substitute sin(30°) = 1/2.', math: '0.5 = Height / 40' },
        { action: 'Solve for Height.', math: 'Height = 40 * 0.5 = 20 meters' },
      ],
      finalAnswer: '20 meters',
    },
    example2: {
      problem: 'Evaluate: 2 * sin(30°) + 4 * sin(90°)',
      steps: [
        { action: 'Substitute known exact values: sin(30°) = 0.5 and sin(90°) = 1.', math: '2 * (0.5) + 4 * (1)' },
        { action: 'Compute.', math: '1 + 4 = 5' },
      ],
      finalAnswer: '5',
    },
    keyRules: [
      'The range of the sine function for real angles is strictly between -1 and +1: -1 ≤ sin(θ) ≤ 1.',
      'sin(θ) = cos(90° - θ) (cofunction identity).',
      'sin(-θ) = -sin(θ) (sine is an odd function).',
    ],
    commonMistakes: [
      { mistake: 'Inputting angles in radians when calculator is in degrees mode or vice-versa.', correct: 'Always check if calculation requires degrees (°) or radians (rad).' },
    ],
    practice: {
      easy: [
        { id: 'si-e1', question: 'What is sin(30°)?', answer: '0.5', hint: 'Exact value is 1/2.', solutionSteps: ['0.5'] },
        { id: 'si-e2', question: 'What is sin(90°)?', answer: '1', hint: 'Maximum value on unit circle.', solutionSteps: ['1'] },
        { id: 'si-e3', question: 'What is sin(0°)?', answer: '0', hint: 'Zero height on unit circle.', solutionSteps: ['0'] },
      ],
      medium: [
        { id: 'si-m1', question: 'Evaluate: 4 * sin(30°) - 2 * sin(90°)', answer: '0', hint: '4(0.5) - 2(1) = 2 - 2 = 0.', solutionSteps: ['0'] },
        { id: 'si-m2', question: 'A 20 ft ladder leans at 30° to horizontal. How high does it reach?', answer: '10', hint: '20 * sin(30°) = 20 * 0.5 = 10 ft.', solutionSteps: ['10 ft'] },
        { id: 'si-m3', question: 'If sin(θ) = 0.5 and θ is acute, find θ in degrees.', answer: '30', hint: 'sin(30°) = 0.5.', solutionSteps: ['30°'] },
      ],
      challenge: [
        { id: 'si-c1', question: 'Evaluate: (sin(45°))^2 + (sin(30°))^2', answer: '0.75', hint: '(1/√2)^2 + (1/2)^2 = 1/2 + 1/4 = 3/4 = 0.75.', solutionSteps: ['3/4 = 0.75'] },
        { id: 'si-c2', question: 'Evaluate: sin(60°) / sin(30°) (exact: √3 ≈ 1.732). What is (sin(60°)/sin(30°))^2?', answer: '3', hint: '(√3/2) / (1/2) = √3. Squaring gives 3.', solutionSteps: ['3'] },
      ],
    },
  },

  cosine: {
    id: 'cosine',
    title: 'Cosine',
    category: 'Trigonometry',
    subTopics: ['Definition: cos(θ) = Adj / Hyp', 'Standard Angle Values (0°, 30°, 45°, 60°, 90°)', 'Unit Circle X-Coordinate', 'Law of Cosines Overview'],
    whatIsIt: {
      definition: 'The cosine of an angle is the ratio of the adjacent leg to the hypotenuse in a right triangle, representing the horizontal projection on the unit circle.',
      terms: ['cos(θ)', 'Unit circle: x-coordinate of point on circle', 'Even function: cos(-θ) = cos(θ)', 'Law of Cosines: c^2 = a^2 + b^2 - 2ab cos(C)'],
      formulaOrRule: 'cos(0°) = 1, cos(30°) = √3/2, cos(45°) = √2/2, cos(60°) = 1/2 = 0.5, cos(90°) = 0.',
      whyUsed: 'Calculates vector dot products, mechanical work W = F * d * cos(θ), shadow lengths, and non-right triangle solutions.',
    },
    example1: {
      problem: 'Find the horizontal base of a ramp with length 10 m inclined at an angle of 60° to the horizontal.',
      steps: [
        { action: 'Recall cos(θ) = Adjacent / Hypotenuse.', math: 'cos(60°) = Base / 10' },
        { action: 'Substitute cos(60°) = 0.5.', math: '0.5 = Base / 10' },
        { action: 'Multiply by 10.', math: 'Base = 10 * 0.5 = 5 meters' },
      ],
      finalAnswer: '5 meters',
    },
    example2: {
      problem: 'Evaluate: 6 * cos(60°) + 2 * cos(0°)',
      steps: [
        { action: 'Substitute known values: cos(60°) = 0.5 and cos(0°) = 1.', math: '6 * (0.5) + 2 * (1)' },
        { action: 'Compute.', math: '3 + 2 = 5' },
      ],
      finalAnswer: '5',
    },
    keyRules: [
      'The range of cosine is strictly between -1 and +1: -1 ≤ cos(θ) ≤ 1.',
      'Cosine is an even function: cos(-θ) = cos(θ).',
      'At 90°, cos(90°) = 0 (perpendicular vectors have zero dot product).',
    ],
    commonMistakes: [
      { mistake: 'Confusing cos(0°) with 0.', correct: 'cos(0°) = 1 because on the unit circle, angle 0 is at (1, 0).' },
    ],
    practice: {
      easy: [
        { id: 'co-e1', question: 'What is cos(60°)?', answer: '0.5', hint: '1/2 = 0.5.', solutionSteps: ['0.5'] },
        { id: 'co-e2', question: 'What is cos(0°)?', answer: '1', hint: 'Full horizontal radius.', solutionSteps: ['1'] },
        { id: 'co-e3', question: 'What is cos(90°)?', answer: '0', hint: 'Zero horizontal displacement.', solutionSteps: ['0'] },
      ],
      medium: [
        { id: 'co-m1', question: 'Evaluate: 10 * cos(60°) - 3', answer: '2', hint: '10 * 0.5 - 3 = 5 - 3 = 2.', solutionSteps: ['2'] },
        { id: 'co-m2', question: 'If cos(θ) = 0.5 and θ is acute, what is θ in degrees?', answer: '60', hint: 'cos(60°) = 0.5.', solutionSteps: ['60°'] },
        { id: 'co-m3', question: 'In a right triangle with hyp = 14 and angle = 60°, find adjacent leg.', answer: '7', hint: '14 * cos(60°) = 14 * 0.5 = 7.', solutionSteps: ['7'] },
      ],
      challenge: [
        { id: 'co-c1', question: 'Evaluate: (cos(30°))^2 + (cos(60°))^2', answer: '1', hint: '(√3/2)^2 + (1/2)^2 = 3/4 + 1/4 = 1.', solutionSteps: ['1'] },
        { id: 'co-c2', question: 'In triangle with a = 5, b = 8, and angle C = 60°, find c^2 using Law of Cosines: c^2 = a^2 + b^2 - 2ab cos(C).', answer: '49', hint: '25 + 64 - 2(5)(8)(0.5) = 89 - 40 = 49 (so c = 7).', solutionSteps: ['c^2 = 49'] },
      ],
    },
  },

  tangent: {
    id: 'tangent',
    title: 'Tangent',
    category: 'Trigonometry',
    subTopics: ['Definition: tan(θ) = Opp / Adj', 'Relation to Slope m = tan(θ)', 'Standard Values (0°, 30°, 45°, 60°)', 'Undefined Tangent at 90°'],
    whatIsIt: {
      definition: 'The tangent of an angle is the ratio of opposite side to adjacent side in a right triangle, exactly matching the slope of the line inclined at that angle.',
      terms: ['tan(θ) = sin(θ) / cos(θ)', 'Slope m = tan(θ)', 'Asymptotes at 90°, 270°'],
      formulaOrRule: 'tan(0°) = 0, tan(30°) = 1/√3, tan(45°) = 1, tan(60°) = √3 ≈ 1.732, tan(90°) = Undefined.',
      whyUsed: 'Surveying elevation heights without climbing, road gradient percentages, solar shadow calculations, and gunnery trajectories.',
    },
    example1: {
      problem: 'A flagpole casts a 15-meter shadow on ground when the sun angle of elevation is 45°. Find the height of the flagpole.',
      steps: [
        { action: 'Recall tan(θ) = Opposite / Adjacent.', math: 'tan(45°) = Height / 15' },
        { action: 'Substitute tan(45°) = 1.', math: '1 = Height / 15' },
        { action: 'Solve for Height.', math: 'Height = 15 meters' },
      ],
      finalAnswer: '15 meters',
    },
    example2: {
      problem: 'Find the slope of a line inclined at an angle of 45° to the positive x-axis.',
      steps: [
        { action: 'Recall slope m = tan(θ).', math: 'm = tan(45°)' },
        { action: 'Evaluate.', math: 'm = 1' },
      ],
      finalAnswer: 'Slope m = 1',
    },
    keyRules: [
      'tan(θ) = sin(θ) / cos(θ).',
      'At 90°, cos(90°) = 0, which makes tan(90°) undefined (vertical asymptote).',
      'The range of tangent is all real numbers: (-∞, +∞).',
    ],
    commonMistakes: [
      { mistake: 'Attempting to calculate tan(90°).', correct: 'Division by zero is undefined; vertical lines have undefined slope.' },
    ],
    practice: {
      easy: [
        { id: 'ta-e1', question: 'What is tan(45°)?', answer: '1', hint: 'Opposite = Adjacent in 45-45-90 triangle.', solutionSteps: ['1'] },
        { id: 'ta-e2', question: 'What is tan(0°)?', answer: '0', hint: '0 / 1 = 0.', solutionSteps: ['0'] },
        { id: 'ta-e3', question: 'Is tan(90°) defined? (yes or no)', answer: 'no', hint: 'Division by cos(90°)=0 is undefined.', solutionSteps: ['No, undefined'] },
      ],
      medium: [
        { id: 'ta-m1', question: 'A tree casts a 20m shadow when sun elevation is 45°. How tall is the tree?', answer: '20', hint: 'Height = 20 * tan(45°) = 20 * 1 = 20 m.', solutionSteps: ['20 m'] },
        { id: 'ta-m2', question: 'If tan(θ) = 1 and θ is acute, find θ in degrees.', answer: '45', hint: 'tan(45°) = 1.', solutionSteps: ['45°'] },
        { id: 'ta-m3', question: 'If opp = 8 and adj = 6, find tan(θ).', answer: '1.33', hint: '8 / 6 = 4/3 ≈ 1.33.', solutionSteps: ['4/3 ≈ 1.33'] },
      ],
      challenge: [
        { id: 'ta-c1', question: 'What is (tan(60°))^2?', answer: '3', hint: 'tan(60°) = √3. Squaring gives 3.', solutionSteps: ['3'] },
        { id: 'ta-c2', question: 'If sin(θ) = 3/5 and cos(θ) = 4/5, find tan(θ).', answer: '0.75', hint: 'sin/cos = (3/5)/(4/5) = 3/4 = 0.75.', solutionSteps: ['0.75'] },
      ],
    },
  },

  'trig-ratios': {
    id: 'trig-ratios',
    title: 'Trigonometric Ratios',
    category: 'Trigonometry',
    subTopics: ['Primary Ratios (sin, cos, tan)', 'Reciprocal Ratios (csc, sec, cot)', 'Values for 30°, 45°, 60°', 'Table of Standard Angles'],
    whatIsIt: {
      definition: 'Trigonometric ratios are the six distinct mathematical ratios formed by pairing the three sides of a right triangle.',
      terms: ['Cosecant: csc(θ) = 1 / sin(θ) = Hyp / Opp', 'Secant: sec(θ) = 1 / cos(θ) = Hyp / Adj', 'Cotangent: cot(θ) = 1 / tan(θ) = Adj / Opp'],
      formulaOrRule: 'sin = O/H, cos = A/H, tan = O/A. csc = H/O, sec = H/A, cot = A/O. Product rules: sin*csc = 1, cos*sec = 1, tan*cot = 1.',
      whyUsed: 'Provides complete algebraic duality for solving calculus integrals, Fourier transforms, and wave kinematics.',
    },
    example1: {
      problem: 'In a right triangle with sides 5, 12, 13 (hyp = 13), find sec(θ) and cot(θ) if adjacent = 12 and opposite = 5.',
      steps: [
        { action: 'Compute sec(θ) = Hypotenuse / Adjacent.', math: 'sec(θ) = 13 / 12' },
        { action: 'Compute cot(θ) = Adjacent / Opposite.', math: 'cot(θ) = 12 / 5 = 2.4' },
      ],
      finalAnswer: 'sec(θ) = 13/12, cot(θ) = 12/5',
    },
    example2: {
      problem: 'Evaluate: csc(30°) + sec(60°)',
      steps: [
        { action: 'Recall csc(30°) = 1 / sin(30°) = 1 / 0.5 = 2.', math: 'csc(30°) = 2' },
        { action: 'Recall sec(60°) = 1 / cos(60°) = 1 / 0.5 = 2.', math: 'sec(60°) = 2' },
        { action: 'Add results.', math: '2 + 2 = 4' },
      ],
      finalAnswer: '4',
    },
    keyRules: [
      'Reciprocal identities: csc(θ) = 1/sin(θ), sec(θ) = 1/cos(θ), cot(θ) = 1/tan(θ).',
      'Quotient identity: cot(θ) = cos(θ) / sin(θ).',
      'sec(θ) and csc(θ) values can never lie strictly between -1 and +1.',
    ],
    commonMistakes: [
      { mistake: 'Assuming secant is reciprocal of sine because both start with "s".', correct: 'sec pairs with cos; csc pairs with sin.' },
    ],
    practice: {
      easy: [
        { id: 'tr-e1', question: 'What is csc(30°)?', answer: '2', hint: '1 / sin(30°) = 1 / 0.5 = 2.', solutionSteps: ['2'] },
        { id: 'tr-e2', question: 'What is cot(45°)?', answer: '1', hint: '1 / tan(45°) = 1 / 1 = 1.', solutionSteps: ['1'] },
        { id: 'tr-e3', question: 'What is sec(60°)?', answer: '2', hint: '1 / cos(60°) = 1 / 0.5 = 2.', solutionSteps: ['2'] },
      ],
      medium: [
        { id: 'tr-m1', question: 'If sin(θ) = 4/5, what is csc(θ)?', answer: '1.25', hint: '5 / 4 = 1.25.', solutionSteps: ['1.25'] },
        { id: 'tr-m2', question: 'If tan(θ) = 3/4, what is cot(θ)?', answer: '1.33', hint: '4 / 3 ≈ 1.33.', solutionSteps: ['4/3 ≈ 1.33'] },
        { id: 'tr-m3', question: 'Evaluate: sin(30°) * csc(30°)', answer: '1', hint: 'Reciprocals multiply to 1.', solutionSteps: ['1'] },
      ],
      challenge: [
        { id: 'tr-c1', question: 'Evaluate: (sec(45°))^2', answer: '2', hint: 'cos(45°) = 1/√2 => sec(45°) = √2. (√2)^2 = 2.', solutionSteps: ['2'] },
        { id: 'tr-c2', question: 'If sec(θ) = 2.5 (5/2), what is cos(θ)?', answer: '0.4', hint: '2 / 5 = 0.4.', solutionSteps: ['0.4'] },
      ],
    },
  },

  'trig-identities': {
    id: 'trig-identities',
    title: 'Basic Trigonometric Identities',
    category: 'Trigonometry',
    subTopics: ['Pythagorean Identity sin²θ + cos²θ = 1', 'Secant-Tangent Identity 1 + tan²θ = sec²θ', 'Cosecant-Cotangent Identity 1 + cot²θ = csc²θ', 'Simplifying Trig Expressions'],
    whatIsIt: {
      definition: 'Trigonometric identities are mathematical equations involving trigonometric functions that are universally true for every valid angle θ.',
      terms: ['Fundamental identity: sin^2(θ) + cos^2(θ) = 1', 'Quotient identity', 'Pythagorean trigonometric identities'],
      formulaOrRule: '1) sin^2(θ) + cos^2(θ) = 1. 2) 1 + tan^2(θ) = sec^2(θ). 3) 1 + cot^2(θ) = csc^2(θ).',
      whyUsed: 'Simplifies complex differential equations, transforms acoustic signals, and optimizes 3D graphic rendering pipelines.',
    },
    example1: {
      problem: 'If sin(θ) = 3/5 for an acute angle θ, find cos(θ) using the Pythagorean identity.',
      steps: [
        { action: 'Apply sin^2(θ) + cos^2(θ) = 1.', math: '(3/5)^2 + cos^2(θ) = 1\n9/25 + cos^2(θ) = 1' },
        { action: 'Subtract 9/25 from 1.', math: 'cos^2(θ) = 1 - 9/25 = 16/25' },
        { action: 'Take square root (positive for acute angle).', math: 'cos(θ) = √(16/25) = 4/5 = 0.8' },
      ],
      finalAnswer: 'cos(θ) = 4/5 (0.8)',
    },
    example2: {
      problem: 'Simplify the expression: (1 - sin^2(θ)) * sec^2(θ)',
      steps: [
        { action: 'Substitute 1 - sin^2(θ) = cos^2(θ).', math: 'cos^2(θ) * sec^2(θ)' },
        { action: 'Substitute sec(θ) = 1 / cos(θ).', math: 'cos^2(θ) * (1 / cos^2(θ)) = 1' },
      ],
      finalAnswer: '1',
    },
    keyRules: [
      'sin^2(θ) + cos^2(θ) = 1 holds true for EVERY real angle without exception.',
      'sin^2(θ) means (sin(θ))^2 (not sin(θ^2)).',
      '1 - cos^2(θ) = sin^2(θ) and 1 - sin^2(θ) = cos^2(θ).',
    ],
    commonMistakes: [
      { mistake: 'Writing sin^2(θ) + cos^2(θ) = θ.', correct: 'The sum of squares is always the constant 1.' },
    ],
    practice: {
      easy: [
        { id: 'ti-e1', question: 'What is sin^2(40°) + cos^2(40°)?', answer: '1', hint: 'Pythagorean identity always equals 1.', solutionSteps: ['1'] },
        { id: 'ti-e2', question: 'Simplify: 1 - cos^2(θ)', answer: 'sin^2(theta)', hint: 'Equals sin^2(θ).', solutionSteps: ['sin^2(θ)'] },
        { id: 'ti-e3', question: 'Simplify: sec^2(θ) - tan^2(θ)', answer: '1', hint: '1 + tan^2 = sec^2 => sec^2 - tan^2 = 1.', solutionSteps: ['1'] },
      ],
      medium: [
        { id: 'ti-m1', question: 'If cos(θ) = 5/13, find sin(θ) for acute angle θ.', answer: '12/13', hint: '√(1 - 25/169) = √(144/169) = 12/13.', solutionSteps: ['12/13'] },
        { id: 'ti-m2', question: 'Simplify: tan(θ) * cos(θ)', answer: 'sin(theta)', hint: '(sin/cos) * cos = sin(θ).', solutionSteps: ['sin(θ)'] },
        { id: 'ti-m3', question: 'Simplify: cos(θ) * csc(θ)', answer: 'cot(theta)', hint: 'cos * (1/sin) = cos/sin = cot(θ).', solutionSteps: ['cot(θ)'] },
      ],
      challenge: [
        { id: 'ti-c1', question: 'Simplify: (sin(θ) + cos(θ))^2 - 2 sin(θ) cos(θ)', answer: '1', hint: 'sin^2 + 2sin cos + cos^2 - 2sin cos = sin^2 + cos^2 = 1.', solutionSteps: ['1'] },
        { id: 'ti-c2', question: 'Evaluate: 5 * (sin^2(17°) + cos^2(17°)) + 3 * (sec^2(25°) - tan^2(25°))', answer: '8', hint: '5(1) + 3(1) = 5 + 3 = 8.', solutionSteps: ['8'] },
      ],
    },
  },

  'heights-distances': {
    id: 'heights-distances',
    title: 'Heights and Distances',
    category: 'Trigonometry',
    subTopics: ['Angle of Elevation (Looking Up)', 'Angle of Depression (Looking Down)', 'Line of Sight', 'Two-Observer Problems'],
    whatIsIt: {
      definition: 'Heights and distances is the practical application of trigonometry to compute inaccessible physical heights and distances using measured sighting angles.',
      terms: ['Angle of Elevation: angle between horizontal line of sight and upward sightline', 'Angle of Depression: angle between horizontal sightline and downward object', 'Line of sight'],
      formulaOrRule: 'tan(θ) = Height / Distance => Height = Distance * tan(θ). Alternating angle property: Angle of Depression = Angle of Elevation from target.',
      whyUsed: 'Measuring mountain peaks, skyscraper construction alignment, lighthouse navigation, and aeronautical glide slopes.',
    },
    example1: {
      problem: 'From a point on the ground 30 m away from the foot of a tower, the angle of elevation of the top of the tower is 30°. Find the height of the tower (exact: 10√3 ≈ 17.32 m).',
      steps: [
        { action: 'Set up tangent ratio: tan(30°) = Height / Distance.', math: 'tan(30°) = h / 30' },
        { action: 'Substitute tan(30°) = 1 / √3.', math: '1 / √3 = h / 30' },
        { action: 'Solve for h.', math: 'h = 30 / √3 = 10√3 ≈ 17.32 m' },
      ],
      finalAnswer: '10√3 m (approx 17.32 m)',
    },
    example2: {
      problem: 'From the top of a 50m cliff, the angle of depression to a boat on the water is 45°. How far is the boat from the base of the cliff?',
      steps: [
        { action: 'By alternate interior angles, angle of elevation from boat to cliff top is also 45°.', math: 'θ = 45°' },
        { action: 'Apply tan(45°) = Height / Distance.', math: 'tan(45°) = 50 / d' },
        { action: 'Substitute tan(45°) = 1.', math: '1 = 50 / d => d = 50 m' },
      ],
      finalAnswer: '50 meters',
    },
    keyRules: [
      'Angle of elevation and depression are ALWAYS measured relative to the HORIZONTAL line of sight (never vertical).',
      'Angle of depression from observer equals angle of elevation from the object by alternate interior angles.',
    ],
    commonMistakes: [
      { mistake: 'Measuring the angle of depression from the vertical wall or tower.', correct: 'Angle of depression is measured from the horizontal sightline downward.' },
    ],
    practice: {
      easy: [
        { id: 'hd-e1', question: 'Distance = 40 m, angle of elevation = 45°. What is tower height?', answer: '40', hint: '40 * tan(45°) = 40 * 1 = 40 m.', solutionSteps: ['40 m'] },
        { id: 'hd-e2', question: 'Height = 25 m, angle of elevation = 45°. How far is observer?', answer: '25', hint: '25 / tan(45°) = 25 m.', solutionSteps: ['25 m'] },
        { id: 'hd-e3', question: 'Angle of depression from top of 60m lighthouse to a boat is 45°. Find distance of boat from base.', answer: '60', hint: 'tan(45°)=1 => d = 60 m.', solutionSteps: ['60 m'] },
      ],
      medium: [
        { id: 'hd-m1', question: 'From 60m away, angle of elevation of a tower is 60°. Find height squared (in m²).', answer: '10800', hint: 'Height = 60 * √3. Height^2 = 3600 * 3 = 10800.', solutionSteps: ['10800'] },
        { id: 'hd-m2', question: 'A 10m ladder makes 60° angle with ground. How high does it reach (use sin(60°) = √3/2)? Height squared = ?', answer: '75', hint: 'h = 10 * (√3/2) = 5√3. h^2 = 75.', solutionSteps: ['75'] },
        { id: 'hd-m3', question: 'An observer 1.5m tall stands 28.5m away from a tower. Angle of elevation is 45°. Total tower height = ?', answer: '30', hint: '28.5 * tan(45°) = 28.5. Total height = 28.5 + 1.5 = 30 m.', solutionSteps: ['30 m'] },
      ],
      challenge: [
        { id: 'hd-c1', question: 'Two ships are in line with a 100m cliff on the same side. Angles of depression are 45° and 30°. How far apart are the ships (approx, use √3 = 1.732)?', answer: '73.2', hint: 'd1 = 100/tan(45°) = 100. d2 = 100/tan(30°) = 100√3 = 173.2. Difference = 73.2 m.', solutionSteps: ['73.2 m'] },
        { id: 'hd-c2', question: 'Angle of elevation changes from 30° to 45° as observer walks 50m toward tower. Find height (h = 50 / (√3 - 1) ≈ 68.3m). What is h*(√3 - 1)?', answer: '50', hint: 'h(cot 30° - cot 45°) = 50 => h(√3 - 1) = 50.', solutionSteps: ['50'] },
      ],
    },
  },
};
