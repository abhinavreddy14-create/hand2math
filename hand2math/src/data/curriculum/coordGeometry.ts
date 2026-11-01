import { TopicContent } from '../mathCurriculum';

export const COORD_GEOMETRY_TOPICS: Record<string, TopicContent> = {
  'coordinate-plane': {
    id: 'coordinate-plane',
    title: 'Coordinate Plane',
    category: 'Coordinate Geometry',
    subTopics: ['X-Axis and Y-Axis', 'Origin (0, 0)', 'Four Quadrants (I, II, III, IV)', 'Sign Conventions'],
    whatIsIt: {
      definition: 'The coordinate plane is a two-dimensional number line system formed by the perpendicular intersection of horizontal (x) and vertical (y) axes at the origin (0, 0).',
      terms: ['Origin (0,0)', 'X-axis (abscissa axis)', 'Y-axis (ordinate axis)', 'Quadrant I (+, +)', 'Quadrant II (-, +)', 'Quadrant III (-, -)', 'Quadrant IV (+, -)'],
      formulaOrRule: 'Point notation: (x, y) where x is horizontal displacement from y-axis and y is vertical displacement from x-axis.',
      whyUsed: 'Provides the visual and algebraic bridge connecting algebraic formulas to geometric curves and shapes.',
    },
    example1: {
      problem: 'Determine which quadrant the points A(3, 5), B(-4, 2), and C(-3, -6) lie in.',
      steps: [
        { action: 'Point A(3, 5): x > 0 and y > 0.', math: 'Both positive => Quadrant I' },
        { action: 'Point B(-4, 2): x < 0 and y > 0.', math: 'x negative, y positive => Quadrant II' },
        { action: 'Point C(-3, -6): x < 0 and y < 0.', math: 'Both negative => Quadrant III' },
      ],
      finalAnswer: 'A in Quad I, B in Quad II, C in Quad III',
    },
    example2: {
      problem: 'On which axis does the point P(0, -7) lie?',
      steps: [
        { action: 'Check x-coordinate value.', math: 'x = 0' },
        { action: 'Any point with x = 0 lies on the y-axis.', math: 'P(0, -7) lies on the negative y-axis' },
      ],
      finalAnswer: 'y-axis',
    },
    keyRules: [
      'Points on the x-axis always have y = 0: (x, 0).',
      'Points on the y-axis always have x = 0: (0, y).',
      'The origin (0, 0) belongs to both axes simultaneously.',
    ],
    commonMistakes: [
      { mistake: 'Reversing coordinates: writing (y, x) instead of (x, y).', correct: 'Always list horizontal x first, then vertical y: (x, y).' },
    ],
    practice: {
      easy: [
        { id: 'cp-e1', question: 'Which quadrant has both x and y coordinates positive (I, II, III, IV)?', answer: 'I', hint: 'Quadrant 1.', solutionSteps: ['Quadrant I'] },
        { id: 'cp-e2', question: 'What are the coordinates of the origin?', answer: '(0,0)', hint: 'Zero horizontal and vertical displacement.', solutionSteps: ['(0, 0)'] },
        { id: 'cp-e3', question: 'In which quadrant does point (4, -5) lie?', answer: 'IV', hint: 'x > 0, y < 0 is Quadrant IV.', solutionSteps: ['Quadrant IV'] },
      ],
      medium: [
        { id: 'cp-m1', question: 'In which quadrant does (-6, -8) lie?', answer: 'III', hint: 'Both coordinates negative.', solutionSteps: ['Quadrant III'] },
        { id: 'cp-m2', question: 'Point (0, 5) lies on which axis (x or y)?', answer: 'y', hint: 'x is 0, so on y-axis.', solutionSteps: ['y-axis'] },
        { id: 'cp-m3', question: 'If point (a, b) is reflected across the x-axis, its new coordinates are (a, -b). What is reflection of (3, 4)?', answer: '(3,-4)', hint: 'y-coordinate changes sign.', solutionSteps: ['(3, -4)'] },
      ],
      challenge: [
        { id: 'cp-c1', question: 'If point (k - 2, 3 - k) lies in Quadrant II, find range of k: k must be less than what integer?', answer: '2', hint: 'k - 2 < 0 => k < 2, and 3 - k > 0 => k < 3. Therefore k < 2.', solutionSteps: ['k < 2'] },
        { id: 'cp-c2', question: 'What is the distance of point (-5, 12) from the origin?', answer: '13', hint: '√( (-5)^2 + 12^2 ) = √(25 + 144) = √169 = 13.', solutionSteps: ['13'] },
      ],
    },
  },

  'cartesian-coordinates': {
    id: 'cartesian-coordinates',
    title: 'Cartesian Coordinates',
    category: 'Coordinate Geometry',
    subTopics: ['Ordered Pairs (x, y)', 'Abscissa and Ordinate', 'Plotting Points', 'Collinear Points'],
    whatIsIt: {
      definition: 'Cartesian coordinates uniquely specify the position of a point in a plane by a pair of numerical coordinates measuring directed distances from perpendicular axes.',
      terms: ['Ordered pair: (x, y)', 'Abscissa: the x-coordinate', 'Ordinate: the y-coordinate', 'Collinear: points lying on the same line'],
      formulaOrRule: 'Ordered pair convention: First number represents horizontal position; second represents vertical position.',
      whyUsed: 'Powers computer screen pixels, GPS longitude/latitude coordinates, CAD modeling, and data scatterplots.',
    },
    example1: {
      problem: 'Identify the abscissa and ordinate of the point P(-8, 15).',
      steps: [
        { action: 'Abscissa is the x-coordinate.', math: 'Abscissa = -8' },
        { action: 'Ordinate is the y-coordinate.', math: 'Ordinate = 15' },
      ],
      finalAnswer: 'Abscissa = -8, Ordinate = 15',
    },
    example2: {
      problem: 'Three vertices of a rectangle are (0, 0), (6, 0), and (0, 4). Find the coordinates of the fourth vertex.',
      steps: [
        { action: 'The bottom horizontal side connects (0, 0) to (6, 0) of length 6.', math: 'Width = 6' },
        { action: 'The left vertical side connects (0, 0) to (0, 4) of height 4.', math: 'Height = 4' },
        { action: 'The fourth vertex must be at (x = 6, y = 4).', math: 'Vertex 4 = (6, 4)' },
      ],
      finalAnswer: '(6, 4)',
    },
    keyRules: [
      'The order matters: (2, 5) is completely different from (5, 2).',
      'The abscissa measures distance from the y-axis; ordinate measures distance from the x-axis.',
      'Three points are collinear if the slope between any two pairs is identical.',
    ],
    commonMistakes: [
      { mistake: 'Confusing abscissa with ordinate.', correct: 'Abscissa = x (alphabetical order: A comes before O, x comes before y).' },
    ],
    practice: {
      easy: [
        { id: 'cc-e1', question: 'What is the abscissa of point (7, -3)?', answer: '7', hint: 'The x-coordinate.', solutionSteps: ['7'] },
        { id: 'cc-e2', question: 'What is the ordinate of point (-4, 9)?', answer: '9', hint: 'The y-coordinate.', solutionSteps: ['9'] },
        { id: 'cc-e3', question: 'Point A is at (3, 2). Moving 4 units left lands at what x-coordinate?', answer: '-1', hint: '3 - 4 = -1.', solutionSteps: ['-1'] },
      ],
      medium: [
        { id: 'cc-m1', question: 'Find area of triangle with vertices at (0, 0), (8, 0), and (0, 6).', answer: '24', hint: 'Base = 8, Height = 6. (1/2)*8*6 = 24.', solutionSteps: ['24'] },
        { id: 'cc-m2', question: 'If points (1, 2), (2, 4), (k, 8) are collinear, find k.', answer: '4', hint: 'Slope = (4-2)/(2-1) = 2. (8-4)/(k-2) = 2 => 4 = 2(k-2) => k = 4.', solutionSteps: ['k = 4'] },
        { id: 'cc-m3', question: 'What is distance between (3, 4) and (3, 9)?', answer: '5', hint: 'Vertical distance: |9 - 4| = 5.', solutionSteps: ['5'] },
      ],
      challenge: [
        { id: 'cc-c1', question: 'Three vertices of a parallelogram are (1, 1), (4, 1), and (5, 4). What is the x-coordinate of the 4th vertex?', answer: '2', hint: 'Opposite side has length 4 - 1 = 3. 5 - 3 = 2. Fourth vertex is (2, 4).', solutionSteps: ['x = 2'] },
        { id: 'cc-c2', question: 'Find area of square with opposite diagonal vertices at (1, 1) and (5, 5).', answer: '16', hint: 'Diagonal squared = (4)^2 + (4)^2 = 32. Area of square = d^2 / 2 = 32 / 2 = 16.', solutionSteps: ['Area = 16'] },
      ],
    },
  },

  'distance-between-points': {
    id: 'distance-between-points',
    title: 'Distance Between Points',
    category: 'Coordinate Geometry',
    subTopics: ['Distance Formula Derivation', 'Application of Pythagorean Theorem', 'Horizontal and Vertical Segments', 'Perimeter in Coordinate Plane'],
    whatIsIt: {
      definition: 'The distance between two points in a Cartesian plane is the Euclidean straight-line length connecting them, derived directly from the Pythagorean theorem.',
      terms: ['Euclidean distance', 'Horizontal leg: Δx = x2 - x1', 'Vertical leg: Δy = y2 - y1', 'Distance formula'],
      formulaOrRule: 'd = √((x2 - x1)^2 + (y2 - y1)^2)',
      whyUsed: 'Used by GPS satellite receivers, game collision detection, flight routing distances, and radius calculation of circles.',
    },
    example1: {
      problem: 'Find the distance between the points A(1, 2) and B(4, 6).',
      steps: [
        { action: 'Identify coordinates: x1 = 1, y1 = 2, x2 = 4, y2 = 6.', math: 'Δx = 4 - 1 = 3\nΔy = 6 - 2 = 4' },
        { action: 'Apply distance formula: d = √(Δx^2 + Δy^2).', math: 'd = √(3^2 + 4^2) = √(9 + 16) = √25' },
        { action: 'Compute square root.', math: 'd = 5' },
      ],
      finalAnswer: '5 units',
    },
    example2: {
      problem: 'Find the distance between P(-2, 3) and Q(6, -3).',
      steps: [
        { action: 'Compute differences.', math: 'x2 - x1 = 6 - (-2) = 8\ny2 - y1 = -3 - 3 = -6' },
        { action: 'Square differences and sum.', math: 'd = √(8^2 + (-6)^2) = √(64 + 36) = √100' },
        { action: 'Take square root.', math: 'd = 10' },
      ],
      finalAnswer: '10 units',
    },
    keyRules: [
      'Distance is always strictly positive (or 0 if points coincide).',
      'The order of subtraction does not matter because (x2 - x1)^2 = (x1 - x2)^2.',
      'If points share same y-coordinate, distance is simply |x2 - x1|.',
    ],
    commonMistakes: [
      { mistake: 'Forgetting to square the differences before adding.', correct: 'Must square both: d = √(Δx² + Δy²).' },
    ],
    practice: {
      easy: [
        { id: 'db-e1', question: 'Find distance between (0, 0) and (3, 4).', answer: '5', hint: '√(9 + 16) = √25 = 5.', solutionSteps: ['5'] },
        { id: 'db-e2', question: 'Find distance between (2, 5) and (8, 5).', answer: '6', hint: 'Same y: |8 - 2| = 6.', solutionSteps: ['6'] },
        { id: 'db-e3', question: 'Find distance between (0, 0) and (6, 8).', answer: '10', hint: '√(36 + 64) = 10.', solutionSteps: ['10'] },
      ],
      medium: [
        { id: 'db-m1', question: 'Find distance between (-1, 2) and (4, 14).', answer: '13', hint: 'Δx = 5, Δy = 12. √(25 + 144) = 13.', solutionSteps: ['13'] },
        { id: 'db-m2', question: 'Find distance between (1, -3) and (7, 5).', answer: '10', hint: 'Δx = 6, Δy = 8. √(36 + 64) = 10.', solutionSteps: ['10'] },
        { id: 'db-m3', question: 'A circle has center (0, 0) and passes through (5, 12). What is radius?', answer: '13', hint: 'Distance from center = √(25 + 144) = 13.', solutionSteps: ['13'] },
      ],
      challenge: [
        { id: 'db-c1', question: 'If distance between (2, 3) and (x, 7) is 5, find positive value of x.', answer: '5', hint: '(x - 2)^2 + (7 - 3)^2 = 25 => (x - 2)^2 + 16 = 25 => (x - 2)^2 = 9 => x - 2 = 3 => x = 5.', solutionSteps: ['x = 5'] },
        { id: 'db-c2', question: 'Perimeter of triangle with vertices (0,0), (6,0), and (0,8).', answer: '24', hint: 'Sides are 6, 8, and hypotenuse √(36+64)=10. Perimeter = 6 + 8 + 10 = 24.', solutionSteps: ['24'] },
      ],
    },
  },

  midpoint: {
    id: 'midpoint',
    title: 'Midpoint',
    category: 'Coordinate Geometry',
    subTopics: ['Midpoint Formula', 'Finding Endpoints from Midpoint', 'Segment Bisectors', 'Center of Circles from Diameters'],
    whatIsIt: {
      definition: 'The midpoint is the unique point situated exactly halfway between two endpoints of a line segment, dividing it into two equal halves.',
      terms: ['Midpoint: average of coordinates', 'Bisector', 'Center of circle: midpoint of diameter'],
      formulaOrRule: 'Midpoint M = ((x1 + x2) / 2, (y1 + y2) / 2)',
      whyUsed: 'Finds centers of mass, bisects geometric frames, calculates geometric medians of triangles, and locates circle centers.',
    },
    example1: {
      problem: 'Find the midpoint M of the segment joining A(2, 8) and B(6, 4).',
      steps: [
        { action: 'Average the x-coordinates.', math: 'x_m = (2 + 6) / 2 = 8 / 2 = 4' },
        { action: 'Average the y-coordinates.', math: 'y_m = (8 + 4) / 2 = 12 / 2 = 6' },
      ],
      finalAnswer: 'M = (4, 6)',
    },
    example2: {
      problem: 'The midpoint of segment AB is M(5, 3). If point A is (2, 7), find coordinates of endpoint B.',
      steps: [
        { action: 'Set up midpoint equation for x.', math: '(2 + x_b) / 2 = 5 => 2 + x_b = 10 => x_b = 8' },
        { action: 'Set up midpoint equation for y.', math: '(7 + y_b) / 2 = 3 => 7 + y_b = 6 => y_b = -1' },
      ],
      finalAnswer: 'B = (8, -1)',
    },
    keyRules: [
      'The midpoint is simply the arithmetic mean (average) of the endpoints coordinates.',
      'To find an endpoint when given midpoint M and endpoint A: B = 2M - A.',
    ],
    commonMistakes: [
      { mistake: 'Subtracting coordinates instead of adding when averaging.', correct: 'Must ADD coordinates: ((x1 + x2)/2, (y1 + y2)/2).' },
    ],
    practice: {
      easy: [
        { id: 'mp-e1', question: 'Find midpoint of (2, 4) and (6, 8).', answer: '(4,6)', hint: 'x = (2+6)/2 = 4, y = (4+8)/2 = 6.', solutionSteps: ['(4, 6)'] },
        { id: 'mp-e2', question: 'Find midpoint of (0, 0) and (10, 20).', answer: '(5,10)', hint: '(0+10)/2, (0+20)/2.', solutionSteps: ['(5, 10)'] },
        { id: 'mp-e3', question: 'What is x-coordinate of midpoint between (-4, 2) and (6, 2)?', answer: '1', hint: '(-4 + 6) / 2 = 2 / 2 = 1.', solutionSteps: ['x = 1'] },
      ],
      medium: [
        { id: 'mp-m1', question: 'Find midpoint of (-3, 7) and (5, -1).', answer: '(1,3)', hint: 'x = (-3+5)/2 = 1, y = (7 - 1)/2 = 3.', solutionSteps: ['(1, 3)'] },
        { id: 'mp-m2', question: 'Midpoint of (x, 4) and (6, 10) is (4, 7). Find x.', answer: '2', hint: '(x + 6)/2 = 4 => x + 6 = 8 => x = 2.', solutionSteps: ['x = 2'] },
        { id: 'mp-m3', question: 'Diameter of a circle has endpoints (-2, 3) and (4, 7). What are coordinates of center?', answer: '(1,5)', hint: 'Center is midpoint: ((-2+4)/2, (3+7)/2) = (1, 5).', solutionSteps: ['(1, 5)'] },
      ],
      challenge: [
        { id: 'mp-c1', question: 'If M(3, 4) is midpoint of AB where A is (7, 1), find endpoint B.', answer: '(-1,7)', hint: 'x_b = 2(3) - 7 = -1. y_b = 2(4) - 1 = 7.', solutionSteps: ['(-1, 7)'] },
        { id: 'mp-c2', question: 'Find centroid of triangle with vertices (2, 4), (6, 8), and (4, 0) (Centroid = ((x1+x2+x3)/3, (y1+y2+y3)/3)).', answer: '(4,4)', hint: 'x = (2+6+4)/3 = 4, y = (4+8+0)/3 = 4.', solutionSteps: ['(4, 4)'] },
      ],
    },
  },

  slope: {
    id: 'slope',
    title: 'Slope',
    category: 'Coordinate Geometry',
    subTopics: ['Definition of Gradient m = Rise / Run', 'Positive, Negative, Zero, and Undefined Slopes', 'Parallel Lines (m1 = m2)', 'Perpendicular Lines (m1 * m2 = -1)'],
    whatIsIt: {
      definition: 'The slope (gradient) of a non-vertical line is the ratio of vertical change (rise) to the corresponding horizontal change (run).',
      terms: ['Slope (m)', 'Rise = Δy = y2 - y1', 'Run = Δx = x2 - x1', 'Zero slope: horizontal line (y = c)', 'Undefined slope: vertical line (x = c)'],
      formulaOrRule: 'm = (y2 - y1) / (x2 - x1). Parallel: m1 = m2. Perpendicular: m1 * m2 = -1 (negative reciprocal: m2 = -1/m1).',
      whyUsed: 'Measures road steepness grades, velocity (slope of position vs time), marginal profit rates, and camera trajectory tracking.',
    },
    example1: {
      problem: 'Find the slope of the line passing through A(2, 3) and B(6, 11).',
      steps: [
        { action: 'Compute vertical rise Δy and horizontal run Δx.', math: 'Δy = 11 - 3 = 8\nΔx = 6 - 2 = 4' },
        { action: 'Divide rise by run: m = Δy / Δx.', math: 'm = 8 / 4 = 2' },
      ],
      finalAnswer: 'm = 2',
    },
    example2: {
      problem: 'Line L1 has slope m1 = 3/4. Find the slope of line L2 perpendicular to L1.',
      steps: [
        { action: 'Recall perpendicular lines have negative reciprocal slopes.', math: 'm2 = -1 / m1' },
        { action: 'Invert 3/4 and change sign.', math: 'm2 = -4/3' },
      ],
      finalAnswer: 'm = -4/3',
    },
    keyRules: [
      'Horizontal lines have slope m = 0 (rise is 0).',
      'Vertical lines have UNDEFINED slope (division by zero: run is 0).',
      'Slopes of perpendicular lines are negative reciprocals: m1 * m2 = -1.',
    ],
    commonMistakes: [
      { mistake: 'Calculating run / rise: (x2 - x1) / (y2 - y1).', correct: 'Slope is always rise over run: Δy / Δx.' },
    ],
    practice: {
      easy: [
        { id: 'sl-e1', question: 'Find slope between (1, 2) and (3, 6).', answer: '2', hint: '(6 - 2) / (3 - 1) = 4 / 2 = 2.', solutionSteps: ['m = 2'] },
        { id: 'sl-e2', question: 'What is the slope of any horizontal line?', answer: '0', hint: 'Rise is 0.', solutionSteps: ['m = 0'] },
        { id: 'sl-e3', question: 'What is the slope of the line y = 4x + 7?', answer: '4', hint: 'Coefficient of x in y = mx + b.', solutionSteps: ['m = 4'] },
      ],
      medium: [
        { id: 'sl-m1', question: 'Find slope between (-2, 5) and (4, -7).', answer: '-2', hint: '(-7 - 5) / (4 - (-2)) = -12 / 6 = -2.', solutionSteps: ['m = -2'] },
        { id: 'sl-m2', question: 'If line A has slope 5, what is slope of a line parallel to it?', answer: '5', hint: 'Parallel lines have equal slopes.', solutionSteps: ['m = 5'] },
        { id: 'sl-m3', question: 'If a line has slope 2, what is slope of a perpendicular line?', answer: '-0.5', hint: 'Negative reciprocal: -1/2 = -0.5.', solutionSteps: ['-0.5'] },
      ],
      challenge: [
        { id: 'sl-c1', question: 'The line through (2, k) and (6, 12) has slope 3. Find k.', answer: '0', hint: '(12 - k) / (6 - 2) = 3 => (12 - k) / 4 = 3 => 12 - k = 12 => k = 0.', solutionSteps: ['k = 0'] },
        { id: 'sl-c2', question: 'Points (2, 3), (4, 7), and (x, 15) lie on the same line. Find x.', answer: '8', hint: 'Slope = (7-3)/(4-2) = 2. (15 - 7)/(x - 4) = 2 => 8/(x - 4) = 2 => x - 4 = 4 => x = 8.', solutionSteps: ['x = 8'] },
      ],
    },
  },

  'equation-straight-line': {
    id: 'equation-straight-line',
    title: 'Equation of a Straight Line',
    category: 'Coordinate Geometry',
    subTopics: ['Slope-Intercept Form y = mx + b', 'Point-Slope Form y - y1 = m(x - x1)', 'Standard Form Ax + By = C', 'Finding X and Y Intercepts'],
    whatIsIt: {
      definition: 'The equation of a straight line defines the linear algebraic relationship satisfied by every point (x, y) lying on that line.',
      terms: ['Slope (m)', 'Y-intercept (b): where line crosses y-axis at (0, b)', 'X-intercept: where y = 0', 'Slope-intercept form: y = mx + b'],
      formulaOrRule: 'Slope-intercept: y = mx + b. Point-slope: y - y1 = m(x - x1). Two-point form: (y - y1) = ((y2 - y1)/(x2 - x1)) * (x - x1).',
      whyUsed: 'Linear regression modeling, business revenue projections, cost/margin analysis, and computer graphics ray marching.',
    },
    example1: {
      problem: 'Find the equation of the line with slope m = 3 passing through the point (2, 5).',
      steps: [
        { action: 'Use point-slope form: y - y1 = m(x - x1).', math: 'y - 5 = 3(x - 2)' },
        { action: 'Expand and rearrange into slope-intercept form y = mx + b.', math: 'y - 5 = 3x - 6\ny = 3x - 1' },
      ],
      finalAnswer: 'y = 3x - 1',
    },
    example2: {
      problem: 'Find the x-intercept and y-intercept of the line 3x + 4y = 24.',
      steps: [
        { action: 'Find x-intercept by setting y = 0.', math: '3x + 4(0) = 24 => 3x = 24 => x = 8 (Point: (8, 0))' },
        { action: 'Find y-intercept by setting x = 0.', math: '3(0) + 4y = 24 => 4y = 24 => y = 6 (Point: (0, 6))' },
      ],
      finalAnswer: 'x-intercept = 8, y-intercept = 6',
    },
    keyRules: [
      'In y = mx + b, m is always the slope and b is the y-intercept.',
      'Vertical lines have equations of the form x = c (slope undefined).',
      'Horizontal lines have equations of the form y = c (slope 0).',
    ],
    commonMistakes: [
      { mistake: 'Identifying b as the x-intercept.', correct: 'b is the Y-intercept where the line crosses x = 0.' },
    ],
    practice: {
      easy: [
        { id: 'es-e1', question: 'What is the y-intercept of y = 2x + 7?', answer: '7', hint: 'The constant term b.', solutionSteps: ['7'] },
        { id: 'es-e2', question: 'What is the slope of y = -3x + 5?', answer: '-3', hint: 'The coefficient of x.', solutionSteps: ['-3'] },
        { id: 'es-e3', question: 'Write equation with slope 4 and y-intercept -2.', answer: 'y = 4x - 2', hint: 'y = mx + b.', solutionSteps: ['y = 4x - 2'] },
      ],
      medium: [
        { id: 'es-m1', question: 'Find y-intercept of 2x + 5y = 20.', answer: '4', hint: 'Set x = 0: 5y = 20 => y = 4.', solutionSteps: ['4'] },
        { id: 'es-m2', question: 'Find x-intercept of 4x - 3y = 24.', answer: '6', hint: 'Set y = 0: 4x = 24 => x = 6.', solutionSteps: ['6'] },
        { id: 'es-m3', question: 'Find slope of the line 3x + 2y = 12.', answer: '-1.5', hint: '2y = -3x + 12 => y = -1.5x + 6.', solutionSteps: ['-1.5'] },
      ],
      challenge: [
        { id: 'es-c1', question: 'Find equation of line passing through (1, 3) and (3, 7). What is the y-intercept b?', answer: '1', hint: 'm = (7-3)/(3-1) = 2. y - 3 = 2(x - 1) => y = 2x + 1. b = 1.', solutionSteps: ['b = 1'] },
        { id: 'es-c2', question: 'Find equation of line perpendicular to y = 2x + 3 passing through (4, 5). What is y-intercept b?', answer: '7', hint: 'Perpendicular slope = -1/2 = -0.5. y - 5 = -0.5(x - 4) => y - 5 = -0.5x + 2 => y = -0.5x + 7. b = 7.', solutionSteps: ['b = 7'] },
      ],
    },
  },
};
