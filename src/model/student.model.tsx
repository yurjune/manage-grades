import { Semester } from './Semester.model';

export type Student = {
  name: string;
  grade: string;
  group: string;
  gender: string;
  uid: string;
  semesters: Semester;
};
