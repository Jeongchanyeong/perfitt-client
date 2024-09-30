import { create } from "zustand";
import { TShoeRackReview } from "../types/db";
import { TShoeRackItem } from "../types/shoerack";
import { getShoeRack } from "../api/getShoeRack";
import { getShoeReview } from "../api/getShoeReview";
import { deleteShoeReview } from "../api/deleteShoeReview";
import { upsertShoeReview } from "../api/upsertShoeReview";

export type TShoeRackStore = {
  shoeRack: TShoeRackItem[] | null;
  fetchShoeRack: (uid: string) => void;
  getProductById: (uid: string, productId: string) => TShoeRackItem | null;
  deleteProductById: (uid: string, productId: string) => Promise<string | null>;
  upsertProductById: (uid: string, productId: string, review: TShoeRackReview) => Promise<string | null>;
};

export const useShoeRackStore = create<TShoeRackStore>((set, get) => ({
  shoeRack: null,

  fetchShoeRack: async (uid: string) => {
    const data = await getShoeRack(uid);
    set({shoeRack: data});
  },

  getProductById: async (uid: string, productId: string) => {
    const {shoeRack} = get();
    const shoeData = shoeRack?.find(shoe => shoe.id === productId);
    if (!shoeData) return await getShoeReview(uid, productId);
    else return shoeData;
  },

  deleteProductById: async (uid: string, productId: string) => {
    try {
      const result = await deleteShoeReview(uid, productId);
      if (result === 'success') {
        await get().fetchShoeRack(uid);
        return result;
      } else return null;
    } catch (error) {
      console.error("문서 삭제 중 오류 발생: ", error);
      return null;
    }
  },

  upsertProductById: async (uid: string, productId: string, review: TShoeRackReview) => {
    try {
      const result = await upsertShoeReview(uid, productId, review);
      if (result === 'success') {
        await get().fetchShoeRack(uid);
        return result;
      } else return null;
    } catch (error) {
      console.error("문서 추가/업데이트 중 오류 발생: ", error);
      return null;
    }
  }
}));