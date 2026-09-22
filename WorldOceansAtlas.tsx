import React, { useState } from 'react';
import {
  WORLD_OCEANS_DATA,
  OCEAN_FLOOR_RELIEF_FEATURES,
  OCEAN_DEPTH_COMPARISONS,
  WorldOceanRecord,
  OceanFloorReliefFeature,
} from '../../data/worldGeographyData';
import {
  Waves,
  Globe,
  Compass,
  Layers,
  ArrowUpDown,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Info,
  Thermometer,
  Anchor,
  Wind,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

export const WorldOceansAtlas: React.FC = () => {
  const [selectedOceanId, setSelectedOceanId] = useState<string>('pacific-ocean');
  const [sortBy, setSortBy] = useState<'size' | 'depth' | 'volume'>('size');
  const [selectedReliefId, setSelectedReliefId] = useState<string>('oceanic-trench');
  const [activeTab, setActiveTab] = useState<'profile' | 'bathymetry' | 'trenches' | 'zones' | 'quiz'>('profile');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const selectedOcean: WorldOceanRecord =
    WORLD_OCEANS_DATA.find((o) => o.id === selectedOceanId) || WORLD_OCEANS_DATA[0];

  const selectedRelief: OceanFloorReliefFeature =
    OCEAN_FLOOR_RELIEF_FEATURES.find((r) => r.id === selectedReliefId) ||
    OCEAN_FLOOR_RELIEF_FEATURES[0];

  // Sorting
  const sortedOceans = [...WORLD_OCEANS_DATA].sort((a, b) => {
    if (sortBy === 'size') return b.areaKm2 - a.areaKm2;
    if (sortBy === 'depth') return b.averageDepthM - a.averageDepthM;
    if (sortBy === 'volume') return b.volumeKm3 - a.volumeKm3;
    return 0;
  });

  const quizQuestions = [
    {
      q: 'Which ocean covers 46.6% of the world\'s ocean surface and contains the deepest point on Earth?',
      options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Southern Ocean'],
      answer: 1,
      explanation: 'The Pacific Ocean is the largest and deepest ocean (168,723,000 km²), containing the Challenger Deep in the Mariana Trench (10,994 m).'
    },
    {
      q: 'What is the deepest point in the Atlantic Ocean according to WorldAtlas oceanographic records?',
      options: ['Milwaukee Deep in the Puerto Rico Trench', 'Molloy Deep', 'Java Trench', 'Factorian Deep'],
      answer: 0,
      explanation: 'Milwaukee Deep, located in the Puerto Rico Trench, reaches an extreme depth of 8,380 meters (27,493 feet).'
    },
    {
      q: 'What is the world\'s largest uninterrupted ocean current, flowing completely around Antarctica without land barriers?',
      options: ['Gulf Stream', 'Kuroshio Current', 'Antarctic Circumpolar Current (ACC)', 'Somali Current'],
      answer: 2,
      explanation: 'The Antarctic Circumpolar Current (ACC) in the Southern Ocean carries over 130–140 million cubic meters of water per second eastward around the globe.'
    },
    {
      q: 'If Mount Everest (8,848 m) were placed inside Challenger Deep (10,994 m), what would happen to its peak?',
      options: [
        'It would poke 1,000 meters above sea level',
        'It would be submerged under more than 2,100 meters of ocean water',
        'Its summit would touch the surface exactly',
        'It would sit halfway up the ocean surface'
      ],
      answer: 1,
      explanation: 'Challenger Deep is 10,994 m deep. Placing Mount Everest (8,848 m) at its base would leave 2,146 meters (over 1.3 miles) of water above its peak!'
    }
  ];

  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner: WorldAtlas Citation & Planetary Metric Bar */}
      <div className="bg-gradient-to-br from-[#041E42] via-[#0A3D62] to-[#0D2B45] text-white rounded-3xl p-6 sm:p-8 border border-sky-900 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-sky-400/20 border border-sky-400/40 text-sky-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Waves className="w-3.5 h-3.5 text-sky-300" />
            <span>WorldAtlas Hydrographic Reference Standard</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-display">
            The Oceans of the World by Size, Depth &amp; Physical Features
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Earth is a blue planet: approximately <strong>71% of Earth&apos;s surface</strong> is covered by a single, vast interconnected global ocean divided into <strong>five major ocean basins</strong> (Pacific, Atlantic, Indian, Southern, and Arctic). Explore their physical dimensions, abyssal bathymetry, deepest trenches, and planetary climate engines.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://www.worldatlas.com/aatlas/infopage/oceans.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F5E8C7] hover:bg-[#eadab1] text-[#0A3D62] px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>View Source on WorldAtlas.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <span className="text-[11px] text-sky-200/80 bg-white/10 px-3 py-2 rounded-xl border border-white/10">
              Verified IHO &amp; GEBCO Bathymetric Standards
            </span>
          </div>
        </div>

        {/* Global Key Ocean Metrics Strip */}
        <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-sky-300 block tracking-wider">
              Total Ocean Coverage
            </span>
            <div className="text-xl sm:text-2xl font-black mt-0.5 text-white">70.8%</div>
            <span className="text-[11px] text-slate-300">~361,900,000 km²</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-emerald-300 block tracking-wider">
              Deepest Hadal Chasm
            </span>
            <div className="text-xl sm:text-2xl font-black mt-0.5 text-emerald-300">10,994 m</div>
            <span className="text-[11px] text-slate-300">Challenger Deep (Pacific)</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-amber-300 block tracking-wider">
              Average Ocean Depth
            </span>
            <div className="text-xl sm:text-2xl font-black mt-0.5 text-amber-300">3,688 m</div>
            <span className="text-[11px] text-slate-300">~12,100 feet depth</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-purple-300 block tracking-wider">
              Total Ocean Volume
            </span>
            <div className="text-xl sm:text-2xl font-black mt-0.5 text-purple-200">1.332 Billion</div>
            <span className="text-[11px] text-slate-300">Cubic Kilometers ($km^3$)</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-[#0A3D62] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Globe className="w-4 h-4 text-sky-400" />
          <span>5 Ocean Basins (Ranked &amp; Detailed)</span>
        </button>

        <button
          onClick={() => setActiveTab('bathymetry')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'bathymetry'
              ? 'bg-[#0A3D62] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Ocean Floor Physical Relief (Bathymetry)</span>
        </button>

        <button
          onClick={() => setActiveTab('trenches')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'trenches'
              ? 'bg-[#0A3D62] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingDown className="w-4 h-4 text-amber-400" />
          <span>Deepest Trenches vs. Mount Everest</span>
        </button>

        <button
          onClick={() => setActiveTab('zones')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'zones'
              ? 'bg-[#0A3D62] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Thermometer className="w-4 h-4 text-rose-400" />
          <span>Ocean Depth &amp; Sunlight Zones</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'quiz'
              ? 'bg-[#0A3D62] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-purple-400" />
          <span>Ocean Knowledge Check</span>
        </button>
      </div>

      {/* TAB 1: 5 OCEAN BASINS (RANKED MATRIX & DETAILED INSPECTOR) */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Comparative Ranked Table & Visual Area/Depth Bars */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#0A3D62] flex items-center gap-2 font-display">
                  <span>The 5 World Oceans Ranked by Physical Metrics</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Select an ocean row or card below to inspect its marginal seas, physical relief, current gyres, and plate boundaries.
                </p>
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <span className="px-2 text-slate-500 flex items-center gap-1 text-[11px]">
                  <ArrowUpDown className="w-3 h-3" /> Sort:
                </span>
                <button
                  onClick={() => setSortBy('size')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    sortBy === 'size'
                      ? 'bg-white text-[#0A3D62] shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Surface Area
                </button>
                <button
                  onClick={() => setSortBy('depth')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    sortBy === 'depth'
                      ? 'bg-white text-[#0A3D62] shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Average Depth
                </button>
                <button
                  onClick={() => setSortBy('volume')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    sortBy === 'volume'
                      ? 'bg-white text-[#0A3D62] shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Water Volume
                </button>
              </div>
            </div>

            {/* Ocean Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {sortedOceans.map((ocean) => {
                const isSelected = selectedOceanId === ocean.id;
                return (
                  <div
                    key={ocean.id}
                    onClick={() => setSelectedOceanId(ocean.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-sky-50/70 border-[#0A3D62] shadow-sm ring-2 ring-[#0A3D62]/20'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md">
                          Rank #{ocean.rankBySize} Size
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">
                          #{ocean.rankByDepth} Depth
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#0A3D62] leading-tight">
                        {ocean.name}
                      </h3>

                      <div className="mt-3 space-y-1.5 text-xs">
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold block">
                            Area
                          </span>
                          <span className="font-bold text-slate-800">
                            {ocean.areaKm2.toLocaleString()} km²
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            ({ocean.percentageOfWorldOcean}% of global ocean)
                          </span>
                        </div>

                        {/* Relative Area Bar */}
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#0A3D62] h-full rounded-full"
                            style={{ width: `${ocean.percentageOfWorldOcean}%` }}
                          />
                        </div>

                        <div className="pt-1">
                          <span className="text-slate-400 text-[10px] uppercase font-bold block">
                            Average Depth
                          </span>
                          <span className="font-bold text-emerald-800">
                            {ocean.averageDepthM.toLocaleString()} m
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            ({ocean.averageDepthFt.toLocaleString()} ft)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-sky-700 font-semibold flex items-center justify-between">
                      <span>Inspect Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Ocean Deep-Dive Inspector */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#0A3D62] to-[#09416a] text-white p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#2ECC71]/30 border border-[#2ECC71]/50 text-[#F5E8C7] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                    Ocean Basin Dossier
                  </span>
                  <span className="text-xs text-sky-200">
                    WorldAtlas Physical Features Archive
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mt-1 font-display">
                  {selectedOcean.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl">
                  {selectedOcean.geologicalProfile}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15 text-left md:text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">
                  Deepest Point Recorded
                </span>
                <span className="text-lg sm:text-xl font-black text-white block">
                  {selectedOcean.deepestPointName}
                </span>
                <span className="text-sm font-bold text-emerald-300 block">
                  {selectedOcean.deepestPointDepthM.toLocaleString()} meters ({selectedOcean.deepestPointDepthFt.toLocaleString()} ft)
                </span>
                <span className="text-[10px] text-slate-300 block mt-0.5">
                  {selectedOcean.deepestPointLocation}
                </span>
              </div>
            </div>

            {/* Metrics Breakdown Cards */}
            <div className="p-6 sm:p-7 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                    Total Surface Area
                  </span>
                  <div className="text-lg font-black text-[#0A3D62] mt-1">
                    {selectedOcean.areaKm2.toLocaleString()} km²
                  </div>
                  <span className="text-xs text-slate-600 block">
                    {selectedOcean.areaSqMiles.toLocaleString()} sq miles
                  </span>
                  <span className="text-[11px] text-sky-700 font-semibold mt-1 inline-block">
                    {selectedOcean.percentageOfEarthSurface}% of all Earth surface
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                    Average Basin Depth
                  </span>
                  <div className="text-lg font-black text-emerald-800 mt-1">
                    {selectedOcean.averageDepthM.toLocaleString()} meters
                  </div>
                  <span className="text-xs text-slate-600 block">
                    {selectedOcean.averageDepthFt.toLocaleString()} feet
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-block">
                    Ranked #{selectedOcean.rankByDepth} deepest ocean
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                    Total Water Volume
                  </span>
                  <div className="text-lg font-black text-purple-900 mt-1">
                    {selectedOcean.volumeKm3.toLocaleString()} km³
                  </div>
                  <span className="text-xs text-slate-600 block">
                    Cubic kilometers
                  </span>
                  <span className="text-[11px] text-purple-700 font-semibold mt-1 inline-block">
                    Massive global hydrosphere reserve
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                    Oceanic Share
                  </span>
                  <div className="text-lg font-black text-amber-900 mt-1">
                    {selectedOcean.percentageOfWorldOcean}%
                  </div>
                  <span className="text-xs text-slate-600 block">
                    Of Earth&apos;s marine waters
                  </span>
                  <span className="text-[11px] text-amber-700 font-semibold mt-1 inline-block">
                    Rank #{selectedOcean.rankBySize} largest ocean
                  </span>
                </div>
              </div>

              {/* Physical Features, Marginal Seas & Climate Role */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Physical Features */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0A3D62]">
                    <Anchor className="w-4 h-4 text-emerald-600" />
                    <h4>Key Physical &amp; Submarine Features</h4>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {selectedOcean.keyPhysicalFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Major Ocean Currents */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0A3D62]">
                    <Wind className="w-4 h-4 text-sky-600" />
                    <h4>Major Ocean Currents &amp; Gyres</h4>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {selectedOcean.majorCurrents.map((curr, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-600 shrink-0 mt-1.5" />
                        <span>{curr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Marginal Seas, Gulfs & Bays */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0A3D62]">
                    <Compass className="w-4 h-4 text-amber-600" />
                    <h4>Major Marginal Seas &amp; Gulfs</h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedOcean.marginalSeas.map((sea, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-slate-200 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-lg"
                      >
                        {sea}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Economic & Climatic Role Highlight */}
              <div className="bg-sky-50 border border-sky-200 p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3D62] mb-1.5">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  Planetary Ecological, Climatic &amp; Economic Significance
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedOcean.economicAndClimaticRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OCEAN FLOOR PHYSICAL RELIEF (BATHYMETRY) */}
      {activeTab === 'bathymetry' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A3D62] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Physical Oceanography &amp; Bathymetry
              </span>
              <h2 className="text-2xl font-black text-[#0A3D62] mt-2 mb-2 font-display">
                Physical Relief Features of the Ocean Floor
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Beneath the ocean surface lies a dramatic physical landscape exceeding the scale of continental landforms: towering 65,000 km volcanic mid-ocean ridges, immense sediment-smoothed abyssal plains, submarine canyons, and chasmic subduction trenches dropping over 10 kilometers into Earth&apos;s mantle.
              </p>
            </div>

            {/* Bathymetric Cross-Section Graphic Model */}
            <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 text-white space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-sky-400">
                  Continental Margin to Deep Ocean Basin Cross-Section (Hypsographic Profile)
                </span>
                <span className="text-[11px] text-slate-400">Sea Level = 0 m</span>
              </div>

              {/* Bathymetry SVG Diagram */}
              <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden">
                <svg viewBox="0 0 1000 300" className="w-full h-full select-none">
                  <defs>
                    <linearGradient id="seaWater" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0369a1" stopOpacity="0.4" />
                      <stop offset="60%" stopColor="#082f49" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
                    </linearGradient>

                    <linearGradient id="oceanCrust" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>

                  {/* Water Body */}
                  <rect x="0" y="40" width="1000" height="260" fill="url(#seaWater)" />

                  {/* Sea Level Line */}
                  <line x1="0" y1="40" x2="1000" y2="40" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6,4" />
                  <text x="15" y="32" fill="#38bdf8" fontSize="11" fontWeight="bold">Sea Level (0 m)</text>

                  {/* Bathymetry Terrain Profile:
                      Coast (0, 40) -> Continental Shelf (0-160, 40 to 65) -> Continental Slope (160 to 280, 65 to 190)
                      -> Continental Rise (280 to 380, 190 to 220) -> Abyssal Plain (380 to 520, 225)
                      -> Mid-Ocean Ridge (520 to 660, peaks at 130, rift at 160)
                      -> Abyssal Plain (660 to 760, 225)
                      -> Deep Ocean Trench (760 to 860, drops to 285) -> Island Arc (860 to 950, rises to 50) */}
                  <path
                    d="M 0 40 
                       L 30 40 
                       L 150 65 
                       L 270 190 
                       L 370 220 
                       L 510 225 
                       L 570 135 
                       L 590 165 
                       L 610 135 
                       L 670 225 
                       L 750 225 
                       L 810 288 
                       L 840 288 
                       L 880 140 
                       L 920 50 
                       L 950 50 
                       L 980 120 
                       L 1000 120 
                       L 1000 300 
                       L 0 300 Z"
                    fill="url(#oceanCrust)"
                    stroke="#64748b"
                    strokeWidth="2"
                  />

                  {/* Seamount / Guyot in abyssal plain */}
                  <polygon points="450,225 470,160 485,160 500,225" fill="#475569" stroke="#64748b" strokeWidth="1.5" />
                  <text x="477" y="152" fill="#cbd5e1" fontSize="9" textAnchor="middle">Guyot (Flat-top)</text>

                  {/* Feature Labels on Diagram */}
                  {/* Continental Shelf */}
                  <line x1="80" y1="52" x2="80" y2="20" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="80" y="16" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Continental Shelf (0–200m)
                  </text>

                  {/* Continental Slope */}
                  <line x1="220" y1="125" x2="220" y2="85" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="220" y="80" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Continental Slope
                  </text>

                  {/* Continental Rise */}
                  <line x1="320" y1="205" x2="320" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="320" y="155" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Continental Rise
                  </text>

                  {/* Abyssal Plain */}
                  <text x="430" y="245" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Abyssal Plain (3,000–6,000m)
                  </text>

                  {/* Mid-Ocean Ridge */}
                  <line x1="590" y1="140" x2="590" y2="95" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="590" y="90" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Mid-Ocean Ridge (Rift Valley)
                  </text>
                  <text x="590" y="103" fill="#cbd5e1" fontSize="8" textAnchor="middle">
                    Seafloor Spreading
                  </text>

                  {/* Ocean Trench */}
                  <line x1="825" y1="288" x2="825" y2="220" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="825" y="215" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Oceanic Trench (&gt;6,000m)
                  </text>
                  <text x="825" y="228" fill="#cbd5e1" fontSize="8" textAnchor="middle">
                    Subduction Zone (Challenger Deep)
                  </text>

                  {/* Volcanic Island Arc */}
                  <text x="935" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Island Arc
                  </text>
                </svg>
              </div>

              <div className="text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                <span>Diagram demonstrates passive continental margin (left) transition into abyssal plain, spreading ridge, and active subduction trench (right).</span>
                <span className="text-emerald-400 font-semibold">Scale: Vertical exaggeration applied for pedagogical clarity</span>
              </div>
            </div>

            {/* Interactive Feature Selectors */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-700">
                Inspect Specific Ocean Floor Physical Landforms:
              </h3>

              <div className="flex flex-wrap gap-2">
                {OCEAN_FLOOR_RELIEF_FEATURES.map((feat) => {
                  const isSelected = selectedReliefId === feat.id;
                  return (
                    <button
                      key={feat.id}
                      onClick={() => setSelectedReliefId(feat.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                    >
                      {feat.name}
                    </button>
                  );
                })}
              </div>

              {/* Detailed Feature Card */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {selectedRelief.percentageOceanFloor}
                    </span>
                    <h4 className="text-lg font-bold text-[#0A3D62] mt-1">
                      {selectedRelief.name}
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-500 block">Depth Range</span>
                    <span className="text-sm font-bold text-slate-800">
                      {selectedRelief.depthRangeM}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <span className="font-bold text-slate-800 block">
                      Geological Description:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {selectedRelief.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-slate-800 block">
                      Tectonic Formation Process:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {selectedRelief.formationProcess}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Prominent Real-World Examples:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedRelief.examples.map((ex, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-3 py-1 rounded-lg"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DEEPEST TRENCHES VS MOUNT EVEREST */}
      {activeTab === 'trenches' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A3D62] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                Hadal Trenches &amp; Vertical Scale
              </span>
              <h2 className="text-2xl font-black text-[#0A3D62] mt-2 mb-2 font-display">
                The Deepest Points in Each Ocean vs. Mount Everest
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The Five Deeps Expedition systematically mapped the deepest point of each of the world&apos;s five oceans. Compare their monumental depths with terrestrial landmarks like Mount Everest (8,848 m) and the Burj Khalifa (828 m).
              </p>
            </div>

            {/* Depth Bars Scale Visualizer */}
            <div className="space-y-3">
              {OCEAN_DEPTH_COMPARISONS.map((item, idx) => {
                const maxDepth = 11000;
                const widthPercent = (item.depthM / maxDepth) * 100;
                const isChallenger = item.label.includes('Challenger Deep');
                const isEverest = item.label.includes('Everest');

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isChallenger
                        ? 'bg-sky-50/80 border-sky-300 ring-2 ring-sky-400/20'
                        : isEverest
                        ? 'bg-amber-50/80 border-amber-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isChallenger
                              ? 'bg-sky-600'
                              : isEverest
                              ? 'bg-amber-600'
                              : item.category === 'deepest_trench'
                              ? 'bg-emerald-600'
                              : 'bg-slate-400'
                          }`}
                        />
                        <span className="font-bold text-xs sm:text-sm text-slate-800">
                          {item.label}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-xs sm:text-sm text-slate-900">
                        {item.depthM.toLocaleString()} meters ({Math.round(item.depthM * 3.28084).toLocaleString()} ft)
                      </span>
                    </div>

                    {/* Progress Bar Depth */}
                    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isChallenger
                            ? 'bg-gradient-to-r from-sky-600 to-indigo-700'
                            : isEverest
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                            : item.category === 'deepest_trench'
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-700'
                            : 'bg-slate-400'
                        }`}
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                      {item.notes}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mind-Blowing Scale Callout */}
            <div className="bg-gradient-to-r from-[#0A3D62] to-[#041E42] text-white p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
              <div className="text-4xl sm:text-5xl font-black text-amber-300 font-mono">
                +2,146 m
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-white">
                  The Mount Everest Submersion Theorem
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  If Mount Everest—the highest peak on Earth at 8,848 meters above sea level—were dropped into the bottom of Challenger Deep in the Mariana Trench (10,994 meters), its highest summit would still be completely submerged under <strong>2,146 meters (7,040 feet / 1.3 miles)</strong> of solid ocean water!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: OCEAN PELAGIC STRATIFICATION ZONES */}
      {activeTab === 'zones' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A3D62] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                Pelagic Bio-Zones
              </span>
              <h2 className="text-2xl font-black text-[#0A3D62] mt-2 mb-2 font-display">
                Vertical Ocean Stratification: From Sunlit Surface to Hadal Trenches
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                As sunlight attenuates rapidly with depth, temperature plunges and hydrostatic pressure skyrockets (increasing by 1 atmosphere every 10 meters). The global ocean is divided into five distinct pelagic layers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* Epipelagic */}
              <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl space-y-2">
                <div className="w-8 h-8 rounded-xl bg-sky-200 text-sky-900 font-bold flex items-center justify-center text-xs">
                  01
                </div>
                <h4 className="font-bold text-sm text-[#0A3D62]">Epipelagic Zone</h4>
                <span className="text-[10px] font-bold uppercase text-sky-700 block">
                  Sunlit Zone (0–200 m)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Only layer receiving sufficient sunlight for photosynthesis. Contains 90% of all marine life, phytoplankton blooms, coral reefs, tuna, sharks, and sea turtles.
                </p>
                <div className="text-[10px] text-sky-800 bg-sky-100 p-2 rounded-lg font-semibold">
                  Temp: 12°C to 30°C | Pressure: 1–20 atm
                </div>
              </div>

              {/* Mesopelagic */}
              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-200 text-indigo-900 font-bold flex items-center justify-center text-xs">
                  02
                </div>
                <h4 className="font-bold text-sm text-indigo-950">Mesopelagic Zone</h4>
                <span className="text-[10px] font-bold uppercase text-indigo-700 block">
                  Twilight Zone (200–1,000 m)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dim twilight; insufficient light for photosynthesis. Inhabited by bioluminescent organisms (lanternfish, giant squid, bristlemouths) executing daily vertical migration.
                </p>
                <div className="text-[10px] text-indigo-800 bg-indigo-100 p-2 rounded-lg font-semibold">
                  Temp: 4°C to 12°C | Pressure: 20–100 atm
                </div>
              </div>

              {/* Bathypelagic */}
              <div className="bg-slate-100 border border-slate-300 p-4 rounded-2xl space-y-2">
                <div className="w-8 h-8 rounded-xl bg-slate-300 text-slate-900 font-bold flex items-center justify-center text-xs">
                  03
                </div>
                <h4 className="font-bold text-sm text-slate-900">Bathypelagic Zone</h4>
                <span className="text-[10px] font-bold uppercase text-slate-600 block">
                  Midnight Zone (1,000–4,000 m)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Total inky darkness except for creature bioluminescence. Extreme pressure; inhabited by anglerfish, gulper eels, and vampire squids adapted to scarce food.
                </p>
                <div className="text-[10px] text-slate-800 bg-slate-200 p-2 rounded-lg font-semibold">
                  Temp: ~4°C | Pressure: 100–400 atm
                </div>
              </div>

              {/* Abyssopelagic */}
              <div className="bg-slate-800 text-white border border-slate-700 p-4 rounded-2xl space-y-2">
                <div className="w-8 h-8 rounded-xl bg-slate-700 text-slate-200 font-bold flex items-center justify-center text-xs">
                  04
                </div>
                <h4 className="font-bold text-sm text-white">Abyssopelagic Zone</h4>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  The Abyss (4,000–6,000 m)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Covers over 54% of Earth&apos;s surface over the abyssal plains. Near-freezing water, high oxygen, slow currents; populated by glass sponges, tripod fish, and sea cucumbers.
                </p>
                <div className="text-[10px] text-slate-200 bg-slate-700/60 p-2 rounded-lg font-semibold">
                  Temp: 0°C to 2°C | Pressure: 400–600 atm
                </div>
              </div>

              {/* Hadalpelagic */}
              <div className="bg-slate-950 text-white border border-purple-900 p-4 rounded-2xl space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-900 text-purple-200 font-bold flex items-center justify-center text-xs">
                  05
                </div>
                <h4 className="font-bold text-sm text-purple-300">Hadalpelagic Zone</h4>
                <span className="text-[10px] font-bold uppercase text-purple-400 block">
                  The Trenches (6,000–10,994 m)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Found exclusively in deep oceanic trenches. Crushing hydrostatic pressure exceeding 1,000 bar; populated by piezophilic extremophiles, snailfish, and giant amphipods.
                </p>
                <div className="text-[10px] text-purple-200 bg-purple-950 p-2 rounded-lg font-semibold border border-purple-900">
                  Temp: 1°C to 4°C | Pressure: &gt;1,000 atm
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: QUICK OCEAN KNOWLEDGE CHECK */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A3D62] bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                Interactive Knowledge Check
              </span>
              <h2 className="text-2xl font-black text-[#0A3D62] mt-2 mb-2 font-display">
                WorldAtlas Oceanography Assessment
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Test your mastery of global ocean rankings, average depths, deepest trenches, and physical features.
              </p>
            </div>

            <div className="space-y-5">
              {quizQuestions.map((q, qIdx) => {
                const isAnswered = quizAnswers[qIdx] !== undefined;
                const isCorrect = quizAnswers[qIdx] === q.answer;

                return (
                  <div
                    key={qIdx}
                    className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#0A3D62] text-white text-xs font-bold flex items-center justify-center">
                        {qIdx + 1}
                      </span>
                      <h3 className="font-bold text-sm text-[#0A3D62]">{q.q}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = quizAnswers[qIdx] === optIdx;
                        let btnStyle = 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200';

                        if (quizSubmitted) {
                          if (optIdx === q.answer) {
                            btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                          } else if (isChosen) {
                            btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                          }
                        } else if (isChosen) {
                          btnStyle = 'bg-sky-100 border-[#0A3D62] text-[#0A3D62] font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuiz(qIdx, optIdx)}
                            className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div
                        className={`text-xs p-3 rounded-xl border ${
                          isCorrect
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                            : 'bg-rose-50 text-rose-900 border-rose-200'
                        }`}
                      >
                        <span className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect.'} </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit Button & Result Score */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  className={`px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    Object.keys(quizAnswers).length === quizQuestions.length
                      ? 'bg-[#0A3D62] hover:bg-[#072d49] text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Submit &amp; Check Oceanography Answers
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="text-sm font-bold text-[#0A3D62]">
                    Score: {calculateScore()} / {quizQuestions.length} ({Math.round((calculateScore() / quizQuestions.length) * 100)}%)
                  </div>
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Reset &amp; Retake Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
