import { Score, Student } from '@/model';

export const getAverageScoresOfSemester = (students: Student[], semester: string): Score | null => {
  const semesters = students
    .filter((student) => student.semesters?.[semester])
    .map((student) => student.semesters?.[semester]);

  // TODO: get rid of type assertion
  return semesters.length !== 0 ? calculateAverageScores(semesters as Score[]) : null;
};

const calculateAverageScores = (semesters: Score[]): Score => {
  const initialScores = { math: 0, english: 0 };
  const copiedSemesters = semesters.map((item) => ({ ...item }));

  const totalScore = copiedSemesters.reduce(sumAllScores, initialScores);
  totalScore.math /= copiedSemesters.length;
  totalScore.english /= copiedSemesters.length;

  return totalScore;
};

// TODO: 과목 확장 가능하도록 수정
const sumAllScores = (acc: Score, cur: Score): Score => {
  acc.math += cur.math;
  acc.english += cur.english;
  return acc;
};
