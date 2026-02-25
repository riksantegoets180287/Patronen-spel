
export type LevelType = 'NEXT' | 'FILL' | 'ODD' | 'RULE';
export type Category = 'smiley' | 'vehicle' | 'heart' | 'mix';

export interface Level {
  id: number;
  title: string;
  instruction: string;
  type: LevelType;
  slotCount: number;
  category: Category;
  pattern: string[];
  options: string[];
  correct: any;
  ruleLabel?: string;
}

export interface User {
  name: string;
  classGroup: string;
}

export interface LevelResult {
  levelId: number;
  attempts: number;
  stars: number;
  type: LevelType;
}
