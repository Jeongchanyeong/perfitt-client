import '../../../css/fonts.css';
import '../../../css/tailwind.css';
import googleLogo from '../../../assets/images/google-logo.png';
import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../service/firebase';
import { useNavigate } from 'react-router-dom';
import ModalBar from '../../common/ModalBar';
import SignUp from '../../../pages/SignUp';
const SignInSocialBtn = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleOpenBar = () => {
    setIsModalOpen(!isModalOpen); // ModalBar 상태 토글
    console.log('ModalBar 닫기/열기 함수 호출');
  };
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUserData(result.user); // 로그인 후 사용자 데이터를 상태에 설정
      console.log(result);
      navigate('/chat/signin ');
    } catch (error) {
      console.error('구글 로그인 실패:', error);
    }
  };
  const handleEmailLogin = () => {
    navigate('/login');
    console.log('이메일 로그인 클릭됨');
  };
  const handleSignUp = () => {
    setIsModalOpen(true); // ModalBar 열림
    console.log('회원가입 클릭됨');
  };
  return (
    <div id='social_sign-in_buttons'>
      <div
        className='flex flex-col p-[8px] gap-[6px] text-[14px] font-normal'
        id='social_button_wrapper'
      >
        <button
          onClick={handleGoogleLogin}
          className='flex items-center justify-center w-[184px] h-[32px] rounded-[4px] bg-[#F5F5F5]'
        >
          <div className='flex justify-center items-center w-[24px] h-[24px] mr-2 bg-white rounded-full border border-[#EEEEEE]'>
            <img
              className='w-[16px] h-[16px]'
              src={googleLogo}
              alt='Google logo'
            />
          </div>
          구글
        </button>
        <button
          onClick={handleEmailLogin}
          className='w-[184px] h-[32px] rounded-[4px] bg-[#F5F5F5]'
        >
          이메일 로그인
        </button>
        <span className='text-center w-[184px] h-[22px]'>또는</span>
        <div>
          <button
            onClick={handleSignUp}
            className='w-[184px] h-[32px] rounded-[4px] bg-[#F5F5F5]'
          >
            회원가입 하기
          </button>
          {isModalOpen && (
            <ModalBar
              isBarOpen={isModalOpen}
              toggleOpenBar={toggleOpenBar}
            >
              <SignUp />
            </ModalBar>
          )}
        </div>
      </div>
    </div>
  );
};
export default SignInSocialBtn;
