import katex from 'katex';

/**
 * Converts a standard mathematical string into a clean LaTeX format for KaTeX
 */
export function formatToLatex(expr: string): string {
  if (!expr || typeof expr !== 'string') return '';

  let s = expr.trim();

  // If already standard LaTeX with backslashes, return as is
  if (s.includes('\\frac') || s.includes('\\sqrt') || s.includes('\\pm')) {
    return s;
  }

  // Handle sqrt(...) -> \sqrt{...}
  s = s.replace(/sqrt\(([^()]+)\)/g, '\\sqrt{$1}');
  s = s.replace(/sqrt\{([^}]+)\}/g, '\\sqrt{$1}');
  s = s.replace(/√\(([^()]+)\)/g, '\\sqrt{$1}');
  s = s.replace(/√([0-9a-zA-Z]+)/g, '\\sqrt{$1}');

  // Handle fractions like (a)/(b) -> \frac{a}{b}
  s = s.replace(/\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g, '\\frac{$1}{$2}');
  s = s.replace(/([0-9a-zA-Z]+)\s*\/\s*([0-9a-zA-Z]+)/g, '\\frac{$1}{$2}');

  // Handle multiplication * -> \times or \cdot
  s = s.replace(/\s*\*\s*/g, ' \\times ');

  // Handle plus-minus
  s = s.replace(/\+\-/g, '\\pm ');
  s = s.replace(/±/g, '\\pm ');

  // Handle exponents like x^2, x^3
  s = s.replace(/\^([0-9a-zA-Z]+)/g, '^{$1}');

  // Fix commas in solutions (e.g. x = 2, 3 -> x = 2,\; 3)
  s = s.replace(/,\s*/g, ',\\; ');

  return s;
}

/**
 * Safely renders LaTeX expression using KaTeX to HTML string.
 * Falls back to plain text if syntax is not standard.
 */
export function renderLatexToHtml(expr: string, displayMode: boolean = false): string {
  if (!expr) return '';
  const latex = formatToLatex(expr);
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
    });
  } catch (e) {
    return `<span class="katex-fallback">${expr}</span>`;
  }
}
