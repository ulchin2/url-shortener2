import mongoose from "mongoose";
import { nanoid } from "nanoid";

//esqueminha
const shortUrlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      default: () => nanoid().substring(0, 10),
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware para adicionar o protocolo ao fullUrl
shortUrlSchema.pre("save", function (next) {
  if (!/^https?:\/\//i.test(this.fullUrl)) {
    this.fullUrl = `https://${this.fullUrl}`;
  }
  next();
});


export const urlModel = mongoose.model("ShortUrl", shortUrlSchema);
