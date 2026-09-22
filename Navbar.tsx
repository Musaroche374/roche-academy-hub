import React, { useState } from 'react';
import { RocheLogo } from './RocheLogo';
import { ROCHE_PILLARS, EDUCATION_LEVELS } from '../data/mockData';
import { EducationLevel, UserProfile } from '../types';
import {
  Compass,
  FlaskConical,
  Globe,
  FileText,
  HelpCircle,
  BookOpen,
  ChevronDown,
  Info,
  Sparkles,
  User,
  LogOut,
  LayoutDashboard,
  Home,
  CheckCircle2,
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'curriculum' | 'lab' | 'maps' | 'pastpapers' | 'quiz' | 'notes';
  setActiveTab: (tab: 'curriculum' | 'lab' | 'maps' | 'pastpapers' | 'quiz' | 'notes') => void;
  currentLevel: EducationLevel;
  setCurrentLevel: (level: EducationLevel) => void;
  currentView: 'landing' | 'app';
  setCurrentView: (view: 'landing' | 'app') => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentLevel,
  setCurrentLevel,
  currentView,
  setCurrentView,
  currentUser,
  onLogout,
}) => {
  const [showRocheMeaning, setShowRocheMeaning] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner with Brand Tagline, Domains, and Meaning Trigger */}
      <div className="bg-[#0A3D62] text-white px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-[#F5E8C7] text-[#0A3D62] font-black px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
              Official Hub
            </span>
            <span className="italic text-slate-100 hidden sm:inline">
              "From ABC to PhD - Science, Math &amp; World Made Simple"
            </span>
            <span className="text-slate-300 text-[11px] hidden lg:inline">
              • Domains: rocheacademy.co.tz / rocheacademy.com
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowRocheMeaning(!showRocheMeaning)}
              className="inline-flex items-center gap-1.5 text-[#F5E8C7] hover:text-white transition-colors cursor-pointer text-[11px] font-semibold underline underline-offset-2"
              title="What does ROCHE stand for?"
            >
              <Info className="w-3.5 h-3.5 text-[#2ECC71]" />
              <span>Meaning of ROCHE</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showRocheMeaning ? 'rotate-180' : ''}`} />
            </button>
            <span className="text-slate-400">|</span>
            <span className="text-[#2ECC71] flex items-center gap-1 font-semibold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-pulse"></span>
              NECTA &amp; Cambridge Aligned
            </span>
          </div>
        </div>
      </div>

      {/* Expandable ROCHE Meaning Drawer */}
      {showRocheMeaning && (
        <div className="bg-[#082d49] text-white border-b border-[#0f4d7a] py-4 px-4 shadow-inner transition-all">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F5E8C7]" />
                <h3 className="font-bold text-sm text-[#F5E8C7] tracking-wider uppercase">
                  The ROCHE Pedagogical Philosophy
                </h3>
              </div>
              <button
                onClick={() => setShowRocheMeaning(false)}
                className="text-xs text-slate-300 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {ROCHE_PILLARS.map((p) => (
                <div
                  key={p.letter}
                  className="bg-white/10 rounded-lg p-3 border border-white/15 hover:border-[#2ECC71] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-7 h-7 rounded bg-[#F5E8C7] text-[#0A3D62] font-black text-base flex items-center justify-center font-display">
                      {p.letter}
                    </span>
                    <span className="font-bold text-sm text-white">{p.title}</span>
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & View Switcher */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => setCurrentView('landing')}
            className="cursor-pointer select-none"
            title="Go to Roche Academy Landing Overview"
          >
            <RocheLogo size="md" showText={true} showTagline={true} />
          </div>

          {/* Primary View Toggle (Landing / Hub) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setCurrentView('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                currentView === 'landing'
                  ? 'bg-[#0A3D62] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-[#F5E8C7]" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setCurrentView('app')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                currentView === 'app'
                  ? 'bg-[#0A3D62] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#2ECC71]" />
              <span>Academy Hub</span>
            </button>
          </div>
        </div>

        {/* Level Quick Switcher (when in app mode or always accessible) */}
        {currentView === 'app' && (
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {EDUCATION_LEVELS.map((lvl) => {
              const isSelected = currentLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setCurrentLevel(lvl.id as EducationLevel)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A3D62] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {lvl.name.replace(' Level', '')}
                </button>
              );
            })}
          </div>
        )}

        {/* Navigation Tabs (When in App Mode) */}
        {currentView === 'app' ? (
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'curriculum'
                  ? 'bg-[#0A3D62] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#2ECC71]" />
              <span>Curriculum</span>
            </button>

            <button
              onClick={() => setActiveTab('lab')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'lab'
                  ? 'bg-[#0A3D62] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FlaskConical className="w-4 h-4 text-emerald-500" />
              <span>RocheLab</span>
            </button>

            <button
              onClick={() => setActiveTab('maps')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'maps'
                  ? 'bg-[#0A3D62] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Globe className="w-4 h-4 text-sky-500" />
              <span>RocheMaps</span>
            </button>

            <button
              onClick={() => setActiveTab('pastpapers')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'pastpapers'
                  ? 'bg-[#0A3D62] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Past Papers</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-[#0A3D62] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              <span>Quiz Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'bg-[#0A3D62] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4 text-rose-500" />
              <span>Notes &amp; PDF</span>
            </button>
          </nav>
        ) : (
          /* Landing Navigation Shortcuts */
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentView('app');
                setActiveTab('lab');
              }}
              className="text-xs font-bold text-slate-700 hover:text-[#0A3D62] px-3 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer hidden md:flex items-center gap-1.5"
            >
              <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
              <span>Virtual Labs</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('app');
                setActiveTab('maps');
              }}
              className="text-xs font-bold text-slate-700 hover:text-[#0A3D62] px-3 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer hidden md:flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-sky-600" />
              <span>Tanzania Map</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('app');
                setActiveTab('pastpapers');
              }}
              className="text-xs font-bold text-slate-700 hover:text-[#0A3D62] px-3 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer hidden md:flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>NECTA Papers</span>
            </button>
            <button
              onClick={() => setCurrentView('app')}
              className="px-4 py-2 rounded-xl text-xs font-black bg-[#2ECC71] hover:bg-[#27ae60] text-slate-950 flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Launch Academy Hub</span>
            </button>
          </div>
        )}

        {/* User Account / Profile Widget */}
        <div className="relative">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 pl-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl cursor-pointer transition-colors"
              >
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-[#0A3D62] leading-tight truncate max-w-[120px]">
                    {currentUser.fullName}
                  </div>
                  <div className="text-[10px] text-slate-500 capitalize">
                    {currentUser.role}
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-lg ${currentUser.avatarColor || 'bg-[#0A3D62]'} text-white font-bold text-xs flex items-center justify-center shadow-xs`}>
                  {currentUser.fullName.charAt(0)}
                </div>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="pb-2 border-b border-slate-100">
                    <div className="font-bold text-xs text-[#0A3D62]">{currentUser.fullName}</div>
                    <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                    <div className="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full capitalize">
                      {currentUser.role} • {currentUser.level}
                    </div>
                  </div>

                  <div className="py-2 text-xs text-slate-600 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-500">School/Organization:</div>
                    <div className="text-xs font-medium text-slate-800">{currentUser.schoolOrOrg}</div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setCurrentView('landing');
                      }}
                      className="w-full text-left text-xs font-bold text-[#0A3D62] hover:bg-slate-50 p-2 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span>Back to Landing Page</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left text-xs font-bold text-rose-600 hover:bg-rose-50 p-2 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setCurrentView('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-[#0A3D62] hover:bg-slate-100 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#0A3D62]" />
              <span>Sign In / Join</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
