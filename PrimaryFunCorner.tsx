import React, { useState } from 'react';
import {
  Sparkles,
  PieChart,
  Heart,
  Compass,
  Smile,
  CheckCircle,
  HelpCircle,
  Sun,
  CloudRain,
  Flame,
} from 'lucide-react';

export const PrimaryFunCorner: React.FC = () => {
  const [activeFunTab, setActiveFunTab] = useState<'pizza' | 'body' | 'safari'>('pizza');

  return (
    <div className="bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm space-y-6">
      {/* Playful Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-200 text-amber-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Smile className="w-4 h-4 text-amber-700" />
            Standard I - VII Kids Discovery Zone
          </div>
          <h2 className="text-2xl font-black text-[#0A3D62] font-display">
            Roche Primary Fun Zone! 🎨 🍕 🌍
          </h2>
          <p className="text-xs text-slate-600">
            Learn Math with pizza slices, explore human body organs, and meet Tanzania's wildlife!
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-2xl border border-amber-200 shadow-2xs">
          <button
            onClick={() => setActiveFunTab('pizza')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFunTab === 'pizza'
                ? 'bg-[#0A3D62] text-white shadow-xs'
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            🍕 Fraction Pizza
          </button>
          <button
            onClick={() => setActiveFunTab('body')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFunTab === 'body'
                ? 'bg-[#0A3D62] text-white shadow-xs'
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            🫀 Our Amazing Body
          </button>
          <button
            onClick={() => setActiveFunTab('safari')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFunTab === 'safari'
                ? 'bg-[#0A3D62] text-white shadow-xs'
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            🦁 Tanzania Safari
          </button>
        </div>
      </div>

      {/* 1. Fraction Pizza Game */}
      {activeFunTab === 'pizza' && <PizzaFractionGame />}

      {/* 2. Body Explorer */}
      {activeFunTab === 'body' && <BodyOrgansGame />}

      {/* 3. Safari Game */}
      {activeFunTab === 'safari' && <TanzaniaSafariGame />}
    </div>
  );
};

