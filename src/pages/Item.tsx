// 좋아요/최근본 페이지

// 무한 스크롤
// 좋아요 기능 추가

import { useEffect, useState } from 'react';
import ItemToggle from '../components/contents/item/ItemToggle';
import { useParams } from 'react-router-dom';
import LikeItem from '../components/contents/item/LikeItem';
import LatestItem from '../components/contents/item/LatestItem';

function Item() {
  const { mode } = useParams();
  const [toggleMenu, setToggleMenu] = useState<string>();

  useEffect(() => {
    if (mode !== undefined) setToggleMenu(mode);
    else setToggleMenu('like');
  }, []);

  return (
    <div className='h-screen flex flex-col'>
      <ItemToggle
        mode={toggleMenu}
        setMode={setToggleMenu}
      />
      <div className='flex-1 flex flex-col p-4 pb-0 overflow-auto'>
        {toggleMenu === 'like' ? <LikeItem /> : <LatestItem />}
      </div>
    </div>
  );
}

export default Item;
