import { IText } from '../../../../../types/chat';

const MyMessage = ({ text }: IText) => {
  return (
    <div className='flex justify-end mb-5'>
      <span
        className='max-w-[80%] px-3.5 py-2.5 bg-black rounded-md rounded-tr-none
            text-[14px] leading-[22px] text-white break-words'
      >
        {text}
      </span>
    </div>
  );
};

export default MyMessage;
