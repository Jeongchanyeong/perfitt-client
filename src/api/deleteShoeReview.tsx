import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../service/firebase';

export const deleteShoeReview = async (uid: string, productId: string) => {
  try {
    await deleteDoc(doc(db, 'shoeRack', uid, 'products', productId));
    return 'success';
  } catch (error) {
    throw error;
  }
};
