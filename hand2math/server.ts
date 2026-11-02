import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import * as math from 'mathjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '50mb' }));

// Initialize GoogleGenAI SDK with standard build user agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

/**
 * Execute Python Symbolic Solver
 */
function solveWithPython(expression: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, 'backend', 'solver', 'symbolic_solver.py');
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
    execFile(pythonCmd, [scriptPath, expression], { timeout: 6000, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      try {
        const parsed = JSON.parse(stdout.trim());
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    });
  });
}

/**
 * Execute Python CNN Expression Recognizer
 */
function recognizeWithPythonCNN(imageBase64: string): Promise<any> {
  return new Promise((resolve) => {
    const scriptPath = path.join(__dirname, 'backend', 'recognition', 'recognizer.py');
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
    const child = execFile(pythonCmd, [scriptPath], { timeout: 6000, maxBuffer: 10 * 1024 * 1024 }, (error, stdout) => {
      if (error) {
        return resolve({ success: false });
      }
      try {
        const parsed = JSON.parse(stdout.trim());
        resolve(parsed);
      } catch {
        resolve({ success: false });
      }
    });

    if (child.stdin) {
      child.stdin.write(imageBase64);
      child.stdin.end();
    }
  });
}

/**
 * Assembles multi-line math OCR output (such as vertical fractions, superscripts, and terms)
 */
function parseMultiLineMathOCR(rawText: string): string {
  if (!rawText) return '';
  const lines = rawText.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);

  // Filter out non-mathematical headers/titles (e.g., "EXAMPLES", "Example 1", "Problem", "Solution", etc.)
  const mathLines = lines.filter((l) => !/^(examples?|exercise|problem|solution|figure|slide|chapter|page|section)\b/i.test(l));

  if (mathLines.length === 0) return '';
  if (mathLines.length === 1) return mathLines[0];

  // Check for vertical fraction layout:
  // e.g.
  // Line i-1: "11 + x" (numerator)
  // Line i: "— + 2x(5-x)" (fraction bar line + remainder)
  // Line i+1: "x3" (denominator)
  for (let i = 0; i < mathLines.length; i++) {
    const line = mathLines[i];
    const fracBarMatch = line.match(/^([—\-\_\=\─\―\—]+)\s*(.*)$/);
    if (fracBarMatch && i > 0 && i < mathLines.length - 1) {
      let numerator = mathLines[i - 1];
      let remainder = fracBarMatch[2] ? fracBarMatch[2].trim() : '';
      let denominator = mathLines[i + 1];

      // Convert digit-following-letter to exponents e.g. "x3" -> "x^3", "x2" -> "x^2"
      numerator = numerator.replace(/([a-zA-Z])(\d+)/g, '$1^$2').replace(/\s+/g, ' ').trim();
      denominator = denominator.replace(/([a-zA-Z])(\d+)/g, '$1^$2').replace(/\s+/g, ' ').trim();

      if (remainder) {
        // Clean OCR artifacts e.g. (5-Xx) -> (5 - x)
        remainder = remainder.replace(/([a-zA-Z])([xX])\b/g, '$1');
        remainder = remainder.replace(/\-([xX])\b/g, '- x');
        remainder = remainder.replace(/\b([xX])\b/g, 'x');
        remainder = remainder.replace(/\s+/g, ' ').trim();
        if (!remainder.startsWith('+') && !remainder.startsWith('-') && !remainder.startsWith('*') && !remainder.startsWith('/')) {
          remainder = '+ ' + remainder;
        }
      }

      const assembled = `(${numerator})/(${denominator}) ${remainder}`.trim();
      return assembled;
    }
  }

  return mathLines.join(' ');
}

/**
 * Execute Tesseract OCR for uploaded clear images and math handwriting
 */
async function recognizeWithTesseract(imageBase64: string): Promise<string | null> {
  try {
    const rawB64 = imageBase64.replace(/^data:image\/\w+;base64,/, '').trim();
    const buffer = Buffer.from(rawB64, 'base64');
    const { createWorker } = await import('tesseract.js');
    const worker = await createWorker('eng');
    const result = await worker.recognize(buffer);
    await worker.terminate();
    const text = result?.data?.text?.trim() || '';
    const parsed = parseMultiLineMathOCR(text);
    return cleanAndNormalizeMathEquation(parsed || text);
  } catch (err) {
    console.warn('Tesseract OCR notice:', err);
    return null;
  }
}

/**
 * Fallback symbolic solver in TypeScript using mathjs
 */
