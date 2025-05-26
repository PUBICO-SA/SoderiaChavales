import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      <h1>Sodería Los Chavales 🧃</h1>
      <h2>Tu sistema de gestión de sodas, hecho con amor y café ☕</h2>

      <p>
        Bienvenido al sistema de administración integral para tu sodería de confianza. 
        Controlá pedidos, productos, usuarios y ventas con una interfaz rápida, simple y funcional. 
        Ideal para negocios familiares o emprendedores que buscan crecer sin perder el control.
      </p>

      <ul>
        <li>✅ Gestión de clientes y pedidos</li>
        <li>✅ Control de stock en tiempo real</li>
        <li>✅ Historial de ventas y reportes</li>
        <li>✅ Interfaz para administradores y clientes</li>
        <li>✅ ¡Todo en una sola app, desde tu navegador!</li>
      </ul>

      <div>
        <Link to="/login">Iniciar sesión</Link>
        
      </div>

      <footer>
        <p>Creado por Tito 👨‍💻 | Versión 1.0 | React + Express + JSON Server ❤️</p>
      </footer>
    </div>
  )
}
export default LandingPage;