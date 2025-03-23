import { Request, Response } from "express";
import Url from "../models/url.model";
import { generateShortenedUrl } from "../utils/url.utils";

// POST 요청을 통한 URL 단축
export const shortenUrlPost = async (req: Request, res: Response) => {
  const { originalUrl, customUrl } = req.body;

  if (!originalUrl || typeof originalUrl !== "string") {
    return res
      .status(400)
      .json({ error: "Original URL is required and must be a string" });
  }

  // 기존 URL이 있는지 확인
  const existingUrl = await Url.findOne({ originalUrl });
  if (existingUrl) {
    return res.json({
      shortenedUrl: `https://s.keunheekwon.xyz/${existingUrl.shortenedUrl}`,
    });
  }

  // 단축된 URL 생성
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

// URL 리다이렉트 API
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
