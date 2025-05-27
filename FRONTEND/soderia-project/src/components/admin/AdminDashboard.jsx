import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import './adminstyles/AdminDashboard.css';

const AdminDashboard = () => {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-titulo">Bienvenido, {user?.username}</h1>
      <nav className="dashboard-nav">
        <button className="dashboard-btn" onClick={() => navigate('/admin/AdminUsuarios')}>Usuarios</button>
        <button className="dashboard-btn" onClick={() => navigate('/admin/AdminProductos')}>Productos</button>
        <button className="dashboard-btn" onClick={() => navigate('/admin/AdminClientes')}>Clientes</button>
        <button className="dashboard-btn" onClick={() => navigate('/admin/AdminVentas')}>Ventas</button>
      </nav>
    </div>
  );
};

export default AdminDashboard;
