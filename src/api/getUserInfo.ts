import { doc, getDoc } from "firebase/firestore";
import { db } from "../service/firebase";

export const getUserInfo = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "user", uid));
    if (userDoc.exists()) {
      return {
        name: userDoc.data().name,
        email: userDoc.data().email,
        gender: userDoc.data().gender,
        birth: userDoc.data().birth,
        size: userDoc.data().size,
        profile: userDoc.data().profile
      };
    } else {
      console.log("해당 사용자의 문서가 없습니다.");
      return null;
    }
  } catch (error) {
    throw error;
  }
};