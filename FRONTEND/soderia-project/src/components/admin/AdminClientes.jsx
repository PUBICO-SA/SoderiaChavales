import { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINT_CLIENTES } from '../../routes/routes';
import './adminstyles/AdminClientes.css';

const AdminClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', telefono: '', direccion: '' });

  const obtenerClientes = async () => {
    try {
      const res = await axios.get(ENDPOINT_CLIENTES);
      setClientes(res.data);
    } catch (err) {
      console.error('Error al obtener clientes:', err);
    }
  };

  const agregarCliente = async () => {
    const { nombre, telefono, direccion } = nuevoCliente;
    if (!nombre.trim() || !telefono.trim() || !direccion.trim()) {
      alert('Completá todos los campos antes de agregar un cliente.');
      return;
    }

    try {
      await axios.post(ENDPOINT_CLIENTES, nuevoCliente);
      setNuevoCliente({ nombre: '', telefono: '', direccion: '' });
      obtenerClientes();
    } catch (err) {
      console.error('Error al agregar cliente:', err);
    }
  };

  const eliminarCliente = async (id) => {
    const confirmar = window.confirm('¿Seguro que querés eliminar este cliente?');
    if (!confirmar) return;

    try {
      await axios.delete(`${ENDPOINT_CLIENTES}/${id}`);
      obtenerClientes();
    } catch (err) {
      console.error('Error al eliminar cliente:', err);
    }
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
          type="text"
          placeholder="Nombre"
          value={nuevoCliente.nombre}
          onChange={e => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
        />
        <input
          className="input-cliente"
          type="text"
          placeholder="Teléfono"
          value={nuevoCliente.telefono}
          onChange={e => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
        />
        <input
          className="input-cliente"
          type="text"
          placeholder="Dirección"
          value={nuevoCliente.direccion}
          onChange={e => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}
        />
        <button type="button" className="btn-agregar" onClick={agregarCliente}>Agregar</button>
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
          {clientes.length === 0 ? (
            <tr>
              <td colSpan="4">No hay clientes registrados aún.</td>
            </tr>
          ) : (
            clientes.map(cli => (
              <tr key={cli.id}>
                <td>{cli.nombre}</td>
                <td>{cli.telefono}</td>
                <td>{cli.direccion}</td>
                <td>
                  <button className="btn-eliminar" onClick={() => eliminarCliente(cli.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminClientes;
