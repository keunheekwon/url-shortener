import crypto from "crypto";

export const generateShortenedUrl = (originalUrl: string): string => {
  const hash = crypto
    .createHash("sha256")
    .update(originalUrl)
    .digest("hex")
    .slice(0, 6);
  return hash;
};
