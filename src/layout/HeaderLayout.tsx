import Header from '../components/common/Header';
import { ReactNode } from 'react';
import { THeaderProps } from '../types/header';

type THeaderLayoutProps = {
  children: ReactNode;
} & THeaderProps;

function HeaderLayout(props: THeaderLayoutProps) {
  const { children, title, back, rightChild, handleRightBtnClick } = props;

  return (
    <div className='flex flex-col h-screen'>
      <Header
        title={title}
        back={back}
        rightChild={rightChild}
        handleRightBtnClick={handleRightBtnClick}
      />
      <main className='flex-grow overflow-auto scrollbar-hide'>{children}</main>
    </div>
  );
}

export default HeaderLayout;
