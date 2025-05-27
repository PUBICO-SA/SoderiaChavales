import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { ENDPOINT_USERS, ENDPOINT_CLIENTES } from "../routes/routes";
import axios from "axios";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.get(ENDPOINT_USERS, {
        params: {
          username,
          password,
        },
      });

      if (data.length === 1) {
        const user = data[0];

        if (user.rol === "cliente") {   
          const { data: clientes } = await axios.get(ENDPOINT_CLIENTES);
          const clienteEncontrado = clientes.find((c) => c.id === user.id);

          if (clienteEncontrado) {
            login({ ...user, nombre: clienteEncontrado.nombre });
          } else {
            login(user);
          }

          navigate("/cliente/ClienteDashboard");
        } else {
          login(user);
          navigate("/admin/AdminDashboard");
        }
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
