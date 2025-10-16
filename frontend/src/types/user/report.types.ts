export interface ReportResponse {
  _id: string;
  product: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  reason: string;
  description: string;
  createdAt: Date;
}

export interface ReportProductInput {
  reason: string;
  description: string;
}
