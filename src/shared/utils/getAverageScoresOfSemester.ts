import { Score, Semesters, Student } from '@/shared/model';

type studentWithGivenSemester = Student & {
  semesters: Semesters;
};

export const getAverageScoresOfSemester = (students: Student[], semester: string): Score | null => {
  const semesters = students
    .filter((stu): stu is studentWithGivenSemester => Boolean(stu.semesters?.[semester]))
    .map((stu) => stu.semesters[semester]);

  return semesters.length !== 0 ? calculateAverageScores(semesters) : null;
};

const calculateAverageScores = (semesters: Score[]): Score => {
  const initialScores = { korean: 0, math: 0, english: 0, science: 0 };
  const copiedSemesters = semesters.map((item) => ({ ...item }));

  const totalScore = copiedSemesters.reduce(sumAllScores, initialScores);
  totalScore.korean /= copiedSemesters.length;
  totalScore.math /= copiedSemesters.length;
  totalScore.english /= copiedSemesters.length;
  totalScore.science /= copiedSemesters.length;

  return totalScore;
};

// TODO: 과목 확장 가능하도록 수정
const sumAllScores = (acc: Score, cur: Score): Score => {
  acc.korean += cur.korean;
  acc.math += cur.math;
  acc.english += cur.english;
  acc.science += cur.science;
  return acc;
};
