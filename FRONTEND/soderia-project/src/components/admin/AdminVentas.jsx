import { useEffect, useState } from 'react'
import axios from 'axios'
import {ENDPOINT_VENTAS} from '../../routes/routes' // Adjust the import path as necessary

const AdminVentas = () => {
  const [ventas, setVentas] = useState([])

  useEffect(() => {
    axios.get(ENDPOINT_VENTAS)
      .then(res => setVentas(res.data))
      .catch(err => console.error('Error al obtener ventas:', err))
  }, [])

  return (
    <div>
      <h2>Ventas</h2>
      <ul>
        {ventas.map(v => (
          <li key={v.id}>
            Cliente: {v.cliente} | Fecha: {new Date(v.fecha).toLocaleString()} | Total: ${v.total} | Detalle: {v.detalle}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminVentas
