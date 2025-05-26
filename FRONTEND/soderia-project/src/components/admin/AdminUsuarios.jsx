import React from 'react'
import useCrud from '../../hooks/useCrud'
import { ENDPOINT_USERS } from '../../routes/routes'

const initialUsuario = {
  username: '',
  password: '',
  rol: 'cliente'
}

const AdminUsuarios = () => {
  const {
    data: usuarios,
    item: nuevoUsuario,
    setItem: setNuevoUsuario,
    addItem: agregarUsuario,
    deleteItem: eliminarUsuario,
  } = useCrud(ENDPOINT_USERS, initialUsuario)

  const handleAgregar = () => {
    if (!nuevoUsuario.username || !nuevoUsuario.password) {
      return alert('Faltan datos pa')
    }
    agregarUsuario()
  }

  return (
    <div>
      <h2>Usuarios</h2>

      <div>
        <input
          type="text"
          placeholder="Username"
          value={nuevoUsuario.username}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={nuevoUsuario.password}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })
          }
        />
        <select
          value={nuevoUsuario.rol}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="cliente">Cliente</option>
        </select>
        <button onClick={handleAgregar}>Agregar</button>
      </div>

      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.username} ({u.rol})
            <button
              onClick={() => {
                if (window.confirm('¿Seguro que querés borrar este usuario? 😬'))
                  eliminarUsuario(u.id)
              }}
            
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminUsuarios
