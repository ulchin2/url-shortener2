"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
//esqueminha
const shortUrlSchema = new mongoose_1.default.Schema({
    fullUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                try {
                    new URL(value);
                    return true;
                }
                catch (_a) {
                    return false;
                }
            },
            message: "Invalid URL format"
        }
    },
    shortUrl: {
        type: String,
        required: true,
        default: () => (0, nanoid_1.nanoid)().substring(0, 10),
    },
    clicks: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
// Middleware para adicionar o protocolo ao fullUrl
shortUrlSchema.pre("save", function (next) {
    if (!/^https?:\/\//i.test(this.fullUrl)) {
        this.fullUrl = `https://${this.fullUrl}`;
    }
    next();
});
exports.urlModel = mongoose_1.default.model("ShortUrl", shortUrlSchema);
