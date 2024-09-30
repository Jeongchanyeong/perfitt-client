import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../service/firebase';
import { useUserStore } from './UserState';

type UserLoaderProps = {
  uid: string | undefined;
};

const UserLoader = ({ uid }: UserLoaderProps) => {
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      if (uid) {
        const userRef = doc(db, 'user', uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const userInfo = snapshot.data();
          setUser({
            name: userInfo?.name,
            profile: userInfo?.profile,
            email: userInfo?.email,
            gender: userInfo?.gender,
            birth: `${userInfo?.birth.year}.${userInfo?.birth.month}.${userInfo?.birth.day}`,
            size: userInfo?.size,
          });
        } else {
          console.warn('User not found.');
          setUser(null);
        }
      }
    };

    fetchUser();
  }, [uid, setUser]);

  return null;
};

export default UserLoader;
