import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SMChatList from './SMChatList';
import { IChat } from '../../../types/chat';
import menuIcon from '../../../assets/icons/menu-icon.svg';
import plusIcon from '../../../assets/icons/plus-mini-icon.svg';
import userIcon from '../../../assets/icons/user-border-icon.svg';
import { auth } from '../../../service/firebase';
import { createNewChat } from '../../../service/CreateNewChat';
import { AuthContext } from '../../../service/AuthContext';
import { useUserStore } from '../../../stores/UserState';

type TSideMenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const SideMenu = ({ isMenuOpen, toggleMenu }: TSideMenuProps) => {
  const navigate = useNavigate();
  const [chatData, setChatData] = useState<IChat[]>([]);
  const userdata = useContext(AuthContext);
  const uid = userdata?.uid;
  const user = useUserStore(state => state.user);

  useEffect(() => {
    const loadData = async () => {
      if (!uid) {
        navigate('/chat/signin'); // 로그인하지 않은 경우 이동
      } else {
        // await fetchChatData(); // 밑에 코드 수정후 활성화
      }
    };

    loadData(); // 데이터 로드 함수 호출
  }, [uid]);

  // //채팅데이터 불러오는 코드
  // const fetchChatData = async () => {
  //   const today = new Date();
  //   const lastWeek = new Date(today);
  //   lastWeek.setDate(today.getDate() - 7); // 7일 전 날짜

  //   const chatQuery = query(collection(db, 'chat'), where('createdAt', '>=', lastWeek), orderBy('createdAt', 'desc'));
  //   const snapshot = await getDocs(chatQuery);
  //   const chats = snapshot.docs.map(doc => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));

  //   setChatData(chats);
  // };

  const handleLink = (link: string) => {
    toggleMenu();
    navigate(`${link}`);
  };

  const handleCreateChat = async () => {
    const newRoom = await createNewChat();
    navigate(`/chat/${newRoom}`);
    toggleMenu();
  };

  const logout = () => {
    auth.signOut();
    handleCreateChat();
    window.location.reload();
  };

  return (
    <>
      <div
        className={`absolute inset-0 transition-opacity duration-300 z-10
          ${isMenuOpen ? 'bg-gray-600 opacity-50' : 'opacity-0 pointer-events-none'}`}
      />
      <nav
        className={`absolute top-0 left-0 w-[280px] h-full p-4 flex flex-col z-50 rounded-r-lg bg-white
        transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          className='w-6 h-6'
          onClick={toggleMenu}
        >
          <img
            src={menuIcon}
            alt='Close Side Menu'
            className='w-full h-full object-cover'
          />
        </button>

        {/* 새 채팅 */}
        <button
          className='flex justify-center items-center w-fit h-[36px] mt-[34px]
        pl-[7px] pr-2.5 rounded-[99px] bg-[rgb(245,245,245)]'
          onClick={handleCreateChat}
        >
          <img
            src={plusIcon}
            alt='New Chat'
            className='w-[18px] h-[18px]'
          />
          <div className='ml-[8px] text-[16px] leading-6 text-[#A1A1AA]'>새 채팅</div>
        </button>

        {/* 채팅 리스트 */}
        <div className='flex-1 overflow-scroll scrollbar-hide'>
          {chatData !== undefined && chatData.length > 0 && (
            <SMChatList
              date={'오늘'}
              chatlist={chatData}
              // handleLink={handleLink}
            />
          )}
        </div>

        {/* bottom menu */}
        <div className='flex flex-col py-[9px] border-y-[1px] border-[#E4E4E7] text-[16px] leading-6'>
          <button
            className='py-[7px] text-left hover:text-[#A1A1AA]'
            onClick={() => handleLink('/mypage/item/like')}
          >
            좋아요 | 최근 본
          </button>
          <button
            className='py-[7px] text-left hover:text-[#A1A1AA]'
            onClick={() => handleLink('/shoe-rack/main')}
          >
            신발장
          </button>
          <button
            className='py-[7px] text-left hover:text-[#A1A1AA]'
            onClick={() => handleLink('/mypage/foot')}
          >
            내 발 정보
          </button>
        </div>

        {/* 로그인/회원가입 OR 마이페이지/로그아웃 */}
        {/* <div className='h-[62px] flex items-center text-[16px] leading-5 font-medium'>
        <button
          className='hover:text-[#A1A1AA]'
          onClick={() => handleLink('/chat/sign')}
        >
          로그인
        </button>
        <span className='mx-1.5'>/</span>
        <button
          className='hover:text-[#A1A1AA]'
          onClick={() => handleLink('/chat/sign')}
        >
          회원가입
        </button>
      </div> */}
        <div className='flex justify-between items-center h-[62px]'>
          <button
            className='flex items-center gap-2 pr-5'
            onClick={() => handleLink('/mypage')}
          >
            <div className='w-[30px] h-[30px] rounded-full overflow-hidden'>
              <img
                src={user?.profile ? user.profile : userIcon}
                alt={`${user?.name} Profile`}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='max-w-[150px] text-[16px] leading-5 font-semibold truncate text-left'>{user?.name}</div>
          </button>
          <button
            className='text-[14px] text-[#AAAAAA] underline hover:text-[#F87171]'
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </nav>
    </>
  );
};

export default SideMenu;
