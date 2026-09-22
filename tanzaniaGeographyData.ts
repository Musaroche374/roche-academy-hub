import { TanzaniaRegion } from '../types';

export interface ExtendedTanzaniaRegion extends TanzaniaRegion {
  districts: string[];
  populationApprox: string;
  areaKm2: number;
  physicalLandforms: string[];
  industrialDevelopments: string[];
  transportationLinks: {
    railways: string[];
    highways: string[];
    airports: string[];
    portsWaterways: string[];
    pipelines: string[];
  };
}

export interface TanzaniaPhysicalFeature {
  id: string;
  name: string;
  type: 'mountain' | 'lake' | 'river' | 'rift_valley' | 'plateau' | 'waterfall' | 'volcano';
  elevationOrDepth?: string;
  location: string;
  coordinates: { x: number; y: number };
  description: string;
  geographicalImportance: string;
  nectaFact: string;
}

export interface TanzaniaIndustrialHub {
  id: string;
  name: string;
  category: 'manufacturing' | 'mining_refinery' | 'agro_processing' | 'energy' | 'sez_epz';
  region: string;
  coordinates: { x: number; y: number };
  keyProducts: string[];
  description: string;
  economicOutput: string;
}

export interface TanzaniaTransportNode {
  id: string;
  name: string;
  type: 'sgr_rail' | 'tazara_rail' | 'mgr_rail' | 'highway_corridor' | 'deep_port' | 'lake_port' | 'international_airport' | 'pipeline';
  coordinates: { x: number; y: number };
  routeOrTermini: string;
  significance: string;
  details: string;
}

export const ALL_31_TANZANIA_REGIONS: ExtendedTanzaniaRegion[] = [
  // 1. DAR ES SALAAM
  {
    id: 'dar-es-salaam',
    name: 'Dar es Salaam',
    zone: 'Coastal',
    capital: 'Ilala',
    coordinates: { x: 74, y: 58 },
    districts: ['Ilala', 'Kinondoni', 'Temeke', 'Ubungo', 'Kigamboni'],
    populationApprox: '5,400,000',
    areaKm2: 1393,
    keyFeatures: ['Port of Dar es Salaam', 'Commercial Metropolis', 'Kurasini Creek', 'Kigamboni Bridge (Nyerere Bridge)', 'Bongoyo & Mbudya Marine Reserves'],
    physicalLandforms: ['Indian Ocean Coastline', 'Ruvu Coastal Lowlands', 'Coral Reef Formations', 'Estuaries of Msimbazi & Kurasini'],
    climate: 'Tropical humid coastal climate with bimodal rainfall (Masika in Mar-May, Vuli in Oct-Dec).',
    majorEconomicActivities: ['Maritime international logistics', 'Manufacturing & assembly', 'Financial services & corporate banking', 'Commercial fisheries', 'Hospitality & tourism'],
    industrialDevelopments: [
      'Benjamin William Mkapa Special Economic Zone (Mabibo)',
      'Twiga Cement (Wazo Hill)',
      'Bakhresa Food Complex (Buguruni & Vingunguti)',
      'Kamal Steel & Industrial Park',
      'Kioo Limited Glass Manufacturing',
      'Kinyerezi I & II Natural Gas Power Stations'
    ],
    transportationLinks: {
      railways: ['SGR Phase 1 Terminal (Dar es Salaam Magufuli Station)', 'TAZARA Terminus (Yombo)', 'Central Line (MGR)'],
      highways: ['T1 TANZAM Highway', 'T2 Northern Highway', 'T7 Coastal Highway', 'Dar Rapid Transit (DART - BRT Network)'],
      airports: ['Julius Nyerere International Airport (JNIA - DAR Terminal 3)'],
      portsWaterways: ['Port of Dar es Salaam (Main deep-sea container & bulk terminal)', 'Kigamboni Ferry & Malindi Passenger Ferries to Zanzibar'],
      pipelines: ['Mtwara-Dar es Salaam Natural Gas Pipeline (532 km)', 'TAZAMA Crude Oil Pipeline to Zambia', 'Songosongo Marine Gas Pipeline']
    },
    geographicalImportance: 'Eastern maritime gateway for Tanzania and six landlocked Central African economies (Zambia, DRC, Rwanda, Burundi, Uganda, Malawi).',
    nectaExamFact: 'Dar es Salaam is Tanzania\'s primate city, exhibiting site advantages of a deep drowned-river-valley (ria) natural harbor.'
  },

  // 2. DODOMA
  {
    id: 'dodoma',
    name: 'Dodoma',
    zone: 'Central',
    capital: 'Dodoma City',
    coordinates: { x: 50, y: 52 },
    districts: ['Dodoma City', 'Bahi', 'Chamwino', 'Chemba', 'Kondoa', 'Kongwa', 'Mpwapwa'],
    populationApprox: '3,085,000',
    areaKm2: 41311,
    keyFeatures: ['National Capital of Tanzania', 'State House (Ikulu Chamwino)', 'Bunge (National Assembly)', 'Kondoa Rock Art UNESCO World Heritage', 'University of Dodoma (UDOM)'],
    physicalLandforms: ['Central Semiarid Peneplain Plateau', 'Chenene Hills', 'Bahi Swamp Depression', 'Granitic Inselbergs'],
    climate: 'Semi-arid tropical dry with unimodal rainfall (Nov-Apr, 570mm annual average) and long dry season.',
    majorEconomicActivities: ['National government administration', 'Grape growing & viticulture (Wine)', 'Sunflower seed oil processing', 'Sorghum & millet farming', 'Livestock cattle husbandry'],
    industrialDevelopments: [
      'Nzuguni Industrial Zone & Dry Port',
      'Alko Vintages & Cetawico Wine Distilleries',
      'Central Sunflower Cooking Oil Refining Plants',
      'Kondoa agro-grain processing mills'
    ],
    transportationLinks: {
      railways: ['SGR Phase 2 Electric Line (Dodoma Samia Station)', 'Central Railway Line (MGR) junction'],
      highways: ['T3 Central Corridor Highway (Dar - Morogoro - Dodoma - Singida)', 'Great North Road (Cape to Cairo axis)'],
      airports: ['Msalato International Airport (Under construction)', 'Dodoma Municipal Airport'],
      portsWaterways: ['Dry Port of Dodoma (Inland Container Depot)'],
      pipelines: ['National high-voltage grid transmission hub']
    },
    geographicalImportance: 'Central geographic nexus of Tanzania chosen by Mwalimu Julius Nyerere in 1973 to decentralize administrative development.',
    nectaExamFact: 'Dodoma\'s semi-arid microclimate is created by rain-shadow effects of the Eastern Arc mountain ranges.'
  },

  // 3. ARUSHA
  {
    id: 'arusha',
    name: 'Arusha',
    zone: 'Northern',
    capital: 'Arusha City',
    coordinates: { x: 54, y: 26 },
    districts: ['Arusha City', 'Arusha Rural (Arumeru)', 'Karatu', 'Longido', 'Monduli', 'Ngorongoro'],
    populationApprox: '2,356,000',
    areaKm2: 37576,
    keyFeatures: ['Mount Meru (4,562m stratovolcano)', 'Ngorongoro Crater (Caldera)', 'Gateway to Serengeti', 'East African Community (EAC) Headquarters', 'Olduvai Gorge (Cradle of Humankind)'],
    physicalLandforms: ['Gregory Eastern Rift Valley Escarpment', 'Mount Meru Volcanic Cone', 'Ngorongoro Volcanic Caldera', 'Lake Eyasi & Lake Natron alkaline basins'],
    climate: 'Temperate highland mountain climate with fertile volcanic andisols; bimodal rainfall.',
    majorEconomicActivities: ['International ecotourism & safari operations', 'Floriculture & green bean exports', 'Tanzanite gemstone trade & lapidary', 'Arabica coffee farming', 'Seed multiplication'],
    industrialDevelopments: [
      'Themi Industrial Estate',
      'Arusha Tanzanite Lapidary & Mineral Auction Center',
      'Pyrethrum & Horticultural Processing Mills',
      'A to Z Textile Mills (Long-lasting insecticide-treated mosquito nets - LLINs)',
      'Banana & Dairy Processing Plants'
    ],
    transportationLinks: {
      railways: ['Northern Railway Line (Tanga - Moshi - Arusha)'],
      highways: ['A104 Great North Road to Namanga (Kenya border)', 'Arusha-Moshi-Holili Highway', 'Makuyuni-Ngorongoro tarmac road'],
      airports: ['Kilimanjaro International Airport (KIA - JRO, inter-continental gateway)', 'Arusha Municipal Airport (Safari charter flights)'],
      portsWaterways: ['None (Inland highland hub)'],
      pipelines: ['Natural gas city reticulation feasibility']
    },
    geographicalImportance: 'Geneva of Africa: Diplomatic capital of the East African Community and premier tourism base of the Northern Safari Circuit.',
    nectaExamFact: 'Ngorongoro is the world\'s largest intact volcanic caldera (unflooded, diameter 20 km, area 260 km²).'
  },

  // 4. KILIMANJARO
  {
    id: 'kilimanjaro',
    name: 'Kilimanjaro',
    zone: 'Northern',
    capital: 'Moshi',
    coordinates: { x: 62, y: 28 },
    districts: ['Moshi Urban', 'Moshi Rural', 'Hai', 'Siha', 'Rombo', 'Mwanga', 'Same'],
    populationApprox: '1,860,000',
    areaKm2: 13250,
    keyFeatures: ['Mount Kilimanjaro (Uhuru Peak 5,895m)', 'Chagga homegardens (Kihamba agroforestry)', 'Lake Chala volcanic caldera', 'Nyumba ya Mungu Dam'],
    physicalLandforms: ['Mount Kilimanjaro (Kibo, Mawenzi, Shira cones)', 'Pare Mountains (Eastern Arc)', 'Pangani River Upper Basin', 'Nyumba ya Mungu Reservoir'],
    climate: 'Altitudinal montane zonation: sub-tropical base to alpine heath, moorland, and arctic glaciated summit.',
    majorEconomicActivities: ['Mountaineering and trekking tourism', 'Arabica coffee cultivation', 'Irrigated sugar production (TPC)', 'Banana & vegetable horticulture'],
    industrialDevelopments: [
      'TPC Sugar Factory (Moshi) - largest sugar estate in Northern Tanzania',
      'Kilimanjaro Machine Tools (KMTC)',
      'Tanzania Breweries Moshi Malting Plant',
      'KNCU Coffee Curing Mills'
    ],
    transportationLinks: {
      railways: ['Northern Line linking Tanga port to Moshi and Arusha'],
      highways: ['T2 Northern Highway (Dar - Chalinze - Segera - Moshi - Arusha)', 'Moshi - Holili border link to Taveta (Kenya)'],
      airports: ['Kilimanjaro International Airport (KIA - JRO, shared border with Arusha)'],
      portsWaterways: ['Nyumba ya Mungu inland artisanal water transport'],
      pipelines: ['Pangani river hydro-power conduit']
    },
    geographicalImportance: 'Hosts Africa\'s roof (Kilimanjaro 5,895m) and primary watershed for the Pangani River hydro-basin.',
    nectaExamFact: 'Classic NECTA case study for relief precipitation and vertical ecological vegetation zones.'
  },

  // 5. MWANZA
  {
    id: 'mwanza',
    name: 'Mwanza',
    zone: 'Lake',
    capital: 'Mwanza City',
    coordinates: { x: 30, y: 22 },
    districts: ['Nyamagana', 'Ilemela', 'Magu', 'Misungwi', 'Kwimba', 'Sengerema', 'Ukerewe'],
    populationApprox: '3,690,000',
    areaKm2: 9467,
    keyFeatures: ['Rock City (Granitic tors & Bismarck Rock)', 'Lake Victoria Coastline', 'Ukerewe Island (largest inland lake island in Africa)', 'J.P. Magufuli Kigongo-Busisi 3.2km Bridge'],
    physicalLandforms: ['Lake Victoria Basin Shoreline', 'Granite Tor Inselbergs', 'Ukerewe Archipelagos', 'Speke Gulf'],
    climate: 'Tropical wet-and-dry lake basin climate with convectional breezes.',
    majorEconomicActivities: ['Nile Perch fishing and blast-freezing export', 'Cotton farming and ginning', 'Gold trade logistics', 'Lake freight shipping', 'Rice cultivation'],
    industrialDevelopments: [
      'Fish Processing Plants (Vicfish, Mara Fish, Omega)',
      'MWATEX (Mwanza Textile Mills)',
      'Nyanza Cotton Ginneries',
      'Mwanza Shipyard (Construction of MV Mwanza \'Hapa Kazi Tu\' - 3,500 ton ship)'
    ],
    transportationLinks: {
      railways: ['SGR Phase 5 (Isaka to Mwanza 249 km electric line)', 'Central Railway MGR Mwanza Branch'],
      highways: ['T4 Lake Circuit Highway', 'T8 Shinyanga - Mwanza Highway', 'Kigongo-Busisi 3.2 km Bridge crossing Lake Victoria gulf'],
      airports: ['Mwanza International Airport (MWZ - Cargo fish export hub)'],
      portsWaterways: ['Mwanza North & South Ports (Direct ferry & cargo routes to Bukoba, Entebbe, Kisumu)'],
      pipelines: ['Lake Victoria Water Pipeline to Kahama & Shinyanga']
    },
    geographicalImportance: 'Second largest economic hub of Tanzania and chief port on Africa\'s largest freshwater lake.',
    nectaExamFact: 'Ukerewe in Mwanza is the largest inland lake island in Africa with an area of 530 km².'
  },

  // 6. MBEYA
  {
    id: 'mbeya',
    name: 'Mbeya',
    zone: 'Southern Highlands',
    capital: 'Mbeya City',
    coordinates: { x: 36, y: 76 },
    districts: ['Mbeya City', 'Mbeya Rural', 'Chunya', 'Kyela', 'Rungwe', 'Mbarali'],
    populationApprox: '2,340,000',
    areaKm2: 35954,
    keyFeatures: ['Mount Rungwe (2,960m volcano)', 'Lake Ngozi Caldera Lake', 'Kyela Palm Oil & Cocoa Valley', 'Usangu Floodplain (Mbarali Rice Basins)'],
    physicalLandforms: ['Kipengere Range', 'Poroto Mountains', 'Great Ruaha River Headwaters', 'Lake Nyasa Shoreline in Kyela'],
    climate: 'Cool montane tropical climate with heavy orographic precipitation.',
    majorEconomicActivities: ['Irrigated paddy rice farming (Mbarali)', 'Tea & Arabica coffee cultivation', 'Cocoa and palm oil in Kyela', 'Coal and gold mining in Chunya', 'Cross-border commerce'],
    industrialDevelopments: [
      'Mbeya Cement Company (Songwe)',
      'Kiwira Coal Mine & Power Station',
      'Chunya Alluvial Gold Processing Center',
      'Kyela Cocoa Curing and Palm Oil Mills',
      'Rungwe Tea Blending Factories'
    ],
    transportationLinks: {
      railways: ['TAZARA Railway line (connects to Kapiri Mposhi, Zambia)'],
      highways: ['T1 TANZAM Highway', 'Mbeya-Makambako corridor', 'Kasumulu border road to Malawi'],
      airports: ['Songwe International Airport (MBI)'],
      portsWaterways: ['Itungi Port and Kiwira Port on Lake Nyasa'],
      pipelines: ['TAZAMA Pipeline pumping stations']
    },
    geographicalImportance: 'Southern Highlands granary and logistics bridge linking East Africa with the Southern African Development Community (SADC).',
    nectaExamFact: 'Lake Ngozi in the Poroto mountains is Africa\'s second-largest volcanic crater caldera lake.'
  },

  // 7. MOROGORO
  {
    id: 'morogoro',
    name: 'Morogoro',
    zone: 'Coastal',
    capital: 'Morogoro Municipality',
    coordinates: { x: 60, y: 56 },
    districts: ['Morogoro Urban', 'Morogoro Rural', 'Kilosa', 'Kilombero', 'Ulanga', 'Malinyi', 'Mvomero', 'Gairo'],
    populationApprox: '3,190,000',
    areaKm2: 70624,
    keyFeatures: ['Uluguru Mountains (2,630m)', 'Mikumi National Park', 'Kilombero Valley Ramsar Wetland', 'Sokoine University of Agriculture (SUA)', 'Udzungwa Mountains National Park'],
    physicalLandforms: ['Uluguru Mountains (Eastern Arc)', 'Kilombero River Graben Basin', 'Wami-Ruvu River Catchments', 'Udzungwa Escarpment'],
    climate: 'Humid montane to sub-humid tropical savanna with rich river floodplains.',
    majorEconomicActivities: ['Large-scale sugar cane farming', 'Paddy rice agriculture', 'Tobacco curing and leaf logistics', 'Forestry & timber milling', 'Cereal and spice crops'],
    industrialDevelopments: [
      'Kilombero Sugar Company (Illovo Sugar Africa)',
      'Mtibwa Sugar Estate (Turiani)',
      'Tanzania Tobacco Processing Company (TTPC)',
      'Morogoro Canvas and Leather Industries',
      'Kilosa Sisal Mills'
    ],
    transportationLinks: {
      railways: ['SGR Phase 1 Terminus (Morogoro Station)', 'TAZARA Railway (passes through Kilombero & Ifakara)', 'Central Line (MGR)'],
      highways: ['T1 TANZAM Highway', 'T3 Central Corridor Highway (Branches at Morogoro)'],
      airports: ['Kikwete Airstrip Morogoro'],
      portsWaterways: ['Kilombero River artisanal ferry crossings'],
      pipelines: ['Mtwara-Dar Gas Pipeline adjacent corridor', 'TAZAMA Pipeline']
    },
    geographicalImportance: 'Crucial water catchment for Dar es Salaam water supply (Ruvu River) and agricultural breadbasket for sugar and rice.',
    nectaExamFact: 'The Uluguru mountains are an Eastern Arc biodiversity hotspot with high endemic flora and fauna.'
  },

  // 8. TANGA
  {
    id: 'tanga',
    name: 'Tanga',
    zone: 'Coastal',
    capital: 'Tanga City',
    coordinates: { x: 72, y: 38 },
    districts: ['Tanga City', 'Muheza', 'Pangani', 'Korogwe', 'Lushoto', 'Handeni', 'Kilindi', 'Mkinga', 'Bumbuli'],
    populationApprox: '2,615,000',
    areaKm2: 26667,
    keyFeatures: ['Amboni Limestone Caves', 'Usambara Mountains (Lushoto cool highlands)', 'Pangani River Mouth', 'Chongoleani Marine Terminal (EACOP terminus)'],
    physicalLandforms: ['West & East Usambara Mountains (Eastern Arc)', 'Amboni Karst Limestone Formations', 'Pangani Estuary', 'Indian Ocean Coastal Shelf'],
    climate: 'Tropical warm humid coast with temperate microclimates in the Usambaras.',
    majorEconomicActivities: ['Sisal fiber cultivation & cordage', 'Port cargo handling', 'Cement and building materials manufacturing', 'Tea, cardamom, and spice farming in Usambaras', 'Horticulture'],
    industrialDevelopments: [
      'Tanga Cement Public Limited (Simba Cement)',
      'Rhino Cement Plant (Maweni Limestone)',
      'EACOP Chongoleani Marine Storage & Tank Farm',
      'Katani Limited Sisal Processing Factories',
      'Tanga Fresh Milk Processing Industry'
    ],
    transportationLinks: {
      railways: ['Tanga - Moshi - Arusha Northern Railway'],
      highways: ['T2 Northern Highway via Segera & Korogwe', 'Horohoro border road to Mombasa (Kenya)'],
      airports: ['Tanga Airport'],
      portsWaterways: ['Port of Tanga (Modernized deep water berths)', 'Pangani River ferry'],
      pipelines: ['EACOP (East African Crude Oil Pipeline 1,443 km terminal from Hoima, Uganda)']
    },
    geographicalImportance: 'Oldest port city on mainland Tanzania and the maritime outlet for the historic northern railway and EACOP energy corridor.',
    nectaExamFact: 'Amboni Caves are the most extensive karst limestone underground cave formations in East Africa.'
  },

  // 9. KIGOMA
  {
    id: 'kigoma',
    name: 'Kigoma',
    zone: 'Western',
    capital: 'Kigoma Town',
    coordinates: { x: 12, y: 44 },
    districts: ['Kigoma Urban', 'Kigoma Rural', 'Kasulu', 'Kibondo', 'Kakonko', 'Buhigwe', 'Uvinza'],
    populationApprox: '2,970,000',
    areaKm2: 45066,
    keyFeatures: ['Lake Tanganyika (1,470m deep)', 'Gombe Stream National Park (Jane Goodall)', 'Mahale Mountains National Park', 'Historic Ujiji (Livingstone & Stanley)', 'Uvinza Salt Springs'],
    physicalLandforms: ['Western Albertine Rift Valley Graben', 'Mahale Mountain Horst', 'Malagarasi River Delta Ramsar Site', 'Lake Tanganyika Escarpments'],
    climate: 'Tropical savanna influenced by moist Atlantic/Congo air masses.',
    majorEconomicActivities: ['Dagaa / Lake Tanganyika sardine fishing', 'Oil palm cultivation & palm oil extraction', 'Cross-lake freight trade with DRC, Burundi, and Zambia', 'Salt brine mining at Uvinza'],
    industrialDevelopments: [
      'Kigoma Special Economic Zone (KSEZ)',
      'Nyanza Salt Mines (Uvinza - salt extraction since pre-colonial times)',
      'Palm Oil Processing Mills in Kigoma and Kasulu',
      'Lake Tanganyika Fish Sun-drying and Blast Freezing Facilities'
    ],
    transportationLinks: {
      railways: ['Central Railway Line (MGR) Terminus at Kigoma Port', 'Planned SGR Phase 6 (Tabora to Kigoma)'],
      highways: ['Kigoma-Biharamulo-Mwanza corridor', 'Kigoma-Uvinza-Mpanda Highway', 'Manyovu border to Burundi'],
      airports: ['Kigoma Airport'],
      portsWaterways: ['Port of Kigoma (Home of the historic MV Liemba built in 1913)', 'Kibirizi Artisanal Fishery Port'],
      pipelines: ['Proposed gas pipeline link from Burundi border']
    },
    geographicalImportance: 'Westernmost maritime gateway connecting Tanzania across Lake Tanganyika to Kalemie/Baraka (DRC), Bujumbura (Burundi), and Mpulungu (Zambia).',
    nectaExamFact: 'Lake Tanganyika is the world\'s longest freshwater lake (673 km) and second deepest (1,470 m).'
  },

  // 10. KAGERA
  {
    id: 'kagera',
    name: 'Kagera',
    zone: 'Lake',
    capital: 'Bukoba',
    coordinates: { x: 18, y: 16 },
    districts: ['Bukoba Urban', 'Bukoba Rural', 'Muleba', 'Karagwe', 'Kyerwa', 'Missenyi', 'Ngara', 'Biharamulo'],
    populationApprox: '3,200,000',
    areaKm2: 35686,
    keyFeatures: ['Kagera River (Source head of Nile)', 'Rusumo Falls (80 MW Hydro Power)', 'Robusta Coffee Belt', 'Lake Victoria Western Shore', 'Burigi-Chato National Park'],
    physicalLandforms: ['Kagera River Basin', 'Western Lake Victoria Highlands', 'Karagwe Ridges and Plateaus', 'Rusumo Falls Gorge'],
    climate: 'High rainfall equatorial lake basin climate, well-distributed throughout the year.',
    majorEconomicActivities: ['Robusta & Arabica coffee cultivation', 'Banana / Matoke horticulture', 'Sugar cane production', 'Cross-border commerce with Uganda, Rwanda, Burundi'],
    industrialDevelopments: [
      'Kagera Sugar Limited (Kyaka - Missenyi)',
      'Bukoba TANICA Instant Coffee Processing Factory',
      'Kagera Cooperative Union (KCU) Coffee Curing Factories',
      'Rusumo Regional Hydroelectric Project (80 MW)'
    ],
    transportationLinks: {
      railways: ['Proposed Isaka - Rusumo - Kigali SGR Link'],
      highways: ['T4 Highway to Uganda (Mutukula border)', 'Rusumo border crossing to Rwanda', 'Kabanga border to Burundi'],
      airports: ['Bukoba Airport'],
      portsWaterways: ['Bukoba Port (Lake Victoria)', 'Kemondo Bay Deep Water Ferry Pier'],
      pipelines: ['EACOP corridor passes through Kagera from Hoima']
    },
    geographicalImportance: 'Borders three EAC nations (Uganda, Rwanda, Burundi) and contains the Kagera River feeding Lake Victoria and the White Nile.',
    nectaExamFact: 'Kagera River contributes the single largest tributary water inflow volume into Lake Victoria.'
  },

  // 11. GEITA
  {
    id: 'geita',
    name: 'Geita',
    zone: 'Lake',
    capital: 'Geita Town',
    coordinates: { x: 26, y: 28 },
    districts: ['Geita', 'Bukombe', 'Chato', 'Mbogwe', 'Nyang\'hwale'],
    populationApprox: '2,980,000',
    areaKm2: 20054,
    keyFeatures: ['Geita Goldfields', 'Rubondo Island National Park (in Lake Victoria)', 'Cotton & Gold Trade Hub'],
    physicalLandforms: ['Archaean Greenstone Belt', 'Lake Victoria Southern Bays', 'Granitic Ridges'],
    climate: 'Tropical wet-and-dry savanna with lake basin influences.',
    majorEconomicActivities: ['Large-scale and artisanal gold mining', 'Cotton cultivation', 'Cassava and maize farming', 'Lake fishing in Chato'],
    industrialDevelopments: [
      'Geita Gold Mine (AngloGold Ashanti - largest open-pit and underground gold mine in Tanzania)',
      'Geita Gold Refinery (State-of-the-art gold smelting and assaying)',
      'Buckreef Gold Project',
      'Cotton Ginneries in Bukombe and Mbogwe'
    ],
    transportationLinks: {
      railways: ['SGR Phase 5 route alignment', 'Proximity to Isaka dry port rail head'],
      highways: ['Geita-Mwanza Highway', 'Chato-Bukoba tarmac road', 'Isaka-Geita link'],
      airports: ['Geita Airport (Chato)'],
      portsWaterways: ['Nungwe Bay and Chato lake piers on Lake Victoria'],
      pipelines: ['Lake Victoria Potable Water Pipeline network']
    },
    geographicalImportance: 'Heart of the Lake Victoria Goldfield Greenstone Belt producing the highest volume of gold exports in East Africa.',
    nectaExamFact: 'Geita\'s Archaean Greenstone belt geology hosts banded iron formations (BIF) rich in hydrothermal gold deposits.'
  },

  // 12. MARA
  {
    id: 'mara',
    name: 'Mara',
    zone: 'Lake',
    capital: 'Musoma',
    coordinates: { x: 38, y: 16 },
    districts: ['Musoma Urban', 'Musoma Rural', 'Bunda', 'Serengeti', 'Tarime', 'Rorya', 'Butiama'],
    populationApprox: '2,370,000',
    areaKm2: 21760,
    keyFeatures: ['Birthplace of Mwalimu Julius Nyerere (Butiama)', 'Mara River (Wildebeest migration crossing)', 'North Mara Goldfields', 'Serengeti National Park (North sector)'],
    physicalLandforms: ['Mara River Basin', 'Lake Victoria Eastern Shoreline', 'Serengeti Plain Savannas', 'Tarime Volcanic Escarpment'],
    climate: 'Tropical savanna to temperate highland climate in Tarime.',
    majorEconomicActivities: ['Commercial gold mining', 'Cattle pastoralism and beef production', 'Fisheries on Lake Victoria', 'Coffee and tea in Tarime highlands', 'Cotton in Bunda'],
    industrialDevelopments: [
      'North Mara Gold Mine (Barrick Gold - Tarime)',
      'Musoma Dairy Industry (Milk & butter processing)',
      'Prime Catch & Musoma Fish Processors',
      'Bunda Cotton Ginneries'
    ],
    transportationLinks: {
      railways: ['Planned railway extension linking Musoma port to Arusha'],
      highways: ['Mwanza-Musoma-Sirari Highway (Sirari border to Kenya)'],
      airports: ['Musoma Municipal Airport', 'Seronera Airstrip in Serengeti'],
      portsWaterways: ['Port of Musoma (Lake Victoria rail wagon ferry pier)'],
      pipelines: ['None']
    },
    geographicalImportance: 'The Mara River basin sustains the annual Great Migration of over 1.5 million wildebeest and zebras.',
    nectaExamFact: 'Mara River is an international shared watercourse originating in Kenya\'s Mau Escarpment and discharging into Lake Victoria.'
  },

  // 13. SHINYANGA
  {
    id: 'shinyanga',
    name: 'Shinyanga',
    zone: 'Lake',
    capital: 'Shinyanga Municipality',
    coordinates: { x: 34, y: 34 },
    districts: ['Shinyanga Urban', 'Shinyanga Rural', 'Kahama Urban', 'Msalala', 'Ushetu', 'Kishapu'],
    populationApprox: '2,240,000',
    areaKm2: 18901,
    keyFeatures: ['Williamson Diamond Mine (Mwadui)', 'Kahama Gold & Logistics Corridor', 'Ngasamo Hills', 'Sukumaland cultural heartland'],
    physicalLandforms: ['Dry Central Peneplain', 'Kimberlite Diamond Pipes of Mwadui', 'Manonga River Drainage Basin'],
    climate: 'Semi-arid tropical dry savanna with unpredictable unimodal precipitation.',
    majorEconomicActivities: ['Diamond extraction and sorting', 'Gold mining and trading (Kahama)', 'Cotton cultivation', 'Livestock cattle keeping', 'Paddy rice farming'],
    industrialDevelopments: [
      'Williamson Diamond Mine (Mwadui - historic open-pit Kimberlite pipe operational since 1940)',
      'Bulyanhulu Gold Mine (Kahama)',
      'Kahama International Gold Market & Refinery',
      'Shinyanga Cotton Ginneries & Edible Oil Extraction Plants'
    ],
    transportationLinks: {
      railways: ['SGR Phase 4 and 5 intersection at Isaka Dry Port', 'Central Railway MGR Mwanza line'],
      highways: ['T8 Shinyanga-Tabora Highway', 'T3 Central Corridor (Kahama to Rwanda/Burundi border)'],
      airports: ['Shinyanga Airport (Ibadakuli)', 'Kahama Airstrip'],
      portsWaterways: ['Isaka Dry Port (Inland container terminal for Rwanda and DRC)'],
      pipelines: ['Lake Victoria-Kahama-Shinyanga Water Supply Pipeline']
    },
    geographicalImportance: 'Hosts the Mwadui Kimberlite pipe, the world\'s largest diamondiferous volcanic pipe mined continuously.',
    nectaExamFact: 'Mwadui Kimberlite pipe occupies an area of 146 hectares, recognized as the world\'s largest economic diamond pipe.'
  },

  // 14. TABORA
  {
    id: 'tabora',
    name: 'Tabora',
    zone: 'Western',
    capital: 'Tabora Municipality',
    coordinates: { x: 28, y: 46 },
    districts: ['Tabora Urban', 'Uyui', 'Nzega', 'Igunga', 'Sikonge', 'Urambo', 'Kaliua'],
    populationApprox: '3,390,000',
    areaKm2: 76151,
    keyFeatures: ['Historic Central Railway Junction', 'Virginia Tobacco Heartland', 'Miombo Woodlands & Beekeeping (Honey)', 'Livingstone & Stanley Kwihara Museum'],
    physicalLandforms: ['Central Plateau Flatlands', 'Wembere Swamp Depression', 'Malagarasi River Upper Basin', 'Igombe Dam'],
    climate: 'Tropical wet-and-dry with extensive sub-humid Miombo woodlands.',
    majorEconomicActivities: ['Flue-cured Virginia tobacco cultivation', 'Bee-keeping and organic honey exports', 'Maize, groundnuts, and sunflower farming', 'Timber and forestry'],
    industrialDevelopments: [
      'Tabora Tobacco Processors & Leaf Warehouse Complexes',
      'Tabora Organic Honey and Beeswax Processing Plants',
      'Nzega Golden Pride Tailings & Agro Mills',
      'Central Railway Engineering Workshop'
    ],
    transportationLinks: {
      railways: ['Central Railway Line (MGR) chief railway junction where line splits to Kigoma and Mwanza', 'SGR Phase 3 (Makutupora to Tabora 368 km) and Phase 4 (Tabora to Isaka)'],
      highways: ['T3 Central Corridor via Nzega & Igunga', 'Tabora-Manyoni tarmac road', 'Tabora-Mpanda corridor'],
      airports: ['Tabora Airport'],
      portsWaterways: ['None'],
      pipelines: ['EACOP pipeline route traversal across Tabora region']
    },
    geographicalImportance: 'Historic junction point of 19th-century caravan trade routes and the modern hub of Tanzania\'s railway systems.',
    nectaExamFact: 'Tabora produces over 60% of Tanzania\'s flue-cured Virginia tobacco and is East Africa\'s premier honey exporter.'
  },

  // 15. SINGIDA
  {
    id: 'singida',
    name: 'Singida',
    zone: 'Central',
    capital: 'Singida Municipality',
    coordinates: { x: 42, y: 44 },
    districts: ['Singida Urban', 'Singida Rural', 'Iramba', 'Manyoni', 'Ikungi', 'Mkalama', 'Itigi'],
    populationApprox: '2,000,000',
    areaKm2: 49340,
    keyFeatures: ['Lake Singida & Lake Kindai (Soda Lakes with Flamingos)', 'Wind Energy Generation Corridor', 'Sunflower Capital of Tanzania', 'Rungwa Game Reserve'],
    physicalLandforms: ['Rift Valley Western Escarpment fault blocks', 'Lake Singida and Kindai soda basins', 'Wembere Depression', 'Granite kopjes'],
    climate: 'Semi-arid steppe with strong seasonal winds and low rainfall.',
    majorEconomicActivities: ['Sunflower farming and cooking oil extraction', 'Onion horticulture', 'Livestock cattle and goat pastoralism', 'Gypsum and salt extraction', 'Wind power energy'],
    industrialDevelopments: [
      'Singida Sunflower Oil Mill Industrial Cluster (Over 40 medium and large refining mills)',
      'Sekenke Gold Mine (Historical gold district)',
      'Singida Wind Power Farm (50 MW project)',
      'Manyoni Gypsum Mining Mills'
    ],
    transportationLinks: {
      railways: ['Central Railway Line (MGR) passing through Manyoni and Itigi', 'SGR line traverses Singida'],
      highways: ['T3 Central Corridor Highway (Morogoro-Dodoma-Singida-Nzega)', 'Singida-Babati-Arusha tarmac link'],
      airports: ['Singida Airstrip'],
      portsWaterways: ['None'],
      pipelines: ['EACOP corridor alignment through Manyoni district']
    },
    geographicalImportance: 'Bridge linking the Central and Northern zones and the primary edible cooking oil manufacturing center in East Africa.',
    nectaExamFact: 'Singida experiences high average wind speeds exceeding 8 m/s, making it prime for utility-scale wind power.'
  },

  // 16. IRINGA
  {
    id: 'iringa',
    name: 'Iringa',
    zone: 'Southern Highlands',
    capital: 'Iringa Municipality',
    coordinates: { x: 48, y: 66 },
    districts: ['Iringa Urban', 'Iringa Rural', 'Kilolo', 'Mufindi'],
    populationApprox: '1,190,000',
    areaKm2: 35743,
    keyFeatures: ['Ruaha National Park (Tanzania\'s premier predator haven)', 'Mtera Dam & Reservoir', 'Mufindi Tea Estates & Escarpment (Cool temperate)', 'Isimila Stone Age Site (Prehistoric handaxes and sandstone pillars)', 'Chief Mkwawa Memorial (Kalenga)'],
    physicalLandforms: ['Iringa Highland Horst', 'Great Ruaha River Gorge', 'Isimila Sandstone Canyons', 'Mufindi Escarpment'],
    climate: 'Temperate highland climate with cool winters and heavy relief rain in Mufindi.',
    majorEconomicActivities: ['Commercial timber and pulpwood forestry', 'Tea and pyrethrum estates', 'Maize and tomato commercial farming', 'Ruaha eco-tourism', 'Hydro-power generation at Mtera'],
    industrialDevelopments: [
      'Mufindi Paper Mills (Sao Hill - largest integrated paper and pulp mill in East Africa)',
      'Sao Hill Commercial Timber and Sawmills',
      'Unilever Tea and Brooke Bond Mufindi Processing Factories',
      'DABAGA Vegetable & Fruit Canning Industry',
      'Mtera Dam Hydroelectric Power Station (80 MW)'
    ],
    transportationLinks: {
      railways: ['TAZARA Railway (traversing Southern Iringa and Makambako borders)'],
      highways: ['T1 TANZAM Highway (Dar - Morogoro - Iringa - Mbeya)', 'Iringa-Dodoma tarmac highway'],
      airports: ['Nduli Airport (Iringa)'],
      portsWaterways: ['Mtera Reservoir inland artisanal transport'],
      pipelines: ['TAZAMA Pipeline pumping network']
    },
    geographicalImportance: 'Houses the headwaters of the Great Ruaha River and Sao Hill, Africa\'s largest planted commercial pine and eucalyptus forest.',
    nectaExamFact: 'Isimila site contains one of the richest Acheulean Stone Age tool assemblages discovered anywhere in the world.'
  },

  // 17. NJOMBE
  {
    id: 'njombe',
    name: 'Njombe',
    zone: 'Southern Highlands',
    capital: 'Njombe Town',
    coordinates: { x: 44, y: 78 },
    districts: ['Njombe Urban', 'Njombe Rural', 'Makambako', 'Wanging\'ombe', 'Ludewa', 'Makete'],
    populationApprox: '890,000',
    areaKm2: 21347,
    keyFeatures: ['Kipengere Range (Livingstone Mountains)', 'Irish Potato Capital', 'Mchuchuma Coal & Liganga Iron Ore Deposits', 'Luhuji River Falls', 'Kitulo National Park (\'Serengeti of Flowers\')'],
    physicalLandforms: ['Livingstone Mountains fault scarp plunges directly into Lake Nyasa', 'Kitulo Plateau montane grassland', 'Ruhuhu Basin'],
    climate: 'Cool montane temperate climate; temperatures occasionally drop near freezing in July.',
    majorEconomicActivities: ['Irish potato & avocado farming', 'Timber and pine forestry', 'Tea and pyrethrum farming', 'Crossroads commerce at Makambako', 'Coal and iron mining development'],
    industrialDevelopments: [
      'Liganga Iron Ore & Mchuchuma Coal Industrial Project (Ludewa)',
      'Wanging\'ombe & Njombe Tea Processing Plants',
      'Makambako Modern Grain Silos and Logistics Depot',
      'Njombe Avocado Oil Extraction & Export Packing Houses'
    ],
    transportationLinks: {
      railways: ['TAZARA Railway passes directly through Makambako Junction'],
      highways: ['T1 TANZAM Highway through Makambako', 'Njombe-Songea Highway', 'Makete mountain feeder roads'],
      airports: ['Njombe Airstrip'],
      portsWaterways: ['Manda Port on Lake Nyasa in Ludewa district'],
      pipelines: ['None']
    },
    geographicalImportance: 'Kitulo Plateau is protected as Africa\'s first floral national park for rare orchids and birds.',
    nectaExamFact: 'Liganga holds an estimated 1.2 billion tons of titaniferous magnetite iron ore, one of the world\'s major unexploited deposits.'
  },

  // 18. RUVUMA
  {
    id: 'ruvuma',
    name: 'Ruvuma',
    zone: 'Southern Highlands',
    capital: 'Songea',
    coordinates: { x: 50, y: 84 },
    districts: ['Songea Urban', 'Songea Rural', 'Mbinga', 'Nyasa', 'Namtumbo', 'Tunduru', 'Madaba'],
    populationApprox: '1,848,000',
    areaKm2: 63669,
    keyFeatures: ['Ruvuma River (International border with Mozambique)', 'Mbinga Arabica Coffee Slopes', 'Lake Nyasa Shoreline & Mbamba Bay', 'Maji Maji War Memorial in Songea', 'Tunduru Gemstones (Sapphires, Tourmalines)'],
    physicalLandforms: ['Matengo Highlands', 'Lake Nyasa Shoreline and Escarpment', 'Ruvuma River Valley', 'Selous/Nyerere Ecosystem South Buffer'],
    climate: 'Tropical wet-and-dry with abundant unimodal rainfall sustaining high crop yields.',
    majorEconomicActivities: ['Maize granary farming', 'Mbinga specialty Arabica coffee farming', 'Artisanal gemstone mining in Tunduru', 'Cassava and cashew in Namtumbo', 'Lake Nyasa fisheries'],
    industrialDevelopments: [
      'Mbinga Coffee Curing Mills and Pulperies',
      'Songea National Milling Corporation Silos',
      'Tunduru Alluvial Gemstone Processing',
      'Ngaka Coal Mine (Tancoal - produces thermal coal for domestic cement industries)'
    ],
    transportationLinks: {
      railways: ['Proposed Mtwara Development Corridor Rail Link from Mtwara Port to Mbamba Bay Port'],
      highways: ['Mtwara-Masasi-Tunduru-Songea-Mbamba Bay Corridor (T6 Highway connecting Indian Ocean to Lake Nyasa)'],
      airports: ['Songea Airport'],
      portsWaterways: ['Port of Mbamba Bay (Lake Nyasa link to Malawi)'],
      pipelines: ['Proposed Mozambique border energy links']
    },
    geographicalImportance: 'Terminal gateway of the Mtwara Development Corridor linking the Indian Ocean to Lake Nyasa.',
    nectaExamFact: 'Matengo people in Mbinga developed traditional \'ngoro\' pit-cultivation farming to control steep mountain soil erosion.'
  },

  // 19. SONGWE
  {
    id: 'songwe',
    name: 'Songwe',
    zone: 'Southern Highlands',
    capital: 'Vwawa',
    coordinates: { x: 32, y: 74 },
    districts: ['Vwawa', 'Mbozi', 'Momba', 'Songwe', 'Ileje', 'Tunduma'],
    populationApprox: '1,340,000',
    areaKm2: 27656,
    keyFeatures: ['Tunduma Border Post (Busiest commercial border post with Zambia)', 'Mbozi Meteorite (One of the largest nickel-iron meteorites in the world)', 'Lake Rukwa Southern Shores', 'Coffee Estates'],
    physicalLandforms: ['Mbozi Plateau', 'Songwe River Rift Valley', 'Lake Rukwa Alkaline Basin', 'Ileje Mountain Scarp'],
    climate: 'Cool highland to sub-tropical savanna with fertile soils.',
    majorEconomicActivities: ['Cross-border transit trade at Tunduma', 'Coffee farming in Mbozi', 'Coal mining and cement in Songwe river basin', 'Paddy rice in Momba'],
    industrialDevelopments: [
      'Songwe Industrial Lime and Fertilizer Works',
      'Mbozi Coffee Curing Company',
      'Tunduma One-Stop Border Post Logistics Depot',
      'Panda Hill Niobium Project (World-class niobium deposit)'
    ],
    transportationLinks: {
      railways: ['TAZARA Railway line enters Zambia at Tunduma'],
      highways: ['T1 TANZAM Highway (Principal freight artery carrying copper from Zambia/DRC to Dar es Salaam port)'],
      airports: ['Serviced by neighboring Songwe Airport (MBI) in Mbeya'],
      portsWaterways: ['Lake Rukwa fishing landings'],
      pipelines: ['TAZAMA Pipeline crosses Songwe into Zambia']
    },
    geographicalImportance: 'Tunduma is the vital international customs choke-point handling billions in trade between East Africa and the Southern African Copperbelt.',
    nectaExamFact: 'Mbozi Meteorite is an iron-nickel octahedrite meteorite weighing approximately 16 metric tons, discovered in 1930.'
  },

  // 20. RUKWA
  {
    id: 'rukwa',
    name: 'Rukwa',
    zone: 'Southern Highlands',
    capital: 'Sumbawanga',
    coordinates: { x: 22, y: 64 },
    districts: ['Sumbawanga Urban', 'Sumbawanga Rural', 'Nkasi', 'Kalambo'],
    populationApprox: '1,540,000',
    areaKm2: 27765,
    keyFeatures: ['Kalambo Falls (235m single-drop waterfall into Lake Tanganyika)', 'Lake Rukwa Shallow Graben Lake', 'Ufipa Plateau Granary'],
    physicalLandforms: ['Ufipa Plateau Horst', 'Rukwa Graben Rift Depression', 'Lake Tanganyika Eastern Shore', 'Kalambo Gorge'],
    climate: 'Cool montane plateau climate with dependable rainfall and high cereal productivity.',
    majorEconomicActivities: ['Commercial maize, sunflower, and bean farming', 'Lake Rukwa tilapia fisheries', 'Cross-border trade with Northern Zambia and DRC', 'Copper & gemstone exploration'],
    industrialDevelopments: [
      'Sumbawanga National Food Reserve Silos',
      'Kasanga Port Fish Packing and Cold Storage',
      'Matai Maize Flour Processing Mills'
    ],
    transportationLinks: {
      railways: ['Proposed spur connecting Sumbawanga to TAZARA or Central Line'],
      highways: ['Tabora-Mpanda-Sumbawanga-Tunduma Highway', 'Sumbawanga-Kasanga port tarmac road'],
      airports: ['Sumbawanga Airport'],
      portsWaterways: ['Port of Kasanga on Lake Tanganyika (Modernized berth handling cargo to Zambia and DRC)'],
      pipelines: ['None']
    },
    geographicalImportance: 'Home of Kalambo Falls, the second-highest uninterrupted single-drop waterfall on the African continent.',
    nectaExamFact: 'Kalambo Falls drops 235 meters on the Tanzania-Zambia border and preserves continuous archaeological evidence from Acheulean times.'
  },

  // 21. KATAVI
  {
    id: 'katavi',
    name: 'Katavi',
    zone: 'Western',
    capital: 'Mpanda',
    coordinates: { x: 20, y: 54 },
    districts: ['Mpanda Urban', 'Tanganyika', 'Mlele'],
    populationApprox: '1,150,000',
    areaKm2: 45843,
    keyFeatures: ['Katavi National Park (Pristine wilderness with huge hippo and buffalo herds)', 'Karema Port on Lake Tanganyika', 'Alluvial Gold & Forestry'],
    physicalLandforms: ['Katavi Floodplain & Marshlands', 'Lake Katavi & Lake Chada', 'Western Rift Escarpment', 'Lake Tanganyika Shore at Karema'],
    climate: 'Tropical wet-and-dry with fertile alluvium in the Katuma river basin.',
    majorEconomicActivities: ['Maize and paddy rice agriculture', 'Artisanal gold mining', 'Commercial timber harvesting', 'Wildlife tourism in Katavi', 'Lake trade via Karema port'],
    industrialDevelopments: [
      'Mpanda Alluvial Gold Processing Center',
      'Karema Port Modernized Multipurpose Terminal',
      'Katavi Rice & Sunflower Processing Mills'
    ],
    transportationLinks: {
      railways: ['Mpanda Branch line connecting to Central Railway MGR at Kaliua (210 km)'],
      highways: ['Tabora-Inyonga-Mpanda tarmac road', 'Mpanda-Uvinza-Kigoma highway'],
      airports: ['Mpanda Airport'],
      portsWaterways: ['Karema Port on Lake Tanganyika (Modern terminal built in 2022 to boost DRC trade)'],
      pipelines: ['None']
    },
    geographicalImportance: 'Pristine biodiversity refuge and new trade link across Lake Tanganyika to Kalemie, DRC via Karema Port.',
    nectaExamFact: 'Katuma River and Lake Katavi harbor the highest density of hippopotamuses in East Africa during the dry season.'
  },

  // 22. LINDI
  {
    id: 'lindi',
    name: 'Lindi',
    zone: 'Coastal',
    capital: 'Lindi Municipality',
    coordinates: { x: 72, y: 74 },
    districts: ['Lindi Urban', 'Kilwa', 'Ruangwa', 'Nachingwea', 'Liwale', 'Mtama'],
    populationApprox: '1,190,000',
    areaKm2: 66040,
    keyFeatures: ['Kilwa Kisiwani & Songo Mnara UNESCO World Heritage Ruins', 'Songo Songo Island Natural Gas Fields', 'Ruangwa Graphite Deposits', 'Tendaguru Dinosaur Fossil Beds'],
    physicalLandforms: ['Indian Ocean Coastline', 'Rondo Plateau', 'Kilwa Archipelago & Barrier Islands', 'Matandu River Basin'],
    climate: 'Tropical coastal climate with savanna interior; bimodal coastal rainfall.',
    majorEconomicActivities: ['Natural gas production at Songo Songo', 'Cashew nut cultivation and export', 'Graphite mining in Ruangwa', 'Artisanal marine fisheries', 'Heritage tourism at Kilwa Kisiwani'],
    industrialDevelopments: [
      'Songo Songo Natural Gas Processing Plant & Pipeline (Supplies gas to Dar es Salaam power plants)',
      'Ruangwa Graphite Project (Supplies battery-grade flake graphite for global electric vehicles)',
      'Kilwa Industrial Salt Works',
      'Nachingwea Cashew Nut Processing Factory'
    ],
    transportationLinks: {
      railways: ['Historical Nachingwea Groundnut Scheme rail bed'],
      highways: ['T7 Coastal Highway via Mkapa Bridge across Rufiji to Lindi and Mtwara'],
      airports: ['Lindi Airstrip', 'Kilwa Masoko Airstrip'],
      portsWaterways: ['Kilwa Masoko Deep Harbor', 'Lindi Port and Songo Songo Gas marine jetty'],
      pipelines: ['Songo Songo to Dar es Salaam Marine Natural Gas Pipeline']
    },
    geographicalImportance: 'Kilwa was the medieval trading metropolis controlling the East African gold trade from Great Zimbabwe; Songo Songo powers national electricity.',
    nectaExamFact: 'Tendaguru in Lindi yielded the famous Giraffatitan (Brachiosaurus brancai) dinosaur fossils, one of the largest land animals ever discovered.'
  },

  // 23. MTWARA
  {
    id: 'mtwara',
    name: 'Mtwara',
    zone: 'Coastal',
    capital: 'Mtwara Municipal',
    coordinates: { x: 74, y: 82 },
    districts: ['Mtwara Urban', 'Mtwara Rural', 'Masasi Urban', 'Masasi Rural', 'Newala', 'Nanyumbu', 'Tandahimba'],
    populationApprox: '1,630,000',
    areaKm2: 16710,
    keyFeatures: ['Port of Mtwara (Natural Deepwater Harbor)', 'Mnazi Bay Natural Gas Marine Basin', 'Makonde Plateau (Makonde Woodcarvings)', 'Ruvuma River Delta', 'Cashew Nut Capital'],
    physicalLandforms: ['Mtwara Bay Ria Drowned Harbor', 'Makonde Sandstone Plateau', 'Ruvuma Estuary and Mangroves', 'Mnazi Bay Marine Park'],
    climate: 'Tropical coastal warm humid climate with a long dry season.',
    majorEconomicActivities: ['Cashew nut production (Tanzania\'s largest producer)', 'Natural gas extraction & processing', 'Deep-sea cement manufacturing', 'Cassava and sesame farming', 'Marine fisheries'],
    industrialDevelopments: [
      'Dangote Cement Factory (Mtwara) - Largest cement manufacturing plant in Sub-Saharan East Africa (3.0M MT/yr) with private coal power plant and marine jetty',
      'Mnazi Bay Natural Gas Processing Facility',
      'Mtwara Port Container & General Cargo Terminal',
      'Cashew Nut Processing Plants in Masasi and Tandahimba'
    ],
    transportationLinks: {
      railways: ['Proposed Mtwara Development Corridor Railway to Songea and Mbamba Bay'],
      highways: ['T7 Coastal Highway to Dar es Salaam', 'Mtwara Corridor Highway to Masasi and Tunduru', 'Unity Bridge across Ruvuma River to Mozambique'],
      airports: ['Mtwara Airport'],
      portsWaterways: ['Port of Mtwara (Deepest natural harbor on East African coast capable of handling post-Panamax vessels)'],
      pipelines: ['Mtwara-Dar es Salaam 532 km, 36-inch Natural Gas Pipeline (Transports Mnazi Bay gas to Kinyerezi power plants)']
    },
    geographicalImportance: 'Energy and heavy industry powerhouse of southern Tanzania, anchor of the Mtwara Development Corridor.',
    nectaExamFact: 'Mtwara Port possesses a natural entrance channel depth of over 20 meters, requiring no maintenance dredging.'
  },

  // 24. PWANI (COAST)
  {
    id: 'pwani',
    name: 'Pwani (Coast)',
    zone: 'Coastal',
    capital: 'Kibaha',
    coordinates: { x: 68, y: 60 },
    districts: ['Kibaha Urban', 'Kibaha Rural', 'Bagamoyo', 'Chalinze', 'Kisarawe', 'Mkuranga', 'Rufiji', 'Mafia Island', 'Kibiti'],
    populationApprox: '2,020,000',
    areaKm2: 32407,
    keyFeatures: ['Julius Nyerere Hydropower Project (2,115 MW JNHPP at Stiegler\'s Gorge on Rufiji River)', 'Historic Bagamoyo (Caravan terminus & German colonial capital)', 'Mafia Island Marine Park (Whale sharks & coral atolls)', 'Benjamin Mkapa Bridge over Rufiji River'],
    physicalLandforms: ['Rufiji River Lower Floodplain & Delta (Largest mangrove forest in East Africa)', 'Pugu Hills Kaolin Formations', 'Mafia Archipelago', 'Ruvu Lowlands'],
    climate: 'Tropical coastal humid with generous rainfall in the coastal belt.',
    majorEconomicActivities: ['Hydro-power generation', 'Heavy and light manufacturing in Kibaha industrial corridor', 'Cashew and coconut farming', 'Marine fisheries and prawn trawling in Rufiji Delta', 'Diving tourism in Mafia'],
    industrialDevelopments: [
      'Julius Nyerere Hydropower Dam (JNHPP - 2,115 MW, 9 turbines, transforming national electricity generation)',
      'Bagamoyo Sugar Factory',
      'Kibaha Industrial Parks (Tile, ceramic, plastic, and pharmaceutical manufacturing)',
      'Sayona Drinks and Food Complex',
      'Kilwa / Mafia Prawn Processing Plants'
    ],
    transportationLinks: {
      railways: ['SGR Phase 1 traverses Pwani (Ruvu and Soga stations)', 'TAZARA line traverses Kisarawe and Rufiji', 'Central Railway Line'],
      highways: ['T1 TANZAM Highway via Chalinze', 'T2 Northern Highway via Chalinze-Segera', 'T7 Coastal Highway via Mkapa Bridge'],
      airports: ['Mafia Island Airport (MFA)'],
      portsWaterways: ['Bagamoyo Historical Port', 'Kilindoni Port on Mafia Island', 'Rufiji Delta artisanal waterways'],
      pipelines: ['Mtwara-Dar Gas Pipeline and TAZAMA Pipeline traverse Pwani region']
    },
    geographicalImportance: 'Hosts the 2,115 MW Julius Nyerere Hydropower project, the largest hydroelectric installation in East Africa.',
    nectaExamFact: 'Rufiji Delta contains over 53,000 hectares of mangrove forests, representing the largest continuous mangrove ecosystem in East Africa.'
  },

  // 25. MANYARA
  {
    id: 'manyara',
    name: 'Manyara',
    zone: 'Northern',
    capital: 'Babati',
    coordinates: { x: 48, y: 36 },
    districts: ['Babati Urban', 'Babati Rural', 'Hanang', 'Mbulu', 'Simanjiro', 'Kiteto'],
    populationApprox: '1,890,000',
    areaKm2: 44522,
    keyFeatures: ['Mount Hanang (3,418m volcanic cone)', 'Lake Manyara National Park (Tree-climbing lions & alkaline soda lake)', 'Mererani Tanzanite Hills (World\'s only source of Tanzanite)', 'Tarangire National Park (Elephant herds and giant Baobabs)', 'Lake Babati (Hippo sanctuary)'],
    physicalLandforms: ['Gregory Rift Valley Escarpment', 'Mount Hanang Volcanic Peak', 'Lake Manyara and Lake Burunge graben basins', 'Mbulu Highlands'],
    climate: 'Semi-arid in the Maasai Steppe to fertile temperate highland in Mbulu and Hanang.',
    majorEconomicActivities: ['Tanzanite gemstone mining in Mererani', 'Wheat and barley farming around Mount Hanang', 'Pigeon pea and maize cultivation (Babati is East Africa\'s pigeon pea hub)', 'Wildlife safari tourism', 'Livestock pastoralism'],
    industrialDevelopments: [
      'Mererani Tanzanite Mirerani City & Sorting Complex',
      'Minjingu Phosphate Fertilizer Plant (Minjingu Mines)',
      'Hanang Wheat Silos and Milling Complexes',
      'Babati Agricultural Produce Processing and Export Hub'
    ],
    transportationLinks: {
      railways: ['None'],
      highways: ['Great North Road (A104 - Babati is a key junction connecting Arusha, Singida, and Dodoma)', 'Babati-Minjingu-Arusha Highway'],
      airports: ['Lake Manyara Airstrip'],
      portsWaterways: ['None'],
      pipelines: ['EACOP crude oil pipeline passes through Kiteto and Simanjiro']
    },
    geographicalImportance: 'The Mererani hills in Simanjiro district are the sole commercial deposit of gemstone Tanzanite on planet Earth.',
    nectaExamFact: 'Tanzanite is a blue-violet variety of zoisite formed by tectonic metamorphism under Mount Kilimanjaro\'s volcanic crust.'
  },

  // 26. SIMIYU
  {
    id: 'simiyu',
    name: 'Simiyu',
    zone: 'Lake',
    capital: 'Bariadi',
    coordinates: { x: 36, y: 26 },
    districts: ['Bariadi', 'Busega', 'Itilima', 'Maswa', 'Meatu'],
    populationApprox: '2,140,000',
    areaKm2: 25212,
    keyFeatures: ['Simiyu River (Feeds Lake Victoria)', 'Tanzania\'s Leading Cotton Producer', 'Maswa Game Reserve (Serengeti buffer)', 'Lake Victoria Shoreline at Busega'],
    physicalLandforms: ['Simiyu River Floodplain', 'Speke Gulf Shoreline', 'Serengeti Plains Southern Border', 'Granite outcrop plains'],
    climate: 'Tropical wet-and-dry with semi-arid southern tracts.',
    majorEconomicActivities: ['Cotton farming and processing (\'White Gold\')', 'Cattle, sheep, and goat husbandry', 'Cassava, maize, and sorghum cultivation', 'Lake fishing in Busega', 'Sunflower seed farming'],
    industrialDevelopments: [
      'Simiyu Cotton Ginneries Cluster (Bariadi & Maswa)',
      'Alliance Ginnery & Edible Cottonseed Oil Refinery',
      'Simiyu Chalk and Calcium Carbonate Factory',
      'Meatu Livestock Processing and Abattoir Facility'
    ],
    transportationLinks: {
      railways: ['SGR Phase 5 corridor nearby (Isaka-Mwanza alignment)'],
      highways: ['Mwanza-Bariadi-Musoma tarmac highway', 'Bariadi-Shinyanga road'],
      airports: ['Bariadi Airstrip'],
      portsWaterways: ['Busega lake piers on Lake Victoria'],
      pipelines: ['Lake Victoria Water Supply Network']
    },
    geographicalImportance: 'Known as the \'Cotton Basket of Tanzania\', producing over 40% of the country\'s total lint cotton.',
    nectaExamFact: 'Simiyu River provides a critical freshwater inflow into Speke Gulf on Lake Victoria, draining the Serengeti ecosystem.'
  },

  // 27. ZANZIBAR URBAN/WEST (MJINI MAGHARIBI)
  {
    id: 'zanzibar-urban-west',
    name: 'Zanzibar Urban/West',
    zone: 'Zanzibar',
    capital: 'Zanzibar City (Stone Town)',
    coordinates: { x: 76, y: 50 },
    districts: ['Mjini (Stone Town)', 'Magharibi A', 'Magharibi B'],
    populationApprox: '890,000',
    areaKm2: 230,
    keyFeatures: ['Stone Town UNESCO World Heritage Site', 'House of Wonders (Beit al Ajaib)', 'Forodhani Gardens & Night Food Market', 'Abeid Amani Karume International Airport (ZNZ)', 'Mangapwani Slave Caves'],
    physicalLandforms: ['Coral Limestone Coastline', 'Zanzibar Channel Waters', 'Changuu (Prison) Island and Bawe Island Reefs'],
    climate: 'Maritime equatorial tropical climate with humid monsoonal winds (Kaskazi in NE, Kusi in SE).',
    majorEconomicActivities: ['Heritage and coastal tourism', 'International commerce & transit shipping', 'Artisanal spice trade & packaging', 'Small-scale manufacturing', 'Government administration'],
    industrialDevelopments: [
      'Amana and Saateni Light Industrial Zones',
      'Zanzibar Clove & Essential Oil Distilleries',
      'Zanzibar Port Container & Passenger Ferry Terminal (Malindi)',
      'Fumba Town Special Economic Development Zone'
    ],
    transportationLinks: {
      railways: ['None (Historical Bububu Railway operated 1905-1928)'],
      highways: ['Zanzibar Island Ring Highway', 'Fumba-Stone Town Expressway'],
      airports: ['Abeid Amani Karume International Airport (ZNZ - Modern Terminal 2 & 3 handling direct European and Middle Eastern flights)'],
      portsWaterways: ['Port of Malindi (Zanzibar City - High-speed hydrofoil ferries to Dar es Salaam and Pemba; container berths)'],
      pipelines: ['Subsea electrical interconnector cable from mainland grid']
    },
    geographicalImportance: 'Historical center of Indian Ocean Swahili merchant culture and the administrative capital of the Revolutionary Government of Zanzibar.',
    nectaExamFact: 'Stone Town architecture reflects a unique syncretism of Swahili, Arab, Persian, Indian, and European building styles using coralline ragstone and mangrove timber.'
  },

  // 28. ZANZIBAR NORTH (KASKAZINI UNGUJA)
  {
    id: 'zanzibar-north',
    name: 'Zanzibar North',
    zone: 'Zanzibar',
    capital: 'Mkokotoni',
    coordinates: { x: 76, y: 46 },
    districts: ['Kaskazini A', 'Kaskazini B'],
    populationApprox: '257,000',
    areaKm2: 470,
    keyFeatures: ['Nungwi & Kendwa World-Famous White Beaches', 'Traditional Dhow Building Yards at Nungwi', 'Mkokotoni Deepwater Fishing Bay', 'Tumbatu Island'],
    physicalLandforms: ['Coral Reef Lagoons', 'White Coral Sand Beaches', 'Tumbatu Island Horst', 'Mkokotoni Sheltered Bay'],
    climate: 'Tropical maritime with cooling ocean breezes.',
    majorEconomicActivities: ['Luxury beach resort tourism and water sports', 'Handcrafted wooden dhow building', 'Marine fisheries and octopus harvesting', 'Spice farming'],
    industrialDevelopments: [
      'Nungwi Artisanal Dhow Marine Shipyards',
      'Mkokotoni Fish Landing and Ice Manufacturing Complex',
      'Boutique Vanilla, Nutmeg, and Cardamom Processing'
    ],
    transportationLinks: {
      railways: ['None'],
      highways: ['Stone Town to Nungwi Tarmac Highway'],
      airports: ['Nungwi Airstrip for private transfers'],
      portsWaterways: ['Mkokotoni Port (Inter-island ferry to Tumbatu and Pemba)', 'Nungwi beach boat landings'],
      pipelines: ['None']
    },
    geographicalImportance: 'Premier international coastal tourism destination with tide-independent swimming beaches at Kendwa.',
    nectaExamFact: 'Nungwi is East Africa\'s premier center for traditional carvel-built dhows crafted from mahogany and mango wood without nails.'
  },

  // 29. ZANZIBAR SOUTH (KUSINI UNGUJA)
  {
    id: 'zanzibar-south',
    name: 'Zanzibar South',
    zone: 'Zanzibar',
    capital: 'Koani',
    coordinates: { x: 77, y: 53 },
    districts: ['Kusini', 'Kati'],
    populationApprox: '195,000',
    areaKm2: 854,
    keyFeatures: ['Jozani Chwaka Bay National Park (Endemic Zanzibar Red Colobus Monkey)', 'Paje Kite Surfing Beach', 'Kizimkazi Dolphin Coast', 'Chwaka Bay Mangrove Ecosystem', 'Seaweed (Mwani) Farming'],
    physicalLandforms: ['Jozani Groundwater Forest', 'Chwaka Bay Barrier Spit & Mangroves', 'Fringing Coral Reefs', 'Kizimkazi Coastal Bluffs'],
    climate: 'Tropical wet maritime climate with rich ground-water reservoirs in coral rag.',
    majorEconomicActivities: ['Seaweed aquaculture (Mwani farming by women cooperatives)', 'Ecotourism in Jozani Forest and dolphin tours at Kizimkazi', 'Kitesurfing tourism in Paje and Jambiani', 'Fruit and spice agriculture in Central District'],
    industrialDevelopments: [
      'Chamanangwe Seaweed Processing Factory',
      'Jozani Eco-Tourism Conservation Center',
      'Paje artisanal solar salt and cosmetics processing'
    ],
    transportationLinks: {
      railways: ['None'],
      highways: ['Stone Town to Kizimkazi Highway', 'Stone Town to Paje Highway'],
      airports: ['None'],
      portsWaterways: ['Chwaka and Kizimkazi artisanal fishing anchorages'],
      pipelines: ['Subsea electrical cable corridor']
    },
    geographicalImportance: 'Sanctuary for the rare Kirk\'s Red Colobus monkey (Procolobus kirkii) found only in Zanzibar.',
    nectaExamFact: 'Seaweed farming (Eucheuma cottonii and spinosum) in shallow lagoons is Zanzibar\'s second largest foreign exchange earner.'
  },

  // 30. PEMBA NORTH (KASKAZINI PEMBA)
  {
    id: 'pemba-north',
    name: 'Pemba North',
    zone: 'Zanzibar',
    capital: 'Wete',
    coordinates: { x: 75, y: 40 },
    districts: ['Wete', 'Micheweni'],
    populationApprox: '272,000',
    areaKm2: 574,
    keyFeatures: ['Ngezi Rain Forest Reserve (Ancient coastal evergreen forest)', 'Clove Plantations of Pemba', 'Wete Port & Estuary', 'Misali Island Marine Coral Sanctuary', 'Kigomasha Peninsula Lighthouse'],
    physicalLandforms: ['Hilly Fertile Ridge Country', 'Ngezi Relict Forest', 'Misali Island Coral Atoll', 'Deep Pemba Channel Escarpment'],
    climate: 'Humid equatorial maritime with high rainfall and deep fertile loams.',
    majorEconomicActivities: ['Clove cultivation and drying (\'The Green Island\')', 'Deep-sea and reef fisheries', 'Cinnamon, pepper, and nutmeg farming', 'Eco-diving at Misali Island'],
    industrialDevelopments: [
      'Zanzibar State Trading Corporation (ZSTC) Clove Warehouse & Distilleries in Wete',
      'Pemba Essential Oil Processing Factory',
      'Wete Fish Processing and Cold Storage'
    ],
    transportationLinks: {
      railways: ['None'],
      highways: ['Chake Chake to Wete and Micheweni Tarmac Highway'],
      airports: ['Serviced by Chake Chake Airport in Pemba South'],
      portsWaterways: ['Port of Wete (North Pemba maritime cargo and passenger pier)'],
      pipelines: ['None']
    },
    geographicalImportance: 'Produces the overwhelming majority of Zanzibar\'s world-renowned aromatic cloves.',
    nectaExamFact: 'The Pemba Channel drops to depths exceeding 800 meters, separating Pemba Island from mainland Africa by a deep tectonic graben.'
  },

  // 31. PEMBA SOUTH (KUSINI PEMBA)
  {
    id: 'pemba-south',
    name: 'Pemba South',
    zone: 'Zanzibar',
    capital: 'Chake Chake',
    coordinates: { x: 75, y: 44 },
    districts: ['Chake Chake', 'Mkoani'],
    populationApprox: '267,000',
    areaKm2: 332,
    keyFeatures: ['Port of Mkoani (Main deep-water ferry terminal of Pemba)', 'Chake Chake Airport (Karume Airport - PMA)', 'Pujini Ruins (15th-century fortified citadel of Mkama Ndume)', 'Chake Chake Bay & Mangroves'],
    physicalLandforms: ['Deeply Indented Rias and Bays', 'Chake Chake Estuary', 'Fertile Rolling Volcanic-derived Soils', 'Mkoani Deep Channel Shore'],
    climate: 'Humid equatorial maritime climate with cooling monsoon breezes.',
    majorEconomicActivities: ['Commercial and passenger ferry logistics at Mkoani', 'Clove farming and trading', 'Rice and cassava agriculture in valleys', 'Coastal and artisanal fisheries'],
    industrialDevelopments: [
      'Mkoani Deepwater Port Terminal & Petroleum Depot',
      'ZSTC Clove Sorting & Grading Depot Chake Chake',
      'Pemba Grain and Flour Milling Works'
    ],
    transportationLinks: {
      railways: ['None'],
      highways: ['Mkoani-Chake Chake-Wete Central Pemba Spine Highway'],
      airports: ['Pemba Karume Airport (PMA in Chake Chake - Scheduled daily flights to Zanzibar, Dar es Salaam, Tanga)'],
      portsWaterways: ['Port of Mkoani (Primary maritime gateway with daily passenger and cargo catamarans to Unguja and Tanga)'],
      pipelines: ['None']
    },
    geographicalImportance: 'Main commercial and logistical conduit for Pemba Island connecting to mainland Tanga and Unguja.',
    nectaExamFact: 'Pujini ruins near Chake Chake feature unique defensive earthen ramparts and underground chambers constructed by ruler Mkama Ndume.'
  }
];

