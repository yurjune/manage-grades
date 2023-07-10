import { db } from '@/firebase-config';
import { Student } from '@/model';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

export const firestoreApi = createApi({
  reducerPath: 'firestore/api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Students'],
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], Pick<Student, 'group'>>({
      queryFn: async ({ group }) => {
        try {
          const students: Student[] = [];
          const ref = collection(db, 'students');
          const snapshot =
            group !== ''
              ? await getDocs(query(ref, where('group', '==', group)))
              : await getDocs(ref);

          snapshot?.forEach((doc) => {
            const student = { uid: doc.id, ...doc.data() } as Student;
            students.push(student);
          });

          return { data: students };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ['Students'],
    }),
    getStudent: builder.query<Student | null, string>({
      queryFn: async (uid) => {
        try {
          const ref = doc(db, 'students', uid);
          const snapshot = await getDoc(ref);
          const student = snapshot.exists() ? ({ uid, ...snapshot.data() } as Student) : null;
          return { data: student };
        } catch (err) {
          return { error: err };
        }
      },
    }),
    addStudent: builder.mutation<null, Omit<Student, 'uid' | 'semesters'>>({
      queryFn: async (data) => {
        try {
          const ref = collection(db, 'students');
          await addDoc(ref, data);
          return { data: null };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ['Students'],
    }),
    editStudent: builder.mutation<null, Student>({
      queryFn: async (args) => {
        try {
          const ref = doc(db, 'students', args.uid);
          await setDoc(ref, { ...args });
          return { data: null };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ['Students'],
    }),
    deleteStudent: builder.mutation<null, string>({
      queryFn: async (uid) => {
        try {
          const ref = doc(db, 'students', uid);
          await deleteDoc(ref);
          return { data: null };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ['Students'],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useEditStudentMutation,
  useGetStudentQuery,
  useDeleteStudentMutation,
} = firestoreApi;
