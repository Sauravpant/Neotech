import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOtp extends Document {
  _id: Types.ObjectId;
  email: string;
  otp: string;
  expiresAt: Date;
  createdAt: Date;
}

const otpRequestSchema = new Schema<IOtp>({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});
export const Otp = mongoose.model<IOtp>("Otp", otpRequestSchema);
