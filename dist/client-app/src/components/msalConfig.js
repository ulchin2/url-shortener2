"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msalInstance = exports.msalConfig = void 0;
const msal_browser_1 = require("@azure/msal-browser");
exports.msalConfig = {
    auth: {
        clientId: "7d70bea2-05b4-43b9-89a4-bca84153d093", // Substitua pelo Application (client) ID
        authority: "https://login.microsoftonline.com/7df112d6-178e-4548-ad24-88e1dabe3852", // Substitua pelo Directory (tenant) ID
        redirectUri: "http://localhost:3000", // Mesma URL definida no Azure
    },
    cache: {
        cacheLocation: "localStorage", // Armazena tokens no localStorage
        storeAuthStateInCookie: true, // Necessário para navegadores antigos
    },
};
exports.msalInstance = new msal_browser_1.PublicClientApplication(exports.msalConfig);
