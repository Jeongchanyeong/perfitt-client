import SRShoeBox from './SRShoeBox';
import { TProduct } from '../../../types/db';

function SRShoeInfo({ image, brand, modelName }: TProduct) {
  return (
    <div className='flex items-center gap-2.5'>
      <SRShoeBox
        className='w-[77px] h-[77px]'
        imgSrc={image}
        imgAlt={modelName}
      />
      <div className='flex flex-col gap-1.5 max-w-64'>
        <div className='text-[14px] leading-[17px]'>{brand}</div>
        <div className='max-h-[30px] text-[15px] leading-[15px] font-medium truncate'>{modelName}</div>
        {/* <div className='text-[14px] leading-[15px] font-medium'>{price}</div> */}
      </div>
    </div>
  );
}

export default SRShoeInfo;