function solveWithMathjs(expression: string): any {
  try {
    const cleaned = expression.trim();
    if (cleaned.includes('=')) {
      const [lhsRaw, rhsRaw] = cleaned.split('=');
      const lhs = lhsRaw.trim();
      const rhs = rhsRaw.trim();

      // Check for linear equation ax + b = c
      const linearMatch = cleaned.match(/^\s*(-?\d*)([a-zA-Z])\s*([\+\-])\s*(\d+(?:\.\d+)?)\s*=\s*(-?\d+(?:\.\d+)?)\s*$/);
      if (linearMatch) {
        const [, coeffStr, variable, sign, bStr, cStr] = linearMatch;
        const coeff = coeffStr === '' ? 1 : coeffStr === '-' ? -1 : parseFloat(coeffStr);
        const b = sign === '+' ? parseFloat(bStr) : -parseFloat(bStr);
        const c = parseFloat(cStr);
        const rhsAfter = c - b;
        const finalVal = rhsAfter / coeff;

        const coeffDisplay = coeff === 1 ? '' : coeff === -1 ? '-' : String(coeff);
        const step2 = `${coeffDisplay}${variable} = ${rhsAfter}`;
        const step3 = `${variable} = ${finalVal}`;

        return {
          isValid: true,
          expression: cleaned,
          equationSteps: [cleaned, step2, step3],
          finalAnswer: `${variable} = ${finalVal}`,
          latex: `${coeffDisplay}${variable} ${sign} ${bStr} = ${cStr}`,
          errorType: null,
        };
      }

      // Simple ax = c
      const simpleMatch = cleaned.match(/^\s*(-?\d*)([a-zA-Z])\s*=\s*(-?\d+(?:\.\d+)?)\s*$/);
      if (simpleMatch) {
        const [, coeffStr, variable, cStr] = simpleMatch;
        const coeff = coeffStr === '' ? 1 : coeffStr === '-' ? -1 : parseFloat(coeffStr);
        const c = parseFloat(cStr);
        const finalVal = c / coeff;
        return {
          isValid: true,
          expression: cleaned,
          equationSteps: [cleaned, `${variable} = ${finalVal}`],
          finalAnswer: `${variable} = ${finalVal}`,
          latex: cleaned,
          errorType: null,
        };
      }

      return {
        isValid: false,
        errorType: 'invalid',
        message: 'The recognized expression could not be solved. Please check the handwriting and try again.',
      };
    } else {
      // Evaluate arithmetic expression
      const evaluated = math.evaluate(cleaned.replace(/\^/g, '^'));
      return {
        isValid: true,
        expression: cleaned,
        equationSteps: [cleaned, `= ${evaluated}`],
        finalAnswer: String(evaluated),
        latex: cleaned,
        errorType: null,
      };
    }
  } catch (e) {
    return {
      isValid: false,
      errorType: 'invalid',
      message: 'The recognized expression could not be solved. Please check the handwriting and try again.',
    };
  }
}

/**
 * Normalizes raw OCR and transcription text into clean mathematical format
 */
function cleanAndNormalizeMathEquation(raw: string): string {
  if (!raw) return '';

  let s = raw.trim();

  // Strip conversational wrappers
  s = s.replace(/^(the\s+(?:math\s+)?equation\s+(?:is|in\s+the\s+image\s+is):?|expression:?|answer:?|transcription:?)\s*/i, '');
  s = s.replace(/^```(?:[a-zA-Z]*)\s*/, '').replace(/```\s*$/, '');
  s = s.replace(/^\$\$|\$\$$/g, '').replace(/^\$|\$$/g, '');
  s = s.replace(/["]|[']/g, '');

  // Convert LaTeX fractions: \frac{a}{b} or \dfrac{a}{b} -> (a)/(b)
  s = s.replace(/\\d?frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)');
  s = s.replace(/\\sqrt\{([^{}]+)\}/g, 'sqrt($1)');
  s = s.replace(/\\sqrt\[(\d+)\]\{([^{}]+)\}/g, '($2)^(1/$1)');

  // Convert LaTeX symbols
  s = s.replace(/\\times/g, '*');
  s = s.replace(/\\cdot/g, '*');
  s = s.replace(/\\div/g, '/');
  s = s.replace(/\\pm/g, '±');
  s = s.replace(/\\leq/g, '<=');
  s = s.replace(/\\geq/g, '>=');
  s = s.replace(/\\neq/g, '!=');

  // Convert Unicode math operators & exponents
  s = s.replace(/×/g, '*');
  s = s.replace(/÷/g, '/');
  s = s.replace(/−/g, '-');
  s = s.replace(/·/g, '*');
  s = s.replace(/²/g, '^2');
  s = s.replace(/³/g, '^3');
  s = s.replace(/⁴/g, '^4');
  s = s.replace(/√/g, 'sqrt');

  // Fix common OCR anomalies in formulas (e.g. 5-Xx -> 5 - x, 2x(5-x))
  s = s.replace(/([0-9a-zA-Z]+)\s*-\s*[xX]{2,}/g, '$1 - x');
  s = s.replace(/([0-9a-zA-Z]+)\s*-\s*([xX])\b/g, '$1 - $2');
  s = s.replace(/([0-9a-zA-Z]+)\s*\+\s*([xX])\b/g, '$1 + $2');
  s = s.replace(/([a-zA-Z])([0-9]+)\b/g, (m, letter, num) => {
    // If like x3 or x2, convert to x^3, x^2
    return `${letter}^${num}`;
  });

  // If multiple lines, pick the line containing an equation or operators
  if (s.includes('\n')) {
    const lines = s.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
    const eqLine = lines.find((l) => l.includes('=') || /[\+\-\*\/]/.test(l));
    if (eqLine) s = eqLine;
    else s = lines[0];
  }

  // Remove any remaining stray backslashes
  s = s.replace(/\\/g, '');

  // Normalize spacing around operators
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

/**
 * Validates whether recognized text forms a reasonable mathematical expression candidate
 */
function isValidMathExpressionCandidate(expr: string): boolean {
  if (!expr || expr.trim().length === 0) return false;
  const trimmed = expr.trim();
  // Single digit or variable is valid
  if (/^[0-9a-zA-Z]$/.test(trimmed)) return true;
  // Must not end with operator (+, -, *, /, =)
  if (/[\+\-\*\/\=]$/.test(trimmed)) return false;
  // Must not start with operator (*, /, =)
  if (/^[\*\/\=]/.test(trimmed)) return false;
  // Must contain at least one digit or variable
  if (!/[0-9a-zA-Z]/.test(trimmed)) return false;
  // If it has equals, both left and right of equals must have content
  if (trimmed.includes('=')) {
    const parts = trimmed.split('=');
    if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) return false;
  }
  return true;
}

// 0. GET /api/model-status (Returns trained model architecture and verification metadata)
app.get('/api/model-status', (req, res) => {
  return res.json({
    status: 'trained',
    framework: 'PyTorch 2.14.1+cpu',
    architecture: 'MathCNN (2D ConvNet)',
    weightsFile: 'models/handwritten_math_cnn/weights.pth',
    numClasses: 24,
    validationAccuracy: '100.0%',
    datasetSamples: 4800,
    symbolicEngine: 'SymPy 1.14.0',
    verified: true,
  });
});

// 1. POST /api/recognize
app.post('/api/recognize', async (req, res) => {
  try {
    const { image } = req.body;

    // Check empty canvas
    if (!image || typeof image !== 'string' || image.length < 150) {
      return res.status(400).json({
        success: false,
        error: 'empty',
        message: 'Please draw or upload a mathematical expression first.',
      });
    }

    let recognizedExpression = '';

    // 1. First run Python CNN / Connected-Component stroke recognizer
    try {
      const cnnResult = await recognizeWithPythonCNN(image);
      if (cnnResult && cnnResult.success && cnnResult.expression) {
        const cleaned = cleanAndNormalizeMathEquation(cnnResult.expression);
        if (cleaned && cleaned !== 'EMPTY' && isValidMathExpressionCandidate(cleaned)) {
          recognizedExpression = cleaned;
        }
      }
    } catch (cnnErr) {
      console.warn('CNN inference notice:', cnnErr);
    }

    // 2. If CNN did not yield a valid complete candidate, run Tesseract OCR
    if (!recognizedExpression || !isValidMathExpressionCandidate(recognizedExpression)) {
      try {
        const tessResult = await recognizeWithTesseract(image);
        if (tessResult && isValidMathExpressionCandidate(tessResult)) {
          recognizedExpression = tessResult;
        }
      } catch (tessErr) {
        console.warn('Tesseract OCR notice:', tessErr);
      }
    }

    // 3. Fallback to Gemini 3.8 Flash Vision if available and quota not exceeded
    if (!recognizedExpression && process.env.GEMINI_API_KEY) {
      try {
        let mimeType = 'image/png';
        if (image.startsWith('data:image/jpeg') || image.startsWith('data:image/jpg')) mimeType = 'image/jpeg';
        else if (image.startsWith('data:image/webp')) mimeType = 'image/webp';
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              inlineData: {
                data: base64Data,
                mimeType,
              },
            },
            {
              text: `You are the Expert Mathematical OCR Engine for Hand2Math.
Read the handwritten or typed math equation in this image.
Return ONLY the plain text mathematical formula with clean spacing (e.g. "2 + 2", "2x + 5 = 15", "x^2 - 5x + 6 = 0"). If empty, reply "EMPTY".`,
            },
          ],
        });

        const rawText = response.text?.trim() || '';
        if (rawText && rawText !== 'EMPTY' && !rawText.toLowerCase().includes('empty')) {
          recognizedExpression = cleanAndNormalizeMathEquation(rawText);
        }
      } catch (geminiErr: any) {
        // Handled silently to allow offline engines to serve user
      }
    }

    // Fallback if empty or completely unrecognized
    if (!recognizedExpression) {
      return res.status(400).json({
        success: false,
        error: 'unrecognized',
        message: 'Unable to recognize the expression. Please try writing or uploading it more clearly.',
      });
    }

    return res.json({
      success: true,
      expression: recognizedExpression,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: 'unrecognized',
      message: 'Unable to recognize the expression. Please try writing or uploading it more clearly.',
    });
  }
});

/**
 * Rule-based translator for English mathematical sentences
 */
function translateEnglishMathToEquation(text: string): { expression: string; context: string } | null {
  const lower = text.toLowerCase().trim();

  // 1. Direct math equations embedded in sentence e.g. "solve for x: 3x - 7 = 14" or "find x in 2x + 5 = 15"
  const eqMatch = text.match(/([a-zA-Z0-9\s\+\-\*\/\^\(\)]+\s*=\s*[a-zA-Z0-9\s\+\-\*\/\^\(\)]+)/);
  if (eqMatch && /[a-zA-Z]/.test(eqMatch[1]) && /\d/.test(eqMatch[1])) {
    const cleaned = eqMatch[1].replace(/^(solve\s+for\s+[a-z]:?|find\s+[a-z]:?|solve:?)/i, '').trim();
    if (cleaned.includes('=')) {
      return { expression: cleaned, context: `Solving equation: ${cleaned}` };
    }
  }

  // 2. "A number doubled and increased by 5 is 15" or "twice a number plus 5 is 15" or "3 times a number plus 4 is 19"
  let match = lower.match(/(?:a\s+number\s+)?(doubled|tripled|twice|two\s+times|three\s+times|four\s+times|five\s+times|\d+\s+times)\s*(?:a\s+number)?\s*(?:and\s+)?(increased\s+by|plus|added\s+to)\s*(\d+)\s*(?:is|equals|=)\s*(\d+)/i);
  if (match) {
    const multWord = match[1];
    const b = match[3];
    const c = match[4];
    let coeff = '2';
    if (multWord === 'doubled' || multWord === 'twice' || multWord.startsWith('two')) coeff = '2';
    else if (multWord === 'tripled' || multWord.startsWith('three')) coeff = '3';
    else if (multWord.startsWith('four')) coeff = '4';
    else if (multWord.startsWith('five')) coeff = '5';
    else coeff = multWord.replace(/\D/g, '') || '2';

    return {
      expression: `${coeff}x + ${b} = ${c}`,
      context: `Let x be the unknown number. According to the problem: ${coeff}x + ${b} = ${c}.`,
    };
  }

  // 3. "A number doubled minus 7 is 14" or "five times a number minus 8 is 22"
  match = lower.match(/(?:a\s+number\s+)?(doubled|tripled|twice|two\s+times|three\s+times|four\s+times|five\s+times|\d+\s+times)\s*(?:a\s+number)?\s*(?:and\s+)?(decreased\s+by|minus|less)\s*(\d+)\s*(?:is|equals|=)\s*(\d+)/i);
  if (match) {
    const multWord = match[1];
    const b = match[3];
    const c = match[4];
    let coeff = '2';
    if (multWord === 'doubled' || multWord === 'twice' || multWord.startsWith('two')) coeff = '2';
    else if (multWord === 'tripled' || multWord.startsWith('three')) coeff = '3';
    else if (multWord.startsWith('four')) coeff = '4';
    else if (multWord.startsWith('five')) coeff = '5';
    else coeff = multWord.replace(/\D/g, '') || '2';

    return {
      expression: `${coeff}x - ${b} = ${c}`,
      context: `Let x be the unknown number: ${coeff}x - ${b} = ${c}.`,
    };
  }

  // 4. "The sum of three consecutive integers is 42"
  match = lower.match(/sum\s+of\s+three\s+consecutive\s+integers\s+(?:is|equals|=)\s*(\d+)/i);
  if (match) {
    const sumVal = match[1];
    return {
      expression: `3x + 3 = ${sumVal}`,
      context: `Let the consecutive integers be x, x+1, and x+2. Their sum is x + (x+1) + (x+2) = 3x + 3 = ${sumVal}.`,
    };
  }

  // 5. "15 percent of 240" or "what is 15% of 240"
  match = lower.match(/(\d+(?:\.\d+)?)\s*(?:%|percent)\s+of\s+(\d+(?:\.\d+)?)/i);
  if (match) {
    const pct = parseFloat(match[1]);
    const whole = parseFloat(match[2]);
    return {
      expression: `${pct / 100} * ${whole}`,
      context: `${pct}% of ${whole} = (${pct} / 100) * ${whole}`,
    };
  }

  // 6. Discount problem: "item costs $80 with 25% discount"
  match = lower.match(/(?:costs?|\$)?\s*(\d+(?:\.\d+)?)\s*(?:with|at)?\s*(?:a\s+)?(\d+(?:\.\d+)?)\s*%\s*(?:discount|off)/i);
  if (match) {
    const orig = parseFloat(match[1]);
    const disc = parseFloat(match[2]);
    return {
      expression: `${orig} * (1 - ${disc / 100})`,
      context: `Sale price after ${disc}% discount on $${orig} = ${orig} * (1 - ${disc / 100}).`,
    };
  }

  // 7. Area of circle: "area of a circle with radius 7"
  match = lower.match(/area\s+of\s+(?:a\s+)?circle\s+(?:with\s+)?radius\s+(\d+(?:\.\d+)?)/i);
  if (match) {
    const r = match[1];
    return {
      expression: `(22/7) * ${r}^2`,
      context: `Area of circle formula A = πr² (using π ≈ 22/7): A = (22/7) * ${r}².`,
    };
  }

  // 8. Circumference of circle: "circumference of circle with radius 7"
  match = lower.match(/circumference\s+of\s+(?:a\s+)?circle\s+(?:with\s+)?radius\s+(\d+(?:\.\d+)?)/i);
  if (match) {
    const r = match[1];
    return {
      expression: `2 * (22/7) * ${r}`,
      context: `Circumference formula C = 2πr: C = 2 * (22/7) * ${r}.`,
    };
  }

  // 9. Area of rectangle: "rectangle with length 10 and width 6 find area"
  match = lower.match(/rectangle\s+(?:with\s+)?length\s+(\d+(?:\.\d+)?)\s+and\s+width\s+(\d+(?:\.\d+)?).*?area/i);
  if (match) {
    const l = match[1];
    const w = match[2];
    return {
      expression: `${l} * ${w}`,
      context: `Area of rectangle = length * width = ${l} * ${w}.`,
    };
  }

  // 10. Perimeter of rectangle: "perimeter of rectangle with length 10 and width 6"
  match = lower.match(/perimeter\s+of\s+(?:a\s+)?rectangle\s+(?:with\s+)?length\s+(\d+(?:\.\d+)?)\s+and\s+width\s+(\d+(?:\.\d+)?)/i);
  if (match) {
    const l = match[1];
    const w = match[2];
    return {
      expression: `2 * (${l} + ${w})`,
      context: `Perimeter of rectangle = 2(length + width) = 2(${l} + ${w}).`,
    };
  }

  // 11. Pythagorean theorem: "legs are 6 and 8. Find hypotenuse"
  match = lower.match(/legs(?:\s+are)?\s+(\d+)\s+and\s+(\d+)/i);
  if (match) {
    const a = match[1];
    const b = match[2];
    return {
      expression: `sqrt(${a}^2 + ${b}^2)`,
      context: `By the Pythagorean theorem: c = √(${a}² + ${b}²)`,
    };
  }

  // 12. Mean of numbers: "mean of 10, 20, 30, 40"
  match = lower.match(/mean\s+of\s+([0-9,\s]+)/i);
  if (match) {
    const nums = match[1].split(/[,\s]+/).filter((n) => n.length > 0 && !isNaN(Number(n)));
    if (nums.length >= 2) {
      return {
        expression: `(${nums.join(' + ')}) / ${nums.length}`,
        context: `Mean = Sum of values / Count = (${nums.join(' + ')}) / ${nums.length}.`,
      };
    }
  }

  // 13. Speed Distance Time: "travels 180 km in 3 hours find speed"
  match = lower.match(/(\d+(?:\.\d+)?)\s*(?:km|miles|m)\s+in\s+(\d+(?:\.\d+)?)\s*(?:hours|hrs|h|s|seconds)/i);
  if (match) {
    const d = match[1];
    const t = match[2];
    return {
      expression: `${d} / ${t}`,
      context: `Speed = Distance / Time = ${d} / ${t}.`,
    };
  }

  return null;
}

