import React, { forwardRef } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { Placeholder } from 'react-select/animated';

// Option 타입 정의
type Option = {
  key: string | number;
  value: string;
};

// SUSelect 프롭스 타입 정의
type TSelectProps = {
  optionData: Option[];
  className: string;
  value: string | number; // 선택된 값
  onChange: (value: string | number) => void; // 값 변경 핸들러
  placeholder?: string;
  label?: string;
};

// forwardRef로 SUSelect 컴포넌트 정의
const SUSelect = forwardRef<HTMLDivElement, TSelectProps>(
  ({ optionData, className, value, onChange, placeholder, label }, ref) => {
    // react-select에서 사용하는 형식으로 optionData 변환
    const options = optionData.map(option => ({
      value: option.value,
      label: option.value,
    }));

    // react-select에서 요구하는 value 형식으로 처리
    const selectedOption = options.find(option => option.value === value) || null;

    // 선택 변경 시 핸들러
    const handleChange = (
      newValue: SingleValue<{ value: string | number; label: string }>,
      actionMeta: ActionMeta<{ value: string | number; label: string }>
    ) => {
      if (newValue) {
        onChange(newValue.value); // 선택된 값이 있을 때 onChange 호출
      } else {
        onChange(''); // 값이 없을 때(클리어 시) 빈 문자열 전달
      }
    };

    return (
      <div
        className='relative w-full '
        ref={ref}
      >
        <div className='h-[17px] text-[14px] leading-[17px] font-semibold mb-1'>{label}</div>

        <Select
          value={selectedOption} // 선택된 옵션을 react-select의 value로 설정
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          className={className}
          isClearable
        />
      </div>
    );
  }
);

export default SUSelect;
