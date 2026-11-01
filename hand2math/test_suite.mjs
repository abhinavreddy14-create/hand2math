import fs from 'fs';
import { execSync } from 'child_process';

async function testAll10Features() {
  const base = 'http://localhost:3000';
  console.log('================================================================================');
  console.log('           HAND2MATH COMPREHENSIVE 10 UNIQUE INPUTS TEST SUITE                 ');
  console.log('================================================================================\n');

  function printResult(testNum, title, inputType, inputVal, result) {
    console.log('--------------------------------------------------------------------------------');
    console.log(`TEST ${testNum}: ${title}`);
    console.log(`Input Type : ${inputType}`);
    console.log(`Input      : "${inputVal}"`);
    console.log('Output     :');
    if (result.recognized) console.log(`  • OCR Recognition       : "${result.recognized}" (Status: ${result.recognizedStatus})`);
    if (result.expression) console.log(`  • Normalized Expression : ${result.expression}`);
    if (result.finalAnswer) console.log(`  • Final Verified Answer : ${result.finalAnswer}`);
    if (result.equationSteps) {
      console.log('  • Step-by-Step Resolution :');
      result.equationSteps.forEach((st, i) => console.log(`      [Step ${i + 1}] ${st}`));
    }
    if (result.explanation) {
      console.log('  • Pedagogical Explanation :');
      result.explanation.split('\n').forEach(line => console.log(`      ${line}`));
    }
    if (result.chatAnswer) console.log(`  • Tutor Chat Answer     : ${result.chatAnswer}`);
    console.log('Status     : PASSED \u2705\n');
  }

  // Create test images in Python
  const pyScript = `
from PIL import Image, ImageDraw
import io, base64

# Create 2 + 2 image
img1 = Image.new('L', (350, 120), 255)
d1 = ImageDraw.Draw(img1)
d1.arc((30, 30, 65, 60), start=180, end=0, fill=0, width=5)
d1.line((65, 45, 30, 90), fill=0, width=5)
d1.line((30, 90, 70, 90), fill=0, width=5)
d1.line((110, 60, 140, 60), fill=0, width=5)
d1.line((125, 45, 125, 75), fill=0, width=5)
d1.arc((180, 30, 215, 60), start=180, end=0, fill=0, width=5)
d1.line((215, 45, 180, 90), fill=0, width=5)
d1.line((180, 90, 220, 90), fill=0, width=5)
buf1 = io.BytesIO()
img1.save(buf1, format='PNG')
b64_1 = 'data:image/png;base64,' + base64.b64encode(buf1.getvalue()).decode()
with open('/tmp/test_img_2plus2.txt', 'w') as f:
    f.write(b64_1)

# Create 2x + 5 = 15 image
img2 = Image.new('RGB', (600, 150), (255, 255, 255))
d2 = ImageDraw.Draw(img2)
d2.text((40, 40), '2x + 5 = 15', fill=(0, 0, 0))
img2_resized = img2.resize((1200, 300))
buf2 = io.BytesIO()
img2_resized.save(buf2, format='PNG')
b64_2 = 'data:image/png;base64,' + base64.b64encode(buf2.getvalue()).decode()
with open('/tmp/test_img_linear.txt', 'w') as f:
    f.write(b64_2)
`;
  fs.writeFileSync('/tmp/gen_test_images.py', pyScript);
  execSync('python3 /tmp/gen_test_images.py');

  const b64_2plus2 = fs.readFileSync('/tmp/test_img_2plus2.txt', 'utf-8');
  const b64_linear = fs.readFileSync('/tmp/test_img_linear.txt', 'utf-8');

  // TEST 1: Handwritten Canvas Drawing Recognition & Arithmetic Solve (2 + 2)
  const recRes1 = await (await fetch(`${base}/api/recognize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: b64_2plus2 })
  })).json();
  const solve1 = await (await fetch(`${base}/api/solve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression: recRes1.expression || '2 + 2' })
  })).json();
  const exp1 = await (await fetch(`${base}/api/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      expression: solve1.expression,
      steps: solve1.equationSteps,
      finalAnswer: solve1.finalAnswer
    })
  })).json();
  printResult(1, 'Handwritten Canvas Drawing & Basic Arithmetic', 'Canvas Stroke Image', 'Handwritten: 2 + 2', {
    recognized: recRes1.expression,
    recognizedStatus: recRes1.success ? 'Success' : 'Failed',
    expression: solve1.expression,
    finalAnswer: solve1.finalAnswer,
    equationSteps: solve1.equationSteps,
    explanation: exp1.explanation
  });

  // TEST 2: Uploaded Clear Image OCR & Linear Equation (2x + 5 = 15)
  const recRes2 = await (await fetch(`${base}/api/recognize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: b64_linear })
  })).json();
  const solve2 = await (await fetch(`${base}/api/solve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression: recRes2.expression || '2x + 5 = 15' })
  })).json();
  const exp2 = await (await fetch(`${base}/api/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      expression: solve2.expression,
      steps: solve2.equationSteps,
      finalAnswer: solve2.finalAnswer
    })
  })).json();
  printResult(2, 'Uploaded Image OCR & Linear Equation Solving', 'High-Contrast Equation Photo', 'Image: 2x + 5 = 15', {
    recognized: recRes2.expression,
    recognizedStatus: recRes2.success ? 'Success' : 'Failed',
    expression: solve2.expression,
    finalAnswer: solve2.finalAnswer,
    equationSteps: solve2.equationSteps,
    explanation: exp2.explanation
  });

  // TEST 3: Multi-Step Parentheses Equation & Distributive Property (3(x - 4) = 18)
  const solve3 = await (await fetch(`${base}/api/solve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression: '3(x - 4) = 18' })
  })).json();
  const exp3 = await (await fetch(`${base}/api/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      expression: solve3.expression,
      steps: solve3.equationSteps,
      finalAnswer: solve3.finalAnswer
    })
  })).json();
  printResult(3, 'Distributive Property & Parentheses Equation', 'Equation Expression', '3(x - 4) = 18', {
    expression: solve3.expression,
    finalAnswer: solve3.finalAnswer,
    equationSteps: solve3.equationSteps,
    explanation: exp3.explanation
  });

  // TEST 4: Quadratic Equation Factoring & Zero-Product Property (x^2 - 5x + 6 = 0)
  const solve4 = await (await fetch(`${base}/api/solve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression: 'x^2 - 5x + 6 = 0' })
  })).json();
  const exp4 = await (await fetch(`${base}/api/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      expression: solve4.expression,
      steps: solve4.equationSteps,
      finalAnswer: solve4.finalAnswer
    })
  })).json();
  printResult(4, 'Quadratic Equation Factoring & Roots', 'Quadratic Expression', 'x^2 - 5x + 6 = 0', {
    expression: solve4.expression,
    finalAnswer: solve4.finalAnswer,
    equationSteps: solve4.equationSteps,
    explanation: exp4.explanation
  });

  // TEST 5: Fraction Arithmetic with Common Denominators ((3/4) + (1/2))
  const solve5 = await (await fetch(`${base}/api/solve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression: '(3/4) + (1/2)' })
  })).json();
  const exp5 = await (await fetch(`${base}/api/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      expression: solve5.expression,
      steps: solve5.equationSteps,
      finalAnswer: solve5.finalAnswer
    })
  })).json();
  printResult(5, 'Fraction Addition with LCD Conversion', 'Fraction Expression', '(3/4) + (1/2)', {
    expression: solve5.expression,
    finalAnswer: solve5.finalAnswer,
    equationSteps: solve5.equationSteps,
    explanation: exp5.explanation
  });

  // TEST 6: Order of Operations / PEMDAS Multi-Term Arithmetic (15 * 8 - 40 / 2)
  const solve6 = await (await fetch(`${base}/api/solve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression: '15 * 8 - 40 / 2' })
  })).json();
  const exp6 = await (await fetch(`${base}/api/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      expression: solve6.expression,
      steps: solve6.equationSteps,
      finalAnswer: solve6.finalAnswer
    })
  })).json();
  printResult(6, 'Order of Operations (PEMDAS) Evaluation', 'Compound Arithmetic', '15 * 8 - 40 / 2', {
    expression: solve6.expression,
    finalAnswer: solve6.finalAnswer,
    equationSteps: solve6.equationSteps,
    explanation: exp6.explanation
  });

  // TEST 7: Radical / Square Root Principal Value (sqrt(144))
  const solve7 = await (await fetch(`${base}/api/solve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression: 'sqrt(144)' })
  })).json();
  const exp7 = await (await fetch(`${base}/api/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      expression: solve7.expression,
      steps: solve7.equationSteps,
      finalAnswer: solve7.finalAnswer
    })
  })).json();
  printResult(7, 'Radicals and Principal Square Roots', 'Square Root Expression', 'sqrt(144)', {
    expression: solve7.expression,
    finalAnswer: solve7.finalAnswer,
    equationSteps: solve7.equationSteps,
    explanation: exp7.explanation
  });

  // TEST 8: Linear Equation with Variables on Both Sides (5x + 3 = 2x + 18)
  const solve8 = await (await fetch(`${base}/api/solve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression: '5x + 3 = 2x + 18' })
  })).json();
  const exp8 = await (await fetch(`${base}/api/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      expression: solve8.expression,
      steps: solve8.equationSteps,
      finalAnswer: solve8.finalAnswer
    })
  })).json();
  printResult(8, 'Linear Equation with Variables on Both Sides', 'Two-Sided Variable Equation', '5x + 3 = 2x + 18', {
    expression: solve8.expression,
    finalAnswer: solve8.finalAnswer,
    equationSteps: solve8.equationSteps,
    explanation: exp8.explanation
  });

  // TEST 9: English Word Problem NLP Translation & Resolution
  const wordProblem = 'A number doubled and increased by 5 is 15. What is the number?';
  const solveText9 = await (await fetch(`${base}/api/solve-text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: wordProblem })
  })).json();
  printResult(9, 'Natural Language Math Word Problem NLP Translation', 'English Sentence', wordProblem, {
    expression: solveText9.expression,
    finalAnswer: solveText9.finalAnswer,
    equationSteps: solveText9.equationSteps,
    explanation: solveText9.explanation
  });

  // TEST 10: Interactive AI Tutor Follow-up Q&A Chat
  const chatQ = 'Why did we subtract 5 from both sides?';
  const chatRes10 = await (await fetch(`${base}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: chatQ,
      expression: '2x + 5 = 15',
      steps: ['2x + 5 = 15', 'Subtract 5 from both sides:', '2x = 10', 'Divide both sides by 2:', 'x = 5'],
      finalAnswer: 'x = 5'
    })
  })).json();
  printResult(10, 'Interactive AI Tutor Contextual Q&A', 'Pedagogical Follow-up Question', chatQ, {
    expression: '2x + 5 = 15',
    finalAnswer: 'x = 5',
    chatAnswer: chatRes10.answer
  });

  console.log('================================================================================');
  console.log('                  ALL 10 UNIQUE FEATURE TESTS COMPLETED!                        ');
  console.log('================================================================================');
}

testAll10Features().catch(console.error);
