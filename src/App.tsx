import { useEffect, useState } from 'react';
import { auth } from './service/firebase';
import SUIBar from './components/common/ModalBar';
import SignUp from './pages/SignUp';
import BottomSheet from './components/common/ModalBar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBarOpen, setIsBarOpen] = useState(false);

  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  const toggleOpenBar = () => {
    setIsBarOpen(prev => !prev);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='relative h-full'>
      <button onClick={toggleOpenBar}>회원가입</button> {/* 예시 버튼 */}
      <BottomSheet
        isBarOpen={isBarOpen}
        toggleOpenBar={toggleOpenBar}
        children={<SignUp />}
      />
    </div>
  );
}
