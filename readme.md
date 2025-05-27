 **React**         | Construcción de componentes y vistas SPA           
 **React Router DOM** | Navegación entre rutas                          
 **Zustand**       | Manejo de estado global (sesión, carrito, rol)     
 **Bootstrap**     | Estilado moderno y responsive                      
 **JSON Server**   | Simulación de una API REST                        
 **Axios**         | Requests HTTP con un custom hook                   
 **Vite**          | Entorno de desarrollo rápido y eficiente           

> Además, se usaron los hooks `useState`, `useEffect`, `useParams`, `useNavigate` para manejar estado, efectos, rutas y navegación.

---

## 🚀 Instrucciones de Instalación y Uso

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tuusuario/los-chavales-soderia.git
cd los-chavales-soderia
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar el Servidor de la API (JSON Server)

Asegurate de tener JSON Server instalado:

```bash
npm install -g json-server
```

Luego ejecutá:

```bash
json-server --watch db.json --port 3001
```

### 4. Ejecutar la Aplicación

```bash
npm run dev
```

La app correrá en `http://localhost:5173`

---

## 🔐 Sistema de Autenticación y Roles

- **Clientes**:
  - Acceden a productos.
  - Realizan pedidos.
  - Pueden visualizar sus pedidos realizados.

- **Empleados/Admins**:
  - Gestionan productos: agregar, editar, eliminar.
  - Administran ventas y visualizan pedidos de clientes.
  - Gestionan clientes y usuarios del sistema.

Las rutas están protegidas y el acceso se controla mediante lógica de roles utilizando Zustand para almacenar el tipo de usuario activo.

---

## 🧩 Funcionalidades

- ✅ Landing page atractiva y responsive.
- ✅ Login y logout con manejo de sesiones.
- ✅ Rutas validadas con React Router DOM.
- ✅ Manejo de estado global con Zustand.
- ✅ Custom hook `useCrud` para manejar todas las operaciones con la API.
- ✅ Vistas separadas para cliente y empleado.
- ✅ Estilos modernos con Bootstrap.
- ✅ Código limpio, organizado y escalable.

---

## 📁 Estructura del Proyecto

```
src/
│
├── components/          # Componentes reutilizables
├── hooks/               # Custom hooks (como useCrud)
├── routes/              # Configuración de rutas protegidas
├── store/               # Estado global con Zustand
├── styles/              # Estilos personalizados
├── App.jsx              # Configuración general de la App
└── main.jsx             # Entrada principal de la aplicación
```

---


## 🙌 Créditos

Este proyecto fue realizado por el equipo de desarrollo de **LOS CHAVALES**, aplicando buenas prácticas de desarrollo frontend, control de acceso por roles y diseño UI/UX moderno.

---

## 📬 Contacto

Si querés saber más sobre el proyecto o colaborar, podés contactarnos a través de [roblessthiago21@gmail.com].

---

¡Gracias por visitar nuestro proyecto! Esperamos que disfrutes de **LOS CHAVALES**, la mejor sodería digital del barrio 🍻🚚