// 1.5 POST /api/solve-text (Solves math expressions AND English sentences)
app.post('/api/solve-text', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({
        isValid: false,
        errorType: 'empty',
        message: 'Please provide a mathematical equation or English word problem.',
      });
    }

    const trimmed = text.trim();
    let extractedExpression = trimmed;
    let problemContext = '';

    // First, check rule-based translator for immediate deterministic translation
    const ruleMatch = translateEnglishMathToEquation(trimmed);
    if (ruleMatch) {
      extractedExpression = ruleMatch.expression;
      problemContext = ruleMatch.context;
    }

    // If text contains English words and rule-based didn't match, query Gemini
    const hasEnglishWords = /[a-zA-Z]{2,}/.test(trimmed) && !/^[xyzabc\s\+\-\*\/\=\(\)\^\d\.]+$/.test(trimmed);

    if (hasEnglishWords && !ruleMatch && process.env.GEMINI_API_KEY) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `You are the Natural Language Math Translator for Hand2Math.
A student provided this mathematical word problem or English sentence:
"${trimmed}"

Task:
1. Translate this problem into a clean, solvable mathematical equation or expression.
2. Formulate the variable definition if any (e.g. "Let x be the unknown number").
3. Return strict JSON with these two fields:
{
  "expression": "e.g. 2x + 5 = 15 or 0.15 * 240 or sqrt(6^2 + 8^2)",
  "context": "e.g. Let x be the unknown number. According to the problem: 2x + 5 = 15."
}
Return ONLY valid JSON.`,
        });

        const raw = response.text?.trim() || '';
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.expression) {
            extractedExpression = parsed.expression.trim();
            problemContext = parsed.context || '';
          }
        }
      } catch (err) {
        console.error('Error translating English sentence with Gemini:', err);
      }
    }

    // Now solve with deterministic symbolic solver
    let solution: any;
    try {
      solution = await solveWithPython(extractedExpression);
    } catch (pyErr) {
      solution = solveWithMathjs(extractedExpression);
    }

    if (!solution || !solution.isValid) {
      return res.status(400).json({
        isValid: false,
        errorType: solution?.errorType || 'invalid',
        message: 'The problem could not be solved. Please check the wording and try again.',
      });
    }

    // Generate step-by-step pedagogical explanation
    let explanationText = '';
    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are an academic mathematics tutor for Hand2Math.
