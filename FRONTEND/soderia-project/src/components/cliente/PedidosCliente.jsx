import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '../../stores/authStore'
import { ENDPOINT_PEDIDOS } from '../../routes/routes'
import '../../styles/PedidosCliente.css' // Tu archivo CSS con los estilos que te di

const PedidosClientes = () => {
  const user = useAuthStore(state => state.user)
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    axios.get(ENDPOINT_PEDIDOS, {
      params: {
        clientes: user.nombre
      }
    })
      .then(res => setPedidos(res.data))
      .catch(err => console.error("Error cargando pedidos:", err))
      .finally(() => setLoading(false))
  }, [user])

  if (loading) return <p className="mensaje-cargando">Cargando pedidos...</p>
  if (!pedidos.length) return <p className="mensaje-cargando">No tenés pedidos.</p>

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
          {pedidos.map(pedido => (
            <tr key={pedido.id}>
              <td data-label="Fecha">{new Date(pedido.fecha).toLocaleString()}</td>
              <td data-label="Estado">{pedido.estado}</td>
              <td data-label="Detalle">{pedido.detalle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PedidosClientes
