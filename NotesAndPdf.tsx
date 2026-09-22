import React, { useState } from 'react';
import { TOPIC_LESSONS } from '../data/mockData';
import { TopicLesson, EducationLevel, SubjectCategory } from '../types';
import { generateLessonPdf } from '../utils/pdfGenerator';
import {
  FileText,
  Download,
  Video,
  Play,
  Volume2,
  Sparkles,
  BookOpen,
  CheckCircle,
  Clock,
  WifiOff,
  Share2,
  Bookmark,
  ChevronRight,
} from 'lucide-react';

interface NotesAndPdfProps {
  initialLevel?: EducationLevel;
  selectedLessonId?: string;
  onLaunchLab?: () => void;
  onLaunchQuiz?: (topicId: string) => void;
}

export const NotesAndPdf: React.FC<NotesAndPdfProps> = ({
  initialLevel,
  selectedLessonId,
  onLaunchLab,
  onLaunchQuiz,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | 'ALL'>(initialLevel || 'ALL');
  const [activeLessonId, setActiveLessonId] = useState<string>(
    selectedLessonId || TOPIC_LESSONS[0]?.id || ''
  );
  const [lowDataMode, setLowDataMode] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const filteredLessons = TOPIC_LESSONS.filter((l) => {
    if (selectedLevel !== 'ALL' && l.level !== selectedLevel) return false;
    return true;
  });

  const activeLesson: TopicLesson =
    TOPIC_LESSONS.find((l) => l.id === activeLessonId) || TOPIC_LESSONS[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A3D62] via-[#09416a] to-[#0A3D62] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[#0A3D62] shadow-md">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#F5E8C7] text-[#0A3D62] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            <WifiOff className="w-3.5 h-3.5" />
            Low-Data &amp; Offline Study System
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 font-display">
            Video Lectures &amp; Downloadable PDF Notes
          </h1>
          <p className="text-slate-200 text-sm leading-relaxed">
            Engineered specifically for Tanzanian and African students with bandwidth constraints. Watch compressed video tutorials or download high-yield, formatted PDF study guides for 100% offline study.
          </p>
        </div>

        {/* Level Switcher */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-white/15">
          <span className="text-xs text-slate-300 font-semibold mr-1">Filter by Level:</span>
          {(['ALL', 'primary', 'olevel', 'alevel', 'university'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer capitalize ${
                selectedLevel === lvl
                  ? 'bg-[#2ECC71] text-slate-900 font-bold shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {lvl === 'ALL' ? 'All Curricula' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sidebar of Topics + Active Lesson Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Topics List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Available Syllabus Modules ({filteredLessons.length})
            </h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredLessons.map((lesson) => {
                const isActive = lesson.id === activeLesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonId(lesson.id)}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-start justify-between gap-2 ${
                      isActive
                        ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                            isActive
                              ? 'bg-white/20 text-[#F5E8C7]'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {lesson.subject}
                        </span>
                        <span
                          className={`text-[10px] font-medium ${
                            isActive ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {lesson.grade}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold leading-snug line-clamp-2">
                        {lesson.title}
                      </h4>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-1 ${
                        isActive ? 'text-[#2ECC71]' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Active Lesson Content & Download */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            {/* Top Details & PDF Download Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-[#0A3D62] text-[#F5E8C7] text-[10px] font-black uppercase px-2.5 py-0.5 rounded">
                    {activeLesson.grade}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 capitalize">
                    {activeLesson.subject}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {activeLesson.readTimeMinutes} min read
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0A3D62] font-display">
                  {activeLesson.title}
                </h2>
              </div>

              {/* Instant PDF Download Button */}
              <button
                onClick={() => generateLessonPdf(activeLesson)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F5E8C7] hover:bg-[#eddcb2] text-[#0A3D62] border border-[#d6c498] flex items-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
                title="Generates complete, low-data offline PDF"
              >
                <Download className="w-4 h-4 text-[#0A3D62]" />
                <span>Download PDF Notes</span>
              </button>
            </div>

            {/* Video Player / Low-Data Audio Mode */}
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 text-white shadow-inner">
              <div className="relative aspect-video sm:h-64 flex flex-col items-center justify-center p-6 bg-radial from-slate-800 to-slate-950">
                {!isVideoPlaying ? (
                  <div className="text-center space-y-3">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-16 h-16 rounded-full bg-[#0A3D62] hover:bg-[#0e5487] border-2 border-[#2ECC71] flex items-center justify-center text-white transition-all cursor-pointer mx-auto shadow-lg hover:scale-105"
                    >
                      <Play className="w-7 h-7 text-[#2ECC71] ml-1 fill-[#2ECC71]" />
                    </button>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Curated Lecture: {activeLesson.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Duration: {activeLesson.videoDuration || '12:00 min'} • Optimized for 3G/4G
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
                    <div className="flex items-center gap-2 text-[#2ECC71] text-xs font-mono animate-pulse">
                      <Volume2 className="w-5 h-5" />
                      <span>Playing Stream (Roche Audio &amp; Visual Sync)</span>
                    </div>
                    <div className="w-3/4 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2ECC71] w-2/5 animate-pulse" />
                    </div>
                    <button
                      onClick={() => setIsVideoPlaying(false)}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Stop Playback
                    </button>
                  </div>
                )}
              </div>

              {/* Low-data Bar */}
              <div className="bg-slate-950 p-3 px-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <WifiOff className="w-3.5 h-3.5 text-[#2ECC71]" />
                  <span>Compressed format uses &lt; 5MB mobile data</span>
                </span>
                <span className="text-[#F5E8C7] font-semibold text-[11px]">
                  Tanzania / East Africa Server CDN
                </span>
              </div>
            </div>

            {/* Syllabus Key Concepts */}
            <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100 space-y-2">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wide flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-700" />
                Key Syllabus Concepts Covered:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeLesson.keyConcepts.map((kc, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-indigo-950 text-xs px-2.5 py-1 rounded-lg font-medium border border-indigo-200 flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#2ECC71]" />
                    <span>{kc}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Note Sections */}
            <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
              <p className="italic text-slate-600 border-l-4 border-[#0A3D62] pl-3 py-1">
                {activeLesson.notesContent.introduction}
              </p>

              {activeLesson.notesContent.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2 pt-2">
                  <h3 className="font-bold text-base text-[#0A3D62] font-display">
                    {sec.heading}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                    {sec.body}
                  </p>
                  {sec.formulaOrHighlight && (
                    <div className="bg-amber-50 text-amber-900 font-mono text-xs sm:text-sm p-3 rounded-xl border border-amber-200 font-bold">
                      {sec.formulaOrHighlight}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* The ROCHE Pedagogical Method Takeaway */}
            <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                <Sparkles className="w-4 h-4 text-[#2ECC71]" />
                The ROCHE Method Pillar Application:
              </span>
              <p className="text-slate-700 text-xs leading-relaxed">
                {activeLesson.notesContent.rocheTakeaway}
              </p>
            </div>

            {/* NECTA & Cambridge Tips */}
            <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
              <span className="font-bold block text-amber-900">
                NECTA &amp; Cambridge Examination Strategy:
              </span>
              <p className="text-slate-700 text-xs leading-relaxed">
                {activeLesson.notesContent.examTips}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
