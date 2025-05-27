import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '../../stores/authStore'
import { ENDPOINT_PEDIDOS } from '../../routes/routes'

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

  if (loading) return <p>Cargando pedidos...</p>
  if (!pedidos.length) return <p>No tenés pedidos.</p>

  return (
    <div>
      <h2>Mis Pedidos</h2>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
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
              <td>{new Date(pedido.fecha).toLocaleString()}</td>
              <td>{pedido.estado}</td>
              <td>{pedido.detalle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PedidosClientes
