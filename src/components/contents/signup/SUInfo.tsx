import { useState } from 'react';
import SUInput from './SUInput';
import SUSelect from './SUSelect';
import Button from '../../common/Button';
import Header from '../../common/Header';
import SUIdetails from './SUIdetails';
import { Controller, useForm } from 'react-hook-form';

function SUInfo() {
  const [state, setState] = useState('start');

  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // const password: React.MutableRefObject<string | undefined> = useRef();
  // password.current = watch('password');

  const yearList = Array.from({ length: 70 }, (_, i) => ({ key: i, value: `${i + 1955}년` }));
  const monthList = Array.from({ length: 12 }, (_, i) => ({ key: i, value: `${i + 1}월` }));
  const dayList = Array.from({ length: 31 }, (_, i) => ({ key: i, value: `${i + 1}일` }));

  return (
    <>
      <div className='rounded-t-lg'>
        {state === 'start' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Header title='회원가입'></Header>
            <div className='flex flex-col gap-4 mb-10'>
              <Controller
                name='email'
                control={control}
                defaultValue=''
                rules={{ required: '이메일을 입력해 주세요' }}
                render={({ field, fieldState }) => (
                  <SUInput
                    label='아이디'
                    className='px-4 py-3.5'
                    id='email' // id를 명시적으로 설정
                    {...field} // field 객체를 그대로 전달
                    placeholder='이메일을 입력해 주세요'
                    isError={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                defaultValue=''
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
                defaultValue=''
                rules={{ required: { value: true, message: '이름을 입력해주세요' } }}
                render={({ field, fieldState }) => (
                  <SUInput
                    label='이름'
                    className='px-4 py-3.5'
                    type='text'
                    id='name'
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
                defaultValue=''
                render={({ field }) => (
                  <SUSelect
                    optionData={[
                      { key: 'female', value: '여자' },
                      { key: 'male', value: '남자' },
                    ]}
                    className='px-4 py-3.5'
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className='flex gap-1'>
                <Controller
                  name='year'
                  control={control}
                  defaultValue='' // 기본 값 설정
                  render={({ field }) => (
                    <SUSelect
                      optionData={yearList}
                      className='px-2.5 py-[12.5px]'
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
                      className='px-2.5 py-[12.5px]'
                      value={field.value}
                      onChange={field.onChange}
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
                      className='px-2.5 py-[12.5px]'
                      value={field.value}
                      onChange={field.onChange}
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
      <Button onClick={() => setState('end')}>{state === 'start' ? '다음' : '가입완료'}</Button>
    </>
  );
}

export default SUInfo;
