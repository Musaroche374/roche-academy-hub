import React, { useState } from 'react';
import { PAST_PAPERS } from '../data/mockData';
import { PastPaper, EducationLevel, SubjectCategory, ExamBoard } from '../types';
import { generatePastPaperPdf } from '../utils/pdfGenerator';
import {
  FileText,
  Download,
  BookOpen,
  Award,
  Calendar,
  Clock,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
} from 'lucide-react';

interface PastPapersBankProps {
  initialLevel?: EducationLevel;
  onLaunchQuiz?: (topicId: string) => void;
}

export const PastPapersBank: React.FC<PastPapersBankProps> = ({
  initialLevel,
  onLaunchQuiz,
}) => {
  const [selectedBoard, setSelectedBoard] = useState<'ALL' | ExamBoard>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | 'ALL'>(initialLevel || 'ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(PAST_PAPERS[0]?.id || null);

  const filteredPapers = PAST_PAPERS.filter((p) => {
    if (selectedBoard !== 'ALL' && p.board !== selectedBoard) return false;
    if (selectedLevel !== 'ALL' && p.level !== selectedLevel) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchCode = p.code.toLowerCase().includes(q);
      const matchSubject = p.subject.toLowerCase().includes(q);
      if (!matchTitle && !matchCode && !matchSubject) return false;
    }
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedPaperId(expandedPaperId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A3D62] via-[#09416a] to-[#0A3D62] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[#0A3D62] shadow-md">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#F5E8C7] text-[#0A3D62] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Official NECTA &amp; Cambridge Repository
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 font-display">
            Past Papers &amp; Marked Solutions Bank
          </h1>
          <p className="text-slate-200 text-sm leading-relaxed">
            Access authentic Standard 7 (PSLE), Form IV (CSEE), Form VI (ACSEE), and Cambridge IGCSE / A-Level past papers. Fully worked solutions, step-by-step marking rubrics, and low-data downloadable PDFs.
          </p>
        </div>

        {/* Quick Exam Boards Badges */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-white/15">
          <span className="text-xs text-slate-300 font-semibold mr-1">Filter Board:</span>
          {(['ALL', 'NECTA', 'CAMBRIDGE'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBoard(b)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedBoard === b
                  ? 'bg-[#F5E8C7] text-[#0A3D62] shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {b === 'ALL' ? 'All Boards' : `${b} Exams`}
            </button>
          ))}

          <span className="text-slate-400 mx-2">|</span>

          <span className="text-xs text-slate-300 font-semibold mr-1">Level:</span>
          {(['ALL', 'primary', 'olevel', 'alevel'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer capitalize ${
                selectedLevel === lvl
                  ? 'bg-[#2ECC71] text-slate-900 font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {lvl === 'ALL' ? 'All Levels' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Counter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exam year, paper code, subject..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
          />
        </div>

        <div className="text-xs text-slate-600 font-medium">
          Showing <span className="font-bold text-[#0A3D62]">{filteredPapers.length}</span> verified past papers
        </div>
      </div>

      {/* Past Papers List */}
      <div className="space-y-4">
        {filteredPapers.map((paper) => {
          const isExpanded = expandedPaperId === paper.id;
          const isNecta = paper.board === 'NECTA';

          return (
            <div
              key={paper.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-slate-300"
            >
              {/* Card Header / Summary */}
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider ${
                        isNecta
                          ? 'bg-[#0A3D62] text-white'
                          : 'bg-rose-700 text-white'
                      }`}
                    >
                      {paper.board}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Code: {paper.code}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Year {paper.year}
                    </span>
                    <span className="text-xs text-slate-500 capitalize">
                      • {paper.level}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0A3D62] font-display">
                    {paper.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Duration: {paper.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-slate-400" />
                      Total Marks: {paper.totalMarks}
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2ECC71]" />
                      Full Worked Solutions Included
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => generatePastPaperPdf(paper)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#F5E8C7] hover:bg-[#ebdcb4] text-[#0A3D62] border border-[#d6c498] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    title="Download Low-Data PDF with worked solutions"
                  >
                    <Download className="w-4 h-4 text-[#0A3D62]" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => toggleExpand(paper.id)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Paper' : 'View Solutions'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Detailed Question & Solutions View */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/70 p-5 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#0A3D62]" />
                      Selected Syllabus Questions &amp; Marking Rubric:
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Standard NECTA / Cambridge Criteria
                    </span>
                  </div>

                  {paper.questions.map((q, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3"
                    >
                      {/* Question Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#0A3D62] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                            {q.qNum}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            [{q.marks} Marks]
                          </span>
                        </div>
                      </div>

                      {/* Question Text */}
                      <p className="text-xs text-slate-800 font-medium leading-relaxed">
                        {q.question}
                      </p>

                      {/* Worked Solution */}
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-700 block uppercase">
                          Step-by-Step Marking Scheme &amp; Answer:
                        </span>
                        <div className="text-xs text-slate-700 font-mono whitespace-pre-line leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                          {q.solution}
                        </div>
                      </div>

                      {/* The Roche Pedagogical Insight */}
                      <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#2ECC71] shrink-0" />
                        <span>
                          <strong>Roche Examination Rule:</strong> {q.rocheInsight}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
