import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { perfittLogo } from '../assets/images/images';
import Button from '../components/common/Button';
import SUInput from '../components/contents/signup/SUInput';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async () => {
    console.log('최종 데이터:', { email, password });

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('로그인 성공:', user);
      setErrorMessage(''); // 성공 시 에러 메시지 초기화
      navigate('/chat/signin');
    } catch (e: any) {
      console.error('로그인 실패:', e.message);
      handleErrorMessage(e.code);
    }
  };

  // error에 따른 메세지
  const handleErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/invalid-credential':
        setErrorMessage('잘못된 아이디 또는 비밀번호입니다. 다시 시도해주세요.');
        break;
      case 'auth/user-not-found':
        setErrorMessage('해당 이메일을 가진 사용자를 찾을 수 없습니다.');
        break;
      case 'auth/wrong-password':
        setErrorMessage('비밀번호가 잘못되었습니다.');
        break;
      default:
        setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='shadow-md border rounded flex flex-col gap-4 items-center p-8'>
        <img
          src={perfittLogo}
          className='h-16 w-16 mb-4'
          alt='Perfitt Logo'
        />
        <SUInput
          label='아이디'
          className='px-4 py-3.5'
          id='email'
          placeholder='이메일을 입력해 주세요'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <SUInput
          label='비밀번호'
          className='px-4 py-3.5'
          type='password'
          id='password'
          placeholder='비밀번호를 입력해 주세요'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>로그인</Button>

        {/* 에러 메시지 출력 */}
        {errorMessage && <div className='text-red-500 mt-2 break-spaces'>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Login;
