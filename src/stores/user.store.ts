import { create } from "zustand";
import { TUser } from "../types/db";
import { getUserInfo } from "../api/getUserInfo";

export type TUserStore = {
  user: TUser | null;
  fetchUserInfo: (uid: string) => void;
}

export const useUserStore = create<TUserStore>((set) => ({
  user: null,

  fetchUserInfo: async (uid: string) => {
    const data = await getUserInfo(uid);
    set({user: data});
  }
}))