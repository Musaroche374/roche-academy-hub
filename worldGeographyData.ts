export interface WorldPhysicalFeature {
  id: string;
  name: string;
  category: 'mountain_range' | 'river_basin' | 'desert' | 'ocean_sea' | 'tectonic_zone' | 'ocean_trench';
  coordinates: { x: number; y: number }; // Relative SVG percentage (0-100) on Mercator/Equirectangular 1000x500
  keyMetric: string;
  locationContinent: string;
  description: string;
  geographicalSignificance: string;
}

export interface WorldOceanRecord {
  id: string;
  name: string;
  rankBySize: number;
  rankByDepth: number;
  areaKm2: number;
  areaSqMiles: number;
  percentageOfWorldOcean: number;
  percentageOfEarthSurface: number;
  averageDepthM: number;
  averageDepthFt: number;
  deepestPointName: string;
  deepestPointDepthM: number;
  deepestPointDepthFt: number;
  deepestPointLocation: string;
  coordinates: { x: number; y: number };
  volumeKm3: number;
  marginalSeas: string[];
  majorCurrents: string[];
  keyPhysicalFeatures: string[];
  geologicalProfile: string;
  economicAndClimaticRole: string;
  worldAtlasSourceUrl: string;
}

export interface OceanFloorReliefFeature {
  id: string;
  name: string;
  depthRangeM: string;
  percentageOceanFloor: string;
  description: string;
  formationProcess: string;
  examples: string[];
}

export interface WorldIndustrialBelt {
  id: string;
  name: string;
  sector: 'high_tech_manufacturing' | 'heavy_industry_steel' | 'energy_petrochemical' | 'mining_commodities' | 'agro_industrial';
  coordinates: { x: number; y: number };
  regionCountry: string;
  coreHubs: string[];
  description: string;
  globalOutputShare: string;
}

export interface WorldTransportRoute {
  id: string;
  name: string;
  type: 'maritime_canal' | 'strategic_strait' | 'transcontinental_rail' | 'air_superhub';
  coordinates: { x: number; y: number };
  corridor: string;
  significance: string;
  annualTrafficVolume: string;
  description: string;
}

