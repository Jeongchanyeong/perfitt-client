import { twMerge } from 'tailwind-merge';
import { shoeSilhouette } from '../../../assets/images/images';

type TSRShoeBox = {
  className?: string;
  imgSrc?: string;
  imgAlt?: string;
};

function SRShoeBox({ className, imgSrc, imgAlt }: TSRShoeBox) {
  return (
    <div className={twMerge('flex justify-center items-center bg-[#F5F5F5] rounded-md overflow-hidden', className)}>
      <img
        src={imgSrc !== (undefined || '') ? imgSrc : shoeSilhouette}
        alt={imgAlt !== (undefined || '') ? imgAlt : ''}
        className='w-full h-full object-cover'
      />
    </div>
  );
}

export default SRShoeBox;
