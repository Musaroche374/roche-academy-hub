export type EducationLevel = 'primary' | 'olevel' | 'alevel' | 'university';

export type SubjectCategory = 
  | 'all'
  | 'math'
  | 'science'
  | 'biology'
  | 'chemistry'
  | 'physics'
  | 'geography'
  | 'research';

export type ExamBoard = 'NECTA' | 'CAMBRIDGE' | 'MOCK' | 'UNIVERSITY';

export interface TopicLesson {
  id: string;
  title: string;
  level: EducationLevel;
  subject: SubjectCategory;
  grade: string; // e.g., 'Standard 4', 'Form II', 'Form VI', 'Undergraduate'
  summary: string;
  readTimeMinutes: number;
  tags: string[];
  pdfAvailable: boolean;
  videoAvailable: boolean;
  videoDuration?: string;
  hasLab: boolean;
  hasQuiz: boolean;
  keyConcepts: string[];
  notesContent: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
      formulaOrHighlight?: string;
      diagramHint?: string;
    }[];
    rocheTakeaway: string; // The R-O-C-H-E application
    examTips: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  rochePillar: 'Reasoning' | 'Observation' | 'Calculation' | 'Hypothesis' | 'Exploration';
  formulaOrRule?: string;
}

export interface TopicQuiz {
  topicId: string;
  topicTitle: string;
  level: EducationLevel;
  subject: SubjectCategory;
  questions: QuizQuestion[]; // 10 questions
}

export interface PastPaper {
  id: string;
  title: string;
  board: ExamBoard;
  level: EducationLevel;
  subject: SubjectCategory;
  year: number;
  code: string; // e.g., "041 (NECTA CSEE)", "0580 (Cambridge IGCSE)"
  duration: string;
  totalMarks: number;
  sectionsCount: number;
  questions: {
    qNum: string;
    question: string;
    marks: number;
    solution: string;
    rocheInsight: string;
  }[];
}

export interface TanzaniaRegion {
  id: string;
  name: string;
  zone: 'Northern' | 'Coastal' | 'Lake' | 'Central' | 'Southern Highlands' | 'Zanzibar' | 'Western';
  capital: string;
  coordinates: { x: number; y: number }; // Relative SVG percentage
  districts?: string[];
  populationApprox?: string;
  areaKm2?: number;
  keyFeatures: string[];
  physicalLandforms?: string[];
  climate: string;
  majorEconomicActivities: string[];
  industrialDevelopments?: string[];
  transportationLinks?: {
    railways?: string[];
    highways?: string[];
    airports?: string[];
    portsWaterways?: string[];
    pipelines?: string[];
  };
  geographicalImportance: string;
  nectaExamFact: string;
}

export type UserRole = 'student' | 'teacher' | 'parent' | 'researcher';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  level: EducationLevel;
  schoolOrOrg: string;
  joinedDate: string;
  avatarColor: string;
}
