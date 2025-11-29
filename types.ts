
export interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  category: string;
}

export type UserAnswers = Record<number, 'A' | 'B' | 'C' | 'D'>;

export interface QuizResult {
  id: string;
  date: string;
  mode: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
}
