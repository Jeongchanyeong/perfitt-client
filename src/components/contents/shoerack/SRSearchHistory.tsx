import { useEffect } from 'react';
import { xGrayIcon } from '../../../assets/images/images';
import { useSearchStore } from '../../../stores/search.store';

function SRSearchHistory({ handleSearch }: { handleSearch: (text: string) => void }) {
  const uid = 'qKnJXMMf4xd8KAn9UtGqegZFyjv2';
  const { searchHistory, fetchHistory, deleteHistory, deleteAllHistory } = useSearchStore();

  useEffect(() => {
    fetchHistory(uid);
  }, []);

  const deleteAll = () => {
    deleteAllHistory(uid);
  };

  const deleteSearchData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => {
    e.stopPropagation();
    deleteHistory(uid, text);
  };

  return (
    <div className='mt-5'>
      <div className='flex justify-between items-center px-4'>
        <span className='text-[18px] leading-[21px] font-medium'>최근 검색어</span>
        <button
          className='text-[14px] leading-[17px] text-[#727272]'
          onClick={deleteAll}
        >
          전체삭제
        </button>
      </div>
      <div className='border-b-[6px] border-[#F5F5F5]'>
        {searchHistory?.length === 0 ? (
          <div className='py-[31px] text-[14px] leading-[17px] text-[#A4A4A4] text-center'>최근 검색어가 없습니다.</div>
        ) : (
          <div className='mt-4'>
            {searchHistory?.map((data, index) => (
              <div
                key={index}
                className='relative w-full h-[42px] py-2 px-4 cursor-pointer
                border-t border-[#F5F5F5] text-[14.5px] text-left hover:bg-[#F5F5F5]'
                onClick={() => handleSearch(data.value)}
              >
                {data.value}
                <button
                  className='absolute top-0 right-0 px-4 h-[42px]'
                  onClick={e => deleteSearchData(e, data.value)}
                >
                  <img
                    src={xGrayIcon}
                    alt={`delete ${data}`}
                    className='w-[15px] h-[15px]'
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SRSearchHistory;
