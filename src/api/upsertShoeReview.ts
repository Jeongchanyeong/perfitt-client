import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebase';
import { TShoeRackReview } from '../types/db';

export const upsertShoeReview = async (uid: string, productId: string, data: TShoeRackReview) => {
  try {
    const shoeDocRef = doc(db, 'shoeRack', uid, 'products', productId);
    await setDoc(shoeDocRef, {
      star: data.star,
      length: data.length,
      width: data.width,
      height: data.height,
      cushion: data.cushion,
      weight: data.weight,
      size: data.size,
      review: data.review,
      datetime: new Date(),
    }, { merge: true });
    return 'success';
  } catch (error) {
    throw error;
  }
};