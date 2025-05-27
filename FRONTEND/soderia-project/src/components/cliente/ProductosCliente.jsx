import { useEffect, useState } from 'react'
import axios from 'axios'
import { ENDPOINT_PRODUCTOS } from '../../routes/routes'
import '../../styles/ProductoCliente.css' // El CSS que te pasé arriba

const ProductosClientes = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(ENDPOINT_PRODUCTOS)
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error cargando productos:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="mensaje-cargando">Cargando productos...</p>

  return (
    <div className="productos-container">
      <h2 className="productos-titulo">Productos disponibles</h2>

      <table className="productos-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td data-label="Nombre">{prod.nombre}</td>
              <td data-label="Descripción"><em>{prod.descripcion}</em></td>
              <td data-label="Precio">${prod.precio}</td>
              <td data-label="Stock">{prod.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductosClientes
