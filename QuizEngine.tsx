import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_BANK } from '../data/mockData';
import { TopicQuiz, QuizQuestion } from '../types';
import {
  HelpCircle,
  Award,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  BookOpen,
  Brain,
} from 'lucide-react';

interface QuizEngineProps {
  initialTopicId?: string;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ initialTopicId }) => {
  const [selectedTopicId, setSelectedTopicId] = useState(
    initialTopicId || QUIZ_BANK[0]?.topicId || ''
  );

  const currentQuiz =
    QUIZ_BANK.find((q) => q.topicId === selectedTopicId) || QUIZ_BANK[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Timer ticker
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && !isSubmitted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  // Trigger confetti on perfect/high score submission
  useEffect(() => {
    if (isSubmitted) {
      const correctCount = currentQuiz.questions.reduce((acc, q, idx) => {
        return acc + (userAnswers[idx] === q.correctIndex ? 1 : 0);
      }, 0);

      if (correctCount >= 7) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0A3D62', '#2ECC71', '#F5E8C7', '#f97316'],
        });
      }
    }
  }, [isSubmitted, currentQuiz, userAnswers]);

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [qIdx]: optionIdx,
    }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setTimerSeconds(0);
    setIsTimerRunning(true);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const currentQuestion: QuizQuestion | undefined =
    currentQuiz.questions[currentIndex];

  // Calculate score
  const correctCount = currentQuiz.questions.reduce((acc, q, idx) => {
    return acc + (userAnswers[idx] === q.correctIndex ? 1 : 0);
  }, 0);
  const percentage = Math.round((correctCount / currentQuiz.questions.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A3D62] via-[#09416a] to-[#0A3D62] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[#0A3D62] shadow-md">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#F5E8C7] text-[#0A3D62] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5" />
            10-Question Mastery Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 font-display">
            Interactive Topic Quiz &amp; Concept Evaluation
          </h1>
          <p className="text-slate-200 text-sm leading-relaxed">
            Test syllabus understanding with exactly 10 rigorous multiple-choice questions. Get instant feedback on the ROCHE principles (Reasoning, Observation, Calculation, Hypothesis, Exploration).
          </p>
        </div>

        {/* Topic Selector Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/15">
          <span className="text-xs text-slate-300 font-semibold mr-1 self-center">
            Select Topic:
          </span>
          {QUIZ_BANK.map((quiz) => (
            <button
              key={quiz.topicId}
              onClick={() => {
                setSelectedTopicId(quiz.topicId);
                handleResetQuiz();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTopicId === quiz.topicId
                  ? 'bg-[#F5E8C7] text-[#0A3D62] shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {quiz.topicTitle}
            </button>
          ))}
        </div>
      </div>

      {/* Main Quiz Area */}
      {!isSubmitted ? (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          {/* Progress & Timer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Question {currentIndex + 1} of {currentQuiz.questions.length}
              </span>
              <div className="w-48 sm:w-72 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0A3D62] transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / currentQuiz.questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <Clock className="w-4 h-4 text-[#0A3D62]" />
                <span className="font-mono text-slate-800">{formatTime(timerSeconds)}</span>
              </div>
              <span className="text-slate-400">|</span>
              <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] font-bold">
                {currentQuiz.subject.toUpperCase()} • {currentQuiz.level.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Active Question Box */}
          {currentQuestion && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-block bg-slate-100 text-slate-600 text-[11px] font-bold px-2.5 py-0.5 rounded uppercase">
                  Pillar: {currentQuestion.rochePillar}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentIndex + 1}. {currentQuestion.question}
                </h3>
              </div>

              {/* 4 Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((option, optIdx) => {
                  const isSelected = userAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentIndex, optIdx)}
                      className={`p-4 rounded-xl text-left border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? 'bg-[#F5E8C7] text-[#0A3D62]'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {isSelected && <CheckCircle className="w-4 h-4 text-[#2ECC71]" />}
                    </button>
                  );
                })}
              </div>

              {/* Instant Pedagogical Hint/Pillar if answered */}
              {userAnswers[currentIndex] !== undefined && (
                <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200 text-xs text-slate-700 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#0A3D62] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0A3D62]">
                      ROCHE {currentQuestion.rochePillar} Principle:
                    </span>{' '}
                    <span>{currentQuestion.explanation}</span>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>

                {currentIndex < currentQuiz.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0A3D62] hover:bg-[#0c4b78] text-white flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#2ECC71] hover:bg-[#27ae60] text-slate-950 flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Finish &amp; Score Quiz</span>
                    <Award className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Completed Results Card */
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#2ECC71] flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-10 h-10 text-[#0A3D62]" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#0A3D62] font-display">
              Quiz Evaluation Complete!
            </h2>
            <p className="text-xs text-slate-500">
              {currentQuiz.topicTitle} • Standardized Syllabus Assessment
            </p>
          </div>

          {/* Score Badge */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-xs mx-auto space-y-2">
            <div className="text-4xl font-black text-[#0A3D62] font-mono">
              {correctCount} / {currentQuiz.questions.length}
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {percentage}% Overall Score
            </div>
            <div
              className={`text-xs font-black py-1 px-3 rounded-full inline-block ${
                percentage >= 80
                  ? 'bg-emerald-100 text-emerald-900'
                  : percentage >= 50
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-rose-100 text-rose-900'
              }`}
            >
              {percentage >= 80
                ? 'Distinction - Outstanding Mastery!'
                : percentage >= 50
                ? 'Credit - Good Conceptual Understanding'
                : 'Needs Revision - Review the PDF Notes'}
            </div>
          </div>

          {/* Review of all 10 Questions */}
          <div className="text-left space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Question-by-Question Marking Review:
            </h3>
            {currentQuiz.questions.map((q, idx) => {
              const isCorrect = userAnswers[idx] === q.correctIndex;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    isCorrect
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 font-bold text-slate-900">
                    <span>
                      {idx + 1}. {q.question}
                    </span>
                    {isCorrect ? (
                      <span className="text-emerald-700 flex items-center gap-1 shrink-0">
                        <CheckCircle className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1 shrink-0">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <strong className="text-slate-800">Correct Answer:</strong>{' '}
                    {q.options[q.correctIndex]}
                  </div>
                  <div className="text-[11px] text-slate-500 italic bg-white/70 p-2 rounded">
                    <strong>ROCHE {q.rochePillar}:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleResetQuiz}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0A3D62] text-white hover:bg-[#0c4b78] flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
