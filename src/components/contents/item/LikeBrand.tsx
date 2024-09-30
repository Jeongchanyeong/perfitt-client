import { useEffect, useState } from 'react';
import LikeBrandList from './LikeBrandList';
import { TLikeBrand } from '../../../types/like';
const exBrandData: TLikeBrand[] = [
  {
    brandId: '1',
    ename: 'NICK',
    kname: '나이키',
    image: 'https://via.placeholder.com/75',
  },
  {
    brandId: '2',
    ename: 'ADIDAS',
    kname: '아디다스',
    image: 'https://via.placeholder.com/75',
  },
];
const LikeBrand = () => {
  const [brand, setBrand] = useState<TLikeBrand[]>([]);

  useEffect(() => {
    setBrand(exBrandData);
  });
  return (
    <>
      <div className='text-sm/[22px] font-extrabold mb-[15px]'>총 {exBrandData.length}개</div>
      <div className='flex flex-wrap gap-[10px] overflow-scroll scrollbar-hide'>
        {brand.map(brands => (
          <LikeBrandList brands={brands} />
        ))}
      </div>
    </>
  );
};
export default LikeBrand;
