export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
}
export interface ICartItem {
  id?: string;
  name: string;
  image: string;
  price: number;
  quantity?: number;
  product: string;
}

export type RawCartItem = Pick<ICartItem, "image", "name", "price", "product">;
