import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebase';
import { TProduct } from '../types/db';

export const upsertProduct = async (shoeData: TProduct) => {
  try {
    const shoeDocRef = doc(db, 'product', shoeData.productId);
    await setDoc(shoeDocRef, {
      brand: shoeData.brand,
      image: shoeData.image,
      link: shoeData.link,
      modelName: shoeData.modelName,
      modelNo: shoeData.modelNo
    }, { merge: true });
    return 'success';
  } catch (error) {
    throw error;
  }
};