import axios from 'axios';
import { BASE_URL } from '../../config/config';
import { IMessage, IText } from '../../types/chat';

export const fetchChatResponseApi = async (data: IText): Promise<IMessage> => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/chat/completions`,
      {
        message: { content: data.text, image: data.image },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error('err', err);
    throw err;
  }
};
