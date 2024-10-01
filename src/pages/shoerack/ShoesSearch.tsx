// 신발 검색(text) 페이지

// 로그인 안 했을 때?
// 검색 이미지 버튼 onClick?
// 이미지 검색 link
// 검색 결과 없을 때
// 최근 검색어 몇 개?
// 무한 스크롤?

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SRSearchHistory from '../../components/contents/shoerack/SRSearchHistory';
import SRShoeInfo from '../../components/contents/shoerack/SRShoeInfo';
import Button from '../../components/common/Button';
import { cameraIcon, searchIcon } from '../../assets/images/images';
import HeaderLayout from '../../layout/HeaderLayout';
import { TProduct } from '../../types/db';
import { upsertProduct } from '../../api/upsertProduct';
import { useSearchStore } from '../../stores/search.store';
import { postShoesFind } from '../../api/postShoesFind';

function ShoesSearch() {
  const uid = 'qKnJXMMf4xd8KAn9UtGqegZFyjv2';
  const navigate = useNavigate();
  const { updateHistory } = useSearchStore();
  const [search, setSearch] = useState('');
  const [shoeData, setShoeData] = useState<TProduct[]>();
  const [selected, setSelected] = useState('');

  const searchData = async (text: string) => {
    try {
      await updateHistory(uid, text);
      const products = await postShoesFind(search);
      setShoeData(products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    searchData(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') searchData(search);
  };

  const selectShoes = async () => {
    const data = shoeData?.find(shoe => shoe.productId === selected);
    try {
      if (selected !== '' && data !== undefined) {
        const result = await upsertProduct(data);
        if (result === 'success') navigate(`/shoerack/review/add?id=${selected}`);
        else alert('오류가 발생하였습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('오류가 발생하였습니다. 다시 시도해주세요.');
      console.log(error);
    }
  };

  return (
    <HeaderLayout
      title='신발 검색'
      back
    >
      <div className='h-full flex flex-col'>
        <div className='p-4 pt-0 mt-[5px]'>
          {/* 검색창 */}
          <div
            className='flex justify-between items-center w-full h-10 pl-4 pr-5
          border border-[#E4E4E7] rounded-full'
          >
            <img
              src={searchIcon}
              alt='search'
              className='w-[15px] h-[15px]'
            />
            <input
              className='flex-1 m-[11px] h-9 text-[15px] placeholder-[#D4D4D8] focus:outline-none'
              type='text'
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder='신발이름, 모델명 겸색'
            />
            <button>
              <img
                src={cameraIcon}
                alt='image search'
                className='w-[18px] h-[17px]'
              />
            </button>
          </div>
        </div>

        {/* 최근 검색어 / 검색 리스트 */}
        {shoeData === undefined || shoeData.length === 0 ? (
          <SRSearchHistory handleSearch={handleSearch} />
        ) : (
          <div className='p-4 pt-5 flex-1 flex flex-col'>
            <div className='flex-1 mb-4 flex flex-col gap-2.5'>
              {shoeData?.map(shoe => (
                <div
                  key={shoe.productId}
                  className={`border hover:border-black rounded cursor-pointer
                  ${selected === shoe.productId ? 'border-black' : 'border-white'}`}
                  onClick={() => setSelected(prev => (prev === shoe.productId ? '' : shoe.productId))}
                >
                  <SRShoeInfo {...shoe} />
                </div>
              ))}
            </div>
            {selected !== '' && <Button onClick={selectShoes}>선택 완료</Button>}
          </div>
        )}
      </div>
    </HeaderLayout>
  );
}

export default ShoesSearch;
