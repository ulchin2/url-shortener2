import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/components/login";
import UrlShortenerForm from "./components/UrlShortenerForm";
import ProtectedRoute from "./hooks/ProtectedRoute";

const App: React.FC = () => {
  const isAuthenticated = Boolean(localStorage.getItem("user")); // Verifica se há um usuário autenticado

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/shortener" : "/login"} replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/shortener"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UrlShortenerForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;