export const TANZANIA_PHYSICAL_FEATURES: TanzaniaPhysicalFeature[] = [
  {
    id: 'kilimanjaro',
    name: 'Mount Kilimanjaro',
    type: 'mountain',
    elevationOrDepth: '5,895 m (19,341 ft)',
    location: 'Kilimanjaro Region',
    coordinates: { x: 62, y: 28 },
    description: 'The highest mountain in Africa and the highest freestanding mountain above sea level in the world. Features three volcanic cones: Kibo (dormant), Mawenzi, and Shira.',
    geographicalImportance: 'Creates a monumental altitudinal ecosystem from dry savanna through tropical rainforest, heather moorland, alpine desert, to an arctic glaciated summit.',
    nectaFact: 'Uhuru Peak on Kibo crater rim stands at 5,895 meters above mean sea level. Frequently tested in NECTA CSEE on orographic precipitation.'
  },
  {
    id: 'meru',
    name: 'Mount Meru',
    type: 'volcano',
    elevationOrDepth: '4,562 m (14,968 ft)',
    location: 'Arusha Region',
    coordinates: { x: 54, y: 26 },
    description: 'Active stratovolcano located in Arusha National Park. A massive caldera collapse ~7,800 years ago blew away its eastern wall.',
    geographicalImportance: 'Feeds fertile volcanic andisols supporting rich coffee, flower, and banana agriculture across the Arusha highlands.',
    nectaFact: 'Mount Meru is the fifth-highest mountain peak on the African continent.'
  },
  {
    id: 'lake-victoria',
    name: 'Lake Victoria (Ukerewe)',
    type: 'lake',
    elevationOrDepth: 'Area: 68,800 km²; Max depth: 84 m',
    location: 'Mwanza, Mara, Kagera, Geita, Simiyu',
    coordinates: { x: 30, y: 14 },
    description: 'Africa\'s largest lake by surface area and the world\'s second-largest freshwater lake. Shared by Tanzania (51%), Uganda (43%), and Kenya (6%).',
    geographicalImportance: 'Chief reservoir of the White Nile river system. Powers regional microclimates with convective rain and supports a multimillion-dollar Nile Perch fishery.',
    nectaFact: 'Formed by crustal downwarping of the continental plateau between the two branches of the Great Rift Valley, rather than direct faulting.'
  },
  {
    id: 'lake-tanganyika',
    name: 'Lake Tanganyika',
    type: 'lake',
    elevationOrDepth: 'Length: 673 km; Max depth: 1,470 m',
    location: 'Kigoma, Katavi, Rukwa',
    coordinates: { x: 12, y: 52 },
    description: 'The world\'s longest freshwater lake (673 km) and second deepest (1,470 m) after Lake Baikal. Holds 18% of global unfrozen freshwater.',
    geographicalImportance: 'Occupies the Western Albertine Rift Valley graben flanked by steep fault scarps. Endemic home to over 250 species of cichlid fish and ancient Tanganyika sardines (Dagaa).',
    nectaFact: 'The deepest point of Lake Tanganyika reaches 1,470 meters, lying well below sea level (cryptodepression).'
  },
  {
    id: 'lake-nyasa',
    name: 'Lake Nyasa (Lake Malawi)',
    type: 'lake',
    elevationOrDepth: 'Length: 580 km; Max depth: 706 m',
    location: 'Ruvuma, Njombe, Mbeya',
    coordinates: { x: 44, y: 84 },
    description: 'Third-deepest lake in Africa, flanked on its eastern Tanzanian shoreline by the sheer Livingstone (Kipengere) Mountains falling steeply into the water.',
    geographicalImportance: 'Home to more endemic fish species than any other lake on Earth. Serves as a vital water highway linking Tanzania, Malawi, and Mozambique.',
    nectaFact: 'Formed within a tectonic graben where the Western Rift branch terminates in the south.'
  },
  {
    id: 'eastern-rift-valley',
    name: 'Eastern (Gregory) Rift Valley',
    type: 'rift_valley',
    elevationOrDepth: 'Escarpment height: 300–1,000 m',
    location: 'Arusha, Manyara, Dodoma, Singida',
    coordinates: { x: 50, y: 38 },
    description: 'Classic continental rift graben lined with spectacular fault scarps, alkaline soda lakes (Lake Natron, Manyara, Eyasi), and volcanic peaks (Ol Doinyo Lengai, Meru, Hanang).',
    geographicalImportance: 'A textbook planetary laboratory of tensional extensional plate tectonics splitting the African plate into Nubian and Somalian sub-plates.',
    nectaFact: 'Oldoinyo Lengai on the southern shore of Lake Natron is the only known active volcano erupting natrocarbonatite lava.'
  },
  {
    id: 'western-rift-valley',
    name: 'Western (Albertine) Rift Valley',
    type: 'rift_valley',
    elevationOrDepth: 'Graben depth: >1,500 m',
    location: 'Kigoma, Katavi, Rukwa, Mbeya',
    coordinates: { x: 18, y: 60 },
    description: 'The deep western branch of the East African Rift System characterized by monumental graben troughs hosting immense freshwater rift lakes.',
    geographicalImportance: 'Divergent boundary responsible for Lake Tanganyika, Lake Rukwa, and Lake Nyasa, surrounded by towering horst mountain ranges.',
    nectaFact: 'Characterized by high seismic activity and deep-focus earthquakes along boundary fault zones.'
  },
  {
    id: 'rufiji-river',
    name: 'Rufiji River & Delta',
    type: 'river',
    elevationOrDepth: 'Length: ~600 km; Basin: 177,429 km²',
    location: 'Morogoro, Pwani, Lindi',
    coordinates: { x: 64, y: 66 },
    description: 'Tanzania\'s largest river system formed by the confluence of the Kilombero and Luwegu rivers, draining over 20% of mainland Tanzania.',
    geographicalImportance: 'Powers the Julius Nyerere Hydropower Dam (2,115 MW at Stiegler\'s Gorge) and forms East Africa\'s largest contiguous mangrove delta.',
    nectaFact: 'The Rufiji drainage basin covers 177,429 km², equivalent to approximately one-fifth of Tanzania\'s land surface.'
  },
  {
    id: 'eastern-arc-mountains',
    name: 'Eastern Arc Mountains',
    type: 'mountain',
    elevationOrDepth: 'Max elevation: 2,630 m (Uluguru)',
    location: 'Tanga, Morogoro, Iringa, Kilimanjaro',
    coordinates: { x: 64, y: 46 },
    description: 'An ancient chain of crystalline block-faulted mountains including Usambara, Pare, Uluguru, Nguru, Udzungwa, and Mahenge mountains.',
    geographicalImportance: 'One of the world\'s top 35 biodiversity hotspots; called the "Galapagos of Africa" due to extraordinarily high rates of plant and animal endemism.',
    nectaFact: 'Formed over 100 million years ago from ancient basement complex gneiss and granites, far older than the volcanic peaks of Kilimanjaro.'
  },
  {
    id: 'kalambo-falls',
    name: 'Kalambo Falls',
    type: 'waterfall',
    elevationOrDepth: 'Drop: 235 m (772 ft)',
    location: 'Rukwa Region (Zambia border)',
    coordinates: { x: 20, y: 70 },
    description: 'Spectacular uninterrupted single-drop waterfall where the Kalambo River plunges off the edge of the Ufipa Plateau down into Lake Tanganyika.',
    geographicalImportance: 'Africa\'s second-highest uninterrupted single-drop waterfall and a celebrated prehistoric Acheulean archaeological site.',
    nectaFact: 'Twice the height of Victoria Falls in terms of sheer vertical single drop.'
  }
];

