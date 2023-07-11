import { Score, Student } from '@/model';

// TODO: Group, 과목 확장 가능하도록 수정
export const getTotalScoresForCurrentSemester = (students: Student[], currentSemester: string) => {
  const semesterOfA = collectCurrentSemestersOfEachGroup(students, 'A', currentSemester);
  const semesterOfB = collectCurrentSemestersOfEachGroup(students, 'B', currentSemester);
  const semesterOfC = collectCurrentSemestersOfEachGroup(students, 'C', currentSemester);

  // TODO: get rid of type assertion
  const averageA = getAverageScoreOfSemester(semesterOfA as Score[]);
  const averageB = getAverageScoreOfSemester(semesterOfB as Score[]);
  const averageC = getAverageScoreOfSemester(semesterOfC as Score[]);

  const totalScore = {
    math: (averageA.math + averageB.math + averageC.math) / 3,
    english: (averageA.english + averageB.english + averageC.english) / 3,
  };

  return { totalScore, averageA, averageB, averageC };
};

const getAverageScoreOfSemester = (semesters: Score[]): Score => {
  const copiedSemesters = semesters.map((item) => ({ ...item }));
  const totalScore = copiedSemesters.reduce(sumAllScores);
  totalScore.math /= copiedSemesters.length;
  totalScore.english /= copiedSemesters.length;
  return totalScore;
};

const collectCurrentSemestersOfEachGroup = (
  students: Student[],
  group: string,
  semester: string,
) => {
  return students
    .filter(belongsToGroup(group))
    .filter(hasCurrentSemester(semester))
    .map(extractSemester(semester));
};

const belongsToGroup = (group: string) => (student: Student) => student.group === group;

const hasCurrentSemester = (semestser: string) => (student: Student) =>
  student.semesters?.[semestser];

const extractSemester = (semestser: string) => (student: Student) => student.semesters?.[semestser];

// TODO: 과목 확장 가능하도록 수정
const sumAllScores = (acc: Score, cur: Score): Score => {
  acc.math += cur.math;
  acc.english += cur.english;
  return acc;
};
