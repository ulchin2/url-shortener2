"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const msal_react_1 = require("@azure/msal-react");
const LogoutButton = () => {
    const { instance } = (0, msal_react_1.useMsal)();
    const handleLogout = () => {
        // Realiza o logout do usuário
        instance.logoutRedirect({
            postLogoutRedirectUri: "http://localhost:3000", // Redireciona após o logout
        });
    };
    return (<button onClick={handleLogout} style={styles.button}>
      Sair
    </button>);
};
const styles = {
    button: {
        padding: "10px 20px",
        backgroundColor: "#0078d4",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        borderRadius: "4px",
        fontSize: "16px",
    },
};
exports.default = LogoutButton;
