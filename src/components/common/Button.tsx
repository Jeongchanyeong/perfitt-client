import { twMerge } from 'tailwind-merge';

type TButtonProps = React.ComponentPropsWithoutRef<'button'>;

const Button = (props: TButtonProps) => {
  const { className, children, ...rest } = props;

  return (
    <>
      <button
        className={twMerge(`bg-black text-white text-base font-medium w-full h-[56px] rounded`, className)}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
