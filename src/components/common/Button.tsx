import { twMerge } from 'tailwind-merge';

type TButtonProps = React.ComponentPropsWithoutRef<'button'>;

const Button = (props: TButtonProps) => {
  const { className, children, ...rest } = props;

  return (
    <>
      <button
        className={twMerge('w-full h-[56px] rounded bg-black text-white text-base font-semibold', className)}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
