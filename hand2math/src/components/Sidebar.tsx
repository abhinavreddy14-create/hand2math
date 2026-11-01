import React from 'react';
import { PenTool, BookOpen, CheckCircle, Menu, X, Cpu, CheckCircle2, Sparkles } from 'lucide-react';

export type PageId = 'tutor' | 'learning' | 'practice';

interface SidebarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  isOpen,
  onToggle,
}) => {
  const navItems = [
    {
      id: 'tutor' as PageId,
      name: 'Solver & AI Tutor',
      description: 'Handwriting, Image OCR & Word Problems',
      icon: PenTool,
      badge: 'CNN Active',
    },
    {
      id: 'learning' as PageId,
      name: 'Math Curriculum',
      description: 'Concept → Example → Practice',
      icon: BookOpen,
      badge: '50+ Topics',
    },
    {
      id: 'practice' as PageId,
      name: 'Practice & Progress',
      description: 'AI generator, streak & problem bank',
      icon: CheckCircle,
      badge: 'Interactive',
    },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden w-full bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
            ∑
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">Hand2Math</h1>
            <p className="text-[10px] text-indigo-600 font-medium">PyTorch CNN + SymPy</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="lg:hidden fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-30 transition-opacity"
        />
      )}

      {/* Left Sidebar Menu */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white/95 backdrop-blur-md border-r border-slate-200/90 flex flex-col z-40 transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              ∑
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                  Hand2Math
                </h2>
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-indigo-100 text-indigo-700 uppercase tracking-wider">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">
                Academic Math Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3.5 space-y-2 overflow-y-auto">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 py-1">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectPage(item.id);
                  if (isOpen) onToggle();
                }}
                className={`w-full flex items-start gap-3 p-3 rounded-2xl text-left transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-50/90 to-violet-50/80 text-indigo-900 font-semibold border border-indigo-200/90 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold leading-tight truncate">{item.name}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug font-normal truncate">
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Live Engine System Status Card */}
        <div className="p-4 border-t border-slate-100/80">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Engine Status
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ONLINE
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Cpu className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="font-medium truncate">PyTorch 2D CNN (weights.pth)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-violet-600 shrink-0" />
              <span className="font-medium truncate">SymPy Deterministic CAS</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
