export type TProductCard = {
  productId: string;
  image: string;
  link: string;
  modelName: string;
  brand: string;
  modelNo: string;
};

export type TProductCardProps = {
  product: IProductCard;
};
export type TLikeBrand = {
  brandId: string;
  ename: string;
  kname: string;
  image: string;
};
export type TLikeBrandProps = {
  brands: TLikeBrand;
};
