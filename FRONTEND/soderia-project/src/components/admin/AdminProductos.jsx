import useCrud from '../../hooks/useCrud'
import { ENDPOINT_PRODUCTOS } from '../../routes/routes'

const AdminProductos = () => {
  const {
    data: productos,
    item: productoActual,
    setItem: setProductoActual,
    addItem: agregarProducto,
    deleteItem: eliminarProducto,
    startEdit: iniciarEdicion,
    updateItem: modificarProducto,
    cancelEdit: resetFormulario,
    editMode: modoEditar
  } = useCrud(ENDPOINT_PRODUCTOS, { nombre: '', precio: '', stock: '' })

  return (
    <div>
      <h2>Productos</h2>

      <input
        placeholder="Nombre"
        value={productoActual.nombre}
        onChange={e => setProductoActual({ ...productoActual, nombre: e.target.value })}
      />
      <input
        placeholder="Precio"
        type="number"
        value={productoActual.precio}
        onChange={e => setProductoActual({ ...productoActual, precio: e.target.value })}
      />
      <input
        placeholder="Stock"
        type="number"
        value={productoActual.stock}
        onChange={e => setProductoActual({ ...productoActual, stock: e.target.value })}
      />

      {modoEditar ? (
        <>
          <button onClick={modificarProducto}>Guardar cambios</button>
          <button onClick={resetFormulario}>Cancelar</button>
        </>
      ) : (
        <button onClick={agregarProducto}>Agregar</button>
      )}

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => iniciarEdicion(p)}>Editar</button>
                <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminProductos
