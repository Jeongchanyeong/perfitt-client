import { doc, getDoc } from "firebase/firestore";
import { db } from "../service/firebase";

export const getProduct = async (productId: string) => {
  try {
    const productDoc = await getDoc(doc(db, "product", productId));
    if (productDoc.exists()) {
      return {
        brand: productDoc.data().brand,
        image: productDoc.data().image,
        link: productDoc.data().link,
        modelName: productDoc.data().modelName,
        modelNo: productDoc.data().modelNo
      };
    } else {
      console.log("해당 문서가 없습니다.");
      return null;
    }
  } catch (error) {
    throw error;
  }
};