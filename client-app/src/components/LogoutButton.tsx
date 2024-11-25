import React from "react";
import { useMsal } from "@azure/msal-react";

const LogoutButton: React.FC = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    // Realiza o logout do usuário
    instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:3000", // Redireciona após o logout
    });
  };

  return (
    <button onClick={handleLogout} style={styles.button}>
      Sair
    </button>
  );
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

export default LogoutButton;
