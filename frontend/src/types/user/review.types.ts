export interface CreateReview {
  rating: number;
  comment?: string;
}

export interface UpdateReview {
  rating?: number;
  comment?: string;
}

export interface ReviewResponse {
  _id: string;
  user: {
    _id: string;
    name: string;
    imageUrl?: string | null;
  };
  product: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
