import { create } from 'zustand';
import { TUser } from '../types/db';

// Zustand 상태 정의
type UserState = {
  user: TUser | null; // 사용자 정보 상태
  setUser: (user: TUser | null) => void; // 사용자 정보를 설정하는 함수
  clearUser: () => void; // 사용자 정보를 초기화하는 함수 (옵션)
};

// Zustand로 상태 생성
export const useUserStore = create<UserState>(set => ({
  user: null, // 초기값
  setUser: (user: TUser | null) => set({ user }), // 사용자 정보를 설정하는 함수
  clearUser: () => set({ user: null }), // 사용자 정보를 초기화하는 함수
}));
