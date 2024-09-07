import '../../css/fonts.css';
import '../../css/tailwind.css';
import kakakologo from '../../assets/images/kakaologo.png';
import naverlogo from '../../assets/images/naverlogo.png'

const SignInSocialBtn = () => {
  const onClickSociallogin = () => {};
  return (
    <>
    <div className="w-[200px] h-[190px]" id="social_sign-in_buttons">
      <div className="flex flex-col p-[8px] gap-[6px] text-[14px] leading-[22px] font-normal" id="social_button_wrapper">
        <button onClick={onClickSociallogin} className="flex items-center justify-center w-[184px] h-[32px] rounded-[4px] bg-[#F5F5F5] ">
          <img className="w-[24px] h-[24px] rounded-lg mr-[8px]" src={naverlogo} alt='naverlogo' />
          네이버
        </button>
        <button onClick={onClickSociallogin} className=" flex items-center justify-center  w-[184px] h-[32px] rounded-[4px] bg-[#F5F5F5]">
            <img className="w-[24px] h-[24px] rounded-lg mr-[8px]" src={kakakologo} alt='kakaologo' />
            카카오
            </button>
        <button onClick={onClickSociallogin} className=" w-[184px] h-[32px] rounded-[4px] bg-[#F5F5F5]">이메일 로그인</button>
        <span className="text-center w-[184px] h-[22px]">또는</span>
        <button onClick={onClickSociallogin} className=" w-[184px] h-[32px] rounded-[4px] bg-[#F5F5F5]">회원가입 하기</button>
      </div>
    </div>
    </>
  );
}

export default SignInSocialBtn;