export const WORLD_PHYSICAL_FEATURES: WorldPhysicalFeature[] = [
  // MOUNTAIN RANGES
  {
    id: 'himalayas',
    name: 'The Himalayas & Tibetan Plateau',
    category: 'mountain_range',
    coordinates: { x: 73, y: 44 },
    keyMetric: 'Mount Everest: 8,848.86 m | 14 peaks above 8,000 m',
    locationContinent: 'Asia (Nepal, China, India, Bhutan, Pakistan)',
    description: 'The highest mountain system on Earth, formed by the ongoing continental collision of the Indian Tectonic Plate colliding with the Eurasian Plate at ~5 cm/year.',
    geographicalSignificance: 'Often called the "Third Pole" and the "Water Tower of Asia", its glaciers feed the Indus, Ganges, Brahmaputra, Yangtze, Yellow, and Mekong rivers sustaining over 1.4 billion people.'
  },
  {
    id: 'andes',
    name: 'The Andes Mountains',
    category: 'mountain_range',
    coordinates: { x: 28, y: 72 },
    keyMetric: 'Length: 7,000 km (Longest continental range) | Aconcagua: 6,961 m',
    locationContinent: 'South America (Venezuela to Chile & Argentina)',
    description: 'The longest continental mountain range on Earth, created by subduction of the oceanic Nazca Plate beneath the South American continental plate.',
    geographicalSignificance: 'Contains the world\'s largest porphyry copper and lithium brine deposits, and acts as a massive climatic barrier creating the Atacama Desert on the west and the Amazon rainforest on the east.'
  },
  {
    id: 'rockies',
    name: 'Rocky Mountains',
    category: 'mountain_range',
    coordinates: { x: 20, y: 32 },
    keyMetric: 'Length: 4,800 km | Mount Elbert: 4,401 m',
    locationContinent: 'North America (Canada to New Mexico, USA)',
    description: 'Major mountain cordillera formed during the Laramide Orogeny (80–55 million years ago) with sub-horizontal subduction beneath western North America.',
    geographicalSignificance: 'Forms the Continental Divide of the Americas, separating drainage basins that flow into the Pacific Ocean from those draining into the Atlantic and Arctic oceans.'
  },
  {
    id: 'alps',
    name: 'The European Alps',
    category: 'mountain_range',
    coordinates: { x: 51, y: 33 },
    keyMetric: 'Mont Blanc: 4,808 m | Spans 8 European nations',
    locationContinent: 'Europe (France, Switzerland, Italy, Austria, Germany, Slovenia, Liechtenstein, Monaco)',
    description: 'Young fold mountains formed by the collision of the African and Eurasian tectonic plates during the Alpine Orogeny over the past 40 million years.',
    geographicalSignificance: 'Headwaters of major European rivers (Rhine, Rhône, Danube tributaries, Po) and classic case study of glacial landforms (aretes, cirques, U-shaped valleys, and horns).'
  },
  {
    id: 'atlas',
    name: 'Atlas Mountains',
    category: 'mountain_range',
    coordinates: { x: 47, y: 40 },
    keyMetric: 'Length: 2,500 km | Toubkal: 4,167 m',
    locationContinent: 'North Africa (Morocco, Algeria, Tunisia)',
    description: 'Fold mountain system separating the Mediterranean and Atlantic coastlines from the Sahara Desert.',
    geographicalSignificance: 'Rich in world-class phosphate mineral deposits (Morocco holds over 70% of global phosphate reserves) and creates a rain shadow defining the northern boundary of the Sahara.'
  },

  // RIVERS
  {
    id: 'nile-river',
    name: 'Nile River Basin',
    category: 'river_basin',
    coordinates: { x: 58, y: 46 },
    keyMetric: 'Length: 6,650 km (Longest river on Earth) | Drains 11 nations',
    locationContinent: 'Africa (Tanzania, Uganda, South Sudan, Sudan, Egypt, Ethiopia)',
    description: 'The world\'s longest river system formed by two main tributaries: the White Nile (originating in Lake Victoria and Kagera basin) and the Blue Nile (originating in Lake Tana, Ethiopia).',
    geographicalSignificance: 'The lifeblood of northeastern Africa, sustaining human civilization for over 5,000 years through annual fertile silt deposition, irrigation, and the Aswan High Dam & GERD hydro projects.'
  },
  {
    id: 'amazon-river',
    name: 'Amazon River & Tropical Rainforest',
    category: 'river_basin',
    coordinates: { x: 33, y: 58 },
    keyMetric: 'Discharge: 209,000 m³/s (20% of global river flow) | Basin: 7,000,000 km²',
    locationContinent: 'South America (Brazil, Peru, Colombia, Bolivia, Ecuador)',
    description: 'The greatest river system on Earth by discharge volume, flowing from the Peruvian Andes eastward across the Amazon Basin to discharge into the Atlantic Ocean.',
    geographicalSignificance: 'Contains over half of the planet\'s remaining rainforests and represents the largest and most biodiverse tropical rainforest tract on Earth, acting as a crucial global carbon sink.'
  },
  {
    id: 'yangtze-river',
    name: 'Yangtze River (Chang Jiang)',
    category: 'river_basin',
    coordinates: { x: 79, y: 43 },
    keyMetric: 'Length: 6,300 km (Longest in Asia) | Three Gorges Dam (22,500 MW)',
    locationContinent: 'Asia (China)',
    description: 'Originates on the Tibetan Plateau and flows through central China into the East China Sea at Shanghai. Home to the Three Gorges Dam, the world\'s largest power station.',
    geographicalSignificance: 'The Yangtze River Economic Belt accounts for over 40% of China\'s gross domestic product (GDP) and feeds critical irrigated rice agriculture and industrial mega-cities.'
  },
  {
    id: 'congo-river',
    name: 'Congo River (Zaire)',
    category: 'river_basin',
    coordinates: { x: 54, y: 58 },
    keyMetric: 'Depth: >220 m (Deepest river in the world) | Discharge: 41,000 m³/s',
    locationContinent: 'Central Africa (DRC, Republic of Congo, CAR, Angola)',
    description: 'The world\'s deepest recorded river, crossing the equator twice. Surrounded by the second largest rainforest in the world after the Amazon.',
    geographicalSignificance: 'Possesses the highest hydroelectric potential on the planet (Grand Inga Dam proposal: 40,000 MW, enough to electrify half of Africa).'
  },
  {
    id: 'mississippi-river',
    name: 'Mississippi-Missouri River Basin',
    category: 'river_basin',
    coordinates: { x: 23, y: 39 },
    keyMetric: 'Length: 6,275 km | Drains 32 US states and 2 Canadian provinces',
    locationContinent: 'North America (United States)',
    description: 'Chief river system of North America, draining the vast agricultural interior between the Rocky Mountains and the Appalachian Mountains into the Gulf of Mexico.',
    geographicalSignificance: 'The primary grain export inland waterway for the US Midwest, handling over 60% of all US grain exports via cheap barge transport to the Port of South Louisiana.'
  },

  // DESERTS
  {
    id: 'sahara-desert',
    name: 'The Sahara Desert',
    category: 'desert',
    coordinates: { x: 50, y: 44 },
    keyMetric: 'Area: 9,200,000 km² (Largest hot desert on Earth)',
    locationContinent: 'North Africa',
    description: 'Covers most of North Africa under the descending limb of the atmospheric Hadley Cell (subtropical high-pressure zone), creating extreme aridity and high diurnal temperature swings.',
    geographicalSignificance: 'Underlain by the Nubian Sandstone Aquifer System (world\'s largest known fossil water aquifer) and immense solar irradiation potential for global green energy.'
  },
  {
    id: 'atacama-desert',
    name: 'Atacama Desert',
    category: 'desert',
    coordinates: { x: 28, y: 70 },
    keyMetric: 'Driest non-polar desert on Earth | Some areas haven\'t seen rain in 400 years',
    locationContinent: 'South America (Northern Chile)',
    description: 'Hyper-arid coastal plateau formed by a two-sided rain shadow (the Andes blocking moisture from the east, and the cold Humboldt Current chilling marine air preventing rain from the west).',
    geographicalSignificance: 'Prime global location for optical and radio astronomical observatories (ALMA, VLT) and contains the world\'s largest reserves of lithium and sodium nitrate.'
  },

  // TECTONIC ZONES
  {
    id: 'pacific-ring-of-fire',
    name: 'Pacific Ring of Fire',
    category: 'tectonic_zone',
    coordinates: { x: 86, y: 46 },
    keyMetric: 'Length: 40,000 km | 75% of world\'s active volcanoes | 90% of earthquakes',
    locationContinent: 'Circum-Pacific Belt (Asia, Americas, Oceania)',
    description: 'Horse-shoe shaped zone of intense seismic and volcanic activity tracing the convergent and transform boundaries of the Pacific Plate subducting beneath surrounding tectonic plates.',
    geographicalSignificance: 'Site of catastrophic megathrust earthquakes, deep oceanic trenches (Mariana Trench 11,034 m), and island arcs (Japan, Indonesia, Philippines, Aleutian Islands).'
  },
  {
    id: 'mid-atlantic-ridge',
    name: 'Mid-Atlantic Ridge',
    category: 'tectonic_zone',
    coordinates: { x: 40, y: 45 },
    keyMetric: 'Length: 16,000 km (Longest mountain range on Earth, mostly underwater)',
    locationContinent: 'Atlantic Ocean (Arctic to Southern Ocean)',
    description: 'Divergent tectonic plate boundary where the Eurasian and North American plates, and African and South American plates, are spreading apart at ~2.5 cm/year.',
    geographicalSignificance: 'Generates new oceanic crust via seafloor spreading and surfaces above sea level in Iceland, where intense geothermal and volcanic activity is harnessed for clean energy.'
  },

  // OCEAN TRENCHES & MARINE PHYSICAL RELIEF
  {
    id: 'mariana-trench',
    name: 'Mariana Trench & Challenger Deep',
    category: 'ocean_trench',
    coordinates: { x: 84, y: 47 },
    keyMetric: 'Deepest point on Earth: 10,994 m (36,070 ft) in Challenger Deep',
    locationContinent: 'Pacific Ocean (Micronesia / Mariana Islands)',
    description: 'A crescent-shaped oceanic trench formed where the Pacific Plate subducts beneath the smaller Mariana Plate into the upper mantle.',
    geographicalSignificance: 'Subject to immense hydrostatic pressure (>1,086 bar / 1,000 atmospheres). If Mount Everest (8,848 m) were placed at the bottom, its peak would still be submerged under more than 2,000 meters of water.'
  },
  {
    id: 'puerto-rico-trench',
    name: 'Puerto Rico Trench & Milwaukee Deep',
    category: 'ocean_trench',
    coordinates: { x: 34, y: 44 },
    keyMetric: 'Deepest in Atlantic: 8,380 m (27,493 ft) in Milwaukee Deep',
    locationContinent: 'Atlantic Ocean (Boundary between Caribbean Sea and Atlantic)',
    description: 'The deepest trench in the Atlantic Ocean, located along an active oblique subduction boundary between the North American and Caribbean plates.',
    geographicalSignificance: 'Capable of generating significant megathrust earthquakes and trans-Atlantic tsunamis due to intense shear stress along the plate boundary.'
  },
  {
    id: 'java-sunda-trench',
    name: 'Java (Sunda) Trench',
    category: 'ocean_trench',
    coordinates: { x: 76, y: 56 },
    keyMetric: 'Deepest in Indian Ocean: 7,190 m (23,600 ft)',
    locationContinent: 'Indian Ocean (Off southwest coast of Sumatra and Java, Indonesia)',
    description: 'A 3,200 km oceanic trench formed by the subduction of the Australian Plate beneath the Sunda Plate at ~6–7 cm/year.',
    geographicalSignificance: 'A major subduction zone responsible for intense seismicity and volcanism throughout Indonesia, including the cataclysmic 2004 Indian Ocean earthquake and tsunami.'
  },
  {
    id: 'south-sandwich-trench',
    name: 'South Sandwich Trench & Factorian Deep',
    category: 'ocean_trench',
    coordinates: { x: 42, y: 84 },
    keyMetric: 'Deepest in Southern Ocean: 7,075 m (23,212 ft)',
    locationContinent: 'Southern Ocean (East of South Sandwich Islands, south of 60° S)',
    description: 'Subduction zone in the sub-Antarctic waters where the South American Plate subducts beneath the South Sandwich Plate.',
    geographicalSignificance: 'The only deep hadal trench in the Southern Ocean, explored by the Five Deeps Expedition discovering unique psychrophilic (cold-adapted) hadal fauna.'
  },
  {
    id: 'molloy-deep',
    name: 'Molloy Deep (Fram Strait)',
    category: 'ocean_trench',
    coordinates: { x: 52, y: 12 },
    keyMetric: 'Deepest in Arctic Ocean: 5,550 m (18,210 ft)',
    locationContinent: 'Arctic Ocean (Fram Strait between Greenland and Svalbard)',
    description: 'A bathymetric rift basin located in the Molloy Fracture Zone along the boundary between the North American and Eurasian plates.',
    geographicalSignificance: 'The sole deep-sea passage connecting the Arctic Ocean with the global ocean network, governing deep water exchange and heat transfer.'
  },
  {
    id: 'great-barrier-reef',
    name: 'Great Barrier Reef Marine Ecosystem',
    category: 'ocean_sea',
    coordinates: { x: 88, y: 64 },
    keyMetric: 'Length: 2,300 km | 2,900 individual reefs | World\'s largest living structure',
    locationContinent: 'Pacific Ocean / Coral Sea (Northeast coast of Australia)',
    description: 'The world\'s most extensive coral reef system, visible from space, built over hundreds of thousands of years by billions of tiny coral polyps.',
    geographicalSignificance: 'UNESCO World Heritage site supporting extraordinary marine biodiversity (1,500 species of fish, 400 species of hard coral) and critical study area for ocean acidification and coral bleaching.'
  }
];

