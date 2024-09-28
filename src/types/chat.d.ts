export interface IMessage {
  id: number;
  target: 'user' | 'AI';
  products?: IProductItem[];
  brands?: IBrandCard[];
  message: string;
  image?: string;
}

export interface IChat {
  id?: string; // ? 삭제
  title?: string; // ? 삭제
  chatMessage?: IMessage[];
  date?: string;
}

export interface IChatInput {
  handleMessage: (data: IText) => void;
}

export interface IText {
  text: string;
  image?: string;
}
export interface IBrandCard {
  brand: string;
  thumbnail: string;
  link: string;
  description?: string;
}

export interface IProductItem {
  productId: string;
  image: string;
  link: string;
  modelName: string;
  brand: string;
  modelNo: string;
}

export interface IAIContainer {
  message: string;
  products?: IProductItem[];
  brands?: IBrandCard[];
}

export interface ICardContainer {
  brands?: IBrandCard[];
  products?: IProductItem[];
}

export interface IProductItemProps {
  product: IProductItem;
}

export interface IBrandCardProps {
  brand: IBrandCard;
}
