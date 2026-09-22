import React from 'react';
import { EducationLevel, SubjectCategory, ExamBoard } from '../types';
import { EDUCATION_LEVELS, SUBJECT_CATEGORIES } from '../data/mockData';
import {
  Search,
  Filter,
  Layers,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface SmartFilterProps {
  selectedLevel: EducationLevel;
  setSelectedLevel: (lvl: EducationLevel) => void;
  selectedSubject: SubjectCategory;
  setSelectedSubject: (sub: SubjectCategory) => void;
  selectedBoard: 'ALL' | ExamBoard;
  setSelectedBoard: (board: 'ALL' | ExamBoard) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resultCount: {
    lessons: number;
    pastPapers: number;
    quizzes: number;
  };
}

export const SmartFilter: React.FC<SmartFilterProps> = ({
  selectedLevel,
  setSelectedLevel,
  selectedSubject,
  setSelectedSubject,
  selectedBoard,
  setSelectedBoard,
  searchQuery,
  setSearchQuery,
  resultCount,
}) => {
  const currentLevelObj = EDUCATION_LEVELS.find((l) => l.id === selectedLevel);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm transition-all mb-6">
      {/* Top row: Level Tabs & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#0A3D62] text-[#F5E8C7] flex items-center justify-center font-bold">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0A3D62] flex items-center gap-2">
              <span>Roche Smart Curriculum Filter</span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Interactive
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Filter lessons, labs, NECTA/Cambridge papers, and interactive quizzes by level &amp; subject
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topic, formula, NECTA code..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Level Selection Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 my-4">
        {EDUCATION_LEVELS.map((lvl) => {
          const isSelected = selectedLevel === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id as EducationLevel)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-[#0A3D62] to-[#124d77] text-white border-[#0A3D62] shadow-md scale-[1.01]'
                  : 'bg-slate-50 hover:bg-slate-100/80 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 text-[#2ECC71]">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              )}
              <div className="text-[11px] font-semibold opacity-80 uppercase tracking-wider mb-0.5">
                {lvl.sub}
              </div>
              <div className="text-sm font-bold leading-tight mb-1">
                {lvl.name}
              </div>
              <div
                className={`text-[10px] line-clamp-1 ${
                  isSelected ? 'text-[#F5E8C7]' : 'text-slate-500'
                }`}
              >
                {lvl.tag}
              </div>
            </button>
          );
        })}
      </div>

      {/* Subject Filter Chips & Board Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Subject Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            Subject:
          </span>
          {SUBJECT_CATEGORIES.map((subj) => {
            const isSelected = selectedSubject === subj.id;
            return (
              <button
                key={subj.id}
                onClick={() => setSelectedSubject(subj.id as SubjectCategory)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#2ECC71] text-slate-900 font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {subj.name}
              </button>
            );
          })}
        </div>

        {/* Board & Exam System Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <span className="text-[11px] font-bold text-slate-500 px-1.5">Exam Board:</span>
          {(['ALL', 'NECTA', 'CAMBRIDGE'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBoard(b)}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                selectedBoard === b
                  ? 'bg-[#0A3D62] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Metrics Bar */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-800">
            Current Filter: <span className="text-[#0A3D62] font-bold">{currentLevelObj?.name}</span> •{' '}
            <span className="text-[#2ECC71] font-bold">
              {SUBJECT_CATEGORIES.find((s) => s.id === selectedSubject)?.name}
            </span>
          </span>
          {selectedBoard !== 'ALL' && (
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold text-[10px]">
              {selectedBoard} Papers Only
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-slate-500 font-medium text-[11px]">
          <span>{resultCount.lessons} Topic Modules</span>
          <span>•</span>
          <span>{resultCount.pastPapers} Solved Past Papers</span>
          <span>•</span>
          <span>{resultCount.quizzes} Topic Quizzes</span>
        </div>
      </div>
    </div>
  );
};
