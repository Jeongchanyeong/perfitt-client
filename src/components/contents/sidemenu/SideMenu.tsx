import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SMChatList from './SMChatList';
import { IChat } from '../../../types/chat';
import menuIcon from '../../../assets/icons/menu-icon.svg';
import plusIcon from '../../../assets/icons/plus-mini-icon.svg';
import userIcon from '../../../assets/icons/user-border-icon.svg';
import { createNewChat } from '../../../service/CreateNewChat';
import Logout from '../signin/Logout';
import { AuthContext } from '../../../service/AuthContext';
import UserLoader from '../../../stores/UserLoder';
import { useUserStore } from '../../../stores/UserState';

type TSideMenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const SideMenu = ({ toggleMenu, isMenuOpen }: TSideMenuProps) => {
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

  return (
    <>
      <UserLoader uid={uid} />
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
          {chatData.length > 0 && (
            <SMChatList
              date={'오늘'}
              chatlist={chatData}
              handleLink={handleLink}
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

        <div className='flex justify-between items-center h-[62px]'>
          {userdata ? (
            <>
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
              <Logout />
            </>
          ) : (
            <div className='flex items-center gap-2 pr-5'>
              <button
                className='hover:text-[#A1A1AA]'
                onClick={() => {
                  console.log('로그인 버튼 클릭됨');
                }}
              >
                로그인
              </button>
              <span className='mx-1.5'>/</span>
              <button
                className='hover:text-[#A1A1AA]'
                onClick={() => {
                  console.log('회원가입 버튼 클릭됨');
                }}
              >
                회원가입
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default SideMenu;
