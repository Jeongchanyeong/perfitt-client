import { FormProvider, useForm } from 'react-hook-form';
import { FormValues } from '../../../types/sign';
import Button from '../../common/Button'; // 버튼 추가
import SUIdetails from '../signup/SUIdetails';
import { doc, updateDoc } from 'firebase/firestore';
import Header from '../../common/Header';
import { db } from '../../../service/firebase';
import UserLoader from '../../../stores/UserLoder';
import { useContext, useState } from 'react';
import SUInfo from '../signup/SUInfo';

import { AuthContext } from '../../../service/AuthContext';
import { getAuth } from 'firebase/auth';
import { useUserStore } from '../../../stores/UserState';

const UpdateInfo = () => {
  const [state, setState] = useState<'start' | 'end'>('start');
  const userdata = useContext(AuthContext);
  const uid = userdata?.uid;
  const user = useUserStore(state => state.user);

  const auth = getAuth();
  const gooleEmail = auth.currentUser?.email;

  const methods = useForm<FormValues>({
    defaultValues: {
      email: user?.email || gooleEmail || '',
      password: uid || '',
      name: user?.name || '',
      gender: user?.gender || '',
      year: user?.birth?.year || '',
      month: user?.birth?.month || '',
      day: user?.birth?.day || '',
      size: user?.size || '',
    },
  });

  const { handleSubmit } = methods;
  const onSubmit = async (data: FormValues) => {
    if (uid) {
      const updateUserInfo = async (uid: string) => {
        try {
          const userDocRef = doc(db, 'user', uid);

          // Firestore 문서 업데이트
          await updateDoc(userDocRef, {
            name: data.name,
            gender: data.gender,
            birth: {
              year: parseInt(data.year.slice(0, -1)),
              month: parseInt(data.month.slice(0, -1)),
              day: parseInt(data.day.slice(0, -1)),
            },
            size: data.size.split('/')[0],
          });

          alert('업데이트되었습니다.');
          window.location.reload();
          // 성공적으로 업데이트 후 네비게이트
        } catch (error) {
          console.error('문서 업데이트 중 오류가 발생했습니다: ', error);
        }
      };

      // 사용자 UID로 업데이트 호출
      await updateUserInfo(uid);
    } else {
      console.error('사용자가 로그인되어 있지 않습니다.');
    }
  };

  const handleNextClick = handleSubmit(data => {
    if (state === 'start') {
      setState('end'); // 상태를 'end'로 변경
    } else {
      onSubmit(data); // 최종 제출
      console.log('입력된 데이터:', data);
    }
  });

  return (
    <>
      <UserLoader uid={uid} />
      <FormProvider {...methods}>
        <Header title='내 정보 수정' />
        {state === 'start' ? <SUInfo user={user} /> : <SUIdetails user={user} />}
        <div className='px-4 mb-[34px]'>
          <Button onClick={handleNextClick}>{state === 'start' ? '다음' : '수정 완료'}</Button>
        </div>
      </FormProvider>
    </>
  );
};
export default UpdateInfo;
