import SRUserInfo from '../components/contents/SRUserInfo';
import SREmpty from '../components/contents/SREmpty';
import SRShoeRack from '../components/contents/SRShoeRack';
import Button from '../components/common/Button';

function ShoeRack() {
  return (
    <div className='h-full flex flex-col'>
      <SRUserInfo />
      <div className='flex-1 my-6'>
        <SREmpty />
        {/* <SRShoeRack /> */}
      </div>
      <Button>신발 등록하기</Button>
    </div>
  );
}

export default ShoeRack;
