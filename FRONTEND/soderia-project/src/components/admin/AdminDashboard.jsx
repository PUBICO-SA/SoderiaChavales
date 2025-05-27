import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import './adminstyles/AdminDashboard.css';

const AdminDashboard = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout); // asumimos que tienes esta función
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();  // limpia sesión o token
    navigate('/login'); // redirige al login
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-titulo">Bienvenido, {user?.username}</h1>
      <nav className="dashboard-nav">
        <button className="dashboard-btn" onClick={() => navigate('/admin/AdminUsuarios')}>Usuarios</button>
        <button className="dashboard-btn" onClick={() => navigate('/admin/AdminProductos')}>Productos</button>
        <button className="dashboard-btn" onClick={() => navigate('/admin/AdminClientes')}>Clientes</button>
        <button className="dashboard-btn" onClick={() => navigate('/admin/AdminVentas')}>Ventas</button>
        <button className="dashboard-btn logout-btn" onClick={handleLogout}>Cerrar sesión</button>
      </nav>
    </div>
  );
};

export default AdminDashboard;
