"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const msal_react_1 = require("@azure/msal-react");
const msalConfig_1 = require("../src/components/msalConfig");
const App_1 = __importDefault(require("./App"));
const root = client_1.default.createRoot(document.getElementById("root"));
root.render(<react_1.default.StrictMode>
    <msal_react_1.MsalProvider instance={msalConfig_1.msalInstance}>
      <App_1.default />
    </msal_react_1.MsalProvider>
  </react_1.default.StrictMode>);