export const WORLD_INDUSTRIAL_BELTS: WorldIndustrialBelt[] = [
  {
    id: 'east-asia-manufacturing',
    name: 'East Asia High-Tech & Advanced Manufacturing Belt',
    sector: 'high_tech_manufacturing',
    coordinates: { x: 80, y: 42 },
    regionCountry: 'China (Greater Bay Area, Yangtze Delta) / Japan (Taiheiyo Belt) / South Korea',
    coreHubs: ['Shenzhen', 'Shanghai', 'Tokyo-Yokohama', 'Seoul-Gyeonggi', 'Taipei-Hsinchu'],
    description: 'The undisputed manufacturing workshop of the modern world. Produces over 70% of global consumer electronics, semiconductors, EV batteries, high-speed rail, and commercial container ships.',
    globalOutputShare: 'Over 35% of total global manufacturing value added.'
  },
  {
    id: 'north-american-core',
    name: 'North American Advanced Tech & Industrial Core',
    sector: 'high_tech_manufacturing',
    coordinates: { x: 22, y: 36 },
    regionCountry: 'United States & Southern Ontario (Canada)',
    coreHubs: ['Silicon Valley (San Francisco)', 'Great Lakes Rust Belt (Detroit, Chicago)', 'Texas Energy Corridor (Houston, Dallas)', 'Seattle (Aerospace)'],
    description: 'World leader in aerospace, artificial intelligence, software design, advanced pharmaceuticals, and shale energy (crude oil & LNG export).',
    globalOutputShare: 'Leading global aerospace (Boeing), computing hardware, and biotechnology innovation.'
  },
  {
    id: 'european-blue-banana',
    name: 'Western European Industrial Heartland (Blue Banana & Ruhr)',
    sector: 'heavy_industry_steel',
    coordinates: { x: 50, y: 31 },
    regionCountry: 'Germany, Netherlands, Belgium, Northern France, Northern Italy',
    coreHubs: ['Ruhr Valley (Essen, Dortmund)', 'Rotterdam-Antwerp logistics axis', 'Stuttgart-Munich (Automotive)', 'Milan Industrial Triangle'],
    description: 'The historic and modern precision engineering capital of Europe. Specializes in luxury automotive (BMW, Mercedes, Porsche), precision robotics, specialty chemicals, and pharmaceuticals.',
    globalOutputShare: 'Top exporter of specialized capital goods and chemical intermediates.'
  },
  {
    id: 'persian-gulf-energy',
    name: 'Persian Gulf Petrochemical & Energy Axis',
    sector: 'energy_petrochemical',
    coordinates: { x: 62, y: 44 },
    regionCountry: 'Saudi Arabia, UAE, Qatar, Kuwait, Iraq, Iran',
    coreHubs: ['Jubail Industrial City (Largest industrial city in the world)', 'Ras Laffan (Qatar LNG)', 'Abu Dhabi / Ruwais', 'Yanbu'],
    description: 'The epicenter of global petroleum refining, liquefied natural gas (LNG), polymers, plastics, and aluminum smelting powered by cheap natural gas.',
    globalOutputShare: 'Over 30% of global seaborne crude oil and 25% of global liquefied natural gas exports.'
  },
  {
    id: 'african-copperbelt',
    name: 'Central African Copperbelt & Southern Mining Axis',
    sector: 'mining_commodities',
    coordinates: { x: 55, y: 68 },
    regionCountry: 'DRC (Katanga / Kolwezi), Zambia (Ndola, Kitwe), South Africa (Witwatersrand)',
    coreHubs: ['Kolwezi & Lubumbashi (DRC)', 'Kitwe & Ndola (Zambia)', 'Johannesburg (South Africa)'],
    description: 'Produces over 70% of the world\'s cobalt and is Africa\'s top copper producer, providing critical metals indispensable for electric vehicles, smartphones, and green transition grids.',
    globalOutputShare: '70% of world cobalt, 12% of world copper, and 75% of world platinum group metals.'
  },
  {
    id: 'latin-american-commodities',
    name: 'Latin American Mining & Agribusiness Belt',
    sector: 'mining_commodities',
    coordinates: { x: 30, y: 66 },
    regionCountry: 'Brazil (Carajás & Cerrado), Chile (Antofagasta), Argentina (Pampa & Lithium Triangle)',
    coreHubs: ['Carajás (World\'s largest iron ore mine)', 'Escondida (World\'s largest copper mine in Chile)', 'Santos Port & Rosario Agribusiness Ports'],
    description: 'World\'s dominant exporter of battery-grade lithium, iron ore, copper concentrates, soybeans, and animal proteins supplying global nutrition and industrial factories.',
    globalOutputShare: 'Produces over 28% of world copper, 20% of iron ore, and 50% of global soybean exports.'
  }
];

