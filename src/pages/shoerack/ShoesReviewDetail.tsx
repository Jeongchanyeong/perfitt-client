// 신발 상세 페이지

// 더보기 메뉴 추가
// 로그인 안 했을 때 로그인 link

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HeaderLayout from '../../layout/HeaderLayout';
import SRShoeBox from '../../components/contents/shoerack/SRShoeBox';
import { useShoeRackStore } from '../../stores/shoerack.store';
import { TShoeRackItem } from '../../types/shoerack';
import { starFillIcon } from '../../assets/images/images';
import SRDMenu from '../../components/contents/shoerack/SRDMenu';

function ShoesReviewDetail() {
  const uid = 'qKnJXMMf4xd8KAn9UtGqegZFyjv2'; // uid 가져오기
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');

  const { getProductById } = useShoeRackStore();
  const [shoeData, setShoeData] = useState<TShoeRackItem>();

  useEffect(() => {
    if (productId === null || '') navigate('/shoe-rack/main');
    else {
      const fetchData = async () => {
        const data = await getProductById(uid, productId);
        setShoeData(data);
      };
      fetchData();
    }
  }, []);

  const shoeDataList = [
    { label: '신발 길이', value: shoeData?.length },
    { label: '발볼 너비', value: shoeData?.width },
    { label: '발등 높이', value: shoeData?.height },
    { label: '밑창', value: shoeData?.cushion },
    { label: '무게', value: shoeData?.weight },
    { label: '사이즈 추천', value: shoeData?.size },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <HeaderLayout
      title='신발 상세'
      back
      rightChild={
        <SRDMenu
          uid={uid}
          productId={productId !== null ? productId : ''}
          isOpen={menuOpen}
        />
      }
      handleRightBtnClick={handleMenuOpen}
    >
      <div className='flex-1 p-4 pt-0 overflow-scroll scrollbar-hide'>
        {/* 기본 정보 */}
        <SRShoeBox
          className='w-full h-[343px] mt-1.5 mb-5'
          imgSrc={shoeData?.image}
        />
        <div className='flex space-x-5 items-center'>
          <div className='w-[59px] flex space-x-0.5 justify-end items-center'>
            <img
              src={starFillIcon}
              alt='star'
              className='w-[25px] h-[25px]'
            />
            <span className='text-[24px] leading-9 font-semibold'>{shoeData?.star}</span>
          </div>
          <div className='max-w-[264px] flex flex-col space-y-0.5'>
            <div className='text-[13px] leading-[15px] text-[#808080]'>{shoeData?.brand}</div>
            <div className='text-[15px] leading-[15px] truncate'>{shoeData?.modelName}</div>
          </div>
        </div>

        {/* 후기 */}
        <div className='py-[15px] text-[15px] leading-6'>
          <ul className='mb-3'>
            {shoeDataList.map((list, index) => (
              <li
                key={index}
                className='w-full px-4 py-2'
              >
                <span className='inline-block w-[100px] mr-10 text-[#4B5563]'>{list.label}</span>
                <span>{list.value}</span>
              </li>
            ))}
          </ul>
          <div className='pl-4 py-2'>
            <div className='mb-2.5 text-[#4B5563]'>리뷰</div>
            <div>{shoeData?.review}</div>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
}

export default ShoesReviewDetail;
