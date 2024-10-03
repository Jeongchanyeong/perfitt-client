import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../service/firebase';

export const deleteSearchHistory = async (uid: string) => {
  try {
    await deleteDoc(doc(db, 'search', uid));
    return 'success';
  } catch (error) {
    throw error;
  }
};