export const WORLD_TRANSPORT_ROUTES: WorldTransportRoute[] = [
  // MARITIME CANALS & STRAITS
  {
    id: 'suez-canal',
    name: 'The Suez Canal',
    type: 'maritime_canal',
    coordinates: { x: 56, y: 41 },
    corridor: 'Connects Mediterranean Sea to the Red Sea & Indian Ocean (193 km)',
    significance: 'Shortest maritime route between Europe and Asia, avoiding the 8,900 km circumnavigation of the African continent via the Cape of Good Hope.',
    annualTrafficVolume: '~23,000 vessels/year | Carries ~12% of total global trade and 30% of global container traffic',
    description: 'A sea-level canal with no locks, completed in 1869 under Ferdinand de Lesseps. Underwent major dual-channel expansion in 2015.'
  },
  {
    id: 'panama-canal',
    name: 'The Panama Canal',
    type: 'maritime_canal',
    coordinates: { x: 26, y: 51 },
    corridor: 'Connects Atlantic Ocean (Caribbean Sea) to Pacific Ocean across Isthmus of Panama (82 km)',
    significance: 'Saves ships over 13,000 km by bypassing Cape Horn at the stormy tip of South America.',
    annualTrafficVolume: '~14,000 transits/year | Handles ~5% of world maritime trade',
    description: 'Features a fresh-water lock system raising ships 26 meters up to Gatun Lake. The 2016 expansion added Neopanamax locks accommodating container vessels up to 14,000 TEU.'
  },
  {
    id: 'strait-of-malacca',
    name: 'Strait of Malacca',
    type: 'strategic_strait',
    coordinates: { x: 77, y: 53 },
    corridor: 'Between Malay Peninsula and Indonesian island of Sumatra (800 km length, min width 2.8 km)',
    significance: 'The world\'s busiest and most strategic maritime choke-point, connecting the Indian Ocean to the South China Sea and Pacific.',
    annualTrafficVolume: 'Over 84,000 ships/year | Carries 25% of all traded goods and 80% of China\'s crude oil imports',
    description: 'Supervised by Singapore, Malaysia, and Indonesia; essential lifeline for industrial energy supplies into Japan, South Korea, and China.'
  },
  {
    id: 'strait-of-hormuz',
    name: 'Strait of Hormuz',
    type: 'strategic_strait',
    coordinates: { x: 63, y: 43 },
    corridor: 'Between Oman and Iran, connecting the Persian Gulf with the Gulf of Oman and Arabian Sea',
    significance: 'The world\'s most critical oil transit chokepoint. There are virtually no maritime alternatives for Persian Gulf oil exports.',
    annualTrafficVolume: 'Transports 21 million barrels of crude oil per day (~21% of global petroleum liquid consumption)',
    description: 'Navigational channel is only 3 km wide in each direction, guarded under international law as a transit passage strait.'
  },
  {
    id: 'bab-el-mandeb',
    name: 'Bab el-Mandeb Strait (\'Gate of Tears\')',
    type: 'strategic_strait',
    coordinates: { x: 59, y: 47 },
    corridor: 'Between Yemen (Arabian Peninsula) and Djibouti/Eritrea (Horn of Africa), connecting Red Sea to Gulf of Aden',
    significance: 'Southern maritime gatekeeper controlling access to the Suez Canal and Red Sea trade lanes.',
    annualTrafficVolume: 'Over 20,000 commercial ships/year carrying European and Asian manufactured goods and energy',
    description: 'Strategic geopolitical bottleneck with naval bases maintained in Djibouti by the US, France, China, and Japan.'
  },

  // RAILWAYS & LANDBRIDGES
  {
    id: 'trans-siberian-railway',
    name: 'Trans-Siberian Railway',
    type: 'transcontinental_rail',
    coordinates: { x: 70, y: 25 },
    corridor: 'Moscow to Vladivostok on the Pacific Ocean (9,289 km - 5,772 miles)',
    significance: 'The longest railway line in the world, spanning two continents (Europe & Asia) and eight time zones.',
    annualTrafficVolume: 'Over 100 million tons of freight and millions of passengers annually',
    description: 'Double-tracked and fully electrified main artery transporting Siberian coal, timber, metals, and Asian container freight to European Russia.'
  },
  {
    id: 'eurasian-landbridge',
    name: 'New Eurasian Land Bridge (China-Europe Freight Rail)',
    type: 'transcontinental_rail',
    coordinates: { x: 65, y: 33 },
    corridor: 'Yiwu/Chongqing/Xi\'an (China) -> Kazakhstan -> Russia -> Belarus -> Poland -> Germany (Duisburg/Hamburg) (11,000+ km)',
    significance: 'Provides an overland trade alternative faster than ocean shipping (14–18 days vs. 35–45 days) and cheaper than air cargo.',
    annualTrafficVolume: 'Over 16,000 train trips/year carrying electronics, auto parts, and medical supplies under the Belt & Road Initiative',
    description: 'Key overland corridor operating with automated break-of-gauge transshipment cranes at border border stations (Khorgos and Brest).'
  },
  {
    id: 'north-american-transcontinental',
    name: 'North American Transcontinental Freight Railroads',
    type: 'transcontinental_rail',
    coordinates: { x: 22, y: 35 },
    corridor: 'Pacific Coast ports (Los Angeles, Long Beach, Vancouver) to Chicago and Atlantic ports (Union Pacific / BNSF / CN)',
    significance: 'Pioneered double-stack intermodal container trains carrying thousands of containers from Asian container ships across the Rockies to Midwestern consumers.',
    annualTrafficVolume: 'Tens of millions of intermodal container units annually; the most energy-efficient heavy freight logistics network on Earth',
    description: 'Transfers shipping containers directly from maritime docks onto rail flatcars without unpacking.'
  },

  // AIR SUPERHUBS
  {
    id: 'dubai-international',
    name: 'Dubai International & Logistics Hub (DXB)',
    type: 'air_superhub',
    coordinates: { x: 63, y: 43 },
    corridor: 'Global East-West intercontinental nexus situated within 8 hours flying time of two-thirds of the world\'s population',
    significance: 'World\'s busiest airport by international passenger traffic and major sea-to-air multimodal logistics transfer center.',
    annualTrafficVolume: 'Over 87 million international passengers/year and 2.5 million tons of air cargo',
    description: 'Flagship super-connector airport linking Europe, Africa, North America, the Middle East, India, and Southeast Asia seamlessly.'
  },
  {
    id: 'addis-ababa-bole',
    name: 'Addis Ababa Bole International Airport (ADD)',
    type: 'air_superhub',
    coordinates: { x: 57, y: 49 },
    corridor: 'Pan-African aviation crossroads linking 130+ international and 60+ intra-African destinations (Ethiopian Airlines Hub)',
    significance: 'Surpassed Dubai and European hubs as the primary transit gateway for travelers flying into and between Sub-Saharan African capitals.',
    annualTrafficVolume: 'Over 12 million passengers/year and Africa\'s largest air cargo cold-chain logistics center (handling fresh flowers and pharmaceuticals)',
    description: 'Crucial continental air bridge linking East Africa (including flights to Dar es Salaam, Zanzibar, Kilimanjaro) to Beijing, London, New York, and São Paulo.'
  }
];

