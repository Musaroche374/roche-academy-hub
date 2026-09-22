import { TopicLesson, TopicQuiz, PastPaper } from '../types';
import { ALL_31_TANZANIA_REGIONS } from './tanzaniaGeographyData';

export const ROCHE_PILLARS = [
  {
    letter: 'R',
    title: 'Reasoning',
    color: '#0A3D62',
    bg: 'bg-sky-50 text-[#0A3D62] border-sky-200',
    description: 'Analytical deduction, logical rigor, and proving fundamental principles before memorizing them.',
    iconName: 'Brain',
  },
  {
    letter: 'O',
    title: 'Observation',
    color: '#0A3D62',
    bg: 'bg-indigo-50 text-[#0A3D62] border-indigo-200',
    description: 'Empirical data gathering, laboratory trials, noticing microscopic & macroscopic natural patterns.',
    iconName: 'Eye',
  },
  {
    letter: 'C',
    title: 'Calculation',
    color: '#0A3D62',
    bg: 'bg-amber-50 text-amber-900 border-amber-200',
    description: 'Translating concepts into mathematical precision, algebra, calculus, and quantitative verification.',
    iconName: 'Calculator',
  },
  {
    letter: 'H',
    title: 'Hypothesis',
    color: '#0A3D62',
    bg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    description: 'Formulating testable predictions and systematically verifying assumptions through experiments.',
    iconName: 'Lightbulb',
  },
  {
    letter: 'E',
    title: 'Exploration',
    color: '#2ECC71',
    bg: 'bg-green-50 text-green-900 border-green-200',
    description: 'Geography, spatial dynamics, GIS, Earth science, and understanding the living world around us.',
    iconName: 'Compass',
  },
];

export const EDUCATION_LEVELS = [
  {
    id: 'primary',
    name: 'Primary Level',
    sub: 'Standard I - VII',
    tag: 'Foundation & Visual Discovery',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    accentColor: '#F39C12',
    description: 'Engaging, colorful, cartoon-styled animations, interactive number lines, and fundamental earth explorations.',
  },
  {
    id: 'olevel',
    name: 'Ordinary Level',
    sub: 'Form I - IV (CSEE & IGCSE)',
    tag: 'Curriculum Mastery & Exams',
    badgeColor: 'bg-blue-100 text-[#0A3D62] border-blue-300',
    accentColor: '#0A3D62',
    description: 'Rigorous conceptual notes, marked NECTA and Cambridge past papers, structured diagrams, and separated sciences.',
  },
  {
    id: 'alevel',
    name: 'Advanced Level',
    sub: 'Form V - VI (ACSEE & A-Level)',
    tag: 'Deep Dives & Practicals',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    accentColor: '#4F46E5',
    description: 'Calculus, organic reaction mechanisms, wave mechanics, advanced statistics, GIS, and fieldwork methodologies.',
  },
  {
    id: 'university',
    name: 'University & Professional',
    sub: 'Undergraduate & Researcher',
    tag: 'Research & Applied STEM',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    accentColor: '#2ECC71',
    description: 'Research methodology, scientific proposal writing, GIS software tutorials (QGIS/ArcGIS), and spatial data modeling.',
  },
];

export const SUBJECT_CATEGORIES = [
  { id: 'all', name: 'All Subjects', icon: 'Sparkles' },
  { id: 'math', name: 'Mathematics', icon: 'Binary' },
  { id: 'science', name: 'General Science', icon: 'Atom' },
  { id: 'physics', name: 'Physics', icon: 'Zap' },
  { id: 'chemistry', name: 'Chemistry', icon: 'FlaskConical' },
  { id: 'biology', name: 'Biology', icon: 'Dna' },
  { id: 'geography', name: 'Geography & GIS', icon: 'Globe' },
  { id: 'research', name: 'Research Methods', icon: 'BookOpen' },
];

