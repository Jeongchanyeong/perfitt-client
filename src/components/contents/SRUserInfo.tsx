import { plusCircleIcon, userIcon } from '../../assets/images/images';

function SRUserInfo() {
  const editUserImg = () => {};

  return (
    <div className='flex gap-5 items-center py-[5px] px-3'>
      <div className='relative w-[50px] h-[50px]'>
        <img
          src={userIcon}
          alt='User profile picture'
          className='w-full h-full object-cover rounded-full'
        />
        <button
          className='absolute bottom-0 right-0 w-[16px] h-[16px]'
          onClick={editUserImg}
        >
          <img
            src={plusCircleIcon}
            alt='Edit user image'
          />
        </button>
      </div>
      <div className='flex flex-col gap-1'>
        <h3 className='text-[16px] font-semibold leading-5'>NAME</h3>
        <p className='text-[14px] leading-[22px]'>평소 신는 사이즈 | 240mm</p>
      </div>
    </div>
  );
}

export default SRUserInfo;
