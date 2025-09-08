import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UrlShortenerForm from "./components/UrlShortenerForm";

const App: React.FC = () => {
  const isAuthenticated = Boolean(localStorage.getItem("user")); // Verifica se há um usuário autenticado

  return (
    <Router>
      <Routes>
        <Route path="/shortener" element={<UrlShortenerForm />} />
      </Routes>
    </Router>
  );
};

export default App;
