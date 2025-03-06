"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const login_1 = __importDefault(require("../src/components/login"));
const UrlShortenerForm_1 = __importDefault(require("./components/UrlShortenerForm"));
const ProtectedRoute_1 = __importDefault(require("./hooks/ProtectedRoute"));
const App = () => {
    const isAuthenticated = Boolean(localStorage.getItem("user")); // Verifica se há um usuário autenticado
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<react_router_dom_1.Navigate to={isAuthenticated ? "/shortener" : "/login"} replace/>}/>

        <react_router_dom_1.Route path="/login" element={<login_1.default />}/>

        <react_router_dom_1.Route path="/shortener" element={<ProtectedRoute_1.default isAuthenticated={isAuthenticated}>
              <UrlShortenerForm_1.default />
            </ProtectedRoute_1.default>}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
