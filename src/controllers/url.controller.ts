import { Request, Response } from "express";
import Url from "../models/url.model";
import { generateShortenedUrl } from "../utils/url.utils";

export const shortenUrlPost = async (req: Request, res: Response) => {
  const { originalUrl, customUrl } = req.body;

  if (!originalUrl || typeof originalUrl !== "string") {
    return res
      .status(400)
      .json({ error: "Original URL is required and must be a string" });
  }

  const existingUrl = await Url.findOne({ originalUrl });
  if (existingUrl) {
    return res.json({
      shortenedUrl: `https://s.keunheekwon.xyz/${existingUrl.shortenedUrl}`,
    });
  }

  const shortenedUrl =
    customUrl && typeof customUrl === "string"
      ? customUrl
      : generateShortenedUrl(originalUrl);

  const newUrl = new Url({
    originalUrl,
    shortenedUrl,
  });

  try {
    await newUrl.save();
    return res.json({ shortenedUrl: `https://s.keunheekwon.xyz/${shortenedUrl}` });
  } catch (error) {
    return res.status(500).json({ error: "Error saving URL" });
  }
};

export const redirectUrl = async (req: Request, res: Response) => {
  const { shortenedUrl } = req.params;

  try {
    const url = await Url.findOne({ shortenedUrl });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error fetching URL" });
  }
};
