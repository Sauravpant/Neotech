import { Document, Types } from "mongoose";
import { reportProductSchema } from "../validators/report.validators";
import z from "zod";

export interface IReport extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  product: Types.ObjectId;
  reason: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

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

export type ReportProductInput = z.infer<typeof reportProductSchema>;
