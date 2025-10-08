import { v2 as cloudinary } from "cloudinary";
import { AppError } from "./app-error";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET_KEY!,
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

export const uploadToCloudinary = async (fileBuffer: Buffer, fileName: string): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, _) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "E-commerce",
        public_id: fileName,
      },
      (err: any, result) => {
        if (err) {
          throw new AppError(500, err);
        }
        resolve(result as CloudinaryUploadResult);
      }
    );
    stream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  } catch (err: any) {
    throw new AppError(500, err);
  }
};
