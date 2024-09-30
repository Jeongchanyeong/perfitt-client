import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../service/firebase';
import { useNavigate } from 'react-router-dom';
import { FormValues } from '../types/sign';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import SUIdetails from '../components/contents/signup/SUIdetails';
import SUInfo from '../components/contents/signup/SUInfo';
import { FormProvider, useForm } from 'react-hook-form';

const SignUp = () => {
  const [state, setState] = useState<'start' | 'end'>('start');
  const navigate = useNavigate();

  // useForm 훅을 사용하여 폼 관리
  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      gender: '',
      year: '',
      month: '',
      day: '',
      size: '',
    },
  });

  const { handleSubmit } = methods;

  // 최종 제출 함수
  const onSubmit = async (data: FormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const userId = userCredential.user.uid;

      await setDoc(doc(db, 'user', userId), {
        name: data.name,
        email: data.email,
        gender: data.gender,
        birth: {
          year: parseInt(data.year.slice(0, -1)),
          month: parseInt(data.month.slice(0, -1)),
          day: parseInt(data.day.slice(0, -1)),
        },
        size: data.size.split('/')[0],
      });

      alert('회원가입 성공');
      navigate('/signin');
    } catch (e) {
      if (e instanceof Error) {
        console.error('회원가입 실패:', e);
        alert(`회원가입 실패: ${e.message}`);
      } else {
        console.error('회원가입 실패:', e);
        alert('회원가입 실패: 알 수 없는 오류');
      }
    }
  };

  // 단계별로 폼을 제출하는 함수
  const handleNextClick = handleSubmit(data => {
    if (state === 'start') {
      console.log('입력된 데이터:', data);
      setState('end'); // 상태를 'end'로 변경
    } else {
      onSubmit(data); // 최종 제출
    }
  });

  return (
    <>
      <FormProvider {...methods}>
        <Header title='회원가입' />
        {state === 'start' ? <SUInfo /> : <SUIdetails />}
        <div className='px-4 mb-[34px]'>
          <Button onClick={handleNextClick}>{state === 'start' ? '다음' : '가입 완료'}</Button>
        </div>
      </FormProvider>
    </>
  );
};

export default SignUp;
