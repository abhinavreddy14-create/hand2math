import React, { useState } from 'react';
import {
  MATH_CATEGORIES,
  TOPIC_DATA,
  getTopicOrDefault,
  PracticeQuestion,
} from '../data/mathCurriculum';
import { ChevronRight, Check, X, HelpCircle, Eye, Sparkles } from 'lucide-react';
import { MathView } from './MathView';

interface QuestionState {
  userAnswer: string;
  isAnswered: boolean;
  isCorrect: boolean | null;
  showHint: boolean;
  showSolution: boolean;
}

export const MathLearning: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('algebra');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('linear-equations');
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>({});
  const [isGeneratingExtra, setIsGeneratingExtra] = useState(false);
  const [extraQuestion, setExtraQuestion] = useState<PracticeQuestion | null>(null);

  const currentTopic = getTopicOrDefault(selectedTopicId);

  const getQState = (qId: string): QuestionState => {
    return (
      questionStates[qId] || {
        userAnswer: '',
        isAnswered: false,
        isCorrect: null,
        showHint: false,
        showSolution: false,
      }
    );
  };

  const updateQState = (qId: string, partial: Partial<QuestionState>) => {
    setQuestionStates((prev) => ({
      ...prev,
      [qId]: { ...getQState(qId), ...partial },
    }));
  };

  const checkAnswer = (q: PracticeQuestion) => {
    const state = getQState(q.id);
    const cleanUser = state.userAnswer.toLowerCase().replace(/[$\s,%]/g, '').trim();
    const cleanExpected = q.answer.toLowerCase().replace(/[$\s,%]/g, '').trim();

    let correct = cleanUser === cleanExpected;

    // Check numerical equality
    const numUser = parseFloat(cleanUser);
    const numExpected = parseFloat(cleanExpected);
    if (!isNaN(numUser) && !isNaN(numExpected) && Math.abs(numUser - numExpected) < 1e-4) {
      correct = true;
    }

    updateQState(q.id, {
      isAnswered: true,
      isCorrect: correct,
    });
  };

  // Generate dynamic question from backend
  const handleGenerateExtra = async (difficulty: 'easy' | 'medium' | 'hard') => {
    setIsGeneratingExtra(true);
    try {
      const res = await fetch('/api/practice/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: currentTopic.title,
          difficulty,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setExtraQuestion({
          id: data.id,
          question: data.question,
          answer: data.answer,
          hint: data.hint,
          solutionSteps: data.solutionSteps || [],
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingExtra(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col">
      {/* Top Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Math Learning
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-normal tracking-wide">
          Learn the concept, understand the example, then practice it yourself.
        </p>
      </header>

      {/* Category Pills */}
      <div className="w-full flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 mb-6">
        {MATH_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              if (cat.topics.length > 0) {
                setSelectedTopicId(cat.topics[0].id);
              }
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Topics Selector under current category */}
      <div className="w-full bg-white rounded-xl border border-slate-200 p-3 mb-8 shadow-xs">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
          Topics in {MATH_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {MATH_CATEGORIES.find((c) => c.id === selectedCategory)?.topics.map((top) => (
            <button
              key={top.id}
              onClick={() => {
                setSelectedTopicId(top.id);
                setExtraQuestion(null);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedTopicId === top.id
                  ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {top.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Selected Topic Card */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col gap-8">
        {/* Title */}
        <div className="border-b border-slate-100 pb-4">
          <div className="text-xs uppercase tracking-wider font-semibold text-indigo-600 mb-1">
            {currentTopic.category}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            {currentTopic.title}
          </h2>
          {currentTopic.subTopics && currentTopic.subTopics.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                Sub-topics:
              </span>
              {currentTopic.subTopics.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 bg-indigo-50/70 text-indigo-700 text-xs rounded-md border border-indigo-200/60 font-medium"
                >
                  {sub}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 1. What is it? */}
        <section className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">
              1
            </span>
            What is {currentTopic.title}?
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {currentTopic.whatIsIt.definition}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                Important Terms
              </span>
              <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                {currentTopic.whatIsIt.terms.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                Formula / Rule
              </span>
              <p className="text-xs font-mono font-medium text-indigo-700 mt-1">
                {currentTopic.whatIsIt.formulaOrRule}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 mt-1 italic">
            <strong>Why it is used:</strong> {currentTopic.whatIsIt.whyUsed}
          </div>
        </section>

        {/* 2. Example 1 */}
        <section className="flex flex-col gap-3 border-t border-slate-100 pt-6">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">
              2
            </span>
            Example
          </h3>
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="text-sm font-semibold text-slate-800 mb-3">
              Problem: {currentTopic.example1.problem}
            </div>
            <div className="flex flex-col gap-2.5">
              {currentTopic.example1.steps.map((st, idx) => (
                <div key={idx} className="bg-white border border-slate-200/70 rounded-lg p-3">
                  <div className="text-xs font-medium text-indigo-600 mb-1">
                    Step {idx + 1}: {st.action}
                  </div>
                  <div className="text-sm font-serif font-medium text-slate-800">
                    <MathView math={st.math} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md inline-block">
              Final Answer: <MathView math={currentTopic.example1.finalAnswer} />
            </div>
          </div>
        </section>

        {/* 3. Example 2 */}
        <section className="flex flex-col gap-3 border-t border-slate-100 pt-6">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">
              3
            </span>
            Another Example (Intermediate Level)
          </h3>
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="text-sm font-semibold text-slate-800 mb-3">
              Problem: {currentTopic.example2.problem}
            </div>
            <div className="flex flex-col gap-2.5">
              {currentTopic.example2.steps.map((st, idx) => (
                <div key={idx} className="bg-white border border-slate-200/70 rounded-lg p-3">
                  <div className="text-xs font-medium text-indigo-600 mb-1">
                    Step {idx + 1}: {st.action}
                  </div>
                  <div className="text-sm font-serif font-medium text-slate-800">
                    <MathView math={st.math} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md inline-block">
              Final Answer: <MathView math={currentTopic.example2.finalAnswer} />
            </div>
          </div>
        </section>

        {/* 4. Key Rules (Remember) */}
        <section className="flex flex-col gap-3 border-t border-slate-100 pt-6">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">
              4
            </span>
            Key Rules &amp; Formulas
          </h3>
          <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-xl p-4">
            <div className="text-xs uppercase font-bold tracking-wider text-indigo-900 mb-2">
              Remember
            </div>
            <ul className="text-xs text-indigo-950 space-y-1.5 list-disc list-inside leading-relaxed">
              {currentTopic.keyRules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Common Mistakes */}
        <section className="flex flex-col gap-3 border-t border-slate-100 pt-6">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">
              5
            </span>
            Common Mistakes
          </h3>
          <div className="flex flex-col gap-2.5">
            {currentTopic.commonMistakes.map((m, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs"
              >
                <div className="text-rose-700 flex items-start gap-1.5">
                  <span className="font-bold">❌</span>
                  <span>{m.mistake}</span>
                </div>
                <div className="text-emerald-700 flex items-start gap-1.5 border-t md:border-t-0 md:border-l border-slate-200 pt-1.5 md:pt-0 md:pl-3">
                  <span className="font-bold">✅</span>
                  <span>{m.correct}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRACTICE SECTION */}
        <section className="flex flex-col gap-6 border-t-2 border-slate-100 pt-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Practice
            </h3>
            <p className="text-xs text-slate-500">
              Test your understanding with Easy, Medium, and Challenge exercises.
            </p>
          </div>

          {/* Easy Level */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                Easy (3 Questions)
              </span>
            </div>
            {currentTopic.practice.easy.map((q, idx) => (
              <PracticeCard
                key={q.id}
                index={idx + 1}
                question={q}
                state={getQState(q.id)}
                onAnswerChange={(val) => updateQState(q.id, { userAnswer: val })}
                onCheck={() => checkAnswer(q)}
                onToggleHint={() =>
                  updateQState(q.id, { showHint: !getQState(q.id).showHint })
                }
                onToggleSolution={() =>
                  updateQState(q.id, { showSolution: !getQState(q.id).showSolution })
                }
              />
            ))}
          </div>

          {/* Medium Level */}
          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                Medium (3 Questions)
              </span>
            </div>
            {currentTopic.practice.medium.map((q, idx) => (
              <PracticeCard
                key={q.id}
                index={idx + 1}
                question={q}
                state={getQState(q.id)}
                onAnswerChange={(val) => updateQState(q.id, { userAnswer: val })}
                onCheck={() => checkAnswer(q)}
                onToggleHint={() =>
                  updateQState(q.id, { showHint: !getQState(q.id).showHint })
                }
                onToggleSolution={() =>
                  updateQState(q.id, { showSolution: !getQState(q.id).showSolution })
                }
              />
            ))}
          </div>

          {/* Challenge Level */}
          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                Challenge (2 Questions)
              </span>
            </div>
            {currentTopic.practice.challenge.map((q, idx) => (
              <PracticeCard
                key={q.id}
                index={idx + 1}
                question={q}
                state={getQState(q.id)}
                onAnswerChange={(val) => updateQState(q.id, { userAnswer: val })}
                onCheck={() => checkAnswer(q)}
                onToggleHint={() =>
                  updateQState(q.id, { showHint: !getQState(q.id).showHint })
                }
                onToggleSolution={() =>
                  updateQState(q.id, { showSolution: !getQState(q.id).showSolution })
                }
              />
            ))}
          </div>

          {/* Dynamic AI Generation Option */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col items-center">
            <button
              type="button"
              disabled={isGeneratingExtra}
              onClick={() => handleGenerateExtra('medium')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              {isGeneratingExtra ? 'Generating Practice...' : 'Generate New Dynamic Question'}
            </button>

            {extraQuestion && (
              <div className="w-full mt-4">
                <PracticeCard
                  question={extraQuestion}
                  index={1}
                  state={getQState(extraQuestion.id)}
                  onAnswerChange={(val) => updateQState(extraQuestion.id, { userAnswer: val })}
                  onCheck={() => checkAnswer(extraQuestion)}
                  onToggleHint={() =>
                    updateQState(extraQuestion.id, {
                      showHint: !getQState(extraQuestion.id).showHint,
                    })
                  }
                  onToggleSolution={() =>
                    updateQState(extraQuestion.id, {
                      showSolution: !getQState(extraQuestion.id).showSolution,
                    })
                  }
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

interface PracticeCardProps {
  question: PracticeQuestion;
  index: number;
  state: QuestionState;
  onAnswerChange: (val: string) => void;
  onCheck: () => void;
  onToggleHint: () => void;
  onToggleSolution: () => void;
}

const PracticeCard: React.FC<PracticeCardProps> = ({
  question,
  index,
  state,
  onAnswerChange,
  onCheck,
  onToggleHint,
  onToggleSolution,
}) => {
  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-bold text-slate-500">Q{index}.</span>
        <div className="flex-1 text-sm font-medium text-slate-800">
          {question.question}
        </div>
      </div>

      {/* Answer input row */}
      <div className="flex flex-wrap items-center gap-2 mt-1">
        <span className="text-xs text-slate-500 font-medium">Your answer:</span>
        <input
          type="text"
          value={state.userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="e.g. 5"
          className="w-32 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter') onCheck();
          }}
        />
        <button
          type="button"
          onClick={onCheck}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md transition-colors shadow-2xs"
        >
          Check Answer
        </button>

        <button
          type="button"
          onClick={onToggleHint}
          className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1 ml-auto"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          {state.showHint ? 'Hide Hint' : 'Show Hint'}
        </button>

        <button
          type="button"
          onClick={onToggleSolution}
          className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1"
        >
          <Eye className="w-3.5 h-3.5" />
          {state.showSolution ? 'Hide Solution' : 'Show Solution'}
        </button>
      </div>

      {/* Result feedback */}
      {state.isAnswered && (
        <div
          className={`text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 ${
            state.isCorrect
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-rose-100 text-rose-800'
          }`}
        >
          {state.isCorrect ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Correct!</span>
            </>
          ) : (
            <>
              <X className="w-3.5 h-3.5 text-rose-600" />
              <span>Not quite. Try again.</span>
            </>
          )}
        </div>
      )}

      {/* Hint container */}
      {state.showHint && (
        <div className="bg-amber-50/70 border border-amber-200 text-amber-900 text-xs p-2.5 rounded-lg leading-relaxed">
          <strong>Hint:</strong> {question.hint}
        </div>
      )}

      {/* Solution container */}
      {state.showSolution && (
        <div className="bg-white border border-slate-200 text-slate-700 text-xs p-3 rounded-lg flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Step-by-Step Solution:</span>
          {question.solutionSteps.map((st, i) => (
            <div key={i} className="font-serif text-slate-800">
              <MathView math={st} />
            </div>
          ))}
          <div className="mt-1 font-bold text-indigo-700">
            Final Answer: <MathView math={question.answer} />
          </div>
        </div>
      )}
    </div>
  );
};
