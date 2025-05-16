import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

export const uploadFiles = async (req, res, next) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};
