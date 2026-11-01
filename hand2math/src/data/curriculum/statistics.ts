import { TopicContent } from '../mathCurriculum';

export const STATISTICS_TOPICS: Record<string, TopicContent> = {
  'data-variables': {
    id: 'data-variables',
    title: 'Data and Variables',
    category: 'Statistics and Probability',
    subTopics: ['Qualitative (Categorical) Data', 'Quantitative (Numerical) Data', 'Discrete vs Continuous Variables', 'Frequency Distributions'],
    whatIsIt: {
      definition: 'Data consists of individual facts, statistics, or items of information collected through observation, measurement, or surveying.',
      terms: ['Quantitative: numerical counts or measurements', 'Qualitative: non-numerical categories (colors, blood types)', 'Discrete: countable integers (students, cars)', 'Continuous: measurable on a continuous scale (height, weight, time)'],
      formulaOrRule: 'Relative Frequency = Frequency of Class / Total Observations.',
      whyUsed: 'Provides the foundation for empirical research, public health tracking, machine learning features, and census surveys.',
    },
    example1: {
      problem: 'Classify the following variables as discrete or continuous: 1) Number of pets in a household, 2) Time taken to run a marathon.',
      steps: [
        { action: 'Evaluate number of pets: counted in whole numbers (0, 1, 2...).', math: 'Countable integer => Discrete variable' },
        { action: 'Evaluate marathon time: can take any value on an unbroken continuum (e.g. 3.4215 hours).', math: 'Measurable continuum => Continuous variable' },
      ],
      finalAnswer: '1) Discrete, 2) Continuous',
    },
    example2: {
      problem: 'In a class of 40 students, 12 chose basketball. What is the relative frequency of basketball players?',
      steps: [
        { action: 'Apply formula: Relative Frequency = Count / Total.', math: 'RF = 12 / 40' },
        { action: 'Simplify fraction or convert to decimal.', math: '12 / 40 = 3 / 10 = 0.30 (30%)' },
      ],
      finalAnswer: '0.30 (or 30%)',
    },
    keyRules: [
      'If you can count it, it is discrete; if you measure it with an instrument, it is continuous.',
      'The sum of all relative frequencies across all categories must equal exactly 1.0 (or 100%).',
    ],
    commonMistakes: [
      { mistake: 'Classifying shoe size as continuous.', correct: 'Standard shoe sizes are discrete (e.g. 8, 8.5, 9); foot length is continuous.' },
    ],
    practice: {
      easy: [
        { id: 'dv-e1', question: 'Is number of siblings discrete or continuous?', answer: 'discrete', hint: 'Counted in whole numbers.', solutionSteps: ['Discrete'] },
        { id: 'dv-e2', question: 'Is body temperature discrete or continuous?', answer: 'continuous', hint: 'Measured on continuous scale.', solutionSteps: ['Continuous'] },
        { id: 'dv-e3', question: 'In survey of 50 people, 25 voted Yes. What is relative frequency as a decimal?', answer: '0.5', hint: '25 / 50 = 0.5.', solutionSteps: ['0.5'] },
      ],
      medium: [
        { id: 'dv-m1', question: 'Is weight of an apple discrete or continuous?', answer: 'continuous', hint: 'Can take any decimal gram value.', solutionSteps: ['Continuous'] },
        { id: 'dv-m2', question: 'In a survey of 200 people, 60 chose Red. What is percentage frequency?', answer: '30', hint: '(60 / 200) * 100% = 30%.', solutionSteps: ['30%'] },
        { id: 'dv-m3', question: 'Is car license plate number quantitative or categorical?', answer: 'categorical', hint: 'Acts as label, not numerical measurement.', solutionSteps: ['Categorical'] },
      ],
      challenge: [
        { id: 'dv-c1', question: 'A dataset has relative frequencies 0.25, 0.40, and x for 3 exclusive categories. What is x?', answer: '0.35', hint: 'Sum = 1.0 => 1 - (0.25 + 0.40) = 1 - 0.65 = 0.35.', solutionSteps: ['0.35'] },
        { id: 'dv-c2', question: 'In a sample of 250 vehicles, 40% are electric. How many vehicles are electric?', answer: '100', hint: '0.40 * 250 = 100.', solutionSteps: ['100'] },
      ],
    },
  },

  mean: {
    id: 'mean',
    title: 'Mean',
    category: 'Statistics and Probability',
    subTopics: ['Calculation of Arithmetic Mean', 'Summing Large Datasets', 'Effect of Outliers', 'Combined / Weighted Mean'],
    whatIsIt: {
      definition: 'The mean is the statistical average calculated by summing all observations and dividing by the total number of observations.',
      terms: ['Arithmetic Mean: x̄ = Σx / n', 'Sigma notation (Σ: sum of)', 'Outlier: extreme anomalous value that pulls the mean'],
      formulaOrRule: 'x̄ = (x1 + x2 + ... + xn) / n. Sum of all values = n * x̄. Weighted mean = Σ(w * x) / Σw.',
      whyUsed: 'Standard benchmark in economic GPA scores, average household income, clinical trial efficacy, and climate temperature records.',
    },
    example1: {
      problem: 'Find the mean of the dataset: 8, 12, 15, 17, 28',
      steps: [
        { action: 'Sum all values.', math: '8 + 12 + 15 + 17 + 28 = 80' },
        { action: 'Divide by the number of values (n = 5).', math: 'Mean = 80 / 5 = 16' },
      ],
      finalAnswer: 'Mean = 16',
    },
    example2: {
      problem: 'The mean of 5 numbers is 18. If one number 30 is removed, find the new mean.',
      steps: [
        { action: 'Find original sum of all 5 numbers.', math: 'Sum_5 = 5 * 18 = 90' },
        { action: 'Subtract the removed number 30.', math: 'Sum_4 = 90 - 30 = 60' },
        { action: 'Divide by remaining count (n = 4).', math: 'New mean = 60 / 4 = 15' },
      ],
      finalAnswer: 'New mean = 15',
    },
    keyRules: [
      'The mean is sensitive to extreme values (outliers); a single billionaire in a town drastically skews the mean income upward.',
      'The sum of deviations of each value from the mean is always zero: Σ(x - x̄) = 0.',
    ],
    commonMistakes: [
      { mistake: 'Dividing by n - 1 when calculating simple arithmetic mean.', correct: 'Always divide by the full sample size n.' },
    ],
    practice: {
      easy: [
        { id: 'me-e1', question: 'Find mean of 4, 8, 12.', answer: '8', hint: '24 / 3 = 8.', solutionSteps: ['8'] },
        { id: 'me-e2', question: 'Find mean of 10, 20, 30, 40.', answer: '25', hint: '100 / 4 = 25.', solutionSteps: ['25'] },
        { id: 'me-e3', question: 'If 4 values sum to 36, what is their mean?', answer: '9', hint: '36 / 4 = 9.', solutionSteps: ['9'] },
      ],
      medium: [
        { id: 'me-m1', question: 'Find mean of 14, 18, 22, 26, 30.', answer: '22', hint: 'Symmetric sequence: middle value = 22.', solutionSteps: ['22'] },
        { id: 'me-m2', question: 'Mean of 6 numbers is 12. What is their sum?', answer: '72', hint: '6 * 12 = 72.', solutionSteps: ['72'] },
        { id: 'me-m3', question: 'Mean of 4 numbers is 15. If three numbers are 10, 12, 18, find the 4th number.', answer: '20', hint: 'Sum = 60. Current = 40. 60 - 40 = 20.', solutionSteps: ['20'] },
      ],
      challenge: [
        { id: 'me-c1', question: 'Class A (20 students) has mean 80. Class B (30 students) has mean 90. Find combined mean.', answer: '86', hint: 'Total = (20*80 + 30*90) / 50 = (1600 + 2700) / 50 = 4300 / 50 = 86.', solutionSteps: ['86'] },
        { id: 'me-c2', question: 'Mean of 10 numbers is 25. If each number is multiplied by 3 and increased by 4, what is new mean?', answer: '79', hint: 'New mean = 25 * 3 + 4 = 75 + 4 = 79.', solutionSteps: ['79'] },
      ],
    },
  },

  median: {
    id: 'median',
    title: 'Median',
    category: 'Statistics and Probability',
    subTopics: ['Definition & Ordering Data', 'Odd Count: Middle Value', 'Even Count: Average of Two Middle Values', 'Robustness Against Outliers'],
    whatIsIt: {
      definition: 'The median is the middle value in an ordered dataset that divides the upper half of the data from the lower half.',
      terms: ['Median', 'Ordered array: sorted ascendingly', '50th percentile (Q2)', 'Odd n vs Even n formulas'],
      formulaOrRule: 'If n is odd: Median = value at position (n + 1)/2. If n is even: Median = average of values at positions (n/2) and (n/2 + 1).',
      whyUsed: 'Preferred over the mean for reporting housing prices, salaries, and economic wealth because it is immune to extreme outliers.',
    },
    example1: {
      problem: 'Find the median of: 12, 3, 19, 7, 15',
      steps: [
        { action: 'Arrange the data in ascending order.', math: 'Ordered: 3, 7, 12, 15, 19' },
        { action: 'Count observations: n = 5 (odd).', math: 'Middle position = (5 + 1) / 2 = 3rd element' },
        { action: 'Pick the 3rd element.', math: 'Median = 12' },
      ],
      finalAnswer: 'Median = 12',
    },
    example2: {
      problem: 'Find the median of: 8, 14, 6, 22, 10, 18',
      steps: [
        { action: 'Sort data in ascending order.', math: 'Ordered: 6, 8, 10, 14, 18, 22' },
        { action: 'Count observations: n = 6 (even). Identify two middle values (3rd and 4th).', math: '3rd value = 10, 4th value = 14' },
        { action: 'Compute average of the two middle values.', math: 'Median = (10 + 14) / 2 = 24 / 2 = 12' },
      ],
      finalAnswer: 'Median = 12',
    },
    keyRules: [
      'Data MUST be sorted in ascending order before locating the median.',
      'The median is a robust statistic; replacing the maximum value with 1,000,000 does NOT change the median.',
      'Exactly 50% of the dataset lies at or below the median.',
    ],
    commonMistakes: [
      { mistake: 'Finding the middle number without sorting the dataset first.', correct: 'Always sort from smallest to largest first.' },
    ],
    practice: {
      easy: [
        { id: 'md-e1', question: 'Find median of: 5, 2, 8, 1, 9.', answer: '5', hint: 'Sorted: 1, 2, 5, 8, 9.', solutionSteps: ['5'] },
        { id: 'md-e2', question: 'Find median of: 10, 20, 30, 40, 50.', answer: '30', hint: 'Middle is 30.', solutionSteps: ['30'] },
        { id: 'md-e3', question: 'Find median of: 4, 8, 12, 16.', answer: '10', hint: 'Even count: (8 + 12) / 2 = 10.', solutionSteps: ['10'] },
      ],
      medium: [
        { id: 'md-m1', question: 'Find median of: 25, 12, 18, 30, 15, 22.', answer: '20', hint: 'Sorted: 12, 15, 18, 22, 25, 30. Middle: (18 + 22)/2 = 20.', solutionSteps: ['20'] },
        { id: 'md-m2', question: 'Find median of: 7, 3, 9, 12, 1, 15, 5.', answer: '7', hint: 'Sorted: 1, 3, 5, 7, 9, 12, 15. Middle is 7.', solutionSteps: ['7'] },
        { id: 'md-m3', question: 'If dataset is 3, 5, x, 9, 11 (in order) and median is 7, what is x?', answer: '7', hint: 'x is the 3rd element, so x = 7.', solutionSteps: ['x = 7'] },
      ],
      challenge: [
        { id: 'md-c1', question: 'In dataset 2, 4, 6, 8, 10, 1000, which central measure is better to represent typical data (mean or median)?', answer: 'median', hint: '1000 is extreme outlier, making median (7) far more representative than mean (188.3).', solutionSteps: ['Median'] },
        { id: 'md-c2', question: 'Find median of the first 10 prime numbers.', answer: '12', hint: 'Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. 5th and 6th are 11 and 13. (11+13)/2 = 12.', solutionSteps: ['12'] },
      ],
    },
  },

  mode: {
    id: 'mode',
    title: 'Mode',
    category: 'Statistics and Probability',
    subTopics: ['Definition (Most Frequent Observation)', 'Unimodal, Bimodal, Multimodal', 'No Mode Datasets', 'Mode for Categorical Data'],
    whatIsIt: {
      definition: 'The mode is the value or category that appears with the highest frequency in a dataset.',
      terms: ['Unimodal: single peak/mode', 'Bimodal: two values tied for highest frequency', 'Multimodal: >2 modes', 'No mode: all values appear with equal frequency'],
      formulaOrRule: 'Mode = Value with highest frequency count.',
      whyUsed: 'Identifies best-selling product sizes, popular inventory choices, dominant shoe sizes, and voting winners.',
    },
    example1: {
      problem: 'Find the mode of the dataset: 4, 7, 2, 7, 9, 4, 7, 1',
      steps: [
        { action: 'Count frequency of each value.', math: '1: once\n2: once\n4: twice\n7: three times\n9: once' },
        { action: 'Identify value with highest frequency count.', math: '7 appears most often (frequency = 3)' },
      ],
      finalAnswer: 'Mode = 7',
    },
    example2: {
      problem: 'Find the mode of: 3, 5, 3, 8, 9, 5, 2',
      steps: [
        { action: 'Count frequencies.', math: '3: twice\n5: twice\n2, 8, 9: once each' },
        { action: 'Notice two values tie for top frequency.', math: 'Bimodal: 3 and 5' },
      ],
      finalAnswer: 'Bimodal: 3 and 5',
    },
    keyRules: [
      'A dataset can have one mode, multiple modes, or NO mode at all.',
      'Mode is the ONLY measure of central tendency applicable to non-numeric categorical data (e.g. favorite color).',
    ],
    commonMistakes: [
      { mistake: 'Stating the frequency instead of the value itself (e.g. stating mode is 3 when 7 appears 3 times).', correct: 'The mode is the number 7; 3 is merely its frequency.' },
    ],
    practice: {
      easy: [
        { id: 'mo-e1', question: 'Find mode of: 2, 3, 3, 5, 7.', answer: '3', hint: '3 appears twice.', solutionSteps: ['3'] },
        { id: 'mo-e2', question: 'Find mode of: 10, 15, 20, 15, 30.', answer: '15', hint: '15 appears most.', solutionSteps: ['15'] },
        { id: 'mo-e3', question: 'Find mode of: 6, 8, 8, 8, 9, 10.', answer: '8', hint: '8 appears 3 times.', solutionSteps: ['8'] },
      ],
      medium: [
        { id: 'mo-m1', question: 'What is mode of: 4, 6, 9, 12, 15 (if all appear once)?', answer: 'no mode', hint: 'All frequencies equal => no mode.', solutionSteps: ['No mode'] },
        { id: 'mo-m2', question: 'In survey of T-shirt sizes (S, M, L, M, L, M), what is mode?', answer: 'M', hint: 'M appears 3 times.', solutionSteps: ['M'] },
        { id: 'mo-m3', question: 'Dataset has values 2, 4, 4, 6, 6, 8. What is it called?', answer: 'bimodal', hint: 'Two modes: 4 and 6.', solutionSteps: ['Bimodal'] },
      ],
      challenge: [
        { id: 'mo-c1', question: 'For a moderately skewed distribution, Pearson empirical relationship is: Mode = 3*Median - 2*Mean. If Mean = 20 and Median = 22, estimate Mode.', answer: '26', hint: '3(22) - 2(20) = 66 - 40 = 26.', solutionSteps: ['26'] },
        { id: 'mo-c2', question: 'In dataset 3, 5, 7, 3, 5, x, if mode is 5, what must x be?', answer: '5', hint: 'For 5 to win the tie against 3, x must be 5 (making 5 appear 3 times).', solutionSteps: ['x = 5'] },
      ],
    },
  },

  range: {
    id: 'range',
    title: 'Range',
    category: 'Statistics and Probability',
    subTopics: ['Definition of Spread / Dispersion', 'Formula: Max - Min', 'Interpretation of High vs Low Range', 'Interquartile Range Overview'],
    whatIsIt: {
      definition: 'The range is the simplest measure of statistical dispersion, representing the difference between the highest and lowest values in a dataset.',
      terms: ['Range: Max - Min', 'Dispersion / Spread', 'Maximum value', 'Minimum value'],
      formulaOrRule: 'Range = Maximum Value - Minimum Value.',
      whyUsed: 'Provides quick insight into quality control variability, temperature swings, and financial stock volatility.',
    },
    example1: {
      problem: 'Find the range of daily temperatures: 14°C, 22°C, 18°C, 9°C, 27°C, 19°C',
      steps: [
        { action: 'Identify maximum and minimum values.', math: 'Max = 27°C\nMin = 9°C' },
        { action: 'Compute difference: Max - Min.', math: 'Range = 27 - 9 = 18°C' },
      ],
      finalAnswer: '18°C',
    },
    example2: {
      problem: 'A dataset has minimum value 42 and range 35. Find the maximum value.',
      steps: [
        { action: 'Recall Range = Max - Min.', math: '35 = Max - 42' },
        { action: 'Solve for Max.', math: 'Max = 42 + 35 = 77' },
      ],
      finalAnswer: '77',
    },
    keyRules: [
      'Range depends ONLY on two extreme numbers; it provides no information about how data is distributed in between.',
      'Range can never be negative (Range ≥ 0).',
    ],
    commonMistakes: [
      { mistake: 'Writing range as an interval: "9 to 27".', correct: 'In statistics, range is a single number: 27 - 9 = 18.' },
    ],
    practice: {
      easy: [
        { id: 'ra-e1', question: 'Find range of: 3, 7, 12, 19, 25.', answer: '22', hint: '25 - 3 = 22.', solutionSteps: ['22'] },
        { id: 'ra-e2', question: 'Find range of: 10, 10, 10, 10.', answer: '0', hint: '10 - 10 = 0.', solutionSteps: ['0'] },
        { id: 'ra-e3', question: 'Find range of: -5, 2, 8, -1, 14.', answer: '19', hint: 'Max = 14, Min = -5. 14 - (-5) = 19.', solutionSteps: ['19'] },
      ],
      medium: [
        { id: 'ra-m1', question: 'If minimum is 18 and range is 24, find maximum.', answer: '42', hint: '18 + 24 = 42.', solutionSteps: ['42'] },
        { id: 'ra-m2', question: 'If maximum is 85 and range is 32, find minimum.', answer: '53', hint: '85 - 32 = 53.', solutionSteps: ['53'] },
        { id: 'ra-m3', question: 'Scores on a test are 55, 62, 78, 85, 94, 98. Find range.', answer: '43', hint: '98 - 55 = 43.', solutionSteps: ['43'] },
      ],
      challenge: [
        { id: 'ra-c1', question: 'If every value in a dataset is doubled, by what factor does range multiply?', answer: '2', hint: 'New Max - New Min = 2(Max - Min). Multiplies by 2.', solutionSteps: ['Factor of 2'] },
        { id: 'ra-c2', question: 'If every value in a dataset is increased by 10, how does the range change?', answer: '0', hint: '(Max + 10) - (Min + 10) = Max - Min. Change is 0.', solutionSteps: ['0 (unchanged)'] },
      ],
    },
  },

  'basic-probability': {
    id: 'basic-probability',
    title: 'Basic Probability',
    category: 'Statistics and Probability',
    subTopics: ['Definition of Probability P(E)', 'Sample Space (S)', 'Favorable Outcomes', 'Probability Scale (0 to 1)'],
    whatIsIt: {
      definition: 'Probability measures the numerical likelihood that a specific event will occur, scaled between 0 (impossible event) and 1 (certain event).',
      terms: ['Experiment: action with uncertain result', 'Outcome: single result', 'Sample Space (S): set of all possible outcomes', 'Event (E): subset of outcomes'],
      formulaOrRule: 'Theoretical Probability: P(E) = n(E) / n(S) = (Number of favorable outcomes) / (Total possible outcomes).',
      whyUsed: 'Insurance risk premiums, medical diagnosis odds, gaming casino fair play, and weather forecasting.',
    },
    example1: {
      problem: 'What is the probability of rolling a prime number on a standard fair 6-sided die?',
      steps: [
        { action: 'List sample space S of a standard die.', math: 'S = {1, 2, 3, 4, 5, 6} => n(S) = 6' },
        { action: 'Identify favorable prime outcomes.', math: 'Primes = {2, 3, 5} => n(E) = 3' },
        { action: 'Apply P(E) = n(E) / n(S).', math: 'P(Prime) = 3 / 6 = 1/2 = 0.5 (50%)' },
      ],
      finalAnswer: '1/2 (or 0.5)',
    },
    example2: {
      problem: 'A bag contains 5 red balls, 3 blue balls, and 2 green balls. Find probability of drawing a blue ball.',
      steps: [
        { action: 'Calculate total outcomes n(S).', math: 'Total = 5 + 3 + 2 = 10' },
        { action: 'Favorable blue outcomes n(Blue).', math: 'n(Blue) = 3' },
        { action: 'Compute probability.', math: 'P(Blue) = 3 / 10 = 0.3' },
      ],
      finalAnswer: '3/10 (or 0.3)',
    },
    keyRules: [
      '0 ≤ P(E) ≤ 1 for any event E.',
      'P(impossible event) = 0; P(certain event) = 1.',
      'Sum of probabilities of all elementary outcomes in sample space equals 1.',
    ],
    commonMistakes: [
      { mistake: 'Calculating probability > 1 or negative.', correct: 'Probability can NEVER be less than 0 or greater than 1.' },
    ],
    practice: {
      easy: [
        { id: 'bp-e1', question: 'Probability of getting Heads on a fair coin toss?', answer: '0.5', hint: '1 / 2 = 0.5.', solutionSteps: ['0.5'] },
        { id: 'bp-e2', question: 'Probability of rolling a 4 on a 6-sided die?', answer: '1/6', hint: '1 out of 6.', solutionSteps: ['1/6'] },
        { id: 'bp-e3', question: 'What is the probability of an impossible event?', answer: '0', hint: '0% chance.', solutionSteps: ['0'] },
      ],
      medium: [
        { id: 'bp-m1', question: 'Probability of rolling an even number on a 6-sided die?', answer: '0.5', hint: '{2, 4, 6} = 3/6 = 0.5.', solutionSteps: ['0.5'] },
        { id: 'bp-m2', question: 'A bag has 4 red and 6 green marbles. Probability of red marble?', answer: '0.4', hint: '4 / 10 = 0.4.', solutionSteps: ['0.4'] },
        { id: 'bp-m3', question: 'Probability of drawing an Ace from a standard 52-card deck?', answer: '1/13', hint: '4 / 52 = 1/13.', solutionSteps: ['1/13'] },
      ],
      challenge: [
        { id: 'bp-c1', question: 'Probability of rolling a sum of 7 with two fair 6-sided dice?', answer: '1/6', hint: 'Outcomes summing to 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 out of 36 = 1/6.', solutionSteps: ['6 / 36 = 1/6'] },
        { id: 'bp-c2', question: 'Tossing 3 coins: what is probability of getting exactly 2 heads?', answer: '0.375', hint: 'Total = 8. Favorable: HHT, HTH, THH = 3. 3/8 = 0.375.', solutionSteps: ['3/8 = 0.375'] },
      ],
    },
  },

  'probability-rules': {
    id: 'probability-rules',
    title: 'Probability Rules',
    category: 'Statistics and Probability',
    subTopics: ['Complement Rule P(not E) = 1 - P(E)', 'Mutually Exclusive Events (Addition Rule)', 'Independent Events (Multiplication Rule)', 'Conditional Probability Overview'],
    whatIsIt: {
      definition: 'Probability rules are formal axioms and theorems governing the combination of multiple events (unions, intersections, and complements).',
      terms: ['Complement (E\'): event NOT happening', 'Mutually Exclusive: cannot occur simultaneously (P(A ∩ B) = 0)', 'Independent: outcome of A does not alter B'],
      formulaOrRule: 'Complement: P(not A) = 1 - P(A). Addition Rule: P(A or B) = P(A) + P(B) - P(A and B). Multiplication (Independent): P(A and B) = P(A) * P(B).',
      whyUsed: 'Calculates redundancy reliability in aircraft engines, fraud detection algorithms, and genetics heredity.',
    },
    example1: {
      problem: 'The probability of rain tomorrow is 0.35. What is the probability that it will NOT rain?',
      steps: [
        { action: 'Apply the complement rule: P(not E) = 1 - P(E).', math: 'P(no rain) = 1 - P(rain)' },
        { action: 'Subtract.', math: '1 - 0.35 = 0.65' },
      ],
      finalAnswer: '0.65 (65%)',
    },
    example2: {
      problem: 'Two independent coins are flipped. What is the probability of getting two Heads?',
      steps: [
        { action: 'Apply multiplication rule for independent events: P(H1 and H2) = P(H1) * P(H2).', math: 'P = (1/2) * (1/2)' },
        { action: 'Multiply.', math: 'P = 1/4 = 0.25' },
      ],
      finalAnswer: '1/4 (or 0.25)',
    },
    keyRules: [
      'P(not A) = 1 - P(A) is often the fastest way to solve "at least one" problems.',
      'If A and B are mutually exclusive, P(A and B) = 0, so P(A or B) = P(A) + P(B).',
      'For independent events, P(A and B) = P(A) * P(B).',
    ],
    commonMistakes: [
      { mistake: 'Adding probabilities for non-mutually exclusive events without subtracting intersection.', correct: 'Must subtract overlap: P(A or B) = P(A) + P(B) - P(A ∩ B).' },
    ],
    practice: {
      easy: [
        { id: 'pr-e1', question: 'If P(Win) = 0.7, what is P(Lose)?', answer: '0.3', hint: '1 - 0.7 = 0.3.', solutionSteps: ['0.3'] },
        { id: 'pr-e2', question: 'Probability of rolling a 1 or a 6 on a single die roll?', answer: '1/3', hint: 'Mutually exclusive: 1/6 + 1/6 = 2/6 = 1/3.', solutionSteps: ['1/3'] },
        { id: 'pr-e3', question: 'If P(A) = 0.4 and P(B) = 0.5 (independent), find P(A and B).', answer: '0.2', hint: '0.4 * 0.5 = 0.2.', solutionSteps: ['0.2'] },
      ],
      medium: [
        { id: 'pr-m1', question: 'In a deck of 52 cards, find P(King or Queen).', answer: '2/13', hint: '4/52 + 4/52 = 8/52 = 2/13.', solutionSteps: ['2/13'] },
        { id: 'pr-m2', question: 'In a deck of 52 cards, find P(King or Heart).', answer: '4/13', hint: '4/52 + 13/52 - 1/52 (King of Hearts) = 16/52 = 4/13.', solutionSteps: ['4/13'] },
        { id: 'pr-m3', question: 'Two dice rolled. Probability both show 6?', answer: '1/36', hint: '1/6 * 1/6 = 1/36.', solutionSteps: ['1/36'] },
      ],
      challenge: [
        { id: 'pr-c1', question: 'A coin is flipped 3 times. What is probability of getting AT LEAST ONE head?', answer: '0.875', hint: '1 - P(all tails) = 1 - (1/2)^3 = 1 - 1/8 = 7/8 = 0.875.', solutionSteps: ['7/8 = 0.875'] },
        { id: 'pr-c2', question: 'Targets A and B have hit probabilities 0.6 and 0.5 independently. What is probability at least one hits?', answer: '0.8', hint: '1 - P(both miss) = 1 - (0.4 * 0.5) = 1 - 0.2 = 0.8.', solutionSteps: ['0.8'] },
      ],
    },
  },

  'data-interpretation': {
    id: 'data-interpretation',
    title: 'Simple Data Interpretation',
    category: 'Statistics and Probability',
    subTopics: ['Bar Charts & Histograms', 'Line Graphs & Trends', 'Pie Charts & Sector Angles', 'Reading Tables & Frequency Matrices'],
    whatIsIt: {
      definition: 'Data interpretation is the practice of extracting, analyzing, and drawing actionable mathematical conclusions from visual charts, graphs, and structured tables.',
      terms: ['Pie chart sector angle: (Value / Total) * 360°', 'Histogram: continuous interval bars', 'Trend: upward or downward trajectory'],
      formulaOrRule: 'Sector angle θ = (Category Value / Total Value) * 360°. Percentage share = (Sector angle / 360°) * 100%.',
      whyUsed: 'Vital for financial dashboards, executive decision making, medical studies, and competitive sports analytics.',
    },
    example1: {
      problem: 'A student budget allocates $400 out of $1600 total expenses to Food. What is the central angle for Food on a pie chart?',
      steps: [
        { action: 'Find the proportion of Food to Total.', math: 'Fraction = 400 / 1600 = 1/4' },
        { action: 'Multiply by total degrees in a circle (360°).', math: 'Angle = (1/4) * 360° = 90°' },
      ],
      finalAnswer: '90°',
    },
    example2: {
      problem: 'On a pie chart, Rent accounts for a 108° sector. What percentage of the budget is spent on Rent?',
      steps: [
        { action: 'Divide sector angle by 360°.', math: 'Fraction = 108° / 360° = 0.30' },
        { action: 'Convert to percentage.', math: '0.30 * 100% = 30%' },
      ],
      finalAnswer: '30%',
    },
    keyRules: [
      'All sector angles in a pie chart must sum to exactly 360°.',
      'In histograms, bars touch each other without gaps because the data is continuous.',
      'Bar charts compare discrete categories; line graphs display trends over continuous time.',
    ],
    commonMistakes: [
      { mistake: 'Dividing by 100 instead of 360 when finding pie chart sector angles.', correct: 'A circle has 360 degrees: θ = (value/total) * 360°.' },
    ],
    practice: {
      easy: [
        { id: 'di-e1', question: 'How many total degrees in a complete pie chart?', answer: '360', hint: 'Full circle = 360°.', solutionSteps: ['360°'] },
        { id: 'di-e2', question: 'If category represents 50% of data, what is its pie chart angle?', answer: '180', hint: '0.50 * 360° = 180°.', solutionSteps: ['180°'] },
        { id: 'di-e3', question: 'If category represents 25% of data, what is its pie chart angle?', answer: '90', hint: '0.25 * 360° = 90°.', solutionSteps: ['90°'] },
      ],
      medium: [
        { id: 'di-m1', question: 'Category A has value 30 out of total 120. Find its sector angle in degrees.', answer: '90', hint: '(30/120) * 360° = (1/4) * 360° = 90°.', solutionSteps: ['90°'] },
        { id: 'di-m2', question: 'Sector angle is 72°. What percentage does it represent?', answer: '20', hint: '(72 / 360) * 100% = 20%.', solutionSteps: ['20%'] },
        { id: 'di-m3', question: 'In bar graph, sales grew from 40k in 2021 to 50k in 2022. What was percentage growth?', answer: '25', hint: '(10k / 40k) * 100% = 25%.', solutionSteps: ['25%'] },
      ],
      challenge: [
        { id: 'di-c1', question: 'A school has 720 students. Transport accounts for 80° on pie chart. How many students use transport?', answer: '160', hint: '(80 / 360) * 720 = (2/9) * 720 = 160 students.', solutionSteps: ['160'] },
        { id: 'di-c2', question: 'In a 4-sector pie chart, three angles are 120°, 90°, and 80°. What is the fourth angle?', answer: '70', hint: '360 - (120 + 90 + 80) = 360 - 290 = 70°.', solutionSteps: ['70°'] },
      ],
    },
  },
};
