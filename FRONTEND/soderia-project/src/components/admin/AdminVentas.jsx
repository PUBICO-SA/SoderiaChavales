import { useEffect, useState } from 'react'
import axios from 'axios'
import { ENDPOINT_VENTAS } from '../../routes/routes'

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

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              <td>{v.cliente}</td>
              <td>{new Date(v.fecha).toLocaleString()}</td>
              <td>${v.total}</td>
              <td>{v.detalle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminVentas
