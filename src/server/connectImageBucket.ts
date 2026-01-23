import { v2 as cloudinary } from "cloudinary";
import type { Readable } from "node:stream";
import type { UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function connectImageBucket(
  param: Readable,
  severity: string,
): Promise<UploadApiResponse> {
  return await new Promise((resolve, reject) => {
    param.on("error", (err) => reject(err));
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "RoadsApp",
        resource_type: "image",
        tags: [severity],
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary returned no result"));
          return;
        }

        resolve(result);
      },
    );
    param.pipe(uploadStream);
  });
}
export default cloudinary;
