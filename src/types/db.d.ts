export type TUser = {
  name?: string;
  email?: string;
  gender?: string;
  birth?: string;
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