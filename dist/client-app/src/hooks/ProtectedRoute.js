"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ProtectedRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? <>{children}</> : <react_router_dom_1.Navigate to="/login" replace/>;
};
exports.default = ProtectedRoute;
