import { useState, useEffect, useRef } from 'react';
import { getRecomendAPi } from '../../../api/signin/getRecommendApi'; // 파일 경로를 적절히 조정

interface ISignInAutoKeyword {
  onKeywordSelect: (keyword: string) => void;
}

const SignInAutoKeyword = ({ onKeywordSelect }: ISignInAutoKeyword) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [apiKeyWords, setApiKeyWords] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const result = await getRecomendAPi();
      setApiKeyWords(result.data);
      setError(result.error);
    };

    getData();

    const scrollContainer = scrollContainerRef.current;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollContainer) {
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', onWheel);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', onWheel);
      }
    };
  }, []);

  // 키워드를 공백 기준으로 나누고 없으면 중간에서 자르는 함수
  const splitKeyword = (keyword: string) => {
    const middleIndex = Math.floor(keyword.length / 2) + 1;
    let splitIndex = keyword.lastIndexOf(' ', middleIndex);
    if (splitIndex === -1) splitIndex = middleIndex;

    const firstLine = keyword.slice(0, splitIndex);
    const secondLine = keyword.slice(splitIndex + 1);
    return (
      <>
        {firstLine}
        <br />
        {secondLine}
      </>
    );
  };

  const onClickKeyWord = (keyword: string) => {
    onKeywordSelect(keyword);
  };

  return (
    <div className='pl-4'>
      {error && <div className='error-message'>{error}</div>}
      <div
        ref={scrollContainerRef}
        className='cursor-pointer flex gap-2 py-[10px] overflow-x-auto scrollbar-hide'
      >
        {apiKeyWords ? (
          apiKeyWords.map((keyword, index) => (
            <div
              key={index}
              onClick={() => onClickKeyWord(keyword)}
              className='h-[55px] px-[14px] py-[10px] flex-shrink-0
              bg-white rounded-[10px] drop-shadow-md
              leading-[18px] text-[12px] text-[#808080] text-center'
            >
              {splitKeyword(keyword)}
            </div>
          ))
        ) : (
          <div>추천 키워드를 불러오는 중입니다...</div>
        )}
      </div>
    </div>
  );
};

export default SignInAutoKeyword;
