import { forwardRef } from 'react';
import Select, { StylesConfig, GroupBase } from 'react-select';
import { OptionType } from '../../../types/sign';
import { customStyles_base } from './SUISelectCss';

// SUSelect 프롭스 타입 정의
type TSelectProps = {
  optionData: { key: string | number; value: string }[];
  className?: string;
  value: string | number; // 선택된 값
  onChange: (value: string | number) => void; // 값 변경 핸들러
  placeholder?: string;
  label?: string;
  helperText?: string;
  styles?: StylesConfig<OptionType, false, GroupBase<OptionType>>;
  onSubmit?: (data: any) => void; // onSubmit 추가
};

// forwardRef로 SUSelect 컴포넌트 정의
const SUSelect = forwardRef<HTMLDivElement, TSelectProps>(
  ({ optionData, className, value, onChange, placeholder, label, helperText, styles, onSubmit }, ref) => {
    // react-select에서 사용하는 형식으로 optionData 변환
    const options: OptionType[] = optionData.map(option => ({
      value: option.value,
      label: option.value,
    }));

    // react-select에서 요구하는 value 형식으로 처리
    const selectedOption = options.find(option => option.value === value) || null;

    // 선택 변경 시 핸들러
    const handleSelectChange = (selectedOption: OptionType | null) => {
      if (selectedOption) {
        onChange(selectedOption.value);
        if (onSubmit) {
          onSubmit(selectedOption.value); // 선택된 값으로 onSubmit 호출
        }
      }
    };
    // 에러 상태에 따른 className 설정

    return (
      <div className='flex-1 flex flex-col gap-1'>
        <label
          htmlFor={label}
          className='h-[17px] text-[14px] leading-[17px] font-semibold'
        >
          {label}
        </label>
        <Select
          value={selectedOption} // 선택된 옵션을 react-select의 value로 설정
          onChange={handleSelectChange}
          options={options}
          placeholder={placeholder}
          className={className}
          styles={styles || customStyles_base} // styles 속성 직접 전달
        />
        {helperText && <span className='text-red-500 text-sm'>{helperText}</span>}
      </div>
    );
  }
);

export default SUSelect;
