import { Link } from 'react-router-dom';
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="landing-title">Sodería Los Chavales 🧃</h1>
        <h2 className="landing-subtitle">
          Tu sistema de gestión de sodas, hecho con amor y café ☕
        </h2>
      </header>

      <div className="landing-box">
        <main className="landing-main">
          <p className="landing-description">
            Bienvenido al sistema de administración integral para tu sodería de confianza.
            Controlá pedidos, productos, usuarios y ventas con una interfaz rápida, simple y funcional.
            Ideal para negocios familiares o emprendedores que buscan crecer sin perder el control.
          </p>

          <ul className="landing-features">
            <li>✅ Gestión de clientes y pedidos</li>
            <li>✅ Control de stock en tiempo real</li>
            <li>✅ Historial de ventas y reportes</li>
            <li>✅ Interfaz para administradores y clientes</li>
            <li>✅ ¡Todo en una sola app, desde tu navegador!</li>
          </ul>

          <div className="landing-actions">
            <Link to="/login" className="landing-login-button">Iniciar sesión</Link>
          </div>
        </main>

        <footer className="landing-footer">
          <p>Creado por Tito 👨‍💻 | Versión 1.0 | React + Express + JSON Server ❤️</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
