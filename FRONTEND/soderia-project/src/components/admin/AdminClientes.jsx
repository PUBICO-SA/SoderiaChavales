// Ejemplo de estructura para AdminClientes.jsx
import { useEffect, useState } from 'react';
import {ENDPOINT_CLIENTES} from '../../routes/routes'; // Asegúrate de tener esta constante definida en tus rutas

const AdminClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', telefono: '', direccion: '' });

  const obtenerClientes = async () => {
    const res = await fetch(ENDPOINT_CLIENTES);
    const data = await res.json();
    setClientes(data);
  };

  const agregarCliente = async () => {
    await fetch(ENDPOINT_CLIENTES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCliente),
    });
    setNuevoCliente({ nombre: '', telefono: '', direccion: '' });
    obtenerClientes();
  };

  const eliminarCliente = async (id) => {
    await fetch(`${ENDPOINT_CLIENTES}/${id}`, { method: 'DELETE' });
    obtenerClientes();
  };

  const editarCliente = async (id, actualizado) => {
    await fetch(`${ENDPOINT_CLIENTES}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizado),
    });
    obtenerClientes();
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <div>
      <h2>Clientes</h2>
      <input placeholder="Nombre" value={nuevoCliente.nombre} onChange={e => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })} />
      <input placeholder="Teléfono" value={nuevoCliente.telefono} onChange={e => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })} />
      <input placeholder="Dirección" value={nuevoCliente.direccion} onChange={e => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })} />
      <button onClick={agregarCliente}>Agregar</button>
      <ul>
        {clientes.map(cli => (
          <li key={cli.id}>
            {cli.nombre} - {cli.telefono} - {cli.direccion}
            <button onClick={() => eliminarCliente(cli.id)}>Eliminar</button>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminClientes;