export const TOPIC_LESSONS: TopicLesson[] = [
  // Primary
  {
    id: 'pri-math-fractions',
    title: 'Visual Fractions & Pizza Slices',
    level: 'primary',
    subject: 'math',
    grade: 'Standard 4',
    summary: 'Master halves, quarters, and eighths using visual pizza slices and colorful step-by-step animations.',
    readTimeMinutes: 6,
    tags: ['Fractions', 'Visual Math', 'Shapes'],
    pdfAvailable: true,
    videoAvailable: true,
    videoDuration: '7:45 min',
    hasLab: false,
    hasQuiz: true,
    keyConcepts: ['Numerator & Denominator', 'Equivalent Fractions', 'Adding Simple Fractions'],
    notesContent: {
      introduction: 'A fraction represents an equal part of a whole thing. Imagine sharing a delicious chapati or pizza with your friends!',
      sections: [
        {
          heading: '1. What is Numerator and Denominator?',
          body: 'The bottom number (Denominator) tells how many equal parts the whole is cut into. The top number (Numerator) tells how many slices you get.',
          formulaOrHighlight: 'Fraction = (Parts we have) / (Total equal parts)',
          diagramHint: 'Circle divided into 4 quadrants, 1 quadrant shaded = 1/4.',
        },
        {
          heading: '2. Equivalent Fractions',
          body: '1/2 is the same amount of food as 2/4 and 4/8. Even though the numbers are bigger, the portion remains the same.',
          formulaOrHighlight: '1/2 = 2/4 = 4/8',
        }
      ],
      rocheTakeaway: 'Reasoning: Count total slices first, then reason how many slices remain.',
      examTips: 'In Standard 4 and 7 exams, always simplify your fraction to the lowest term!'
    }
  },
  {
    id: 'pri-sci-plants',
    title: 'Parts of a Green Plant & Photosynthesis',
    level: 'primary',
    subject: 'science',
    grade: 'Standard 5',
    summary: 'Discover roots, stems, leaves, and how chlorophyll traps sunlight to make plant food.',
    readTimeMinutes: 7,
    tags: ['Plants', 'Botany', 'Nature'],
    pdfAvailable: true,
    videoAvailable: true,
    videoDuration: '8:20 min',
    hasLab: true,
    hasQuiz: true,
    keyConcepts: ['Roots & Stem', 'Leaf Chlorophyll', 'Water Cycle in Plants'],
    notesContent: {
      introduction: 'Plants are Earth\'s food factories! They take sunlight, water from the soil, and carbon dioxide from the air.',
      sections: [
        {
          heading: '1. The Four Essential Plant Organs',
          body: 'Roots absorb water and anchor the plant. Stems transport sap. Leaves make food. Flowers produce fruits and seeds.',
          formulaOrHighlight: 'Water + Sunlight + Carbon Dioxide -> Glucose + Oxygen',
        }
      ],
      rocheTakeaway: 'Observation: Watch how leaves turn towards sunlight on your classroom windowsill.',
      examTips: 'Remember that roots have root hairs that increase surface area for water absorption.'
    }
  },
  {
    id: 'pri-geo-tz-regions',
    title: 'Regions of Tanzania & Maps',
    level: 'primary',
    subject: 'geography',
    grade: 'Standard 6',
    summary: 'Travel through Tanzania\'s 31 regions, understanding our capitals, lakes, and mountain ranges.',
    readTimeMinutes: 8,
    tags: ['Tanzania', 'Map Reading', 'Districts'],
    pdfAvailable: true,
    videoAvailable: true,
    videoDuration: '10:15 min',
    hasLab: false,
    hasQuiz: true,
    keyConcepts: ['Cardinal Points', 'Major Lakes: Victoria, Tanganyika, Nyasa', 'Dodoma vs. Dar es Salaam'],
    notesContent: {
      introduction: 'Tanzania is located in East Africa, bordering the Indian Ocean to the east, with eight neighboring countries.',
      sections: [
        {
          heading: '1. Cardinal Directions',
          body: 'Every map has a North arrow. If you face North, East is to your right, West is to your left, and South is behind you.',
          formulaOrHighlight: 'Never Eat Soggy Waffles -> North, East, South, West',
        }
      ],
      rocheTakeaway: 'Exploration: Explore your local district and identify its physical boundaries.',
      examTips: 'Common Standard 7 question: Mount Kilimanjaro is in Kilimanjaro region, standing at 5,895 meters above sea level.'
    }
  },

  // O-Level
  {
    id: 'olevel-math-pythagoras',
    title: 'Pythagoras Theorem & Trigonometric Ratios',
    level: 'olevel',
    subject: 'math',
    grade: 'Form II',
    summary: 'Master right-angled triangles, hypotenuse calculations, SOH-CAH-TOA, and practical elevation problems.',
    readTimeMinutes: 10,
    tags: ['NECTA CSEE', 'Cambridge IGCSE', 'Geometry'],
    pdfAvailable: true,
    videoAvailable: true,
    videoDuration: '14:30 min',
    hasLab: false,
    hasQuiz: true,
    keyConcepts: ['a² + b² = c²', 'Sine, Cosine, Tangent', 'Angles of Elevation & Depression'],
    notesContent: {
      introduction: 'For every right-angled triangle, the area of the square built upon the hypotenuse equals the sum of areas of squares on the other two sides.',
      sections: [
        {
          heading: '1. The Fundamental Formula',
          body: 'Identify the hypotenuse first — it is always opposite the 90° angle and is the longest side.',
          formulaOrHighlight: 'a² + b² = c² (where c is hypotenuse)',
        },
        {
          heading: '2. Trigonometric Ratios (SOH CAH TOA)',
          body: 'sin(θ) = Opposite / Hypotenuse; cos(θ) = Adjacent / Hypotenuse; tan(θ) = Opposite / Adjacent.',
          formulaOrHighlight: 'tan(θ) = sin(θ) / cos(θ)',
        }
      ],
      rocheTakeaway: 'Calculation: Always double check whether the question asks for side length or area, and keep appropriate decimal precision.',
      examTips: 'NECTA CSEE Section A question 3 frequently tests distance between two ships or height of a tower using Pythagoras and tan(θ).'
    }
  },
  {
    id: 'olevel-chem-acids-bases',
    title: 'Acids, Bases, Salts & Titration Calculations',
    level: 'olevel',
    subject: 'chemistry',
    grade: 'Form III',
    summary: 'Investigate the pH scale, neutralisation reactions, indicator colour changes, and volumetric molarity calculations.',
    readTimeMinutes: 12,
    tags: ['NECTA Chemistry 032', 'IGCSE 0620', 'Volumetric Analysis'],
    pdfAvailable: true,
    videoAvailable: true,
    videoDuration: '16:40 min',
    hasLab: true,
    hasQuiz: true,
    keyConcepts: ['pH Scale', 'Neutralization', 'MaVa/MbVb = na/nb'],
    notesContent: {
      introduction: 'Acids donate hydrogen ions (H⁺) in aqueous solution, while bases accept protons or release hydroxide ions (OH⁻).',
      sections: [
        {
          heading: '1. The Volumetric Ratio Equation',
          body: 'When titrating standard hydrochloric acid against sodium hydroxide, we reach equivalence point when moles of H⁺ equal moles of OH⁻.',
          formulaOrHighlight: '(Ma × Va) / (Mb × Vb) = na / nb',
        }
      ],
      rocheTakeaway: 'Hypothesis: Predict the exact end-point volume before opening the burette stopcock by pre-calculating the stoichiometric ratio.',
      examTips: 'In NECTA Practical Paper 2A/2B, always record initial and final burette readings to 2 decimal places ending in .00 or .05 or .10 cm³.'
    }
  },
  {
    id: 'olevel-phys-ohms-law',
    title: "Ohm's Law, Resistance & Electrical Circuits",
    level: 'olevel',
    subject: 'physics',
    grade: 'Form III',
    summary: 'Understand potential difference, electric current, series/parallel resistor combinations, and heating effects.',
    readTimeMinutes: 11,
    tags: ['NECTA Physics 031', 'IGCSE 0625', 'Circuits'],
    pdfAvailable: true,
    videoAvailable: true,
    videoDuration: '13:50 min',
    hasLab: true,
    hasQuiz: true,
    keyConcepts: ['V = I × R', 'Series: R_total = R1 + R2', 'Parallel: 1/R_total = 1/R1 + 1/R2'],
    notesContent: {
      introduction: "Ohm's law states that current flowing through a metallic conductor is directly proportional to the potential difference across its ends, provided temperature remains constant.",
      sections: [
        {
          heading: '1. The Governing Equation',
          body: 'Voltage (V in Volts) equals Current (I in Amperes) multiplied by Resistance (R in Ohms Ω).',
          formulaOrHighlight: 'V = I × R   ==>   I = V / R   ==>   P = V × I = I²R',
        }
      ],
      rocheTakeaway: 'Observation: Notice that non-ohmic components like filament lamps do not show a straight line on a V-I graph because temperature rises.',
      examTips: 'Always check whether meters are placed correctly: Ammeters must be in SERIES, Voltmeters must be in PARALLEL!'
    }
  },
  {
    id: 'olevel-bio-cell-division',
    title: 'Mitosis vs. Meiosis & Genetics Fundamentals',
    level: 'olevel',
    subject: 'biology',
    grade: 'Form IV',
    summary: 'Compare somatic cell division with gametogenesis, chromosomes, diploid vs. haploid states, and monohybrid crosses.',
    readTimeMinutes: 13,
    tags: ['NECTA Biology 033', 'IGCSE 0610', 'Genetics'],
    pdfAvailable: true,
    videoAvailable: true,
    videoDuration: '15:10 min',
    hasLab: true,
    hasQuiz: true,
    keyConcepts: ['Prophase, Metaphase, Anaphase, Telophase', 'Diploid (2n) to Haploid (n)', 'Punnett Squares 3:1 ratio'],
    notesContent: {
      introduction: 'All living cells reproduce by dividing. Mitosis maintains identical genetic code for growth and tissue repair; meiosis generates genetic diversity for sexual reproduction.',
      sections: [
        {
          heading: '1. Comparison Matrix',
          body: 'Mitosis produces 2 genetically identical diploid daughter cells in 1 division. Meiosis produces 4 genetically variable haploid gametes across 2 divisions.',
          formulaOrHighlight: 'Monohybrid Heterozygous F2 Phenotypic Ratio = 3 : 1',
        }
      ],
      rocheTakeaway: 'Reasoning: Deduce inherited traits systematically using genetic diagrams with parental phenotypes, genotypes, and gamete circles.',
      examTips: 'Never skip labeling parental phenotypes, genotypes, gametes, and offspring genotypes in NECTA Section B questions.'
    }
  },
  {
    id: 'olevel-geo-map-reading',
    title: 'Topographic Map Reading & Grid References',
    level: 'olevel',
    subject: 'geography',
    grade: 'Form II - IV',
    summary: 'Master 4-figure and 6-figure grid references, contour line gradients, scale conversion, and physical landform interpretation.',
    readTimeMinutes: 14,
    tags: ['NECTA Geography 013', 'IGCSE 0460', 'Map Work'],
    pdfAvailable: true,
    videoAvailable: true,
    videoDuration: '18:00 min',
    hasLab: false,
    hasQuiz: true,
    keyConcepts: ['Eastings & Northings', 'Contour Interval', 'Calculating Gradient (VI/HE)'],
    notesContent: {
      introduction: 'Topographic maps are scaled 2D representations of 3D Earth terrain. In NECTA and Cambridge exams, map reading constitutes an essential 10-15 marks.',
      sections: [
        {
          heading: '1. Reading Grid References',
          body: 'Always read "along the corridor and up the stairs": Eastings first (vertical lines numbered left to right), followed by Northings (horizontal lines numbered bottom to top).',
          formulaOrHighlight: '4-Figure: (Eastings 2-digits)(Northings 2-digits) | 6-Figure: (E1E2e)(N1N2n)',
        },
        {
          heading: '2. Calculating Slope Gradient',
          body: 'Gradient = Vertical Interval (VI) divided by Horizontal Equivalent (HE). Both must be converted into identical units (meters).',
          formulaOrHighlight: 'Gradient = Vertical Interval (m) / Horizontal Distance (m)',
        }
      ],
      rocheTakeaway: 'Exploration: Close contour lines represent steep slopes or escarpments; spaced contour lines represent gentle plains.',
      examTips: 'Remember to state gradient as a ratio 1:X (e.g., 1 in 25) for NECTA grading rubrics.'
    }
  },

  // A-Level
  {
    id: 'alevel-math-calculus',
    title: 'Differential & Integral Calculus with Applications',
    level: 'alevel',
    subject: 'math',
    grade: 'Form V - VI',
    summary: 'Derivatives from first principles, chain rule, product & quotient rules, integration by parts, and maximum/minimum optimization.',
    readTimeMinutes: 18,
    tags: ['NECTA ACSEE 141', 'Cambridge 9709', 'Pure Math'],
    pdfAvailable: true,
    videoAvailable: true,
    videoDuration: '24:10 min',
    hasLab: false,
    hasQuiz: true,
    keyConcepts: ['Limits & dy/dx', 'Product/Quotient/Chain Rule', '∫ u dv = uv - ∫ v du'],
    notesContent: {
      introduction: 'Calculus is the mathematical language of rate of change and accumulation. It underpins physics, engineering, economics, and data science.',
      sections: [
        {
          heading: '1. Differentiation Rules',
          body: 'If y = u · v, then dy/dx = u(dv/dx) + v(du/dx). If y = u / v, dy/dx = [v(du/dx) - u(dv/dx)] / v².',
          formulaOrHighlight: 'd/dx [xⁿ] = n · xⁿ⁻¹   |   d/dx [sin(kx)] = k · cos(kx)',
        }
      ],
      rocheTakeaway: 'Calculation: At turning points, dy/dx = 0. Use the second derivative d²y/dx² to distinguish between local minima (>0) and local maxima (<0).',
      examTips: 'Do not forget the constant of integration (+ C) for indefinite integrals in ACSEE Paper 1.'
    }
  },
  {
    id: 'alevel-geo-gis-remote-sensing',
    title: 'GIS, Remote Sensing & Spatial Fieldwork Analysis',
    level: 'alevel',
    subject: 'geography',
    grade: 'Form V - VI',
    summary: 'Coordinate systems, raster vs. vector spatial data, satellite spectral bands, and spatial analysis in environmental management.',
    readTimeMinutes: 16,
    tags: ['NECTA ACSEE 113', 'Cambridge 9696', 'Spatial GIS'],
    pdfAvailable: true,
    videoAvailable: true,
    videoDuration: '20:30 min',
    hasLab: false,
    hasQuiz: true,
    keyConcepts: ['Vector (Point, Line, Polygon) vs. Raster', 'Georeferencing', 'Spectral Signatures & NDVI'],
    notesContent: {
      introduction: 'Geographic Information Systems (GIS) capture, store, manipulate, analyze, and display spatial or geographic data to solve real-world territorial challenges.',
      sections: [
        {
          heading: '1. Raster vs Vector Models',
          body: 'Vector data represents discrete geographical features using geometric primitives (points for boreholes, lines for roads/rivers, polygons for protected reserves). Raster data represents continuous surfaces with a grid of pixel cells (elevation DEM, satellite thermal imagery).',
          formulaOrHighlight: 'NDVI = (NIR - Red) / (NIR + Red)  [-1 to +1 vegetation index]',
        }
      ],
      rocheTakeaway: 'Exploration: GIS allows planners in Dodoma and Dar es Salaam to simulate urban sprawl, flood vulnerability, and wildlife corridor conservation.',
      examTips: 'ACSEE Geography Paper 1 Section A includes compulsory questions on GIS, remote sensing applications, and research surveying.'
    }
  },

  // University
  {
    id: 'uni-research-methods',
    title: 'Scientific Research Methodology & Proposal Design',
    level: 'university',
    subject: 'research',
    grade: 'Undergraduate / Postgrad',
    summary: 'Epistemology, quantitative vs. qualitative paradigms, sampling techniques, hypothesis testing, and academic thesis structure.',
    readTimeMinutes: 20,
    tags: ['Research Methods', 'Thesis Writing', 'Data Analysis'],
    pdfAvailable: true,
    videoAvailable: true,
    videoDuration: '25:00 min',
    hasLab: false,
    hasQuiz: true,
    keyConcepts: ['Problem Statement Formulation', 'Null vs Alternative Hypothesis', 'P-value & Statistical Significance (α = 0.05)'],
    notesContent: {
      introduction: 'Rigorous research is the engine of scientific discovery, guiding postgraduate scholars from empirical inquiry to peer-reviewed publication.',
      sections: [
        {
          heading: '1. The ROCHE Framework in Research',
          body: 'Reasoning formulates the conceptual framework; Observation collects empirical samples; Calculation computes inferential statistics (ANOVA, Chi-square, Regression); Hypothesis tests falsifiable claims; Exploration discovers novel paradigms and geographical distributions.',
          formulaOrHighlight: 't = (x̄₁ - x̄₂) / √[ (s₁²/n₁) + (s₂²/n₂) ]',
        }
      ],
      rocheTakeaway: 'Hypothesis: The null hypothesis (H₀) states there is no statistical significance between groups; we reject H₀ only when p < 0.05.',
      examTips: 'Ensure ethical clearance and representative sampling methodology are clearly articulated in Chapter 3 of your dissertation.'
    }
  }
];

