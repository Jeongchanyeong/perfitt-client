import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../service/firebase';
import { TSearchHistory } from '../types/db';

export const getSearchHistory = async (uid: string) => {
  try {
    const searchDoc = await getDoc(doc(db, 'search', uid));
    if (!searchDoc.exists()) return [];
    const searchHistory = searchDoc.data().text as TSearchHistory[];
    return searchHistory.sort((a, b) => {
      return (b.datetime as Timestamp).seconds - (a.datetime as Timestamp).seconds;
    });
  } catch (error) {
    throw error;
  }
};