// =========================================================================
// WORLDATLAS OCEANS COMPENDIUM (https://www.worldatlas.com/aatlas/infopage/oceans.htm)
// The Oceans of the World by Size, Depth, Bathymetry & Physical Features
// =========================================================================

export const WORLD_OCEANS_DATA: WorldOceanRecord[] = [
  {
    id: 'pacific-ocean',
    name: 'Pacific Ocean',
    rankBySize: 1,
    rankByDepth: 1,
    areaKm2: 168723000,
    areaSqMiles: 65144000,
    percentageOfWorldOcean: 46.6,
    percentageOfEarthSurface: 30.5,
    averageDepthM: 3970,
    averageDepthFt: 13025,
    deepestPointName: 'Challenger Deep (Mariana Trench)',
    deepestPointDepthM: 10994,
    deepestPointDepthFt: 36070,
    deepestPointLocation: 'Mariana Trench, southwestern Pacific Ocean near Guam / Micronesia',
    coordinates: { x: 88, y: 55 },
    volumeKm3: 710000000,
    marginalSeas: [
      'South China Sea',
      'Bering Sea',
      'Sea of Okhotsk',
      'Sea of Japan (East Sea)',
      'Coral Sea',
      'Philippine Sea',
      'East China Sea',
      'Tasman Sea',
      'Yellow Sea',
      'Gulf of Alaska'
    ],
    majorCurrents: [
      'Kuroshio Current (Warm western boundary current)',
      'California Current (Cold eastern boundary current)',
      'North Equatorial Current (Warm trade wind-driven)',
      'Humboldt / Peru Current (Cold, high-productivity upwelling)',
      'Oyashio Current (Subarctic cold nutrient-rich flow)',
      'East Australian Current (Warm southward transport)'
    ],
    keyPhysicalFeatures: [
      'Challenger Deep & Mariana Trench (Deepest point on Earth at 10,994 m)',
      'Pacific Ring of Fire (40,000 km subduction zone with 75% of global volcanoes)',
      'Great Barrier Reef (World\'s largest coral reef structure spanning 2,300 km)',
      'East Pacific Rise (Spreading divergent mid-ocean ridge)',
      'Hawaiian-Emperor Seamount Chain (Mantle plume hotspot track)',
      'Tonga & Kermadec Trenches (Ultra-deep subduction chasms reaching 10,882 m)'
    ],
    geologicalProfile: 'The oldest surviving oceanic crust (Jurassic, ~180 Ma) lies in the western Pacific. The basin is bounded by active destructive convergent plate boundaries where oceanic lithosphere is consumed into deep subduction trenches.',
    economicAndClimaticRole: 'Generates the El Niño-Southern Oscillation (ENSO) weather system that affects planetary agriculture and rainfall. Handles the world\'s largest volume of container shipping trade (Trans-Pacific route) and yields over 50% of the world\'s commercial fish catch.',
    worldAtlasSourceUrl: 'https://www.worldatlas.com/aatlas/infopage/oceans.htm'
  },
  {
    id: 'atlantic-ocean',
    name: 'Atlantic Ocean',
    rankBySize: 2,
    rankByDepth: 3,
    areaKm2: 76762000,
    areaSqMiles: 29637000,
    percentageOfWorldOcean: 23.5,
    percentageOfEarthSurface: 16.1,
    averageDepthM: 3646,
    averageDepthFt: 11962,
    deepestPointName: 'Milwaukee Deep (Puerto Rico Trench)',
    deepestPointDepthM: 8380,
    deepestPointDepthFt: 27493,
    deepestPointLocation: 'Puerto Rico Trench, northern boundary between Caribbean Plate and North American Plate',
    coordinates: { x: 38, y: 48 },
    volumeKm3: 310000000,
    marginalSeas: [
      'Mediterranean Sea',
      'Caribbean Sea',
      'Gulf of Mexico',
      'North Sea',
      'Baltic Sea',
      'Hudson Bay',
      'Norwegian Sea',
      'Celtic Sea',
      'Black Sea'
    ],
    majorCurrents: [
      'Gulf Stream (Powerful warm current transporting tropical heat to Northwest Europe)',
      'North Atlantic Drift (Extends Gulf Stream warmth into Arctic seas)',
      'Canary Current (Cold southward current stabilizing North African climate)',
      'Benguela Current (Cold upwelling along Namibia/South Africa coast)',
      'Brazil Current (Warm southward South Atlantic flow)',
      'South Equatorial Current (Cross-basin westward current)'
    ],
    keyPhysicalFeatures: [
      'Mid-Atlantic Ridge (16,000 km continuous submarine divergent mountain chain)',
      'Milwaukee Deep & Puerto Rico Trench (8,380 m deep subduction chasm)',
      'Sargasso Sea (The only sea without land boundaries, defined solely by the North Atlantic Gyre)',
      'Romanche Trench (Equatorial fracture zone and 7,760 m deep oceanic gap)',
      'Grand Banks of Newfoundland (Shallow continental shelf with historically rich fisheries)'
    ],
    geologicalProfile: 'An expanding ocean basin created by the breakup of the supercontinent Pangaea ~180 million years ago. Spreading continues along the central Mid-Atlantic Ridge at an average rate of 2.5 cm/year.',
    economicAndClimaticRole: 'Drives the Atlantic Meridional Overturning Circulation (AMOC), the planetary heat conveyor that prevents Northwest Europe from freezing. Historic heart of transatlantic trade, connecting the industrial economies of Europe, North America, and Latin America.',
    worldAtlasSourceUrl: 'https://www.worldatlas.com/aatlas/infopage/oceans.htm'
  },
  {
    id: 'indian-ocean',
    name: 'Indian Ocean',
    rankBySize: 3,
    rankByDepth: 2,
    areaKm2: 68556000,
    areaSqMiles: 26469000,
    percentageOfWorldOcean: 19.5,
    percentageOfEarthSurface: 14.4,
    averageDepthM: 3741,
    averageDepthFt: 12274,
    deepestPointName: 'Java Trench (Sunda Trench)',
    deepestPointDepthM: 7190,
    deepestPointDepthFt: 23600,
    deepestPointLocation: 'Java Trench, eastern Indian Ocean off southern coast of Java and Sumatra, Indonesia',
    coordinates: { x: 67, y: 62 },
    volumeKm3: 264000000,
    marginalSeas: [
      'Arabian Sea',
      'Bay of Bengal',
      'Red Sea',
      'Persian Gulf',
      'Andaman Sea',
      'Mozambique Channel',
      'Gulf of Aden',
      'Gulf of Oman',
      'Timor Sea'
    ],
    majorCurrents: [
      'Agulhas Current (Warm, swift western boundary current flowing along East/South Africa)',
      'Somali Current (Unique current that reverses direction twice annually with monsoons)',
      'Southwest & Northeast Monsoon Currents (Wind-driven seasonal surface flow reversals)',
      'Leeuwin Current (Warm poleward current flowing south along Western Australia)',
      'South Equatorial Current (Transits warm water toward Madagascar and East Africa)'
    ],
    keyPhysicalFeatures: [
      'Java (Sunda) Trench (3,200 km subduction zone and deepest point in the Indian Ocean)',
      'Ninety East Ridge (5,000 km linear aseismic submarine ridge along the 90° E meridian)',
      'Central Indian Ridge & Rodrigues Triple Junction (Where African, Indo-Australian, and Antarctic plates meet)',
      'Carlsberg Ridge (Spreading ridge separating the African and Indo-Australian plates in the northwest)',
      'Mozambique Channel (Deep oceanic strait between Madagascar and East Africa, flanking Tanzania)'
    ],
    geologicalProfile: 'The youngest of the major ocean basins, formed when the ancient continent Gondwana fragmented ~120 million years ago, sending India northward at tectonic speeds to collide with Eurasia.',
    economicAndClimaticRole: 'Carries over 40% of the world\'s seaborne petroleum exports originating in the Persian Gulf and bound for Asia, Europe, and America via the critical straits of Hormuz and Malacca. Powers the annual Monsoon weather patterns critical for food security for over 2 billion people in South Asia and East Africa.',
    worldAtlasSourceUrl: 'https://www.worldatlas.com/aatlas/infopage/oceans.htm'
  },
  {
    id: 'southern-ocean',
    name: 'Southern (Antarctic) Ocean',
    rankBySize: 4,
    rankByDepth: 4,
    areaKm2: 20327000,
    areaSqMiles: 7848000,
    percentageOfWorldOcean: 6.1,
    percentageOfEarthSurface: 4.0,
    averageDepthM: 3270,
    averageDepthFt: 10728,
    deepestPointName: 'Factorian Deep (South Sandwich Trench)',
    deepestPointDepthM: 7075,
    deepestPointDepthFt: 23212,
    deepestPointLocation: 'Southern end of the South Sandwich Trench, south of 60° S latitude',
    coordinates: { x: 50, y: 90 },
    volumeKm3: 71800000,
    marginalSeas: [
      'Weddell Sea',
      'Ross Sea',
      'Amundsen Sea',
      'Bellingshausen Sea',
      'Scotia Sea',
      'Davis Sea',
      'D\'Urville Sea',
      'Riiser-Larsen Sea'
    ],
    majorCurrents: [
      'Antarctic Circumpolar Current (ACC / West Wind Drift - World\'s largest current carrying 140 million m³/s eastward)',
      'Antarctic Coastal Current (East Wind Drift - Flowing westward along the Antarctic ice margins)'
    ],
    keyPhysicalFeatures: [
      'Antarctic Circumpolar Current (Uninterrupted planetary ring current with no continental barriers)',
      'Antarctic Convergence (Polar Front boundary where cold polar water plunges beneath warmer temperate waters)',
      'South Sandwich Trench (7,075 m deep subduction zone at the boundary of South American and Sandwich plates)',
      'Vast Floating Ice Shelves (Ross Ice Shelf and Ronne-Filchner Ice Shelf)',
      'Kerguelen Oceanic Plateau (Major submarine volcanic plateau)'
    ],
    geologicalProfile: 'Officially recognized by the International Hydrographic Organization (IHO) as the body of water encircling Antarctica south of 60° S. The opening of the Drake Passage ~34 million years ago isolated Antarctica thermally, triggering continental glaciation.',
    economicAndClimaticRole: 'The primary engine of the global thermohaline "Ocean Conveyor Belt". Freezing surface water expels salt to form Antarctic Bottom Water (AABW), the densest water mass on Earth, which sinks and oxygenates deep ocean trenches worldwide. Absorbs over 40% of all oceanic anthropogenic carbon dioxide ($CO_2$).',
    worldAtlasSourceUrl: 'https://www.worldatlas.com/aatlas/infopage/oceans.htm'
  },
  {
    id: 'arctic-ocean',
    name: 'Arctic Ocean',
    rankBySize: 5,
    rankByDepth: 5,
    areaKm2: 14056000,
    areaSqMiles: 5427000,
    percentageOfWorldOcean: 4.3,
    percentageOfEarthSurface: 2.8,
    averageDepthM: 1205,
    averageDepthFt: 3953,
    deepestPointName: 'Molloy Deep (Fram Strait)',
    deepestPointDepthM: 5550,
    deepestPointDepthFt: 18210,
    deepestPointLocation: 'Fram Strait between Greenland and Svalbard archipelago',
    coordinates: { x: 50, y: 8 },
    volumeKm3: 18750000,
    marginalSeas: [
      'Barents Sea',
      'Beaufort Sea',
      'Chukchi Sea',
      'East Siberian Sea',
      'Greenland Sea',
      'Kara Sea',
      'Laptev Sea',
      'White Sea'
    ],
    majorCurrents: [
      'Transpolar Drift Stream (Transports polar pack ice from Siberian shelves across pole toward Fram Strait)',
      'Beaufort Gyre (Clockwise wind-driven ocean circulation that stores massive cold freshwater reserves)',
      'West Spitsbergen Current (Warm North Atlantic inflow keeping Svalbard ice-free)',
      'East Greenland Current (Major cold polar outflow exporting sea ice into North Atlantic)'
    ],
    keyPhysicalFeatures: [
      'Lomonosov Ridge (1,800 km submarine continental ridge dividing Amerasian and Eurasian basins)',
      'Molloy Deep (5,550 m deep bathymetric rift in the Fram Strait gateway)',
      'Broadest Continental Shelves on Earth (Siberian shelf extends up to 1,500 km offshore)',
      'Gakkel Ridge (Slowest spreading mid-ocean ridge on Earth at <1 cm/year)',
      'Multi-Year Polar Pack Ice (Dynamic reflective ice cap regulating planetary albedo)'
    ],
    geologicalProfile: 'The shallowest and smallest ocean, surrounded almost entirely by the landmasses of Eurasia, North America, and Greenland. Its average depth (1,205 m) is heavily skewed by extensive shallow continental shelves covering over 50% of the seabed.',
    economicAndClimaticRole: 'Acts as Earth\'s global refrigerator through the ice-albedo feedback effect. Retreating summer sea ice is unlocking the Northern Sea Route and Northwest Passage, cutting shipping distances between Europe and Asia by 40%. Estimated to hold approximately 30% of the world\'s undiscovered natural gas reserves.',
    worldAtlasSourceUrl: 'https://www.worldatlas.com/aatlas/infopage/oceans.htm'
  }
];

