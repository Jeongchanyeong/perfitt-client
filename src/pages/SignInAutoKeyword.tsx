const SignInAutoKeyword = () => {
    const apiKeyWords = [
      '키워드1', 
      '키워드2', 
      '키워드3'
    ];
    const onClickKeyWord = () => {} // 키워드를 눌렀을 때 발생하는 이벤트
  
    return (
      <div className="flex gap-2">
        {apiKeyWords.map((keyword, index) => (
          <div onClick={onClickKeyWord} key={index} className="w-[144px] h-[55px] rounded-[10px] drop-shadow-md px-[14px] py-[10px] bg-white">
            <p className="leading-[18px] text-[12px] text-[#808080] break-words">
              {keyword}
            </p>
          </div>
        ))}
      </div>
    );
  }
  
  export default SignInAutoKeyword;
  