import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import urlRoutes from "./routes/url.routes";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// JSON 본문 파싱을 위한 미들웨어 추가
app.use(express.json()); // POST 요청의 body를 JSON 형식으로 파싱

// 정적 파일을 서빙할 디렉토리 설정 (public 폴더)
app.use(express.static(path.join(__dirname, "", "public")));

// 루트 경로에서 index.html 파일을 서빙
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// URL 단축 라우터 설정
app.use(urlRoutes);

// Mongoose 연결
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/url_shortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "url_shortener",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
