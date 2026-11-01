import React, { useState } from 'react';
import { MathView } from './MathView';
import { CheckCircle2, Copy, CheckCheck, Sparkles, ArrowDown } from 'lucide-react';

interface SolutionProps {
  steps: string[];
  finalAnswer: string;
}

export const Solution: React.FC<SolutionProps> = ({ steps, finalAnswer }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center py-6 border-b border-slate-100">
      {/* Section Header */}
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            SymPy Symbolic Math Engine
          </span>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            Step-by-Step Derivation
          </span>
        </div>
      </div>

      {/* Step by Step Breakdown Cards */}
      <div className="w-full flex flex-col gap-2.5 max-w-xl mb-6">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center justify-between p-3.5 bg-white border border-slate-200/90 rounded-xl shadow-xs hover:border-indigo-200 transition-all">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs shrink-0">
                  {index + 1}
                </span>
                <div className="text-base sm:text-lg text-slate-800 font-medium">
                  <MathView math={step} />
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                {index === 0
                  ? 'Initial equation'
                  : index === steps.length - 1
                  ? 'Solved form'
                  : 'Algebraic transformation'}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center -my-1 text-slate-300">
                <ArrowDown className="w-4 h-4" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Highlighted Final Answer Card */}
      <div className="w-full max-w-xl bg-gradient-to-r from-indigo-50/90 via-violet-50/80 to-indigo-50/90 border border-indigo-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold text-indigo-700">
              Verified Final Answer
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              <MathView math={finalAnswer} />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 text-xs font-semibold rounded-xl shadow-2xs transition-all active:scale-98 shrink-0"
        >
          {copied ? (
            <>
              <CheckCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-indigo-600" />
              <span>Copy Result</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
