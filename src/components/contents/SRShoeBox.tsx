import { twMerge } from 'tailwind-merge';

function SRShoeBox({ className }: { className: string }) {
  return (
    <div className={twMerge('w-[113px] h-[110px] rounded-md flex justify-center items-center', className)}>
      {/* <img
        src={image}
        alt='Add shoes'
      /> */}
    </div>
  );
}

export default SRShoeBox;
