import { Timestamp } from 'firebase/firestore';
import { TSearchHistory } from '../types/db';
import { upsertSearchHistory } from '../api/upsertSearchHistory';

export const updateSearchHistory = async (uid: string, text: string, data: TSearchHistory[]) => {
  let updated = false;

  try {
    // 일치하는 데이터가 있을 경우 datetime 업데이트
    const updatedData = data.map((history: TSearchHistory) => {
      if (history.value === text) {
        updated = true;
        return { ...history, datetime: Timestamp.now() };
      } else return history;
    });
    
    // 일치하는 데이터가 없을 경우 새로운 데이터 추가
    if (!updated) {
      updatedData.push({
        value: text,
        datetime: Timestamp.now(),
      });
    }

    // 데이터 50개 초과 시, 가장 오래된 데이터 제거
    if (updatedData.length > 50) updatedData.pop();

    // Firestore에 데이터 업데이트
    await upsertSearchHistory(uid, updatedData);
  } catch (error) {
    console.log('e', error);
    throw error;
  }
};
