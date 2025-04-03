import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import urlRoutes from "./routes/url.routes";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "", "public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(urlRoutes);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/url_shortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "url_shortener",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
