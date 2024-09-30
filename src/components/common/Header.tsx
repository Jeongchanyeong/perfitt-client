import { useNavigate } from 'react-router-dom';
import { THeaderProps } from '../../types/header';
import { leftArrowIcon, verticalMenuIcon } from '../../assets/images/images';

const Header = (props: THeaderProps) => {
  const { title, back, rightChild, handleRightBtnClick } = props;

  const navigate = useNavigate();
  const currentPageDomain = window.location.origin;
  const previousPage = document.referrer;

  const handleBack = () => {
    if (previousPage) {
      try {
        const previousPageDomain = new URL(previousPage).origin;
        if (currentPageDomain === previousPageDomain) navigate(-1);
        else navigate('/chat');
      } catch (error) {
        console.error(error);
        navigate('/chat');
      }
    } else alert('이전 페이지가 없습니다.');
  };

  return (
    <header
      className='relative w-full h-14 p-4 flex justify-center items-center
        text-[18px] leading-6 font-semibold tracking-[-0.015em]'
    >
      {title}
      <div
        className='absolute top-0 left-0 w-full h-14 p-4
        flex justify-between items-center z-50'
      >
        {back && (
          <button
            className='w-6 h-6'
            onClick={handleBack}
          >
            <img
              src={leftArrowIcon}
              alt='back button'
              className='w-full h-full object-cover'
            />
          </button>
        )}

        {rightChild && (
          <div className='relative flex justify-center items-center'>
            <button
              className='w-11 h-11'
              onClick={handleRightBtnClick}
            >
              <img
                src={verticalMenuIcon}
                alt='overflow menu button'
                className='w-full h-full object-cover'
              />
            </button>
            {rightChild}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
