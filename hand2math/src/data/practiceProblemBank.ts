import { TOPIC_DATA, MATH_CATEGORIES } from './mathCurriculum';

export interface PracticeBankProblem {
  id: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  answer: string;
  hint: string;
  solutionSteps: string[];
}

// 10 problems each for Easy, Medium, and Hard for every major math topic
export const PRACTICE_PROBLEM_BANK: Record<string, {
  easy: PracticeBankProblem[];
  medium: PracticeBankProblem[];
  hard: PracticeBankProblem[];
}> = {
  'Linear Equations': {
    easy: [
      {
        id: 'le-e-1',
        topic: 'Linear Equations',
        difficulty: 'easy',
        question: 'Solve for x: x + 7 = 19',
        answer: '12',
        hint: 'Subtract 7 from both sides of the equation.',
        solutionSteps: ['x + 7 = 19', 'x = 19 - 7', 'x = 12'],
      },
      {
        id: 'le-e-2',
        topic: 'Linear Equations',
        difficulty: 'easy',
        question: 'Solve for x: 3x = 24',
        answer: '8',
        hint: 'Divide both sides by 3.',
        solutionSteps: ['3x = 24', 'x = 24 / 3', 'x = 8'],
      },
      {
        id: 'le-e-3',
        topic: 'Linear Equations',
        difficulty: 'easy',
        question: 'Solve for y: y - 9 = 15',
        answer: '24',
        hint: 'Add 9 to both sides.',
        solutionSteps: ['y - 9 = 15', 'y = 15 + 9', 'y = 24'],
      },
      {
        id: 'le-e-4',
        topic: 'Linear Equations',
        difficulty: 'easy',
        question: 'Solve for x: x / 4 = 6',
        answer: '24',
        hint: 'Multiply both sides by 4.',
        solutionSteps: ['x / 4 = 6', 'x = 6 * 4', 'x = 24'],
      },
      {
        id: 'le-e-5',
        topic: 'Linear Equations',
        difficulty: 'easy',
        question: 'Solve for x: 2x + 3 = 11',
        answer: '4',
        hint: 'Subtract 3 from both sides, then divide by 2.',
        solutionSteps: ['2x + 3 = 11', '2x = 8', 'x = 4'],
      },
      {
        id: 'le-e-6',
        topic: 'Linear Equations',
        difficulty: 'easy',
        question: 'Solve for z: 5z = 45',
        answer: '9',
        hint: 'Divide 45 by 5.',
        solutionSteps: ['5z = 45', 'z = 45 / 5', 'z = 9'],
      },
      {
        id: 'le-e-7',
        topic: 'Linear Equations',
        difficulty: 'easy',
        question: 'Solve for x: x - 12 = 8',
        answer: '20',
        hint: 'Add 12 to 8.',
        solutionSteps: ['x - 12 = 8', 'x = 8 + 12', 'x = 20'],
      },
      {
        id: 'le-e-8',
        topic: 'Linear Equations',
        difficulty: 'easy',
        question: 'Solve for x: 4x - 2 = 14',
        answer: '4',
        hint: 'Add 2, then divide by 4.',
        solutionSteps: ['4x - 2 = 14', '4x = 16', 'x = 4'],
      },
      {
        id: 'le-e-9',
        topic: 'Linear Equations',
        difficulty: 'easy',
        question: 'Solve for x: 10 + x = 27',
        answer: '17',
        hint: 'Subtract 10 from 27.',
        solutionSteps: ['x = 27 - 10', 'x = 17'],
      },
      {
        id: 'le-e-10',
        topic: 'Linear Equations',
        difficulty: 'easy',
        question: 'Solve for x: 6x = 42',
        answer: '7',
        hint: 'Divide 42 by 6.',
        solutionSteps: ['x = 42 / 6', 'x = 7'],
      },
    ],
    medium: [
      {
        id: 'le-m-1',
        topic: 'Linear Equations',
        difficulty: 'medium',
        question: 'Solve for x: 5x + 8 = 38',
        answer: '6',
        hint: 'Subtract 8 from 38, then divide by 5.',
        solutionSteps: ['5x + 8 = 38', '5x = 30', 'x = 6'],
      },
      {
        id: 'le-m-2',
        topic: 'Linear Equations',
        difficulty: 'medium',
        question: 'Solve for x: 7x - 11 = 31',
        answer: '6',
        hint: 'Add 11 to 31, then divide by 7.',
        solutionSteps: ['7x - 11 = 31', '7x = 42', 'x = 6'],
      },
      {
        id: 'le-m-3',
        topic: 'Linear Equations',
        difficulty: 'medium',
        question: 'Solve for x: 3(x + 4) = 27',
        answer: '5',
        hint: 'Divide by 3 first: x + 4 = 9.',
        solutionSteps: ['3(x + 4) = 27', 'x + 4 = 9', 'x = 5'],
      },
      {
        id: 'le-m-4',
        topic: 'Linear Equations',
        difficulty: 'medium',
        question: 'Solve for x: 4x + 15 = 2x + 29',
        answer: '7',
        hint: 'Subtract 2x from both sides, then subtract 15.',
        solutionSteps: ['4x - 2x = 29 - 15', '2x = 14', 'x = 7'],
      },
      {
        id: 'le-m-5',
        topic: 'Linear Equations',
        difficulty: 'medium',
        question: 'Solve for x: 2(3x - 1) = 28',
        answer: '5',
        hint: 'Divide both sides by 2 to get 3x - 1 = 14.',
        solutionSteps: ['3x - 1 = 14', '3x = 15', 'x = 5'],
      },
      {
        id: 'le-m-6',
        topic: 'Linear Equations',
        difficulty: 'medium',
        question: 'Solve for x: (2x + 6) / 4 = 5',
        answer: '7',
        hint: 'Multiply both sides by 4: 2x + 6 = 20.',
        solutionSteps: ['2x + 6 = 20', '2x = 14', 'x = 7'],
      },
      {
        id: 'le-m-7',
        topic: 'Linear Equations',
        difficulty: 'medium',
        question: 'Solve for x: 9x - 14 = 4x + 16',
        answer: '6',
        hint: 'Group variable terms on left: 9x - 4x = 16 + 14.',
        solutionSteps: ['5x = 30', 'x = 6'],
      },
      {
        id: 'le-m-8',
        topic: 'Linear Equations',
        difficulty: 'medium',
        question: 'Solve for x: 12 - 3x = -6',
        answer: '6',
        hint: 'Subtract 12 from both sides: -3x = -18.',
        solutionSteps: ['-3x = -18', 'x = 6'],
      },
      {
        id: 'le-m-9',
        topic: 'Linear Equations',
        difficulty: 'medium',
        question: 'Solve for x: 5(2x - 3) = 35',
        answer: '5',
        hint: 'Divide by 5: 2x - 3 = 7.',
        solutionSteps: ['2x - 3 = 7', '2x = 10', 'x = 5'],
      },
      {
        id: 'le-m-10',
        topic: 'Linear Equations',
        difficulty: 'medium',
        question: 'Solve for x: 6x + 7 = 3x + 28',
        answer: '7',
        hint: '6x - 3x = 28 - 7.',
        solutionSteps: ['3x = 21', 'x = 7'],
      },
    ],
    hard: [
      {
        id: 'le-h-1',
        topic: 'Linear Equations',
        difficulty: 'hard',
        question: 'Solve for x: 3(2x - 4) = 4(x + 2) + 2',
        answer: '11',
        hint: 'Expand both sides: 6x - 12 = 4x + 8 + 2.',
        solutionSteps: ['6x - 12 = 4x + 10', '2x = 22', 'x = 11'],
      },
      {
        id: 'le-h-2',
        topic: 'Linear Equations',
        difficulty: 'hard',
        question: 'Solve for x: (3x - 5) / 2 = (2x + 4) / 3',
        answer: '4.6',
        hint: 'Cross multiply: 3(3x - 5) = 2(2x + 4).',
        solutionSteps: ['9x - 15 = 4x + 8', '5x = 23', 'x = 4.6'],
      },
      {
        id: 'le-h-3',
        topic: 'Linear Equations',
        difficulty: 'hard',
        question: 'Solve for x: 5(x - 2) - 2(x + 3) = 11',
        answer: '9',
        hint: 'Expand: 5x - 10 - 2x - 6 = 11.',
        solutionSteps: ['3x - 16 = 11', '3x = 27', 'x = 9'],
      },
      {
        id: 'le-h-4',
        topic: 'Linear Equations',
        difficulty: 'hard',
        question: 'Solve for x: 0.4x + 1.2 = 0.2x + 2.8',
        answer: '8',
        hint: 'Multiply entire equation by 10 to clear decimals: 4x + 12 = 2x + 28.',
        solutionSteps: ['2x = 16', 'x = 8'],
      },
      {
        id: 'le-h-5',
        topic: 'Linear Equations',
        difficulty: 'hard',
        question: 'Solve for x: (x + 2) / 3 + (x - 1) / 2 = 6',
        answer: '7',
        hint: 'Multiply through by common denominator 6: 2(x + 2) + 3(x - 1) = 36.',
        solutionSteps: ['2x + 4 + 3x - 3 = 36', '5x + 1 = 36', '5x = 35', 'x = 7'],
      },
      {
        id: 'le-h-6',
        topic: 'Linear Equations',
        difficulty: 'hard',
        question: 'Solve for x: 7 - 2(3x - 4) = 5(1 - x) + 8',
        answer: '2',
        hint: 'Expand carefully: 7 - 6x + 8 = 5 - 5x + 8.',
        solutionSteps: ['15 - 6x = 13 - 5x', '-x = -2', 'x = 2'],
      },
      {
        id: 'le-h-7',
        topic: 'Linear Equations',
        difficulty: 'hard',
        question: 'Solve for x: 4(x + 1) / 5 = x - 1',
        answer: '9',
        hint: 'Multiply by 5: 4x + 4 = 5x - 5.',
        solutionSteps: ['4x + 4 = 5x - 5', '9 = x', 'x = 9'],
      },
      {
        id: 'le-h-8',
        topic: 'Linear Equations',
        difficulty: 'hard',
        question: 'Solve for x: 2(x - 3) + 3(2x + 1) = 45',
        answer: '6',
        hint: 'Expand: 2x - 6 + 6x + 3 = 45.',
        solutionSteps: ['8x - 3 = 45', '8x = 48', 'x = 6'],
      },
      {
        id: 'le-h-9',
        topic: 'Linear Equations',
        difficulty: 'hard',
        question: 'Solve for x: (5x + 2) / 3 = (3x + 10) / 2',
        answer: '26',
        hint: 'Cross multiply: 2(5x + 2) = 3(3x + 10).',
        solutionSteps: ['10x + 4 = 9x + 30', 'x = 26'],
      },
      {
        id: 'le-h-10',
        topic: 'Linear Equations',
        difficulty: 'hard',
        question: 'Solve for x: 6(x - 1) - 4(x - 2) = 14',
        answer: '6',
        hint: 'Expand: 6x - 6 - 4x + 8 = 14.',
        solutionSteps: ['2x + 2 = 14', '2x = 12', 'x = 6'],
      },
    ],
  },

  'BODMAS / Order of Operations': {
    easy: [
      {
        id: 'bo-e-1',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'easy',
        question: 'Evaluate: 6 + 4 * 3',
        answer: '18',
        hint: 'Multiply first: 4 * 3 = 12, then add 6.',
        solutionSteps: ['6 + (4 * 3)', '6 + 12', '18'],
      },
      {
        id: 'bo-e-2',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'easy',
        question: 'Evaluate: 20 - 10 / 2',
        answer: '15',
        hint: 'Divide first: 10 / 2 = 5.',
        solutionSteps: ['20 - 5', '15'],
      },
      {
        id: 'bo-e-3',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'easy',
        question: 'Evaluate: (8 + 4) / 3',
        answer: '4',
        hint: 'Evaluate parentheses first.',
        solutionSteps: ['12 / 3', '4'],
      },
      {
        id: 'bo-e-4',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'easy',
        question: 'Evaluate: 5 * 6 - 8',
        answer: '22',
        hint: '5 * 6 = 30.',
        solutionSteps: ['30 - 8', '22'],
      },
      {
        id: 'bo-e-5',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'easy',
        question: 'Evaluate: 14 + 18 / 6',
        answer: '17',
        hint: '18 / 6 = 3.',
        solutionSteps: ['14 + 3', '17'],
      },
      {
        id: 'bo-e-6',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'easy',
        question: 'Evaluate: 2 * (15 - 8)',
        answer: '14',
        hint: '15 - 8 = 7.',
        solutionSteps: ['2 * 7', '14'],
      },
      {
        id: 'bo-e-7',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'easy',
        question: 'Evaluate: 30 / 5 * 2',
        answer: '12',
        hint: 'Divide and multiply left to right: 30 / 5 = 6, then 6 * 2 = 12.',
        solutionSteps: ['6 * 2', '12'],
      },
      {
        id: 'bo-e-8',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'easy',
        question: 'Evaluate: 4^2 + 5',
        answer: '21',
        hint: '4^2 = 16.',
        solutionSteps: ['16 + 5', '21'],
      },
      {
        id: 'bo-e-9',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'easy',
        question: 'Evaluate: (18 - 6) / (2 + 2)',
        answer: '3',
        hint: '12 / 4 = ?',
        solutionSteps: ['12 / 4', '3'],
      },
      {
        id: 'bo-e-10',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'easy',
        question: 'Evaluate: 9 + 3 * 7',
        answer: '30',
        hint: '3 * 7 = 21, then 9 + 21.',
        solutionSteps: ['9 + 21', '30'],
      },
    ],
    medium: [
      {
        id: 'bo-m-1',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'medium',
        question: 'Evaluate: 18 / 3 * 4 + 7',
        answer: '31',
        hint: '18 / 3 = 6; 6 * 4 = 24; 24 + 7 = 31.',
        solutionSteps: ['6 * 4 + 7', '24 + 7', '31'],
      },
      {
        id: 'bo-m-2',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'medium',
        question: 'Evaluate: 3 * (4 + 2)^2 - 20',
        answer: '88',
        hint: '(4 + 2) = 6; 6^2 = 36; 3 * 36 = 108.',
        solutionSteps: ['3 * 36 - 20', '108 - 20', '88'],
      },
      {
        id: 'bo-m-3',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'medium',
        question: 'Evaluate: 50 - 4 * (12 - 7) + 8',
        answer: '38',
        hint: '4 * 5 = 20.',
        solutionSteps: ['50 - 20 + 8', '30 + 8', '38'],
      },
      {
        id: 'bo-m-4',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'medium',
        question: 'Evaluate: (24 / 4)^2 - 3 * 5',
        answer: '21',
        hint: '6^2 = 36; 3 * 5 = 15.',
        solutionSteps: ['36 - 15', '21'],
      },
      {
        id: 'bo-m-5',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'medium',
        question: 'Evaluate: 8 + 3 * (16 / 4 + 2)',
        answer: '26',
        hint: '16 / 4 = 4; 4 + 2 = 6; 3 * 6 = 18.',
        solutionSteps: ['8 + 3 * 6', '8 + 18', '26'],
      },
      {
        id: 'bo-m-6',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'medium',
        question: 'Evaluate: 100 / (2 + 3) * 2',
        answer: '40',
        hint: 'Parentheses first: 2 + 3 = 5; then 100 / 5 = 20; 20 * 2 = 40.',
        solutionSteps: ['100 / 5 * 2', '20 * 2', '40'],
      },
      {
        id: 'bo-m-7',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'medium',
        question: 'Evaluate: 4^3 / 8 + 2 * 9',
        answer: '26',
        hint: '4^3 = 64; 64 / 8 = 8; 2 * 9 = 18.',
        solutionSteps: ['8 + 18', '26'],
      },
      {
        id: 'bo-m-8',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'medium',
        question: 'Evaluate: 7 * (8 - 3) - 2^4',
        answer: '19',
        hint: '7 * 5 = 35; 2^4 = 16.',
        solutionSteps: ['35 - 16', '19'],
      },
      {
        id: 'bo-m-9',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'medium',
        question: 'Evaluate: (45 - 15) / 5 + 6 * 4',
        answer: '30',
        hint: '30 / 5 = 6; 6 * 4 = 24.',
        solutionSteps: ['6 + 24', '30'],
      },
      {
        id: 'bo-m-10',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'medium',
        question: 'Evaluate: 5 * 4^2 - 10 * 3',
        answer: '50',
        hint: '4^2 = 16; 5 * 16 = 80; 10 * 3 = 30.',
        solutionSteps: ['80 - 30', '50'],
      },
    ],
    hard: [
      {
        id: 'bo-h-1',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'hard',
        question: 'Evaluate: 2 * [18 - (3 + 2)^2 / 5] + 9',
        answer: '35',
        hint: '(3 + 2)^2 = 25; 25 / 5 = 5; 18 - 5 = 13.',
        solutionSteps: ['2 * [18 - 5] + 9', '2 * 13 + 9', '26 + 9 = 35'],
      },
      {
        id: 'bo-h-2',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'hard',
        question: 'Evaluate: 144 / [3 * (6 - 2)] + 2^3 * 5',
        answer: '52',
        hint: '3 * 4 = 12; 144 / 12 = 12; 2^3 * 5 = 40.',
        solutionSteps: ['144 / 12 + 8 * 5', '12 + 40', '52'],
      },
      {
        id: 'bo-h-3',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'hard',
        question: 'Evaluate: 4 * (3^3 - 7) / 8 + (5^2 - 10)',
        answer: '25',
        hint: '3^3 = 27; 27 - 7 = 20; 4 * 20 / 8 = 10; 25 - 10 = 15.',
        solutionSteps: ['4 * 20 / 8 + 15', '10 + 15', '25'],
      },
      {
        id: 'bo-h-4',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'hard',
        question: 'Evaluate: 100 - 3 * [(12 - 8)^2 - 6] / 2',
        answer: '85',
        hint: '4^2 = 16; 16 - 6 = 10; 3 * 10 / 2 = 15.',
        solutionSteps: ['100 - 3 * 10 / 2', '100 - 15', '85'],
      },
      {
        id: 'bo-h-5',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'hard',
        question: 'Evaluate: (6^2 + 8^2) / 5 + 3 * (14 - 9)',
        answer: '35',
        hint: '36 + 64 = 100; 100 / 5 = 20; 3 * 5 = 15.',
        solutionSteps: ['100 / 5 + 15', '20 + 15', '35'],
      },
      {
        id: 'bo-h-6',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'hard',
        question: 'Evaluate: 5 * [2^4 - (9 - 3)] / 2 + 10',
        answer: '35',
        hint: '16 - 6 = 10; 5 * 10 / 2 = 25.',
        solutionSteps: ['5 * 10 / 2 + 10', '25 + 10', '35'],
      },
      {
        id: 'bo-h-7',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'hard',
        question: 'Evaluate: 250 / [5 * (12 - 7)] + 4^2 * 3',
        answer: '58',
        hint: '5 * 5 = 25; 250 / 25 = 10; 16 * 3 = 48.',
        solutionSteps: ['10 + 48', '58'],
      },
      {
        id: 'bo-h-8',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'hard',
        question: 'Evaluate: 3 * [4^3 / 16 + 2 * (7 - 4)]',
        answer: '30',
        hint: '64 / 16 = 4; 2 * 3 = 6; 4 + 6 = 10; 3 * 10 = 30.',
        solutionSteps: ['3 * (4 + 6)', '3 * 10', '30'],
      },
      {
        id: 'bo-h-9',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'hard',
        question: 'Evaluate: 80 - 2 * [3 * 4 + (15 - 5)^2 / 20]',
        answer: '46',
        hint: '10^2 = 100; 100 / 20 = 5; 12 + 5 = 17; 2 * 17 = 34.',
        solutionSteps: ['80 - 2 * (12 + 5)', '80 - 34', '46'],
      },
      {
        id: 'bo-h-10',
        topic: 'BODMAS / Order of Operations',
        difficulty: 'hard',
        question: 'Evaluate: [100 - (6 + 2)^2] / 6 + 5 * 4',
        answer: '26',
        hint: '8^2 = 64; 100 - 64 = 36; 36 / 6 = 6; 6 + 20 = 26.',
        solutionSteps: ['36 / 6 + 20', '6 + 20', '26'],
      },
    ],
  },

  'Percentages': {
    easy: [
      {
        id: 'pct-e-1',
        topic: 'Percentages',
        difficulty: 'easy',
        question: 'What is 10% of 150?',
        answer: '15',
        hint: '10% is 1/10th of 150.',
        solutionSteps: ['150 / 10 = 15'],
      },
      {
        id: 'pct-e-2',
        topic: 'Percentages',
        difficulty: 'easy',
        question: 'What is 50% of 86?',
        answer: '43',
        hint: '50% is half of 86.',
        solutionSteps: ['86 / 2 = 43'],
      },
      {
        id: 'pct-e-3',
        topic: 'Percentages',
        difficulty: 'easy',
        question: 'What is 25% of 80?',
        answer: '20',
        hint: '25% is one-fourth: 80 / 4.',
        solutionSteps: ['80 / 4 = 20'],
      },
      {
        id: 'pct-e-4',
        topic: 'Percentages',
        difficulty: 'easy',
        question: 'What is 20% of 90?',
        answer: '18',
        hint: '0.20 * 90 = 18.',
        solutionSteps: ['0.2 * 90 = 18'],
      },
      {
        id: 'pct-e-5',
        topic: 'Percentages',
        difficulty: 'easy',
        question: 'What is 5% of 200?',
        answer: '10',
        hint: '0.05 * 200 = 10.',
        solutionSteps: ['0.05 * 200 = 10'],
      },
      {
        id: 'pct-e-6',
        topic: 'Percentages',
        difficulty: 'easy',
        question: 'What is 100% of 37?',
        answer: '37',
        hint: '100% of any quantity is the quantity itself.',
        solutionSteps: ['1.0 * 37 = 37'],
      },
      {
        id: 'pct-e-7',
        topic: 'Percentages',
        difficulty: 'easy',
        question: 'What is 30% of 70?',
        answer: '21',
        hint: '0.30 * 70 = 21.',
        solutionSteps: ['0.3 * 70 = 21'],
      },
      {
        id: 'pct-e-8',
        topic: 'Percentages',
        difficulty: 'easy',
        question: 'What is 15% of 60?',
        answer: '9',
        hint: '10% is 6, 5% is 3. 6 + 3 = 9.',
        solutionSteps: ['0.15 * 60 = 9'],
      },
      {
        id: 'pct-e-9',
        topic: 'Percentages',
        difficulty: 'easy',
        question: 'What is 75% of 40?',
        answer: '30',
        hint: '3/4 of 40 = 30.',
        solutionSteps: ['30'],
      },
      {
        id: 'pct-e-10',
        topic: 'Percentages',
        difficulty: 'easy',
        question: 'What is 40% of 50?',
        answer: '20',
        hint: '0.40 * 50 = 20.',
        solutionSteps: ['0.4 * 50 = 20'],
      },
    ],
    medium: [
      {
        id: 'pct-m-1',
        topic: 'Percentages',
        difficulty: 'medium',
        question: 'What is 15% of 240?',
        answer: '36',
        hint: '0.15 * 240 = 36.',
        solutionSteps: ['0.15 * 240 = 36'],
      },
      {
        id: 'pct-m-2',
        topic: 'Percentages',
        difficulty: 'medium',
        question: 'A $60 jacket is on sale for 25% off. What is the sale price?',
        answer: '45',
        hint: 'Discount = 25% of 60 = 15. Sale price = 60 - 15.',
        solutionSteps: ['Discount = 15', 'Price = 60 - 15 = 45'],
      },
      {
        id: 'pct-m-3',
        topic: 'Percentages',
        difficulty: 'medium',
        question: 'If a price increases from $50 to $65, what is the percentage increase?',
        answer: '30',
        hint: 'Increase is 15. Divide 15 by original 50, then multiply by 100.',
        solutionSteps: ['15 / 50 = 0.30', '0.30 * 100 = 30%'],
      },
      {
        id: 'pct-m-4',
        topic: 'Percentages',
        difficulty: 'medium',
        question: 'What is 35% of 180?',
        answer: '63',
        hint: '0.35 * 180 = 63.',
        solutionSteps: ['0.35 * 180 = 63'],
      },
      {
        id: 'pct-m-5',
        topic: 'Percentages',
        difficulty: 'medium',
        question: 'A restaurant bill is $80. What is a 15% tip?',
        answer: '12',
        hint: '0.15 * 80 = 12.',
        solutionSteps: ['0.15 * 80 = 12'],
      },
      {
        id: 'pct-m-6',
        topic: 'Percentages',
        difficulty: 'medium',
        question: 'Out of 250 students, 60% play sports. How many play sports?',
        answer: '150',
        hint: '0.60 * 250 = 150.',
        solutionSteps: ['0.60 * 250 = 150'],
      },
      {
        id: 'pct-m-7',
        topic: 'Percentages',
        difficulty: 'medium',
        question: 'What is 45% of 300?',
        answer: '135',
        hint: '0.45 * 300 = 135.',
        solutionSteps: ['0.45 * 300 = 135'],
      },
      {
        id: 'pct-m-8',
        topic: 'Percentages',
        difficulty: 'medium',
        question: 'A phone costs $400. Sales tax is 8%. What is the total tax?',
        answer: '32',
        hint: '0.08 * 400 = 32.',
        solutionSteps: ['0.08 * 400 = 32'],
      },
      {
        id: 'pct-m-9',
        topic: 'Percentages',
        difficulty: 'medium',
        question: 'What is 12% of 250?',
        answer: '30',
        hint: '0.12 * 250 = 30.',
        solutionSteps: ['0.12 * 250 = 30'],
      },
      {
        id: 'pct-m-10',
        topic: 'Percentages',
        difficulty: 'medium',
        question: 'A store increases price by 20% on a $45 item. What is the new price?',
        answer: '54',
        hint: 'Increase is 0.20 * 45 = 9. New price = 45 + 9 = 54.',
        solutionSteps: ['45 + 9 = 54'],
      },
    ],
    hard: [
      {
        id: 'pct-h-1',
        topic: 'Percentages',
        difficulty: 'hard',
        question: 'After a 20% discount, an item costs $120. What was its original price?',
        answer: '150',
        hint: 'The sale price $120 represents 80% of the original: 120 / 0.80.',
        solutionSteps: ['0.80 * Original = 120', 'Original = 120 / 0.80 = 150'],
      },
      {
        id: 'pct-h-2',
        topic: 'Percentages',
        difficulty: 'hard',
        question: 'A price increased by 25% to $150. What was the original price?',
        answer: '120',
        hint: '1.25 * Original = 150. Original = 150 / 1.25.',
        solutionSteps: ['1.25 * Original = 150', 'Original = 150 / 1.25 = 120'],
      },
      {
        id: 'pct-h-3',
        topic: 'Percentages',
        difficulty: 'hard',
        question: 'An item is marked up 20%, then discounted by 20%. If original price was $100, what is the final price?',
        answer: '96',
        hint: '$100 + 20% = $120. $120 - 20% of 120 (24) = $96.',
        solutionSteps: ['100 * 1.20 = 120', '120 * 0.80 = 96'],
      },
      {
        id: 'pct-h-4',
        topic: 'Percentages',
        difficulty: 'hard',
        question: 'In a school of 800 students, 45% are boys. 60% of boys play football. How many boys play football?',
        answer: '216',
        hint: 'Boys = 0.45 * 800 = 360. Football = 0.60 * 360 = 216.',
        solutionSteps: ['Boys = 360', '0.60 * 360 = 216'],
      },
      {
        id: 'pct-h-5',
        topic: 'Percentages',
        difficulty: 'hard',
        question: 'If 35% of a number is 140, what is the number?',
        answer: '400',
        hint: '0.35 * x = 140. x = 140 / 0.35.',
        solutionSteps: ['x = 140 / 0.35 = 400'],
      },
      {
        id: 'pct-h-6',
        topic: 'Percentages',
        difficulty: 'hard',
        question: 'A salary of $50,000 increases by 10% in year 1 and 10% in year 2. What is the new salary?',
        answer: '60500',
        hint: 'Year 1: 50000 * 1.10 = 55000. Year 2: 55000 * 1.10 = 60500.',
        solutionSteps: ['55000 * 1.10 = 60500'],
      },
      {
        id: 'pct-h-7',
        topic: 'Percentages',
        difficulty: 'hard',
        question: 'What is 125% of 64?',
        answer: '80',
        hint: '1.25 * 64 = 80.',
        solutionSteps: ['1.25 * 64 = 80'],
      },
      {
        id: 'pct-h-8',
        topic: 'Percentages',
        difficulty: 'hard',
        question: 'After 15% tax, total bill is $92. What was the subtotal before tax?',
        answer: '80',
        hint: '1.15 * Subtotal = 92. Subtotal = 92 / 1.15.',
        solutionSteps: ['92 / 1.15 = 80'],
      },
      {
        id: 'pct-h-9',
        topic: 'Percentages',
        difficulty: 'hard',
        question: 'A test has 60 questions. A student scored 85%. How many questions did they answer correctly?',
        answer: '51',
        hint: '0.85 * 60 = 51.',
        solutionSteps: ['0.85 * 60 = 51'],
      },
      {
        id: 'pct-h-10',
        topic: 'Percentages',
        difficulty: 'hard',
        question: 'A car depreciates by 15% each year. If bought for $20,000, what is its value after 1 year?',
        answer: '17000',
        hint: '20000 * 0.85 = 17000.',
        solutionSteps: ['20000 * 0.85 = 17000'],
      },
    ],
  },

  'Pythagorean Theorem': {
    easy: [
      {
        id: 'py-e-1',
        topic: 'Pythagorean Theorem',
        difficulty: 'easy',
        question: 'Find hypotenuse c if legs are a = 3 and b = 4.',
        answer: '5',
        hint: '3² + 4² = 9 + 16 = 25. √25 = 5.',
        solutionSteps: ['c² = 3² + 4² = 25', 'c = 5'],
      },
      {
        id: 'py-e-2',
        topic: 'Pythagorean Theorem',
        difficulty: 'easy',
        question: 'Find hypotenuse c if legs are a = 6 and b = 8.',
        answer: '10',
        hint: '6² + 8² = 36 + 64 = 100. √100 = 10.',
        solutionSteps: ['c² = 100', 'c = 10'],
      },
      {
        id: 'py-e-3',
        topic: 'Pythagorean Theorem',
        difficulty: 'easy',
        question: 'Find hypotenuse c if legs are a = 5 and b = 12.',
        answer: '13',
        hint: '25 + 144 = 169. √169 = 13.',
        solutionSteps: ['c² = 169', 'c = 13'],
      },
      {
        id: 'py-e-4',
        topic: 'Pythagorean Theorem',
        difficulty: 'easy',
        question: 'If hypotenuse c = 10 and leg a = 6, find leg b.',
        answer: '8',
        hint: 'b² = 10² - 6² = 100 - 36 = 64.',
        solutionSteps: ['b² = 64', 'b = 8'],
      },
      {
        id: 'py-e-5',
        topic: 'Pythagorean Theorem',
        difficulty: 'easy',
        question: 'Find hypotenuse c if legs are a = 9 and b = 12.',
        answer: '15',
        hint: '81 + 144 = 225. √225 = 15.',
        solutionSteps: ['c² = 225', 'c = 15'],
      },
      {
        id: 'py-e-6',
        topic: 'Pythagorean Theorem',
        difficulty: 'easy',
        question: 'If hypotenuse c = 13 and leg b = 5, find leg a.',
        answer: '12',
        hint: 'a² = 169 - 25 = 144. √144 = 12.',
        solutionSteps: ['a² = 144', 'a = 12'],
      },
      {
        id: 'py-e-7',
        topic: 'Pythagorean Theorem',
        difficulty: 'easy',
        question: 'Find hypotenuse c if legs are a = 8 and b = 15.',
        answer: '17',
        hint: '64 + 225 = 289. √289 = 17.',
        solutionSteps: ['c² = 289', 'c = 17'],
      },
      {
        id: 'py-e-8',
        topic: 'Pythagorean Theorem',
        difficulty: 'easy',
        question: 'If hypotenuse c = 25 and leg a = 20, find leg b.',
        answer: '15',
        hint: '625 - 400 = 225. √225 = 15.',
        solutionSteps: ['b² = 225', 'b = 15'],
      },
      {
        id: 'py-e-9',
        topic: 'Pythagorean Theorem',
        difficulty: 'easy',
        question: 'If hypotenuse c = 17 and leg b = 8, find leg a.',
        answer: '15',
        hint: '289 - 64 = 225. √225 = 15.',
        solutionSteps: ['a² = 225', 'a = 15'],
      },
      {
        id: 'py-e-10',
        topic: 'Pythagorean Theorem',
        difficulty: 'easy',
        question: 'Find hypotenuse c if legs are a = 12 and b = 16.',
        answer: '20',
        hint: '144 + 256 = 400. √400 = 20.',
        solutionSteps: ['c² = 400', 'c = 20'],
      },
    ],
    medium: [
      {
        id: 'py-m-1',
        topic: 'Pythagorean Theorem',
        difficulty: 'medium',
        question: 'Find hypotenuse c if legs are a = 7 and b = 24.',
        answer: '25',
        hint: '49 + 576 = 625. √625 = 25.',
        solutionSteps: ['c² = 625', 'c = 25'],
      },
      {
        id: 'py-m-2',
        topic: 'Pythagorean Theorem',
        difficulty: 'medium',
        question: 'If c = 25 and a = 7, find leg b.',
        answer: '24',
        hint: 'b² = 625 - 49 = 576. √576 = 24.',
        solutionSteps: ['b² = 576', 'b = 24'],
      },
      {
        id: 'py-m-3',
        topic: 'Pythagorean Theorem',
        difficulty: 'medium',
        question: 'Find the diagonal of a rectangle with length 12 and width 5.',
        answer: '13',
        hint: 'The diagonal forms a right triangle with sides 12 and 5.',
        solutionSteps: ['d² = 12² + 5² = 169', 'd = 13'],
      },
      {
        id: 'py-m-4',
        topic: 'Pythagorean Theorem',
        difficulty: 'medium',
        question: 'A 15m ladder reaches a window 12m high. How far is the base from the wall?',
        answer: '9',
        hint: 'b² = 15² - 12² = 225 - 144 = 81.',
        solutionSteps: ['b² = 81', 'b = 9'],
      },
      {
        id: 'py-m-5',
        topic: 'Pythagorean Theorem',
        difficulty: 'medium',
        question: 'Find hypotenuse c if legs are a = 10 and b = 24.',
        answer: '26',
        hint: '100 + 576 = 676. √676 = 26.',
        solutionSteps: ['c² = 676', 'c = 26'],
      },
      {
        id: 'py-m-6',
        topic: 'Pythagorean Theorem',
        difficulty: 'medium',
        question: 'Find the diagonal of a rectangle with length 16 and width 12.',
        answer: '20',
        hint: '16² + 12² = 256 + 144 = 400. √400 = 20.',
        solutionSteps: ['d² = 400', 'd = 20'],
      },
      {
        id: 'py-m-7',
        topic: 'Pythagorean Theorem',
        difficulty: 'medium',
        question: 'Find hypotenuse c if legs are a = 20 and b = 21.',
        answer: '29',
        hint: '400 + 441 = 841. √841 = 29.',
        solutionSteps: ['c² = 841', 'c = 29'],
      },
      {
        id: 'py-m-8',
        topic: 'Pythagorean Theorem',
        difficulty: 'medium',
        question: 'If c = 29 and b = 21, find leg a.',
        answer: '20',
        hint: '841 - 441 = 400. √400 = 20.',
        solutionSteps: ['a² = 400', 'a = 20'],
      },
      {
        id: 'py-m-9',
        topic: 'Pythagorean Theorem',
        difficulty: 'medium',
        question: 'A person walks 9 km North and 12 km East. How far are they from the start?',
        answer: '15',
        hint: 'd² = 9² + 12² = 81 + 144 = 225. √225 = 15.',
        solutionSteps: ['d = 15 km'],
      },
      {
        id: 'py-m-10',
        topic: 'Pythagorean Theorem',
        difficulty: 'medium',
        question: 'If hypotenuse c = 26 and a = 10, find leg b.',
        answer: '24',
        hint: '676 - 100 = 576. √576 = 24.',
        solutionSteps: ['b² = 576', 'b = 24'],
      },
    ],
    hard: [
      {
        id: 'py-h-1',
        topic: 'Pythagorean Theorem',
        difficulty: 'hard',
        question: 'An equilateral triangle has side length 10. What is its exact height squared (h²)?',
        answer: '75',
        hint: 'Height splits base into 5 and 5. h² = 10² - 5² = 100 - 25 = 75.',
        solutionSteps: ['h² = 100 - 25 = 75'],
      },
      {
        id: 'py-h-2',
        topic: 'Pythagorean Theorem',
        difficulty: 'hard',
        question: 'Find the 3D space diagonal of a rectangular box with dimensions 3, 4, and 12.',
        answer: '13',
        hint: 'd² = 3² + 4² + 12² = 9 + 16 + 144 = 169. √169 = 13.',
        solutionSteps: ['d² = 9 + 16 + 144 = 169', 'd = 13'],
      },
      {
        id: 'py-h-3',
        topic: 'Pythagorean Theorem',
        difficulty: 'hard',
        question: 'A 25m wire connects top of a 24m pole to ground. How far is wire anchored from pole base?',
        answer: '7',
        hint: 'b² = 25² - 24² = 625 - 576 = 49. √49 = 7.',
        solutionSteps: ['b² = 49', 'b = 7'],
      },
      {
        id: 'py-h-4',
        topic: 'Pythagorean Theorem',
        difficulty: 'hard',
        question: 'Find the diagonal of a square with perimeter 40. (Give d²)',
        answer: '200',
        hint: 'Side = 40 / 4 = 10. d² = 10² + 10² = 200.',
        solutionSteps: ['Side = 10', 'd² = 100 + 100 = 200'],
      },
      {
        id: 'py-h-5',
        topic: 'Pythagorean Theorem',
        difficulty: 'hard',
        question: 'A ship sails 11 km South and 60 km West. How far is it from origin?',
        answer: '61',
        hint: '11² + 60² = 121 + 3600 = 3721. √3721 = 61.',
        solutionSteps: ['d² = 3721', 'd = 61'],
      },
      {
        id: 'py-h-6',
        topic: 'Pythagorean Theorem',
        difficulty: 'hard',
        question: 'Find the hypotenuse c if a = 15 and b = 36.',
        answer: '39',
        hint: '225 + 1296 = 1521. √1521 = 39.',
        solutionSteps: ['c² = 1521', 'c = 39'],
      },
      {
        id: 'py-h-7',
        topic: 'Pythagorean Theorem',
        difficulty: 'hard',
        question: 'Find 3D diagonal of a cube with side length 4. (Give d²)',
        answer: '48',
        hint: 'd² = 4² + 4² + 4² = 16 + 16 + 16 = 48.',
        solutionSteps: ['d² = 48'],
      },
      {
        id: 'py-h-8',
        topic: 'Pythagorean Theorem',
        difficulty: 'hard',
        question: 'An isosceles triangle has base 16 and congruent sides 17. Find its height.',
        answer: '15',
        hint: 'Half base is 8. h² = 17² - 8² = 289 - 64 = 225. √225 = 15.',
        solutionSteps: ['h² = 225', 'h = 15'],
      },
      {
        id: 'py-h-9',
        topic: 'Pythagorean Theorem',
        difficulty: 'hard',
        question: 'If c = 65 and a = 25, find leg b.',
        answer: '60',
        hint: '65² - 25² = 4225 - 625 = 3600. √3600 = 60.',
        solutionSteps: ['b² = 3600', 'b = 60'],
      },
      {
        id: 'py-h-10',
        topic: 'Pythagorean Theorem',
        difficulty: 'hard',
        question: 'Find hypotenuse c if legs are a = 28 and b = 96.',
        answer: '100',
        hint: '28² + 96² = 784 + 9216 = 10000. √10000 = 100.',
        solutionSteps: ['c² = 10000', 'c = 100'],
      },
    ],
  },

  'Mean': {
    easy: [
      {
        id: 'mn-e-1',
        topic: 'Mean',
        difficulty: 'easy',
        question: 'Find the mean of: 10, 20, 30',
        answer: '20',
        hint: 'Sum is 60. Divide by 3.',
        solutionSteps: ['10 + 20 + 30 = 60', '60 / 3 = 20'],
      },
      {
        id: 'mn-e-2',
        topic: 'Mean',
        difficulty: 'easy',
        question: 'Find the mean of: 4, 8, 12',
        answer: '8',
        hint: 'Sum is 24. Divide by 3.',
        solutionSteps: ['24 / 3 = 8'],
      },
      {
        id: 'mn-e-3',
        topic: 'Mean',
        difficulty: 'easy',
        question: 'Find the mean of: 2, 4, 6, 8',
        answer: '5',
        hint: 'Sum is 20. Divide by 4.',
        solutionSteps: ['20 / 4 = 5'],
      },
      {
        id: 'mn-e-4',
        topic: 'Mean',
        difficulty: 'easy',
        question: 'Find the mean of: 15, 25',
        answer: '20',
        hint: '40 / 2 = 20.',
        solutionSteps: ['40 / 2 = 20'],
      },
      {
        id: 'mn-e-5',
        topic: 'Mean',
        difficulty: 'easy',
        question: 'Find the mean of: 7, 7, 7, 7',
        answer: '7',
        hint: 'Identical numbers have a mean equal to that number.',
        solutionSteps: ['7'],
      },
      {
        id: 'mn-e-6',
        topic: 'Mean',
        difficulty: 'easy',
        question: 'Find the mean of: 1, 3, 5, 7, 9',
        answer: '5',
        hint: 'Sum is 25. Divide by 5.',
        solutionSteps: ['25 / 5 = 5'],
      },
      {
        id: 'mn-e-7',
        topic: 'Mean',
        difficulty: 'easy',
        question: 'Find the mean of: 50, 70, 90',
        answer: '70',
        hint: 'Sum is 210. 210 / 3 = 70.',
        solutionSteps: ['210 / 3 = 70'],
      },
      {
        id: 'mn-e-8',
        topic: 'Mean',
        difficulty: 'easy',
        question: 'Find the mean of: 12, 14, 16',
        answer: '14',
        hint: '42 / 3 = 14.',
        solutionSteps: ['42 / 3 = 14'],
      },
      {
        id: 'mn-e-9',
        topic: 'Mean',
        difficulty: 'easy',
        question: 'Find the mean of: 100, 200, 300, 400',
        answer: '250',
        hint: 'Sum is 1000. 1000 / 4 = 250.',
        solutionSteps: ['1000 / 4 = 250'],
      },
      {
        id: 'mn-e-10',
        topic: 'Mean',
        difficulty: 'easy',
        question: 'Find the mean of: 6, 9, 15',
        answer: '10',
        hint: 'Sum is 30. 30 / 3 = 10.',
        solutionSteps: ['30 / 3 = 10'],
      },
    ],
    medium: [
      {
        id: 'mn-m-1',
        topic: 'Mean',
        difficulty: 'medium',
        question: 'Find the mean of: 14, 18, 22, 26, 30',
        answer: '22',
        hint: 'Sum = 110. Divide by 5.',
        solutionSteps: ['110 / 5 = 22'],
      },
      {
        id: 'mn-m-2',
        topic: 'Mean',
        difficulty: 'medium',
        question: 'A student scored 75, 80, and 85 on 3 tests. What is the mean score?',
        answer: '80',
        hint: '240 / 3 = 80.',
        solutionSteps: ['240 / 3 = 80'],
      },
      {
        id: 'mn-m-3',
        topic: 'Mean',
        difficulty: 'medium',
        question: 'A student scored 70, 80, and 90. What score is needed on test 4 for an average of 85?',
        answer: '100',
        hint: 'Target sum for 4 tests = 4 * 85 = 340. Current sum = 240. Needed = 340 - 240.',
        solutionSteps: ['340 - 240 = 100'],
      },
      {
        id: 'mn-m-4',
        topic: 'Mean',
        difficulty: 'medium',
        question: 'Find the mean of: 5, 8, 12, 15, 0',
        answer: '8',
        hint: 'Remember to count 0! Sum = 40. Count = 5. 40 / 5 = 8.',
        solutionSteps: ['40 / 5 = 8'],
      },
      {
        id: 'mn-m-5',
        topic: 'Mean',
        difficulty: 'medium',
        question: 'The mean of 4 numbers is 15. What is their total sum?',
        answer: '60',
        hint: 'Sum = Mean * Count = 15 * 4.',
        solutionSteps: ['15 * 4 = 60'],
      },
      {
        id: 'mn-m-6',
        topic: 'Mean',
        difficulty: 'medium',
        question: 'Find the mean of: 11, 13, 17, 19',
        answer: '15',
        hint: 'Sum = 60. 60 / 4 = 15.',
        solutionSteps: ['60 / 4 = 15'],
      },
      {
        id: 'mn-m-7',
        topic: 'Mean',
        difficulty: 'medium',
        question: 'Five numbers have a mean of 12. If four of the numbers are 8, 10, 14, 16, what is the fifth number?',
        answer: '12',
        hint: 'Total sum = 60. Current sum = 48. 60 - 48 = 12.',
        solutionSteps: ['60 - 48 = 12'],
      },
      {
        id: 'mn-m-8',
        topic: 'Mean',
        difficulty: 'medium',
        question: 'Find the mean of: 25, 35, 45, 55',
        answer: '40',
        hint: 'Sum = 160. 160 / 4 = 40.',
        solutionSteps: ['160 / 4 = 40'],
      },
      {
        id: 'mn-m-9',
        topic: 'Mean',
        difficulty: 'medium',
        question: 'Daily temperatures were 20, 22, 24, 26, 28. What was the average temperature?',
        answer: '24',
        hint: '120 / 5 = 24.',
        solutionSteps: ['120 / 5 = 24'],
      },
      {
        id: 'mn-m-10',
        topic: 'Mean',
        difficulty: 'medium',
        question: 'Three numbers have a mean of 25. If two numbers are 20 and 30, what is the third number?',
        answer: '25',
        hint: 'Total needed = 75. 75 - 50 = 25.',
        solutionSteps: ['75 - 50 = 25'],
      },
    ],
    hard: [
      {
        id: 'mn-h-1',
        topic: 'Mean',
        difficulty: 'hard',
        question: 'The mean of 6 numbers is 20. If 35 is removed, what is the mean of the remaining 5 numbers?',
        answer: '17',
        hint: 'Original sum = 6 * 20 = 120. New sum = 120 - 35 = 85. 85 / 5 = 17.',
        solutionSteps: ['New sum = 85', '85 / 5 = 17'],
      },
      {
        id: 'mn-h-2',
        topic: 'Mean',
        difficulty: 'hard',
        question: 'The mean score of 10 students is 80. When a new student joins with score 91, what is the new mean?',
        answer: '81',
        hint: 'Original total = 800. New total = 891. 891 / 11 = 81.',
        solutionSteps: ['891 / 11 = 81'],
      },
      {
        id: 'mn-h-3',
        topic: 'Mean',
        difficulty: 'hard',
        question: 'In a class of 20 boys (mean score 70) and 30 girls (mean score 80), what is the combined mean score?',
        answer: '76',
        hint: 'Total score = (20 * 70) + (30 * 80) = 1400 + 2400 = 3800. Total students = 50. 3800 / 50 = 76.',
        solutionSteps: ['3800 / 50 = 76'],
      },
      {
        id: 'mn-h-4',
        topic: 'Mean',
        difficulty: 'hard',
        question: 'The mean of 8 numbers is 14. If each number is multiplied by 3, what is the new mean?',
        answer: '42',
        hint: 'Multiplying every value by k multiplies the mean by k: 14 * 3 = 42.',
        solutionSteps: ['14 * 3 = 42'],
      },
      {
        id: 'mn-h-5',
        topic: 'Mean',
        difficulty: 'hard',
        question: 'The mean of 7 numbers is 24. If two numbers with sum 48 are removed, what is the mean of the remaining 5 numbers?',
        answer: '24',
        hint: 'Total sum = 7 * 24 = 168. New sum = 168 - 48 = 120. 120 / 5 = 24.',
        solutionSteps: ['120 / 5 = 24'],
      },
      {
        id: 'mn-h-6',
        topic: 'Mean',
        difficulty: 'hard',
        question: 'Five integers have a mean of 10. The smallest is 6 and the largest is 18. What is the sum of the middle three integers?',
        answer: '26',
        hint: 'Total sum = 50. Sum of extremes = 6 + 18 = 24. Remaining = 50 - 24 = 26.',
        solutionSteps: ['50 - 24 = 26'],
      },
      {
        id: 'mn-h-7',
        topic: 'Mean',
        difficulty: 'hard',
        question: 'The mean of 4 numbers is 25. If a fifth number 50 is added, what is the new mean?',
        answer: '30',
        hint: 'Old sum = 100. New sum = 150. 150 / 5 = 30.',
        solutionSteps: ['150 / 5 = 30'],
      },
      {
        id: 'mn-h-8',
        topic: 'Mean',
        difficulty: 'hard',
        question: 'A batsman has a mean score of 45 in 9 matches. How many runs must he score in match 10 to raise his average to 50?',
        answer: '95',
        hint: 'Total needed for 10 matches = 500. Current total = 9 * 45 = 405. 500 - 405 = 95.',
        solutionSteps: ['500 - 405 = 95'],
      },
      {
        id: 'mn-h-9',
        topic: 'Mean',
        difficulty: 'hard',
        question: 'The mean of x, x+2, x+4, x+6, x+8 is 20. What is x?',
        answer: '16',
        hint: 'The mean of symmetric terms is the middle term: x + 4 = 20 => x = 16.',
        solutionSteps: ['x + 4 = 20', 'x = 16'],
      },
      {
        id: 'mn-h-10',
        topic: 'Mean',
        difficulty: 'hard',
        question: 'The mean of 5 numbers is 18. If one number is changed from 12 to 22, what is the new mean?',
        answer: '20',
        hint: 'The sum increases by 10. Increase in mean = 10 / 5 = 2. 18 + 2 = 20.',
        solutionSteps: ['18 + 2 = 20'],
      },
    ],
  },
};

