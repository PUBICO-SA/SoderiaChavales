import { useEffect, useState } from 'react';
import { ENDPOINT_CLIENTES } from '../../routes/routes';

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

  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <div>
      <h2>Clientes</h2>

      <input
        placeholder="Nombre"
        value={nuevoCliente.nombre}
        onChange={e => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
      />
      <input
        placeholder="Teléfono"
        value={nuevoCliente.telefono}
        onChange={e => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
      />
      <input
        placeholder="Dirección"
        value={nuevoCliente.direccion}
        onChange={e => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}
      />
      <button onClick={agregarCliente}>Agregar</button>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cli => (
            <tr key={cli.id}>
              <td>{cli.nombre}</td>
              <td>{cli.telefono}</td>
              <td>{cli.direccion}</td>
              <td>
                <button onClick={() => eliminarCliente(cli.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminClientes;
