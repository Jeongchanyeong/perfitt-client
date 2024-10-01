import { create } from "zustand";
import { TSearchHistory } from "../types/db";
import { getSearchHistory } from "../api/getSearchHistory";
import { upsertSearchHistory } from "../api/upsertSearchHistory";
import { deleteSearchHistory } from "../api/deleteSearchHistory";
import { updateSearchHistory } from "../hooks/updateSearchHistory";

export type TSearchStore = {
  searchHistory: TSearchHistory[];
  fetchHistory: (uid: string) => void;
  updateHistory: (uid: string, text: string) => void;
  deleteHistory: (uid: string, text: string) => void;
  deleteAllHistory: (uid: string) => void;
}

export const useSearchStore = create<TSearchStore>((set, get) => ({
  searchHistory: [],

  fetchHistory: async (uid: string) => {
    const data = await getSearchHistory(uid);
    set({ searchHistory: data });
  },

  updateHistory: async (uid: string, text: string) => {
    const { searchHistory } = get();
    await get().fetchHistory(uid);
    updateSearchHistory(uid, text, searchHistory || []);
  },

  deleteHistory: async (uid: string, text: string) => {
    const { searchHistory } = get();
    await get().fetchHistory(uid);

    const deletedData = searchHistory.filter(item => item.value !== text);
    const res = await upsertSearchHistory(uid, deletedData);
    if (res === 'success') set({ searchHistory: deletedData });
  },

  deleteAllHistory: async (uid: string) => {
    const res = await deleteSearchHistory(uid);
    if (res === 'success') set({ searchHistory: [] });
  }
}))