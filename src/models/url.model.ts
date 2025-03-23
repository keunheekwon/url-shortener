import mongoose, { Schema, Document } from "mongoose";

interface IUrl extends Document {
  originalUrl: string;
  shortenedUrl: string;
}

const urlSchema = new Schema<IUrl>({
  originalUrl: { type: String, required: true },
  shortenedUrl: { type: String, required: true, unique: true },
});

const Url = mongoose.model<IUrl>("Url", urlSchema);

export default Url;