export const OCEAN_FLOOR_RELIEF_FEATURES: OceanFloorReliefFeature[] = [
  {
    id: 'continental-shelf',
    name: 'Continental Shelf',
    depthRangeM: '0 m to 130–200 m',
    percentageOceanFloor: '7.5% of total ocean floor',
    description: 'The gently sloping submerged edge of a continent extending from the shoreline to the shelf break. Typically smooth and covered in terrigenous sediment.',
    formationProcess: 'Formed by wave erosion and sediment deposition over millions of years, inundated by rising sea levels following the last glacial maximum.',
    examples: ['Siberian Shelf in the Arctic (up to 1,500 km wide)', 'Grand Banks of Newfoundland (Atlantic)', 'East China Sea Shelf (Pacific)']
  },
  {
    id: 'continental-slope',
    name: 'Continental Slope',
    depthRangeM: '200 m to 3,000–4,000 m',
    percentageOceanFloor: '8.5% of total ocean floor',
    description: 'The steep descent connecting the shallow continental shelf to the deep ocean floor. Slopes average 4° to 5° but can reach over 25° in submarine canyons.',
    formationProcess: 'Represents the true boundary between low-density granitic continental crust and dense basaltic oceanic crust, carved by turbidity currents and sediment slumps.',
    examples: ['Congo Canyon (Central Africa)', 'Monterey Canyon (California)', 'Hudson Canyon (Atlantic USA)']
  },
  {
    id: 'continental-rise',
    name: 'Continental Rise',
    depthRangeM: '3,000 m to 4,000 m',
    percentageOceanFloor: '5% of total ocean floor',
    description: 'A thick, gently sloping apron of accumulated sediment at the base of the continental slope, formed by submarine fans and deep-sea turbidity currents.',
    formationProcess: 'Deep-sea sediment avalanches (turbidity currents) slow down upon reaching the level seabed, depositing graded turbidite beds.',
    examples: ['Bengal Fan (Bay of Bengal - World\'s largest submarine sediment fan)', 'Indus Fan (Arabian Sea)', 'Amazon Fan (Atlantic)']
  },
  {
    id: 'abyssal-plain',
    name: 'Abyssal Plains & Basins',
    depthRangeM: '3,000 m to 6,000 m',
    percentageOceanFloor: '54% of total ocean floor (Largest habitat on Earth)',
    description: 'Vast, remarkably flat expanses of the deep ocean floor covered by thick layers of fine marine pelagic sediments (clays, siliceous and calcareous oozes).',
    formationProcess: 'Basaltic oceanic crust produced at mid-ocean ridges is gradually buried and smoothed over millions of years by continuous snowfall of pelagic biogenic sediments.',
    examples: ['Sohm Abyssal Plain (North Atlantic)', 'Argentine Basin (South Atlantic)', 'Bellingshausen Plain (Southern Ocean)']
  },
  {
    id: 'mid-ocean-ridge',
    name: 'Mid-Ocean Ridges (Divergent Boundaries)',
    depthRangeM: '2,000 m to 3,000 m (Peaks rise 2–3 km above plain)',
    percentageOceanFloor: '23% of total ocean floor',
    description: 'A continuous 65,000 km interconnected global chain of volcanic submarine mountains with a central axial rift valley and hydrothermal mineral vents ("black smokers").',
    formationProcess: 'Formed at constructive/divergent tectonic boundaries where upwelling mantle magma creates fresh oceanic lithosphere via seafloor spreading.',
    examples: ['Mid-Atlantic Ridge (16,000 km)', 'East Pacific Rise (Rapid spreading 15 cm/yr)', 'Central Indian Ridge']
  },
  {
    id: 'oceanic-trench',
    name: 'Submarine Trenches & Hadal Depths',
    depthRangeM: '6,000 m to 10,994 m',
    percentageOceanFloor: '1.5% of ocean floor (Extremophile biosphere)',
    description: 'Long, narrow, V-shaped steep-sided depressions plunging to the deepest points on planet Earth. Subjected to pitch darkness, near-freezing temperatures, and crushing pressures exceeding 1,000 atmospheres.',
    formationProcess: 'Formed at destructive convergent plate margins (subduction zones) where an oceanic tectonic plate bends downward and plunges into the asthenosphere.',
    examples: [
      'Mariana Trench / Challenger Deep (10,994 m - Pacific)',
      'Puerto Rico Trench / Milwaukee Deep (8,380 m - Atlantic)',
      'Java / Sunda Trench (7,190 m - Indian Ocean)',
      'South Sandwich Trench (7,075 m - Southern Ocean)',
      'Molloy Deep (5,550 m - Arctic Ocean)'
    ]
  },
  {
    id: 'seamounts-guyots',
    name: 'Seamounts & Guyots (Tablemounts)',
    depthRangeM: 'Submerged peaks rising >1,000 m above seabed',
    percentageOceanFloor: 'Over 100,000 peaks worldwide',
    description: 'Isolated submarine volcanic peaks. Guyots are seamounts whose summits were once eroded flat by wave action when exposed at sea level before subsiding.',
    formationProcess: 'Volcanic activity over mantle hotspots or near spreading ridges. As the tectonic plate cools and drifts away from the heat source, the volcano subsides beneath the waves.',
    examples: ['Emperor Seamount Chain (North Pacific)', 'New England Seamount Chain (Atlantic)', 'Walvis Ridge seamounts']
  }
];