/* Fraction Pizza Game */
const PizzaFractionGame: React.FC = () => {
  const [slicesEaten, setSlicesEaten] = useState<number[]>([0, 1]); // indices of eaten slices out of 8
  const totalSlices = 8;

  const toggleSlice = (idx: number) => {
    if (slicesEaten.includes(idx)) {
      setSlicesEaten(slicesEaten.filter((s) => s !== idx));
    } else {
      setSlicesEaten([...slicesEaten, idx]);
    }
  };

  const remaining = totalSlices - slicesEaten.length;

  return (
    <div className="bg-white rounded-2xl p-6 border border-amber-200 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      {/* Pizza Visual */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-56 h-56 rounded-full bg-amber-100 border-8 border-amber-400 p-2 shadow-inner flex items-center justify-center">
          {/* Pizza Slices */}
          <div className="relative w-full h-full rounded-full overflow-hidden">
            {Array.from({ length: totalSlices }).map((_, i) => {
              const angle = (i * 360) / totalSlices;
              const isEaten = slicesEaten.includes(i);
              return (
                <div
                  key={i}
                  onClick={() => toggleSlice(i)}
                  className={`absolute top-0 left-0 w-full h-full origin-center cursor-pointer transition-all duration-300 ${
                    isEaten ? 'opacity-15' : 'hover:scale-105'
                  }`}
                  style={{
                    clipPath: 'polygon(50% 50%, 50% 0%, 85.35% 14.64%)',
                    transform: `rotate(${angle}deg)`,
                    backgroundColor: isEaten ? '#e2e8f0' : i % 2 === 0 ? '#f59e0b' : '#fbbf24',
                  }}
                  title={isEaten ? 'Slice eaten! Click to bring it back' : 'Click to eat this slice!'}
                >
                  {/* Pepperoni & Topping dot */}
                  <div className="w-3 h-3 rounded-full bg-rose-600 absolute top-8 left-1/2 -translate-x-1/2 shadow-xs" />
                </div>
              );
            })}
          </div>
          {/* Center Crust */}
          <div className="absolute w-8 h-8 rounded-full bg-amber-500 border-2 border-amber-600 shadow-md" />
        </div>
        <p className="text-[11px] text-slate-500 mt-2 font-bold">
          Click any slice to "eat" or "restore" it!
        </p>
      </div>

      {/* Fraction Mathematics Explanation */}
      <div className="space-y-4">
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
          <span className="text-xs font-bold text-amber-900 block mb-1">
            Pizza Math in Action:
          </span>
          <div className="text-sm font-semibold text-slate-700 space-y-1">
            <div>
              Slices Eaten:{' '}
              <span className="text-rose-600 font-black text-lg">
                {slicesEaten.length} / {totalSlices}
              </span>
            </div>
            <div>
              Slices Remaining:{' '}
              <span className="text-emerald-700 font-black text-lg">
                {remaining} / {totalSlices}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-sky-50 p-3.5 rounded-xl border border-sky-200 text-xs text-sky-950">
          <strong>Fun Primary Rule:</strong> When the bottom number (denominator 8) stays the same, we just count the slices on top!
          {remaining === 4 && (
            <div className="mt-1 font-bold text-[#0A3D62]">
              🎉 Look! 4/8 is exactly EQUAL to 1/2 (Half the pizza)!
            </div>
          )}
          {remaining === 8 && (
            <div className="mt-1 font-bold text-emerald-800">
              Whole Pizza! 8/8 = 1 Whole Chapati!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* Body Organs Explorer */
const BodyOrgansGame: React.FC = () => {
  const [selectedOrgan, setSelectedOrgan] = useState<'brain' | 'heart' | 'lungs' | 'stomach'>('heart');

  const organs = {
    brain: {
      name: 'The Brain (Ubongo)',
      emoji: '🧠',
      funFact: 'Your brain sends electrical messages faster than a high-speed electric train! It uses 20% of your energy.',
      job: 'Controls thinking, memory, emotions, and movement.',
    },
    heart: {
      name: 'The Heart (Moyo)',
      emoji: '🫀',
      funFact: 'Your heart beats around 100,000 times every day, pumping blood through thousands of kilometers of blood vessels!',
      job: 'Pumps oxygen-rich blood to all organs and cells.',
    },
    lungs: {
      name: 'The Lungs (Mapafu)',
      emoji: '🫁',
      funFact: 'If you could spread out both your lungs flat, they would cover an entire tennis court!',
      job: 'Breathes in oxygen from the air and breathes out carbon dioxide gas.',
    },
    stomach: {
      name: 'The Stomach (Tumbo)',
      emoji: '🥣',
      funFact: 'Your stomach uses hydrochloric acid so strong it could dissolve metal, but its special mucous lining protects you!',
      job: 'Breaks down ugali, beans, and fruit into nutrients.',
    },
  };

  const curr = organs[selectedOrgan];

  return (
    <div className="bg-white rounded-2xl p-6 border border-emerald-200 space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(Object.keys(organs) as (keyof typeof organs)[]).map((k) => (
          <button
            key={k}
            onClick={() => setSelectedOrgan(k)}
            className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              selectedOrgan === k
                ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="text-base">{organs[k].emoji}</span>
            <span>{organs[k].name.split(' ')[1]}</span>
          </button>
        ))}
      </div>

      <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-2 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
        <span className="text-5xl">{curr.emoji}</span>
        <div>
          <h3 className="font-bold text-base text-[#0A3D62]">{curr.name}</h3>
          <p className="text-xs text-slate-700 mb-1">
            <strong>Key Function:</strong> {curr.job}
          </p>
          <div className="text-xs text-emerald-900 bg-white/80 p-2.5 rounded-lg border border-emerald-200">
            <strong>Did You Know?</strong> {curr.funFact}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Safari Wildlife Explorer */
const TanzaniaSafariGame: React.FC = () => {
  const [animal, setAnimal] = useState<'giraffe' | 'lion' | 'elephant' | 'chimp'>('giraffe');

  const animals = {
    giraffe: {
      name: 'Twiga (Giraffe)',
      nationalSymbol: 'Official National Animal of Tanzania!',
      habitat: 'Serengeti & Tarangire Savannas',
      fact: 'Has a blue tongue up to 45 cm long to wrap around thorny Acacia trees without getting hurt!',
    },
    lion: {
      name: 'Simba (Lion)',
      nationalSymbol: 'King of the Serengeti Savanna',
      habitat: 'Serengeti & Ngorongoro Crater',
      fact: 'Tanzania has the largest lion population in the entire world!',
    },
    elephant: {
      name: 'Tembo / Ndovu (African Elephant)',
      nationalSymbol: 'World\'s Largest Land Mammal',
      habitat: 'Ruaha, Nyerere (Selous) & Tarangire',
      fact: 'Elephants communicate through deep vibrations that travel through the ground for kilometers!',
    },
    chimp: {
      name: 'Sokwe (Chimpanzee)',
      nationalSymbol: 'Jane Goodall\'s Famous Study Group',
      habitat: 'Gombe Stream & Mahale Mountains (Kigoma)',
      fact: 'Shares 98.6% of DNA with humans and makes tools out of sticks to fish for termites!',
    },
  };

  const curr = animals[animal];

  return (
    <div className="bg-white rounded-2xl p-6 border border-sky-200 space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(Object.keys(animals) as (keyof typeof animals)[]).map((k) => (
          <button
            key={k}
            onClick={() => setAnimal(k)}
            className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              animal === k
                ? 'bg-[#0A3D62] text-white border-[#0A3D62]'
                : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            {animals[k].name}
          </button>
        ))}
      </div>

      <div className="bg-sky-50 p-5 rounded-2xl border border-sky-200 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[#0A3D62]">{curr.name}</h3>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            {curr.nationalSymbol}
          </span>
        </div>
        <p className="text-xs text-slate-600">
          <strong>National Parks in Tanzania:</strong> {curr.habitat}
        </p>
        <p className="text-xs text-sky-950 bg-white p-3 rounded-xl border border-sky-200">
          <strong>Science Fact:</strong> {curr.fact}
        </p>
      </div>
    </div>
  );
};
