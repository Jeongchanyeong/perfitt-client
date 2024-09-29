import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import SUInput from '../signup/SUInput';
import Button from '../../common/Button';
import { FormValues } from '../../../types/sign';

const UpdatePassword = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      new_password: '',
    },
  });

  const { control, handleSubmit } = methods;
  const auth = getAuth();
  const user = auth.currentUser;

  // 비밀번호 업데이트 함수
  const onSubmit = async (data: FormValues) => {
    const { email, password, new_password } = data;
    if (user) {
      // 사용자 재인증
      const credential = EmailAuthProvider.credential(email, password);
      try {
        await reauthenticateWithCredential(user, credential); // 재인증 수행
        // 재인증이 성공하면 비밀번호 변경
        await updatePassword(user, new_password);
        alert('비밀번호 변경 성공');
      } catch (error) {
        // 오류 처리
        alert(
          '재인증 또는 비밀번호 변경 중 오류 발생: ' + (error instanceof Error ? error.message : '알 수 없는 오류')
        );
      }
    } else {
      alert('사용자가 인증되지 않았습니다.');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='p-4'>
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
                label='현재 비밀번호'
                className='px-4 py-3.5'
                type='password'
                {...field}
                placeholder='현재 비밀번호를 입력해 주세요'
                isError={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='new_password'
            control={control}
            rules={{
              required: { value: true, message: '변경할 비밀번호를 입력해주세요' },
              minLength: { value: 6, message: '비밀번호는 최소 6자 이상이어야 합니다' },
            }}
            render={({ field, fieldState }) => (
              <SUInput
                label='새 비밀번호'
                className='px-4 py-3.5'
                type='password'
                {...field}
                placeholder='새 비밀번호를 입력해 주세요'
                isError={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <div className='mt-[34px]'>
            <Button type='submit'>변경하기</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdatePassword;
