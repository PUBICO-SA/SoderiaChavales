import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../../stores/authStore"; // ajusta ruta si hace falta
import '../../styles/PedidosCliente.css'; // ajusta ruta si hace falta

const ENDPOINT_PEDIDOS = "http://localhost:3000/pedidos"; // ajusta endpoint si hace falta
const ENDPOINT_DETALLES = "http://localhost:3000/detallePedidos"; // endpoint detallePedidos
const ENDPOINT_PRODUCTOS = "http://localhost:3000/productos"; // endpoint productos

const PedidosClientes = () => {
  const user = useAuthStore((state) => state.user);
  const [detallePedidos, setDetallePedidos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Traemos pedidos filtrados por clienteId
        const pedidosRes = await axios.get(ENDPOINT_PEDIDOS, {
          params: {
            clienteId: user.id,
          },
        });
        const pedidosData = pedidosRes.data;
        setPedidos(pedidosData);

        // Traemos todos los detalles (ideal sería filtrar en backend, pero ok)
        const detallesRes = await axios.get(ENDPOINT_DETALLES);
        const detallesData = detallesRes.data;

        // Traemos productos para mostrar nombres
        const productosRes = await axios.get(ENDPOINT_PRODUCTOS);
        const productosData = productosRes.data;
        setProductos(productosData);

        // Filtramos detalles que pertenezcan a los pedidos del usuario
        const detallesFiltrados = detallesData.filter((d) =>
          pedidosData.some((p) => String(p.id) === String(d.pedidoId))
        );
        setDetallePedidos(detallesFiltrados);

      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <p>Cargando pedidos...</p>;

  if (!pedidos.length) return <p>No tienes pedidos aún.</p>;

  return (
    <div className="pedidos-container">
      <h2 className="pedidos-titulo">Mis Pedidos</h2>

      <table className="pedidos-tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => {
            const detalles = detallePedidos.filter(
              (d) => String(d.pedidoId) === String(pedido.id)
            );
            return (
              <tr key={pedido.id}>
                <td data-label="Fecha">
                  {new Date(pedido.fecha).toLocaleString()}
                </td>
                <td data-label="Estado">{pedido.estado}</td>
                <td data-label="Detalle">
                  <ul>
                    {detalles.map((d) => {
                      const producto = productos.find(
                        (p) => String(p.id) === String(d.productoId)
                      );
                      return (
                        <li key={d.id}>
                          {producto ? producto.nombre : `Producto #${d.productoId}`} - Cant: {d.cantidad} - Subtotal: ${d.subtotal}
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosClientes;
