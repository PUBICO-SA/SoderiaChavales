import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '../../stores/authStore'
import { ENDPOINT_PEDIDOS } from '../../routes/routes' // Adjust the import path as necessary

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
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id}>
            <strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()} <br />
            <strong>Estado:</strong> {pedido.estado} <br />
            <strong>Detalle:</strong> {pedido.detalle}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PedidosClientes
