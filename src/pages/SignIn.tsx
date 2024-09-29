import { useContext } from 'react';
import { AuthContext } from '../service/AuthContext';
import SignInSocialBtn from '../components/contents/signin/SignInSocialBtn';
import SignInAuthList from '../components/contents/signin/SignInAuthList';
import { perfittCircleLogo } from '../assets/images/images';
import UserLoader from '../stores/UserLoder';
import { useUserStore } from '../stores/UserState';

const SignIn = () => {
  const userInfo = useContext(AuthContext);
  const uid = userInfo?.uid;
  const user = useUserStore(state => state.user);
  // chatwindow 컴포넌트와 header 컴포넌트 부분
  return (
    <>
      <UserLoader uid={uid} />
      {userInfo ? (
        <div className='flex mt-[25px]'>
          <div className='w-7 h-7'>
            <img
              src={perfittCircleLogo}
              alt='perfitt-logo'
            />
          </div>
          <div className='ml-2'>
            <p className='px-2.5 py-[5px] text-sm/[22px] break-words'>
              반갑습니다 {userInfo.displayName == null ? user?.name : userInfo.displayName}
              님!
              <br />
              님을 위한 맞춤 상품을 추천해 드릴께요
            </p>

            <SignInAuthList />
          </div>
        </div>
      ) : (
        <div className='flex mt-[25px]'>
          <div className='w-7 h-7'>
            <img
              src={perfittCircleLogo}
              alt='perfitt-logo'
            />
          </div>
          <div className='ml-2'>
            <p className='px-2.5 py-[px] text-sm/[22px] break-words'>
              안녕하세요 펄핏AI 입니다!
              <br /> 맞춤 추천을 위해 먼저 로그인을 해주세요.
            </p>
            <div className='mt-2 '>
              <SignInSocialBtn />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
