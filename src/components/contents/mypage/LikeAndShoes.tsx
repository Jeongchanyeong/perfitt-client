import { useNavigate } from 'react-router-dom';
import like from '../../../assets/images/mypage-like.svg';
import shoes from '../../../assets/images/mypage-shoes.svg';

const LikeAndShoes = () => {
  const navicate = useNavigate();
  const UserlikeList = () => {
    navicate('/mypage/item/like');
  };
  const UsershoesList = () => {
    navicate('/shoe-rack/main');
  };

  return (
    <>
      <div className='bg-[#F5F5F5] h-[6px] mx-[-16px]'></div>
      <div className='flex flex-row text-center  border-[#F5F5F5] mx-[-16px]'>
        <div className='flex justify-center items-center w-1/2 border-r-[1px] py-[21.5px] '>
          <img
            src={like}
            alt='Mypage like'
            width='14px'
            height='13px'
          />
          <button onClick={UserlikeList}>
            <div className='text-center pl-[10px] text-[14px] leading-[16.71px] font-medium '>좋아요</div>
          </button>
        </div>
        <div className='flex flex-row justify-center items-center w-1/2 border-l-[1px] py-[21.5px]'>
          <img
            src={shoes}
            alt='Mypage shoes'
            width='14px'
            height='14px'
          />
          <button onClick={UsershoesList}>
            <div className='text-center pl-[10px] text-[14px] leading-[16.71px] font-medium'>신발장</div>
          </button>
        </div>
      </div>
      <div className='bg-[#F5F5F5] h-[6px] mx-[-16px]'></div>
    </>
  );
};
export default LikeAndShoes;
