import { ReactNode, useEffect, useState } from 'react';

type TBottomSheet = {
  isBarOpen: boolean;
  toggleOpenBar: () => void;
  children: ReactNode;
};

const BottomSheet = ({ isBarOpen, toggleOpenBar, children }: TBottomSheet) => {
  const [isDrag, setIsDrag] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDrag(true);
    setDragStartY(event.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDrag) {
        const distanceDragged = event.clientY - dragStartY;
        setTranslateY(Math.max(0, distanceDragged));
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      console.log('up', translateY);
      if (isDrag) {
        if (event.clientY > dragStartY + 50) toggleOpenBar();
        else setTranslateY(0);
        setIsDrag(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDrag]);

  return (
    <>
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-300
          ${isBarOpen ? 'bg-gray-600 opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={e => e.stopPropagation()}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-full h-fit p-4 z-50 shadow-2xl rounded-t-3xl bg-white
          transform transition-transform duration-300 ${isBarOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <button
          className='flex justify-center items-center w-full py-2'
          onMouseDown={handleMouseDown}
        >
          <hr className='border border-gray-700 w-4' />
        </button>
        {children}
      </div>
    </>
  );
};

export default BottomSheet;
