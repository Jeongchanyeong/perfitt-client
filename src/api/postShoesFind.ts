import axios from 'axios';
import { BASE_URL } from '../config/config';

export const postShoesFind = async (text: string) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/shoes/find`,
      { text: text },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data.products;
  } catch (error) {
    throw error;
  }
};
