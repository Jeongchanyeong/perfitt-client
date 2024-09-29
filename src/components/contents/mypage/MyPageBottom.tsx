import { useNavigate } from 'react-router-dom';
import arrow from '../../../assets/images/mypage-arrow.svg';
import { TuserProfileProps } from '../../../types/sign';
import { useState } from 'react';
import UpdatePassword from './UpdatePassword';
import ModalBar from '../../common/ModalBar';

const MyPageBottom = (user: TuserProfileProps) => {
  const navicate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleOpenBar = () => {
    setIsModalOpen(!isModalOpen); // ModalBar 상태 토글
    console.log('ModalBar 닫기/열기 함수 호출');
  };
  const editUserInfo = () => {};
  const editPassword = () => {
    setIsModalOpen(true); // ModalBar 열림
  };
  const goToCenterLink = () => {};

  return (
    <>
      <div className='pt-[25px] '>
        <div className='flex flex-row justify-between py-[16px] border-b-[1px] border-[#E4E4E7] mx-[-16px] pl-[16px]'>
          <div>내 정보 수정</div>
          <button onClick={editUserInfo}>
            <img
              src={arrow}
              alt=''
              className='pr-[21.5px]'
            />
          </button>
        </div>
        <div className=' flex flex-row justify-between  py-[16px] border-b-[1px] border-[#E4E4E7] mx-[-16px] pl-[16px]'>
          <div>비밀번호 변경</div>
          <button onClick={editPassword}>
            {isModalOpen && (
              <ModalBar
                isBarOpen={isModalOpen}
                toggleOpenBar={toggleOpenBar}
              >
                <UpdatePassword />
              </ModalBar>
            )}

            <img
              src={arrow}
              alt=''
              className='pr-[21.5px]'
            />
          </button>
        </div>
        <div className='flex flex-row justify-between py-[16px] border-b-[1px] border-[#E4E4E7] mx-[-16px] pl-[16px]'>
          <div>고객센터</div>
          <button onClick={goToCenterLink}>
            <img
              src={arrow}
              alt=''
              className='pr-[21.5px]'
            />
          </button>
        </div>
      </div>
      <div className='flex flex-row pt-[39px] justify-center text-[14px] leading-[16.71px] font-norma text-[#808080]'>
        <div className='pr-[36px]'>회원탈퇴</div>
        <div>고객약관</div>
      </div>
    </>
  );
};
export default MyPageBottom;
