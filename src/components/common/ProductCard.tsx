import { useNavigate } from 'react-router-dom';
import { abcMart } from '../../assets/images/images';
import { perfittCircleLogo } from '../../assets/images/images';
import { TProductCardProps } from '../../types/like';
import pinkHeart from '../../assets/images/pinkheart.svg';
import heart from '../../assets/images/heart.svg';
import aiRecomend from '../../assets/images/airecomend.svg';
import { useEffect, useState } from 'react';
import { getPartnerBrand } from '../../hooks/getPartnerBrand';

type TPartner = {
  name: string;
  image: string;
};

const ProductCard = ({ product }: TProductCardProps) => {
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(true);
  const [partner, setPartner] = useState<TPartner>();

  useEffect(() => {
    setPartner(getPartnerBrand(product.link));
  }, []);

  const handleNavigation = () => {
    navigate('/bridge', { state: { product, partner } });
  };

  const getStoreImage = (link: string) => {
    if (link.includes('a-rt')) return abcMart;
    if (link.includes('perfittdemo')) return perfittCircleLogo;
    if (link.includes('example')) return 'https://via.placeholder.com/200';
    return null;
  };

  const storeImage = getStoreImage(product.link);

  return (
    <article className=' w-full bg-[#F5F5F5] rounded-[6.27px] relative'>
      <section className='relative'>
        <div className='flex justify-between'>
          <div className='mt-2 ml-[10px] bg-gradient-to-r from-[#E8F4FE] to-[#FFECFE] p-[5px] grid place-items-center rounded'>
            <span className='bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] text-transparent bg-clip-text text-xs font-semibold'>
              240mm 추천
            </span>
          </div>
          <img
            className={`w-[15px] h-[14px] mt-[11px] mr-[10px] ${isLike ? 'animate-dropIn' : ''}`}
            src={isLike ? pinkHeart : heart}
            alt={isLike ? 'pinkHeart' : 'heart'}
            onClick={() => setIsLike(!isLike)}
          />
        </div>

        {/* 신발 이미지 */}
        <button onClick={handleNavigation}>
          <div className='w-full h-[109px] overflow-hidden'>
            <img
              className='object-cover'
              src={product.image}
              alt={product.modelName}
            />
          </div>
        </button>

        {/* 상점 이미지 */}
        {storeImage && (
          <img
            className=' absolute bottom-[-12px] right-[6px]'
            src={storeImage}
            alt='store'
          />
        )}
      </section>

      <article className='w-full h-full text-sm bg-white'>
        <section className=' flex flex-col'>
          <div className='px-1.5 py-[10px] gap-2.5'>
            <p className='mb-[3px]'>{product.brand}</p>
            <p className='font-semibold text-ellipsis whitespace-nowrap overflow-hidden'>{product.modelName}</p>
          </div>
          <div>
            <button className='flex w-full gap-1.5 px-[10px] py-2 border rounded-md font-semibold text-[10px] leading-4'>
              <img
                className='ml-[22.5px] w-4 h-4'
                src={aiRecomend}
                alt='airecomend'
              />
              이 신발 더 알아보기
            </button>
          </div>
        </section>
      </article>
    </article>
  );
};
export default ProductCard;
