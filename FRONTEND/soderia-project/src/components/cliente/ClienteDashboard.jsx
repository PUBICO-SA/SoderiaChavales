import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import '../../styles/ClienteDashboard.css'

const ClienteDashboard = () => {
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout) // <- 🚨 Asegurate que exista
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-titulo">Bienvenido, {user?.username}</h1>
      <nav className="dashboard-nav">
        <button
          className="dashboard-btn"
          onClick={() => navigate('/cliente/PedidosClientes')}
        >
          Mis Pedidos
        </button>
        <button
          className="dashboard-btn"
          onClick={() => navigate('/cliente/ProductosClientes')}
        >
          Ver Productos
        </button>
        <button
          className="dashboard-btn logout-btn"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </nav>
    </div>
  )
}

export default ClienteDashboard
