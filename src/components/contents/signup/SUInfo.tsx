import { useState } from 'react';
import SUInput from './SUInput';
import SUSelect from './SUSelect';
import Button from '../../common/Button';
import Header from '../../common/Header';
import SUIdetails from './SUIdetails';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { FormValues } from '../../../types/sign';

function SUInfo() {
  const [state, setState] = useState<'start' | 'end'>('start');

  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      gender: '',
      year: '',
      month: '',
      day: '',
      usersize: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // 제출 후 상태를 'end'로 변경
    setState('end');
  };

  const yearList = Array.from({ length: 70 }, (_, i) => ({ key: i, value: `${i + 1955}년` }));
  const monthList = Array.from({ length: 12 }, (_, i) => ({ key: i, value: `${i + 1}월` }));
  const dayList = Array.from({ length: 31 }, (_, i) => ({ key: i, value: `${i + 1}일` }));

  const handleNextClick = () => {
    if (state === 'start') {
      handleSubmit(data => setState('end'))(); // 상태를 'end'로 변경하기 전에 유효성 검사 수행
    } else {
      handleSubmit(onSubmit)(); // 최종 폼 제출
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='rounded-t-lg'>
        {state === 'start' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Header title='회원가입' />
            <div className='flex flex-col gap-4 mb-10'>
              <Controller
                name='email'
                control={control}
                rules={{
                  required: '이메일을 입력해 주세요',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
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
                    id='password'
                    {...field}
                    placeholder='비밀번호를 입력해 주세요'
                    isError={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
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
              <Controller
                name='gender'
                control={control}
                defaultValue='' // 기본 값 설정
                render={({ field }) => (
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
                  />
                )}
              />
              <div className='flex gap-1 '>
                <Controller
                  name='year'
                  control={control}
                  defaultValue='' // 기본 값 설정
                  render={({ field }) => (
                    <SUSelect
                      label='생년월일'
                      optionData={yearList}
                      className='rounded text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]'
                      placeholder='년'
                      value={field.value} // field value 사용
                      onChange={field.onChange} // field.onChange 사용
                    />
                  )}
                />
                <Controller
                  name='month'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <SUSelect
                      optionData={monthList}
                      className=' rounded text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]'
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='월'
                    />
                  )}
                />
                <Controller
                  name='day'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <SUSelect
                      optionData={dayList}
                      className='rounded text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]'
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='일'
                    />
                  )}
                />
              </div>
            </div>
          </form>
        ) : (
          <SUIdetails />
        )}
      </div>
      <Button onClick={handleNextClick}>{state === 'start' ? '다음' : '가입완료'}</Button>
    </FormProvider>
  );
}

export default SUInfo;
