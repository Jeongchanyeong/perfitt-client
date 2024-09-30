import { useEffect, useState } from 'react';
import { TProductCard } from '../../../types/like';
import ProductCard from '../../common/ProductCard';

const exampleProducts: TProductCard[] = [
  {
    productId: '1',
    image: 'https://via.placeholder.com/200',
    link: 'https://m.abcmart.a-rt.com/product/new?prdtNo=1010087307',
    modelName: 'Model C',
    brand: 'Brand C',
    modelNo: '',
  },
  {
    productId: '2',
    image: 'https://via.placeholder.com/200',
    link: 'https://m.abcmart.a-rt.com/product/new?prdtNo=1010087307',
    modelName: 'Model D',
    brand: 'Brand D',
    modelNo: '',
  },
];

const LatestItem = () => {
  const [products, setProducts] = useState<TProductCard[]>([]);
  useEffect(() => {
    // uid를 먼저 가져와야 함
    // collection likeproduct에 가져온 uid로 product에서 productId 가져오기
    // product에서 가져온 productId로 brand, image, link, modelName, modelNo 가져오기
    // 시간순으로 정렬을 해야함
    setProducts(exampleProducts); // 예시 데이터를 세팅
  }, []);
  return (
    <>
      <div className='text-sm/[22px] font-extrabold mb-[15px]'>총 {products.length}개</div>
      <div className='flex-1 flex flex-wrap gap-[11px] overflow-scroll scrollbar-hide'>
        {products.map(product => (
          <div
            className='w-[166px] h-[277px '
            key={product.productId}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};
export default LatestItem;
