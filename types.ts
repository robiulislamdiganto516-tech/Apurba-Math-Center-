
export type Screen = 'SPLASH' | 'LOGIN' | 'HOME' | 'CHAPTERS' | 'FORMULAS' | 'PRACTICE' | 'QUIZ' | 'PROGRESS' | 'PROFILE' | 'AI_SOLVER' | 'HELP';

export interface Chapter {
  id: string;
  number: number;
  title: string;
  titleBn: string;
  category: string;
  completion: number;
  icon: string;
}

export interface Formula {
  id: string;
  title: string;
  expression: string;
  description: string;
  category: string;
  bookmarked: boolean;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  hint?: string;
  explanation?: string;
}

export interface ProgressData {
  chapterId: string;
  chapterTitle: string;
  accuracy: number;
  completed: boolean;
}
