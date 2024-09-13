export type TSUInputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> & {
  className?: string;
  id: string;
  value?: string;
  placeholder?: string;
  type?: string;
  label?: string;
  className: string;
  helperText?: string;
  isError: boolean;
};
export type TUserInfo = {
  gender: string;
  year: string;
  month: string;
  day: string;
  usersize: string;
  sizetype: string;
};
export type TUserHandlers = {
  userInfoSearch: {
    gender: string;
    year: string;
    month: string;
    day: string;
    usersize: string;
  };
  handleSelectChange: (id: string, value: string) => void;
  handleChange: (id: string, value: string) => void;
  selectOpen: string;
  setSelectOpen: React.Dispatch<React.SetStateAction<string>>;
};
export type SUIdetailsProps = {
  userInfo: TUserInfo;
  userHandlers: TUserHandlers;
};