export const PAST_PAPERS: PastPaper[] = [
  {
    id: 'necta-csee-2024-math',
    title: 'NECTA CSEE 2024 Basic Mathematics',
    board: 'NECTA',
    level: 'olevel',
    subject: 'math',
    year: 2024,
    code: '041 (NECTA CSEE)',
    duration: '3 Hours',
    totalMarks: 100,
    sectionsCount: 2,
    questions: [
      {
        qNum: 'Q1 (a)',
        question: 'Three bells toll at intervals of 9, 12, and 15 minutes respectively. If they toll together now, after how many hours will they toll together again?',
        marks: 5,
        solution: 'Step 1: Find the Lowest Common Multiple (LCM) of 9, 12, and 15.\nPrime factorizations:\n9 = 3²\n12 = 2² × 3\n15 = 3 × 5\nLCM = 2² × 3² × 5 = 4 × 9 × 5 = 180 minutes.\nStep 2: Convert minutes to hours: 180 ÷ 60 = 3 hours.\nTherefore, the three bells will toll together again after 3 hours.',
        rocheInsight: 'Calculation: Break each integer into prime factors to efficiently deduce the universal lowest multiple.'
      },
      {
        qNum: 'Q1 (b)',
        question: 'If log₁₀ 2 = 0.3010 and log₁₀ 3 = 0.4771, calculate the value of log₁₀ 72 without using mathematical tables.',
        marks: 5,
        solution: 'Step 1: Express 72 in terms of factors 2 and 3:\n72 = 8 × 9 = 2³ × 3².\nStep 2: Apply logarithmic rules:\nlog₁₀ (2³ × 3²) = log₁₀ (2³) + log₁₀ (3²)\n= 3 log₁₀ 2 + 2 log₁₀ 3\n= 3(0.3010) + 2(0.4771)\n= 0.9030 + 0.9542 = 1.8572.\nFinal Answer: 1.8572.',
        rocheInsight: 'Reasoning: Decompose complex values into known algorithmic bases using logarithmic identities.'
      },
      {
        qNum: 'Q4 (a)',
        question: 'A right-angled triangle has a base of length (x + 3) cm, height (x - 2) cm, and hypotenuse (x + 5) cm. Form a quadratic equation and determine the actual length of the hypotenuse.',
        marks: 6,
        solution: 'By Pythagoras Theorem: (x + 3)² + (x - 2)² = (x + 5)².\nExpand terms:\n(x² + 6x + 9) + (x² - 4x + 4) = x² + 10x + 25\n2x² + 2x + 13 = x² + 10x + 25\nx² - 8x - 12 = 0... wait, let us verify: 2x² - x² = x²; 2x - 10x = -8x; 13 - 25 = -12.\nFactorising: (x - 6)(x - 2)? (x - 6)(x + 2) is -4x. Using quadratic formula: x = [8 ± √(64 - 4(1)(-12))] / 2 = [8 ± √112] / 2 ≈ [8 ± 10.58]/2.\nFor x > 0: x ≈ 9.29 cm. Hypotenuse = 9.29 + 5 = 14.29 cm.',
        rocheInsight: 'Hypothesis: Only the positive root is physically valid because geometric lengths cannot be negative.'
      }
    ]
  },
  {
    id: 'necta-csee-2023-physics',
    title: 'NECTA CSEE 2023 Physics Paper 1',
    board: 'NECTA',
    level: 'olevel',
    subject: 'physics',
    year: 2023,
    code: '031 (NECTA CSEE)',
    duration: '3 Hours',
    totalMarks: 100,
    sectionsCount: 3,
    questions: [
      {
        qNum: 'Q3',
        question: 'A car of mass 1200 kg accelerates uniformly from rest to a velocity of 20 m/s in 10 seconds. Calculate: (i) Acceleration, (ii) Force exerted by engine, (iii) Work done during this period.',
        marks: 8,
        solution: '(i) Acceleration a = (v - u) / t = (20 - 0) / 10 = 2.0 m/s².\n(ii) Net Force F = m × a = 1200 kg × 2.0 m/s² = 2400 N.\n(iii) Distance s = ut + 0.5 at² = 0 + 0.5(2)(10²) = 100 m.\nWork done W = F × s = 2400 N × 100 m = 240,000 Joules (240 kJ).\nAlternatively, Kinetic Energy gain = 0.5 m v² = 0.5(1200)(20²) = 240,000 J.',
        rocheInsight: 'Observation: Notice how the work-energy theorem provides an independent second method to verify the answer!'
      },
      {
        qNum: 'Q7',
        question: 'Explain why a swimming pool appears shallower than its actual depth to an observer standing by the poolside, drawing a ray diagram.',
        marks: 6,
        solution: 'Cause: Refraction of light.\nWhen light rays travel from water (optically denser medium) into air (optically rarer medium), they refract away from the normal.\nThe human eye projects these refracted rays backwards in a straight line, forming a virtual image above the real pool floor.\nApparent depth = Real depth / Refractive index of water (η ≈ 1.33).',
        rocheInsight: 'Reasoning: The optical density difference alters wave velocity, bending the wavefront at the interface boundary.'
      }
    ]
  },
  {
    id: 'cambridge-igcse-2024-math',
    title: 'Cambridge IGCSE Mathematics (Extended 0580 Paper 4)',
    board: 'CAMBRIDGE',
    level: 'olevel',
    subject: 'math',
    year: 2024,
    code: '0580/42',
    duration: '2 Hours 30 Mins',
    totalMarks: 130,
    sectionsCount: 1,
    questions: [
      {
        qNum: 'Q2',
        question: 'A cylindrical water tank has radius 1.4 m and height 3.2 m. (a) Calculate the volume of the tank in litres (take π = 3.142). (b) Water flows into the empty tank at a rate of 45 litres per minute. Calculate the time taken to fill the tank to 80% capacity, giving your answer in hours and minutes.',
        marks: 8,
        solution: '(a) Volume = π r² h = 3.142 × (1.4)² × 3.2 = 3.142 × 1.96 × 3.2 = 19.706 m³.\nSince 1 m³ = 1,000 litres, Volume = 19,706 litres.\n(b) 80% capacity = 0.80 × 19,706 = 15,765 litres.\nTime in minutes = 15,765 ÷ 45 = 350.33 minutes.\nConvert to hours: 350.33 ÷ 60 = 5 hours with remainder 50.3 minutes ≈ 5 hours 50 minutes.',
        rocheInsight: 'Calculation: Unit conversion (m³ to litres to flow rate in minutes to hours) is where students commonly lose marks.'
      }
    ]
  },
  {
    id: 'necta-acsee-2023-advmath',
    title: 'NECTA ACSEE 2023 Advanced Mathematics Paper 1',
    board: 'NECTA',
    level: 'alevel',
    subject: 'math',
    year: 2023,
    code: '141/1 (NECTA ACSEE)',
    duration: '3 Hours',
    totalMarks: 100,
    sectionsCount: 2,
    questions: [
      {
        qNum: 'Q5',
        question: 'Find the coordinates of the stationary points on the curve y = 2x³ - 9x² + 12x - 3, and determine their nature by using the second derivative test.',
        marks: 8,
        solution: 'Step 1: First derivative dy/dx = 6x² - 18x + 12.\nSet dy/dx = 0: 6(x² - 3x + 2) = 0 ==> 6(x - 1)(x - 2) = 0.\nSo stationary points occur at x = 1 and x = 2.\nStep 2: Find corresponding y-values:\nAt x = 1: y = 2(1) - 9(1) + 12(1) - 3 = 2.\nPoint 1: (1, 2).\nAt x = 2: y = 2(8) - 9(4) + 12(2) - 3 = 16 - 36 + 24 - 3 = 1.\nPoint 2: (2, 1).\nStep 3: Second derivative d²y/dx² = 12x - 18.\nAt x = 1: d²y/dx² = 12(1) - 18 = -6 < 0 (Local Maximum).\nAt x = 2: d²y/dx² = 12(2) - 18 = +6 > 0 (Local Minimum).\nConclusion: (1, 2) is a local maximum and (2, 1) is a local minimum.',
        rocheInsight: 'Reasoning: When the rate of change of the slope is negative, the curve bends downwards like a dome (maximum).'
      }
    ]
  },
  {
    id: 'cambridge-igcse-2023-geo',
    title: 'Cambridge IGCSE Geography (0460 Theme 1 & 2)',
    board: 'CAMBRIDGE',
    level: 'olevel',
    subject: 'geography',
    year: 2023,
    code: '0460/12',
    duration: '1 Hour 45 Mins',
    totalMarks: 75,
    sectionsCount: 3,
    questions: [
      {
        qNum: 'Q1 (c)',
        question: 'For a named country you have studied, explain the causes of rural-to-urban migration and describe the impacts on the destination city (7 marks).',
        marks: 7,
        solution: 'Case Study: Tanzania (Migration from rural regions like Dodoma/Singida to Dar es Salaam).\nPush factors: Drought, subsistence agricultural yields, lack of piped clean water, limited tertiary clinics.\nPull factors: Formal employment in port and logistics, universities and colleges, perceived better living standards.\nImpacts on Dar es Salaam:\nPositive: Abundant labor supply for burgeoning manufacturing, transport, and service sectors.\nNegative: Pressure on urban housing leading to informal squatter settlements (e.g., in Tandale, Manzese), traffic congestion, strain on water infrastructure and sewage management.',
        rocheInsight: 'Exploration: Always structure case study responses with clear Push vs Pull geography classifications.'
      }
    ]
  },
  {
    id: 'necta-std7-psle-2023-sci',
    title: 'NECTA Standard VII PSLE 2023 Science & Technology',
    board: 'NECTA',
    level: 'primary',
    subject: 'science',
    year: 2023,
    code: '05 (NECTA PSLE)',
    duration: '1 Hour 30 Mins',
    totalMarks: 50,
    sectionsCount: 2,
    questions: [
      {
        qNum: 'Q12',
        question: 'Which component of human blood is primarily responsible for transporting oxygen from the lungs to all cells of the body?',
        marks: 2,
        solution: 'Red Blood Cells (Erythrocytes) containing hemoglobin.\nHemoglobin binds with oxygen molecules to form oxyhemoglobin, which travels via systemic arterial circulation to respiring tissue cells.',
        rocheInsight: 'Observation: Blood appears bright scarlet red when saturated with oxygen, and darker purplish red when deoxygenated.'
      }
    ]
  }
];

