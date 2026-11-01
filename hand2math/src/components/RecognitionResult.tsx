import React, { useState } from 'react';
import { Edit2, Check, RefreshCw, Copy, CheckCheck, Cpu } from 'lucide-react';
import { MathView } from './MathView';

interface RecognitionResultProps {
  expression: string;
  onEditExpression?: (newExpr: string) => void;
  isResolving?: boolean;
}

export const RecognitionResult: React.FC<RecognitionResultProps> = ({
  expression,
  onEditExpression,
  isResolving = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(expression);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    if (editedText.trim() && editedText.trim() !== expression) {
      onEditExpression?.(editedText.trim());
    }
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const insertSymbol = (sym: string) => {
    setEditedText((prev) => prev + sym);
  };

  const quickSymbols = ['x', 'y', '^2', '+', '-', '*', '/', '=', '(', ')', 'sqrt('];

  return (
    <div className="w-full flex flex-col items-center py-5 border-b border-slate-100">
      {/* Header with Badges */}
      <div className="flex flex-wrap items-center justify-between w-full mb-3 px-2 gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <Cpu className="w-3 h-3 text-emerald-600" />
            PyTorch CNN Model Verified
          </span>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Recognized Expression
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="text-[11px] text-slate-500 hover:text-indigo-600 flex items-center gap-1 font-medium px-2 py-1 rounded-md hover:bg-slate-100 transition-colors"
            title="Copy formula to clipboard"
          >
            {copied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          {!isEditing && onEditExpression && (
            <button
              type="button"
              onClick={() => {
                setEditedText(expression);
                setIsEditing(true);
              }}
              className="text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium px-2.5 py-1 rounded-md bg-indigo-50/80 border border-indigo-200/80 hover:bg-indigo-100 transition-colors shadow-2xs"
              title="Edit equation if any character was misread"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Equation</span>
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="flex flex-col items-center gap-3 w-full max-w-lg mt-1 p-4 bg-slate-50 border border-indigo-200 rounded-xl shadow-xs">
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white border border-indigo-300 rounded-lg text-lg font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
              }}
              autoFocus
            />
            <button
              type="button"
              onClick={handleSave}
              disabled={isResolving}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
            >
              {isResolving ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              <span>Solve</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Quick Symbol Insert Bar */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full pt-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase mr-1">Insert:</span>
            {quickSymbols.map((sym) => (
              <button
                key={sym}
                type="button"
                onClick={() => insertSymbol(sym)}
                className="px-2 py-0.5 text-xs font-mono bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded shadow-2xs text-slate-700"
              >
                {sym}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-4 px-6 bg-gradient-to-b from-slate-50/80 to-white rounded-xl border border-slate-200/90 shadow-xs">
          <div className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-wide">
            <MathView math={expression} displayMode={true} />
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-2 select-all">
            {expression}
          </div>
        </div>
      )}
    </div>
  );
};
