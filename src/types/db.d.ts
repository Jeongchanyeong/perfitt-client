import firebase from "firebase/compat/app";

export type TUser = {
  name?: string;
  email?: string;
  gender?: string;
  birth?: {
    year: number;
    month: number;
    day: number;
  }
  size?: string;
  profile?: string;
}

export type TProduct = {
  productId: string;
  modelNo?: string;
  modelName?: string;
  brand?: string;
  link?: string;
  image?: string;
};

export type TBrand = {
  brandId: string;
  nameKor: string;
  nameEn: string;
  image: string;
}

export type TShoeRackReview = {
  star: number;
  datetime?: Date | firebase.firestore.Timestamp;
  length: string;
  width: string;
  height: string;
  cushion: string;
  weight: string;
  size: string;
  review: string;
};

export type TSearchHistory = {
  value: string;
  datetime: Date | firebase.firestore.Timestamp;
}

export type TChat = {
  chatId: string;
  title?: string;
  message?: {
    sender: 'user' | 'AI';
    message: string;
    image?: string;
    products?: TProduct[];
    dislike?: boolean;
  }
  datetime: Date | firebase.firestore.Timestamp;
}