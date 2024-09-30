import { StylesConfig, GroupBase } from 'react-select';
import { OptionType } from '../../../types/sign';

// base 스타일
export const customStyles_base: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#4A90E2' : '#E4E4E7',
    boxShadow: state.isFocused ? '0 0 0 1px #4A90E2' : 'none',
    padding: '7px 6px',
  }),
  placeholder: provided => ({
    ...provided,
    color: '#A1A1AA',
    fontSize: '1rem',
  }),
  menu: provided => ({
    ...provided,
    borderColor: '#E4E4E7',
    marginTop: '0',
  }),
  menuList: provided => ({
    ...provided,
    padding: 0,
  }),
  dropdownIndicator: provided => ({
    ...provided,
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#E4E4E7' : state.isFocused ? '#E4E4E7' : '#FFFFFF',
    color: '#000000',
    fontWeight: 'normal',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#E4E4E7',
    },
  }),
};

// birth 스타일 (control만 다르게 설정)
export const customStyles_birth: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  ...customStyles_base, // base 스타일 재사용
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#4A90E2' : '#E4E4E7',
    boxShadow: state.isFocused ? '0 0 0 1px #4A90E2' : 'none',
    padding: '5px 1px',
  }),
};
