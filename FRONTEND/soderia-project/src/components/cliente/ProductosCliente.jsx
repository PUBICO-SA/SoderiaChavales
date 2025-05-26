import { useEffect, useState } from 'react'
import axios from 'axios'
import {ENDPOINT_PRODUCTOS} from '../../routes/routes' 

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
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {productos.map(prod => (
          <li key={prod.id}>
            <h3>{prod.nombre}</h3>
            <p><strong>Precio:</strong> ${prod.precio}</p>
            <p><em>{prod.descripcion}</em></p>
            <p><strong>Stock:</strong> {prod.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductosClientes
