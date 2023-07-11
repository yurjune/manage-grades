export type Score = {
  korean: number;
  math: number;
  english: number;
  science: number;
};

export type Semesters = {
  [index: string]: Score;
};
