import React, { useState, useMemo } from 'react';
import {
  ALL_31_TANZANIA_REGIONS,
  TANZANIA_PHYSICAL_FEATURES,
  TANZANIA_INDUSTRIAL_HUBS,
  TANZANIA_TRANSPORT_NODES,
  ExtendedTanzaniaRegion,
  TanzaniaPhysicalFeature,
  TanzaniaIndustrialHub,
  TanzaniaTransportNode,
} from '../../data/tanzaniaGeographyData';
import {
  MapPin,
  Layers,
  Search,
  Mountain,
  Factory,
  Train,
  Ship,
  Plane,
  Building,
  Award,
  ChevronRight,
  TrendingUp,
  Compass,
  Filter,
  CheckCircle2,
  Sparkles,
  Droplets,
  Flame,
  X,
  Share2,
  ExternalLink,
  Navigation,
} from 'lucide-react';

export const TanzaniaAtlasMap: React.FC = () => {
  // Layer Toggles
  const [showRegions, setShowRegions] = useState(true);
  const [showPhysical, setShowPhysical] = useState(true);
  const [showIndustrial, setShowIndustrial] = useState(true);
  const [showTransport, setShowTransport] = useState(true);

  // Active Zone Filter
  const [selectedZone, setSelectedZone] = useState<string>('All');

  // Search input
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Entity state
  const [selectedRegion, setSelectedRegion] = useState<ExtendedTanzaniaRegion>(
    ALL_31_TANZANIA_REGIONS[0] // Dar es Salaam
  );
  const [selectedPhysical, setSelectedPhysical] = useState<TanzaniaPhysicalFeature | null>(null);
  const [selectedIndustrial, setSelectedIndustrial] = useState<TanzaniaIndustrialHub | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<TanzaniaTransportNode | null>(null);

  // Inspector mode tab
  const [inspectorTab, setInspectorTab] = useState<'region' | 'districts' | 'features' | 'industry' | 'transport'>('region');

  // Districts view modal state
  const [districtSearch, setDistrictSearch] = useState('');

  // Zones list
  const zones = ['All', 'Coastal', 'Central', 'Northern', 'Lake', 'Southern Highlands', 'Western', 'Zanzibar'];

  // Filtered regions
  const filteredRegions = useMemo(() => {
    return ALL_31_TANZANIA_REGIONS.filter((region) => {
      const matchesZone = selectedZone === 'All' || region.zone === selectedZone;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesZone;

      const matchesName = region.name.toLowerCase().includes(q);
      const matchesCapital = region.capital.toLowerCase().includes(q);
      const matchesDistrict = region.districts.some((d) => d.toLowerCase().includes(q));
      const matchesIndustry = region.industrialDevelopments.some((ind) => ind.toLowerCase().includes(q));

      return matchesZone && (matchesName || matchesCapital || matchesDistrict || matchesIndustry);
    });
  }, [selectedZone, searchQuery]);

  // Handle clicking a region
  const handleSelectRegion = (region: ExtendedTanzaniaRegion) => {
    setSelectedRegion(region);
    setSelectedPhysical(null);
    setSelectedIndustrial(null);
    setSelectedTransport(null);
    setInspectorTab('region');
  };

  // Handle clicking a physical feature
  const handleSelectPhysical = (feat: TanzaniaPhysicalFeature) => {
    setSelectedPhysical(feat);
    setSelectedIndustrial(null);
    setSelectedTransport(null);
    setInspectorTab('features');
  };

  // Handle clicking an industrial hub
  const handleSelectIndustrial = (hub: TanzaniaIndustrialHub) => {
    setSelectedIndustrial(hub);
    setSelectedPhysical(null);
    setSelectedTransport(null);
    setInspectorTab('industry');
  };

  // Handle clicking a transport node
  const handleSelectTransport = (node: TanzaniaTransportNode) => {
    setSelectedTransport(node);
    setSelectedPhysical(null);
    setSelectedIndustrial(null);
    setInspectorTab('transport');
  };

  return (
    <div className="space-y-6">
      {/* Quick Google Maps Integration Banner */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#0A3D62] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Navigation className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0A3D62]">Google Maps Datum &amp; Live Satellite:</span>
              <span className="font-mono text-[11px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-semibold">
                -6.369028, 34.888822
              </span>
            </div>
            <p className="text-slate-600 text-[11px] mt-0.5">
              Reference: <span className="font-mono text-[#0A3D62]">maps.app.goo.gl/a8tTY5EZuYK2i6TW6</span>
            </p>
          </div>
        </div>

        <a
          href="https://maps.app.goo.gl/a8tTY5EZuYK2i6TW6"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 bg-[#0A3D62] hover:bg-[#072a44] text-[#F5E8C7] font-bold px-3.5 py-2 rounded-xl transition-colors shadow-xs shrink-0"
        >
          <span>Open in Google Maps App</span>
          <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
        </a>
      </div>

      {/* Control Toolbar: Layers, Search, and Zone Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Layer toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-1">
              <Layers className="w-4 h-4 text-[#0A3D62]" />
              Active GIS Layers:
            </span>

            <button
              onClick={() => setShowRegions(!showRegions)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 border ${
                showRegions
                  ? 'bg-sky-50 text-[#0A3D62] border-sky-300 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>31 Regions &amp; Districts</span>
            </button>

            <button
              onClick={() => setShowPhysical(!showPhysical)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 border ${
                showPhysical
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-emerald-600" />
              <span>Physical Relief &amp; Lakes</span>
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
              <span>Industrial &amp; Energy Hubs</span>
            </button>

            <button
              onClick={() => setShowTransport(!showTransport)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 border ${
                showTransport
                  ? 'bg-indigo-50 text-indigo-900 border-indigo-300 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <Train className="w-3.5 h-3.5 text-indigo-600" />
              <span>Transport &amp; Corridors</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search region, district, mine, port..."
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

        {/* Zone quick pill filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1 whitespace-nowrap">
            <Filter className="w-3 h-3 text-slate-400" />
            Zone:
          </span>
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedZone === zone
                  ? 'bg-[#0A3D62] text-[#F5E8C7] shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {zone}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-bold text-slate-400 whitespace-nowrap">
            Showing {filteredRegions.length} of 31 Regions
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Inspector Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Interactive Map Panel */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 sm:p-6 text-white border border-slate-800 flex flex-col justify-between shadow-xl relative overflow-hidden">
          {/* Header readout */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71] animate-pulse" />
                <h3 className="text-sm font-bold text-slate-200">
                  Tanzania GIS &amp; Infrastructure Interactive Map
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Click any region marker, mountain, industrial site, or transport corridor to inspect details
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-[#0A3D62] border border-sky-400/30 text-[#F5E8C7] text-xs font-bold px-3 py-1 rounded-lg">
                Selected: {selectedRegion.name}
              </span>
            </div>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="relative w-full h-[460px] sm:h-[520px] flex items-center justify-center my-1 select-none">
            <svg
              viewBox="0 0 500 480"
              className="w-full h-full drop-shadow-2xl overflow-visible"
            >
              <defs>
                {/* Gradients */}
                <linearGradient id="tzLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f263e" />
                  <stop offset="50%" stopColor="#0A1E32" />
                  <stop offset="100%" stopColor="#081829" />
                </linearGradient>

                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#032541" />
                  <stop offset="100%" stopColor="#021424" />
                </linearGradient>

                {/* Filters */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Indian Ocean Backdrop (East) */}
              <rect x="360" y="0" width="140" height="480" fill="url(#oceanGradient)" opacity="0.6" />
              <text x="440" y="270" fill="#38bdf8" opacity="0.4" fontSize="10" textAnchor="middle" fontWeight="bold" letterSpacing="3">
                INDIAN OCEAN
              </text>

              {/* Tanzania Boundary Contour */}
              <path
                d="M 120 70 
                   Q 180 50 250 60 
                   Q 320 80 390 120 
                   Q 450 170 410 240 
                   Q 420 310 390 395 
                   Q 320 445 220 435 
                   Q 150 420 130 355 
                   Q 110 270 80 200 
                   Q 60 120 120 70 Z"
                fill="url(#tzLandGradient)"
                stroke="#1e3a5f"
                strokeWidth="3.5"
                className="filter drop-shadow-md"
              />

              {/* ================= PHYSICAL FEATURES LAYER ================= */}
              {showPhysical && (
                <g id="physical-layer">
                  {/* Lake Victoria (North) */}
                  <path
                    d="M 120 52 Q 175 32 230 52 Q 210 95 145 90 Z"
                    fill="#0284c7"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    opacity="0.85"
                  />
                  <text x="175" y="66" fill="#bae6fd" fontSize="8" textAnchor="middle" fontWeight="bold">
                    Lake Victoria
                  </text>

                  {/* Lake Tanganyika (West) */}
                  <path
                    d="M 60 140 Q 75 240 100 330"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="10"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <text x="52" y="240" fill="#bae6fd" fontSize="7.5" textAnchor="middle" fontWeight="bold" transform="rotate(-70 52 240)">
                    Lake Tanganyika (1,470m)
                  </text>

                  {/* Lake Nyasa (South) */}
                  <path
                    d="M 215 375 Q 255 425 285 450"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="7"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <text x="250" y="415" fill="#bae6fd" fontSize="7.5" textAnchor="middle" fontWeight="bold" transform="rotate(40 250 415)">
                    Lake Nyasa
                  </text>

                  {/* Lake Rukwa (Southwest) */}
                  <ellipse cx="140" cy="300" rx="14" ry="5" fill="#0284c7" opacity="0.6" transform="rotate(-35 140 300)" />
                  <text x="140" y="290" fill="#93c5fd" fontSize="6" textAnchor="middle">
                    L. Rukwa
                  </text>

                  {/* Lake Natron & Manyara (Northern Rift) */}
                  <ellipse cx="230" cy="120" rx="7" ry="4" fill="#a855f7" opacity="0.6" />
                  <ellipse cx="240" cy="145" rx="6" ry="3" fill="#a855f7" opacity="0.6" />

                  {/* Rufiji River Network (Southeast) */}
                  <path
                    d="M 250 310 Q 290 315 320 300 Q 360 290 410 300"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    strokeDasharray="2,1"
                    opacity="0.7"
                  />
                  <text x="330" y="295" fill="#38bdf8" fontSize="6.5" fontStyle="italic">
                    Rufiji River Basin
                  </text>

                  {/* Pangani River */}
                  <path
                    d="M 290 135 Q 330 155 365 175"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="1.8"
                    opacity="0.6"
                  />

                  {/* Kagera River */}
                  <path
                    d="M 95 85 Q 115 80 130 75"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2"
                    opacity="0.6"
                  />

                  {/* Eastern Rift Escarpment indicator */}
                  <path
                    d="M 235 110 Q 240 170 250 230"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                    opacity="0.6"
                  />
                  <text x="228" y="180" fill="#f59e0b" fontSize="6" transform="rotate(80 228 180)">
                    Eastern Gregory Rift
                  </text>

                  {/* Physical Landmark Pins */}
                  {TANZANIA_PHYSICAL_FEATURES.map((feat) => {
                    const posX = (feat.coordinates.x / 100) * 440 + 25;
                    const posY = (feat.coordinates.y / 100) * 410 + 25;
                    const isSelected = selectedPhysical?.id === feat.id;

                    return (
                      <g
                        key={feat.id}
                        onClick={() => handleSelectPhysical(feat)}
                        className="cursor-pointer group"
                      >
                        {/* Peak symbol */}
                        {feat.type === 'mountain' || feat.type === 'volcano' ? (
                          <polygon
                            points={`${posX},${posY - 10} ${posX - 6},${posY + 2} ${posX + 6},${posY + 2}`}
                            fill={isSelected ? '#f59e0b' : '#10b981'}
                            stroke="#ffffff"
                            strokeWidth="1.2"
                            className="transition-transform group-hover:scale-125"
                          />
                        ) : feat.type === 'waterfall' ? (
                          <circle
                            cx={posX}
                            cy={posY}
                            r="5"
                            fill="#06b6d4"
                            stroke="#ffffff"
                            strokeWidth="1.2"
                          />
                        ) : null}

                        {/* Feature Label */}
                        <text
                          x={posX}
                          y={posY + 12}
                          fill={isSelected ? '#fbbf24' : '#e2e8f0'}
                          fontSize="7"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="pointer-events-none drop-shadow-sm select-none"
                        >
                          ▲ {feat.name.replace('Mount ', 'Mt. ')}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* ================= TRANSPORTATION NETWORK LAYER ================= */}
              {showTransport && (
                <g id="transport-layer">
                  {/* SGR Electric Railway Line (Cyan dashed) */}
                  {/* Dar (370, 275) -> Moro (310, 265) -> Dodoma (245, 245) -> Singida (210, 210) -> Tabora (150, 220) -> Mwanza (155, 120) */}
                  <path
                    d="M 370 275 L 310 265 L 245 245 L 180 220 L 155 120"
                    fill="none"
                    stroke="#00ffff"
                    strokeWidth="3.5"
                    strokeDasharray="4,2"
                    opacity="0.9"
                    filter="url(#glow)"
                  />

                  {/* TAZARA Railway (Amber dashed line) */}
                  {/* Dar (370, 275) -> Moro (310, 265) -> Iringa/Makambako (240, 320) -> Mbeya (180, 360) -> Tunduma (165, 375) */}
                  <path
                    d="M 370 275 L 310 265 L 250 320 L 180 360 L 165 375"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeDasharray="3,3"
                    opacity="0.9"
                  />

                  {/* Central MGR Line branch to Kigoma */}
                  <path
                    d="M 180 220 L 80 210"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="3,2"
                    opacity="0.75"
                  />

                  {/* Major Highway T1 TANZAM (Solid Emerald) */}
                  <path
                    d="M 370 275 L 310 265 L 240 315 L 180 355 L 165 370"
                    fill="none"
                    stroke="#2ECC71"
                    strokeWidth="1.5"
                    opacity="0.8"
                  />

                  {/* Northern Highway T2 (Dar - Segera - Moshi - Arusha) */}
                  <path
                    d="M 370 275 L 350 200 L 300 145 L 260 135"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="1.5"
                    opacity="0.8"
                  />

                  {/* Coastal Highway T7 (Dar - Mkapa Bridge - Lindi - Mtwara) */}
                  <path
                    d="M 370 275 L 365 330 L 360 380 L 375 410"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="1.8"
                    opacity="0.8"
                  />

                  {/* EACOP Crude Oil Pipeline (Yellow dashed line from Kagera to Tanga) */}
                  <path
                    d="M 105 85 L 150 140 L 200 200 L 260 210 L 350 180"
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="2"
                    strokeDasharray="5,2"
                    opacity="0.7"
                  />

                  {/* Mtwara-Dar Gas Pipeline (36-inch subsea & onshore) */}
                  <path
                    d="M 375 410 L 360 350 L 370 280"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.2"
                    strokeDasharray="4,2"
                    opacity="0.8"
                  />

                  {/* Transport Node Icons */}
                  {TANZANIA_TRANSPORT_NODES.map((node) => {
                    const posX = (node.coordinates.x / 100) * 440 + 25;
                    const posY = (node.coordinates.y / 100) * 410 + 25;
                    const isSelected = selectedTransport?.id === node.id;

                    return (
                      <g
                        key={node.id}
                        onClick={() => handleSelectTransport(node)}
                        className="cursor-pointer group"
                      >
                        {node.type === 'deep_port' || node.type === 'lake_port' ? (
                          <g transform={`translate(${posX - 6}, ${posY - 6})`}>
                            <rect width="13" height="13" rx="3" fill={isSelected ? '#38bdf8' : '#0369a1'} stroke="#ffffff" strokeWidth="1" />
                            <text x="6.5" y="9.5" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">⚓</text>
                          </g>
                        ) : node.type === 'international_airport' ? (
                          <g transform={`translate(${posX - 6}, ${posY - 6})`}>
                            <rect width="13" height="13" rx="3" fill={isSelected ? '#a855f7' : '#6b21a8'} stroke="#ffffff" strokeWidth="1" />
                            <text x="6.5" y="9.5" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">✈</text>
                          </g>
                        ) : null}
                      </g>
                    );
                  })}
                </g>
              )}

              {/* ================= INDUSTRIAL HUBS LAYER ================= */}
              {showIndustrial && (
                <g id="industrial-layer">
                  {TANZANIA_INDUSTRIAL_HUBS.map((hub) => {
                    const posX = (hub.coordinates.x / 100) * 440 + 25;
                    const posY = (hub.coordinates.y / 100) * 410 + 25;
                    const isSelected = selectedIndustrial?.id === hub.id;

                    return (
                      <g
                        key={hub.id}
                        onClick={() => handleSelectIndustrial(hub)}
                        className="cursor-pointer group"
                      >
                        <circle
                          cx={posX}
                          cy={posY}
                          r={isSelected ? '9' : '7'}
                          fill={hub.category === 'energy' ? '#ef4444' : hub.category === 'mining_refinery' ? '#eab308' : '#f97316'}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          className="transition-transform group-hover:scale-125"
                        />
                        <text
                          x={posX}
                          y={posY + 3}
                          fill="#ffffff"
                          fontSize="7"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="pointer-events-none select-none"
                        >
                          ⚙
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* ================= 31 REGIONAL PINS LAYER ================= */}
              {showRegions && (
                <g id="regions-layer">
                  {filteredRegions.map((region) => {
                    const isSelected = selectedRegion.id === region.id;
                    const posX = (region.coordinates.x / 100) * 440 + 25;
                    const posY = (region.coordinates.y / 100) * 410 + 25;

                    return (
                      <g
                        key={region.id}
                        onClick={() => handleSelectRegion(region)}
                        className="cursor-pointer group"
                      >
                        {/* Ping radar if selected */}
                        {isSelected && (
                          <circle
                            cx={posX}
                            cy={posY}
                            r="15"
                            fill="#2ECC71"
                            opacity="0.3"
                            className="animate-ping"
                          />
                        )}

                        {/* Main Regional Pin */}
                        <circle
                          cx={posX}
                          cy={posY}
                          r={isSelected ? '8.5' : region.id === 'dodoma' ? '7' : '5.5'}
                          fill={
                            isSelected
                              ? '#2ECC71'
                              : region.id === 'dodoma'
                              ? '#F5E8C7'
                              : region.zone === 'Zanzibar'
                              ? '#38bdf8'
                              : '#60a5fa'
                          }
                          stroke="#091422"
                          strokeWidth="2"
                          className="transition-all group-hover:scale-130"
                        />

                        {/* Region Label */}
                        <text
                          x={posX}
                          y={posY - 9}
                          fill={isSelected ? '#2ECC71' : '#f1f5f9'}
                          fontSize={isSelected ? '9.5' : '7.5'}
                          fontWeight={isSelected ? '900' : '600'}
                          textAnchor="middle"
                          className="pointer-events-none drop-shadow-md select-none tracking-tight"
                        >
                          {region.name}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Zanzibar Island Inset Indicator */}
              <g transform="translate(370, 205)">
                <rect x="0" y="0" width="55" height="45" rx="4" fill="#0A1E32" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
                <text x="27" y="10" fill="#bae6fd" fontSize="6.5" textAnchor="middle" fontWeight="bold">ZANZIBAR</text>
                <text x="27" y="21" fill="#7dd3fc" fontSize="5.5" textAnchor="middle">Unguja (3 Reg)</text>
                <text x="27" y="32" fill="#7dd3fc" fontSize="5.5" textAnchor="middle">Pemba (2 Reg)</text>
              </g>
            </svg>
          </div>

          {/* Map Color Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-300 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71]" />
              <span>Active Selection</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#00ffff] rounded" />
              <span>SGR Electric Rail</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#f59e0b] rounded" />
              <span>TAZARA Freedom Rail</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#2ECC71] rounded" />
              <span>TANZAM Highway (T1)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <span>Energy (JNHPP / Gas)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
              <span>Mines &amp; Refineries</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] px-1 py-0.5 rounded bg-sky-900 border border-sky-600">⚓</span>
              <span>Deep Sea / Lake Ports</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] px-1 py-0.5 rounded bg-purple-900 border border-purple-600">✈</span>
              <span>Intl. Airports</span>
            </div>
          </div>
        </div>

        {/* Right Details Panel: Regional Inspector & Multi-Tab Hub */}
        <div className="lg:col-span-5 space-y-4">
          {/* Tabs for Selected Region: Overview, Districts, Physical, Industry, Transport */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            {/* Inspector Navigation Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedRegion.zone} Zone
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    Pop: {selectedRegion.populationApprox}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#0A3D62] mt-1 font-display tracking-tight">
                  {selectedRegion.name} Region
                </h3>
                <p className="text-xs text-slate-600">
                  Regional Capital / Makao Makuu: <strong>{selectedRegion.capital}</strong> | Area: <strong>{selectedRegion.areaKm2.toLocaleString()} km²</strong>
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#0A3D62] text-[#F5E8C7] flex items-center justify-center font-bold shadow-xs">
                <MapPin className="w-5 h-5 text-[#2ECC71]" />
              </div>
            </div>

            {/* Sub-tab selection */}
            <div className="flex items-center gap-1 border-b border-slate-100 pb-2 overflow-x-auto text-xs font-bold">
              <button
                onClick={() => setInspectorTab('region')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  inspectorTab === 'region'
                    ? 'bg-[#0A3D62] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setInspectorTab('districts')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  inspectorTab === 'districts'
                    ? 'bg-[#0A3D62] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>Districts ({selectedRegion.districts.length})</span>
              </button>
              <button
                onClick={() => setInspectorTab('industry')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  inspectorTab === 'industry'
                    ? 'bg-[#0A3D62] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Industries
              </button>
              <button
                onClick={() => setInspectorTab('transport')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  inspectorTab === 'transport'
                    ? 'bg-[#0A3D62] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Transport
              </button>
            </div>

            {/* TAB CONTENT: OVERVIEW */}
            {inspectorTab === 'region' && (
              <div className="space-y-4">
                {/* Physical Landforms */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <Mountain className="w-3.5 h-3.5 text-emerald-600" />
                    Physical Landforms &amp; Relief:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRegion.physicalLandforms.map((feat, idx) => (
                      <span
                        key={idx}
                        className="bg-emerald-50 text-emerald-900 text-[11px] px-2.5 py-1 rounded-lg font-medium border border-emerald-200"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Climate */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-sky-600" />
                    Climate &amp; Rainfall Regime:
                  </h4>
                  <p className="text-xs text-slate-600 bg-sky-50/70 p-2.5 rounded-xl border border-sky-100 leading-relaxed">
                    {selectedRegion.climate}
                  </p>
                </div>

                {/* Major Economic Activities */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    Core Economic Activities:
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {selectedRegion.majorEconomicActivities.map((act, i) => (
                      <div
                        key={i}
                        className="bg-slate-50 text-slate-800 text-[11px] p-2 rounded-lg font-medium border border-slate-200 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71]" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NECTA Exam Insight */}
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-amber-900">
                    <Award className="w-4 h-4 text-amber-600" />
                    NECTA Examination Syllabus Fact:
                  </span>
                  <p className="text-[11px] leading-relaxed text-amber-900">
                    {selectedRegion.nectaExamFact}
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: DISTRICTS DRILLDOWN */}
            {inspectorTab === 'districts' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#0A3D62]" />
                    All Administrative Districts of {selectedRegion.name} ({selectedRegion.districts.length}):
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto p-1">
                  {selectedRegion.districts.map((district, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 hover:bg-sky-50 transition-colors p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-[#0A3D62] text-[#F5E8C7] flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span>{district}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">District</span>
                    </div>
                  ))}
                </div>

                <div className="bg-sky-50/70 p-3 rounded-xl border border-sky-100 text-[11px] text-slate-600 leading-relaxed">
                  💡 <strong>Governance Structure:</strong> Each district in Tanzania is led by a District Commissioner (DC) appointed by the President and a District Executive Director (DED) managing social services, primary/secondary education, and local revenues.
                </div>
              </div>
            )}

            {/* TAB CONTENT: INDUSTRIAL DEVELOPMENTS */}
            {inspectorTab === 'industry' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Factory className="w-4 h-4 text-amber-600" />
                  Industrial Plants &amp; Special Economic Zones:
                </h4>

                <div className="space-y-2 max-h-72 overflow-y-auto p-1">
                  {selectedRegion.industrialDevelopments.map((ind, idx) => (
                    <div
                      key={idx}
                      className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200 text-xs font-medium text-amber-950 flex items-start gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>

                {/* If selected region hosts a registered major hub */}
                {TANZANIA_INDUSTRIAL_HUBS.filter((h) => h.region.includes(selectedRegion.name)).map((hub) => (
                  <div key={hub.id} className="bg-slate-900 text-white p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      National Industrial Megaproject
                    </span>
                    <h5 className="font-bold text-xs text-white">{hub.name}</h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{hub.description}</p>
                    <div className="text-[10px] text-emerald-400 font-mono pt-1">
                      Output: {hub.economicOutput}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: MEANS OF TRANSPORTATION */}
            {inspectorTab === 'transport' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Train className="w-4 h-4 text-indigo-600" />
                  Integrated Transportation Infrastructure:
                </h4>

                {/* Railways */}
                {selectedRegion.transportationLinks.railways.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                      <Train className="w-3 h-3 text-[#0A3D62]" /> Railway Lines:
                    </span>
                    {selectedRegion.transportationLinks.railways.map((r, i) => (
                      <div key={i} className="text-xs text-slate-700 bg-sky-50/60 p-2 rounded-lg border border-sky-100 font-medium">
                        {r}
                      </div>
                    ))}
                  </div>
                )}

                {/* Highways */}
                {selectedRegion.transportationLinks.highways.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-600" /> Highways &amp; Corridors:
                    </span>
                    {selectedRegion.transportationLinks.highways.map((h, i) => (
                      <div key={i} className="text-xs text-slate-700 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100 font-medium">
                        {h}
                      </div>
                    ))}
                  </div>
                )}

                {/* Ports & Waterways */}
                {selectedRegion.transportationLinks.portsWaterways.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                      <Ship className="w-3 h-3 text-blue-600" /> Maritime Ports &amp; Waterways:
                    </span>
                    {selectedRegion.transportationLinks.portsWaterways.map((p, i) => (
                      <div key={i} className="text-xs text-slate-700 bg-blue-50/60 p-2 rounded-lg border border-blue-100 font-medium">
                        {p}
                      </div>
                    ))}
                  </div>
                )}

                {/* Airports */}
                {selectedRegion.transportationLinks.airports.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                      <Plane className="w-3 h-3 text-purple-600" /> Aviation &amp; Airports:
                    </span>
                    {selectedRegion.transportationLinks.airports.map((a, i) => (
                      <div key={i} className="text-xs text-slate-700 bg-purple-50/60 p-2 rounded-lg border border-purple-100 font-medium">
                        {a}
                      </div>
                    ))}
                  </div>
                )}

                {/* Pipelines */}
                {selectedRegion.transportationLinks.pipelines.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-600" /> Pipelines &amp; Energy:
                    </span>
                    {selectedRegion.transportationLinks.pipelines.map((pl, i) => (
                      <div key={i} className="text-xs text-slate-700 bg-amber-50/60 p-2 rounded-lg border border-amber-100 font-medium">
                        {pl}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Selector Bar of all 31 Regions */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-600 block mb-2 px-1">
              Select Any of Tanzania's 31 Regions:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
              {ALL_31_TANZANIA_REGIONS.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => handleSelectRegion(reg)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    selectedRegion.id === reg.id
                      ? 'bg-[#0A3D62] text-[#F5E8C7] shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {reg.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
