import mongoose, { Schema } from "mongoose";
import { required } from "zod/mini";
import { IReport } from "../types/report.types";

const reportSchema = new Schema<IReport>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Report = mongoose.model<IReport>("Report", reportSchema);
