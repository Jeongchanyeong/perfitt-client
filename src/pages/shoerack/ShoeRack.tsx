// 신발장 메인 페이지

// 뒤로가기
// 로그인 안 했을 때 로그인 link
// 무한 스크롤?

import { useEffect } from 'react';
import HeaderLayout from '../../layout/HeaderLayout';
import SREmpty from '../../components/contents/shoerack/SREmpty';
import SRShoeRack from '../../components/contents/shoerack/SRShoeRack';
import { useUserStore } from '../../stores/user.store';
import { useShoeRackStore } from '../../stores/shoerack.store';
import { plusCircleIcon, userIcon } from '../../assets/images/images';

function ShoeRack() {
  const { user, fetchUserInfo } = useUserStore();
  const { shoeRack, fetchShoeRack } = useShoeRackStore();

  useEffect(() => {
    // 임시 userInfo 업데이트 (다른 페이지에서 이루어져야 함)
    const uid = 'qKnJXMMf4xd8KAn9UtGqegZFyjv2';
    fetchUserInfo(uid);

    fetchShoeRack(uid);
  }, []);

  const editUserImg = () => {};

  return (
    <HeaderLayout
      title='신발장'
      back
    >
      <div className='h-full p-4 pt-0 flex flex-col'>
        {/* USER 기본 정보 */}
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
            <h3 className='text-[16px] font-semibold leading-5'>{user?.name}</h3>
            <p className='text-[14px] leading-[22px]'>평소 신는 사이즈 | {user?.size}</p>
          </div>
        </div>

        {/* 신발장 */}
        {shoeRack == undefined || shoeRack?.length === 0 ? <SREmpty /> : <SRShoeRack shoesList={shoeRack} />}
      </div>
    </HeaderLayout>
  );
}

export default ShoeRack;
