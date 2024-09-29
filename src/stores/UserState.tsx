import { create } from 'zustand';

// Zustand 상태 정의
type UserState = {
  user: TUser | null; // 사용자 정보
  setUser: (user: TUser | null) => void; // 사용자 정보를 설정하는 함수
};

// Zustand로 상태 생성
export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({ user }),
}));
