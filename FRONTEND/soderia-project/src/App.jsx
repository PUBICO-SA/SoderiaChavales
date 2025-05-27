import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import ClienteDashboard from './components/cliente/ClienteDashboard'
import AdminDashboard from './components/admin/AdminDashboard'
import PedidosCliente from './components/cliente/PedidosCliente'
import ProductosClientes from './components/cliente/ProductosCliente'
import AdminClientes from './components/admin/AdminClientes'
import AdminProductos from './components/admin/AdminProductos'
import AdminUsuarios from './components/admin/AdminUsuarios'
import AdminVentas from './components/admin/AdminVentas'
import '../src/App.css';// Asegúrate de tener un archivo CSS para estilos globales


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cliente/ClienteDashboard" element={<ClienteDashboard />} />
        <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/cliente/PedidosClientes" element={<PedidosCliente />} />
        <Route path="/cliente/ProductosClientes" element={<ProductosClientes />} />
        <Route path="/admin/AdminClientes" element={<AdminClientes />} />
        <Route path="/admin/AdminProductos" element={<AdminProductos />} />
        <Route path="/admin/AdminUsuarios" element={<AdminUsuarios />} />
        <Route path="/admin/AdminVentas" element={<AdminVentas />} />
        {/* Más rutas luego */}
      </Routes>
    </Router>
  )
}

export default App
