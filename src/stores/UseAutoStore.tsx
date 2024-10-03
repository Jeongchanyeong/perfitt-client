import { create } from 'zustand';

type AuthState = {
  uid: string | null;
  setUid: (uid: string | undefined) => void; // uid를 설정하는 함수
};

// Zustand 스토어 생성
const useAuthStore = create<AuthState>(set => ({
  uid: null,
  setUid: uid => set({ uid }), // uid 업데이트 액션
}));

export default useAuthStore;