// Helper to find a topic in TOPIC_DATA by name, ID, or substring
function findCurriculumTopic(topicName: string) {
  const norm = topicName.trim().toLowerCase();
  // 1. Direct ID match
  if (TOPIC_DATA[norm]) return TOPIC_DATA[norm];

  // 2. Slug match
  const slug = norm.replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  if (TOPIC_DATA[slug]) return TOPIC_DATA[slug];

  // 3. Search across all topics in TOPIC_DATA
  for (const [id, topic] of Object.entries(TOPIC_DATA)) {
    const tTitle = topic.title.toLowerCase();
    if (tTitle === norm || tTitle.includes(norm) || norm.includes(tTitle) || id === slug) {
      return topic;
    }
  }

  // 4. Search in MATH_CATEGORIES registry
  for (const cat of MATH_CATEGORIES) {
    for (const t of cat.topics) {
      if (t.name.toLowerCase() === norm || t.id === slug || t.name.toLowerCase().includes(norm)) {
        if (TOPIC_DATA[t.id]) return TOPIC_DATA[t.id];
      }
    }
  }

  return null;
}

// Generates topic-grounded supplementary practice problems
function generateTopicVariations(
  topicName: string,
  category: string,
  difficulty: 'easy' | 'medium' | 'hard',
  neededCount: number
): PracticeBankProblem[] {
  const norm = topicName.toLowerCase();
  const catNorm = category.toLowerCase();
  const results: PracticeBankProblem[] = [];

  // Domain-specific generator banks
  if (catNorm.includes('calculus') || norm.includes('derivative') || norm.includes('limit') || norm.includes('integral')) {
    const calcPool = [
      { q: 'Evaluate \\lim_{x \\to 2} (4x^2 - 3x + 5)', a: '15', h: 'Direct substitution: 4(4) - 6 + 5.', s: ['4(4) - 3(2) + 5 = 16 - 6 + 5 = 15'] },
      { q: 'Find the derivative of f(x) = 5x^3 - 2x^2 at x = 1', a: '11', h: 'f\'(x) = 15x^2 - 4x. Substitute x = 1.', s: ['f\'(x) = 15x^2 - 4x', 'f\'(1) = 15 - 4 = 11'] },
      { q: 'Evaluate the definite integral \\int_0^3 2x\\,dx', a: '9', h: 'Antiderivative is x^2. 3^2 - 0^2.', s: ['[x^2]_0^3 = 9 - 0 = 9'] },
      { q: 'Find the critical point of f(x) = x^2 - 10x + 7', a: '5', h: 'Set f\'(x) = 2x - 10 = 0.', s: ['2x - 10 = 0 \\implies x = 5'] },
      { q: 'What is the slope of the tangent line to y = x^3 at x = 2?', a: '12', h: 'y\' = 3x^2. 3(4) = 12.', s: ['y\' = 3x^2', 'y\'(2) = 3(4) = 12'] },
      { q: 'Evaluate \\lim_{x \\to 0} \\frac{8x}{2x}', a: '4', h: 'Cancel common factor x.', s: ['8/2 = 4'] },
      { q: 'Evaluate \\int (4x + 1)\\,dx at x = 2 (omit constant C)', a: '10', h: '2x^2 + x at x = 2: 2(4) + 2 = 10.', s: ['2(4) + 2 = 10'] },
      { q: 'If f(x) = 3x^2 + 1, find f(4)', a: '49', h: '3(16) + 1 = 49.', s: ['3(16) + 1 = 49'] },
      { q: 'Evaluate \\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}', a: '6', h: 'Factor x^2 - 9 = (x - 3)(x + 3).', s: ['x + 3 = 6'] },
      { q: 'What is the second derivative f\'\'(x) of f(x) = x^3 at x = 4?', a: '24', h: 'f\'(x) = 3x^2, f\'\'(x) = 6x. 6(4) = 24.', s: ['6(4) = 24'] },
    ];
    for (let i = 0; i < neededCount; i++) {
      const item = calcPool[i % calcPool.length];
      results.push({
        id: `gen-calc-${i + 1}`,
        topic: topicName,
        difficulty,
        question: item.q,
        answer: item.a,
        hint: item.h,
        solutionSteps: item.s,
      });
    }
  } else if (catNorm.includes('trig') || norm.includes('sine') || norm.includes('cosine') || norm.includes('tangent')) {
    const trigPool = [
      { q: 'What is the exact value of \\sin(30^\\circ)?', a: '0.5', h: '\\sin(30^\\circ) = 1/2 = 0.5.', s: ['\\sin(30^\\circ) = 1/2 = 0.5'] },
      { q: 'In a right triangle, hypotenuse = 10 and opposite = 6. What is \\sin(\\theta)?', a: '0.6', h: 'Opposite / Hypotenuse = 6 / 10 = 0.6.', s: ['6 / 10 = 0.6'] },
      { q: 'What is \\tan(45^\\circ)?', a: '1', h: '\\tan(45^\\circ) = \\sin(45^\\circ)/\\cos(45^\\circ) = 1.', s: ['\\tan(45^\\circ) = 1'] },
      { q: 'What is the value of \\sin^2(35^\\circ) + \\cos^2(35^\\circ)?', a: '1', h: 'Pythagorean identity: \\sin^2(\\theta) + \\cos^2(\\theta) = 1.', s: ['Always equals 1 by Pythagorean identity'] },
      { q: 'If \\cos(\\theta) = 0.8, what is the adjacent side if hypotenuse is 15?', a: '12', h: 'Adjacent = 15 * 0.8 = 12.', s: ['15 * 0.8 = 12'] },
      { q: 'A 20 m flagpole casts a shadow of 20 m. What is angle of elevation in degrees?', a: '45', h: '\\tan(\\theta) = 20 / 20 = 1 \\implies \\theta = 45^\\circ.', s: ['\\theta = 45^\\circ'] },
      { q: 'What is \\cos(60^\\circ)?', a: '0.5', h: '\\cos(60^\\circ) = 1/2 = 0.5.', s: ['\\cos(60^\\circ) = 0.5'] },
      { q: 'If \\tan(\\theta) = 3/4, what is the length of opposite side if adjacent is 12?', a: '9', h: 'Opposite = 12 * (3/4) = 9.', s: ['Opposite = 9'] },
    ];
    for (let i = 0; i < neededCount; i++) {
      const item = trigPool[i % trigPool.length];
      results.push({
        id: `gen-trig-${i + 1}`,
        topic: topicName,
        difficulty,
        question: item.q,
        answer: item.a,
        hint: item.h,
        solutionSteps: item.s,
      });
    }
  } else if (catNorm.includes('geometry') || norm.includes('triangle') || norm.includes('circle') || norm.includes('area') || norm.includes('volume')) {
    const geomPool = [
      { q: 'Find the area of a triangle with base 14 cm and height 8 cm.', a: '56', h: 'Area = (1/2) * base * height = 0.5 * 14 * 8.', s: ['0.5 * 14 * 8 = 56 cm²'] },
      { q: 'Find the perimeter of a rectangle with length 15 and width 9.', a: '48', h: 'P = 2(l + w) = 2(24) = 48.', s: ['2(15 + 9) = 48'] },
      { q: 'A circle has diameter 14 cm. What is its radius in cm?', a: '7', h: 'Radius = diameter / 2 = 14 / 2 = 7.', s: ['r = 7 cm'] },
      { q: 'Two complementary angles sum to 90°. If one angle is 37°, find the other.', a: '53', h: '90 - 37 = 53°.', s: ['90 - 37 = 53°'] },
      { q: 'Find the volume of a rectangular prism with length 6, width 4, and height 5.', a: '120', h: 'V = l * w * h = 6 * 4 * 5.', s: ['6 * 4 * 5 = 120'] },
      { q: 'In right triangle, legs are 9 and 12. Find hypotenuse.', a: '15', h: 'c = \\sqrt{9^2 + 12^2} = \\sqrt{81 + 144} = \\sqrt{225} = 15.', s: ['c = 15'] },
      { q: 'Find the area of a square whose perimeter is 36 cm.', a: '81', h: 'Side = 36 / 4 = 9 cm. Area = 9^2 = 81.', s: ['Side = 9', 'Area = 81 cm²'] },
      { q: 'The interior angles of a triangle sum to how many degrees?', a: '180', h: 'Every Euclidean triangle has angle sum 180°.', s: ['180°'] },
    ];
    for (let i = 0; i < neededCount; i++) {
      const item = geomPool[i % geomPool.length];
      results.push({
        id: `gen-geom-${i + 1}`,
        topic: topicName,
        difficulty,
        question: item.q,
        answer: item.a,
        hint: item.h,
        solutionSteps: item.s,
      });
    }
  } else if (catNorm.includes('coord') || norm.includes('slope') || norm.includes('midpoint') || norm.includes('distance')) {
    const coordPool = [
      { q: 'Find the slope of line passing through (2, 3) and (6, 11).', a: '2', h: 'm = (11 - 3) / (6 - 2) = 8 / 4 = 2.', s: ['m = 8 / 4 = 2'] },
      { q: 'Find the distance between (0, 0) and (6, 8).', a: '10', h: 'd = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10.', s: ['d = 10'] },
      { q: 'Find the x-coordinate of midpoint between (2, 8) and (10, 4).', a: '6', h: 'x_m = (2 + 10) / 2 = 6.', s: ['(2 + 10) / 2 = 6'] },
      { q: 'What is the y-intercept of the line y = 3x - 7?', a: '-7', h: 'In y = mx + c, the y-intercept is c = -7.', s: ['c = -7'] },
      { q: 'Find the slope of the line parallel to y = 5x + 9.', a: '5', h: 'Parallel lines have identical slopes.', s: ['m = 5'] },
      { q: 'What quadrant contains the point (-4, 7)?', a: '2', h: 'Negative x, positive y is Quadrant II (2).', s: ['Quadrant 2'] },
      { q: 'Find distance between (1, 2) and (4, 6).', a: '5', h: '\\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = 5.', s: ['d = 5'] },
      { q: 'Find the y-coordinate of midpoint between (3, -2) and (7, 10).', a: '4', h: 'y_m = (-2 + 10) / 2 = 4.', s: ['4'] },
    ];
    for (let i = 0; i < neededCount; i++) {
      const item = coordPool[i % coordPool.length];
      results.push({
        id: `gen-coord-${i + 1}`,
        topic: topicName,
        difficulty,
        question: item.q,
        answer: item.a,
        hint: item.h,
        solutionSteps: item.s,
      });
    }
  } else if (catNorm.includes('stat') || norm.includes('probability') || norm.includes('median') || norm.includes('mode')) {
    const statPool = [
      { q: 'Find the median of: 3, 7, 9, 15, 21', a: '9', h: 'The middle value when sorted is 9.', s: ['Median = 9'] },
      { q: 'Find the range of dataset: 12, 5, 29, 18, 3', a: '26', h: 'Max - Min = 29 - 3 = 26.', s: ['29 - 3 = 26'] },
      { q: 'What is probability of rolling an even number on a standard 6-sided die? (as decimal)', a: '0.5', h: '3 even numbers {2, 4, 6} out of 6 outcomes = 3/6 = 0.5.', s: ['3 / 6 = 0.5'] },
      { q: 'Find the mode of numbers: 4, 6, 8, 6, 2, 6, 9', a: '6', h: '6 appears most frequently (3 times).', s: ['Mode = 6'] },
      { q: 'What is the mean of 15, 25, 35, 45?', a: '30', h: 'Sum = 120. 120 / 4 = 30.', s: ['120 / 4 = 30'] },
      { q: 'What is probability of flipping heads on a fair coin? (as decimal)', a: '0.5', h: '1 outcome out of 2 = 1/2 = 0.5.', s: ['0.5'] },
      { q: 'If probability of event A is 0.35, what is probability of NOT A?', a: '0.65', h: 'P(not A) = 1 - 0.35 = 0.65.', s: ['1 - 0.35 = 0.65'] },
    ];
    for (let i = 0; i < neededCount; i++) {
      const item = statPool[i % statPool.length];
      results.push({
        id: `gen-stat-${i + 1}`,
        topic: topicName,
        difficulty,
        question: item.q,
        answer: item.a,
        hint: item.h,
        solutionSteps: item.s,
      });
    }
  } else if (catNorm.includes('arithmetic') || norm.includes('fraction') || norm.includes('decimal') || norm.includes('percentage') || norm.includes('ratio')) {
    const arithPool = [
      { q: 'Evaluate: \\frac{3}{5} + \\frac{1}{5}', a: '4/5', h: 'Common denominator 5: 3 + 1 = 4.', s: ['4/5'] },
      { q: 'What is 25% of 160?', a: '40', h: '0.25 * 160 = 40.', s: ['40'] },
      { q: 'Simplify ratio 18:24 to lowest terms. What is the second term?', a: '4', h: 'Divide both by 6: 3:4. Second term is 4.', s: ['18/6 = 3, 24/6 = 4'] },
      { q: 'Evaluate: 18 - 3 \\times 4 + 2', a: '8', h: 'Multiply first: 3 * 4 = 12. 18 - 12 + 2 = 8.', s: ['18 - 12 + 2 = 8'] },
      { q: 'What is the LCM of 6 and 8?', a: '24', h: 'Multiples of 8: 8, 16, 24. 24 is divisible by 6.', s: ['LCM = 24'] },
      { q: 'What is the HCF (GCD) of 36 and 48?', a: '12', h: 'Largest common factor is 12.', s: ['HCF = 12'] },
      { q: 'Convert 0.75 to a simplified fraction. What is the denominator?', a: '4', h: '0.75 = 3/4. Denominator is 4.', s: ['3/4 => denominator 4'] },
      { q: 'Evaluate: (-8) \\times (-5)', a: '40', h: 'Negative times negative is positive.', s: ['+40'] },
    ];
    for (let i = 0; i < neededCount; i++) {
      const item = arithPool[i % arithPool.length];
      results.push({
        id: `gen-arith-${i + 1}`,
        topic: topicName,
        difficulty,
        question: item.q,
        answer: item.a,
        hint: item.h,
        solutionSteps: item.s,
      });
    }
  } else {
    // Algebra pool
    const algPool = [
      { q: 'Solve for x: 3x + 7 = 28', a: '7', h: 'Subtract 7: 3x = 21. x = 7.', s: ['3x = 21', 'x = 7'] },
      { q: 'Solve for x: 5(x - 2) = 30', a: '8', h: 'x - 2 = 6 \\implies x = 8.', s: ['x - 2 = 6', 'x = 8'] },
      { q: 'Evaluate 2a^2 - 3 when a = 4', a: '29', h: '2(16) - 3 = 32 - 3 = 29.', s: ['2(16) - 3 = 29'] },
      { q: 'Solve for y: 4y - 9 = 2y + 11', a: '10', h: '2y = 20 \\implies y = 10.', s: ['2y = 20', 'y = 10'] },
      { q: 'Simplify: 2^3 \\times 2^4 = 2^k. What is k?', a: '7', h: 'Add exponents: 3 + 4 = 7.', s: ['k = 7'] },
      { q: 'Factor x^2 - 16 = (x - 4)(x + k). What is k?', a: '4', h: 'Difference of squares: (x - 4)(x + 4).', s: ['k = 4'] },
      { q: 'Solve quadratic: x^2 - 9 = 0. What is positive root?', a: '3', h: 'x^2 = 9 \\implies x = 3.', s: ['x = 3'] },
      { q: 'Solve for x: x / 5 + 3 = 10', a: '35', h: 'x / 5 = 7 \\implies x = 35.', s: ['x = 35'] },
    ];
    for (let i = 0; i < neededCount; i++) {
      const item = algPool[i % algPool.length];
      results.push({
        id: `gen-alg-${i + 1}`,
        topic: topicName,
        difficulty,
        question: item.q,
        answer: item.a,
        hint: item.h,
        solutionSteps: item.s,
      });
    }
  }

  return results;
}

