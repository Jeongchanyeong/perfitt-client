export type TSUInputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> & {
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
