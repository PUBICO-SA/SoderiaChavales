import { useEffect, useState } from 'react'
import axios from 'axios'
import { ENDPOINT_PRODUCTOS } from '../../routes/routes'

const ProductosClientes = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(ENDPOINT_PRODUCTOS)
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error cargando productos:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Cargando productos...</p>

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Productos disponibles</h2>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
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
              <td>{prod.nombre}</td>
              <td><em>{prod.descripcion}</em></td>
              <td>${prod.precio}</td>
              <td>{prod.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductosClientes
