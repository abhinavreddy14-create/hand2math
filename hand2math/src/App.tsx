import React, { useState, useEffect, useRef } from 'react';
import { DrawingCanvas, DrawingCanvasHandle } from './components/DrawingCanvas';
import { RecognitionResult } from './components/RecognitionResult';
import { Solution } from './components/Solution';
import { Tutor } from './components/Tutor';
import { MathLearning } from './components/MathLearning';
import { PracticeProgress } from './components/PracticeProgress';
import { Sidebar, PageId } from './components/Sidebar';
import { Sparkles, Cpu, RotateCcw, ArrowRight } from 'lucide-react';

interface SolutionData {
  equationSteps: string[];
  finalAnswer: string;
  latex?: string;
  context?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('tutor');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showSplash, setShowSplash] = useState(true);
  const [splashFade, setSplashFade] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [recognizedExpr, setRecognizedExpr] = useState<string | null>(null);
  const [solution, setSolution] = useState<SolutionData | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  const canvasRef = useRef<DrawingCanvasHandle | null>(null);

  // Smooth academic entering animation sequence (1.1s)
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setSplashFade(true);
    }, 900);

    const endTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1250);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, []);

  const dismissSplash = () => {
    setSplashFade(true);
    setTimeout(() => setShowSplash(false), 200);
  };

  const handleResetAll = () => {
    setRecognizedExpr(null);
    setSolution(null);
    setExplanation(null);
    setErrorMessage(null);
    canvasRef.current?.clear();
  };

  const handleRecognizeAndSolve = async () => {
    setErrorMessage(null);

    if (!canvasRef.current) return;
    const mode = canvasRef.current.getMode();

    // Handling Mode: English / Text Problem
    if (mode === 'text') {
      const text = canvasRef.current.getTextProblem();
      if (!text) {
        setErrorMessage('Please type a math equation or English word problem first.');
        return;
      }

      setIsProcessing(true);
      setRecognizedExpr(null);
      setSolution(null);
      setExplanation(null);

      try {
        const res = await fetch('/api/solve-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        const data = await res.json();
        if (!res.ok || !data.isValid) {
          setErrorMessage(data.message || 'Unable to solve this problem. Please check the wording and try again.');
          setIsProcessing(false);
          return;
        }

        setRecognizedExpr(data.expression || text);
        setSolution({
          equationSteps: data.equationSteps || [data.expression],
          finalAnswer: data.finalAnswer,
          context: data.context,
        });
        setExplanation(data.explanation);
      } catch (err) {
        setErrorMessage('Error processing problem. Please try again.');
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    // Handling Modes: Draw or Upload Image
    if (!canvasRef.current.hasStrokes()) {
      setErrorMessage('Please draw or upload a mathematical expression first.');
      return;
    }

    const imageData = canvasRef.current.getImageDataUrl();
    if (!imageData) {
      setErrorMessage('Please draw or upload a mathematical expression first.');
      return;
    }

    setIsProcessing(true);
    setRecognizedExpr(null);
    setSolution(null);
    setExplanation(null);

    try {
      // 1. Recognize math via trained PyTorch CNN
      const recRes = await fetch('/api/recognize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData }),
      });

      const recData = await recRes.json();

      if (!recRes.ok || !recData.success || !recData.expression) {
        if (recData.error === 'empty') {
          setErrorMessage('Please draw or upload a mathematical expression first.');
        } else {
          setErrorMessage('Unable to recognize the expression. Please try writing or uploading it more clearly.');
        }
        setIsProcessing(false);
        return;
      }

      const expression = recData.expression;
      setRecognizedExpr(expression);

      // 2. Symbolically solve and verify using SymPy
      const solveRes = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression }),
      });

      const solveData = await solveRes.json();

      if (!solveRes.ok || !solveData.isValid) {
        if (solveData.errorType === 'unsupported') {
          setErrorMessage('This type of mathematical expression is not currently supported.');
        } else {
          setErrorMessage('The recognized expression could not be solved. Please check the handwriting and try again.');
        }
        setIsProcessing(false);
        return;
      }

      setSolution({
        equationSteps: solveData.equationSteps || [expression],
        finalAnswer: solveData.finalAnswer || '',
        latex: solveData.latex || '',
      });

      // 3. AI Tutor generates step-by-step pedagogical explanation
      const explainRes = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expression,
          steps: solveData.equationSteps,
          finalAnswer: solveData.finalAnswer,
        }),
      });

      if (explainRes.ok) {
        const explainData = await explainRes.json();
        setExplanation(explainData.explanation);
      }
    } catch (err) {
      setErrorMessage('Unable to recognize the expression. Please try writing or uploading it more clearly.');
    } finally {
      setIsProcessing(false);
    }
  };

  const [isResolvingEdit, setIsResolvingEdit] = useState(false);

  // Allow user to edit recognized expression directly and re-solve
  const handleEditExpression = async (newExpr: string) => {
    if (!newExpr.trim()) return;
    setIsResolvingEdit(true);
    setErrorMessage(null);

    try {
      const solveRes = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: newExpr.trim() }),
      });

      const solveData = await solveRes.json();
      if (!solveRes.ok || !solveData.isValid) {
        setErrorMessage(solveData.message || 'Unable to solve this expression. Please verify the formula.');
        setIsResolvingEdit(false);
        return;
      }

      setRecognizedExpr(newExpr.trim());
      setSolution({
        equationSteps: solveData.equationSteps || [newExpr.trim()],
        finalAnswer: solveData.finalAnswer || '',
        latex: solveData.latex || '',
      });

      const explainRes = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expression: newExpr.trim(),
          steps: solveData.equationSteps,
          finalAnswer: solveData.finalAnswer,
        }),
      });

      if (explainRes.ok) {
        const explainData = await explainRes.json();
        setExplanation(explainData.explanation);
      }
    } catch (e) {
      setErrorMessage('Error re-solving expression.');
    } finally {
      setIsResolvingEdit(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-50 text-slate-900 font-sans flex flex-col lg:flex-row">
      {/* Short Entering Animation Overlay */}
      {showSplash && (
        <div
          onClick={dismissSplash}
          className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-300 ease-out cursor-pointer ${
            splashFade ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-center px-4 max-w-md">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4 animate-bounce">
              ∑
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
              Hand2Math
            </h1>
            <p className="text-sm sm:text-base font-medium text-indigo-600 tracking-wide">
              Hybrid Deep Learning &amp; Symbolic AI Math Tutor
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
              <span>Click anywhere to start</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      )}

      {/* Left Menu / Sidebar Navigation */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* PAGE 1: HYBRID MATH SOLVER / TUTOR */}
        {currentPage === 'tutor' && (
          <main className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center">
            {/* Header */}
            <header className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200/80 mb-2 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>PyTorch 2D ConvNet + SymPy Engine Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Handwritten Math Solver &amp; AI Tutor
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal tracking-wide">
                Draw, upload photo, or type mathematics. Get instant symbolic derivation and step-by-step tutoring.
              </p>
            </header>

            {/* Main Interactive Card */}
            <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 flex flex-col items-center">
              {/* Drawing / Upload / Text Canvas Area */}
              <DrawingCanvas
                ref={canvasRef}
                onRecognizeAndSolve={handleRecognizeAndSolve}
                isLoading={isProcessing}
              />

              {/* Error Message Alert */}
              {errorMessage && (
                <div className="w-full mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs sm:text-sm text-center font-medium animate-fadeIn">
                  {errorMessage}
                </div>
              )}

              {/* Results Section */}
              {recognizedExpr && solution && (
                <div className="w-full mt-6 flex flex-col items-center divide-y divide-slate-100 border-t border-slate-100 animate-fadeIn">
                  {/* Results Header with Reset Button */}
                  <div className="w-full py-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Verification &amp; Solution
                    </span>
                    <button
                      type="button"
                      onClick={handleResetAll}
                      className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1 font-medium px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Clear solution and start a new problem"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>New Problem</span>
                    </button>
                  </div>

                  {/* 1. Recognized Expression */}
                  <RecognitionResult
                    expression={recognizedExpr}
                    onEditExpression={handleEditExpression}
                    isResolving={isResolvingEdit}
                  />

                  {/* 2. Symbolic Solver Solution */}
                  <Solution
                    steps={solution.equationSteps}
                    finalAnswer={solution.finalAnswer}
                  />

                  {/* 3. AI Tutor Explanation & Follow-up Q&A */}
                  <Tutor
                    explanation={explanation || ''}
                    expression={recognizedExpr}
                    steps={solution.equationSteps}
                    finalAnswer={solution.finalAnswer}
                  />
                </div>
              )}
            </div>
          </main>
        )}

        {/* PAGE 2: MATH LEARNING */}
        {currentPage === 'learning' && <MathLearning />}

        {/* PAGE 3: PRACTICE & PROGRESS */}
        {currentPage === 'practice' && <PracticeProgress />}
      </div>
    </div>
  );
}
