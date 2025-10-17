export interface AddProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  discount?: number;
  countInStock: number;
  productImage: File;
}

export interface UpdateProduct {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  discount?: number;
  countInStock?: number;
  productImage?: File;
}