export const OCEAN_DEPTH_COMPARISONS = [
  {
    label: 'Challenger Deep (Mariana Trench)',
    depthM: 10994,
    category: 'deepest_trench',
    notes: 'Deepest point on Earth (Pacific Ocean). Explored by Jacques Piccard & Don Walsh (1960), James Cameron (2012), and Victor Vescovo (2019).'
  },
  {
    label: 'Mount Everest (Inverted for Scale)',
    depthM: 8848,
    category: 'land_benchmark',
    notes: 'Earth\'s highest mountain peak above sea level. If placed in Challenger Deep, its summit would be submerged by 2,146 meters of ocean!'
  },
  {
    label: 'Milwaukee Deep (Puerto Rico Trench)',
    depthM: 8380,
    category: 'deepest_trench',
    notes: 'Deepest point in the Atlantic Ocean, situated along the complex Caribbean subduction boundary.'
  },
  {
    label: 'Java (Sunda) Trench',
    depthM: 7190,
    category: 'deepest_trench',
    notes: 'Deepest point in the Indian Ocean, formed by Australian plate subducting beneath Sunda plate.'
  },
  {
    label: 'Factorian Deep (South Sandwich Trench)',
    depthM: 7075,
    category: 'deepest_trench',
    notes: 'Deepest point in the Southern Ocean (south of 60° S), discovered and named during the Five Deeps Expedition.'
  },
  {
    label: 'Molloy Deep (Fram Strait)',
    depthM: 5550,
    category: 'deepest_trench',
    notes: 'Deepest point in the Arctic Ocean, located in the tectonic gateway between Greenland and Svalbard.'
  },
  {
    label: 'RMS Titanic Shipwreck',
    depthM: 3800,
    category: 'historic_benchmark',
    notes: 'Rests in the abyssal zone of the North Atlantic Ocean, resting on the seabed 600 km south-southeast of Newfoundland.'
  },
  {
    label: 'Average Depth of Global Ocean',
    depthM: 3688,
    category: 'ocean_average',
    notes: 'The average depth across all interconnected oceans on planet Earth (~12,100 feet).'
  },
  {
    label: 'Burj Khalifa (Tallest Skyscraper)',
    depthM: 828,
    category: 'land_benchmark',
    notes: 'World\'s tallest artificial building (828 m). Reaches only into the upper Twilight (Mesopelagic) Zone.'
  },
  {
    label: 'Base of Photochemical Sunlit Zone (Epipelagic)',
    depthM: 200,
    category: 'ocean_zone',
    notes: 'Maximum penetration of sunlight. 90% of all marine life and all photosynthetic coral reefs live above this depth.'
  }
];

