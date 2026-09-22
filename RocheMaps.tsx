import React, { useState } from 'react';
import { TanzaniaAtlasMap } from './maps/TanzaniaAtlasMap';
import { TanzaniaGoogleLiveMap } from './maps/TanzaniaGoogleLiveMap';
import { WorldGeographyMap } from './maps/WorldGeographyMap';
import { WorldOceansAtlas } from './maps/WorldOceansAtlas';
import { MapReadingTool } from './maps/MapReadingTool';
import {
  Globe,
  MapPin,
  Compass,
  Layers,
  Sparkles,
  Award,
  Factory,
  Train,
  Mountain,
  CheckCircle2,
  Waves,
  Navigation,
} from 'lucide-react';

export const RocheMaps: React.FC = () => {
  const [mapScope, setMapScope] = useState<'tanzania' | 'livemap' | 'oceans' | 'world' | 'africa' | 'mapreading'>('tanzania');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A3D62] via-[#09416a] to-[#0A3D62] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[#0A3D62] shadow-md">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#2ECC71]/20 border border-[#2ECC71]/40 text-[#F5E8C7] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-[#2ECC71]" />
            Roche Academy GIS &amp; Cartography Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 font-display">
            Interactive Tanzania, World Geography &amp; Infrastructure
          </h1>
          <p className="text-slate-200 text-sm leading-relaxed">
            Explore high-precision geographical cartography: inspect all 31 administrative regions and districts of Tanzania, prominent physical landforms, multi-billion dollar industrial megaprojects, and strategic transportation networks (SGR, TAZARA, pipelines, ports, and global maritime chokepoints).
          </p>
        </div>

        {/* Tab Switchers */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/15">
          <button
            onClick={() => setMapScope('tanzania')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              mapScope === 'tanzania'
                ? 'bg-[#F5E8C7] text-[#0A3D62] border-[#F5E8C7] shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Tanzania Atlas (31 Regions, Industry &amp; Transit)</span>
          </button>

          <button
            onClick={() => setMapScope('livemap')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              mapScope === 'livemap'
                ? 'bg-[#F5E8C7] text-[#0A3D62] border-[#F5E8C7] shadow-sm ring-1 ring-white/30'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
            }`}
          >
            <Navigation className="w-4 h-4 text-emerald-300" />
            <span>Google Maps Live: Tanzania (GPS &amp; Satellite)</span>
          </button>

          <button
            onClick={() => setMapScope('oceans')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              mapScope === 'oceans'
                ? 'bg-[#F5E8C7] text-[#0A3D62] border-[#F5E8C7] shadow-sm ring-1 ring-white/30'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
            }`}
          >
            <Waves className="w-4 h-4 text-cyan-300" />
            <span>World Oceans (Size, Depth &amp; Physical Features - WorldAtlas)</span>
          </button>

          <button
            onClick={() => setMapScope('world')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              mapScope === 'world'
                ? 'bg-[#F5E8C7] text-[#0A3D62] border-[#F5E8C7] shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
            }`}
          >
            <Globe className="w-4 h-4 text-sky-400" />
            <span>World Map (Physical, Industry &amp; Trade Routes)</span>
          </button>

          <button
            onClick={() => setMapScope('africa')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              mapScope === 'africa'
                ? 'bg-[#F5E8C7] text-[#0A3D62] border-[#F5E8C7] shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
            }`}
          >
            <Mountain className="w-4 h-4 text-amber-300" />
            <span>East African Rift &amp; Tectonics</span>
          </button>

          <button
            onClick={() => setMapScope('mapreading')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              mapScope === 'mapreading'
                ? 'bg-[#F5E8C7] text-[#0A3D62] border-[#F5E8C7] shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
            }`}
          >
            <Compass className="w-4 h-4 text-rose-300" />
            <span>Map Reading &amp; Grid Reference Tool</span>
          </button>
        </div>
      </div>

      {/* Dynamic Tab Content */}
      {mapScope === 'tanzania' && <TanzaniaAtlasMap />}

      {mapScope === 'livemap' && <TanzaniaGoogleLiveMap />}

      {mapScope === 'oceans' && <WorldOceansAtlas />}

      {mapScope === 'world' && <WorldGeographyMap />}

      {mapScope === 'africa' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-xs">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3D62] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
              Geology &amp; Tectonic Geomorphology
            </span>
            <h2 className="text-2xl font-black text-[#0A3D62] mt-2 mb-2 font-display">
              The East African Rift System (EARS) &amp; Continental Rifting
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The East African Rift is one of the geologic wonders of the world, a developing divergent tectonic plate boundary where the African Plate is actively splitting into two new tectonic plates: the <strong>Nubian Plate</strong> to the west and the <strong>Somalian Plate</strong> to the east at a rate of 6–7 mm/year.
            </p>
          </div>

          {/* 3 Main Tectonic Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs">
                01
              </span>
              <h3 className="font-bold text-sm text-[#0A3D62]">Western (Albertine) Graben</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contains the world\'s deepest rift graben lakes: Lake Tanganyika (1,470m depth), Lake Albert, Lake Edward, and Lake Kivu. Steep fault scarps plunge directly into ultra-deep freshwater basins.
              </p>
              <div className="text-[11px] font-semibold text-sky-800 bg-sky-50/80 p-2.5 rounded-xl border border-sky-200">
                Major graben formation bounded by parallel normal faults due to extensional crustal stretching.
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                02
              </span>
              <h3 className="font-bold text-sm text-[#0A3D62]">Eastern (Gregory) Rift</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Known for intense volcanism, caldera formation (Ngorongoro Crater), soda/alkaline lakes (Lake Natron, Manyara, Eyasi), and the highest volcanic peaks in Africa (Kilimanjaro 5,895m, Meru 4,562m).
              </p>
              <div className="text-[11px] font-semibold text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                Home to Oldoinyo Lengai (2,962m)—the only active natrocarbonatite volcano on Earth erupting black, low-temperature lava.
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                03
              </span>
              <h3 className="font-bold text-sm text-[#0A3D62]">Economic &amp; Energy Resources</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Volcanic ash and basalt have enriched the soils of the Southern Highlands (Mbeya, Rungwe) and Kilimanjaro for premium coffee, tea, and banana production.
              </p>
              <div className="text-[11px] font-semibold text-emerald-900 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
                Pioneering geothermal clean energy explorations in Ngozi caldera, Kiejo-Mbaka, and Luhoi.
              </div>
            </div>
          </div>

          {/* Geological Cross-Section Diagram */}
          <div className="bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-slate-200">
              Rift Valley Structural Cross-Section: Horst and Graben Formation
            </h4>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
              <pre className="text-center font-sans text-xs text-emerald-400">
{`   [ HORST / PLATEAU ]         [ FAULT SCARP ]          [ GRABEN / RIFT FLOOR ]         [ FAULT SCARP ]         [ HORST / PLATEAU ]
   Uplifted Fault Block             \\                          Sunken Rift Valley             /              Uplifted Fault Block
        +------------+               \\                          +---------------+            /                  +------------+
        |            |                \\                         | Lake / Sedim. |           /                   |            |
        | Continental|                 \\                        |   Basin       |          /                    | Continental|
        |   Crust    |                  \\                       +---------------+         /                     |   Crust    |
        |            |                   \\                             |                 /                      |            |
  <=====+------------+====================\\============================+================/=======================+------------+=====>
         Tensional Force                                         Rising Magma / Upwelling                         Tensional Force`}
              </pre>
            </div>
            <p className="text-xs text-slate-400">
              Tensional forces pull the crust in opposite directions, causing central crustal blocks to drop along normal fault lines to form the sunken graben floor, while flanking blocks remain as elevated horst plateaus and escarpments.
            </p>
          </div>
        </div>
      )}

      {mapScope === 'mapreading' && <MapReadingTool />}
    </div>
  );
};
