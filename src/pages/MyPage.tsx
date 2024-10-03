import Header from '../components/common/Header';

import UserInfo from '../components/contents/mypage/UserInfo';
import MyPageBottom from '../components/contents/mypage/MyPageBottom';
import UserProfile from '../components/contents/mypage/UserProfile';
import LikeAndShoes from '../components/contents/mypage/LikeAndShoes';
import { useContext } from 'react';
import { AuthContext } from '../service/AuthContext';
import UserLoader from '../stores/UserLoder';
import { useUserStore } from '../stores/UserState';

const MyPage = () => {
  const userdata = useContext(AuthContext);
  const uid = userdata?.uid;
  const user = useUserStore(state => state.user);
  return (
    <div className='flex flex-col w-full h-full relative'>
      <UserLoader uid={uid} />
      <Header back />

      <UserProfile user={user} />

      <LikeAndShoes />

      <UserInfo user={user} />

      <MyPageBottom />
    </div>
  );
};
export default MyPage;
