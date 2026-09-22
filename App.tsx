import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { SmartFilter } from './components/SmartFilter';
import { RocheLab } from './components/RocheLab';
import { RocheMaps } from './components/RocheMaps';
import { PastPapersBank } from './components/PastPapersBank';
import { QuizEngine } from './components/QuizEngine';
import { NotesAndPdf } from './components/NotesAndPdf';
import { PrimaryFunCorner } from './components/PrimaryFunCorner';
import { RocheLogo } from './components/RocheLogo';
import {
  TOPIC_LESSONS,
  PAST_PAPERS,
  QUIZ_BANK,
  ROCHE_PILLARS,
  EDUCATION_LEVELS,
} from './data/mockData';
import { EducationLevel, SubjectCategory, ExamBoard, TopicLesson, UserProfile } from './types';
import { generateLessonPdf } from './utils/pdfGenerator';
import {
  BookOpen,
  FlaskConical,
  Globe,
  FileText,
  HelpCircle,
  Download,
  ArrowRight,
  Sparkles,
  Award,
  Compass,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('roche_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<
    'curriculum' | 'lab' | 'maps' | 'pastpapers' | 'quiz' | 'notes'
  >('curriculum');
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel>('olevel');
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory>('all');
  const [selectedBoard, setSelectedBoard] = useState<'ALL' | ExamBoard>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLessonForNotes, setSelectedLessonForNotes] = useState<string | undefined>(
    undefined
  );
  const [selectedQuizTopicId, setSelectedQuizTopicId] = useState<string | undefined>(undefined);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('roche_current_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('roche_current_user');
    } catch (e) {
      console.error(e);
    }
  };

  const handleEnterApp = (
    tab: 'curriculum' | 'lab' | 'maps' | 'pastpapers' | 'quiz' | 'notes' = 'curriculum',
    level?: EducationLevel
  ) => {
    setActiveTab(tab);
    if (level) {
      setSelectedLevel(level);
    }
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter lessons based on SmartFilter
  const filteredLessons = TOPIC_LESSONS.filter((l) => {
    if (l.level !== selectedLevel) return false;
    if (selectedSubject !== 'all' && l.subject !== selectedSubject) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = l.title.toLowerCase().includes(q);
      const matchTags = l.tags.some((t) => t.toLowerCase().includes(q));
      const matchGrade = l.grade.toLowerCase().includes(q);
      if (!matchTitle && !matchTags && !matchGrade) return false;
    }
    return true;
  });

  const filteredPastPapers = PAST_PAPERS.filter((p) => {
    if (p.level !== selectedLevel) return false;
    if (selectedSubject !== 'all' && p.subject !== selectedSubject) return false;
    if (selectedBoard !== 'ALL' && p.board !== selectedBoard) return false;
    return true;
  });

  const filteredQuizzes = QUIZ_BANK.filter((q) => {
    if (q.level !== selectedLevel) return false;
    if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false;
    return true;
  });

  const handleOpenNotes = (lessonId: string) => {
    setSelectedLessonForNotes(lessonId);
    setActiveTab('notes');
  };

  const handleOpenQuiz = (topicId: string) => {
    setSelectedQuizTopicId(topicId);
    setActiveTab('quiz');
  };

  const currentLevelData = EDUCATION_LEVELS.find((l) => l.id === selectedLevel);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar with Brand & Quick Level Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLevel={selectedLevel}
        setCurrentLevel={setSelectedLevel}
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {currentView === 'landing' ? (
        <LandingPage
          onEnterApp={handleEnterApp}
          currentUser={currentUser}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      ) : (
        <>
          {/* Main Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* CURRICULUM TAB */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            {/* Hero Banner with ROCHE Pillars */}
            <div className="bg-gradient-to-br from-[#0A3D62] via-[#094874] to-[#0A3D62] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#0A3D62] relative overflow-hidden">
              <div className="max-w-3xl relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 bg-[#2ECC71]/20 border border-[#2ECC71]/40 text-[#F5E8C7] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5 text-[#2ECC71]" />
                  Tanzania STEM &amp; Geography Academic Portal
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight font-display">
                  Roche Academy - Science, Math &amp; Geography Hub
                </h1>
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
                  <em>"From ABC to PhD - Science, Math &amp; World Made Simple"</em>. Seamlessly transition from Standard I foundations to Form VI NECTA / Cambridge mastery and University research.
                </p>

                {/* Quick Quicklinks Row */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <button
                    onClick={() => setActiveTab('lab')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F5E8C7] text-[#0A3D62] hover:bg-white transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <FlaskConical className="w-4 h-4 text-emerald-600" />
                    <span>Open RocheLab Simulations</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('maps')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Globe className="w-4 h-4 text-sky-400" />
                    <span>Explore Tanzania Maps</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('pastpapers')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 text-amber-300" />
                    <span>Past Papers Bank</span>
                  </button>
                </div>
              </div>

              {/* ROCHE Letters Badge Matrix */}
              <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {ROCHE_PILLARS.map((p) => (
                  <div
                    key={p.letter}
                    className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-xs"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[#F5E8C7] mb-0.5">
                      <span className="w-5 h-5 rounded bg-[#F5E8C7] text-[#0A3D62] font-black text-xs flex items-center justify-center font-display">
                        {p.letter}
                      </span>
                      <span>{p.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-200 line-clamp-2">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Curriculum Filter */}
            <SmartFilter
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              selectedBoard={selectedBoard}
              setSelectedBoard={setSelectedBoard}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              resultCount={{
                lessons: filteredLessons.length,
                pastPapers: filteredPastPapers.length,
                quizzes: filteredQuizzes.length,
              }}
            />

            {/* If Primary Level is active, show the specialized Primary Fun Corner */}
            {selectedLevel === 'primary' && <PrimaryFunCorner />}

            {/* Topic Lessons Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#0A3D62] font-display flex items-center gap-2">
                    <span>{currentLevelData?.name} Syllabus Topics</span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
                      {filteredLessons.length} modules
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    {currentLevelData?.description}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('pastpapers')}
                  className="text-xs font-bold text-[#0A3D62] hover:text-[#2ECC71] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>View All Past Papers</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {filteredLessons.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 space-y-2">
                  <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-sm font-semibold">
                    No topic modules found for the selected subject filter.
                  </p>
                  <button
                    onClick={() => setSelectedSubject('all')}
                    className="text-xs text-[#0A3D62] font-bold underline cursor-pointer"
                  >
                    Reset subject filter to All Subjects
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#0A3D62]/40"
                    >
                      <div className="space-y-3">
                        {/* Top Badges */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase">
                            {lesson.grade}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 capitalize">
                            {lesson.subject}
                          </span>
                        </div>

                        {/* Title & Summary */}
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0A3D62] transition-colors leading-snug">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {lesson.summary}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {lesson.tags.map((t, i) => (
                            <span
                              key={i}
                              className="text-[10px] text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleOpenNotes(lesson.id)}
                          className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-[#0A3D62] hover:text-white text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Study Notes</span>
                        </button>

                        <button
                          onClick={() => generateLessonPdf(lesson)}
                          className="p-2 rounded-xl text-xs font-bold bg-[#F5E8C7] hover:bg-[#eddcb2] text-[#0A3D62] border border-[#d6c498] transition-colors cursor-pointer"
                          title="Download Low-Data PDF"
                        >
                          <Download className="w-4 h-4 text-[#0A3D62]" />
                        </button>

                        {lesson.hasQuiz && (
                          <button
                            onClick={() => handleOpenQuiz(lesson.id)}
                            className="p-2 rounded-xl text-xs font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 transition-colors cursor-pointer"
                            title="Take 10-Question Quiz"
                          >
                            <HelpCircle className="w-4 h-4 text-emerald-800" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Past Papers Teaser */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0A3D62]">
                      Popular {currentLevelData?.name} Past Papers &amp; Solutions
                    </h3>
                    <p className="text-xs text-slate-500">
                      NECTA and Cambridge examinations with step-by-step marking rubrics
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('pastpapers')}
                  className="px-3 py-1.5 bg-[#0A3D62] text-white rounded-xl text-xs font-bold hover:bg-[#0c4b78] transition-colors cursor-pointer"
                >
                  Open Papers Bank
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {PAST_PAPERS.slice(0, 3).map((pp) => (
                  <div
                    key={pp.id}
                    onClick={() => setActiveTab('pastpapers')}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-[#0A3D62]">{pp.board}</span>
                      <span className="text-emerald-700">{pp.year}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">
                      {pp.title}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Code: {pp.code} • {pp.totalMarks} Marks
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ROCHELAB TAB */}
        {activeTab === 'lab' && <RocheLab />}

        {/* ROCHEMAPS TAB */}
        {activeTab === 'maps' && <RocheMaps />}

        {/* PAST PAPERS BANK TAB */}
        {activeTab === 'pastpapers' && (
          <PastPapersBank
            initialLevel={selectedLevel}
            onLaunchQuiz={(topicId) => handleOpenQuiz(topicId)}
          />
        )}

        {/* QUIZ ENGINE TAB */}
        {activeTab === 'quiz' && (
          <QuizEngine initialTopicId={selectedQuizTopicId} />
        )}

        {/* NOTES & PDF TAB */}
        {activeTab === 'notes' && (
          <NotesAndPdf
            initialLevel={selectedLevel}
            selectedLessonId={selectedLessonForNotes}
            onLaunchLab={() => setActiveTab('lab')}
            onLaunchQuiz={(topicId) => handleOpenQuiz(topicId)}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-[#0A3D62] text-white border-t border-[#093555] py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand */}
            <div className="space-y-3 md:col-span-1">
              <RocheLogo size="md" variant="white" showText={true} showTagline={true} />
              <p className="text-xs text-slate-300 leading-relaxed">
                <em>"From ABC to PhD - Science, Math &amp; World Made Simple"</em>. Tanzania's dedicated educational platform unifying curriculum notes, animated laboratories, and interactive geography.
              </p>
              <div className="text-[11px] text-[#F5E8C7] font-semibold">
                Domains: rocheacademy.co.tz / rocheacademy.com
              </div>
            </div>

            {/* Col 2: The ROCHE Acronym */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#F5E8C7] uppercase tracking-wider">
                The ROCHE Framework
              </h4>
              <ul className="text-xs text-slate-300 space-y-1">
                <li><strong className="text-white">R</strong> - Reasoning (Logical rigor)</li>
                <li><strong className="text-white">O</strong> - Observation (Empirical tests)</li>
                <li><strong className="text-white">C</strong> - Calculation (Math precision)</li>
                <li><strong className="text-white">H</strong> - Hypothesis (Scientific inquiry)</li>
                <li><strong className="text-white">E</strong> - Exploration (Geography &amp; World)</li>
              </ul>
            </div>

            {/* Col 3: Curricula Supported */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#F5E8C7] uppercase tracking-wider">
                Curricula &amp; Exams
              </h4>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• Standard I - VII (NECTA PSLE)</li>
                <li>• Form I - IV (NECTA CSEE &amp; Cambridge IGCSE)</li>
                <li>• Form V - VI (NECTA ACSEE &amp; Cambridge A-Level)</li>
                <li>• Undergraduate &amp; Postgraduate Research</li>
                <li>• Low-Data Compressed PDF Notes</li>
              </ul>
            </div>

            {/* Col 4: Quick Interactive Tools */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#F5E8C7] uppercase tracking-wider">
                Interactive Suites
              </h4>
              <div className="flex flex-col gap-1.5 text-xs text-slate-300">
                <button
                  onClick={() => setActiveTab('lab')}
                  className="text-left hover:text-[#2ECC71] transition-colors cursor-pointer"
                >
                  → RocheLab Science Simulators
                </button>
                <button
                  onClick={() => setActiveTab('maps')}
                  className="text-left hover:text-[#2ECC71] transition-colors cursor-pointer"
                >
                  → RocheMaps Tanzania &amp; Africa GIS
                </button>
                <button
                  onClick={() => setActiveTab('pastpapers')}
                  className="text-left hover:text-[#2ECC71] transition-colors cursor-pointer"
                >
                  → Past Papers Bank (NECTA &amp; Cambridge)
                </button>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="text-left hover:text-[#2ECC71] transition-colors cursor-pointer"
                >
                  → 10-Question Topic Quiz Engine
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <div>
              © {new Date().getFullYear()} Roche Academy. All Rights Reserved. Aligned with NECTA (National Examinations Council of Tanzania) and Cambridge Assessment International Education.
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span className="text-[#2ECC71]">● Offline Ready</span>
              <span>•</span>
              <span>Low-Data Architecture</span>
            </div>
          </div>
        </div>
      </footer>
      </>
      )}
    </div>
  );
}