export const TANZANIA_INDUSTRIAL_HUBS: TanzaniaIndustrialHub[] = [
  {
    id: 'dangote-cement',
    name: 'Dangote Cement Manufacturing Mega-Complex',
    category: 'manufacturing',
    region: 'Mtwara',
    coordinates: { x: 74, y: 82 },
    keyProducts: ['Portland Cement (3.0M MT/yr)', 'Clinker', 'Captive Coal Power (30 MW)'],
    description: 'Largest cement manufacturing facility in Sub-Saharan East Africa. Utilizes local high-grade limestone, captive power plant, and dedicated marine terminal for bulk export.',
    economicOutput: '3.0 Million Metric Tons per year supplying Tanzania and SADC export markets.'
  },
  {
    id: 'geita-gold-mine',
    name: 'Geita Gold Mine & State Gold Refinery',
    category: 'mining_refinery',
    region: 'Geita',
    coordinates: { x: 26, y: 28 },
    keyProducts: ['Refined Gold Bullion (99.9% purity)', 'Silver by-product'],
    description: 'Premier large-scale open-pit and underground gold operation in the Lake Victoria Goldfield. Backed by the national Geita Gold Refinery for domestic value addition.',
    economicOutput: 'Over 500,000 ounces of gold annually; leading national foreign exchange earner.'
  },
  {
    id: 'jnhpp-power',
    name: 'Julius Nyerere Hydropower Dam (JNHPP)',
    category: 'energy',
    region: 'Pwani / Morogoro',
    coordinates: { x: 62, y: 64 },
    keyProducts: ['Hydroelectric Power (2,115 Megawatts)', 'Flood Control', 'Irrigation Water Reservoir (30 Billion m³)'],
    description: 'Mega infrastructure dam constructed at Stiegler\'s Gorge on the Rufiji River featuring 9 turbines of 235 MW each. Tripled Tanzania\'s baseline electrical generation capacity.',
    economicOutput: '2,115 MW of clean renewable baseload electricity feeding the national grid.'
  },
  {
    id: 'mkapa-sez',
    name: 'Benjamin William Mkapa Special Economic Zone',
    category: 'sez_epz',
    region: 'Dar es Salaam',
    coordinates: { x: 74, y: 58 },
    keyProducts: ['Electronics assembly', 'Garments & apparel export', 'Pharmaceuticals', 'Machinery fabrication'],
    description: 'Tanzania\'s flagship Export Processing Zone (EPZ) and Special Economic Zone in Mabibo, Dar es Salaam, providing fiscal incentives and bonded customs logistics.',
    economicOutput: 'Over $300 Million in export turnover and thousands of industrial technical jobs.'
  },
  {
    id: 'bakhresa-complex',
    name: 'Bakhresa Group (Azam) Industrial Megaplex',
    category: 'agro_processing',
    region: 'Dar es Salaam & Pwani',
    coordinates: { x: 73, y: 59 },
    keyProducts: ['Wheat flour milling (Azam)', 'Carbonated soft drinks & juices', 'Packaging materials', 'Bakery products'],
    description: 'One of Africa\'s largest agro-industrial conglomerates with automated grain flour silos, beverage bottling plants, and inland logistics hubs in Buguruni, Vingunguti, and Bagamoyo.',
    economicOutput: 'Over 5,000 tons of daily flour milling capacity serving East and Central Africa.'
  },
  {
    id: 'kilombero-sugar',
    name: 'Kilombero Sugar Estate & Bio-Refinery',
    category: 'agro_processing',
    region: 'Morogoro',
    coordinates: { x: 58, y: 62 },
    keyProducts: ['Refined White & Brown Sugar', 'Ethanol & bio-electricity cogeneration', 'Animal feed'],
    description: 'Major irrigated sugar cane plantation and milling factory complex in the fertile Kilombero River valley. Undergoing massive expansion to exceed 380,000 MT/year.',
    economicOutput: 'Largest producer of domestic sugar in Tanzania, significantly reducing national import deficits.'
  },
  {
    id: 'tanga-cement',
    name: 'Tanga Cement PLC (Simba Cement)',
    category: 'manufacturing',
    region: 'Tanga',
    coordinates: { x: 72, y: 38 },
    keyProducts: ['Simba Barabara Cement', 'Composite cement', 'Hydrated lime'],
    description: 'Heavy industrial clinker and cement works at Pongwe, Tanga, utilizing the rich Amboni-Maweni limestone deposits and railway freight lines.',
    economicOutput: '1.25 Million Metric Tons per annum distributed across Tanzania and Great Lakes.'
  },
  {
    id: 'mererani-tanzanite',
    name: 'Mererani Tanzanite Mineral City & Trading Center',
    category: 'mining_refinery',
    region: 'Manyara',
    coordinates: { x: 56, y: 30 },
    keyProducts: ['Rough & Cut Tanzanite Gemstones (Blue Zoisite)', 'Lapidary Jewelry'],
    description: 'Enclosed by a 24-kilometer security perimeter wall built by the Tanzania People\'s Defence Forces (TPDF). Houses formal auction floors, cutting and polishing workshops.',
    economicOutput: 'Exclusive worldwide supplier of genuine Tanzanite gemstones.'
  },
  {
    id: 'songo-songo-gas',
    name: 'Songo Songo Natural Gas Processing Plant',
    category: 'energy',
    region: 'Lindi',
    coordinates: { x: 72, y: 72 },
    keyProducts: ['Purified Natural Gas (Methane)', 'Gas Condensate'],
    description: 'Marine island gas wells off Kilwa connected to a processing facility that supplies clean natural gas through an offshore/onshore pipeline to Kinyerezi power plants in Dar es Salaam.',
    economicOutput: 'Generates fuel for over 60% of Tanzania\'s thermal power generation.'
  },
  {
    id: 'ruangwa-graphite',
    name: 'Ruangwa Flake Graphite Mining Hub',
    category: 'mining_refinery',
    region: 'Lindi',
    coordinates: { x: 68, y: 76 },
    keyProducts: ['High-purity flake graphite', 'Lithium-ion battery anode material'],
    description: 'World-class graphite mining belt in Ruangwa supplying critical raw materials for international electric vehicle (EV) battery manufacturers.',
    economicOutput: 'Tens of thousands of tons of high-grade flake graphite for the global clean energy transition.'
  }
];

