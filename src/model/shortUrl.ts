import mongoose from "mongoose";
import { nanoid } from "nanoid";

//esqueminha
const shortUrlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
      validate:{
        validator: function (value: string): boolean {
          try{
            new URL(value);
            return true;
          }catch{
            return false;
          }
        },
        message: "Invalid URL format"
      }
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10)
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





export const urlModel = mongoose.model("ShortUrl", shortUrlSchema);