export const QUIZ_BANK: TopicQuiz[] = [
  {
    topicId: 'olevel-phys-ohms-law',
    topicTitle: "Ohm's Law, Circuits & Electric Current",
    level: 'olevel',
    subject: 'physics',
    questions: [
      {
        id: 'q1',
        question: "According to Ohm's Law, what is the mathematical relationship between Voltage (V), Current (I), and Resistance (R)?",
        options: ['V = I / R', 'V = I × R', 'V = R / I', 'V = I² × R'],
        correctIndex: 1,
        explanation: 'Ohm\'s Law states that V = I × R. The potential difference across a conductor is directly proportional to the current through it.',
        rochePillar: 'Calculation',
        formulaOrRule: 'V = I × R'
      },
      {
        id: 'q2',
        question: 'An electric kettle is connected to a 240 V mains supply and draws a current of 8 A. What is the electrical resistance of the heating element?',
        options: ['1920 Ω', '30 Ω', '0.033 Ω', '48 Ω'],
        correctIndex: 1,
        explanation: 'R = V / I = 240 V / 8 A = 30 Ω.',
        rochePillar: 'Calculation',
        formulaOrRule: 'R = V / I'
      },
      {
        id: 'q3',
        question: 'Two resistors of 6 Ω and 3 Ω are connected in PARALLEL. What is their combined equivalent resistance?',
        options: ['9 Ω', '18 Ω', '2 Ω', '4.5 Ω'],
        correctIndex: 2,
        explanation: 'For parallel: 1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2. Therefore R = 2 Ω.',
        rochePillar: 'Calculation',
        formulaOrRule: '1/R_total = 1/R1 + 1/R2'
      },
      {
        id: 'q4',
        question: 'Which instrument must always be connected in SERIES within an electrical circuit to measure electric current?',
        options: ['Voltmeter', 'Ohmmeter', 'Ammeter', 'Galvanometer in parallel'],
        correctIndex: 2,
        explanation: 'An Ammeter has very low internal resistance and must be connected in series so all circuit charge flows through it.',
        rochePillar: 'Observation'
      },
      {
        id: 'q5',
        question: 'What happens to the resistance of a standard metallic wire when its temperature increases?',
        options: ['Resistance decreases', 'Resistance increases', 'Resistance stays exactly zero', 'Resistance fluctuates randomly'],
        correctIndex: 1,
        explanation: 'Higher temperature causes metal ions in the lattice to vibrate more vigorously, increasing collision frequency with drifting electrons.',
        rochePillar: 'Reasoning'
      },
      {
        id: 'q6',
        question: 'What is the electrical power dissipated by an appliance drawing 2 A at 12 V?',
        options: ['6 W', '24 W', '14 W', '48 W'],
        correctIndex: 1,
        explanation: 'Power P = V × I = 12 V × 2 A = 24 Watts.',
        rochePillar: 'Calculation',
        formulaOrRule: 'P = V × I'
      },
      {
        id: 'q7',
        question: 'If the length of a uniform resistance wire is DOUBLED while keeping its cross-sectional area constant, what happens to its resistance?',
        options: ['It is halved', 'It remains the same', 'It doubles', 'It quadruples'],
        correctIndex: 2,
        explanation: 'Resistance is directly proportional to length: R = ρL / A. Doubling length doubles resistance.',
        rochePillar: 'Hypothesis',
        formulaOrRule: 'R ∝ L'
      },
      {
        id: 'q8',
        question: 'Which component protects domestic circuits from catastrophic over-currents by melting when current exceeds a rated threshold?',
        options: ['Diode', 'Fuse', 'Capacitor', 'Transformer'],
        correctIndex: 1,
        explanation: 'A fuse contains a thin wire with a low melting point that safely melts and breaks the circuit when an overload occurs.',
        rochePillar: 'Observation'
      },
      {
        id: 'q9',
        question: 'Three identical 10 Ω resistors are wired in SERIES across a 60 V battery. What is the current flowing from the battery?',
        options: ['6 A', '2 A', '20 A', '0.5 A'],
        correctIndex: 1,
        explanation: 'Total R = 10 + 10 + 10 = 30 Ω. Current I = V / R = 60 V / 30 Ω = 2 Amperes.',
        rochePillar: 'Calculation'
      },
      {
        id: 'q10',
        question: 'In a copper wire, what physical charge carriers actually flow to constitute electric current?',
        options: ['Protons', 'Positive ions', 'Free valence electrons', 'Neutrons'],
        correctIndex: 2,
        explanation: 'In metals, conduction electrons are delocalized and drift from the negative terminal towards the positive terminal.',
        rochePillar: 'Reasoning'
      }
    ]
  },
  {
    topicId: 'olevel-geo-map-reading',
    topicTitle: 'Map Reading & Topographic Analysis',
    level: 'olevel',
    subject: 'geography',
    questions: [
      {
        id: 'g1',
        question: 'On a standard 1:50,000 topographical map, what actual real-world distance does 2 cm on the map represent?',
        options: ['500 meters', '1 kilometer', '2 kilometers', '100 meters'],
        correctIndex: 1,
        explanation: '1 cm represents 50,000 cm = 500 m. Therefore, 2 cm represents 1,000 meters = 1 km.',
        rochePillar: 'Calculation',
        formulaOrRule: 'Scale: 1 cm = 50,000 cm = 0.5 km'
      },
      {
        id: 'g2',
        question: 'When quoting a six-figure grid reference, in what order must the coordinates be recorded?',
        options: ['Northings first, then Eastings', 'Eastings first, then Northings', 'Elevation first, then Bearing', 'Alphabetical order'],
        correctIndex: 1,
        explanation: 'Always read Eastings first (vertical lines going eastward), followed by Northings (horizontal lines going northward).',
        rochePillar: 'Exploration'
      },
      {
        id: 'g3',
        question: 'What landform is indicated when contour lines on a topographic map are spaced extremely close together?',
        options: ['A gentle flat valley', 'A steep slope, cliff, or escarpment', 'A sand dune', 'A lake surface'],
        correctIndex: 1,
        explanation: 'Closely packed contours signify rapid elevation increase over minimal horizontal distance, indicating a steep slope.',
        rochePillar: 'Observation'
      },
      {
        id: 'g4',
        question: 'What is the full cardinal compass bearing for South-East (SE)?',
        options: ['045°', '090°', '135°', '225°'],
        correctIndex: 2,
        explanation: 'North is 000°, East is 090°, South-East is halfway between 090° and 180° = 135°.',
        rochePillar: 'Calculation'
      },
      {
        id: 'g5',
        question: 'Which physical region of Tanzania is characterized by the Great Rift Valley western and eastern branches?',
        options: ['Coastal alluvial plains', 'The East African Rift System', 'Zanzibar Archipelago', 'Kilimanjaro crater rim exclusively'],
        correctIndex: 1,
        explanation: 'Tanzania is home to both the Eastern (Gregory) and Western (Albertine) branches of the Great Rift System.',
        rochePillar: 'Exploration'
      },
      {
        id: 'g6',
        question: 'If the Vertical Interval between two points is 100 meters and the Horizontal Distance is 2000 meters, what is the gradient?',
        options: ['1 in 20', '1 in 200', '1 in 2', '1 in 50'],
        correctIndex: 0,
        explanation: 'Gradient = VI / HE = 100 m / 2000 m = 1 / 20 (or 1 in 20).',
        rochePillar: 'Calculation',
        formulaOrRule: 'Gradient = VI / HE'
      },
      {
        id: 'g7',
        question: 'Which major port city in Tanzania handles over 90% of the nation\'s maritime international trade?',
        options: ['Mtwara', 'Tanga', 'Dar es Salaam', 'Bagamoyo'],
        correctIndex: 2,
        explanation: 'Dar es Salaam port serves as the strategic maritime gateway for Tanzania, Zambia, DRC, Rwanda, Burundi, and Uganda.',
        rochePillar: 'Exploration'
      },
      {
        id: 'g8',
        question: 'What symbol or color is universally used on topographic maps to represent perennial rivers, oceans, and lakes?',
        options: ['Brown', 'Green', 'Blue', 'Black dashed lines'],
        correctIndex: 2,
        explanation: 'Blue denotes hydrographic features including lakes, reservoirs, canals, and perennial rivers.',
        rochePillar: 'Observation'
      },
      {
        id: 'g9',
        question: 'What type of rainfall occurs when moisture-laden winds from the Indian Ocean are forced to rise over the Usambara or Kilimanjaro mountains?',
        options: ['Convectional rainfall', 'Orographic (Relief) rainfall', 'Frontal / Cyclonic rainfall', 'Artificial precipitation'],
        correctIndex: 1,
        explanation: 'Orographic precipitation occurs when air masses are uplifted over mountain barriers, cooling adiabatically.',
        rochePillar: 'Reasoning'
      },
      {
        id: 'g10',
        question: 'What is the official legislative and administrative capital city of Tanzania, designated by Mwalimu Julius Nyerere in 1973?',
        options: ['Arusha', 'Mwanza', 'Dar es Salaam', 'Dodoma'],
        correctIndex: 3,
        explanation: 'Dodoma is the official constitutional and parliamentary capital of the United Republic of Tanzania.',
        rochePillar: 'Exploration'
      }
    ]
  },
  {
    topicId: 'pri-math-fractions',
    topicTitle: 'Numbers, Fractions & Shapes for Primary',
    level: 'primary',
    subject: 'math',
    questions: [
      {
        id: 'pm1',
        question: 'If you have a circular chapati cut into 4 equal slices and you eat 1 slice, what fraction of the chapati did you eat?',
        options: ['1/2', '1/4', '3/4', '1/3'],
        correctIndex: 1,
        explanation: 'You ate 1 slice out of 4 total slices, which is written as 1/4.',
        rochePillar: 'Observation'
      },
      {
        id: 'pm2',
        question: 'Which of these fractions is equal to 1/2?',
        options: ['2/4', '1/3', '3/5', '2/6'],
        correctIndex: 0,
        explanation: '2/4 is equivalent to 1/2 because if you divide both top and bottom by 2, you get 1/2.',
        rochePillar: 'Reasoning'
      },
      {
        id: 'pm3',
        question: 'How many sides does a regular Pentagon have?',
        options: ['4 sides', '5 sides', '6 sides', '8 sides'],
        correctIndex: 1,
        explanation: 'A pentagon has 5 straight sides and 5 vertices.',
        rochePillar: 'Observation'
      },
      {
        id: 'pm4',
        question: 'Calculate: 1/5 + 2/5 = ?',
        options: ['3/10', '3/5', '2/25', '1/5'],
        correctIndex: 1,
        explanation: 'Since the denominators are both 5, simply add the numerators: 1 + 2 = 3. So the answer is 3/5.',
        rochePillar: 'Calculation'
      },
      {
        id: 'pm5',
        question: 'Which number is an ODD number?',
        options: ['12', '24', '37', '50'],
        correctIndex: 2,
        explanation: '37 ends with 7 and cannot be divided evenly by 2, so it is an odd number.',
        rochePillar: 'Reasoning'
      },
      {
        id: 'pm6',
        question: 'A farmer in Morogoro has 24 mangoes and packs them equally into 4 baskets. How many mangoes are in each basket?',
        options: ['4', '6', '8', '12'],
        correctIndex: 1,
        explanation: '24 ÷ 4 = 6 mangoes in each basket.',
        rochePillar: 'Calculation'
      },
      {
        id: 'pm7',
        question: 'What is the perimeter of a square whose side is 5 centimeters long?',
        options: ['20 cm', '25 cm', '10 cm', '15 cm'],
        correctIndex: 0,
        explanation: 'A square has 4 equal sides: 5 + 5 + 5 + 5 = 20 cm.',
        rochePillar: 'Calculation'
      },
      {
        id: 'pm8',
        question: 'Which fraction is the BIGGEST?',
        options: ['1/8', '1/4', '1/2', '1/10'],
        correctIndex: 2,
        explanation: 'Sharing with 2 people gives much bigger slices than sharing with 8 or 10 people! 1/2 is the largest.',
        rochePillar: 'Reasoning'
      },
      {
        id: 'pm9',
        question: 'How many minutes are in 1 hour?',
        options: ['30 minutes', '60 minutes', '100 minutes', '12 minutes'],
        correctIndex: 1,
        explanation: 'There are 60 minutes in 1 hour.',
        rochePillar: 'Observation'
      },
      {
        id: 'pm10',
        question: 'If you stand facing East during sunrise, which direction is on your left hand?',
        options: ['South', 'West', 'North', 'Down'],
        correctIndex: 2,
        explanation: 'When facing East, North is directly on your left hand and South is on your right.',
        rochePillar: 'Exploration'
      }
    ]
  }
];

export const TANZANIA_REGIONS = ALL_31_TANZANIA_REGIONS;
