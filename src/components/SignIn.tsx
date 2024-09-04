import '../fonts/fonts.css'; 

const SignIn = () => {
  return (
    <div className="w-[200px] h-[190px]" id="social_sign-in_buttons">
      <div className="flex flex-col p-[8px] gap-[6px] pretendard text-[14px]" id="social_button_wrapper">
        <button className="flex items-center justify-center gap-[8px] w-[184px] h-[32px] rounded-[4px] bg-[#F5F5F5]">
          <img className="w-[24px] h-[24px]" src='../assets/images/btnG_icon_circle.png' alt='naver_logo' />
          네이버
        </button>
        <button className="w-[184px] h-[32px] rounded-[4px] bg-[#F5F5F5]">카카오</button>
        <button className="w-[184px] h-[32px] rounded-[4px] bg-[#F5F5F5]">이메일 로그인</button>
        <span className="text-center w-[184px] h-[22px]">또는</span>
        <button className="w-[184px] h-[32px] rounded-[4px] bg-[#F5F5F5]">회원가입 하기</button>
      </div>
    </div>
  );
}

export default SignIn;
