export interface CartResponse {
  user: string;
  items: {
    _id: string;
    quantity: number;
    product: {
      _id: string;
      name: string;
      price: number;
      discount: number;
      imageUrl: string;
    };
  }[];
}