import z from "zod";
import { createProductSchema, updateProductSchema } from "../../validators/admin/product.validators";

export interface ProductImage {
  fileBuffer: Buffer;
  fileName: string;
}

export type AddProduct = z.infer<typeof createProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
