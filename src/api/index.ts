import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

export const getStudents = async () => {
  const snapshot = await getDocs(collection(db, 'students'));
  const result: any[] = [];
  snapshot.forEach((doc) => result.push(doc.data()));
  return result;
};

export const addStudents = async (data: Record<string, string>) => {
  try {
    await addDoc(collection(db, 'students'), data);
  } catch (err) {
    console.error(err);
  }
};
