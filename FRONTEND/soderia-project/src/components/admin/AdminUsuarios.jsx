import React from "react";
import useCrud from "../../hooks/useCrud";
import { ENDPOINT_USERS, ENDPOINT_CLIENTES } from "../../routes/routes";
import "./adminstyles/AdminUsuarios.css";
import { useEffect, useState } from 'react'
import axios from 'axios';

const initialUsuario = {
  username: "",
  password: "",
  rol: "cliente",
};

const AdminUsuarios = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios
      .get(ENDPOINT_CLIENTES)
      .then((res) => setClientes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const {
    data: usuarios,
    item: nuevoUsuario,
    setItem: setNuevoUsuario,
    addItem: agregarUsuario,
    deleteItem: eliminarUsuario,
  } = useCrud(ENDPOINT_USERS, initialUsuario);

  const handleAgregar = () => {
    if (!nuevoUsuario.username || !nuevoUsuario.password) {
      return alert("Faltan datos pa");
    }
    agregarUsuario();
  };

  return (
    <div className="usuarios-container">
      <h2 className="usuarios-titulo">Usuarios</h2>

      <div className="usuarios-formulario">
        <input
          className="usuarios-input"
          type="text"
          placeholder="Username"
          value={nuevoUsuario.username}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })
          }
        />
        <input
          className="usuarios-input"
          type="password"
          placeholder="Password"
          value={nuevoUsuario.password}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })
          }
        />
        <select
          className="usuarios-select"
          value={nuevoUsuario.rol}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })
          }
        >
          <option value="admin">Admin</option>
          <option value="cliente">Cliente</option>
        </select>
        <button className="btn agregar" onClick={handleAgregar}>
          Agregar
        </button>
      </div>

      <table className="usuarios-tabla">
        <thead>
          <tr>
            <th>Username</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.rol}</td>
              <td>
                <button
                  className="btn eliminar"
                  onClick={() => {
                    const estaVinculado = clientes.some(
                      (c) => c.usuarioId === u.id
                    );
                    if (estaVinculado) {
                      alert(
                        "No podés eliminar este usuario porque está vinculado a un cliente 😬"
                      );
                      return;
                    }

                    if (
                      window.confirm(
                        "¿Seguro que querés borrar este usuario? 😬"
                      )
                    ) {
                      eliminarUsuario(u.id);
                    }
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsuarios;
