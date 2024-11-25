import React from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { instance } = useMsal();
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleLogin = () => {
    instance
      .loginPopup({
        scopes: ["User.Read"], // Escopos necessários para autenticar
      })
      .then((response) => {
        console.log("Login bem-sucedido:", response.account);
        localStorage.setItem("user", JSON.stringify(response.account)); // Armazena os dados do usuário
        navigate("/shortener"); // Redireciona para o componente UrlShortenerForm
      })
      .catch((error) => {
        console.error("Erro ao autenticar:", error);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bem-vindo ao URL Shortener</h1>
      <p style={styles.subtitle}>Faça login com sua conta Office para continuar</p>
      <button onClick={handleLogin} style={styles.button}>
        Entrar com Office
      </button>
    </div>
  );
};

const styles: {
  container: React.CSSProperties;
  title: React.CSSProperties;
  subtitle: React.CSSProperties;
  button: React.CSSProperties;
} = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1rem",
    marginBottom: "2rem",
  },
  button: {
    backgroundColor: "#0078D4",
    color: "#fff",
    border: "none",
    padding: "0.8rem 1.6rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default Login;
