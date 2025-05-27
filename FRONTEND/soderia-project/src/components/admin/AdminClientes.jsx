import { useEffect, useState } from 'react';
import { ENDPOINT_CLIENTES } from '../../routes/routes';
import './adminstyles/AdminClientes.css';

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
    <div className="clientes-container">
      <h2 className="clientes-titulo">Clientes</h2>

      <div className="formulario-clientes">
        <input
          className="input-cliente"
          placeholder="Nombre"
          value={nuevoCliente.nombre}
          onChange={e => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
        />
        <input
          className="input-cliente"
          placeholder="Teléfono"
          value={nuevoCliente.telefono}
          onChange={e => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
        />
        <input
          className="input-cliente"
          placeholder="Dirección"
          value={nuevoCliente.direccion}
          onChange={e => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}
        />
        <button className="btn-agregar" onClick={agregarCliente}>Agregar</button>
      </div>

      <table className="tabla-clientes">
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
                <button className="btn-eliminar" onClick={() => eliminarCliente(cli.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminClientes;
