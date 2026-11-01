import { TopicContent } from '../mathCurriculum';

export const GEOMETRY_TOPICS: Record<string, TopicContent> = {
  'basic-shapes': {
    id: 'basic-shapes',
    title: 'Basic Geometric Shapes',
    category: 'Geometry',
    subTopics: ['Polygons (Triangle to Decagon)', 'Regular vs Irregular Shapes', 'Vertices, Edges, and Diagonals', 'Interior Angles Sum Formula'],
    whatIsIt: {
      definition: 'Geometric shapes are closed two-dimensional figures bounded by straight line segments (polygons) or curved boundaries.',
      terms: ['Vertex (corner point)', 'Edge / Side', 'Diagonal: line connecting non-adjacent vertices', 'Regular polygon: all sides and angles equal'],
      formulaOrRule: 'Interior angle sum of an n-sided polygon: S = (n - 2) * 180°. Number of diagonals = n(n - 3) / 2.',
      whyUsed: 'Essential in architecture, civil engineering, computer graphics wireframes, and industrial design.',
    },
    example1: {
      problem: 'Find the sum of interior angles of a regular hexagon (6 sides).',
      steps: [
        { action: 'Identify number of sides: n = 6.', math: 'n = 6' },
        { action: 'Apply formula S = (n - 2) * 180°.', math: 'S = (6 - 2) * 180° = 4 * 180° = 720°' },
        { action: 'Find measure of each interior angle in a regular hexagon.', math: 'Each angle = 720° / 6 = 120°' },
      ],
      finalAnswer: 'Sum = 720°, Each angle = 120°',
    },
    example2: {
      problem: 'How many diagonals does an octagon (8 sides) have?',
      steps: [
        { action: 'Apply diagonal formula: D = n(n - 3) / 2 where n = 8.', math: 'D = 8 * (8 - 3) / 2' },
        { action: 'Compute numerator and divide.', math: 'D = (8 * 5) / 2 = 40 / 2 = 20' },
      ],
      finalAnswer: '20 diagonals',
    },
    keyRules: [
      'The sum of exterior angles of ANY convex polygon is always exactly 360°.',
      'A regular polygon has both equal side lengths and equal interior angles.',
      'Triangles have zero diagonals: 3(3 - 3) / 2 = 0.',
    ],
    commonMistakes: [
      { mistake: 'Using n * 180° instead of (n - 2) * 180°.', correct: 'Must subtract 2 because an n-gon can be split into (n - 2) non-overlapping triangles.' },
    ],
    practice: {
      easy: [
        { id: 'bs-e1', question: 'How many sides does a pentagon have?', answer: '5', hint: 'Penta = 5.', solutionSteps: ['5 sides'] },
        { id: 'bs-e2', question: 'What is the sum of interior angles in a triangle?', answer: '180', hint: '(3 - 2) * 180° = 180°.', solutionSteps: ['180°'] },
        { id: 'bs-e3', question: 'What is the sum of interior angles in a quadrilateral?', answer: '360', hint: '(4 - 2) * 180° = 360°.', solutionSteps: ['360°'] },
      ],
      medium: [
        { id: 'bs-m1', question: 'Find sum of interior angles of a nonagon (9 sides).', answer: '1260', hint: '(9 - 2) * 180° = 7 * 180° = 1260°.', solutionSteps: ['1260°'] },
        { id: 'bs-m2', question: 'What is each interior angle in a regular pentagon?', answer: '108', hint: 'Sum = (5 - 2)*180 = 540. 540 / 5 = 108°.', solutionSteps: ['108°'] },
        { id: 'bs-m3', question: 'How many diagonals does a hexagon (6 sides) have?', answer: '9', hint: '6(3) / 2 = 9.', solutionSteps: ['9 diagonals'] },
      ],
      challenge: [
        { id: 'bs-c1', question: 'If each interior angle of a regular polygon is 144°, how many sides does it have?', answer: '10', hint: 'Exterior angle = 180° - 144° = 36°. n = 360° / 36° = 10 (Decagon).', solutionSteps: ['n = 10'] },
        { id: 'bs-c2', question: 'A polygon has 35 diagonals. How many sides does it have?', answer: '10', hint: 'n(n - 3)/2 = 35 => n(n - 3) = 70 => 10 * 7 = 70 => n = 10.', solutionSteps: ['n = 10'] },
      ],
    },
  },

  angles: {
    id: 'angles',
    title: 'Angles',
    category: 'Geometry',
    subTopics: ['Acute, Right, Obtuse, Reflex', 'Complementary & Supplementary', 'Vertically Opposite Angles', 'Transversal Angle Theorems'],
    whatIsIt: {
      definition: 'An angle is the measure of rotation between two rays sharing a common endpoint called the vertex.',
      terms: ['Acute (< 90°)', 'Right (= 90°)', 'Obtuse (90° to 180°)', 'Straight (= 180°)', 'Reflex (> 180°)', 'Complementary: sum to 90°', 'Supplementary: sum to 180°'],
      formulaOrRule: 'Complementary: A + B = 90°. Supplementary: A + B = 180°. Parallel line transversal: Alternate interior angles are equal; Consecutive interior angles sum to 180°.',
      whyUsed: 'Crucial for navigation, robotics joint rotation, carpentry, surveying, and optics refraction.',
    },
    example1: {
      problem: 'Two angles are supplementary. If one angle is 65°, find the other angle.',
      steps: [
        { action: 'Recall supplementary angles sum to 180°.', math: 'Angle 1 + Angle 2 = 180°' },
        { action: 'Subtract 65° from 180°.', math: 'Angle 2 = 180° - 65° = 115°' },
      ],
      finalAnswer: '115°',
    },
    example2: {
      problem: 'Two lines intersect forming vertically opposite angles of (3x + 10)° and (5x - 20)°. Find x and the angle.',
      steps: [
        { action: 'Vertically opposite angles are equal.', math: '3x + 10 = 5x - 20' },
        { action: 'Solve for x.', math: '10 + 20 = 5x - 3x\n30 = 2x => x = 15' },
        { action: 'Substitute x = 15 to find the angle measure.', math: '3(15) + 10 = 45 + 10 = 55°' },
      ],
      finalAnswer: 'x = 15, Angle = 55°',
    },
    keyRules: [
      'Angles on a straight line always sum to 180°.',
      'Angles around a complete point always sum to 360°.',
      'Vertically opposite angles formed by intersecting lines are always equal.',
    ],
    commonMistakes: [
      { mistake: 'Mixing up complementary and supplementary.', correct: 'Complementary = 90° (Corner = C), Supplementary = 180° (Straight line = S).' },
    ],
    practice: {
      easy: [
        { id: 'an-e1', question: 'What is the complement of 35°?', answer: '55', hint: '90 - 35 = 55.', solutionSteps: ['90° - 35° = 55°'] },
        { id: 'an-e2', question: 'What is the supplement of 110°?', answer: '70', hint: '180 - 110 = 70.', solutionSteps: ['180° - 110° = 70°'] },
        { id: 'an-e3', question: 'What type of angle is 135° (acute, right, obtuse)?', answer: 'obtuse', hint: 'Between 90° and 180°.', solutionSteps: ['Obtuse'] },
      ],
      medium: [
        { id: 'an-m1', question: 'Two complementary angles are in ratio 2:3. Find smaller angle.', answer: '36', hint: '5 parts = 90° => 1 part = 18°. 2 * 18° = 36°.', solutionSteps: ['36°'] },
        { id: 'an-m2', question: 'Angles on a straight line are x, 2x, and 3x. Find x.', answer: '30', hint: 'x + 2x + 3x = 180° => 6x = 180° => x = 30°.', solutionSteps: ['x = 30°'] },
        { id: 'an-m3', question: 'What is the reflex angle corresponding to an interior angle of 70°?', answer: '290', hint: '360° - 70° = 290°.', solutionSteps: ['290°'] },
      ],
      challenge: [
        { id: 'an-c1', question: 'In parallel lines cut by a transversal, consecutive interior angles are (2x + 10)° and (3x + 20)°. Find x.', answer: '30', hint: 'Consecutive interior angles sum to 180°: 5x + 30 = 180 => 5x = 150 => x = 30.', solutionSteps: ['5x + 30 = 180', 'x = 30'] },
        { id: 'an-c2', question: 'An angle is 24° more than its complement. What is the angle?', answer: '57', hint: 'x - (90 - x) = 24 => 2x - 90 = 24 => 2x = 114 => x = 57°.', solutionSteps: ['x = 57°'] },
      ],
    },
  },

  triangles: {
    id: 'triangles',
    title: 'Triangles',
    category: 'Geometry',
    subTopics: ['Classification (Equilateral, Isosceles, Scalene)', 'Angle Sum Property (180°)', 'Exterior Angle Theorem', 'Triangle Inequality Theorem'],
    whatIsIt: {
      definition: 'A triangle is a three-sided polygon with three vertices and three interior angles.',
      terms: ['Equilateral (3 equal sides, 60° each)', 'Isosceles (2 equal sides, 2 equal base angles)', 'Scalene (all sides different)', 'Hypotenuse (opposite 90°)'],
      formulaOrRule: 'Angle sum: A + B + C = 180°. Exterior angle theorem: Exterior angle = sum of two opposite interior angles. Triangle inequality: a + b > c for any two sides.',
      whyUsed: 'Triangles are structurally rigid (cannot deform without breaking), making them the universal building block of bridges, trusses, and 3D computer graphics meshes.',
    },
    example1: {
      problem: 'In an isosceles triangle, the vertex angle is 40°. Find the measure of each base angle.',
      steps: [
        { action: 'Base angles in an isosceles triangle are equal.', math: 'Base angle = x' },
        { action: 'Apply angle sum theorem.', math: '40° + x + x = 180°\n40° + 2x = 180°' },
        { action: 'Solve for x.', math: '2x = 140° => x = 70°' },
      ],
      finalAnswer: '70° each',
    },
    example2: {
      problem: 'An exterior angle of a triangle is 115°. One of its interior opposite angles is 45°. Find the other opposite interior angle.',
      steps: [
        { action: 'Apply Exterior Angle Theorem: Exterior = Opp1 + Opp2.', math: '115° = 45° + x' },
        { action: 'Solve for x.', math: 'x = 115° - 45° = 70°' },
      ],
      finalAnswer: '70°',
    },
    keyRules: [
      'The sum of any two side lengths of a triangle must always be strictly greater than the third side (a + b > c).',
      'The largest angle is always opposite the longest side.',
      'An equilateral triangle has all 3 angles equal to 60°.',
    ],
    commonMistakes: [
      { mistake: 'Believing side lengths 3, 4, 8 can form a triangle.', correct: '3 + 4 = 7, which is NOT > 8; these sides cannot connect to form a triangle.' },
    ],
    practice: {
      easy: [
        { id: 'tr-e1', question: 'Two angles of a triangle are 50° and 70°. Find the third angle.', answer: '60', hint: '180 - (50 + 70) = 60.', solutionSteps: ['180° - 120° = 60°'] },
        { id: 'tr-e2', question: 'What is the measure of each angle in an equilateral triangle?', answer: '60', hint: '180 / 3 = 60.', solutionSteps: ['60°'] },
        { id: 'tr-e3', question: 'Can sides of length 2, 3, 6 form a triangle? (yes or no)', answer: 'no', hint: '2 + 3 = 5 < 6.', solutionSteps: ['No, violates triangle inequality'] },
      ],
      medium: [
        { id: 'tr-m1', question: 'In a right-angled triangle, one acute angle is 38°. Find the other acute angle.', answer: '52', hint: '90° - 38° = 52°.', solutionSteps: ['52°'] },
        { id: 'tr-m2', question: 'Angles of a triangle are in ratio 2:3:4. Find the largest angle.', answer: '80', hint: '9 parts = 180° => 1 part = 20°. 4 * 20° = 80°.', solutionSteps: ['80°'] },
        { id: 'tr-m3', question: 'An exterior angle of a triangle is 130°. The opposite interior angles are equal. Find each.', answer: '65', hint: '2x = 130° => x = 65°.', solutionSteps: ['65°'] },
      ],
      challenge: [
        { id: 'tr-c1', question: 'In triangle ABC, angle B is twice angle A, and angle C is 20° more than angle B. Find angle A.', answer: '32', hint: 'A + 2A + (2A + 20) = 180 => 5A + 20 = 180 => 5A = 160 => A = 32°.', solutionSteps: ['5A = 160 => A = 32°'] },
        { id: 'tr-c2', question: 'If two sides of a triangle are 7 and 11, what is the smallest possible integer for the third side?', answer: '5', hint: 'Third side c > 11 - 7 = 4 => smallest integer is 5.', solutionSteps: ['c > 4 => c = 5'] },
      ],
    },
  },

  'pythagorean-theorem': {
    id: 'pythagorean-theorem',
    title: 'Pythagorean Theorem',
    category: 'Geometry',
    subTopics: ['Right Triangle Hypotenuse & Legs', 'Formula a² + b² = c²', 'Common Pythagorean Triples', 'Converse of Pythagorean Theorem'],
    whatIsIt: {
      definition: 'In any right-angled triangle, the area of the square on the hypotenuse is equal to the sum of the areas of the squares on the other two legs.',
      terms: ['Hypotenuse (c): longest side opposite 90°', 'Legs (a, b): sides forming the right angle', 'Pythagorean Triple: integer solutions (a, b, c)'],
      formulaOrRule: 'a^2 + b^2 = c^2 => c = √(a^2 + b^2), a = √(c^2 - b^2). Converse: If a^2 + b^2 = c^2, then the triangle is right-angled.',
      whyUsed: 'Crucial for distance calculations in coordinate geometry, GPS navigation, carpentry squaring (3-4-5 rule), and video game 3D vectors.',
    },
    example1: {
      problem: 'Find the hypotenuse c of a right triangle with legs a = 6 and b = 8.',
      steps: [
        { action: 'Apply Pythagorean formula a^2 + b^2 = c^2.', math: '6^2 + 8^2 = c^2' },
        { action: 'Compute squares and sum.', math: '36 + 64 = 100\nc^2 = 100' },
        { action: 'Take the square root.', math: 'c = √100 = 10' },
      ],
      finalAnswer: 'c = 10',
    },
    example2: {
      problem: 'A 13-meter ladder leans against a vertical wall with its foot 5 meters from the wall. How high up the wall does it reach?',
      steps: [
        { action: 'Identify hypotenuse c = 13 and base leg b = 5.', math: 'h^2 + 5^2 = 13^2' },
        { action: 'Solve for wall height h.', math: 'h^2 + 25 = 169\nh^2 = 169 - 25 = 144\nh = √144 = 12' },
      ],
      finalAnswer: '12 meters',
    },
    keyRules: [
      'The Pythagorean theorem ONLY applies to right-angled triangles (containing a 90° angle).',
      'The hypotenuse c is ALWAYS strictly the longest side.',
      'Common integer triples to memorize: (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25).',
    ],
    commonMistakes: [
      { mistake: 'Adding legs before squaring: √(6 + 8) = √14.', correct: 'Square first, then add: √(36 + 64) = √100 = 10.' },
      { mistake: 'Treating a leg as the hypotenuse.', correct: 'Always ensure c is the side directly opposite the 90° right angle.' },
    ],
    practice: {
      easy: [
        { id: 'py-e1', question: 'Find hypotenuse c if legs are 3 and 4.', answer: '5', hint: '3^2 + 4^2 = 9 + 16 = 25. √25 = 5.', solutionSteps: ['c = 5'] },
        { id: 'py-e2', question: 'Find hypotenuse c if legs are 5 and 12.', answer: '13', hint: '25 + 144 = 169. √169 = 13.', solutionSteps: ['c = 13'] },
        { id: 'py-e3', question: 'If hypotenuse is 10 and one leg is 6, find other leg.', answer: '8', hint: '100 - 36 = 64. √64 = 8.', solutionSteps: ['leg = 8'] },
      ],
      medium: [
        { id: 'py-m1', question: 'Find hypotenuse c if legs are 9 and 12.', answer: '15', hint: '81 + 144 = 225. √225 = 15.', solutionSteps: ['c = 15'] },
        { id: 'py-m2', question: 'Find leg a if hypotenuse c = 25 and leg b = 24.', answer: '7', hint: '625 - 576 = 49. √49 = 7.', solutionSteps: ['a = 7'] },
        { id: 'py-m3', question: 'Is a triangle with sides 8, 15, 17 a right triangle? (yes or no)', answer: 'yes', hint: '64 + 225 = 289 = 17^2.', solutionSteps: ['Yes, 64 + 225 = 289'] },
      ],
      challenge: [
        { id: 'py-c1', question: 'Find diagonal of a rectangle with length 16 and width 12.', answer: '20', hint: '16^2 + 12^2 = 256 + 144 = 400. √400 = 20.', solutionSteps: ['d = 20'] },
        { id: 'py-c2', question: 'An equilateral triangle has side length 10. Find its altitude (exact: 5*sqrt(3), approx 8.66). What is altitude squared?', answer: '75', hint: 'h^2 + 5^2 = 10^2 => h^2 + 25 = 100 => h^2 = 75.', solutionSteps: ['h^2 = 75'] },
      ],
    },
  },

  quadrilaterals: {
    id: 'quadrilaterals',
    title: 'Quadrilaterals',
    category: 'Geometry',
    subTopics: ['Parallelogram, Rectangle, Rhombus, Square', 'Trapezoid / Trapezium & Kite', 'Properties of Diagonals', 'Interior Angle Sum (360°)'],
    whatIsIt: {
      definition: 'A quadrilateral is a 4-sided polygon with four vertices and four angles.',
      terms: ['Parallelogram: opposite sides parallel and equal', 'Rectangle: parallelogram with four 90° angles', 'Rhombus: parallelogram with 4 equal sides and perpendicular diagonals', 'Square: regular quadrilateral (all sides equal, all angles 90°)', 'Trapezoid: exactly one pair of parallel sides'],
      formulaOrRule: 'Interior angle sum: A + B + C + D = 360°. Area of parallelogram = base * height. Area of trapezoid = ((a + b) / 2) * h.',
      whyUsed: 'Underlies architectural floorplans, structural framing, screen aspect ratios, and computer monitors.',
    },
    example1: {
      problem: 'Three angles of a quadrilateral are 85°, 95°, and 110°. Find the fourth angle.',
      steps: [
        { action: 'Recall sum of interior angles of quadrilateral is 360°.', math: '85° + 95° + 110° + x = 360°' },
        { action: 'Sum known angles.', math: '290° + x = 360°' },
        { action: 'Subtract from 360°.', math: 'x = 360° - 290° = 70°' },
      ],
      finalAnswer: '70°',
    },
    example2: {
      problem: 'Find the area of a trapezoid with parallel bases 14 cm and 8 cm, and vertical height 6 cm.',
      steps: [
        { action: 'Apply trapezoid area formula: A = ((a + b) / 2) * h.', math: 'A = ((14 + 8) / 2) * 6' },
        { action: 'Compute average of bases and multiply by height.', math: 'A = (22 / 2) * 6 = 11 * 6 = 66' },
      ],
      finalAnswer: '66 cm²',
    },
    keyRules: [
      'Opposite angles of a parallelogram are equal; consecutive angles are supplementary (sum to 180°).',
      'The diagonals of a rhombus bisect each other at right angles (90°).',
      'The diagonals of a rectangle are equal in length.',
    ],
    commonMistakes: [
      { mistake: 'Assuming all parallelograms have equal diagonals.', correct: 'Only rectangles and squares have equal length diagonals.' },
    ],
    practice: {
      easy: [
        { id: 'qd-e1', question: 'What is the sum of angles in any quadrilateral?', answer: '360', hint: '(4 - 2) * 180° = 360°.', solutionSteps: ['360°'] },
        { id: 'qd-e2', question: 'In a parallelogram, if one angle is 70°, what is opposite angle?', answer: '70', hint: 'Opposite angles are equal.', solutionSteps: ['70°'] },
        { id: 'qd-e3', question: 'Do diagonals of a rhombus cross at 90 degrees? (yes or no)', answer: 'yes', hint: 'Perpendicular bisectors.', solutionSteps: ['Yes'] },
      ],
      medium: [
        { id: 'qd-m1', question: 'In a parallelogram, if one angle is 65°, find consecutive angle.', answer: '115', hint: 'Consecutive angles sum to 180°: 180 - 65 = 115°.', solutionSteps: ['115°'] },
        { id: 'qd-m2', question: 'Find area of a parallelogram with base 12 and height 7.', answer: '84', hint: 'Area = b * h = 12 * 7 = 84.', solutionSteps: ['84'] },
        { id: 'qd-m3', question: 'Find area of a kite with diagonals 10 and 16.', answer: '80', hint: 'Area = (d1 * d2) / 2 = (10 * 16) / 2 = 80.', solutionSteps: ['80'] },
      ],
      challenge: [
        { id: 'qd-c1', question: 'Trapezoid has bases 10 and 18, area 84. Find height.', answer: '6', hint: '84 = ((10 + 18)/2) * h => 84 = 14h => h = 6.', solutionSteps: ['h = 6'] },
        { id: 'qd-c2', question: 'Rhombus has perimeter 52 and one diagonal 24. Find area.', answer: '120', hint: 'Side = 13. Half diagonal = 12. Other half = √(13^2 - 12^2) = 5. Other diagonal = 10. Area = (24 * 10)/2 = 120.', solutionSteps: ['Area = 120'] },
      ],
    },
  },

  circles: {
    id: 'circles',
    title: 'Circles',
    category: 'Geometry',
    subTopics: ['Radius, Diameter & Circumference', 'Area of Circle (πr²)', 'Arcs, Chords, and Sectors', 'Central & Inscribed Angles'],
    whatIsIt: {
      definition: 'A circle is the locus of all points in a plane equidistant from a fixed center point.',
      terms: ['Radius (r)', 'Diameter: d = 2r', 'Circumference: perimeter of circle', 'Chord: segment joining two boundary points', 'Arc: portion of boundary', 'Sector: slice of pie bounded by 2 radii'],
      formulaOrRule: 'Circumference: C = 2πr = πd. Area: A = πr^2. Arc length = (θ/360°) * 2πr. Sector area = (θ/360°) * πr^2.',
      whyUsed: 'Designs wheels, pulleys, astronomical orbits, radar sweeps, and circular pipelines.',
    },
    example1: {
      problem: 'Find the circumference and area of a circle with radius r = 7 cm (use π = 22/7).',
      steps: [
        { action: 'Compute circumference: C = 2 * π * r.', math: 'C = 2 * (22/7) * 7 = 44 cm' },
        { action: 'Compute area: A = π * r^2.', math: 'A = (22/7) * 7^2 = (22/7) * 49 = 22 * 7 = 154 cm²' },
      ],
      finalAnswer: 'Circumference = 44 cm, Area = 154 cm²',
    },
    example2: {
      problem: 'Find the area of a 90° sector of a circle with radius 12 cm (use π = 3.14).',
      steps: [
        { action: 'Find fraction of the circle.', math: 'Fraction = 90° / 360° = 1/4' },
        { action: 'Multiply fraction by total circle area.', math: 'Area = (1/4) * π * 12^2 = (1/4) * π * 144 = 36 * 3.14 = 113.04 cm²' },
      ],
      finalAnswer: '113.04 cm²',
    },
    keyRules: [
      'Diameter is always double the radius: d = 2r.',
      'An inscribed angle is always half the central angle subtending the same arc.',
      'The angle inscribed in a semicircle is always a right angle (90°).',
    ],
    commonMistakes: [
      { mistake: 'Squaring diameter instead of radius in area formula: A = πd^2.', correct: 'Must divide diameter by 2 first: A = π(d/2)^2 = (π/4)d^2.' },
    ],
    practice: {
      easy: [
        { id: 'ci-e1', question: 'If radius of a circle is 5, what is its diameter?', answer: '10', hint: 'd = 2r = 10.', solutionSteps: ['10'] },
        { id: 'ci-e2', question: 'Find circumference of circle with radius 7 (use π = 22/7).', answer: '44', hint: '2 * 22/7 * 7 = 44.', solutionSteps: ['44'] },
        { id: 'ci-e3', question: 'Find area of circle with radius 7 (use π = 22/7).', answer: '154', hint: '22/7 * 49 = 154.', solutionSteps: ['154'] },
      ],
      medium: [
        { id: 'ci-m1', question: 'Circumference is 88 cm. Find radius (use π = 22/7).', answer: '14', hint: '2 * (22/7) * r = 88 => 44/7 * r = 88 => r = 14.', solutionSteps: ['r = 14'] },
        { id: 'ci-m2', question: 'Find area of circle with diameter 20 (use π = 3.14).', answer: '314', hint: 'r = 10. A = 3.14 * 100 = 314.', solutionSteps: ['314'] },
        { id: 'ci-m3', question: 'Find perimeter of a semicircle with radius 7 including diameter base (use π = 22/7).', answer: '36', hint: 'Arc = πr = 22. Base = 2r = 14. 22 + 14 = 36.', solutionSteps: ['36'] },
      ],
      challenge: [
        { id: 'ci-c1', question: 'If area of a circle is 616 cm², find its diameter (use π = 22/7).', answer: '28', hint: '22/7 * r^2 = 616 => r^2 = 196 => r = 14 => d = 28.', solutionSteps: ['d = 28'] },
        { id: 'ci-c2', question: 'A sector of 60° has radius 6. What is its arc length (in terms of π)?', answer: '2*pi', hint: '(60/360) * 2π(6) = (1/6) * 12π = 2π.', solutionSteps: ['2π'] },
      ],
    },
  },

  perimeter: {
    id: 'perimeter',
    title: 'Perimeter',
    category: 'Geometry',
    subTopics: ['Definition & Linear Units', 'Perimeter of Polygons', 'Rectangle P = 2(l + w)', 'Compound Shapes & Fencing Problems'],
    whatIsIt: {
      definition: 'Perimeter is the total continuous distance around the outer boundary of a two-dimensional closed geometric shape.',
      terms: ['Perimeter: boundary length', 'Circumference (circle perimeter)', 'Linear units (cm, m, ft, inches)'],
      formulaOrRule: 'Rectangle: P = 2(l + w). Square: P = 4s. Regular n-gon: P = n * s. Circle: C = 2πr.',
      whyUsed: 'Calculates fencing material, baseboard trims, running tracks, and framing perimeters.',
    },
    example1: {
      problem: 'Find the perimeter of a rectangular garden with length 18 m and width 7 m.',
      steps: [
        { action: 'Apply rectangle perimeter formula.', math: 'P = 2 * (length + width)' },
        { action: 'Substitute values.', math: 'P = 2 * (18 + 7) = 2 * 25 = 50 m' },
      ],
      finalAnswer: '50 meters',
    },
    example2: {
      problem: 'A square has a perimeter of 48 cm. Find the length of one side.',
      steps: [
        { action: 'Recall P = 4 * side.', math: '4s = 48' },
        { action: 'Divide by 4.', math: 's = 48 / 4 = 12 cm' },
      ],
      finalAnswer: '12 cm',
    },
    keyRules: [
      'Perimeter is a one-dimensional linear measure (units are m or cm, NEVER square units like m²).',
      'For composite shapes, add ONLY the exposed outer boundary edges (do not include internal dividing lines).',
    ],
    commonMistakes: [
      { mistake: 'Reporting perimeter in square units (e.g. 50 m²).', correct: 'Perimeter is linear (50 m); Area is square (m²).' },
    ],
    practice: {
      easy: [
        { id: 'pe-e1', question: 'Find perimeter of rectangle with length 10 and width 6.', answer: '32', hint: '2(10 + 6) = 32.', solutionSteps: ['32'] },
        { id: 'pe-e2', question: 'Find perimeter of a square with side 9.', answer: '36', hint: '4 * 9 = 36.', solutionSteps: ['36'] },
        { id: 'pe-e3', question: 'Find perimeter of triangle with sides 6, 8, 10.', answer: '24', hint: '6 + 8 + 10 = 24.', solutionSteps: ['24'] },
      ],
      medium: [
        { id: 'pe-m1', question: 'A rectangular field has length 25 m and width 15 m. If fencing costs $4/m, find total cost.', answer: '320', hint: 'Perimeter = 2(25 + 15) = 80 m. Cost = 80 * 4 = $320.', solutionSteps: ['$320'] },
        { id: 'pe-m2', question: 'A regular hexagon has perimeter 54 cm. What is length of each side?', answer: '9', hint: '54 / 6 = 9.', solutionSteps: ['9 cm'] },
        { id: 'pe-m3', question: 'Perimeter of rectangle is 60 cm. If length is 20 cm, find width.', answer: '10', hint: '2(20 + w) = 60 => 20 + w = 30 => w = 10.', solutionSteps: ['10 cm'] },
      ],
      challenge: [
        { id: 'pe-c1', question: 'A wire in the shape of a rectangle of length 18 cm and width 14 cm is rebent into a square. What is side of the square?', answer: '16', hint: 'Perimeter = 2(18 + 14) = 64 cm. Side of square = 64 / 4 = 16 cm.', solutionSteps: ['16 cm'] },
        { id: 'pe-c2', question: 'Find perimeter of a track made of a rectangle 100m x 40m with two semicircular ends on the 40m sides (use π = 3.14).', answer: '325.6', hint: 'Two straight sides = 2 * 100 = 200. Two semicircles = full circle with d = 40 => C = 3.14 * 40 = 125.6. Total = 200 + 125.6 = 325.6 m.', solutionSteps: ['325.6 m'] },
      ],
    },
  },

  area: {
    id: 'area',
    title: 'Area',
    category: 'Geometry',
    subTopics: ['Concept of Square Units', 'Area of Triangles & Quadrilaterals', 'Composite Area', 'Shaded Region Problems'],
    whatIsIt: {
      definition: 'Area is the measure of two-dimensional surface space contained within a closed boundary, expressed in square units.',
      terms: ['Square units (cm², m², acres)', 'Base and perpendicular height', 'Composite figure'],
      formulaOrRule: 'Rectangle: A = l * w. Triangle: A = (1/2) * b * h. Parallelogram: A = b * h. Trapezoid: A = ((a + b) / 2) * h. Circle: A = πr^2.',
      whyUsed: 'Essential for flooring carpets, painting walls, agricultural farmland surveying, and fabric cutting.',
    },
    example1: {
      problem: 'Find the area of a triangle with base 14 cm and perpendicular height 9 cm.',
      steps: [
        { action: 'Apply triangle area formula: A = (1/2) * base * height.', math: 'A = (1/2) * 14 * 9' },
        { action: 'Multiply.', math: 'A = 7 * 9 = 63 cm²' },
      ],
      finalAnswer: '63 cm²',
    },
    example2: {
      problem: 'Find the area of a shaded region between a rectangle 10m x 8m and an inner pool 6m x 4m.',
      steps: [
        { action: 'Find total area of outer rectangle.', math: 'A_outer = 10 * 8 = 80 m²' },
        { action: 'Find area of inner pool.', math: 'A_inner = 6 * 4 = 24 m²' },
        { action: 'Subtract inner area from outer area.', math: 'A_shaded = 80 - 24 = 56 m²' },
      ],
      finalAnswer: '56 m²',
    },
    keyRules: [
      'In triangles and parallelograms, height must be PERPENDICULAR to the base (never use slanted side length as height).',
      'Area is always measured in square units (m², cm²).',
      'For composite figures: split into simple non-overlapping rectangles/triangles and sum their areas.',
    ],
    commonMistakes: [
      { mistake: 'Forgetting the 1/2 in triangle area: calculating b * h.', correct: 'A triangle is half of a parallelogram: A = (1/2)bh.' },
    ],
    practice: {
      easy: [
        { id: 'ar-e1', question: 'Find area of a rectangle with length 8 and width 5.', answer: '40', hint: '8 * 5 = 40.', solutionSteps: ['40'] },
        { id: 'ar-e2', question: 'Find area of a triangle with base 10 and height 6.', answer: '30', hint: '0.5 * 10 * 6 = 30.', solutionSteps: ['30'] },
        { id: 'ar-e3', question: 'Find area of a square with side 7.', answer: '49', hint: '7^2 = 49.', solutionSteps: ['49'] },
      ],
      medium: [
        { id: 'ar-m1', question: 'Find area of a parallelogram with base 15 cm and height 8 cm.', answer: '120', hint: 'b * h = 15 * 8 = 120.', solutionSteps: ['120'] },
        { id: 'ar-m2', question: 'Trapezoid has bases 6 and 10, height 5. Find area.', answer: '40', hint: '((6 + 10)/2) * 5 = 8 * 5 = 40.', solutionSteps: ['40'] },
        { id: 'ar-m3', question: 'A square has perimeter 36 cm. Find its area.', answer: '81', hint: 'Side = 36 / 4 = 9 cm. Area = 9^2 = 81 cm².', solutionSteps: ['81'] },
      ],
      challenge: [
        { id: 'ar-c1', question: 'Find area of an isosceles triangle with sides 10, 10, and base 12.', answer: '48', hint: 'Half base = 6. Height = √(10^2 - 6^2) = √64 = 8. Area = (1/2)*12*8 = 48.', solutionSteps: ['48'] },
        { id: 'ar-c2', question: 'A circular pizza of radius 14 cm is cut into 8 equal slices. What is the area of 1 slice (use π = 22/7)?', answer: '77', hint: 'Total area = (22/7)*14*14 = 616. 616 / 8 = 77 cm².', solutionSteps: ['77 cm²'] },
      ],
    },
  },

  'surface-area': {
    id: 'surface-area',
    title: 'Surface Area',
    category: 'Geometry',
    subTopics: ['Total vs Lateral Surface Area', 'Cube & Rectangular Prism', 'Right Circular Cylinder', 'Sphere & Cone'],
    whatIsIt: {
      definition: 'Surface area is the total area of all outer faces and curved surfaces that enclose a three-dimensional solid object.',
      terms: ['Total Surface Area (TSA)', 'Lateral / Curved Surface Area (CSA)', 'Net of a 3D solid'],
      formulaOrRule: 'Cube: TSA = 6s^2. Rectangular prism: TSA = 2(lw + lh + wh). Cylinder: TSA = 2πrh + 2πr^2 (CSA = 2πrh). Sphere: TSA = 4πr^2.',
      whyUsed: 'Calculates sheet metal packaging, thermal heat dissipation, paint needed for tanks, and gift wrap.',
    },
    example1: {
      problem: 'Find the total surface area of a rectangular box with length 8 cm, width 5 cm, and height 4 cm.',
      steps: [
        { action: 'Apply prism surface area formula: TSA = 2(lw + lh + wh).', math: 'TSA = 2 * (8*5 + 8*4 + 5*4)' },
        { action: 'Evaluate products inside parentheses.', math: 'TSA = 2 * (40 + 32 + 20) = 2 * 92' },
        { action: 'Multiply by 2.', math: 'TSA = 184 cm²' },
      ],
      finalAnswer: '184 cm²',
    },
    example2: {
      problem: 'Find the total surface area of a closed cylinder with radius 7 cm and height 10 cm (use π = 22/7).',
      steps: [
        { action: 'Curved Surface Area = 2πrh.', math: 'CSA = 2 * (22/7) * 7 * 10 = 440 cm²' },
        { action: 'Two circular ends = 2 * πr^2.', math: '2 * (22/7) * 49 = 308 cm²' },
        { action: 'Total Surface Area = CSA + 2 * Base Area.', math: 'TSA = 440 + 308 = 748 cm²' },
      ],
      finalAnswer: '748 cm²',
    },
    keyRules: [
      'Lateral surface area excludes top and bottom bases; Total surface area includes all faces.',
      'Surface area is always measured in square units (cm², m²).',
    ],
    commonMistakes: [
      { mistake: 'Forgetting one or both circular bases in a cylinder problem.', correct: 'A closed cylinder has two bases (+2πr²); an open pipe has none.' },
    ],
    practice: {
      easy: [
        { id: 'sa-e1', question: 'Find total surface area of a cube with side 4 cm.', answer: '96', hint: '6 * s^2 = 6 * 16 = 96.', solutionSteps: ['96 cm²'] },
        { id: 'sa-e2', question: 'Find surface area of a sphere with radius 7 (use π = 22/7, TSA = 4πr^2).', answer: '616', hint: '4 * (22/7) * 49 = 616.', solutionSteps: ['616 cm²'] },
        { id: 'sa-e3', question: 'How many faces does a rectangular prism have?', answer: '6', hint: 'Top, bottom, front, back, left, right = 6.', solutionSteps: ['6'] },
      ],
      medium: [
        { id: 'sa-m1', question: 'Curved surface area of cylinder with r = 7, h = 5 (use π = 22/7).', answer: '220', hint: '2 * (22/7) * 7 * 5 = 220.', solutionSteps: ['220'] },
        { id: 'sa-m2', question: 'Find TSA of a box with length 10, width 4, height 3.', answer: '164', hint: '2(40 + 30 + 12) = 2 * 82 = 164.', solutionSteps: ['164'] },
        { id: 'sa-m3', question: 'If surface area of a cube is 150 cm², find length of its edge.', answer: '5', hint: '6s^2 = 150 => s^2 = 25 => s = 5.', solutionSteps: ['5 cm'] },
      ],
      challenge: [
        { id: 'sa-c1', question: 'Find TSA of a cone with radius 3 and slant height 5 (TSA = πr(r + l), use π = 3.14).', answer: '75.36', hint: '3.14 * 3 * (3 + 5) = 9.42 * 8 = 75.36.', solutionSteps: ['75.36'] },
        { id: 'sa-c2', question: 'If radius of a sphere is doubled, by what factor does its surface area multiply?', answer: '4', hint: 'Area scales as r^2: (2r)^2 = 4r^2.', solutionSteps: ['Factor of 4'] },
      ],
    },
  },

  volume: {
    id: 'volume',
    title: 'Volume',
    category: 'Geometry',
    subTopics: ['Concept of Cubic Units', 'Prisms & Cubes (V = Base Area * h)', 'Cylinders & Cones', 'Spheres & Displacement'],
    whatIsIt: {
      definition: 'Volume is the measure of the three-dimensional space enclosed within a solid object or the capacity a container holds.',
      terms: ['Cubic units (cm³, m³, liters)', 'Capacity (1 L = 1000 cm³)', 'Cross-sectional area'],
      formulaOrRule: 'Cube: V = s^3. Rectangular Prism: V = l * w * h. Cylinder: V = πr^2 h. Cone: V = (1/3)πr^2 h. Sphere: V = (4/3)πr^3.',
      whyUsed: 'Calculates water tank storage capacity, fuel requirements, cargo container packing, and material weights in casting.',
    },
    example1: {
      problem: 'Find the volume of a rectangular swimming pool of length 20 m, width 10 m, and depth 2 m.',
      steps: [
        { action: 'Apply prism volume formula: V = l * w * h.', math: 'V = 20 * 10 * 2' },
        { action: 'Compute product.', math: 'V = 400 m³' },
      ],
      finalAnswer: '400 m³',
    },
    example2: {
      problem: 'Find the volume of a cylinder with radius 7 cm and height 10 cm (use π = 22/7).',
      steps: [
        { action: 'Apply cylinder volume formula: V = π * r^2 * h.', math: 'V = (22/7) * 7^2 * 10' },
        { action: 'Compute.', math: 'V = (22/7) * 49 * 10 = 22 * 7 * 10 = 1540 cm³' },
      ],
      finalAnswer: '1540 cm³',
    },
    keyRules: [
      'Volume is always measured in cubic units (cm³, m³).',
      'A cone has exactly 1/3 the volume of a cylinder with identical base radius and height: V_cone = (1/3)V_cylinder.',
      '1 liter = 1,000 cm³; 1 m³ = 1,000 liters.',
    ],
    commonMistakes: [
      { mistake: 'Mixing up radius and diameter in cubic volume calculations.', correct: 'Ensure radius r = d/2 is used when applying volume formulas.' },
    ],
    practice: {
      easy: [
        { id: 'vo-e1', question: 'Find volume of a cube with side 3 cm.', answer: '27', hint: '3^3 = 27.', solutionSteps: ['27 cm³'] },
        { id: 'vo-e2', question: 'Find volume of a box 5 cm by 4 cm by 3 cm.', answer: '60', hint: '5 * 4 * 3 = 60.', solutionSteps: ['60 cm³'] },
        { id: 'vo-e3', question: 'How many cm³ are in 1 liter?', answer: '1000', hint: '1 L = 1000 cm³.', solutionSteps: ['1000'] },
      ],
      medium: [
        { id: 'vo-m1', question: 'Find volume of cylinder with radius 7 and height 5 (use π = 22/7).', answer: '770', hint: '(22/7) * 49 * 5 = 154 * 5 = 770.', solutionSteps: ['770 cm³'] },
        { id: 'vo-m2', question: 'Find volume of cone with radius 7 and height 6 (use π = 22/7).', answer: '308', hint: '(1/3) * (22/7) * 49 * 6 = (1/3) * 154 * 6 = 308.', solutionSteps: ['308 cm³'] },
        { id: 'vo-m3', question: 'If volume of a cube is 64 cm³, find its edge length.', answer: '4', hint: 's^3 = 64 => s = 4.', solutionSteps: ['4 cm'] },
      ],
      challenge: [
        { id: 'vo-c1', question: 'Find volume of a sphere of radius 3 (use π = 3.14, V = (4/3)πr^3).', answer: '113.04', hint: '(4/3) * 3.14 * 27 = 4 * 3.14 * 9 = 113.04.', solutionSteps: ['113.04'] },
        { id: 'vo-c2', question: 'If all dimensions of a box are doubled, by what factor does its volume increase?', answer: '8', hint: 'Volume scales as scale factor cubed: 2^3 = 8.', solutionSteps: ['Factor of 8'] },
      ],
    },
  },
};
