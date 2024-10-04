import { useState } from 'react';
import userprofile from '../../../assets/icons/user-border-icon.svg';
import camera from '../../../assets/images/mypage-camera.svg';
import { TuserProfileProps } from '../../../types/sign';
import ModalBar from '../../common/ModalBar';
import UpdateUserProfile from './UpdateUserProfile';

const UserProfile = (user: TuserProfileProps) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };
  const userprofileurl = user.user?.profile ? user.user?.profile : userprofile;
  console.log(userprofileurl);
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div className='relative w-[80px] h-[80px]'>
          <img
            src={userprofileurl}
            alt='User profile'
            className='w-full h-full object-cover rounded-full'
          />
          <button
            className='absolute bottom-0 right-0 w-[20px] h-[20px]'
            onClick={toggleProfileModal}
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
      {isProfileModalOpen && (
        <ModalBar
          isBarOpen={isProfileModalOpen}
          toggleOpenBar={toggleProfileModal}
        >
          <UpdateUserProfile />
        </ModalBar>
      )}
    </>
  );
};
export default UserProfile;
