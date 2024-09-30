import { Controller, useFormContext } from 'react-hook-form';
import SUInput from './SUInput';
import SUSelect from './SUSelect';
import { customStyles_birth } from './SUISelectCss';

function SUInfo() {
  const { control } = useFormContext(); // useFormContext로 control 가져오기

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

  return (
    <div className='p-4'>
      <form onSubmit={e => e.preventDefault()}>
        <div className='flex flex-col gap-4 mb-10'>
          {/* 이메일 입력 */}
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

          {/* 비밀번호 입력 */}
          <Controller
            name='password'
            control={control}
            rules={{
              required: { value: true, message: '비밀번호를 입력해주세요' },
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다',
              },
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
        </div>
      </form>
    </div>
  );
}

export default SUInfo;
