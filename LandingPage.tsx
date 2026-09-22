import React, { useState } from 'react';
import { RocheLogo } from './RocheLogo';
import { ROCHE_PILLARS, EDUCATION_LEVELS } from '../data/mockData';
import { EducationLevel, UserProfile, UserRole } from '../types';
import {
  Sparkles,
  Award,
  BookOpen,
  FlaskConical,
  Globe,
  FileText,
  HelpCircle,
  Download,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  WifiOff,
  Compass,
  Play,
  Check,
  ChevronRight,
  TrendingUp,
  Smile,
  GraduationCap,
  School,
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  Flame,
  HeartHandshake,
  Target,
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: (tab?: 'curriculum' | 'lab' | 'maps' | 'pastpapers' | 'quiz' | 'notes', level?: EducationLevel) => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  currentUser,
  onLogin,
  onLogout,
}) => {
  // Auth state
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('amina.student@rocheacademy.co.tz');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  
  // Sign up state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('student');
  const [signupLevel, setSignupLevel] = useState<EducationLevel>('olevel');
  const [signupSchool, setSignupSchool] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Interactive Mini-Demo on Landing Page
  const [miniDemoTab, setMiniDemoTab] = useState<'titration' | 'map' | 'fraction'>('titration');
  const [miniDrops, setMiniDrops] = useState(14); // drops of NaOH
  const [miniZoomRegion, setMiniZoomRegion] = useState('Dodoma');
  const [miniPizzaSlices, setMiniPizzaSlices] = useState(3);

  // Quick Demo Accounts
  const demoAccounts = [
    {
      roleTitle: 'Form IV Candidate',
      name: 'Amina Mtema',
      email: 'amina.student@rocheacademy.co.tz',
      role: 'student' as UserRole,
      level: 'olevel' as EducationLevel,
      schoolOrOrg: 'Ilboru Secondary School, Arusha',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      avatarColor: 'bg-emerald-600',
    },
    {
      roleTitle: 'Physics & Geography Teacher',
      name: 'Mwalimu John Kimaro',
      email: 'j.kimaro@rocheacademy.co.tz',
      role: 'teacher' as UserRole,
      level: 'alevel' as EducationLevel,
      schoolOrOrg: 'Tambaza High School, Dar es Salaam',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      avatarColor: 'bg-sky-600',
    },
    {
      roleTitle: 'Dedicated Parent',
      name: 'Bakari Salum',
      email: 'bakari.parent@rocheacademy.co.tz',
      role: 'parent' as UserRole,
      level: 'primary' as EducationLevel,
      schoolOrOrg: 'Guardian of 2 Pupils, Dodoma',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      avatarColor: 'bg-amber-600',
    },
    {
      roleTitle: 'Primary Pupil (Std 6)',
      name: 'Neema Juma',
      email: 'neema.pupil@rocheacademy.co.tz',
      role: 'student' as UserRole,
      level: 'primary' as EducationLevel,
      schoolOrOrg: 'Isamilo Primary School, Mwanza',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      avatarColor: 'bg-rose-600',
    },
  ];

  const handleDemoLogin = (account: typeof demoAccounts[0]) => {
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: account.name,
      email: account.email,
      role: account.role,
      level: account.level,
      schoolOrOrg: account.schoolOrOrg,
      joinedDate: 'Joined March 2026',
      avatarColor: account.avatarColor,
    };
    onLogin(user);
    setAuthSuccess(`Welcome back, ${account.name}! Redirecting to Academy...`);
    setTimeout(() => {
      onEnterApp('curriculum', account.level);
    }, 600);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!loginEmail) {
      setAuthError('Please enter your email or phone number.');
      return;
    }
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: loginEmail.split('@')[0] || 'Valued Scholar',
      email: loginEmail,
      role: 'student',
      level: 'olevel',
      schoolOrOrg: 'Tanzania Academy Network',
      joinedDate: 'Joined Today',
      avatarColor: 'bg-[#0A3D62]',
    };
    onLogin(user);
    setAuthSuccess('Sign in successful! Entering Roche Academy...');
    setTimeout(() => {
      onEnterApp('curriculum');
    }, 600);
  };

  const handleManualSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!signupName.trim() || !signupEmail.trim()) {
      setAuthError('Please fill in your name and email/phone.');
      return;
    }
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: signupName.trim(),
      email: signupEmail.trim(),
      phone: signupPhone.trim(),
      role: signupRole,
      level: signupLevel,
      schoolOrOrg: signupSchool.trim() || 'Tanzania Education System',
      joinedDate: 'Joined Today',
      avatarColor: 'bg-emerald-600',
    };
    onLogin(user);
    setAuthSuccess(`Account created! Welcome to Roche Academy, ${user.fullName}.`);
    setTimeout(() => {
      onEnterApp('curriculum', signupLevel);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#F5E8C7] selection:text-[#0A3D62]">
      {/* 1. TOP ANNOUNCEMENT & SOCIAL PROOF TICKER */}
      <div className="bg-gradient-to-r from-[#0A3D62] via-[#09426c] to-[#0A3D62] text-white text-xs py-2 px-4 border-b border-[#0f4e7c]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#2ECC71] text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">
              NEW 2026 EDITION
            </span>
            <span className="font-semibold text-slate-200">
              NECTA 2026 Marking Scheme Rubrics &amp; Cambridge IGCSE Solved Papers now live!
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-[11px] hidden sm:flex">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2ECC71]" />
              100% Free Public Access
            </span>
            <span className="flex items-center gap-1">
              <WifiOff className="w-3.5 h-3.5 text-[#F5E8C7]" />
              Low-Data (&lt;5MB) Mode
            </span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION WITH COLORFUL BACKGROUND & INTEGRATED AUTH BLOCK */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A3D62] via-[#0b4b7a] to-[#082a44] text-white pt-10 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6">
        {/* Colorful Ambient Glow Orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-5 left-10 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
          {/* Left Column: High-Impact Persuasive Messaging */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#F5E8C7] text-[#0A3D62] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              Tanzania's #1 STEM &amp; Geography Academic Portal
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-display">
              Transforming How Africa Masters{' '}
              <span className="text-[#F5E8C7] underline decoration-[#2ECC71] decoration-wavy decoration-2">
                Science
              </span>
              ,{' '}
              <span className="text-[#38bdf8]">
                Mathematics
              </span>{' '}
              &amp;{' '}
              <span className="text-[#2ECC71]">
                World Geography
              </span>
            </h1>

            {/* Subtitle / Brand Motto */}
            <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <strong className="text-white italic">"From ABC to PhD — Science, Math &amp; World Made Simple."</strong>{' '}
              Empowering primary pupils, Form I–VI candidates, and university scholars with interactive virtual labs, 31-region Tanzania GIS maps, and low-data printable PDF notes.
            </p>

            {/* Value Proof Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#2ECC71] shrink-0" />
                <span>100% NECTA &amp; Cambridge Aligned</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#2ECC71] shrink-0" />
                <span>Virtual Labs (No chemicals needed)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#2ECC71] shrink-0" />
                <span>Zero Cost Offline Study Guides</span>
              </div>
            </div>

            {/* Quick Guest Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
              <button
                onClick={() => onEnterApp('curriculum')}
                className="px-6 py-3.5 rounded-xl text-sm font-black bg-[#2ECC71] hover:bg-[#27ae60] text-slate-950 flex items-center gap-2 shadow-lg shadow-emerald-950/30 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span>Enter Academy Free (No Login Needed)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onEnterApp('lab')}
                className="px-5 py-3.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <FlaskConical className="w-4 h-4 text-emerald-400" />
                <span>Try RocheLab Simulator</span>
              </button>
            </div>

            {/* Key Trust Counters */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 max-w-lg mx-auto lg:mx-0">
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-[#F5E8C7] font-mono">15,000+</div>
                <div className="text-[11px] text-slate-300 font-medium">Students &amp; Walimu</div>
              </div>
              <div className="text-left border-l border-white/15 pl-4">
                <div className="text-2xl sm:text-3xl font-black text-[#2ECC71] font-mono">31</div>
                <div className="text-[11px] text-slate-300 font-medium">Tanzania Regions</div>
              </div>
              <div className="text-left border-l border-white/15 pl-4">
                <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">100%</div>
                <div className="text-[11px] text-slate-300 font-medium">NECTA Syllabus Match</div>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent, Colorful Authentication Block */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 border border-slate-200 relative overflow-hidden">
              {/* Top Colorful Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0A3D62] via-[#2ECC71] to-[#f59e0b]" />

              {/* Header inside Auth Block */}
              <div className="mb-5 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0A3D62] text-white mb-2 shadow-md">
                  <GraduationCap className="w-6 h-6 text-[#2ECC71]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A3D62] font-display">
                  {currentUser ? `Welcome, ${currentUser.fullName}!` : 'Access Roche Academy'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {currentUser
                    ? 'You are currently authenticated and synced'
                    : 'Personalized progress, offline downloads & exam archives'}
                </p>
              </div>

              {currentUser ? (
                /* Authenticated User Quick Jump */
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900">Active Profile:</span>
                      <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                        {currentUser.role}
                      </span>
                    </div>
                    <div className="text-sm font-black text-slate-900">{currentUser.fullName}</div>
                    <div className="text-slate-600">{currentUser.schoolOrOrg}</div>
                    <div className="text-slate-500 font-mono text-[11px]">{currentUser.email}</div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => onEnterApp('curriculum', currentUser.level)}
                      className="w-full py-3 rounded-xl bg-[#0A3D62] hover:bg-[#0c4c79] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>Continue to Curriculum Hub</span>
                      <ArrowRight className="w-4 h-4 text-[#2ECC71]" />
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
                    >
                      Sign Out / Switch Profile
                    </button>
                  </div>
                </div>
              ) : (
                /* Login / Signup Tabs & Forms */
                <div>
                  {/* Mode Switcher */}
                  <div className="flex p-1 bg-slate-100 rounded-xl mb-4 border border-slate-200 text-xs font-bold">
                    <button
                      onClick={() => {
                        setAuthMode('signin');
                        setAuthError('');
                        setAuthSuccess('');
                      }}
                      className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                        authMode === 'signin'
                          ? 'bg-[#0A3D62] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode('signup');
                        setAuthError('');
                        setAuthSuccess('');
                      }}
                      className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                        authMode === 'signup'
                          ? 'bg-[#0A3D62] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  {/* Feedback Messages */}
                  {authError && (
                    <div className="mb-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                      {authError}
                    </div>
                  )}
                  {authSuccess && (
                    <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#2ECC71]" />
                      <span>{authSuccess}</span>
                    </div>
                  )}

                  {/* SIGN IN FORM */}
                  {authMode === 'signin' && (
                    <form onSubmit={handleManualLogin} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address or Phone Number
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="student@school.co.tz or +255 7..."
                            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>Password</span>
                          <span className="text-[#0A3D62] hover:underline cursor-pointer font-normal text-[11px]">
                            Forgot?
                          </span>
                        </div>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full pl-9 pr-9 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-[#0A3D62] hover:bg-[#0c4c79] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        Sign In to My Dashboard
                      </button>

                      {/* 1-Click Fast Demo Logins */}
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 text-center">
                          ⚡ 1-Click Instant Demo Profiles
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {demoAccounts.map((acc, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleDemoLogin(acc)}
                              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors cursor-pointer"
                            >
                              <div className="text-[10px] font-bold text-slate-500">{acc.roleTitle}</div>
                              <div className="text-xs font-bold text-[#0A3D62] truncate">{acc.name}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </form>
                  )}

                  {/* SIGN UP FORM */}
                  {authMode === 'signup' && (
                    <form onSubmit={handleManualSignup} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                            placeholder="e.g., Juma Rashidi Mushi"
                            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Email or Phone
                          </label>
                          <input
                            type="text"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            placeholder="email or +255 7..."
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Role
                          </label>
                          <select
                            value={signupRole}
                            onChange={(e) => setSignupRole(e.target.value as UserRole)}
                            className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher / Mwalimu</option>
                            <option value="parent">Parent / Guardian</option>
                            <option value="researcher">Researcher</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Education Level
                          </label>
                          <select
                            value={signupLevel}
                            onChange={(e) => setSignupLevel(e.target.value as EducationLevel)}
                            className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
                          >
                            <option value="primary">Primary (Std 1-7)</option>
                            <option value="olevel">O-Level (Form 1-4)</option>
                            <option value="alevel">A-Level (Form 5-6)</option>
                            <option value="university">University / Higher</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            School / Institution
                          </label>
                          <input
                            type="text"
                            value={signupSchool}
                            onChange={(e) => setSignupSchool(e.target.value)}
                            placeholder="e.g. Kibaha Sec / UDSM"
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Create Password
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="password"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-[#2ECC71] hover:bg-[#27ae60] text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
                      >
                        Create Free Account &amp; Start Learning
                      </button>
                    </form>
                  )}

                  {/* Direct Guest Link */}
                  <div className="pt-3 text-center border-t border-slate-100 mt-3">
                    <button
                      onClick={() => onEnterApp('curriculum')}
                      className="text-xs text-[#0A3D62] hover:text-[#2ECC71] font-bold underline cursor-pointer"
                    >
                      Or skip registration and browse as Guest →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. "WHAT IT DOES" - INTERACTIVE BENTO SHOWCASE */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0A3D62]/10 text-[#0A3D62] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-[#2ECC71]" />
            What Roche Academy Does
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A3D62] font-display">
            A Complete STEM &amp; Geography Ecosystem in One Platform
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We bridge the gap between classroom theory and practical empirical science. No costly textbooks, no inaccessible chemical reagents, and no high data bills.
          </p>
        </div>

        {/* The 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: RocheLab */}
          <div className="bg-gradient-to-br from-white to-emerald-50/40 p-6 rounded-3xl border border-emerald-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-200">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                Chemistry, Physics &amp; Biology
              </div>
              <h3 className="text-xl font-black text-[#0A3D62] font-display">
                RocheLab Virtual Simulators
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Perform acid-base titrations, test Ohm's Law circuits, calculate oxygen bubbles in aquatic photosynthesis, and model harmonic pendulums with real physics equations.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-700">5 Live Simulations</span>
              <button
                onClick={() => onEnterApp('lab')}
                className="text-xs font-bold text-[#0A3D62] group-hover:text-[#2ECC71] flex items-center gap-1 cursor-pointer"
              >
                <span>Launch Simulators</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: RocheMaps */}
          <div className="bg-gradient-to-br from-white to-sky-50/40 p-6 rounded-3xl border border-sky-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-md shadow-sky-200">
                <Globe className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full uppercase">
                Tanzania &amp; East Africa GIS
              </div>
              <h3 className="text-xl font-black text-[#0A3D62] font-display">
                RocheMaps Geography Hub
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clickable Tanzania map with 31 regions detailing physical relief, economic minerals, climate systems, the Great Rift Valley, and 6-figure grid reference tools.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-sky-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-sky-700">31 Regions + Rift Tectonics</span>
              <button
                onClick={() => onEnterApp('maps')}
                className="text-xs font-bold text-[#0A3D62] group-hover:text-sky-600 flex items-center gap-1 cursor-pointer"
              >
                <span>Explore Map</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Past Papers Bank */}
          <div className="bg-gradient-to-br from-white to-amber-50/40 p-6 rounded-3xl border border-amber-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-md shadow-amber-200">
                <FileText className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                NECTA &amp; Cambridge Archive
              </div>
              <h3 className="text-xl font-black text-[#0A3D62] font-display">
                Past Papers with Marked Solutions
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Authentic Standard 7, Form IV, Form VI, and Cambridge IGCSE / A-Level exam papers. Step-by-step marking rubrics teach candidates exactly how examiners award marks.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-amber-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-700">Worked Solutions Included</span>
              <button
                onClick={() => onEnterApp('pastpapers')}
                className="text-xs font-bold text-[#0A3D62] group-hover:text-amber-600 flex items-center gap-1 cursor-pointer"
              >
                <span>Browse Papers</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 4: 10-Question Mastery Engine */}
          <div className="bg-gradient-to-br from-white to-indigo-50/40 p-6 rounded-3xl border border-indigo-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-200">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-bold text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full uppercase">
                Concept Evaluation Engine
              </div>
              <h3 className="text-xl font-black text-[#0A3D62] font-display">
                10-Question Mastery Quizzes
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exactly 10 questions per syllabus topic with timer tracking, instant marking, confetti celebration on distinctions, and explanations linked to ROCHE principles.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-indigo-700">Timer &amp; Score Tracking</span>
              <button
                onClick={() => onEnterApp('quiz')}
                className="text-xs font-bold text-[#0A3D62] group-hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
              >
                <span>Take a Quiz</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 5: Low-Data PDF Notes & Videos */}
          <div className="bg-gradient-to-br from-white to-rose-50/40 p-6 rounded-3xl border border-rose-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold shadow-md shadow-rose-200">
                <Download className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full uppercase">
                Offline Printable PDF System
              </div>
              <h3 className="text-xl font-black text-[#0A3D62] font-display">
                Downloadable PDF Study Guides
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates high-yield, formatted PDF study sheets right in your browser without data re-download. Compressed videos stream cleanly on basic 3G mobile connections.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-rose-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-rose-700">100% Offline Capable</span>
              <button
                onClick={() => onEnterApp('notes')}
                className="text-xs font-bold text-[#0A3D62] group-hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <span>Get PDF Notes</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 6: Primary Kids Fun Corner */}
          <div className="bg-gradient-to-br from-white to-amber-50/60 p-6 rounded-3xl border border-amber-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0A3D62] text-white flex items-center justify-center font-bold shadow-md">
                <Smile className="w-6 h-6 text-[#2ECC71]" />
              </div>
              <div className="inline-block text-[11px] font-bold text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full uppercase">
                Standard I – VII Discovery
              </div>
              <h3 className="text-xl font-black text-[#0A3D62] font-display">
                Primary Kids Fun Zone! 🍕 🫀 🦁
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Young learners click pizza slices to understand fractions ($1/2$, $4/8$), explore internal organs in English and Swahili (*Ubongo, Moyo*), and meet Serengeti wildlife.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-amber-200 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-800">Std I - VII Foundation</span>
              <button
                onClick={() => onEnterApp('curriculum', 'primary')}
                className="text-xs font-bold text-[#0A3D62] group-hover:text-[#2ECC71] flex items-center gap-1 cursor-pointer"
              >
                <span>Play Kids Games</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* LIVE INTERACTIVE MINI-WIDGET PREVIEW */}
        <div className="bg-[#0A3D62] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#0A3D62]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div>
              <span className="text-xs font-bold text-[#2ECC71] uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                Live Interactive Micro-Simulators
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display mt-1">
                Experience Roche Academy Right Now
              </h3>
              <p className="text-xs text-slate-300">
                Click controls below to see how our interactive tools bring science and math to life.
              </p>
            </div>

            {/* Selector tabs */}
            <div className="flex items-center gap-1.5 bg-white/10 p-1.5 rounded-xl border border-white/15 text-xs">
              <button
                onClick={() => setMiniDemoTab('titration')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  miniDemoTab === 'titration' ? 'bg-[#F5E8C7] text-[#0A3D62]' : 'text-white hover:bg-white/10'
                }`}
              >
                🧪 Chemistry Titration
              </button>
              <button
                onClick={() => setMiniDemoTab('fraction')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  miniDemoTab === 'fraction' ? 'bg-[#F5E8C7] text-[#0A3D62]' : 'text-white hover:bg-white/10'
                }`}
              >
                🍕 Pizza Fractions
              </button>
              <button
                onClick={() => setMiniDemoTab('map')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  miniDemoTab === 'map' ? 'bg-[#F5E8C7] text-[#0A3D62]' : 'text-white hover:bg-white/10'
                }`}
              >
                🗺️ Tanzania Regions
              </button>
            </div>
          </div>

          <div className="pt-6">
            {miniDemoTab === 'titration' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  {/* Visual Flask */}
                  <div className="relative w-28 h-36 flex flex-col items-center justify-end">
                    {/* Liquid fill */}
                    <div
                      className="w-24 rounded-b-2xl transition-all duration-300 flex items-center justify-center"
                      style={{
                        height: `${Math.min(90, 40 + miniDrops * 2)}px`,
                        backgroundColor:
                          miniDrops < 20
                            ? '#f8fafc'
                            : miniDrops === 20
                            ? '#f43f5e'
                            : '#be123c',
                        opacity: miniDrops < 20 ? 0.8 : 0.95,
                      }}
                    >
                      <span className="text-[10px] font-mono font-bold text-slate-900">
                        {miniDrops < 20 ? 'Clear (pH < 7)' : 'Fuchsia (pH ≥ 7)'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-3 font-mono">
                    Flask: 25.0 mL HCl + Phenolphthalein
                  </span>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Added NaOH Drops ({miniDrops}/25 drops):</span>
                    <span className="font-mono font-bold text-[#F5E8C7]">{(miniDrops * 1.0).toFixed(1)} mL</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={miniDrops}
                    onChange={(e) => setMiniDrops(Number(e.target.value))}
                    className="w-full accent-[#2ECC71]"
                  />
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
                    {miniDrops < 20 ? (
                      <span>
                        🟡 <strong>Acidic Medium:</strong> Solution remains colorless. Add more base to reach stoichiometric equivalence.
                      </span>
                    ) : miniDrops === 20 ? (
                      <span className="text-[#2ECC71] font-bold">
                        🎉 <strong>EQUIVALENCE POINT REACHED!</strong> Permanent faint pink color appears. $M_A \cdot V_A = M_B \cdot V_B$.
                      </span>
                    ) : (
                      <span className="text-rose-300 font-bold">
                        🔴 <strong>Over-titrated:</strong> Excess NaOH turned the solution deep magenta.
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onEnterApp('lab')}
                    className="text-xs font-bold text-[#F5E8C7] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open full 5-simulator RocheLab suite →</span>
                  </button>
                </div>
              </div>
            )}

            {miniDemoTab === 'fraction' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="relative w-32 h-32 rounded-full border-4 border-amber-400 flex items-center justify-center bg-amber-100 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-amber-500 origin-center transition-all duration-300"
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${
                          miniPizzaSlices >= 2 ? '100% 0%,' : ''
                        } ${miniPizzaSlices >= 4 ? '100% 100%,' : ''} ${
                          miniPizzaSlices >= 6 ? '0% 100%,' : ''
                        } 50% 50%)`,
                      }}
                    />
                    <span className="relative z-10 font-black text-slate-900 font-mono text-sm bg-white/90 px-2 py-0.5 rounded shadow">
                      {miniPizzaSlices} / 8 Slices
                    </span>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Selected Slices:</span>
                    <span className="font-mono font-bold text-[#2ECC71] text-base">{miniPizzaSlices} / 8</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={miniPizzaSlices}
                    onChange={(e) => setMiniPizzaSlices(Number(e.target.value))}
                    className="w-full accent-[#2ECC71]"
                  />
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
                    {miniPizzaSlices === 4 ? (
                      <span className="text-[#F5E8C7] font-bold">
                        🌟 <strong>Equivalent Fraction:</strong> 4/8 simplifies directly to <strong>1/2 (Half)</strong>!
                      </span>
                    ) : miniPizzaSlices === 8 ? (
                      <span className="text-[#2ECC71] font-bold">
                        🍕 <strong>Whole:</strong> 8/8 = 1 Whole Pizza (or Chapati)!
                      </span>
                    ) : (
                      <span>
                        Numerator is <strong>{miniPizzaSlices}</strong> (slices taken), Denominator is <strong>8</strong> (total parts).
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onEnterApp('curriculum', 'primary')}
                    className="text-xs font-bold text-[#F5E8C7] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore Primary Fun Corner with Body Organs &amp; Wildlife →</span>
                  </button>
                </div>
              </div>
            )}

            {miniDemoTab === 'map' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Select Region to Inspect:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Dodoma', 'Dar es Salaam', 'Arusha', 'Mwanza', 'Kilimanjaro', 'Mbeya'].map((r) => (
                      <button
                        key={r}
                        onClick={() => setMiniZoomRegion(r)}
                        className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                          miniZoomRegion === r
                            ? 'bg-[#2ECC71] text-slate-950'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <div className="bg-white/10 p-4 rounded-xl border border-white/15 space-y-1.5 text-xs">
                    <span className="text-[#F5E8C7] font-bold text-sm block">
                      {miniZoomRegion} Region Overview
                    </span>
                    <p className="text-slate-200">
                      {miniZoomRegion === 'Dodoma' && 'National Capital of Tanzania. Semi-arid central plateau, viticulture (grapes), and political administration.'}
                      {miniZoomRegion === 'Dar es Salaam' && 'Commercial and industrial capital. Deep-water port connecting East Africa, Indian Ocean coastline.'}
                      {miniZoomRegion === 'Arusha' && 'Diplomatic hub (EAC headquarters), safari gateway to Serengeti, and volcanic highland topography.'}
                      {miniZoomRegion === 'Mwanza' && 'The Rock City along Lake Victoria shore. Tilapia fisheries, gold mining, and cotton farming.'}
                      {miniZoomRegion === 'Kilimanjaro' && 'Home to Mount Kilimanjaro (5,895m - Roof of Africa), fertile volcanic soils, and Arabica coffee.'}
                      {miniZoomRegion === 'Mbeya' && 'Southern Highlands grain basket, tea, and volcanic crater lakes (Ngozi).'}
                    </p>
                  </div>
                  <button
                    onClick={() => onEnterApp('maps')}
                    className="text-xs font-bold text-[#F5E8C7] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Launch full interactive 31-region Tanzania SVG GIS map →</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. "TO WHOM" - TAILORED PERSONAS & PATHWAYS */}
      <section className="py-16 px-4 sm:px-6 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#0A3D62] text-[#F5E8C7] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-[#2ECC71]" />
              Who Roche Academy is Built For
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A3D62] font-display">
              Tailored Educational Pathways for Every African Learner
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Whether you are a 7-year-old discovering basic numbers, a Form IV candidate striving for Division One, or a teacher in an under-resourced school — Roche Academy is your unfair advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Persona 1: Primary */}
            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
                  🎒
                </div>
                <h4 className="text-sm font-black text-[#0A3D62]">Primary Pupils (Std I–VII)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Building early scientific curiosity through pizza fractions, human body organs (*Moyo, Mapafu*), and NECTA PSLE prep.
                </p>
              </div>
              <button
                onClick={() => onEnterApp('curriculum', 'primary')}
                className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-[11px] rounded-lg border border-amber-200 cursor-pointer"
              >
                Standard I - VII Path →
              </button>
            </div>

            {/* Persona 2: O-Level */}
            <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                  📘
                </div>
                <h4 className="text-sm font-black text-[#0A3D62]">O-Level (Form I–IV)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Master CSEE Physics, Chemistry, Biology &amp; Geography. 6-figure grid refs, titration math, and NECTA marked rubrics.
                </p>
              </div>
              <button
                onClick={() => onEnterApp('curriculum', 'olevel')}
                className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-[11px] rounded-lg border border-emerald-200 cursor-pointer"
              >
                Form I - IV Path →
              </button>
            </div>

            {/* Persona 3: A-Level */}
            <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-lg">
                  🎓
                </div>
                <h4 className="text-sm font-black text-[#0A3D62]">A-Level (Form V–VI)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rigorous ACSEE &amp; Cambridge A-Level preparation. Tectonic rift dynamics, harmonic physics, and advanced calculus.
                </p>
              </div>
              <button
                onClick={() => onEnterApp('curriculum', 'alevel')}
                className="w-full py-2 bg-sky-50 hover:bg-sky-100 text-sky-900 font-bold text-[11px] rounded-lg border border-sky-200 cursor-pointer"
              >
                Form V - VI Path →
              </button>
            </div>

            {/* Persona 4: Teachers & Walimu */}
            <div className="bg-white p-5 rounded-2xl border border-indigo-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-lg">
                  👩‍🏫
                </div>
                <h4 className="text-sm font-black text-[#0A3D62]">Teachers &amp; Tutors (Walimu)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ready-made printable lesson handouts, animated class experiments on a projector, and verified NECTA marking schemes.
                </p>
              </div>
              <button
                onClick={() => onEnterApp('notes')}
                className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-[11px] rounded-lg border border-indigo-200 cursor-pointer"
              >
                Teacher Toolkit →
              </button>
            </div>

            {/* Persona 5: Parents */}
            <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-lg">
                  👨‍👧
                </div>
                <h4 className="text-sm font-black text-[#0A3D62]">Parents &amp; Guardians</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Free, trusted curriculum study at home on ordinary mobile phones. Zero high data consumption with offline PDF printing.
                </p>
              </div>
              <button
                onClick={() => onEnterApp('pastpapers')}
                className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold text-[11px] rounded-lg border border-rose-200 cursor-pointer"
              >
                Revision Bank →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "WHY ROCHE ACADEMY" - THE CRISIS, THE SOLUTION & THE ROCHE METHOD */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" />
              The Educational Crisis in East Africa
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A3D62] font-display">
              Why We Built Roche Academy
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              In Tanzania and across sub-Saharan Africa, over <strong>78% of secondary schools</strong> lack functional science laboratories, burettes, microscopes, and chemical reagents. Students are forced to learn empirical science through rote cramming (*kukarra*).
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Meanwhile, commercial revision books cost tens of thousands of shillings, and video streaming burns through expensive mobile data bundles in minutes.
            </p>
            <div className="bg-emerald-50 border-l-4 border-[#2ECC71] p-4 rounded-r-2xl space-y-1">
              <div className="text-xs font-bold text-emerald-900 uppercase">The Roche Solution:</div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                We engineered interactive virtual apparatuses that run directly on budget Android smartphones using less than 5 megabytes of data, with 1-click printable PDF notes that work 100% offline.
              </p>
            </div>
          </div>

          {/* The ROCHE Acronym Interactive Matrix */}
          <div className="lg:col-span-6 bg-[#0A3D62] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4 border border-[#0A3D62]">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <h3 className="font-black text-lg text-[#F5E8C7] font-display">
                The ROCHE Pedagogical Method
              </h3>
              <span className="text-[10px] bg-[#2ECC71] text-slate-950 font-bold px-2 py-0.5 rounded">
                Scientifically Proven
              </span>
            </div>

            <div className="space-y-3">
              {ROCHE_PILLARS.map((p) => (
                <div
                  key={p.letter}
                  className="bg-white/10 hover:bg-white/15 p-3 rounded-xl border border-white/10 transition-colors flex items-start gap-3"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#F5E8C7] text-[#0A3D62] font-black text-base flex items-center justify-center shrink-0 font-display">
                    {p.letter}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">{p.title}</h4>
                    <p className="text-[11px] text-slate-200 leading-snug">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMPARISON TABLE: Roche vs Traditional vs Foreign Apps */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 overflow-x-auto">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-[#0A3D62] font-display">
              Why Roche Academy Outperforms Alternatives
            </h3>
            <p className="text-xs text-slate-500">
              Built specifically for Tanzanian academic realities, not imported foreign curricula.
            </p>
          </div>

          <table className="w-full text-left text-xs min-w-[550px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">Feature &amp; Metric</th>
                <th className="py-3 px-3 text-[#0A3D62] font-black bg-emerald-50/60 rounded-t-xl">
                  Roche Academy Hub
                </th>
                <th className="py-3 px-3">Traditional Extra Tuition</th>
                <th className="py-3 px-3">Foreign EdTech Platforms</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-3 font-bold">NECTA Syllabus Alignment</td>
                <td className="py-3 px-3 font-bold text-emerald-700 bg-emerald-50/60">
                  ✓ 100% Exact NECTA Code Matches
                </td>
                <td className="py-3 px-3 text-slate-500">Varies widely by tutor</td>
                <td className="py-3 px-3 text-rose-500">✗ Foreign (US/UK/India only)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold">Interactive Virtual Labs</td>
                <td className="py-3 px-3 font-bold text-emerald-700 bg-emerald-50/60">
                  ✓ 5 Interactive Simulations
                </td>
                <td className="py-3 px-3 text-rose-500">✗ Rarely has chemicals</td>
                <td className="py-3 px-3 text-slate-500">Requires expensive PC hardware</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold">Data Consumption Footprint</td>
                <td className="py-3 px-3 font-bold text-emerald-700 bg-emerald-50/60">
                  ✓ Low-Data (&lt;5MB) + Offline PDF
                </td>
                <td className="py-3 px-3 text-slate-500">Physical transport needed</td>
                <td className="py-3 px-3 text-rose-500">✗ Heavy video streaming (1GB/hr)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold">Swahili Cultural Integration</td>
                <td className="py-3 px-3 font-bold text-emerald-700 bg-emerald-50/60">
                  ✓ Swahili anatomy + Tanzania GIS
                </td>
                <td className="py-3 px-3 text-slate-500">Oral explanation only</td>
                <td className="py-3 px-3 text-rose-500">✗ 0% East African context</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold">Cost to Student &amp; School</td>
                <td className="py-3 px-3 font-bold text-emerald-700 bg-emerald-50/60">
                  ✓ 100% Free Public Access
                </td>
                <td className="py-3 px-3 text-rose-500">TSh 50,000 - 150,000 / month</td>
                <td className="py-3 px-3 text-rose-500">$10 - $30 / month USD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. PERSUASIVE FINAL CALL TO ACTION */}
      <section className="bg-gradient-to-r from-[#0A3D62] via-[#09416a] to-[#0A3D62] text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#2ECC71]/20 border border-[#2ECC71]/40 text-[#F5E8C7] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-[#2ECC71]" />
            Your Academic Future Starts Today
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
            Ready to Master Science, Mathematics &amp; Geography?
          </h2>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Join over 15,000 Tanzanian students, teachers, and parents transforming their academic trajectory. Free access to all past papers, interactive virtual labs, and offline PDF notes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onEnterApp('curriculum')}
              className="px-8 py-4 rounded-xl text-sm font-black bg-[#2ECC71] hover:bg-[#27ae60] text-slate-950 flex items-center gap-2 shadow-xl shadow-emerald-950/40 transition-all cursor-pointer hover:scale-105"
            >
              <span>Explore Curriculum Modules Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setAuthMode('signup');
              }}
              className="px-6 py-4 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
            >
              <span>Create Free Account Above</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-300 pt-4">
            No credit card required • Works on mobile 3G/4G • 100% Free
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#082a44] text-white border-t border-[#0d3b5e] py-8 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RocheLogo size="sm" variant="white" showText={true} />
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="italic text-slate-300 hidden md:inline">
              "From ABC to PhD - Science, Math &amp; World Made Simple"
            </span>
          </div>
          <div>
            © {new Date().getFullYear()} Roche Academy. All Rights Reserved. Aligned with NECTA &amp; Cambridge.
          </div>
        </div>
      </footer>
    </div>
  );
};
