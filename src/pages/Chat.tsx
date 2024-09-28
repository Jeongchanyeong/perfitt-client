import { useContext, useEffect, useRef, useState } from 'react';
import { IMessage, IText } from '../types/chat';
import { useChatResponseMutation } from '../hooks/useChatMutation';
import ChatWindow from '../components/contents/chat/chatwindow/ChatWindow';
import ChatInput from '../components/contents/chat/ChatInput';
import ChatHeader from '../components/contents/chat/ChatHeader';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../service/firebase';
import SignInAutoKeyword from '../components/contents/signin/SignInAutoKeyword';
import { AuthContext } from '../service/AuthContext';

const Chat = () => {
  const [chatMessage, setChatMessage] = useState<IMessage[]>([]);
  const idRef = useRef(0);
  const { mutate: AIResponse } = useChatResponseMutation();
  const { id } = useParams();
  const userInfo = useContext(AuthContext);

  // firestore에서 채팅방 데이터 가져오기
  const firestoreChatMessage = async () => {
    if (id) {
      const chatRoomRef = doc(db, 'chatRoom', id);
      const GetChatRoom = await getDoc(chatRoomRef);

      // 기존에 있는 채팅방일 수 있으니깐 있으면 그 채팅방에 메세지 작성 가능하도록 작성
      if (GetChatRoom.exists()) {
        // 채팅방에 message data 찾아와서
        const messages = GetChatRoom.data().messages || [];
        // 메세지 배열에 뿌려주기
        setChatMessage(messages);
      } else {
        // 아니면 빈배열
        setChatMessage([]);
      }
    }
  };

  // firestore에 메시지를 save, update
  const saveMessage = async (newMessage: IMessage) => {
    if (id) {
      const chatRoomRef = doc(db, 'chatRoom', id);
      const GetChatRoom = await getDoc(chatRoomRef);

      if (GetChatRoom.exists()) {
        // 배열에 내가 적은 메세지 추가
        await updateDoc(chatRoomRef, {
          messages: arrayUnion(newMessage),
        });
      } else {
        // 채탕방이 없을 경우 새로 생성
        await setDoc(chatRoomRef, {
          messages: [newMessage],
          createdAt: new Date(),
        });
      }
    }
  };

  useEffect(() => {
    firestoreChatMessage();
  }, [id]);

  // 메시지 처리 함수
  const handleMessage = async ({ text, image }: IText) => {
    const newMessage: IMessage = {
      id: idRef.current++,
      message: text || '',
      target: 'user',
    };

    if (image) {
      newMessage.image = image;
    }

    // 사용자 메시지 추가
    setChatMessage(message => [...message, newMessage]);
    // firestore에 사용자 메시지 저장
    await saveMessage(newMessage);

    // 성공 시 API 데이터 뿌려주기
    // 사용자가 뿌리는 데이터: text, image
    if (text || image) {
      AIResponse(
        { text, image },
        {
          onSuccess: async item => {
            const newAIMessage: IMessage = {
              id: idRef.current++,
              target: 'AI',
              message: item.message || '',
              products: item.products || [],
              brands: item.brands || [],
            };

            // AI 메시지 배열에 추가
            setChatMessage(AIMessage => [...AIMessage, newAIMessage]);
            // firestore에 AI 메시지 저장
            await saveMessage(newAIMessage);
          },
          onError: error => {
            console.error('err', error);
          },
        }
      );
    }
  };

  const handleKeywordSelect = (keyword: string) => {
    handleMessage({ text: keyword });
  };

  return (
    <div className='relative w-full h-full flex flex-col'>
      <ChatHeader />
      <div className='flex-1 flex flex-col overflow-y-auto scrollbar-hide'>
        <div className='h-14'></div>
        <ChatWindow chatMessage={chatMessage} />
      </div>
      {userInfo ? <SignInAutoKeyword onKeywordSelect={handleKeywordSelect} /> : null}
      <ChatInput handleMessage={handleMessage} />
    </div>
  );
};

export default Chat;
