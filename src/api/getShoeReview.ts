import { doc, getDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import { getProduct } from "./getProduct";

export const getShoeReview = async (uid: string, productId: string) => {
  try {
    const reviewDoc = await getDoc(doc(db, 'shoeRack', uid, 'products', productId));

    if (reviewDoc.exists()) {
      const shoeInfo = await getProduct(productId);
      return {
        ...shoeInfo,
        ...reviewDoc.data(),
        productId: productId,
        datetime: reviewDoc.data().datetime.toDate()
      };
    } else {
      console.log("해당 문서가 존재하지 않습니다.");
      return null;
    }
  } catch (error) {
    throw error;
  }
}