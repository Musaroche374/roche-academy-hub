import React, { useState, useEffect } from 'react';
import {
  WORLD_PHYSICAL_FEATURES,
  WORLD_INDUSTRIAL_BELTS,
  WORLD_TRANSPORT_ROUTES,
  WORLD_OCEANS_DATA,
  WorldPhysicalFeature,
  WorldIndustrialBelt,
  WorldTransportRoute,
  WorldOceanRecord,
} from '../../data/worldGeographyData';
import {
  GLOBAL_LANDMARKS_CATALOG,
  GlobalLandmark,
  LandmarkCategory,
} from '../../data/worldLandmarksCatalog';
import {
  Globe,
  Mountain,
  Factory,
  Ship,
  Train,
  Plane,
  Compass,
  Layers,
  Search,
  CheckCircle2,
  TrendingUp,
  Award,
  Flame,
  Droplets,
  ExternalLink,
  Waves,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Copy,
  Check,
  Navigation,
  Target,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const WorldGeographyMap: React.FC = () => {
  // Layer toggles
  const [showPhysical, setShowPhysical] = useState(true);
  const [showOceans, setShowOceans] = useState(true);
  const [showIndustrial, setShowIndustrial] = useState(true);
  const [showTransport, setShowTransport] = useState(true);
  const [showShippingLanes, setShowShippingLanes] = useState(true);

  // Filter category
  const [activeCategory, setActiveCategory] = useState<'all' | 'physical' | 'industrial' | 'transport'>('all');

  // Selected landmark ID in catalog
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>('himalayas');

  // Quick Explore filter tab
  const [quickExploreFilter, setQuickExploreFilter] = useState<'all' | LandmarkCategory>('all');

  // Auto-Tour active status
  const [isAutoTouring, setIsAutoTouring] = useState<boolean>(false);

  // Map viewport focus mode (zooms into landmark)
  const [isFocusedOnLandmark, setIsFocusedOnLandmark] = useState<boolean>(false);

  // GPS copy feedback
  const [copiedGps, setCopiedGps] = useState<boolean>(false);

  // Selected item
  const [selectedPhysical, setSelectedPhysical] = useState<WorldPhysicalFeature | null>(
    WORLD_PHYSICAL_FEATURES[0] // Himalayas
  );
  const [selectedOcean, setSelectedOcean] = useState<WorldOceanRecord | null>(null);
  const [selectedIndustrial, setSelectedIndustrial] = useState<WorldIndustrialBelt | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<WorldTransportRoute | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize selection from catalog ID
  const selectLandmarkById = (id: string) => {
    const landmark = GLOBAL_LANDMARKS_CATALOG.find((l) => l.id === id);
    if (!landmark) return;
    setSelectedLandmarkId(landmark.id);

    if (landmark.sourceType === 'physical') {
      setShowPhysical(true);
      const feat = WORLD_PHYSICAL_FEATURES.find((f) => f.id === landmark.id);
      if (feat) setSelectedPhysical(feat);
      setSelectedOcean(null);
      setSelectedIndustrial(null);
      setSelectedTransport(null);
    } else if (landmark.sourceType === 'ocean') {
      setShowOceans(true);
      const ocean = WORLD_OCEANS_DATA.find((o) => o.id === landmark.id);
      if (ocean) setSelectedOcean(ocean);
      setSelectedPhysical(null);
      setSelectedIndustrial(null);
      setSelectedTransport(null);
    } else if (landmark.sourceType === 'industrial') {
      setShowIndustrial(true);
      const belt = WORLD_INDUSTRIAL_BELTS.find((b) => b.id === landmark.id);
      if (belt) setSelectedIndustrial(belt);
      setSelectedPhysical(null);
      setSelectedOcean(null);
      setSelectedTransport(null);
    } else if (landmark.sourceType === 'transport') {
      setShowTransport(true);
      const route = WORLD_TRANSPORT_ROUTES.find((r) => r.id === landmark.id);
      if (route) setSelectedTransport(route);
      setSelectedPhysical(null);
      setSelectedOcean(null);
      setSelectedIndustrial(null);
    }
  };

  const handleSelectPhysical = (feat: WorldPhysicalFeature) => {
    setSelectedPhysical(feat);
    setSelectedLandmarkId(feat.id);
    setSelectedOcean(null);
    setSelectedIndustrial(null);
    setSelectedTransport(null);
  };

  const handleSelectOcean = (ocean: WorldOceanRecord) => {
    setSelectedOcean(ocean);
    setSelectedLandmarkId(ocean.id);
    setSelectedPhysical(null);
    setSelectedIndustrial(null);
    setSelectedTransport(null);
  };

  const handleSelectIndustrial = (belt: WorldIndustrialBelt) => {
    setSelectedIndustrial(belt);
    setSelectedLandmarkId(belt.id);
    setSelectedPhysical(null);
    setSelectedOcean(null);
    setSelectedTransport(null);
  };

  const handleSelectTransport = (route: WorldTransportRoute) => {
    setSelectedTransport(route);
    setSelectedLandmarkId(route.id);
    setSelectedPhysical(null);
    setSelectedOcean(null);
    setSelectedIndustrial(null);
  };

  // Active landmark metadata
  const activeLandmark =
    GLOBAL_LANDMARKS_CATALOG.find((l) => l.id === selectedLandmarkId) ||
    GLOBAL_LANDMARKS_CATALOG[0];

  // Active landmark SVG canvas coordinates
  const activeCoords = {
    x: (activeLandmark.coordinates.x / 100) * 1000,
    y: (activeLandmark.coordinates.y / 100) * 500,
  };

  // Filtered landmarks for Quick Explore
  const filteredLandmarks = GLOBAL_LANDMARKS_CATALOG.filter((l) => {
    const matchesCategory =
      quickExploreFilter === 'all' ? true : l.category === quickExploreFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      l.name.toLowerCase().includes(q) ||
      l.shortName.toLowerCase().includes(q) ||
      l.region.toLowerCase().includes(q) ||
      l.keyMetric.toLowerCase().includes(q) ||
      l.typeLabel.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const currentLandmarkIndex = filteredLandmarks.findIndex((l) => l.id === activeLandmark.id);

  // Auto-Tour interval
  useEffect(() => {
    if (!isAutoTouring || filteredLandmarks.length === 0) return;
    const interval = setInterval(() => {
      const currentIdx = filteredLandmarks.findIndex((l) => l.id === selectedLandmarkId);
      const nextIdx = (currentIdx + 1) % filteredLandmarks.length;
      selectLandmarkById(filteredLandmarks[nextIdx].id);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoTouring, filteredLandmarks, selectedLandmarkId]);

  const handleNextLandmark = () => {
    if (filteredLandmarks.length === 0) return;
    const nextIdx = (currentLandmarkIndex + 1) % filteredLandmarks.length;
    selectLandmarkById(filteredLandmarks[nextIdx].id);
  };

  const handlePrevLandmark = () => {
    if (filteredLandmarks.length === 0) return;
    const prevIdx = (currentLandmarkIndex - 1 + filteredLandmarks.length) % filteredLandmarks.length;
    selectLandmarkById(filteredLandmarks[prevIdx].id);
  };

  const handleRandomLandmark = () => {
    if (GLOBAL_LANDMARKS_CATALOG.length === 0) return;
    const randIdx = Math.floor(Math.random() * GLOBAL_LANDMARKS_CATALOG.length);
    selectLandmarkById(GLOBAL_LANDMARKS_CATALOG[randIdx].id);
  };

  const handleCopyGps = () => {
    if (!activeLandmark) return;
    const text = `${activeLandmark.name}: ${activeLandmark.gps.latLabel}, ${activeLandmark.gps.lngLabel} (Decimal: ${activeLandmark.gps.lat}, ${activeLandmark.gps.lng})`;
    navigator.clipboard.writeText(text);
    setCopiedGps(true);
    setTimeout(() => setCopiedGps(false), 2200);
  };

  // ViewBox pan & zoom calculation
  const zoomW = isFocusedOnLandmark ? 440 : 1000;
  const zoomH = isFocusedOnLandmark ? 220 : 500;
  const clampedX = isFocusedOnLandmark
    ? Math.max(0, Math.min(1000 - zoomW, activeCoords.x - zoomW / 2))
    : 0;
  const clampedY = isFocusedOnLandmark
    ? Math.max(0, Math.min(500 - zoomH, activeCoords.y - zoomH / 2))
    : 0;
  const computedViewBox = `${clampedX} ${clampedY} ${zoomW} ${zoomH}`;


  return (
    <div className="space-y-6">
      {/* Control Bar: Layer Toggles and Search */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Layer toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-1">
              <Layers className="w-4 h-4 text-[#0A3D62]" />
              Global GIS Layers:
            </span>

            <button
              onClick={() => setShowPhysical(!showPhysical)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 border ${
                showPhysical
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-emerald-600" />
              <span>Physical (Mountains, Rivers, Deserts)</span>
            </button>

            <button
              onClick={() => setShowOceans(!showOceans)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 border ${
                showOceans
                  ? 'bg-cyan-50 text-cyan-900 border-cyan-300 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-cyan-600" />
              <span>Oceans &amp; Trenches (WorldAtlas)</span>
            </button>

            <button
              onClick={() => setShowIndustrial(!showIndustrial)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 border ${
                showIndustrial
                  ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <Factory className="w-3.5 h-3.5 text-amber-600" />
              <span>Industrial Belts &amp; Manufacturing</span>
            </button>

            <button
              onClick={() => setShowTransport(!showTransport)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 border ${
                showTransport
                  ? 'bg-indigo-50 text-indigo-900 border-indigo-300 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <Ship className="w-3.5 h-3.5 text-indigo-600" />
              <span>Canals, Straits &amp; Rail Bridges</span>
            </button>

            <button
              onClick={() => setShowShippingLanes(!showShippingLanes)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 border ${
                showShippingLanes
                  ? 'bg-sky-50 text-[#0A3D62] border-sky-300 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-sky-600" />
              <span>Maritime Arteries</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Suez, Andes, Silicon Valley..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: World SVG Map Canvas + Inspection Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* World Interactive Map */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl p-4 sm:p-6 text-white border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Header readout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 mb-2 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-pulse" />
                <h3 className="text-sm font-bold text-slate-200">
                  Global Physical Geography, Industrial Belts &amp; Trade Corridors
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Mercator-Equirectangular projection showing key geographic landforms, industrial workshops, and maritime transit arteries
              </p>
            </div>
            
            {/* Live Active Landmark Quick Tag */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl self-start sm:self-auto">
              <Target className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                  Spotlight Target:
                </span>
                <span className="text-xs font-bold text-amber-300 font-mono">
                  {activeLandmark.shortName}
                </span>
              </div>
            </div>
          </div>

          {/* Map Top HUD Controls: Full World / Focus Landmark, Prev/Next, Auto-Tour */}
          <div className="bg-slate-900/90 backdrop-blur-xs border border-slate-800 rounded-xl p-2 mb-2 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsFocusedOnLandmark(false)}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  !isFocusedOnLandmark
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="View entire world map (100%)"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>World View</span>
              </button>

              <button
                onClick={() => setIsFocusedOnLandmark(true)}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  isFocusedOnLandmark
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Zoom into active landmark (2.3x magnification)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Focus Landmark (2.3x)</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevLandmark}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                title="Previous landmark"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <button
                onClick={() => setIsAutoTouring(!isAutoTouring)}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isAutoTouring
                    ? 'bg-emerald-500 text-slate-950 shadow-xs animate-pulse ring-2 ring-emerald-300'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
                title={isAutoTouring ? 'Pause Auto-Tour' : 'Start automated tour across world landmarks'}
              >
                {isAutoTouring ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-slate-950" />
                    <span>Touring ({currentLandmarkIndex + 1}/{filteredLandmarks.length})</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Auto-Tour</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNextLandmark}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                title="Next landmark"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleRandomLandmark}
                className="px-2 py-1 rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-700/50 text-indigo-200 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                title="Explore a random global landmark"
              >
                <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden md:inline">Random</span>
              </button>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center my-2 select-none overflow-hidden rounded-xl">
            <svg
              viewBox={computedViewBox}
              className="w-full h-full drop-shadow-2xl overflow-visible transition-all duration-500 ease-out"
            >
              <defs>
                <linearGradient id="worldLand" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>

                <linearGradient id="worldWater" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#081426" />
                  <stop offset="100%" stopColor="#030a14" />
                </linearGradient>
              </defs>

              {/* Ocean Canvas Backdrop */}
              <rect x="0" y="0" width="1000" height="500" fill="url(#worldWater)" rx="12" />

              {/* Latitude Grid Lines: Equator, Tropics, Arctic */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4,4" opacity="0.4" />
              <text x="25" y="246" fill="#38bdf8" fontSize="8" opacity="0.6">Equator 0°</text>

              <line x1="0" y1="185" x2="1000" y2="185" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.25" />
              <text x="25" y="181" fill="#94a3b8" fontSize="7" opacity="0.5">Tropic of Cancer (23.5° N)</text>

              <line x1="0" y1="315" x2="1000" y2="315" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.25" />
              <text x="25" y="311" fill="#94a3b8" fontSize="7" opacity="0.5">Tropic of Capricorn (23.5° S)</text>

              {/* Prime Meridian */}
              <line x1="500" y1="0" x2="500" y2="500" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.2" />

              {/* ================= CONTINENTAL LANDMASS PATHS ================= */}
              {/* North America */}
              <path
                d="M 100 80 
                   Q 180 50 260 80 
                   Q 290 120 280 180 
                   Q 230 200 200 240 
                   Q 160 220 120 180 
                   Q 80 130 100 80 Z"
                fill="url(#worldLand)"
                stroke="#334155"
                strokeWidth="1.5"
              />
              <text x="180" y="140" fill="#64748b" fontSize="12" fontWeight="bold" opacity="0.5" textAnchor="middle">
                NORTH AMERICA
              </text>

              {/* South America */}
              <path
                d="M 270 260 
                   Q 350 270 360 330 
                   Q 330 400 280 470 
                   Q 250 420 260 330 
                   Q 250 280 270 260 Z"
                fill="url(#worldLand)"
                stroke="#334155"
                strokeWidth="1.5"
              />
              <text x="310" y="360" fill="#64748b" fontSize="11" fontWeight="bold" opacity="0.5" textAnchor="middle">
                SOUTH AMERICA
              </text>

              {/* Europe */}
              <path
                d="M 460 110 
                   Q 540 90 570 140 
                   Q 540 180 480 190 
                   Q 450 170 460 110 Z"
                fill="url(#worldLand)"
                stroke="#334155"
                strokeWidth="1.5"
              />
              <text x="510" y="145" fill="#64748b" fontSize="10" fontWeight="bold" opacity="0.5" textAnchor="middle">
                EUROPE
              </text>

              {/* Africa */}
              <path
                d="M 460 200 
                   Q 570 190 600 260 
                   Q 560 360 520 440 
                   Q 460 380 450 270 
                   Q 430 220 460 200 Z"
                fill="url(#worldLand)"
                stroke="#334155"
                strokeWidth="1.5"
              />
              {/* Highlight Tanzania in Africa */}
              <circle cx="575" cy="305" r="7" fill="#2ECC71" opacity="0.8" />
              <text x="585" y="308" fill="#2ECC71" fontSize="8" fontWeight="bold">
                Tanzania
              </text>
              <text x="515" y="295" fill="#64748b" fontSize="12" fontWeight="bold" opacity="0.5" textAnchor="middle">
                AFRICA
              </text>

              {/* Asia & Siberia */}
              <path
                d="M 580 90 
                   Q 780 60 920 100 
                   Q 950 180 880 240 
                   Q 820 280 750 280 
                   Q 710 240 680 210 
                   Q 620 180 580 90 Z"
                fill="url(#worldLand)"
                stroke="#334155"
                strokeWidth="1.5"
              />
              <text x="750" y="150" fill="#64748b" fontSize="14" fontWeight="bold" opacity="0.5" textAnchor="middle">
                ASIA
              </text>

              {/* Australia */}
              <path
                d="M 800 340 
                   Q 890 330 900 390 
                   Q 860 440 810 420 
                   Q 780 380 800 340 Z"
                fill="url(#worldLand)"
                stroke="#334155"
                strokeWidth="1.5"
              />
              <text x="850" y="380" fill="#64748b" fontSize="10" fontWeight="bold" opacity="0.5" textAnchor="middle">
                AUSTRALIA
              </text>

              {/* ================= MARITIME SHIPPING LANES ================= */}
              {showShippingLanes && (
                <g id="shipping-lanes" opacity="0.6">
                  {/* East Asia -> Malacca (770, 265) -> Indian Ocean -> Bab el-Mandeb (590, 235) -> Suez (560, 205) -> Mediterranean -> Gibraltar (450, 195) -> Atlantic -> Rotterdam (500, 155) / New York (270, 180) */}
                  <path
                    d="M 830 220 
                       L 770 265 
                       L 650 255 
                       L 590 235 
                       L 560 205 
                       L 450 195 
                       L 380 185 
                       L 270 180"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="1.8"
                    strokeDasharray="4,2"
                  />

                  {/* Trans-Pacific Route to Panama Canal (260, 255) */}
                  <path
                    d="M 880 200 
                       L 980 210 
                       M 20 210 
                       L 260 255"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                  />

                  {/* Cape of Good Hope South Africa Alternative Route */}
                  <path
                    d="M 770 265 
                       L 680 340 
                       L 530 445 
                       L 430 380 
                       L 380 220 
                       L 480 160"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="1.2"
                    strokeDasharray="3,3"
                    opacity="0.5"
                  />
                  <text x="530" y="460" fill="#38bdf8" fontSize="6.5" textAnchor="middle">
                    Cape Route (Alternative to Suez)
                  </text>
                </g>
              )}

              {/* ================= TRANSCONTINENTAL RAILWAYS ================= */}
              {showTransport && (
                <g id="world-rail-lines">
                  {/* Trans-Siberian Railway (Moscow 540, 130 to Vladivostok 880, 160) */}
                  <path
                    d="M 540 130 Q 700 135 880 160"
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="2.5"
                    strokeDasharray="4,2"
                  />
                  <text x="700" y="125" fill="#fda4af" fontSize="7" fontWeight="bold" textAnchor="middle">
                    Trans-Siberian Railway (9,289 km)
                  </text>

                  {/* New Eurasian Land Bridge (Yiwu/Chongqing 780, 190 to Duisburg 495, 140) */}
                  <path
                    d="M 780 190 L 680 170 L 590 150 L 495 140"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.2"
                    strokeDasharray="3,2"
                  />

                  {/* North American Transcontinental (LA 150, 190 to Chicago 220, 170) */}
                  <path
                    d="M 150 190 L 220 170 L 260 175"
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="2"
                    strokeDasharray="3,2"
                  />
                </g>
              )}

              {/* ================= PACIFIC RING OF FIRE ================= */}
              {showPhysical && (
                <g id="ring-of-fire" opacity="0.6">
                  {/* West Arc: New Zealand -> Indonesia -> Japan -> Kamchatka */}
                  <path
                    d="M 910 440 L 880 340 L 860 250 L 870 160 L 890 110"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeDasharray="3,3"
                  />
                  {/* East Arc: Aleutians -> Cascades -> Andes */}
                  <path
                    d="M 110 100 L 150 160 L 240 250 L 280 430"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeDasharray="3,3"
                  />
                  <text x="890" y="210" fill="#f87171" fontSize="7.5" fontWeight="bold">
                    Pacific Ring of Fire (90% Earthquakes)
                  </text>
                </g>
              )}

              {/* ================= WORLD OCEAN BASINS (WORLDATLAS COMPENDIUM) ================= */}
              {showOceans && (
                <g id="world-ocean-basins">
                  {WORLD_OCEANS_DATA.map((ocean) => {
                    const posX = (ocean.coordinates.x / 100) * 1000;
                    const posY = (ocean.coordinates.y / 100) * 500;
                    const isSelected = selectedOcean?.id === ocean.id;

                    return (
                      <g
                        key={ocean.id}
                        onClick={() => handleSelectOcean(ocean)}
                        className="cursor-pointer group"
                      >
                        {isSelected && (
                          <circle
                            cx={posX}
                            cy={posY}
                            r="28"
                            fill="#0284c7"
                            opacity="0.3"
                            className="animate-ping"
                          />
                        )}

                        <rect
                          x={posX - 48}
                          y={posY - 12}
                          width="96"
                          height="24"
                          rx="6"
                          fill={isSelected ? '#0369a1' : '#082f49'}
                          stroke={isSelected ? '#38bdf8' : '#0284c7'}
                          strokeWidth="1.2"
                          className="transition-transform group-hover:scale-110 drop-shadow-md"
                          opacity="0.9"
                        />

                        <text
                          x={posX}
                          y={posY + 1.5}
                          fill="#f0f9ff"
                          fontSize="8"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="pointer-events-none select-none tracking-wider"
                        >
                          🌊 {ocean.name.toUpperCase()}
                        </text>
                        <text
                          x={posX}
                          y={posY + 8.5}
                          fill="#7dd3fc"
                          fontSize="6"
                          textAnchor="middle"
                          className="pointer-events-none select-none"
                        >
                          {ocean.areaKm2.toLocaleString()} km²
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* ================= PHYSICAL FEATURES MARKERS ================= */}
              {showPhysical && (
                <g id="world-physical-markers">
                  {WORLD_PHYSICAL_FEATURES.map((feat) => {
                    const posX = (feat.coordinates.x / 100) * 1000;
                    const posY = (feat.coordinates.y / 100) * 500;
                    const isSelected = selectedPhysical?.id === feat.id;

                    return (
                      <g
                        key={feat.id}
                        onClick={() => handleSelectPhysical(feat)}
                        className="cursor-pointer group"
                      >
                        {isSelected && (
                          <circle cx={posX} cy={posY} r="14" fill="#10b981" opacity="0.3" className="animate-ping" />
                        )}

                        {feat.category === 'mountain_range' ? (
                          <polygon
                            points={`${posX},${posY - 9} ${posX - 6},${posY + 4} ${posX + 6},${posY + 4}`}
                            fill={isSelected ? '#f59e0b' : '#10b981'}
                            stroke="#ffffff"
                            strokeWidth="1.2"
                            className="transition-transform group-hover:scale-130"
                          />
                        ) : feat.category === 'river_basin' ? (
                          <circle
                            cx={posX}
                            cy={posY}
                            r="6"
                            fill={isSelected ? '#38bdf8' : '#0284c7'}
                            stroke="#ffffff"
                            strokeWidth="1.2"
                          />
                        ) : feat.category === 'desert' ? (
                          <circle
                            cx={posX}
                            cy={posY}
                            r="7"
                            fill={isSelected ? '#f59e0b' : '#d97706'}
                            stroke="#ffffff"
                            strokeWidth="1"
                          />
                        ) : feat.category === 'ocean_trench' ? (
                          <g className="transition-transform group-hover:scale-130">
                            <polygon
                              points={`${posX - 7},${posY - 5} ${posX + 7},${posY - 5} ${posX},${posY + 7}`}
                              fill={isSelected ? '#38bdf8' : '#0369a1'}
                              stroke="#67e8f9"
                              strokeWidth="1.2"
                            />
                            <circle cx={posX} cy={posY - 1} r="1.5" fill="#ffffff" />
                          </g>
                        ) : (
                          <circle
                            cx={posX}
                            cy={posY}
                            r="6"
                            fill="#ef4444"
                            stroke="#ffffff"
                            strokeWidth="1"
                          />
                        )}

                        <text
                          x={posX}
                          y={posY + 14}
                          fill={isSelected ? '#fbbf24' : '#f1f5f9'}
                          fontSize="7"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="pointer-events-none drop-shadow-sm select-none"
                        >
                          {feat.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* ================= INDUSTRIAL BELTS MARKERS ================= */}
              {showIndustrial && (
                <g id="world-industrial-markers">
                  {WORLD_INDUSTRIAL_BELTS.map((belt) => {
                    const posX = (belt.coordinates.x / 100) * 1000;
                    const posY = (belt.coordinates.y / 100) * 500;
                    const isSelected = selectedIndustrial?.id === belt.id;

                    return (
                      <g
                        key={belt.id}
                        onClick={() => handleSelectIndustrial(belt)}
                        className="cursor-pointer group"
                      >
                        {isSelected && (
                          <circle cx={posX} cy={posY} r="16" fill="#f59e0b" opacity="0.3" className="animate-ping" />
                        )}

                        <rect
                          x={posX - 7}
                          y={posY - 7}
                          width="14"
                          height="14"
                          rx="3"
                          fill={isSelected ? '#f59e0b' : '#b45309'}
                          stroke="#ffffff"
                          strokeWidth="1.2"
                          className="transition-transform group-hover:scale-130"
                        />
                        <text
                          x={posX}
                          y={posY + 3.5}
                          fill="#ffffff"
                          fontSize="8"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="pointer-events-none select-none"
                        >
                          ⚙
                        </text>
                        <text
                          x={posX}
                          y={posY - 9}
                          fill={isSelected ? '#fde047' : '#fef08a'}
                          fontSize="7"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="pointer-events-none drop-shadow-sm select-none"
                        >
                          {belt.name.split(' ')[0]} Hub
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* ================= TRANSPORT ROUTES & CHOKEPOINTS ================= */}
              {showTransport && (
                <g id="world-transport-nodes">
                  {WORLD_TRANSPORT_ROUTES.map((route) => {
                    const posX = (route.coordinates.x / 100) * 1000;
                    const posY = (route.coordinates.y / 100) * 500;
                    const isSelected = selectedTransport?.id === route.id;

                    return (
                      <g
                        key={route.id}
                        onClick={() => handleSelectTransport(route)}
                        className="cursor-pointer group"
                      >
                        {route.type === 'maritime_canal' || route.type === 'strategic_strait' ? (
                          <g transform={`translate(${posX - 6}, ${posY - 6})`}>
                            <circle cx="6" cy="6" r="8" fill={isSelected ? '#38bdf8' : '#0369a1'} stroke="#ffffff" strokeWidth="1.5" />
                            <text x="6" y="9.5" fill="#ffffff" fontSize="8" textAnchor="middle">⚓</text>
                          </g>
                        ) : route.type === 'air_superhub' ? (
                          <g transform={`translate(${posX - 6}, ${posY - 6})`}>
                            <rect width="13" height="13" rx="3" fill={isSelected ? '#c084fc' : '#7e22ce'} stroke="#ffffff" strokeWidth="1" />
                            <text x="6.5" y="9.5" fill="#ffffff" fontSize="8" textAnchor="middle">✈</text>
                          </g>
                        ) : (
                          <g transform={`translate(${posX - 6}, ${posY - 6})`}>
                            <rect width="13" height="13" rx="3" fill={isSelected ? '#f43f5e' : '#be123c'} stroke="#ffffff" strokeWidth="1" />
                            <text x="6.5" y="9.5" fill="#ffffff" fontSize="8" textAnchor="middle">🚆</text>
                          </g>
                        )}
                        <text
                          x={posX}
                          y={posY + 16}
                          fill={isSelected ? '#38bdf8' : '#cbd5e1'}
                          fontSize="7"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="pointer-events-none drop-shadow-sm select-none"
                        >
                          {route.name.replace('The ', '')}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* ================= ACTIVE LANDMARK FOCAL RETICLE & SPOTLIGHT ================= */}
              <g id="active-landmark-focal-reticle" className="pointer-events-none">
                {/* Concentric Pulsing Waves */}
                <circle
                  cx={activeCoords.x}
                  cy={activeCoords.y}
                  r="30"
                  fill="none"
                  stroke={
                    activeLandmark.category === 'physical'
                      ? '#10b981'
                      : activeLandmark.category === 'ocean'
                      ? '#06b6d4'
                      : activeLandmark.category === 'industrial'
                      ? '#f59e0b'
                      : '#38bdf8'
                  }
                  strokeWidth="1.8"
                  opacity="0.75"
                  className="animate-ping"
                />
                <circle
                  cx={activeCoords.x}
                  cy={activeCoords.y}
                  r="18"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeDasharray="4,3"
                  className="animate-spin"
                />

                {/* Target Crosshairs */}
                <line
                  x1={activeCoords.x - 30}
                  y1={activeCoords.y}
                  x2={activeCoords.x - 10}
                  y2={activeCoords.y}
                  stroke="#fef08a"
                  strokeWidth="1.5"
                  opacity="0.9"
                />
                <line
                  x1={activeCoords.x + 10}
                  y1={activeCoords.y}
                  x2={activeCoords.x + 30}
                  y2={activeCoords.y}
                  stroke="#fef08a"
                  strokeWidth="1.5"
                  opacity="0.9"
                />
                <line
                  x1={activeCoords.x}
                  y1={activeCoords.y - 30}
                  x2={activeCoords.x}
                  y2={activeCoords.y - 10}
                  stroke="#fef08a"
                  strokeWidth="1.5"
                  opacity="0.9"
                />
                <line
                  x1={activeCoords.x}
                  y1={activeCoords.y + 10}
                  x2={activeCoords.x}
                  y2={activeCoords.y + 30}
                  stroke="#fef08a"
                  strokeWidth="1.5"
                  opacity="0.9"
                />

                {/* Center Core Dot */}
                <circle
                  cx={activeCoords.x}
                  cy={activeCoords.y}
                  r="4"
                  fill="#ffffff"
                  stroke="#0A3D62"
                  strokeWidth="1.5"
                />

                {/* Dynamic Floating HUD Badge */}
                <g
                  transform={`translate(${activeCoords.x}, ${
                    activeCoords.y < 80 ? activeCoords.y + 30 : activeCoords.y - 26
                  })`}
                >
                  <rect
                    x="-90"
                    y="-12"
                    width="180"
                    height="24"
                    rx="6"
                    fill="#0f172a"
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                    opacity="0.95"
                  />
                  <text
                    x="0"
                    y="-0.5"
                    fill="#fef08a"
                    fontSize="7.5"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    🎯 {activeLandmark.shortName}
                  </text>
                  <text
                    x="0"
                    y="7.5"
                    fill="#7dd3fc"
                    fontSize="5.5"
                    textAnchor="middle"
                  >
                    {activeLandmark.gps.latLabel}, {activeLandmark.gps.lngLabel} • {activeLandmark.typeLabel}
                  </text>
                </g>
              </g>
            </svg>
          </div>

          {/* Map Color Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] text-slate-300 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
              <span>Mountains &amp; Basins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
              <span>Oceans &amp; Trenches</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
              <span>Industrial Belts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] px-1 py-0.5 rounded bg-sky-900 border border-sky-600">⚓</span>
              <span>Canals &amp; Straits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#e11d48] rounded" />
              <span>Transcontinental Rail</span>
            </div>
          </div>
        </div>

        {/* Global Details Inspector Panel */}
        <div className="lg:col-span-4 space-y-4">
          {/* INSPECTOR CARD */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            {/* If an ocean is selected */}
            {selectedOcean && (
              <div className="space-y-3">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-sky-800 bg-sky-100 border border-sky-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      World Ocean Basin (Rank #{selectedOcean.rankBySize} Size)
                    </span>
                    <h3 className="text-xl font-black text-[#0A3D62] mt-1 font-display tracking-tight">
                      {selectedOcean.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {selectedOcean.percentageOfWorldOcean}% of global ocean surface
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                    <Waves className="w-5 h-5 text-sky-700" />
                  </div>
                </div>

                <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 space-y-1">
                  <span className="text-[10px] font-bold text-sky-900 uppercase block">
                    Deepest Point (Hadal Chasm):
                  </span>
                  <div className="text-xs font-black text-[#0A3D62] font-mono">
                    {selectedOcean.deepestPointName}: {selectedOcean.deepestPointDepthM.toLocaleString()} m ({selectedOcean.deepestPointDepthFt.toLocaleString()} ft)
                  </div>
                  <p className="text-[10px] text-slate-600">
                    Location: {selectedOcean.deepestPointLocation}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      Surface Area
                    </span>
                    <span className="font-bold text-slate-800">
                      {selectedOcean.areaKm2.toLocaleString()} km²
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      Average Depth
                    </span>
                    <span className="font-bold text-emerald-800">
                      {selectedOcean.averageDepthM.toLocaleString()} m
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 mb-1">
                    Prominent Physical &amp; Submarine Features:
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedOcean.keyPhysicalFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-sky-600 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs">
                  <span className="font-bold text-emerald-900 block mb-0.5">
                    Planetary &amp; Climatic Role:
                  </span>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {selectedOcean.economicAndClimaticRole}
                  </p>
                </div>
              </div>
            )}

            {/* If a physical feature is selected */}
            {selectedPhysical && (
              <div className="space-y-3">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Physical Feature ({selectedPhysical.category.replace('_', ' ')})
                    </span>
                    <h3 className="text-xl font-black text-[#0A3D62] mt-1 font-display tracking-tight">
                      {selectedPhysical.name}
                    </h3>
                    <p className="text-xs text-slate-500">{selectedPhysical.locationContinent}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Mountain className="w-5 h-5 text-emerald-700" />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    Key Measurement &amp; Dimension:
                  </span>
                  <div className="text-xs font-black text-[#0A3D62] font-mono">
                    {selectedPhysical.keyMetric}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 mb-1">Geological Description:</h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedPhysical.description}
                  </p>
                </div>

                <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 space-y-1 text-xs">
                  <span className="font-bold text-[#0A3D62] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#0A3D62]" />
                    Geographical &amp; Economic Significance:
                  </span>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {selectedPhysical.geographicalSignificance}
                  </p>
                </div>
              </div>
            )}

            {/* If an industrial belt is selected */}
            {selectedIndustrial && (
              <div className="space-y-3">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Global Industrial Workshop
                    </span>
                    <h3 className="text-xl font-black text-[#0A3D62] mt-1 font-display tracking-tight">
                      {selectedIndustrial.name}
                    </h3>
                    <p className="text-xs text-slate-500">{selectedIndustrial.regionCountry}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Factory className="w-5 h-5 text-amber-700" />
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <span className="text-[10px] font-bold text-amber-800 uppercase block mb-1">
                    Global Output Share:
                  </span>
                  <div className="text-xs font-bold text-amber-950 font-mono">
                    {selectedIndustrial.globalOutputShare}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 mb-1">Core Industrial Hubs:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedIndustrial.coreHubs.map((hub, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-800 text-[11px] px-2.5 py-1 rounded-lg font-medium border border-slate-200"
                      >
                        {hub}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 mb-1">Economic Profile:</h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedIndustrial.description}
                  </p>
                </div>
              </div>
            )}

            {/* If a transport route/chokepoint is selected */}
            {selectedTransport && (
              <div className="space-y-3">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-sky-800 bg-sky-100 border border-sky-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Strategic Trade Corridor / Chokepoint
                    </span>
                    <h3 className="text-xl font-black text-[#0A3D62] mt-1 font-display tracking-tight">
                      {selectedTransport.name}
                    </h3>
                    <p className="text-xs text-slate-500">{selectedTransport.corridor}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                    <Ship className="w-5 h-5 text-sky-700" />
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                    Annual Traffic &amp; Volume:
                  </span>
                  <div className="text-xs font-mono text-emerald-400">
                    {selectedTransport.annualTrafficVolume}
                  </div>
                </div>

                <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 space-y-1 text-xs">
                  <span className="font-bold text-[#0A3D62] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-[#0A3D62]" />
                    Global Strategic Significance:
                  </span>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {selectedTransport.significance}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedTransport.description}
                </p>
              </div>
            )}

            {/* GPS Spatial Datum & Google Maps Direct Connection */}
            <div className="bg-sky-50/80 p-3.5 rounded-2xl border border-sky-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0A3D62] flex items-center gap-1.5 text-xs">
                  <Navigation className="w-4 h-4 text-emerald-600" />
                  <span>GPS Datum &amp; Coordinates:</span>
                </span>
                <span className="text-[10px] font-mono bg-sky-100 text-sky-900 px-2 py-0.5 rounded-full font-bold">
                  WGS 84
                </span>
              </div>

              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-sky-100">
                <div>
                  <div className="font-mono text-xs font-black text-[#0A3D62]">
                    {activeLandmark.gps.latLabel}, {activeLandmark.gps.lngLabel}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Dec: {activeLandmark.gps.lat.toFixed(4)}, {activeLandmark.gps.lng.toFixed(4)}
                  </div>
                </div>

                <button
                  onClick={handleCopyGps}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                  title="Copy coordinates"
                >
                  {copiedGps ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={activeLandmark.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#0A3D62] hover:bg-[#082e4a] text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs text-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Open in Google Maps Satellite</span>
                  <ExternalLink className="w-3 h-3 text-emerald-300" />
                </a>

                <button
                  onClick={() => setIsFocusedOnLandmark(!isFocusedOnLandmark)}
                  className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer transition-colors text-xs border ${
                    isFocusedOnLandmark
                      ? 'bg-amber-100 text-amber-950 border-amber-300'
                      : 'bg-white hover:bg-slate-100 text-[#0A3D62] border-slate-200'
                  }`}
                  title={isFocusedOnLandmark ? 'Reset to 100% full world view' : 'Zoom into landmark'}
                >
                  <Target className="w-3.5 h-3.5 text-[#0A3D62]" />
                  <span>{isFocusedOnLandmark ? 'Reset' : 'Focus'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= RICH QUICK EXPLORE GLOBAL LANDMARKS CONSOLE ================= */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <h4 className="text-sm font-black text-[#0A3D62] tracking-tight">
                    Quick Explore Global Landmarks
                  </h4>
                  <span className="text-[10px] font-bold bg-[#0A3D62]/10 text-[#0A3D62] px-2 py-0.5 rounded-full">
                    {filteredLandmarks.length} of {GLOBAL_LANDMARKS_CATALOG.length}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Click any landmark to auto-teleport, center GIS spotlight, and inspect geology &amp; transit facts.
                </p>
              </div>

              {/* Step counter & Play/Pause */}
              <div className="flex items-center gap-1 self-start sm:self-auto">
                <button
                  onClick={() => setIsAutoTouring(!isAutoTouring)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    isAutoTouring
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {isAutoTouring ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Auto-Tour</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePrevLandmark}
                  className="p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer"
                  title="Previous landmark"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNextLandmark}
                  className="p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer"
                  title="Next landmark"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleRandomLandmark}
                  className="p-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 cursor-pointer"
                  title="Random landmark"
                >
                  <Shuffle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <button
                onClick={() => setQuickExploreFilter('all')}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold cursor-pointer transition-all border ${
                  quickExploreFilter === 'all'
                    ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                All Landmarks ({GLOBAL_LANDMARKS_CATALOG.length})
              </button>

              <button
                onClick={() => setQuickExploreFilter('physical')}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold cursor-pointer transition-all border flex items-center gap-1 ${
                  quickExploreFilter === 'physical'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <Mountain className="w-3 h-3 text-emerald-500" />
                <span>Natural Wonders (16)</span>
              </button>

              <button
                onClick={() => setQuickExploreFilter('ocean')}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold cursor-pointer transition-all border flex items-center gap-1 ${
                  quickExploreFilter === 'ocean'
                    ? 'bg-cyan-700 text-white border-cyan-700 shadow-xs'
                    : 'bg-cyan-50 text-cyan-800 border-cyan-200 hover:bg-cyan-100'
                }`}
              >
                <Waves className="w-3 h-3 text-cyan-500" />
                <span>Oceans &amp; Deeps (5)</span>
              </button>

              <button
                onClick={() => setQuickExploreFilter('industrial')}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold cursor-pointer transition-all border flex items-center gap-1 ${
                  quickExploreFilter === 'industrial'
                    ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                    : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Factory className="w-3 h-3 text-amber-500" />
                <span>Industrial Hubs (5)</span>
              </button>

              <button
                onClick={() => setQuickExploreFilter('transport')}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold cursor-pointer transition-all border flex items-center gap-1 ${
                  quickExploreFilter === 'transport'
                    ? 'bg-sky-700 text-white border-sky-700 shadow-xs'
                    : 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
                }`}
              >
                <Ship className="w-3 h-3 text-sky-500" />
                <span>Canals &amp; Straits (8)</span>
              </button>
            </div>

            {/* Landmarks Grid with Full Names & Region Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1 p-1">
              {filteredLandmarks.map((landmark) => {
                const isSelected = activeLandmark.id === landmark.id;
                return (
                  <button
                    key={landmark.id}
                    onClick={() => selectLandmarkById(landmark.id)}
                    className={`p-2.5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-md ring-2 ring-emerald-400'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1.5 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs">
                          {landmark.category === 'physical'
                            ? '▲'
                            : landmark.category === 'ocean'
                            ? '🌊'
                            : landmark.category === 'industrial'
                            ? '⚙'
                            : '⚓'}
                        </span>
                        <span className="text-xs font-black line-clamp-1">
                          {landmark.shortName}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1 animate-ping" />
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] gap-1 mt-1">
                      <span
                        className={`truncate ${
                          isSelected ? 'text-sky-200' : 'text-slate-500'
                        }`}
                      >
                        {landmark.region.split('(')[0]}
                      </span>
                      <span
                        className={`font-mono font-bold shrink-0 px-1.5 py-0.5 rounded text-[9px] ${
                          isSelected
                            ? 'bg-white/20 text-[#F5E8C7]'
                            : 'bg-slate-200/70 text-slate-700'
                        }`}
                      >
                        {landmark.gps.latLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Status & Info strip */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>
                Active: <strong className="text-[#0A3D62]">{activeLandmark.name}</strong>
              </span>
              <button
                onClick={() => setIsFocusedOnLandmark(!isFocusedOnLandmark)}
                className="text-sky-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <Target className="w-3 h-3" />
                <span>{isFocusedOnLandmark ? 'Unfocus' : 'Zoom In'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
