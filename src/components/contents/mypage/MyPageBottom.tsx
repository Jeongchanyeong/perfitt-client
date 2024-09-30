import arrow from '../../../assets/images/mypage-arrow.svg';
import { useState } from 'react';
import UpdatePassword from './UpdatePassword';
import ModalBar from '../../common/ModalBar';
import DeleteUser from './DeleteUser';
import UpdateInfo from './UpdateInfo';

const MyPageBottom = () => {
  // 비밀번호 변경 모달 상태
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const togglePasswordModal = () => {
    setIsPasswordModalOpen(!isPasswordModalOpen);
  };

  // 회원 탈퇴 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const goToCenterLink = () => {};

  return (
    <>
      <div className='pt-[25px] '>
        <div className='flex flex-row justify-between py-[16px] border-b-[1px] border-[#E4E4E7] mx-[-16px] pl-[16px]'>
          <div>내 정보 수정</div>
          <button onClick={toggleEditModal}>
            <img
              src={arrow}
              alt=''
              className='pr-[21.5px]'
            />
          </button>
        </div>

        {/* 비밀번호 변경 */}
        <div className=' flex flex-row justify-between  py-[16px] border-b-[1px] border-[#E4E4E7] mx-[-16px] pl-[16px]'>
          <div>비밀번호 변경</div>
          <button onClick={togglePasswordModal}>
            <img
              src={arrow}
              alt=''
              className='pr-[21.5px]'
            />
          </button>
        </div>

        {/* 고객센터 */}
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

      {/* 회원 탈퇴 */}
      <div className='flex flex-row pt-[39px] justify-center text-[14px] leading-[16.71px] font-normal text-[#808080]'>
        <a
          className='pr-[36px]'
          onClick={toggleDeleteModal}
        >
          회원탈퇴
        </a>
        <div>고객약관</div>
      </div>

      {/* 비밀번호 변경 모달 */}
      {isPasswordModalOpen && (
        <ModalBar
          isBarOpen={isPasswordModalOpen}
          toggleOpenBar={togglePasswordModal}
        >
          <UpdatePassword />
        </ModalBar>
      )}

      {/* 회원 탈퇴 모달 */}
      {isDeleteModalOpen && (
        <ModalBar
          isBarOpen={isDeleteModalOpen}
          toggleOpenBar={toggleDeleteModal}
        >
          <DeleteUser />
        </ModalBar>
      )}
      {/* 유저 정보수정 모달 */}
      {isEditModalOpen && (
        <ModalBar
          isBarOpen={isEditModalOpen}
          toggleOpenBar={toggleEditModal}
        >
          <UpdateInfo />
        </ModalBar>
      )}
    </>
  );
};
export default MyPageBottom;
