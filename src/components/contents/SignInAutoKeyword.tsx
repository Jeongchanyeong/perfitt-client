import { useEffect, useRef } from "react";

const SignInAutoKeyword = () => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const apiKeyWords = [
      '키워드1', 
      '키워드2', 
      '키워드3',
    ]; // 추천 키워드 

    useEffect(()=>{
        const scrollContainer = scrollContainerRef.current;

        const onWheel = (e:WheelEvent) => {
            e.preventDefault();
            // console.log('Wheel event detected:', e.deltaY); // 휠을 쓸 때마다 콘솔에서 확인가능 (메모이제이션 필요)
            if (scrollContainer) {
                scrollContainer.scrollLeft += e.deltaY; // 마우스 휠의 Y 축 움직임을 가로 스크롤로 변환
              }
            };
        if (scrollContainer) {
            scrollContainer.addEventListener('wheel',onWheel);
        }
        return () => {
            if(scrollContainer) {
                scrollContainer.removeEventListener('wheel', onWheel);
            }
        }
    },[]);
  
    const onClickKeyWord = () => {} // 키워드를 눌렀을 때 발생하는 이벤트
  
    return (
      <div ref={scrollContainerRef}
      className="flex gap-2 py-[10px] overflow-x-auto scrollbar-hide"> {/* 스크롤 및 스크롤바 숨김 */}
        {apiKeyWords.map((keyword, index) => (
          <div 
            onClick={onClickKeyWord} 
            key={index} 
            className="min-w-[144px] h-[55px] rounded-[10px] drop-shadow-md px-[14px] py-[10px] bg-white flex-shrink-0"
          >
            <p className="leading-[18px] text-[12px] text-[#808080] break-words">
              {keyword}
            </p>
          </div>
        ))}
      </div>
    );
  }
  
  export default SignInAutoKeyword;
  