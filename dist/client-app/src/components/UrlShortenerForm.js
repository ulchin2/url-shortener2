"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const style_1 = require("../components/style");
const UrlShortenerForm = () => {
    const [fullUrl, setFullUrl] = (0, react_1.useState)("");
    const [shortUrl, setShortUrl] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setError(null);
        try {
            const response = yield fetch("http://localhost:5001/api/shortUrl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullUrl }),
            });
            if (response.ok) {
                const data = yield response.json();
                setShortUrl(data.shortUrl);
            }
            else {
                const err = yield response.json();
                setError(err.message || "Something went wrong!");
                console.log(err);
            }
        }
        catch (err) {
            setError("Failed to connect to the server.");
        }
    });
    return (<style_1.Container>
      <style_1.Title>URL Shortener</style_1.Title>
      <style_1.Form onSubmit={handleSubmit}>
        <style_1.Label>
          Full URL:
          <style_1.Input type="text" value={fullUrl} onChange={(e) => setFullUrl(e.target.value)} placeholder="Enter the URL to shorten" required/>
        </style_1.Label>
        <style_1.Button type="submit">Shorten URL</style_1.Button>
      </style_1.Form>

      {shortUrl && (<style_1.ShortUrlContainer>
          <h2>Shortened URL</h2>
          <p>{`http://localhost:5001/api/shortUrl/${shortUrl}`}</p>
        </style_1.ShortUrlContainer>)}

      {error && (<style_1.Message isError>
          <p>{error}</p>
        </style_1.Message>)}
    </style_1.Container>);
};
exports.default = UrlShortenerForm;
