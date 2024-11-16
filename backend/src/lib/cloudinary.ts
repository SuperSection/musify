import { v2 as cloudinary } from "cloudinary";
import { UploadedFile } from "express-fileupload";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload file to Cloudinary
export const uploadToCloudinary = async (file: UploadedFile) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
      folder: "musify",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary", error);
    throw new Error("Failed to upload file to Cloudinary.");
  }
};

export default cloudinary;
