import Button from '../../common/Button';
import { galleryIcon, leftArrowIcon, upArrow } from '../../../assets/images/images';
import { IChatInput } from '../../../types/chat';
import { useState } from 'react';

const dummyList = [
  'https://cdn.pixabay.com/photo/2023/05/17/13/38/lofoten-islands-8000196_960_720.jpg',
  'https://cdn.pixabay.com/photo/2023/10/12/08/23/bird-8310172_1280.png',
  'https://cdn.pixabay.com/photo/2024/03/28/14/05/candle-8661042_960_720.jpg',
  'https://cdn.pixabay.com/photo/2024/08/24/18/49/spurred-turtle-8994997_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/08/19/15/01/sunflowers-8980921_1280.jpg',
];

const ChatInput = ({ handleMessage }: IChatInput) => {
  const [inputText, setInputText] = useState('');
  const [imgSelected, setImgSelected] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState<boolean>(false);

  const handleClick = () => {
    if (inputText.trim() === '' && imgSelected === null) return;

    const data = {
      text: inputText.trim(),
      image: imgSelected !== null ? dummyList[imgSelected] : undefined,
    };

    handleMessage(data);

    setInputText('');
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      handleClick();
    }
  };
  const galleryClick = () => {
    // 갤러리를 닫을 때 선택했던 이미지 리셋
    if (galleryOpen) {
      setImgSelected(null);
    }

    setGalleryOpen(!galleryOpen);
  };

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    // 텍스트 입력 시 선택했던 이미지 리셋
    if (e.target.value.trim() !== '') {
      setImgSelected(null);
    }
  };

  const imgClick = (index: number) => {
    setImgSelected(item => (item === index ? null : index));

    // 이미지 클릭했을 때 택스트 보내지 못하게 리셋
    if (imgSelected !== index) {
      setInputText('');
    }
  };

  return (
    <>
      <div className=' bg-[rgb(245,245,245)] w-full'>
        <div className='flex flex-row items-center py-4 px-4 '>
          <div
            className=' w-10 cursor-pointer'
            onClick={galleryClick}
          >
            <img
              src={galleryOpen ? leftArrowIcon : galleryIcon}
              alt='gallery-icon'
            />
          </div>

          <div className='relative flex flex-row w-full pl-3'>
            <input
              onKeyDown={handleEnter}
              value={inputText}
              onChange={handleInputText}
              className='w-full h-[48px] text-base rounded-full border border-[#E4E4E7] pl-4 pr-12 placeholder:text-[#71717A]'
              type='text'
              placeholder='궁금한 신발 정보 물어보세요!'
            />

            <Button
              className='flex items-center justify-center rounded-full w-10 h-10 absolute right-1 top-1/2 transform -translate-y-1/2'
              onClick={handleClick}
            >
              <img src={upArrow} />
            </Button>
          </div>
        </div>

        {galleryOpen && (
          <div className=' flex  pb-2 flex-nowrap overflow-x-auto scrollbar-hide'>
            {dummyList.map((img, index) => (
              <div
                key={index}
                className={`relative gap-1 border-2 ${imgSelected === index ? 'border-[#DC2626]' : 'border-transparent'} flex-shrink-0`}
                onClick={() => imgClick(index)}
              >
                <img
                  src={img}
                  className='w-[136px] h-[160px] object-cover'
                />

                {imgSelected === index && (
                  <div className='flex items-center justify-center absolute w-4 h-4 text-xs top-[10px] right-[10px] bg-[#DC2626] text-white rounded-full'>
                    <span>1</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatInput;
