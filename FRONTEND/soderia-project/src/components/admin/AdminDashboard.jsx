import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

const AdminDashboard = () => {
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
        <button onClick={() => navigate('/admin/AdminUsuarios')}>Usuarios</button>
        <button onClick={() => navigate('/admin/AdminProductos')}>Productos</button>
        <button onClick={() => navigate('/admin/AdminClientes')}>Clientes</button>
        <button onClick={() => navigate('/admin/AdminVentas')}>Ventas</button>
        
      </nav>
    </div>
  )
}

export default AdminDashboard
