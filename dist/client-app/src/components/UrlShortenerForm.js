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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom"); // Importando o useNavigate para redirecionamento
const msal_react_1 = require("@azure/msal-react");
require("../components/urlShortenerForm.css");
const LogoutButton_1 = __importDefault(require("./LogoutButton"));
const UrlShortenerForm = () => {
    const [fullUrl, setFullUrl] = (0, react_1.useState)("");
    const [shortUrl, setShortUrl] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const { accounts } = (0, msal_react_1.useMsal)(); // Pegando as contas autenticadas
    const navigate = (0, react_router_dom_1.useNavigate)(); // Hook de navegação para redirecionar
    // Verifique se o usuário está autenticado
    (0, react_1.useEffect)(() => {
        if (!accounts || accounts.length === 0) {
            // Caso não haja conta logada, redireciona para a página de login
            navigate("/login"); // Rota de login, altere se necessário
        }
    }, [accounts, navigate]);
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
            }
        }
        catch (err) {
            setError("Failed to connect to the server.");
        }
    });
    return (<div className="container">
      <h1 className="title">Encurtador de link</h1>
      
      {/* Adicionando o botão de logout */}
      <LogoutButton_1.default />

      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          URL Completa:
          <input className="input" type="text" value={fullUrl} onChange={(e) => setFullUrl(e.target.value)} placeholder="Coloque aqui o link para ser Encurtado" required/>
        </label>
        <button className="button" type="submit">
          Shorten URL
        </button>
      </form>

      {shortUrl && (<div className="shortUrlContainer">
          <h2>Link Encurtado:</h2>
          <a href={`http://localhost:5001/api/shortUrl/${shortUrl}`} target="_blank" rel="noopener noreferrer" className="shortUrlLink">
            {`http://localhost:5001/api/shortUrl/${shortUrl}`}
          </a>
        </div>)}

      {error && (<div className={`message error`}>
          <p>{error}</p>
        </div>)}
    </div>);
};
exports.default = UrlShortenerForm;
