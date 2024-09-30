export type TSUInputProps = Omit<React.ComponentPropsWithRef<'input'>, 'type'> & {
  className?: string;
  id?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  label?: string;
  helperText?: string;
  isError?: boolean;
};

export type TSelectOption = {
  value: string;
  label: string;
  color: string;
  isFixed?: boolean;
  isDisabled?: boolean;
};
export type FormValues = {
  email: string;
  password: string;
  name: string;
  gender: string;
  year: string;
  month: string;
  day: string;
  size: string;
};

// select Option 타입 정의
export type OptionType = {
  value: string | number;
  label: string;
};
export type TSideBarProps = {
  isBarOpen: boolean;
  toggleBar: () => void;
};
