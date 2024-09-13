import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { TSUInputProps } from '../../../types/sign';

const SUInput = forwardRef<HTMLInputElement, TSUInputProps>((props, ref) => {
  const { label, className, id, helperText, isError, ...rest } = props;

  return (
    <div className='flex flex-col gap-1'>
      <label
        htmlFor={id}
        className='h-[17px] text-[14px] leading-[17px] font-semibold'
      >
        {label}
      </label>
      <input
        className={twMerge(
          `w-full border border-[#E4E4E7] rounded
            text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]`,
          isError ? 'border-red-500' : '', // 오류 시 스타일 변경
          className
        )}
        ref={ref}
        id={id}
        {...rest}
      />
      {helperText && <span className='text-red-500 text-sm'>{helperText}</span>}
    </div>
  );
});

export default SUInput;
