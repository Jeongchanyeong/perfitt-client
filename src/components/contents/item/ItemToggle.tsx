type TItemToggleProps = {
  mode: string | undefined;
  setMode: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function ItemToggle({ mode, setMode }: TItemToggleProps) {
  return (
    <div className='w-full text-base flex flex-row items-center mb-[3px]'>
      <button
        className={`flex-1 h-10 border-b-2 ${mode === 'like' ? 'font-extrabold border-black' : 'text-[#71717A]'}`}
        onClick={() => setMode('like')}
      >
        좋아요
      </button>
      <button
        className={`flex-1 h-10 border-b-2 ${mode === 'latest' ? 'font-extrabold border-black' : 'text-[#71717A]'}`}
        onClick={() => setMode('latest')}
      >
        최근 본
      </button>
    </div>
  );
}

export default ItemToggle;
