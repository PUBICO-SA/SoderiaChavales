import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

const ClienteDashboard = () => {
  const user = useAuthStore(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div>
      <h1>Bienvenido, {user?.username}</h1>
      <nav>
        <button onClick={() => navigate('/cliente/PedidosClientes')}>Mis Pedidos</button>
        <button onClick={() => navigate('/cliente/ProductosClientes')}>Ver Productos</button>
        
      </nav>
    </div>
  )
}

export default ClienteDashboard
