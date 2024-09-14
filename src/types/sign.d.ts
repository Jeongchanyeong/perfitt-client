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
  gender: string | number;
  year: string | number;
  month: string | number;
  day: string | number;
  usersize: string;
};
