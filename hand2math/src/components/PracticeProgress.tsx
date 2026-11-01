import React, { useState, useRef, useEffect } from 'react';
import { MATH_CATEGORIES } from '../data/mathCurriculum';
import { getProblemsForTopicAndDifficulty, PracticeBankProblem } from '../data/practiceProblemBank';
import {
  Check,
  X,
  RefreshCw,
  PenTool,
  Type,
  HelpCircle,
  Eye,
  ArrowRight,
  ArrowLeft,
  Flame,
  Award,
  Trophy,
  Sparkles,
  Zap,
} from 'lucide-react';
import { MathView } from './MathView';

export const PracticeProgress: React.FC = () => {
  // Topic & difficulty selection
  const [selectedTopic, setSelectedTopic] = useState('Linear Equations');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  // 10 problems bank for current topic & difficulty
  const [problemList, setProblemList] = useState<PracticeBankProblem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Per-problem outcome status across the 10 problems
  const [problemStatus, setProblemStatus] = useState<Record<number, 'correct' | 'wrong' | 'unattempted'>>({});

  // User answer state
  const [answerMode, setAnswerMode] = useState<'type' | 'draw'>('type');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Gamification & Progress tracking
  const [stats, setStats] = useState({
    attempted: 0,
    correct: 0,
    streak: 0,
    bestStreak: 0,
  });

  const [showCelebration, setShowCelebration] = useState(false);

  // Small canvas for "Draw your solution"
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Load 10 problems when topic or difficulty changes
  useEffect(() => {
    const problems = getProblemsForTopicAndDifficulty(selectedTopic, difficulty);
    setProblemList(problems);
    setCurrentIndex(0);
    setProblemStatus({});
    resetProblemState();
  }, [selectedTopic, difficulty]);

  const resetProblemState = () => {
    setHasChecked(false);
    setIsCorrect(null);
    setShowHint(false);
    setShowSolution(false);
    setTypedAnswer('');
    setAttemptCount(0);
    setShowCelebration(false);
    clearCanvas();
  };

  const currentProblem = problemList[currentIndex] || null;

  // Find parent category for current topic
  const currentCategory = MATH_CATEGORIES.find((cat) =>
    cat.topics.some((t) => t.name.toLowerCase() === selectedTopic.toLowerCase() || t.id === selectedTopic)
  )?.name || 'Mathematics';

  const initSmallCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  useEffect(() => {
    if (answerMode === 'draw') {
      initSmallCanvas();
    }
  }, [answerMode, currentIndex]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const pt = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    lastPointRef.current = pt;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const pt = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const lastPt = lastPointRef.current || pt;

    ctx.beginPath();
    ctx.moveTo(lastPt.x, lastPt.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPointRef.current = pt;
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  // Insert math symbol chip into typed answer
  const handleInsertSymbol = (symbol: string) => {
    setTypedAnswer((prev) => prev + symbol);
    inputRef.current?.focus();
  };

  // Client-side smart answer validation fallback
  const verifyAnswerLocal = (studentAns: string, expectedAns: string): boolean => {
    const clean = (s: string) =>
      s
        .toLowerCase()
        .replace(/[x-z]\s*=\s*/g, '')
        .replace(/ans(wer)?\s*[:=]\s*/g, '')
        .replace(/[$,°%]/g, '')
        .replace(/\s+/g, '')
        .trim();

    const sNorm = clean(studentAns);
    const eNorm = clean(expectedAns);

    if (sNorm === eNorm) return true;

    // Check fraction equivalences e.g. 1/2 vs 0.5
    const evalFrac = (val: string): number | null => {
      const match = val.match(/^([+-]?\d+(?:\.\d+)?)\/([+-]?\d+(?:\.\d+)?)$/);
      if (match) {
        const denom = parseFloat(match[2]);
        if (denom !== 0) return parseFloat(match[1]) / denom;
      }
      const num = parseFloat(val);
      return !isNaN(num) ? num : null;
    };

    const sVal = evalFrac(sNorm);
    const eVal = evalFrac(eNorm);
    if (sVal !== null && eVal !== null && Math.abs(sVal - eVal) < 1e-4) {
      return true;
    }

    // Boolean or classification words
    if ((sNorm === 'yes' && eNorm === 'yes') || (sNorm === 'no' && eNorm === 'no')) return true;
    if (sNorm.includes('rational') && eNorm.includes('rational') && !sNorm.includes('irrational') && !eNorm.includes('irrational')) return true;
    if (sNorm.includes('irrational') && eNorm.includes('irrational')) return true;

    return false;
  };

  // Check answer with API + local intelligence
  const handleCheckAnswer = async () => {
    if (!currentProblem) return;

    let ansToCheck = typedAnswer.trim();

    // If drawing mode, transcribe from canvas
    if (answerMode === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const imgData = canvas.toDataURL('image/png');
        try {
          const recRes = await fetch('/api/recognize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imgData }),
          });
          const recData = await recRes.json();
          if (recData.success && recData.expression) {
            ansToCheck = recData.expression;
            setTypedAnswer(ansToCheck);
          }
        } catch {
          // fallback to whatever typed answer existed
        }
      }
    }

    if (!ansToCheck) return;

    let correct = false;

    try {
      const res = await fetch('/api/practice/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentProblem.question,
          studentAnswer: ansToCheck,
          expectedAnswer: currentProblem.answer,
          solutionSteps: currentProblem.solutionSteps,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        correct = !!data.isCorrect;
      } else {
        correct = verifyAnswerLocal(ansToCheck, currentProblem.answer);
      }
    } catch {
      correct = verifyAnswerLocal(ansToCheck, currentProblem.answer);
    }

    setIsCorrect(correct);
    setHasChecked(true);
    setAttemptCount((prev) => prev + 1);

    // Update per-question outcomes
    setProblemStatus((prev) => ({
      ...prev,
      [currentIndex]: correct ? 'correct' : 'wrong',
    }));

    // Update streak and statistics
    if (attemptCount === 0) {
      setStats((prev) => {
        const newStreak = correct ? prev.streak + 1 : 0;
        const newBestStreak = Math.max(prev.bestStreak, newStreak);
        return {
          attempted: prev.attempted + 1,
          correct: correct ? prev.correct + 1 : prev.correct,
          streak: newStreak,
          bestStreak: newBestStreak,
        };
      });
    }

    if (correct) {
      setShowCelebration(true);
    }
  };

  // Next / Previous Problem navigation through the 10 problems
  const handleNextProblem = () => {
    if (currentIndex < problemList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    resetProblemState();
  };

  const handlePrevProblem = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(problemList.length - 1);
    }
    resetProblemState();
  };

  // Generate an extra dynamic problem using backend
  const handleGenerateAIProblem = async () => {
    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/practice/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic,
          difficulty,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const newProb: PracticeBankProblem = {
          id: `ai-${Date.now()}`,
          topic: selectedTopic,
          difficulty,
          question: data.question,
          answer: data.answer,
          hint: data.hint,
          solutionSteps: data.solutionSteps || [],
        };
        setProblemList((prev) => [newProb, ...prev]);
        setCurrentIndex(0);
        resetProblemState();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const accuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;

  // Math quick input chips
  const mathChips = ['x', '+', '-', '×', '/', '^', '√', 'π', '(', ')'];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col">
      {/* Header */}
      <header className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-2 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Math Practice Arena</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Practice &amp; Mastery
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto font-normal">
          10 rigorously verified problems per topic across all mathematical branches with step-by-step guidance.
        </p>
      </header>

      {/* Progress & Gamification Dashboard */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Solved</span>
            <span className="text-lg font-bold text-slate-900">
              {stats.correct} <span className="text-xs font-normal text-slate-400">/ {stats.attempted}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Accuracy</span>
            <span className="text-lg font-bold text-emerald-600">{accuracy}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${
            stats.streak >= 3 ? 'bg-amber-100 text-amber-600 animate-pulse' : 'bg-slate-100 text-slate-500'
          }`}>
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Streak</span>
            <span className="text-lg font-bold text-amber-600">
              {stats.streak} <span className="text-xs font-normal text-slate-400">(Best: {stats.bestStreak})</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div className="truncate">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Category</span>
            <span className="text-xs font-bold text-slate-800 truncate block">{currentCategory}</span>
          </div>
        </div>
      </div>

      {/* Topic & Difficulty Controls */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
        {/* Choose Topic - Grouped by Category */}
        <div className="w-full md:w-auto flex-1">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
            <span>Select Curriculum Topic (59 Topics)</span>
          </label>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors shadow-2xs cursor-pointer"
          >
            {MATH_CATEGORIES.map((cat) => (
              <optgroup key={cat.id} label={`📂 ${cat.name}`}>
                {cat.topics.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Choose Difficulty */}
        <div className="w-full md:w-auto">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
            Difficulty Level
          </label>
          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            {(['easy', 'medium', 'hard'] as const).map((lvl) => {
              const isActive = difficulty === lvl;
              const badgeColors = {
                easy: isActive ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900',
                medium: isActive ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900',
                hard: isActive ? 'bg-violet-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900',
              };
              return (
                <button
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${badgeColors[lvl]}`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Dynamic Problem Button */}
        <div className="w-full md:w-auto self-end">
          <button
            type="button"
            onClick={handleGenerateAIProblem}
            disabled={isGeneratingAI}
            className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-2xs disabled:opacity-60 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAI ? 'animate-spin' : ''}`} />
            <span>Generate Problem</span>
          </button>
        </div>
      </div>

      {/* 10 Problem Navigator Bar */}
      <div className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl p-3 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Problem Set:</span>
          <span className="text-xs font-mono font-medium text-slate-500">
            {currentIndex + 1} of {problemList.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {problemList.map((_, idx) => {
            const status = problemStatus[idx] || 'unattempted';
            const isCurrent = currentIndex === idx;

            let btnStyle = 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100';
            if (status === 'correct') {
              btnStyle = 'bg-emerald-600 text-white border border-emerald-600';
            } else if (status === 'wrong') {
              btnStyle = 'bg-rose-500 text-white border border-rose-500';
            }

            return (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  resetProblemState();
                }}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all relative flex items-center justify-center ${btnStyle} ${
                  isCurrent ? 'ring-2 ring-indigo-600 ring-offset-1 scale-105 z-10' : ''
                }`}
                title={`Problem ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Practice Problem Card */}
      {currentProblem && (
        <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
          {/* Top Banner Accent */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                {currentCategory}
              </span>
              <span className="text-xs font-semibold text-slate-700">
                {selectedTopic}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {difficulty}
              </span>
              <span className="text-xs font-mono font-medium text-slate-400">
                #{currentIndex + 1}
              </span>
            </div>
          </div>

          {/* Problem Statement with KaTeX */}
          <div className="py-2">
            <h2 className="text-xl sm:text-2xl font-serif text-slate-900 font-medium leading-relaxed">
              <MathView math={currentProblem.question} />
            </h2>
          </div>

          {/* Answer Input Controls */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                Submit Your Solution
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setAnswerMode('type')}
                  className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                    answerMode === 'type'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  Type
                </button>
                <button
                  type="button"
                  onClick={() => setAnswerMode('draw')}
                  className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                    answerMode === 'draw'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  Draw
                </button>
              </div>
            </div>

            {/* Quick Math Symbols Insertion Bar for Type mode */}
            {answerMode === 'type' && (
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Quick Math:</span>
                {mathChips.map((sym) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => handleInsertSymbol(sym)}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 transition-colors flex items-center justify-center shadow-2xs"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            )}

            {/* Option 1: Type Answer Input */}
            {answerMode === 'type' ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  placeholder="Type answer (e.g. 12, 3/4, or x = 12)"
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckAnswer();
                  }}
                />
                <button
                  type="button"
                  onClick={handleCheckAnswer}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Check Answer</span>
                </button>
              </div>
            ) : (
              /* Option 2: Draw Solution Canvas */
              <div className="flex flex-col gap-2">
                <div className="relative w-full h-48 bg-white rounded-2xl border border-slate-300 overflow-hidden shadow-2xs">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full touch-none cursor-crosshair block"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="px-2.5 py-1 bg-slate-100/90 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg border border-slate-300 shadow-2xs"
                    >
                      Clear Canvas
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Write digits or algebraic answer inside canvas</span>
                  <button
                    type="button"
                    onClick={handleCheckAnswer}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-2xs transition-colors cursor-pointer"
                  >
                    Check Drawn Answer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Feedback Section */}
          {hasChecked && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border flex flex-col gap-2.5 transition-all animate-fadeIn ${
                isCorrect
                  ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/90 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-base">
                  {isCorrect ? (
                    <>
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                      <span>Correct Solution! 🎉</span>
                    </>
                  ) : (
                    <>
                      <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center">
                        <X className="w-4 h-4" />
                      </div>
                      <span>Not Quite Right — Try Again</span>
                    </>
                  )}
                </div>

                {isCorrect && (
                  <button
                    type="button"
                    onClick={handleNextProblem}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer animate-pulse"
                  >
                    <span>Next Problem</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {isCorrect && (
                <div className="text-xs text-emerald-800 leading-relaxed font-medium">
                  Superb work! Your answer matches the mathematical solution for this {selectedTopic} problem.
                </div>
              )}

              {!isCorrect && (
                <div className="text-xs text-rose-800 leading-relaxed font-medium">
                  Your submitted answer does not match the verified solution. Re-check calculations or review the Hint below.
                </div>
              )}
            </div>
          )}

          {/* Bottom Action Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevProblem}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextProblem}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-amber-500" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>

              {(attemptCount >= 1 || isCorrect) && (
                <button
                  type="button"
                  onClick={() => setShowSolution(!showSolution)}
                  className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-indigo-500" />
                  {showSolution ? 'Hide Solution' : 'View Full Solution'}
                </button>
              )}
            </div>
          </div>

          {/* Hint View with KaTeX */}
          {showHint && (
            <div className="bg-amber-50/80 border border-amber-200 text-amber-900 text-xs p-4 rounded-2xl leading-relaxed animate-fadeIn">
              <div className="font-bold mb-1 flex items-center gap-1.5 text-amber-800">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Helpful Hint:</span>
              </div>
              <MathView math={currentProblem.hint} />
            </div>
          )}

          {/* Solution View with KaTeX steps */}
          {showSolution && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Step-by-Step Verified Solution
                </span>
                <span className="text-xs text-slate-400 font-mono">Verified</span>
              </div>
              <div className="space-y-2 font-serif text-sm text-slate-800 bg-white p-4 rounded-xl border border-slate-200/70">
                {currentProblem.solutionSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400 mt-1">{idx + 1}.</span>
                    <div className="flex-1"><MathView math={step} /></div>
                  </div>
                ))}
              </div>
              <div className="mt-1 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-xl inline-flex items-center gap-2 self-start">
                <span>Final Answer:</span>
                <MathView math={currentProblem.answer} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
