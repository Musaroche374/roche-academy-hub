import React, { useState } from 'react';
import { Compass, TrendingUp } from 'lucide-react';

export const MapReadingTool: React.FC = () => {
  const [easting, setEasting] = useState(34);
  const [northing, setNorthing] = useState(62);
  const [subEasting, setSubEasting] = useState(4);
  const [subNorthing, setSubNorthing] = useState(8);

  const [vi, setVi] = useState(80); // meters
  const [he, setHe] = useState(1600); // meters

  // Gradient = VI / HE
  const gradientDenominator = +(he / vi).toFixed(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 4 & 6 Figure Grid Reference Visualizer */}
      <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Compass className="w-5 h-5 text-[#0A3D62]" />
          <div>
            <h3 className="font-bold text-sm text-[#0A3D62]">
              Interactive 4-Figure &amp; 6-Figure Grid Reference Tool
            </h3>
            <p className="text-xs text-slate-500">
              "Along the corridor (Eastings) and up the stairs (Northings)"
            </p>
          </div>
        </div>

        {/* Interactive Grid Map Canvas */}
        <div className="bg-slate-900 rounded-xl p-4 text-white relative h-64 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Northing {northing + 1}</span>
            <span>Northing {northing + 1}</span>
          </div>

          {/* Grid Box */}
          <div className="relative w-full h-44 border-2 border-dashed border-sky-400/60 rounded flex items-center justify-center bg-sky-950/40">
            {/* Sub-grid lines 10x10 */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-20 pointer-events-none">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border border-sky-300" />
              ))}
            </div>

            {/* The Target Pin */}
            <div
              className="absolute w-5 h-5 rounded-full bg-[#2ECC71] border-2 border-white flex items-center justify-center transition-all duration-200 shadow-lg"
              style={{
                left: `${(subEasting / 10) * 85 + 5}%`,
                bottom: `${(subNorthing / 10) * 80 + 5}%`,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
            </div>

            <span className="text-[11px] font-mono text-sky-200 bg-slate-900/80 px-2 py-1 rounded relative z-10">
              Grid Square: {easting}{northing}
            </span>
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Easting {easting}</span>
            <span>Easting {easting + 1}</span>
          </div>
        </div>

        {/* Readout Boxes */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              4-Figure Grid Ref:
            </span>
            <div className="text-lg font-black text-[#0A3D62] font-mono">
              {easting}{northing}
            </div>
            <span className="text-[10px] text-slate-500">Square identifier (1 km²)</span>
          </div>

          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">
              6-Figure Precise Ref:
            </span>
            <div className="text-lg font-black text-emerald-900 font-mono">
              {easting}{subEasting}{northing}{subNorthing}
            </div>
            <span className="text-[10px] text-emerald-700">Accurate to 100 meters</span>
          </div>
        </div>

        {/* Sliders to practice */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              East Tenth ({subEasting}/10):
            </label>
            <input
              type="range"
              min="0"
              max="9"
              value={subEasting}
              onChange={(e) => setSubEasting(Number(e.target.value))}
              className="w-full accent-[#0A3D62]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              North Tenth ({subNorthing}/10):
            </label>
            <input
              type="range"
              min="0"
              max="9"
              value={subNorthing}
              onChange={(e) => setSubNorthing(Number(e.target.value))}
              className="w-full accent-[#0A3D62]"
            />
          </div>
        </div>
      </div>

      {/* Contour Slope & Gradient Calculator */}
      <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className="font-bold text-sm text-[#0A3D62]">
              Contour Line Gradient Calculator (VI / HE)
            </h3>
            <p className="text-xs text-slate-500">
              Calculate topographic slope steepness for NECTA Geography Paper 1
            </p>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Vertical Interval (VI - Elevation Difference):</span>
              <span className="text-[#0A3D62] font-mono">{vi} meters</span>
            </div>
            <input
              type="range"
              min="20"
              max="400"
              step="10"
              value={vi}
              onChange={(e) => setVi(Number(e.target.value))}
              className="w-full accent-[#0A3D62]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Horizontal Equivalent (HE - Real Ground Distance):</span>
              <span className="text-[#0A3D62] font-mono">{he} meters</span>
            </div>
            <input
              type="range"
              min="400"
              max="5000"
              step="100"
              value={he}
              onChange={(e) => setHe(Number(e.target.value))}
              className="w-full accent-[#0A3D62]"
            />
          </div>
        </div>

        {/* Calculated Result */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-700">Calculated Slope Gradient:</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#0A3D62] font-mono">
              1 in {gradientDenominator}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              (or {( (vi / he) * 100 ).toFixed(1)}% slope)
            </span>
          </div>
          <div className="text-xs text-slate-600">
            {gradientDenominator < 10 ? (
              <span className="text-rose-600 font-bold">
                Very Steep Slope / Cliff! Unsuitable for conventional mechanized farming or rail transport.
              </span>
            ) : gradientDenominator < 25 ? (
              <span className="text-amber-600 font-bold">
                Moderate Slope. Requires terracing and soil erosion control measures.
              </span>
            ) : (
              <span className="text-emerald-700 font-bold">
                Gentle Plain. Highly suitable for settlement construction, roads, and agriculture.
              </span>
            )}
          </div>
        </div>

        {/* Formula Card */}
        <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 text-xs text-slate-700 space-y-1">
          <span className="font-bold text-[#0A3D62] block">Official NECTA Gradient Formula:</span>
          <div className="bg-white p-2 rounded font-mono text-[11px] text-[#0A3D62] border border-sky-100">
            Gradient = Vertical Interval (VI) ÷ Horizontal Distance (HE) <br />
            Gradient = {vi} m ÷ {he} m = <strong>1 : {gradientDenominator}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
