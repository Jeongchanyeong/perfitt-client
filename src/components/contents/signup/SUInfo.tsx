import { useRef, useState } from 'react';
import SUInput from './SUInput';
import SUSelect from './SUSelect';
import { TUserHandlers, TUserInfo } from '../../../types/sign';
import Button from '../../common/Button';
import Header from '../../common/Header';
import SUIdetails from './SUIdetails';
import { Controller, useForm } from 'react-hook-form';

function SUInfo() {
  const [state, setState] = useState('start');

  // useForm 사용
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // const password: React.MutableRefObject<string | undefined> = useRef();
  // password.current = watch('password');

  const [userInfo, setUserInfo] = useState<TUserInfo>({
    gender: '',
    year: '',
    month: '',
    day: '',
    sizetype: '',
    usersize: '',
  });

  const [userInfoSearch, setUserInfoSearch] = useState({
    gender: '',
    year: '',
    month: '',
    day: '',
    usersize: '',
  });

  const yearList = Array.from({ length: 70 }, (_, i) => `${i + 1955}년`);
  const monthList = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  const dayList = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

  const [selectOpen, setSelectOpen] = useState('');

  const handleSelectChange = (id: string, value: string) => {
    console.log(`handleSelectChange - id: ${id}, value: ${value}`);
    setUserInfoSearch(prev => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleChange = (id: string, value: string) => {
    console.log(`handleSelectChange - id: ${id}, value: ${value}`);
    setUserInfo(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const userHandlers: TUserHandlers = {
    userInfoSearch,
    handleSelectChange,
    handleChange: (id: string, value: string) => {
      setUserInfo(prev => ({
        ...prev,
        [id]: value,
      }));
    },
    selectOpen,
    setSelectOpen,
  };

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
              <SUSelect
                label='성별'
                className='px-4 py-3.5'
                id='gender'
                value={userInfoSearch.gender}
                placeholder='성별을 선택해 주세요'
                handleSelectChange={value => handleSelectChange('gender', value)}
                handleChange={value => handleChange('gender', value)}
                options={['여자', '남자']}
                selectedOption={userInfo.gender}
                selectOpen={selectOpen}
                setSelectOpen={setSelectOpen}
              />
              <div className='flex gap-1'>
                <SUSelect
                  label='생년월일'
                  className='px-2.5 py-[12.5px]'
                  type='text'
                  id='year'
                  value={userInfoSearch.year}
                  placeholder='년'
                  handleSelectChange={value => handleSelectChange('year', value)}
                  handleChange={value => handleChange('year', value)}
                  options={yearList}
                  selectedOption={userInfo.year}
                  selectOpen={selectOpen}
                  setSelectOpen={setSelectOpen}
                />
                <SUSelect
                  className='px-2.5 py-[12.5px]'
                  type='text'
                  id='month'
                  value={userInfoSearch.month}
                  placeholder='월'
                  onChange={e => handleSelectChange(e.target.id, e.target.value)}
                  handleSelectChange={value => handleSelectChange('month', value)}
                  handleChange={value => handleChange('month', value)}
                  options={monthList}
                  selectedOption={userInfo.month}
                  selectOpen={selectOpen}
                  setSelectOpen={setSelectOpen}
                />
                <SUSelect
                  className='px-2.5 py-[12.5px]'
                  type='text'
                  id='day'
                  value={userInfoSearch.day}
                  placeholder='일'
                  onChange={e => handleSelectChange(e.target.id, e.target.value)}
                  handleSelectChange={value => handleSelectChange('day', value)}
                  handleChange={value => handleChange('day', value)}
                  options={dayList}
                  selectedOption={userInfo.day}
                  selectOpen={selectOpen}
                  setSelectOpen={setSelectOpen}
                />
              </div>
            </div>
          </form>
        ) : (
          <SUIdetails
            userInfo={userInfo}
            userHandlers={userHandlers}
          />
        )}
      </div>
      <Button onClick={() => setState('end')}>{state === 'start' ? '다음' : '가입완료'}</Button>
    </>
  );
}

export default SUInfo;
