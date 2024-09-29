import Header from '../components/common/Header';

import UserInfo from '../components/contents/mypage/UserInfo';
import MyPageBottom from '../components/contents/mypage/MyPageBottom';
import UserProfile from '../components/contents/mypage/UserProfile';
import LikeAndShoes from '../components/contents/mypage/LikeAndShoes';
import { useContext } from 'react';
import { AuthContext } from '../service/AuthContext';
import { useUserStore } from '../stores/UserState';
import UserLoader from '../stores/UserLoder';

const MyPage = () => {
  const userdata = useContext(AuthContext);
  const uid = userdata?.uid;
  const user = useUserStore(state => state.user);
  return (
    <div className='flex flex-col flex-1'>
      <UserLoader uid={uid} />
      <Header back />

      <UserProfile user={user} />

      <LikeAndShoes />

      <UserInfo user={user} />

      <MyPageBottom user={user} />
    </div>
  );
};
export default MyPage;
