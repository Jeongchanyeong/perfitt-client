import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FormValues } from '../../../types/sign';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import SUInput from '../signup/SUInput';
import SUSelect from '../signup/SUSelect';
import { customStyles_birth } from '../signup/SUISelectCss';
import Button from '../../common/Button'; // 버튼 추가
import SUIdetails from '../signup/SUIdetails';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import Header from '../../common/Header';

const UpdateInfo = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      gender: '',
      year: '',
      month: '',
      day: '',
      size: '',
    },
  });

  const yearList = Array.from({ length: 70 }, (_, i) => ({
    key: i,
    value: `${i + 1955}년`,
  }));
  const monthList = Array.from({ length: 12 }, (_, i) => ({
    key: i,
    value: `${i + 1}월`,
  }));
  const dayList = Array.from({ length: 31 }, (_, i) => ({
    key: i,
    value: `${i + 1}일`,
  }));

  const { control, handleSubmit } = methods;
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    const user = auth.currentUser;

    if (user) {
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

          // 성공적으로 업데이트 후 네비게이트
          navigate('/mypage');
        } catch (error) {
          console.error('문서 업데이트 중 오류가 발생했습니다: ', error);
        }
      };

      // 사용자 UID로 업데이트 호출
      await updateUserInfo(user.uid);
    } else {
      console.error('사용자가 로그인되어 있지 않습니다.');
    }
  };

  return (
    <>
      <Header title='내 정보 수정' />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 이름 입력 */}
          <Controller
            name='name'
            control={control}
            rules={{ required: { value: true, message: '이름을 입력해주세요' } }}
            render={({ field, fieldState }) => (
              <SUInput
                label='이름'
                className='px-4 py-3.5'
                type='text'
                id='username'
                {...field}
                placeholder='이름을 입력해 주세요'
                isError={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* 성별 선택 */}
          <Controller
            name='gender'
            control={control}
            rules={{ required: { value: true, message: '성별을 선택해 주세요' } }}
            render={({ field, fieldState }) => (
              <SUSelect
                label='성별'
                optionData={[
                  { key: 'female', value: '여자' },
                  { key: 'male', value: '남자' },
                ]}
                className='w-full rounded text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]'
                value={field.value}
                onChange={field.onChange}
                placeholder='성별을 선택해 주세요'
                helperText={fieldState.error?.message || ''}
              />
            )}
          />

          {/* 생년월일 선택 */}
          <div className='flex flex-row gap-1'>
            <Controller
              name='year'
              control={control}
              rules={{ required: { value: true, message: '연도를 선택해 주세요' } }}
              render={({ field, fieldState }) => (
                <SUSelect
                  label='생년월일'
                  optionData={yearList}
                  className='w-full rounded text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]'
                  placeholder='년'
                  value={field.value}
                  onChange={field.onChange}
                  helperText={fieldState.error?.message || ''}
                  styles={customStyles_birth}
                />
              )}
            />
            <Controller
              name='month'
              control={control}
              rules={{ required: { value: true, message: '월을 선택해 주세요' } }}
              render={({ field, fieldState }) => (
                <SUSelect
                  optionData={monthList}
                  className='w-full rounded text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]'
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='월'
                  helperText={fieldState.error?.message || ''}
                  styles={customStyles_birth}
                />
              )}
            />
            <Controller
              name='day'
              control={control}
              rules={{ required: { value: true, message: '일을 선택해 주세요' } }}
              render={({ field, fieldState }) => (
                <SUSelect
                  optionData={dayList}
                  className='w-full rounded text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]'
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='일'
                  helperText={fieldState.error?.message || ''}
                  styles={customStyles_birth}
                />
              )}
            />
          </div>
          <SUIdetails />
          {/* 제출 버튼 추가 */}
          <Button type='submit'>정보 업데이트</Button>
        </form>
      </FormProvider>
    </>
  );
};
export default UpdateInfo;
