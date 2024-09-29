import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebase";
import { getProduct } from "./getProduct";

export const getShoeRack = async (uid: string) => {
  try {
    const products = await getDocs(collection(db, 'shoeRack', uid, 'products'));
    const shoeRackData = [];
    for (const product of products.docs) {
      const shoeInfo = await getProduct(product.id);
      shoeRackData.push({
        ...product.data(),
        ...shoeInfo,
        productId: product.id,
        datetime: product.data().datetime.toDate(),
      });
    }
    return shoeRackData;
  } catch (error) {
    throw error;
  }
}