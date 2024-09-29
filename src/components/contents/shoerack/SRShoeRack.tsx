import { useNavigate } from 'react-router-dom';
import SRShoeBox from './SRShoeBox';
import { plusIcon, polygonIcon } from '../../../assets/images/images';
import { useEffect, useState } from 'react';
import { TShoeRackItem } from '../../../types/shoerack';

function SRShoeRack({ shoesList }: { shoesList: TShoeRackItem[] }) {
  const navigate = useNavigate();
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
  const [sortedShoesList, setSortedShoesList] = useState(shoesList);

  useEffect(() => {
    setSortedShoesList(prev =>
      [...prev].sort((a, b) => {
        return sort === 'newest'
          ? b.datetime.getTime() - a.datetime.getTime()
          : a.datetime.getTime() - b.datetime.getTime();
      })
    );
  }, [sort]);

  const handleSort = () => {
    if (sort === 'newest') setSort('oldest');
    else setSort('newest');
  };

  return (
    <div className='flex flex-col gap-[5px] my-6'>
      <div className='flex justify-between items-center'>
        <span className='text-[14px] leading-[17px]'>
          총 <span className='font-semibold'>{shoesList.length}</span>개
        </span>
        <button
          className='flex gap-[6px] items-center'
          onClick={handleSort}
        >
          <span className='text-[14px] leading-[17px] font-medium text-[#808080]'>최신순</span>
          <span className={sort === 'newest' ? '' : 'transform scale-y-[-1]'}>
            <img
              src={polygonIcon}
              alt='Newest First'
            />
          </span>
        </button>
      </div>
      <div className='flex flex-wrap gap-[2px]'>
        <button
          className='w-[113px] h-[110px] rounded-md flex justify-center items-center bg-[#E4E4E7]'
          onClick={() => navigate('/shoe-rack/review/add')}
        >
          <img
            src={plusIcon}
            alt='Add shoes'
          />
        </button>
        {sortedShoesList.map(shoes => (
          <button
            key={shoes.productId}
            onClick={() => navigate(`/shoe-rack/review?id=${shoes.productId}`)}
          >
            <SRShoeBox
              className='w-[113px] h-[110px]'
              imgSrc={shoes.image}
              imgAlt={shoes.modelName}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default SRShoeRack;
