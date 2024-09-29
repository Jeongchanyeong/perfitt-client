import { useNavigate } from 'react-router-dom';
import { shoeSearch } from '../../../assets/images/images';
import Button from '../../common/Button';

function SREmpty() {
  const navigate = useNavigate();

  return (
    <>
      <div className='flex-1 my-6'>
        <div className='flex flex-col justify-center items-center gap-4 h-full'>
          <div>
            <img
              src={shoeSearch}
              alt='No shoes found'
              className='w-[120px] h-[120px] object-fill'
            />
          </div>
          <h3 className='text-[16px] font-semibold leading-5 text-center'>
            아직 신발장에
            <br />
            등록한 신발이 없습니다.
          </h3>
          <div className='text-[14px] leading-[22px] text-center text-[#808080]'>
            신어본 신발을 등록하고
            <br />더 자세한 추천을 받아보세요.
          </div>
        </div>
      </div>
      <Button onClick={() => navigate('/shoe-rack/review/add')}>신발 등록하기</Button>
    </>
  );
}

export default SREmpty;
