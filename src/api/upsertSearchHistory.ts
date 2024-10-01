import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebase';
import { TSearchHistory } from '../types/db';

export const upsertSearchHistory = async (uid: string, data: TSearchHistory[]) => {
  try {
    await setDoc(doc(db, 'search', uid), { text: data });
    return 'success';
  } catch (error) {
    throw error;
  }
};
