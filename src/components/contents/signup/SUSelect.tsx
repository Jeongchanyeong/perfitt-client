import { forwardRef } from 'react';
import Select, { ActionMeta, SingleValue, StylesConfig, GroupBase } from 'react-select';

// Option 타입 정의
type OptionType = {
  value: string | number;
  label: string;
};

// SUSelect 프롭스 타입 정의
type TSelectProps = {
  optionData: { key: string | number; value: string }[];
  className?: string;
  value: string | number; // 선택된 값
  onChange: (value: string | number) => void; // 값 변경 핸들러
  placeholder?: string;
  label?: string;
  helperText?: string;
};

// customStyles 정의
const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#4A90E2' : '#E4E4E7',
    boxShadow: state.isFocused ? '0 0 0 1px #4A90E2' : 'none',
    height: '3rem',
    paddingLeft: '0.4rem',
  }),
  placeholder: provided => ({
    ...provided,
    color: '#A1A1AA',
    fontSize: '1rem',
  }),
  menu: provided => ({
    ...provided,
    borderColor: '#E4E4E7',
  }),
  menuList: provided => ({
    ...provided,
    padding: 0,
  }),
  dropdownIndicator: provided => ({
    ...provided,
    padding: 4,
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
};

// forwardRef로 SUSelect 컴포넌트 정의
const SUSelect = forwardRef<HTMLDivElement, TSelectProps>(
  ({ optionData, className, value, onChange, placeholder, label, helperText }, ref) => {
    // react-select에서 사용하는 형식으로 optionData 변환
    const options: OptionType[] = optionData.map(option => ({
      value: option.value,
      label: option.value,
    }));

    // react-select에서 요구하는 value 형식으로 처리
    const selectedOption = options.find(option => option.value === value) || null;

    // 선택 변경 시 핸들러
    const handleChange = (
      newValue: SingleValue<OptionType>, // SingleValue만 사용
      actionMeta: ActionMeta<OptionType>
    ) => {
      if (newValue) {
        onChange(newValue.value); // 선택된 값 전달
      } else {
        onChange(''); // 값이 없을 때(클리어 시) 빈 문자열 전달
      }
    };

    // 에러 상태에 따른 className 설정

    return (
      <div className={`flex flex-col w-full ${!label ? 'mt-4' : ''}`}>
        {label && (
          <label
            htmlFor={label}
            className='text-sm font-medium mb-1'
          >
            {label}
          </label>
        )}
        <Select
          value={selectedOption} // 선택된 옵션을 react-select의 value로 설정
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          className={`${className} ${!label ? 'mt-2' : ''}`}
          isClearable
          styles={customStyles} // styles 속성 직접 전달
        />
        {helperText && <span className='text-red-500 text-sm'>{helperText}</span>}
      </div>
    );
  }
);

SUSelect.displayName = 'SUSelect'; // 디버깅용

export default SUSelect;
