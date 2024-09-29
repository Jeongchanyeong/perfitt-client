import { useState } from 'react';

type TSRDMenuDetailProps = {
  text: string;
  image: string;
  hoverImage: string;
  handleClick: () => void;
};

function SRDMenuDetail({ text, image, hoverImage, handleClick }: TSRDMenuDetailProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className='w-[109px] h-10 flex justify-center items-center gap-2'
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered ? hoverImage : image}
        alt='edit'
        className='w-6 h-6'
      />
      <div className={`text-[13px] leading-4 ${isHovered ? 'text-[#EF4444]' : 'text-black'}`}>{text}</div>
    </button>
  );
}

export default SRDMenuDetail;