// Complete 10-problem builder ensuring every topic has 10 authentic, topic-grounded problems
export function getProblemsForTopicAndDifficulty(
  topicName: string,
  difficulty: 'easy' | 'medium' | 'hard'
): PracticeBankProblem[] {
  // 1. Check exact custom bank match in PRACTICE_PROBLEM_BANK
  if (PRACTICE_PROBLEM_BANK[topicName] && PRACTICE_PROBLEM_BANK[topicName][difficulty]) {
    return PRACTICE_PROBLEM_BANK[topicName][difficulty];
  }

  // 2. Check partial key match in PRACTICE_PROBLEM_BANK
  for (const key of Object.keys(PRACTICE_PROBLEM_BANK)) {
    if (topicName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(topicName.toLowerCase())) {
      return PRACTICE_PROBLEM_BANK[key][difficulty];
    }
  }

  // 3. Extract verified problems from TOPIC_DATA
  const topicData = findCurriculumTopic(topicName);
  const collectedProblems: PracticeBankProblem[] = [];

  if (topicData) {
    const rawPractice = topicData.practice;

    if (difficulty === 'easy') {
      rawPractice.easy.forEach((q, i) => {
        collectedProblems.push({
          id: `${topicData.id}-e-${i + 1}`,
          topic: topicData.title,
          difficulty: 'easy',
          question: q.question,
          answer: q.answer,
          hint: q.hint,
          solutionSteps: q.solutionSteps,
        });
      });
      // Add first medium problem as easy-transitional
      if (rawPractice.medium.length > 0) {
        const q = rawPractice.medium[0];
        collectedProblems.push({
          id: `${topicData.id}-e-trans-1`,
          topic: topicData.title,
          difficulty: 'easy',
          question: q.question,
          answer: q.answer,
          hint: q.hint,
          solutionSteps: q.solutionSteps,
        });
      }
    } else if (difficulty === 'medium') {
      rawPractice.medium.forEach((q, i) => {
        collectedProblems.push({
          id: `${topicData.id}-m-${i + 1}`,
          topic: topicData.title,
          difficulty: 'medium',
          question: q.question,
          answer: q.answer,
          hint: q.hint,
          solutionSteps: q.solutionSteps,
        });
      });
      if (rawPractice.easy.length > 1) {
        const q = rawPractice.easy[1];
        collectedProblems.push({
          id: `${topicData.id}-m-rev-1`,
          topic: topicData.title,
          difficulty: 'medium',
          question: q.question,
          answer: q.answer,
          hint: q.hint,
          solutionSteps: q.solutionSteps,
        });
      }
      if (rawPractice.challenge.length > 0) {
        const q = rawPractice.challenge[0];
        collectedProblems.push({
          id: `${topicData.id}-m-chal-1`,
          topic: topicData.title,
          difficulty: 'medium',
          question: q.question,
          answer: q.answer,
          hint: q.hint,
          solutionSteps: q.solutionSteps,
        });
      }
    } else {
      // hard
      rawPractice.challenge.forEach((q, i) => {
        collectedProblems.push({
          id: `${topicData.id}-h-${i + 1}`,
          topic: topicData.title,
          difficulty: 'hard',
          question: q.question,
          answer: q.answer,
          hint: q.hint,
          solutionSteps: q.solutionSteps,
        });
      });
      rawPractice.medium.slice(1).forEach((q, i) => {
        collectedProblems.push({
          id: `${topicData.id}-h-adv-${i + 1}`,
          topic: topicData.title,
          difficulty: 'hard',
          question: q.question,
          answer: q.answer,
          hint: q.hint,
          solutionSteps: q.solutionSteps,
        });
      });
    }

    // Top up to exactly 10 problems using domain-specific variations
    const needed = Math.max(0, 10 - collectedProblems.length);
    if (needed > 0) {
      const extra = generateTopicVariations(topicData.title, topicData.category, difficulty, needed);
      collectedProblems.push(...extra);
    }

    return collectedProblems.slice(0, 10);
  }

  // 4. Fallback generator for unknown topics
  return generateTopicVariations(topicName, 'Algebra', difficulty, 10);
}
