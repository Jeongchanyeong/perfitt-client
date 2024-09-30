import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Bridge = () => {
  const location = useLocation();
  const { product, partner } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = product.link;
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='h-full flex flex-col justify-center'>
      <div className='flex flex-1 flex-col justify-center items-center'>
        <div className='w-[120px] h-[120px] overflow-hidden rounded-full'>
          <img
            src={partner.image}
            alt={partner.name}
            className='w-full h-full object-contain'
          />
        </div>

        <div className='pt-[38px] text-center'>
          <div className='text-[18px] font-normal leading-7'>
            [{product.brand}] {product.modelName}
          </div>
          <div className='text-[18px] font-semibold leading-6 py-[16px]'>
            {partner.name}(으)로 <br /> 이동 중입니다.
          </div>
          <div className='text-[16px] font-normal text-[#808080] leading-6'>잠시만 기다려 주세요.</div>
        </div>
      </div>
    </div>
  );
};
export default Bridge;
