import ReactMarkdown from 'react-markdown';
import { perfittCircleLogo } from '../../../../../assets/images/images';
import { IText } from '../../../../../types/chat';
import { emphasize } from '../../../../../config/markdown';

const AIMessage = ({ text }: IText) => {
  return (
    <div className='flex'>
      <div className='w-7 h-7'>
        <img
          src={perfittCircleLogo}
          alt='perfitt-logo'
        />
      </div>
      <div className='max-w-[90%] px-2.5 py-[5px] text-sm/[22px] break-words'>
        <ReactMarkdown components={emphasize}>{text}</ReactMarkdown>
      </div>
    </div>
  );
};
export default AIMessage;
