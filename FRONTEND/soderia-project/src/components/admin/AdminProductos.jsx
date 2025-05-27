import useCrud from '../../hooks/useCrud';
import { ENDPOINT_PRODUCTOS } from '../../routes/routes';
import './adminstyles/AdminProductos.css';

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
  } = useCrud(ENDPOINT_PRODUCTOS, { nombre: '', descripcion: '', precio: '', stock: '' });

  return (
    <div className="productos-container">
      <h2 className="productos-titulo">Productos</h2>

      <div className="productos-formulario">
        <input
          className="productos-input"
          placeholder="Nombre"
          value={productoActual.nombre}
          onChange={e => setProductoActual({ ...productoActual, nombre: e.target.value })}
        />
        <input
          className="productos-input"
          placeholder="Descripción"
          value={productoActual.descripcion}
          onChange={e => setProductoActual({ ...productoActual, descripcion: e.target.value })}
        />
        <input
          className="productos-input"
          placeholder="Precio"
          type="number"
          value={productoActual.precio}
          onChange={e => setProductoActual({ ...productoActual, precio: e.target.value })}
        />
        <input
          className="productos-input"
          placeholder="Stock"
          type="number"
          value={productoActual.stock}
          onChange={e => setProductoActual({ ...productoActual, stock: e.target.value })}
        />

        <div className="productos-botones">
          {modoEditar ? (
            <>
              <button className="btn guardar" onClick={modificarProducto}>Guardar cambios</button>
              <button className="btn cancelar" onClick={resetFormulario}>Cancelar</button>
            </>
          ) : (
            <button className="btn agregar" onClick={agregarProducto}>Agregar</button>
          )}
        </div>
      </div>

      <table className="productos-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr
              key={p.id}
              className="productos-fila"
            >
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn editar" onClick={() => iniciarEdicion(p)}>Editar</button>
                <button className="btn eliminar" onClick={() => eliminarProducto(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductos;
