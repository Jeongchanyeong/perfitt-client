import { IChat } from '../../../types/chat';
import chatIcon from '../../../assets/icons/chat-icon.svg';
import { motion, useDragControls, useMotionValue, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import deleteBtn from '../../../assets/images/sidemenu-delete.svg';
import shareBtn from '../../../assets/images/sidemenu-share.svg';

type TSMChatListProps = {
  date: string;
  chatlist: IChat[];
  // onDelete: (chatId: string) => void;
  // handleLink: (link: string) => void;
};

function SMChatList({ date, chatlist }: TSMChatListProps) {
  return (
    <div className='mt-[15px]'>
      <div className='mb-2 text-[14px] leading-6 font-semibold text-[#A1A1AA]'>{date}</div>
      {chatlist.map(chat => {
        const [isDragging, setIsDragging] = useState(false);
        const swipeDragControls = useDragControls();

        const [isBtnShow, setIsBtnShow] = useState(false);

        const itemX = useMotionValue(0);

        useEffect(() => {
          itemX.on('change', v => {
            const isOverThreshold = v < -90 / 2;
            setIsBtnShow(isOverThreshold);
          });
        }, [itemX]);

        const handleDragStart = () => {
          setIsDragging(true);
        };

        // 드래그 되었을 때, isOverThreshold를 넘었을 때 -90, 아니면 원래 위치로
        const handleDragEnd = () => {
          setIsDragging(false);
          const isOverThreshold = itemX.get() < -90 / 2;

          animate(itemX, isOverThreshold ? -46 : 0);
        };

        return (
          <motion.div
            className=''
            drag='x'
            dragControls={swipeDragControls}
            dragConstraints={{ left: -90, right: 0 }} //드래그 되는 정도
            dragElastic={0.1} //얼마나 부드럽게 드래그 할디
            onDragStart={handleDragStart}
            onPointerDown={e => swipeDragControls.start(e)}
            style={{
              x: itemX,
            }}
            onDragEnd={handleDragEnd}
          >
            <button
              key={chat.id}
              className='h-[34px] flex items-center gap-2 '
              // onClick={() => handleLink(`/chat/${chat.id}`)}
            >
              <img
                src={chatIcon}
                alt='Chat'
                className='w-5 h-5'
              />
              <div className='text-base flex-1 truncate'>{chat.title}</div>
              {isBtnShow && (
                <motion.div className='relative right-0 pl-[10px] '>
                  <button>
                    <img
                      src={deleteBtn}
                      alt='Delete'
                      width='45px'
                      height='34px'
                    />
                  </button>
                  <button>
                    <img
                      src={shareBtn}
                      alt='Share'
                      width='45px'
                      height='34px'
                    />
                  </button>
                </motion.div>
              )}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}

export default SMChatList;
