import { useState } from 'react';
import pinkHeart from '../../../assets/images/pinkheart.svg';
import heart from '../../../assets/images/heart.svg';
import { TLikeBrandProps } from '../../../types/like';

const LikeBrandList = ({ brands }: TLikeBrandProps) => {
  const [isLike, setIsLike] = useState(true);

  return (
    <>
      <div className='flex  items-center w-full h-[75px] overflow-hidden'>
        {/* 브랜드 이미지 */}
        <img
          className='object-cover rounded-full w-[75px] h-[75px]'
          src={brands.image}
          alt={brands.kname}
        />
        {/* 브랜드 이름 */}
        <div className='flex flex-col w-[209px] mx-[20px] py-[12.5px]'>
          <p className='text-base/[20px] font-semibold mb-1.5'>{brands.ename}</p>
          <p className='text-base font-normal text-[#808080]'>{brands.kname}</p>
        </div>

        {/* 좋아요 버튼 */}
        <div>
          <img
            className={`w-[15px] h-[14px]  ${isLike ? 'animate-dropIn' : ''}`}
            src={isLike ? pinkHeart : heart}
            alt={isLike ? 'pinkHeart' : 'heart'}
            onClick={() => setIsLike(!isLike)}
          />
        </div>
      </div>
    </>
  );
};

export default LikeBrandList;