export const TANZANIA_TRANSPORT_NODES: TanzaniaTransportNode[] = [
  // RAILWAYS
  {
    id: 'sgr-network',
    name: 'Standard Gauge Railway (SGR) Electric Network',
    type: 'sgr_rail',
    coordinates: { x: 54, y: 52 },
    routeOrTermini: 'Dar es Salaam -> Morogoro -> Dodoma (Makutupora) -> Tabora -> Isaka -> Mwanza & Kigoma',
    significance: 'Modern 160 km/h high-speed electric passenger and 120 km/h heavy freight train system. Reduces Dar-to-Dodoma travel time from 9 hours to under 3.5 hours.',
    details: 'Phase 1 (Dar-Moro 300km) and Phase 2 (Moro-Dodoma 422km) are operational with state-of-the-art electric locomotives and modern terminals.'
  },
  {
    id: 'tazara-railway',
    name: 'TAZARA (Tanzania-Zambia Railway)',
    type: 'tazara_rail',
    coordinates: { x: 46, y: 72 },
    routeOrTermini: 'Dar es Salaam (Yombo) -> Kisarawe -> Ifakara -> Mlimba -> Makambako -> Mbeya -> Tunduma -> Kapiri Mposhi (Zambia)',
    significance: '1,860-km historic freedom railway linking landlocked Zambia to the Indian Ocean port of Dar es Salaam, bypassing southern apartheid corridors.',
    details: 'Constructed 1970–1975 with Chinese bilateral cooperation. Features 320 bridges, 22 tunnels through the Kipengere and Udzungwa mountains.'
  },
  {
    id: 'central-line-mgr',
    name: 'Central Line Meter Gauge Railway (MGR)',
    type: 'mgr_rail',
    coordinates: { x: 38, y: 46 },
    routeOrTermini: 'Dar es Salaam -> Morogoro -> Kilosa -> Dodoma -> Manyoni -> Tabora (Junction splits to Kigoma & Mwanza)',
    significance: 'Historic backbone railway built in 1905–1914 opening up the agricultural, mineral, and livestock interior of mainland Tanzania.',
    details: 'Transports bulk cargo such as copper, cement, fertilizer, and agricultural grains to and from Lake Victoria and Lake Tanganyika.'
  },

  // HIGHWAY CORRIDORS
  {
    id: 'tanzam-highway',
    name: 'TANZAM Highway (T1 Corridor)',
    type: 'highway_corridor',
    coordinates: { x: 50, y: 68 },
    routeOrTermini: 'Dar es Salaam -> Chalinze -> Morogoro -> Iringa -> Mbeya -> Tunduma (Border to Zambia & Malawi)',
    significance: 'Chief overland freight artery of East & Central Africa carrying thousands of fuel tankers and container trucks daily.',
    details: 'Paved all-weather transit corridor traversing Mikumi National Park, the dramatic Kitonga Hills gorge, and the Southern Highlands.'
  },
  {
    id: 'central-corridor-highway',
    name: 'Central Corridor Highway (T3 Route)',
    type: 'highway_corridor',
    coordinates: { x: 40, y: 40 },
    routeOrTermini: 'Dar es Salaam -> Morogoro -> Dodoma -> Singida -> Nzega -> Shinyanga -> Mwanza / Kahama -> Rusumo (Rwanda/Burundi)',
    significance: 'Trade lifeline connecting Rwanda, Burundi, and Eastern DRC to the Port of Dar es Salaam via the Isaka dry port.',
    details: 'Facilitates fast movement of commercial goods and passengers between the capital Dodoma, the Lake Zone, and Central African partners.'
  },
  {
    id: 'northern-corridor-highway',
    name: 'Northern Highway (T2 Route)',
    type: 'highway_corridor',
    coordinates: { x: 60, y: 32 },
    routeOrTermini: 'Dar es Salaam -> Chalinze -> Segera -> Korogwe -> Same -> Moshi -> Arusha -> Namanga (Kenya border)',
    significance: 'Key economic corridor connecting Tanzania\'s commercial capital to the northern tourism hub and Nairobi, Kenya.',
    details: 'Traverses the base of the Usambara and Pare mountains and Mount Kilimanjaro.'
  },
  {
    id: 'coastal-highway-t7',
    name: 'Coastal Highway (T7 Corridor) & Mkapa Bridge',
    type: 'highway_corridor',
    coordinates: { x: 72, y: 68 },
    routeOrTermini: 'Dar es Salaam -> Kibiti -> Mkapa Bridge (over Rufiji River) -> Kilwa Masoko -> Lindi -> Mtwara',
    significance: 'Unified Southern Tanzania with the rest of the nation after completion of the 970-meter Benjamin Mkapa Bridge in 2003.',
    details: 'Connects the offshore gas fields of Songo Songo and Mnazi Bay and the cashew heartland to national distribution.'
  },

  // PORTS
  {
    id: 'port-dar-es-salaam',
    name: 'Port of Dar es Salaam (Bandari ya Salama)',
    type: 'deep_port',
    coordinates: { x: 74, y: 58 },
    routeOrTermini: 'Indian Ocean deep-water berths 1 to 12',
    significance: 'Handles over 90% of Tanzania\'s international maritime trade and serves six landlocked nations (Zambia, DRC, Rwanda, Burundi, Uganda, Malawi).',
    details: 'Expanded and deepened to 14.5 meters under the Dar es Salaam Maritime Gateway Program (DMGP) to accommodate Panamax container ships.'
  },
  {
    id: 'port-mtwara',
    name: 'Port of Mtwara',
    type: 'deep_port',
    coordinates: { x: 74, y: 82 },
    routeOrTermini: 'Southern Indian Ocean deep-water natural harbor',
    significance: 'Deepest natural harbor along the East African coast with deep draft (>20m entrance) requiring no maintenance dredging.',
    details: 'Equipped with a modern 300-meter multipurpose berth handling bulk cement exports from Dangote, raw cashew nuts, and heavy oil/gas equipment.'
  },
  {
    id: 'port-tanga',
    name: 'Port of Tanga',
    type: 'deep_port',
    coordinates: { x: 72, y: 38 },
    routeOrTermini: 'Northern Indian Ocean port & Chongoleani EACOP terminal',
    significance: 'Oldest functioning port on mainland Tanzania, recently transformed from a lighterage port into a direct-berthing deep-water facility.',
    details: 'Outlet for the northern agricultural zone, Tanga cement, and terminal for the East African Crude Oil Pipeline.'
  },
  {
    id: 'port-mwanza',
    name: 'Port of Mwanza (North & South Terminals)',
    type: 'lake_port',
    coordinates: { x: 30, y: 22 },
    routeOrTermini: 'Lake Victoria international water routes to Port Bell/Entebbe (Uganda) & Kisumu (Kenya)',
    significance: 'Headquarters of the Marine Services Company Limited (MSCL) and home to the new 3,500-ton MV Mwanza \'Hapa Kazi Tu\'.',
    details: 'Features rail-wagon ferry roll-on/roll-off piers connecting the Tanzanian Central Railway directly to Uganda.'
  },
  {
    id: 'port-kigoma',
    name: 'Port of Kigoma',
    type: 'lake_port',
    coordinates: { x: 12, y: 44 },
    routeOrTermini: 'Lake Tanganyika international routes to Kalemie & Baraka (DRC), Bujumbura (Burundi), Mpulungu (Zambia)',
    significance: 'Primary lake trade port linking mainland Tanzania to the mineral-rich eastern provinces of the Democratic Republic of Congo.',
    details: 'Home port of the historic passenger vessel MV Liemba (built in Germany in 1913, operational for over a century).'
  },

  // AIRPORTS
  {
    id: 'airport-jnia',
    name: 'Julius Nyerere International Airport (JNIA - DAR)',
    type: 'international_airport',
    coordinates: { x: 74, y: 58 },
    routeOrTermini: 'Dar es Salaam (Terminals 1, 2, and new Terminal 3)',
    significance: 'Primary aviation hub of Tanzania capable of handling over 6 million passengers annually with intercontinental direct flights.',
    details: 'State-of-the-art Terminal 3 features 28 aircraft parking stands, advanced biometric border systems, and wide-body jet handling (Airbus A350, Boeing 787).'
  },
  {
    id: 'airport-kia',
    name: 'Kilimanjaro International Airport (KIA - JRO)',
    type: 'international_airport',
    coordinates: { x: 58, y: 27 },
    routeOrTermini: 'Between Moshi and Arusha (Hai District)',
    significance: 'Premier safari gateway welcoming international tourists direct from Europe, the Middle East, and the Americas to the Northern Circuit.',
    details: 'Long 3,600-meter runway framed by dramatic views of Mount Kilimanjaro and Mount Meru.'
  },
  {
    id: 'airport-znz',
    name: 'Abeid Amani Karume International Airport (ZNZ)',
    type: 'international_airport',
    coordinates: { x: 76, y: 50 },
    routeOrTermini: 'Zanzibar City (Stone Town)',
    significance: 'Handles rapid growth in international tourist charter flights and regional island shuttles.',
    details: 'Modern Terminal 3 opened in 2021 with comprehensive duty-free, VIP, and wide-body transit infrastructure.'
  },

  // PIPELINES
  {
    id: 'eacop-pipeline',
    name: 'East African Crude Oil Pipeline (EACOP)',
    type: 'pipeline',
    coordinates: { x: 52, y: 32 },
    routeOrTermini: 'Hoima (Lake Albert, Uganda) -> Kagera -> Geita -> Shinyanga -> Tabora -> Manyoni -> Kiteto -> Chongoleani Peninsula (Tanga)',
    significance: '1,443-km electrically heated pipeline designed to transport 216,000 barrels per day of viscous crude oil from Uganda to the Indian Ocean for international tanker export.',
    details: 'World\'s longest electrically heated crude oil pipeline, passing through 8 regions and 27 districts in Tanzania.'
  },
  {
    id: 'mtwara-dar-gas-pipeline',
    name: 'Mtwara-Dar es Salaam Natural Gas Pipeline',
    type: 'pipeline',
    coordinates: { x: 74, y: 70 },
    routeOrTermini: 'Madimba (Mtwara) & Songo Songo (Lindi) -> Somanga Fungu -> Kinyerezi (Dar es Salaam)',
    significance: '532-km, 36-inch diameter pipeline delivering purified natural gas from offshore marine fields to feed national power plants at Kinyerezi.',
    details: 'Transports up to 784 million standard cubic feet of gas per day, powering national industrial manufacturing and urban electricity.'
  },
  {
    id: 'tazama-pipeline',
    name: 'TAZAMA Petroleum Pipeline',
    type: 'pipeline',
    coordinates: { x: 52, y: 70 },
    routeOrTermini: 'Port of Dar es Salaam -> Morogoro -> Iringa -> Mbeya -> Tunduma -> Indeni Refinery (Ndola, Zambia)',
    significance: '1,710-km international pipeline transporting petroleum products from coastal Tanzania across the Southern Highlands into Zambia.',
    details: 'Operational since 1968, guaranteeing fuel security for Zambia and reducing regional road tanker congestion.'
  }
];
