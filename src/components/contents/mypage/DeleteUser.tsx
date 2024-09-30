import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import SUInput from '../signup/SUInput';
import Button from '../../common/Button';
import { FormValues } from '../../../types/sign';
import Header from '../../common/Header';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../service/firebase';

const DeleteUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const uid = user?.uid;

  const { handleSubmit, control } = methods; // handleSubmit과 control을 가져옴

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data; // 폼 데이터를 가져옴

    if (user && uid) {
      try {
        // 재인증 필요 시 EmailAuthProvider 사용
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential);

        // 재인증이 성공하면 계정 삭제
        await deleteUser(user);
        await deleteDoc(doc(db, 'user', uid));
        alert('계정이 성공적으로 삭제되었습니다.');
        auth.signOut();
        navigate('/chat/signin');
      } catch (error) {
        alert('계정 삭제 중 오류 발생: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
      }
    } else {
      alert('사용자가 인증되지 않았습니다.');
    }
  };

  return (
    <>
      <Header title='회원탈퇴' />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2  p-4'>
            <Controller
              name='email'
              control={control}
              rules={{
                required: '이메일을 입력해 주세요',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: '이메일 형식이 아닙니다.',
                },
              }}
              render={({ field, fieldState }) => (
                <SUInput
                  label='아이디'
                  className='px-4 py-3.5'
                  id='email'
                  {...field}
                  placeholder='이메일을 입력해 주세요'
                  isError={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              rules={{
                required: { value: true, message: '비밀번호를 입력해주세요' },
                minLength: { value: 6, message: '비밀번호는 최소 6자 이상이어야 합니다' },
              }}
              render={({ field, fieldState }) => (
                <SUInput
                  label='비밀번호'
                  className='px-4 py-3.5'
                  type='password'
                  {...field}
                  placeholder='비밀번호를 입력해 주세요'
                  isError={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <div className='mt-[34px]'>
              <Button type='submit'>계정 삭제</Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default DeleteUser;
