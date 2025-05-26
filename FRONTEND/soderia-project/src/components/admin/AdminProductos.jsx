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
      <input placeholder="Nombre" value={productoActual.nombre} onChange={e => setProductoActual({ ...productoActual, nombre: e.target.value })} />
      <input placeholder="Precio" type="number" value={productoActual.precio} onChange={e => setProductoActual({ ...productoActual, precio: e.target.value })} />
      <input placeholder="Stock" type="number" value={productoActual.stock} onChange={e => setProductoActual({ ...productoActual, stock: e.target.value })} />

      {modoEditar ? (
        <>
          <button onClick={modificarProducto}>Guardar cambios</button>
          <button onClick={resetFormulario}>Cancelar</button>
        </>
      ) : (
        <button onClick={agregarProducto}>Agregar</button>
      )}

      <ul>
        {productos.map(p => (
          <li key={p.id}>
            {p.nombre} - ${p.precio} - Stock: {p.stock}
            <button onClick={() => iniciarEdicion(p)}>Editar</button>
            <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminProductos
