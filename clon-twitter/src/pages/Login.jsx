import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      alert("Ingresa un nombre de usuario");
      return;
    }
    onLogin(username.trim());
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 300, margin: "auto", marginTop: 100, display: "flex", flexDirection: "column" }}
    >
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ padding: 8, marginBottom: 12 }}
      />
      <button type="submit" style={{ padding: 8, backgroundColor: "#1DA1F2", color: "white", border: "none" }}>
        Entrar
      </button>
    </form>
  );
};

export default Login;