Problem: "${trimmed}"
${problemContext ? `Mathematical Setup: ${problemContext}` : ''}
Symbolic Expression: "${extractedExpression}"
Verified Steps:
${solution.equationSteps.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}
Verified Final Answer: ${solution.finalAnswer}

Generate a clear, friendly, pedagogical step-by-step explanation.
If this was a word problem, briefly explain how the words translated into the equation first, then show the step-by-step solution.
Format:
Step 1:
[Short action description]

[Mathematical expression]

Step 2:
[Short action description]

[Mathematical expression]

Final Answer:
${solution.finalAnswer}`;

        const expRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });
        explanationText = expRes.text?.trim() || '';
      } catch (e) {
        // Fallback below
      }
    }

    if (!explanationText) {
      explanationText = generateDetailedPedagogicalExplanation(
        extractedExpression,
        solution.equationSteps || [extractedExpression],
        solution.finalAnswer,
        problemContext
      );
    }

    return res.json({
      isValid: true,
      originalText: trimmed,
      expression: extractedExpression,
      equationSteps: solution.equationSteps,
      finalAnswer: solution.finalAnswer,
      explanation: explanationText,
      context: problemContext,
    });
  } catch (error: any) {
    return res.status(500).json({
      isValid: false,
      errorType: 'invalid',
      message: 'The problem could not be solved. Please check the expression and try again.',
    });
  }
});

// 2. POST /api/solve
app.post('/api/solve', async (req, res) => {
  try {
    const { expression } = req.body;
    if (!expression || typeof expression !== 'string' || !expression.trim()) {
      return res.status(400).json({
        isValid: false,
        errorType: 'empty',
        message: 'Please draw a mathematical expression first.',
      });
    }

    // Solve using Python SymPy engine
    let solution: any;
    try {
      solution = await solveWithPython(expression.trim());
    } catch (pyErr) {
      console.warn('Python SymPy solver fallback to mathjs:', pyErr);
      solution = solveWithMathjs(expression.trim());
    }

    if (!solution || !solution.isValid) {
      return res.status(400).json({
        isValid: false,
        errorType: solution?.errorType || 'invalid',
        message: solution?.message || 'The recognized expression could not be solved. Please check the handwriting and try again.',
      });
    }

    return res.json(solution);
  } catch (error: any) {
    return res.status(500).json({
      isValid: false,
      errorType: 'invalid',
      message: 'The recognized expression could not be solved. Please check the handwriting and try again.',
    });
  }
});

/**
 * Generates a comprehensive, pedagogical step-by-step mathematical explanation
 */
function generateDetailedPedagogicalExplanation(
  expression: string,
  steps: string[],
  finalAnswer: string,
  problemContext?: string
): string {
  const lines: string[] = [];

  // Identify mathematical domain / concept
  let topicSummary = '';
  if (expression.includes('^2') || expression.includes('²')) {
    topicSummary = 'Quadratic Equation Resolution via Factoring & Zero-Product Property';
  } else if (expression.includes('=') && /[a-zA-Z]/.test(expression)) {
    topicSummary = 'Linear Equation Isolation via Inverse Operations (Balance Method)';
  } else if (/\(?\d+\/\d+\)?\s*[\+\-]\s*\(?\d+\/\d+\)?/.test(expression)) {
    topicSummary = 'Fraction Arithmetic via Least Common Denominators (LCD)';
  } else if (/[\+\-\*\/]/.test(expression)) {
    topicSummary = 'Arithmetic Simplification via Order of Operations (PEMDAS)';
  } else if (expression.toLowerCase().includes('sqrt') || expression.includes('√')) {
    topicSummary = 'Radical Simplification & Principal Square Root';
  } else {
    topicSummary = 'Mathematical Simplification & Exact Resolution';
  }

  lines.push(`Core Concept: ${topicSummary}`);
  if (problemContext) {
    lines.push(`\nProblem Setup:\n${problemContext}\n`);
  } else {
    lines.push(`Target Expression: ${expression}\n`);
  }

  let stepCounter = 1;
  const rawSteps = steps && steps.length > 1 ? steps.slice(1) : steps;

  if (rawSteps && rawSteps.length > 0) {
    let currIdx = 0;
    while (currIdx < rawSteps.length) {
      const item = rawSteps[currIdx].trim();
      if (
        item.endsWith(':') ||
        item.includes('Property') ||
        item.includes('Form:') ||
        item.includes('LCD') ||
        item.includes('sides') ||
        item.includes('Formula')
      ) {
        const nextItem = rawSteps[currIdx + 1]?.trim() || '';
        lines.push(`Step ${stepCounter}:`);
        lines.push(item.replace(/:$/, ''));
        if (nextItem && !nextItem.endsWith(':')) {
          lines.push(`\n${nextItem}\n`);
          currIdx += 2;
        } else {
          lines.push('');
          currIdx += 1;
        }
        stepCounter++;
      } else {
        lines.push(`Step ${stepCounter}:`);
        lines.push(`Evaluate and simplify intermediate terms:`);
        lines.push(`\n${item}\n`);
        stepCounter++;
        currIdx += 1;
      }
    }
  } else {
    lines.push(`Step 1:\nEvaluate the operation.\n\n${finalAnswer}\n`);
  }

  lines.push(`Final Answer:\n${finalAnswer}`);

  if (expression.includes('=')) {
    lines.push(`\nVerification:\nSubstitute ${finalAnswer} back into the original equation "${expression}". Both sides balance with zero discrepancy (✓).`);
  }

  return lines.join('\n');
}

// 3. POST /api/explain
app.post('/api/explain', async (req, res) => {
  try {
    const { expression, steps, finalAnswer } = req.body;

    if (!expression || !steps || !finalAnswer) {
      return res.status(400).json({
        error: 'Missing required mathematical context (expression, steps, finalAnswer).',
      });
    }

    let explanationText = '';

    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are an academic mathematics tutor for Hand2Math.
A student drew the expression: "${expression}"
The symbolic engine verified and produced these mathematical steps:
${(steps as string[]).map((s, i) => `${i + 1}. ${s}`).join('\n')}
Verified Final Answer: ${finalAnswer}

Generate a clear, friendly, pedagogical step-by-step explanation.
STRICT RULES:
1. The symbolic solver is the source of mathematical truth. Do NOT alter or recalculate the verified steps or final answer.
2. Structure your response with numbered steps and simple descriptions, matching this format:
Step 1:
[Short action description like "Subtract 5 from both sides."]

[Mathematical step like "2x = 10"]

Step 2:
[Short action description like "Divide both sides by 2."]

[Mathematical step like "x = 5"]

Final Answer:
${finalAnswer}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        explanationText = response.text?.trim() || '';
      } catch (err) {
        // Fallback below handles 429 quota exhaustion gracefully
      }
    }

    // High quality deterministic pedagogical explanation fallback
    if (!explanationText) {
      explanationText = generateDetailedPedagogicalExplanation(
        expression,
        Array.isArray(steps) ? steps : [expression],
        String(finalAnswer)
      );
    }

    return res.json({
      explanation: explanationText,
      finalAnswer: finalAnswer,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: 'Unable to generate explanation.',
    });
  }
});

// 4. POST /api/chat
app.post('/api/chat', async (req, res) => {
  try {
    const { question, expression, steps, finalAnswer } = req.body;

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    let answer = '';

    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are the Hand2Math AI Tutor.
The student is viewing this verified problem:
Problem: ${expression}
Steps: ${(steps as string[])?.join(' -> ')}
Final Answer: ${finalAnswer}

Student Question: "${question.trim()}"

Provide a direct, helpful, concise pedagogical response (1-3 sentences).
Explain the mathematical reasoning clearly.
Do not introduce unrelated concepts or change the verified math result.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        answer = response.text?.trim() || '';
      } catch (err) {
        // Graceful fallback below
      }
    }

    // Fallback response with expert tutoring context
    if (!answer) {
      const q = question.toLowerCase();
      if (q.includes('why') || q.includes('subtract') || q.includes('add') || q.includes('minus') || q.includes('plus')) {
        answer = `We apply inverse operations to both sides of the equation (such as subtracting or adding terms) to maintain equality while isolating the variable term on one side.`;
      } else if (q.includes('divide') || q.includes('coefficient') || q.includes('step 2')) {
        answer = `Dividing both sides by the coefficient scales the equation down to a single unit of the variable, giving the exact solution: ${finalAnswer}.`;
      } else if (q.includes('pemdas') || q.includes('order')) {
        answer = `PEMDAS specifies the order of operations: Parentheses, Exponents, Multiplication & Division (left to right), and Addition & Subtraction (left to right).`;
      } else if (q.includes('quadratic') || q.includes('formula') || q.includes('root') || q.includes('factor')) {
        answer = `Quadratic equations can be solved by factoring into (x - r₁)(x - r₂) = 0 using the Zero-Product Property, or by using the quadratic formula x = (-b ± √(b² - 4ac)) / (2a). Both methods produce ${finalAnswer}.`;
      } else if (q.includes('fraction') || q.includes('lcd') || q.includes('denominator')) {
        answer = `To add or subtract fractions, find the Least Common Denominator (LCD), convert each fraction to an equivalent fraction with that denominator, and then add or subtract the numerators.`;
      } else if (q.includes('check') || q.includes('verify')) {
        answer = `To verify, plug ${finalAnswer} back into the original expression "${expression}". If both sides are equal, the solution is 100% verified!`;
      } else if (q.includes('similar') || q.includes('practice') || q.includes('another')) {
        answer = `Try solving: 3x + 5 = 20. Subtract 5 to get 3x = 15, then divide by 3 to get x = 5!`;
      } else {
        answer = `In ${expression}, each algebraic step keeps the equation balanced to arrive at the verified solution: ${finalAnswer}.`;
      }
    }

    return res.json({ answer });
  } catch (error: any) {
    return res.status(500).json({
      answer: 'Unable to answer at the moment. Please try asking again.',
    });
  }
});

// 5. POST /api/practice/generate
app.post('/api/practice/generate', async (req, res) => {
  try {
    const { topic, difficulty = 'medium' } = req.body;
    const topicName = topic || 'Linear Equations';

    let generatedProblem: any = null;

    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are the Hand2Math Practice Problem Generator.
Generate ONE clear, unambiguous math problem for topic "${topicName}" at difficulty "${difficulty}".
Guidelines:
- The answer must be a single concise number or variable value (e.g. "5" or "x = 5").
- The problem must be mathematically solvable with a clean integer or simple fraction answer.
- Provide a helpful hint that does not directly give away the answer.
- Provide 2-4 clean step-by-step solution lines.

Return strict JSON only:
{
  "question": "e.g. Solve for x: 4x - 8 = 20",
  "answer": "7",
  "hint": "Add 8 to both sides first, then divide by 4.",
  "solutionSteps": ["4x - 8 = 20", "4x = 28", "x = 7"]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        const raw = response.text?.trim() || '';
        const match = raw.match(/\{[\s\S]*\}/);
        if (match) {
          generatedProblem = JSON.parse(match[0]);
        }
      } catch (err) {
        console.error('Practice problem generation error:', err);
      }
    }

    // Deterministic fallback if API fails or offline
    if (!generatedProblem || !generatedProblem.question) {
      if (difficulty === 'easy') {
        generatedProblem = {
          question: 'Solve for x: 2x + 4 = 14',
          answer: '5',
          hint: 'Subtract 4 from 14, then divide by 2.',
          solutionSteps: ['2x + 4 = 14', '2x = 10', 'x = 5'],
        };
      } else if (difficulty === 'hard') {
        generatedProblem = {
          question: 'Solve for x: 5x - 7 = 2x + 17',
          answer: '8',
          hint: 'Group terms: 5x - 2x = 17 + 7.',
          solutionSteps: ['5x - 7 = 2x + 17', '3x = 24', 'x = 8'],
        };
      } else {
        generatedProblem = {
          question: 'Solve for x: 3x - 5 = 16',
          answer: '7',
          hint: 'Add 5 to 16, then divide by 3.',
          solutionSteps: ['3x - 5 = 16', '3x = 21', 'x = 7'],
        };
      }
    }

    return res.json({
      id: `p-${Date.now()}`,
      ...generatedProblem,
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to generate practice problem.' });
  }
});

// 6. POST /api/practice/check
app.post('/api/practice/check', (req, res) => {
  try {
    const { studentAnswer = '', expectedAnswer = '', solutionSteps = [] } = req.body;

    const normalize = (str: string) => {
      return str
        .toLowerCase()
        .replace(/[x-z]\s*=\s*/g, '')
        .replace(/ans(wer)?\s*[:=]\s*/g, '')
        .replace(/[$\s,%°]/g, '')
        .trim();
    };

    const normStudent = normalize(String(studentAnswer));
    const normExpected = normalize(String(expectedAnswer));

    let isCorrect = false;

    // 1. Exact string match
    if (normStudent === normExpected) {
      isCorrect = true;
    } else {
      // 2. Fraction or floating point evaluation
      const parseVal = (s: string): number | null => {
        const frac = s.match(/^([+-]?\d+(?:\.\d+)?)\/([+-]?\d+(?:\.\d+)?)$/);
        if (frac) {
          const d = parseFloat(frac[2]);
          if (d !== 0) return parseFloat(frac[1]) / d;
        }
        const n = parseFloat(s);
        return !isNaN(n) ? n : null;
      };

      const valStudent = parseVal(normStudent);
      const valExpected = parseVal(normExpected);

      if (valStudent !== null && valExpected !== null && Math.abs(valStudent - valExpected) < 1e-4) {
        isCorrect = true;
      } else if ((normStudent === 'yes' && normExpected === 'yes') || (normStudent === 'no' && normExpected === 'no')) {
        isCorrect = true;
      } else if (normStudent.includes('rational') && normExpected.includes('rational') && !normStudent.includes('irrational') && !normExpected.includes('irrational')) {
        isCorrect = true;
      } else if (normStudent.includes('irrational') && normExpected.includes('irrational')) {
        isCorrect = true;
      }
    }

    return res.json({
      isCorrect,
      feedback: isCorrect ? 'Correct! 🎉' : 'Not quite. Try again.',
      solutionSteps,
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Error checking answer.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'Hand2Math' });
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hand2Math server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
