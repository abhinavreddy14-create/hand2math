import React, { useState } from 'react';
import { Bot, User, Sparkles, Send, HelpCircle } from 'lucide-react';
import { MathView } from './MathView';

interface TutorProps {
  explanation: string;
  expression: string;
  steps: string[];
  finalAnswer: string;
}

interface ChatMessage {
  question: string;
  answer: string;
}

export const Tutor: React.FC<TutorProps> = ({
  explanation,
  expression,
  steps,
  finalAnswer,
}) => {
  const [question, setQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [chatList, setChatList] = useState<ChatMessage[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const suggestedPrompts = [
    'Can you explain this in simpler terms?',
    'Why did we perform this algebraic operation?',
    'How do I verify this answer is correct?',
    'Give me a similar practice problem!',
  ];

  const handleAskQuestion = async (qText: string) => {
    if (!qText.trim() || isAsking) return;

    const currentQ = qText.trim();
    setQuestion('');
    setIsAsking(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ,
          expression,
          steps,
          finalAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      const data = await response.json();
      setChatList((prev) => [
        ...prev,
        {
          question: currentQ,
          answer: data.answer || 'No explanation available for this query.',
        },
      ]);
    } catch (err) {
      setErrorMsg('Unable to answer right now. Please try asking again.');
    } finally {
      setIsAsking(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAskQuestion(question);
  };

  return (
    <div className="w-full flex flex-col py-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-200/80 shadow-2xs">
            <Bot className="w-3.5 h-3.5 text-violet-600" />
            AI Pedagogical Tutor
          </span>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            Interactive Assistance
          </span>
        </div>
      </div>

      {/* Main Pedagogical Explanation Card */}
      {explanation && (
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50/20 border border-slate-200/90 rounded-2xl p-5 mb-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold text-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Step-by-Step Educational Breakdown</span>
          </div>
          <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line font-sans">
            {explanation}
          </div>
        </div>
      )}

      {/* Follow-up Suggested Prompts */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2 px-1">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
          <span>Suggested Questions:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAskQuestion(prompt)}
              disabled={isAsking}
              className="text-xs text-left px-3 py-1.5 bg-white hover:bg-indigo-50/70 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 rounded-lg border border-slate-200 font-medium transition-colors shadow-2xs disabled:opacity-50"
            >
              &quot;{prompt}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* Chat History */}
      {chatList.length > 0 && (
        <div className="flex flex-col gap-3.5 mb-5">
          {chatList.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              {/* User bubble */}
              <div className="flex items-start gap-2.5 justify-end">
                <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-xs sm:text-sm max-w-[85%] shadow-xs">
                  {item.question}
                </div>
                <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Tutor reply bubble */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-none p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed max-w-[90%] shadow-xs">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {errorMsg && (
        <div className="text-xs text-rose-600 mb-3 text-center">{errorMsg}</div>
      )}

      {/* Tutor Question Input Form */}
      <form onSubmit={handleFormSubmit} className="flex gap-2 w-full mt-1">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about this math concept or step..."
          disabled={isAsking}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
        />
        <button
          type="submit"
          disabled={isAsking || !question.trim()}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 transition-colors shadow-xs flex items-center gap-1.5"
        >
          {isAsking ? (
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce delay-200"></span>
            </span>
          ) : (
            <>
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
