import React, { useState, useEffect, useRef } from 'react';
import {
  FlaskConical,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Droplets,
  Sun,
  Zap,
  Mountain,
  Gauge,
  CheckCircle,
  HelpCircle,
  Activity,
  Layers,
} from 'lucide-react';

export const RocheLab: React.FC = () => {
  const [activeExperiment, setActiveExperiment] = useState<
    'titration' | 'photosynthesis' | 'circuits' | 'rockcycle' | 'pendulum'
  >('titration');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A3D62] via-[#0d4f7e] to-[#0A3D62] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[#0A3D62] shadow-md">
        <div className="absolute right-0 top-0 w-96 h-96 bg-radial from-white/10 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#2ECC71]/20 border border-[#2ECC71]/40 text-[#F5E8C7] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5 text-[#2ECC71]" />
            RocheLab Virtual Science Simulator
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 font-display">
            Animated Science &amp; Physics Laboratory
          </h1>
          <p className="text-slate-200 text-sm leading-relaxed">
            Formulate hypotheses, alter physical variables, observe real-time reactions, and verify calculations. Designed for Standard I to Form VI practical syllabus.
          </p>
        </div>

        {/* Experiment Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/15">
          <button
            onClick={() => setActiveExperiment('titration')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeExperiment === 'titration'
                ? 'bg-[#F5E8C7] text-[#0A3D62] shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Droplets className="w-4 h-4 text-emerald-400" />
            <span>Acid-Base Titration (Chem)</span>
          </button>

          <button
            onClick={() => setActiveExperiment('photosynthesis')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeExperiment === 'photosynthesis'
                ? 'bg-[#F5E8C7] text-[#0A3D62] shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-300" />
            <span>Photosynthesis &amp; Light (Bio)</span>
          </button>

          <button
            onClick={() => setActiveExperiment('circuits')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeExperiment === 'circuits'
                ? 'bg-[#F5E8C7] text-[#0A3D62] shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-yellow-300" />
            <span>Ohm's Law &amp; Circuit (Phys)</span>
          </button>

          <button
            onClick={() => setActiveExperiment('rockcycle')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeExperiment === 'rockcycle'
                ? 'bg-[#F5E8C7] text-[#0A3D62] shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Mountain className="w-4 h-4 text-orange-300" />
            <span>Rock Cycle &amp; Earth (Geo)</span>
          </button>

          <button
            onClick={() => setActiveExperiment('pendulum')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeExperiment === 'pendulum'
                ? 'bg-[#F5E8C7] text-[#0A3D62] shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-cyan-300" />
            <span>Gravity &amp; Harmonic Motion (Phys)</span>
          </button>
        </div>
      </div>

      {/* Active Simulation Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        {activeExperiment === 'titration' && <TitrationExperiment />}
        {activeExperiment === 'photosynthesis' && <PhotosynthesisExperiment />}
        {activeExperiment === 'circuits' && <CircuitsExperiment />}
        {activeExperiment === 'rockcycle' && <RockCycleExperiment />}
        {activeExperiment === 'pendulum' && <PendulumExperiment />}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 1. Chemistry: Acid-Base Titration Experiment
 * ------------------------------------------------------------- */
const TitrationExperiment: React.FC = () => {
  const [naohAdded, setNaohAdded] = useState(0); // 0 to 50 mL
  const [isRunning, setIsRunning] = useState(false);
  const [indicator, setIndicator] = useState<'phenolphthalein' | 'methylorange'>('phenolphthalein');
  const [dropRate, setDropRate] = useState<'slow' | 'fast'>('slow');

  const hclVolume = 25.0; // mL
  const hclMolarity = 0.1; // M
  const naohMolarity = 0.1; // M

  // Calculate equivalence point volume: Mb*Vb = Ma*Va -> Vb = (0.1*25)/0.1 = 25.0 mL
  const equivalenceVolume = (hclMolarity * hclVolume) / naohMolarity;

  // Calculate pH curve dynamically
  const totalVolume = hclVolume + naohAdded;
  let ph = 1.0;
  if (naohAdded < equivalenceVolume) {
    const unreactedMolesH = (hclMolarity * hclVolume - naohMolarity * naohAdded) / 1000;
    const concH = unreactedMolesH / (totalVolume / 1000);
    ph = Math.max(1.0, -Math.log10(concH));
  } else if (naohAdded === equivalenceVolume) {
    ph = 7.0;
  } else {
    const excessMolesOH = (naohMolarity * (naohAdded - equivalenceVolume)) / 1000;
    const concOH = excessMolesOH / (totalVolume / 1000);
    const pOH = -Math.log10(concOH);
    ph = Math.min(13.5, 14.0 - pOH);
  }

  // Solution color based on indicator & pH
  let flaskColor = 'bg-sky-50/60 border-sky-200';
  let colorName = 'Colorless solution';
  if (indicator === 'phenolphthalein') {
    if (ph >= 8.2) {
      flaskColor = 'bg-pink-400/80 border-pink-500 shadow-inner';
      colorName = 'Vibrant Pink (Alkaline End-Point)';
    } else {
      flaskColor = 'bg-slate-50/70 border-slate-300';
      colorName = 'Colorless (Acidic/Neutral)';
    }
  } else {
    // Methyl orange
    if (ph < 3.1) {
      flaskColor = 'bg-red-400/70 border-red-500';
      colorName = 'Red (Acidic)';
    } else if (ph <= 4.4) {
      flaskColor = 'bg-amber-400/80 border-amber-500';
      colorName = 'Orange (End-Point reached)';
    } else {
      flaskColor = 'bg-yellow-300/80 border-yellow-400';
      colorName = 'Yellow (Alkaline)';
    }
  }

  // Automated dripping effect
  useEffect(() => {
    let interval: any;
    if (isRunning && naohAdded < 50) {
      interval = setInterval(() => {
        setNaohAdded((prev) => {
          const increment = dropRate === 'fast' ? 0.5 : 0.1;
          const next = +(prev + increment).toFixed(2);
          if (next >= 50) {
            setIsRunning(false);
            return 50;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, dropRate, naohAdded]);

  const handleReset = () => {
    setIsRunning(false);
    setNaohAdded(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Simulation Visual Display */}
      <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 text-white flex flex-col items-center relative min-h-[460px]">
        {/* Lab Stand & Burette Visual */}
        <div className="relative w-72 h-[380px] flex justify-center">
          {/* Iron Stand Base & Rod */}
          <div className="absolute bottom-2 left-6 w-32 h-4 bg-slate-700 rounded border border-slate-600" />
          <div className="absolute bottom-6 left-16 w-3 h-[360px] bg-slate-600 rounded" />

          {/* Burette Clamp */}
          <div className="absolute top-28 left-16 w-16 h-2.5 bg-slate-500" />

          {/* Glass Burette Tube */}
          <div className="relative z-10 w-10 h-64 bg-sky-100/20 border-2 border-sky-300/60 rounded-t-sm flex flex-col justify-between overflow-hidden shadow-lg backdrop-blur-xs">
            {/* NaOH liquid level inside burette */}
            <div
              className="w-full bg-emerald-400/60 transition-all duration-150 relative"
              style={{ height: `${Math.max(0, 100 - (naohAdded / 50) * 100)}%` }}
            >
              <div className="absolute bottom-0 w-full h-1 bg-emerald-300" />
            </div>

            {/* Burette Milliliter Graduations */}
            <div className="absolute inset-0 flex flex-col justify-between p-1 text-[8px] font-mono text-white/70 select-none pointer-events-none">
              <span>0 mL</span>
              <span>10 mL</span>
              <span>20 mL</span>
              <span>30 mL</span>
              <span>40 mL</span>
              <span>50 mL</span>
            </div>
          </div>

          {/* Stopcock Valve */}
          <div className="absolute top-[260px] z-20 flex items-center justify-center">
            <div
              onClick={() => setIsRunning(!isRunning)}
              className={`w-7 h-5 rounded cursor-pointer transition-transform duration-200 border border-white flex items-center justify-center text-[9px] font-bold ${
                isRunning ? 'bg-emerald-500 rotate-90' : 'bg-red-500 rotate-0'
              }`}
              title="Click to toggle stopcock"
            >
              {isRunning ? 'ON' : 'OFF'}
            </div>
          </div>

          {/* Droplet Animation */}
          {isRunning && (
            <div className="absolute top-[282px] z-10 animate-bounce">
              <div className="w-2 h-2.5 bg-emerald-400 rounded-full" />
            </div>
          )}

          {/* Erlenmeyer Flask */}
          <div className="absolute bottom-6 w-32 h-28 flex flex-col items-center">
            {/* Neck */}
            <div className="w-8 h-8 bg-sky-100/30 border-x-2 border-t-2 border-sky-300/60" />
            {/* Body */}
            <div
              className={`w-32 h-20 border-2 border-sky-300/80 rounded-b-2xl transition-colors duration-300 flex items-end justify-center p-2 relative overflow-hidden ${flaskColor}`}
            >
              <span className="text-[10px] font-bold text-slate-900 bg-white/80 px-2 py-0.5 rounded shadow-xs mb-2 z-10">
                pH: {ph.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Live Status Readout */}
        <div className="w-full bg-slate-800/90 rounded-xl p-3 border border-slate-700 mt-2 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Titrant Added: </span>
            <span className="font-mono text-emerald-400 font-bold">{naohAdded.toFixed(1)} mL NaOH</span>
          </div>
          <div>
            <span className="text-slate-400">Indicator: </span>
            <span className="font-semibold text-[#F5E8C7] capitalize">{indicator}</span>
          </div>
          <div>
            <span className="text-slate-400">State: </span>
            <span className="font-bold text-white">{colorName}</span>
          </div>
        </div>
      </div>

      {/* Control Panel & Theoretical ROCHE Breakdown */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <h3 className="font-bold text-sm text-[#0A3D62] flex items-center gap-2 mb-3">
            <Droplets className="w-4 h-4 text-emerald-600" />
            Titration Control Board
          </h3>

          {/* Indicator Select */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Choose Acid-Base Indicator:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIndicator('phenolphthalein')}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  indicator === 'phenolphthalein'
                    ? 'bg-[#0A3D62] text-white border-[#0A3D62]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Phenolphthalein (pH 8.2)
              </button>
              <button
                onClick={() => setIndicator('methylorange')}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  indicator === 'methylorange'
                    ? 'bg-[#0A3D62] text-white border-[#0A3D62]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Methyl Orange (pH 3.8)
              </button>
            </div>
          </div>

          {/* Drip Controls */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Burette Dispense Rate:</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDropRate('slow')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${
                  dropRate === 'slow' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-white text-slate-600'
                }`}
              >
                Dropwise (0.1 mL/s)
              </button>
              <button
                onClick={() => setDropRate('fast')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${
                  dropRate === 'fast' ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-white text-slate-600'
                }`}
              >
                Stream (0.5 mL/s)
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                isRunning
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-[#0A3D62] hover:bg-[#0c4b78] text-white'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pause Stopcock' : 'Open Stopcock'}</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3.5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* The ROCHE Pedagogical Breakdown Card */}
        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-xs text-slate-700 space-y-2">
          <div className="font-bold text-emerald-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>ROCHE Volumetric Calculation Check</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            <strong className="text-emerald-950">Hypothesis &amp; Calculation:</strong> When titrating 25.0 mL of 0.100 M HCl against 0.100 M NaOH:
          </p>
          <div className="bg-white p-2.5 rounded-lg font-mono text-[11px] text-[#0A3D62] border border-emerald-200">
            Ma × Va = Mb × Vb <br />
            (0.100 M × 25.0 mL) = (0.100 M × Vb) <br />
            <strong>Equivalence Vb = 25.00 mL</strong>
          </div>
          <div className="text-[11px] text-emerald-800">
            {naohAdded < 25.0 ? (
              <span>Still Acidic. Keep adding NaOH until you reach ~25.0 mL.</span>
            ) : naohAdded === 25.0 ? (
              <span className="font-bold text-emerald-900">
                Target Equivalence Reached! Neutral pH 7.00 achieved.
              </span>
            ) : (
              <span className="text-amber-800 font-medium">
                Over-titrated! Solution is now alkaline (excess OH⁻ ions).
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 2. Biology: Photosynthesis & Light Spectrum Lab
 * ------------------------------------------------------------- */
const PhotosynthesisExperiment: React.FC = () => {
  const [lightDistance, setLightDistance] = useState(30); // 10 to 80 cm
  const [wavelength, setWavelength] = useState<'white' | 'red' | 'blue' | 'green'>('white');
  const [bubbles, setBubbles] = useState<number[]>([]);

  // Photosynthesis efficiency factor based on wavelength (chlorophyll absorbs red & blue, reflects green)
  const wavelengthFactor = {
    white: 1.0,
    red: 1.2,
    blue: 1.1,
    green: 0.15, // Green light is mostly reflected!
  }[wavelength];

  // Rate of bubbles per minute = inverse square law for light: I = k / d^2
  const bubbleRate = Math.max(
    2,
    Math.round((2500 / Math.pow(lightDistance, 1.4)) * wavelengthFactor)
  );

  // Generate bubbles based on rate
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prev) => [...prev.slice(-15), Date.now()]);
    }, Math.max(120, 60000 / (bubbleRate * 12)));

    return () => clearInterval(interval);
  }, [bubbleRate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 text-white flex flex-col items-center justify-between min-h-[460px] relative overflow-hidden">
        {/* Lamp Light Beam Overlay */}
        <div
          className={`absolute top-0 right-0 h-full transition-all duration-300 pointer-events-none opacity-40 blur-xl ${
            wavelength === 'white'
              ? 'bg-amber-100'
              : wavelength === 'red'
              ? 'bg-rose-500'
              : wavelength === 'blue'
              ? 'bg-sky-500'
              : 'bg-emerald-500'
          }`}
          style={{ width: `${Math.max(120, 380 - lightDistance * 3)}px` }}
        />

        {/* Test Tube & Beaker Visual */}
        <div className="relative w-full max-w-sm h-72 flex items-center justify-center">
          {/* Glass Beaker with Water */}
          <div className="w-56 h-64 bg-sky-200/20 border-2 border-sky-300/40 rounded-b-3xl relative overflow-hidden flex flex-col justify-end p-4 shadow-xl backdrop-blur-xs">
            {/* Water level */}
            <div className="absolute inset-0 bg-sky-500/20 pointer-events-none" />

            {/* Inverted Funnel & Test Tube */}
            <div className="relative w-full h-full flex flex-col items-center justify-end">
              {/* Inverted Test Tube top */}
              <div className="w-9 h-36 bg-sky-100/30 border border-sky-300/50 rounded-t-xl relative overflow-hidden flex flex-col justify-start items-center">
                {/* Collected Oxygen gas pocket */}
                <div
                  className="w-full bg-slate-900/60 border-b border-sky-200 transition-all duration-300"
                  style={{ height: `${Math.min(45, bubbleRate * 0.8)}px` }}
                />
                <span className="text-[7px] text-sky-200 uppercase font-mono mt-1">O₂ Gas</span>
              </div>

              {/* Elodea Water Plant Sprigs */}
              <div className="relative w-36 h-20 flex items-center justify-center">
                <svg viewBox="0 0 100 60" className="w-32 h-20 fill-emerald-500 stroke-emerald-600">
                  <path d="M 50 60 Q 48 30 50 10" strokeWidth="3" fill="none" />
                  <ellipse cx="44" cy="20" rx="10" ry="4" transform="rotate(-30 44 20)" />
                  <ellipse cx="56" cy="24" rx="10" ry="4" transform="rotate(25 56 24)" />
                  <ellipse cx="42" cy="35" rx="12" ry="5" transform="rotate(-25 42 35)" />
                  <ellipse cx="58" cy="40" rx="12" ry="5" transform="rotate(30 58 40)" />
                </svg>

                {/* Animated Rising Bubbles */}
                <div className="absolute bottom-10 w-8 h-28 flex flex-col items-center pointer-events-none">
                  {bubbles.map((bId) => (
                    <div
                      key={bId}
                      className="w-2 h-2 rounded-full bg-white/90 shadow-sm animate-ping duration-1000 mb-2"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lamp Visual on the side */}
          <div
            className="absolute -right-2 top-10 flex flex-col items-center transition-all duration-200"
            style={{ transform: `translateX(${Math.min(40, lightDistance * 0.4)}px)` }}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center border-2 shadow-lg ${
                wavelength === 'white'
                  ? 'bg-amber-100 border-amber-300 text-amber-600'
                  : wavelength === 'red'
                  ? 'bg-rose-500 border-rose-300 text-white'
                  : wavelength === 'blue'
                  ? 'bg-sky-500 border-sky-300 text-white'
                  : 'bg-emerald-500 border-emerald-300 text-white'
              }`}
            >
              <Sun className="w-7 h-7 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-1">{lightDistance} cm</span>
          </div>
        </div>

        {/* Real-time Rate Dashboard */}
        <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Light Intensity: </span>
            <span className="font-mono text-amber-300 font-bold">{Math.round(10000 / (lightDistance * 2))} Lux</span>
          </div>
          <div>
            <span className="text-slate-400">Oxygen Bubble Rate: </span>
            <span className="font-bold text-[#2ECC71] text-sm">{bubbleRate} bubbles/min</span>
          </div>
          <div>
            <span className="text-slate-400">Spectrum: </span>
            <span className="font-bold uppercase text-white">{wavelength}</span>
          </div>
        </div>
      </div>

      {/* Experiment Controls */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-sm text-[#0A3D62] flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-500" />
            Photosynthesis Parameters
          </h3>

          {/* Distance Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Lamp Distance:</span>
              <span className="text-[#0A3D62] font-mono">{lightDistance} cm</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={lightDistance}
              onChange={(e) => setLightDistance(Number(e.target.value))}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>10 cm (High Intensity)</span>
              <span>80 cm (Low Intensity)</span>
            </div>
          </div>

          {/* Light Filter Wavelength */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Light Wavelength Filter:</label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['white', 'red', 'blue', 'green'] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => setWavelength(w)}
                  className={`py-2 rounded-xl text-xs font-bold capitalize border cursor-pointer transition-all ${
                    wavelength === w
                      ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ROCHE Pedagogical Insight */}
        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs text-slate-700 space-y-2">
          <div className="font-bold text-amber-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>ROCHE Scientific Observation</span>
          </div>
          <p className="leading-relaxed">
            <strong>Why is bubble rate lowest under GREEN light?</strong> Chlorophyll a and b pigments absorb photons predominantly in the blue (430 nm) and red (660 nm) spectral regions, while green light (550 nm) is largely reflected, yielding minimal photosynthetic excitation!
          </p>
          <div className="bg-white p-2 rounded text-[11px] font-mono text-slate-800 border border-amber-200">
            6CO₂ + 6H₂O + Photons (Light) ➔ C₆H₁₂O₆ (Glucose) + 6O₂ (Oxygen gas)
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 3. Physics: Ohm's Law & Circuit Lab
 * ------------------------------------------------------------- */
const CircuitsExperiment: React.FC = () => {
  const [voltage, setVoltage] = useState(12); // Volts
  const [resistance, setResistance] = useState(6); // Ohms
  const [switchClosed, setSwitchClosed] = useState(true);

  // V = I * R -> I = V / R
  const current = switchClosed ? +(voltage / resistance).toFixed(2) : 0;
  // P = V * I (Watts)
  const power = switchClosed ? +(voltage * current).toFixed(2) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 text-white flex flex-col items-center justify-between min-h-[460px] relative">
        {/* Interactive Schematic Diagram */}
        <div className="relative w-full max-w-md h-72 border-2 border-slate-700 rounded-xl p-4 flex flex-col justify-between my-auto bg-slate-900/50">
          {/* Top Branch: Power Source */}
          <div className="flex items-center justify-between px-6">
            <span className="text-[10px] text-slate-400 font-mono">DC BATTERY</span>
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
              <span className="w-2 h-5 bg-rose-500 rounded-xs font-mono text-[9px] flex items-center justify-center font-bold">
                +
              </span>
              <div className="w-1 h-3 bg-slate-400" />
              <div className="w-1.5 h-6 bg-slate-300" />
              <div className="w-1 h-3 bg-slate-400" />
              <span className="font-mono font-bold text-amber-300 text-sm">{voltage} V</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">POWER</span>
          </div>

          {/* Middle: Moving charge visual & Switch */}
          <div className="flex items-center justify-between px-8 relative">
            {/* Left Wire Current Flow */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  switchClosed && current > 0 ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'
                }`}
              />
              <span className="text-[8px] text-slate-500">I (Amps)</span>
            </div>

            {/* Switch Widget */}
            <button
              onClick={() => setSwitchClosed(!switchClosed)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                switchClosed
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-xs'
                  : 'bg-rose-500/30 text-rose-300 border-rose-500'
              }`}
            >
              Switch: {switchClosed ? 'CLOSED (ON)' : 'OPEN (OFF)'}
            </button>

            {/* Light Bulb */}
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  switchClosed && power > 0
                    ? 'bg-yellow-300 border-amber-300 shadow-[0_0_35px_rgba(253,224,71,0.7)] text-slate-950'
                    : 'bg-slate-800 border-slate-700 text-slate-600'
                }`}
              >
                <Zap className="w-7 h-7" />
              </div>
              <span className="text-[9px] text-slate-400 mt-1 font-mono">{power} W Power</span>
            </div>
          </div>

          {/* Bottom Branch: Resistor and Ammeter */}
          <div className="flex items-center justify-between px-6 pt-2 border-t border-slate-800">
            {/* Resistor Component */}
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-xs">Resistor R:</span>
              <span className="font-mono text-white font-bold">{resistance} Ω</span>
            </div>

            {/* Digital Ammeter */}
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400 text-xs">Current I:</span>
              <span className="font-mono text-[#2ECC71] font-bold text-sm">{current} A</span>
            </div>
          </div>
        </div>

        {/* Meters Summary */}
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-around text-xs">
          <div>
            <span className="text-slate-400">Potential Diff (V): </span>
            <span className="font-mono text-amber-300 font-bold">{voltage} Volts</span>
          </div>
          <div>
            <span className="text-slate-400">Resistance (R): </span>
            <span className="font-mono text-white font-bold">{resistance} Ohms (Ω)</span>
          </div>
          <div>
            <span className="text-slate-400">Current (I): </span>
            <span className="font-mono text-emerald-400 font-bold">{current} Amperes</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-sm text-[#0A3D62] flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            Circuit Control Parameters
          </h3>

          {/* Voltage slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>DC Voltage (V):</span>
              <span className="text-[#0A3D62] font-mono">{voltage} V</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              step="1"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
          </div>

          {/* Resistance slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Resistance (R):</span>
              <span className="text-[#0A3D62] font-mono">{resistance} Ω</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={resistance}
              onChange={(e) => setResistance(Number(e.target.value))}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
          </div>
        </div>

        {/* ROCHE Law Demonstration */}
        <div className="bg-sky-50/80 p-4 rounded-2xl border border-sky-200 text-xs text-slate-700 space-y-2">
          <div className="font-bold text-[#0A3D62] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>ROCHE Calculation &amp; Reasoning</span>
          </div>
          <p className="leading-relaxed">
            According to Ohm's Law: <strong>I = V / R</strong>. Notice how increasing the voltage pushes more charge through the circuit, while increasing the resistance chokes the current.
          </p>
          <div className="bg-white p-2.5 rounded-lg font-mono text-[11px] text-[#0A3D62] border border-sky-200">
            Current I = {voltage} V ÷ {resistance} Ω = <strong>{current} A</strong> <br />
            Power Dissipated P = {voltage} V × {current} A = <strong>{power} W</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 4. Geography/Earth Science: Rock Cycle & Magma Lab
 * ------------------------------------------------------------- */
const RockCycleExperiment: React.FC = () => {
  const [rockStage, setRockStage] = useState<'sedimentary' | 'metamorphic' | 'magma' | 'igneous'>('sedimentary');

  const stageData = {
    sedimentary: {
      name: 'Sedimentary Rock (e.g., Limestone / Sandstone)',
      tanzaniaExample: 'Kilwa & Coastal limestone beds, Karoo sandstone formations',
      temp: 'Normal surface temp (25°C)',
      pressure: 'Low (Atmospheric)',
      description: 'Formed from weathered mineral fragments and organic fossils compressed under sea beds over millions of years.',
      color: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    metamorphic: {
      name: 'Metamorphic Rock (e.g., Marble / Tanzanite host rock)',
      tanzaniaExample: 'Mererani Tanzanite hills (Arusha/Manyara), Uluguru gneiss',
      temp: 'High Heat (400°C - 700°C)',
      pressure: 'Extreme Tectonic Pressure',
      description: 'Intense heat and subterranean pressures recrystallize minerals without fully melting them, forming foliated banding.',
      color: 'bg-purple-100 text-purple-900 border-purple-300',
    },
    magma: {
      name: 'Liquid Magma Chamber',
      tanzaniaExample: 'Oldoinyo Lengai natrocarbonatite magma, Kilimanjaro magma roots',
      temp: 'Extreme Melting Point (1,200°C)',
      pressure: 'High Deep Crustal Hydrostatic',
      description: 'Rock is subjected to molten temperatures, melting completely into viscous molten silicate magma.',
      color: 'bg-red-100 text-red-900 border-red-300',
    },
    igneous: {
      name: 'Igneous Rock (e.g., Basalt / Granite / Obsidian)',
      tanzaniaExample: 'Mount Meru & Rungwe volcanic basalt, Mwanza granite kopjes',
      temp: 'Cooling from 1,200°C to 100°C',
      pressure: 'Cooling at surface or intrusive crust',
      description: 'Crystallization of cooling magma or lava. Rapid cooling produces fine-grained basalt; slow underground cooling forms coarse granite.',
      color: 'bg-slate-200 text-slate-900 border-slate-400',
    },
  };

  const currentInfo = stageData[rockStage];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 text-white flex flex-col items-center justify-between min-h-[460px] relative overflow-hidden">
        {/* Dynamic Volcano & Tectonic Cross Section */}
        <div className="relative w-full max-w-md h-72 flex items-center justify-center">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Sky */}
            <rect x="0" y="0" width="400" height="150" fill="#0f172a" />
            
            {/* Volcano Cone */}
            <polygon points="50,220 200,80 350,220" fill="#334155" />
            <polygon points="175,100 200,80 225,100" fill="#475569" />

            {/* Magma Conduit & Chamber */}
            <path
              d="M 195,85 L 195,200 Q 150,260 200,280 Q 250,260 205,200 L 205,85 Z"
              fill={rockStage === 'magma' ? '#ef4444' : '#b91c1c'}
              className={rockStage === 'magma' ? 'animate-pulse' : ''}
            />

            {/* Crater lava glow if magma or igneous */}
            {(rockStage === 'magma' || rockStage === 'igneous') && (
              <circle cx="200" cy="80" r="14" fill="#f97316" className="animate-ping duration-1000" />
            )}

            {/* Earth Crust Layers */}
            <rect x="0" y="220" width="400" height="80" fill="#1e293b" />
            <line x1="0" y1="250" x2="400" y2="250" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* State Indicators */}
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Temperature: </span>
            <span className="font-mono text-amber-400 font-bold">{currentInfo.temp}</span>
          </div>
          <div>
            <span className="text-slate-400">Pressure: </span>
            <span className="font-mono text-sky-400 font-bold">{currentInfo.pressure}</span>
          </div>
          <div>
            <span className="text-slate-400">Active Phase: </span>
            <span className="font-bold text-[#2ECC71] capitalize">{rockStage}</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="font-bold text-sm text-[#0A3D62] flex items-center gap-2">
            <Mountain className="w-4 h-4 text-amber-600" />
            Transform Rock via Geological Forces
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setRockStage('sedimentary')}
              className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                rockStage === 'sedimentary' ? 'bg-[#0A3D62] text-white' : 'bg-white text-slate-700'
              }`}
            >
              1. Sedimentary Phase
            </button>
            <button
              onClick={() => setRockStage('metamorphic')}
              className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                rockStage === 'metamorphic' ? 'bg-[#0A3D62] text-white' : 'bg-white text-slate-700'
              }`}
            >
              2. Apply Heat &amp; Pressure
            </button>
            <button
              onClick={() => setRockStage('magma')}
              className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                rockStage === 'magma' ? 'bg-rose-600 text-white' : 'bg-white text-slate-700'
              }`}
            >
              3. Complete Magma Melting
            </button>
            <button
              onClick={() => setRockStage('igneous')}
              className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                rockStage === 'igneous' ? 'bg-[#2ECC71] text-slate-900' : 'bg-white text-slate-700'
              }`}
            >
              4. Volcanic Cooling (Igneous)
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 mb-1">{currentInfo.name}</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">{currentInfo.description}</p>
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-[11px] text-emerald-900">
              <strong>Tanzania Geographic Formation:</strong> {currentInfo.tanzaniaExample}
            </div>
          </div>
        </div>

        {/* ROCHE Earth Science Tip */}
        <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 text-xs text-slate-700">
          <span className="font-bold text-amber-900 block mb-1">ROCHE Geological Exploration:</span>
          Tanzania\'s unique Great Rift Valley volcanism (e.g., Oldoinyo Lengai and Mount Rungwe) showcases active igneous rock creation and metamorphic gemstone generation like Tanzanite found nowhere else on planet Earth!
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 5. Physics: Gravity & Harmonic Pendulum Lab
 * ------------------------------------------------------------- */
const PendulumExperiment: React.FC = () => {
  const [length, setLength] = useState(1.0); // meters
  const [gravityKey, setGravityKey] = useState<'earth' | 'moon' | 'mars' | 'jupiter'>('earth');
  const [isPlaying, setIsPlaying] = useState(true);

  const gravityValues = {
    earth: { g: 9.8, name: 'Earth (9.8 m/s²)' },
    moon: { g: 1.6, name: 'Moon (1.6 m/s²)' },
    mars: { g: 3.7, name: 'Mars (3.7 m/s²)' },
    jupiter: { g: 24.8, name: 'Jupiter (24.8 m/s²)' },
  };

  const g = gravityValues[gravityKey].g;
  // T = 2 * pi * sqrt(L / g)
  const period = +(2 * Math.PI * Math.sqrt(length / g)).toFixed(2);
  const frequency = +(1 / period).toFixed(2);

  // Time ticker for sine oscillation
  const [time, setTime] = useState(0);
  useEffect(() => {
    let animId: any;
    if (isPlaying) {
      const start = performance.now();
      const tick = (now: number) => {
        setTime((now - start) / 1000);
        animId = requestAnimationFrame(tick);
      };
      animId = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Current angle theta = theta_max * cos(omega * t)
  const omega = Math.sqrt(g / length);
  const thetaMax = 35 * (Math.PI / 180); // 35 degrees max amplitude
  const currentAngle = thetaMax * Math.cos(omega * time);
  const currentAngleDeg = (currentAngle * 180) / Math.PI;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 text-white flex flex-col items-center justify-between min-h-[460px] relative">
        {/* Top pivot bar */}
        <div className="w-48 h-3 bg-slate-700 rounded-full border border-slate-600 relative flex justify-center">
          <div className="w-4 h-4 bg-amber-400 rounded-full -top-0.5 relative shadow-sm" />
        </div>

        {/* Oscillating Pendulum String & Bob */}
        <div className="relative w-64 h-64 flex justify-center items-start">
          <div
            className="origin-top flex flex-col items-center transition-transform"
            style={{
              transform: `rotate(${currentAngleDeg}deg)`,
              height: `${Math.min(220, length * 150)}px`,
            }}
          >
            {/* String line */}
            <div className="w-0.5 h-full bg-slate-300 shadow-sm" />
            {/* Pendulum Bob */}
            <div className="w-9 h-9 -mt-1 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 border-2 border-amber-200 shadow-lg" />
          </div>
        </div>

        {/* Readout stats */}
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Gravitational Accel (g): </span>
            <span className="font-mono text-amber-300 font-bold">{g} m/s²</span>
          </div>
          <div>
            <span className="text-slate-400">Oscillation Period (T): </span>
            <span className="font-mono text-[#2ECC71] font-bold text-sm">{period} seconds</span>
          </div>
          <div>
            <span className="text-slate-400">Frequency (f): </span>
            <span className="font-mono text-white font-bold">{frequency} Hz</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-sm text-[#0A3D62] flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-600" />
            Pendulum Parameters
          </h3>

          {/* Gravity celestial body selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Celestial Body (Gravity):</label>
            <div className="grid grid-cols-2 gap-2">
              {(['earth', 'moon', 'mars', 'jupiter'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setGravityKey(key)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border capitalize transition-all cursor-pointer ${
                    gravityKey === key
                      ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {gravityValues[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* String length slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>String Length (L):</span>
              <span className="text-[#0A3D62] font-mono">{length.toFixed(2)} meters</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.05"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
          </div>

          {/* Pause / Resume */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#0A3D62] text-white flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Oscillation' : 'Resume Motion'}</span>
          </button>
        </div>

        {/* Theoretical Formula Breakdown */}
        <div className="bg-cyan-50/80 p-4 rounded-2xl border border-cyan-200 text-xs text-slate-700 space-y-2">
          <div className="font-bold text-[#0A3D62] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span>ROCHE Harmonic Equation</span>
          </div>
          <p className="leading-relaxed">
            The period of a simple harmonic pendulum is independent of mass:
          </p>
          <div className="bg-white p-2.5 rounded-lg font-mono text-[11px] text-[#0A3D62] border border-cyan-200">
            T = 2π × √(L / g) <br />
            T = 2π × √({length} / {g}) = <strong>{period} s</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
