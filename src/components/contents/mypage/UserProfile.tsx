import userprofile from '../../../assets/icons/user-border-icon.svg';
import camera from '../../../assets/images/mypage-camera.svg';
import { TuserProfileProps } from '../../../types/sign';

const UserProfile = (user: TuserProfileProps) => {
  const editUserImg = () => {};

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div className='relative w-[80px] h-[80px]'>
          <img
            src={userprofile}
            alt='User profile'
            className='w-full h-full object-cover rounded-full'
          />
          <button
            className='absolute bottom-0 right-0 w-[20px] h-[20px]'
            onClick={editUserImg}
          >
            <img
              src={camera}
              alt='Edit user image'
            />
          </button>
        </div>

        <div className='pt-[17px] pb-[8px] text-[15px] leading-[18px]'>안녕하세요!</div>
        <div className='text-[20px] leading-6 pb-[20px]'>
          <span className='font-medium tracking-[0.25em]'>{user.user?.name}</span>
          <span className='font-light'>님</span>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
