// 신발 검색(text) 페이지

// 로그인 안 했을 때?
// 검색 이미지 버튼 onClick?
// 이미지 검색 link
// 검색 결과 없을 때
// 최근 검색어 몇 개?
// 무한 스크롤?

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SRSearchHistory from '../../components/contents/shoerack/SRSearchHistory';
import SRShoeInfo from '../../components/contents/shoerack/SRShoeInfo';
import Button from '../../components/common/Button';
import { cameraIcon, searchIcon } from '../../assets/images/images';
import HeaderLayout from '../../layout/HeaderLayout';
import { TProduct } from '../../types/db';
import { upsertProduct } from '../../api/upsertProduct';

function ShoesSearch() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [shoeData, setShoeData] = useState<TProduct[]>();
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setShoeData([
      {
        image: 'https://image.a-rt.com/art/product/2022/01/60008_1642143249212.jpg?shrink=580:580',
        link: 'https://m.abcmart.a-rt.com/product/new?prdtNo=1010087307',
        modelName: 'W NIKE COURT VISION ALTA LTR',
        brand: 'NIKE',
        modelNo: 'DM0113',
        productId: '1010087307',
      },
      {
        image: 'https://image.a-rt.com/art/product/2024/07/08615_1721974809586.jpg?shrink=580:580',
        link: 'https://grandstage.a-rt.com/product/new?prdtNo=1020108507',
        modelName: '조그 100 2 맨 엑스트라 와이드',
        brand: 'ASICS',
        modelNo: '1011C089',
        productId: '1020108507',
      },
      {
        brand: 'SALOMON',
        image: 'https://perfittdemo.myshopify.com/cdn/shop/files/Untitled_12.png?v=1715936706&width=1946',
        link: 'https://perfittdemo.myshopify.com/products/salomon-x-ultra-4-mid-gtx',
        modelName: 'SALOMON X Ultra 4 Mid GTX',
        modelNo: 'L41383400',
        productId: '8209459151000',
      },
    ]);
  }, []);

  const handleSearch = () => {};

  const selectShoes = async () => {
    const data = shoeData?.find(shoe => shoe.productId === selected);
    try {
      if (selected !== '' && data !== undefined) {
        const result = await upsertProduct(data);
        if (result === 'success') navigate(`/shoe-rack/review/add?id=${selected}`);
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
