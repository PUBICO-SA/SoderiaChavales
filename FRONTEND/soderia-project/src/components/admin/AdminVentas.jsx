import { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINT_VENTAS, ENDPOINT_PEDIDOS, ENDPOINT_CLIENTES, ENDPOINT_DETALLE_PEDIDOS, ENDPOINT_PRODUCTOS } from '../../routes/routes';
import './adminstyles/AdminVentas.css';

const AdminVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [detallePedidos, setDetallePedidos] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ventasRes, pedidosRes, clientesRes, detallesRes, productosRes] = await Promise.all([
          axios.get(ENDPOINT_VENTAS),
          axios.get(ENDPOINT_PEDIDOS),
          axios.get(ENDPOINT_CLIENTES),
          axios.get(ENDPOINT_DETALLE_PEDIDOS),
          axios.get(ENDPOINT_PRODUCTOS),
        ]);

        setVentas(ventasRes.data);
        setPedidos(pedidosRes.data);
        setClientes(clientesRes.data);
        setDetallePedidos(detallesRes.data);
        setProductos(productosRes.data);

      } catch (err) {
        console.error('Error cargando datos:', err);
      }
    };

    fetchData();
  }, []);

  const getClienteNombre = (clienteId) => {
    const cliente = clientes.find(c => c.id === String(clienteId));
    return cliente ? cliente.nombre : 'Cliente desconocido';
  };

  const getDetalleVenta = (pedidoId) => {
    const detalles = detallePedidos.filter(d => String(d.pedidoId) === String(pedidoId));
    return detalles.map(d => {
      const producto = productos.find(p => p.id === String(d.productoId));
      return `${producto ? producto.nombre : 'Producto desconocido'} x${d.cantidad}`;
    }).join(', ');
  };

  const getFechaVenta = (fecha) => new Date(fecha).toLocaleString();

  return (
    <div className="ventas-container">
      <h2 className="ventas-titulo">Ventas</h2>

      <table className="ventas-tabla">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => {
            const pedido = pedidos.find(p => p.id === String(v.pedidoId));
            if (!pedido) return null;

            return (
              <tr key={v.id}>
                <td data-label="Cliente">{getClienteNombre(pedido.clienteId)}</td>
                <td data-label="Fecha">{getFechaVenta(v.fecha)}</td>
                <td data-label="Total">${v.total}</td>
                <td data-label="Detalle">{getDetalleVenta(pedido.id)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVentas;
