import Header from '../../common/Header';
import { useContext, useRef } from 'react';
import arrow from '../../../assets/images/mypage-arrow.svg';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { AuthContext } from '../../../service/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../service/firebase';

const UpdateUserProfile = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userdata = useContext(AuthContext);
  const uid = userdata?.uid;
  const storage = getStorage();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && uid) {
      const storageRef = ref(storage, `user/profile/${uid}/${file.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const userDocRef = doc(db, 'user', uid);
        await updateDoc(userDocRef, {
          profile: downloadURL,
        });

        alert('프로필 사진이 업데이트되었습니다.');
        window.location.reload();
      } catch (error) {
        console.error('파일 업로드 중 오류 발생:', error);
      }
    } else {
      console.error('파일이 선택되지 않았거나 UID가 없습니다.');
    }
  };

  const handleFileDelete = async () => {
    if (uid) {
      const listRef = ref(storage, `user/profile/${uid}`);
      try {
        const res = await listAll(listRef);
        if (res.items.length > 0) {
          const recentFileRef = res.items[0];
          await deleteObject(recentFileRef);
          alert('최근 프로필 사진이 삭제되었습니다.');
          const userDocRef = doc(db, 'user', uid);
          await updateDoc(userDocRef, {
            profile: '', // 또는 null로 설정
          });
          window.location.reload();
        } else {
          alert('삭제할 프로필 사진이 없습니다.');
        }
      } catch (error) {
        console.error('파일 삭제 중 오류 발생:', error);
      }
    }
  };

  return (
    <>
      <Header title='프로필 사진 바꾸기' />
      <div className='flex flex-row justify-between py-[16px] border-b-[1px] border-[#E4E4E7] mx-[-16px] pl-[16px]'>
        <div>사진 업로드</div>
        <button onClick={handleButtonClick}>
          <img
            src={arrow}
            alt=''
            className='pr-[21.5px]'
          />
        </button>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      <div className='flex flex-row justify-between py-[16px] border-b-[1px] border-[#E4E4E7] mx-[-16px] pl-[16px]'>
        <div>현재 사진 삭제</div>
        <button onClick={handleFileDelete}>
          <img
            src={arrow}
            alt=''
            className='pr-[21.5px]'
          />
        </button>
      </div>
    </>
  );
};

export default UpdateUserProfile;
