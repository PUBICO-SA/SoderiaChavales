// src/hooks/useCrud.js
import { useEffect, useState } from 'react'
import axios from 'axios'

const useCrud = (endpoint, initialItem = {}) => {
  const [data, setData] = useState([])
  const [item, setItem] = useState(initialItem)
  const [editMode, setEditMode] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const fetchData = async () => {
    try {
      const res = await axios.get(endpoint)
      setData(res.data)
    } catch (err) {
      console.error(`Error al obtener datos desde ${endpoint}`, err)
    }
  }

  const addItem = async () => {
    try {
      await axios.post(endpoint, item)
      setItem(initialItem)
      fetchData()
    } catch (err) {
      console.error('Error al agregar item:', err)
    }
  }

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${endpoint}/${id}`)
      fetchData()
    } catch (err) {
      console.error('Error al eliminar item:', err)
    }
  }

  const startEdit = (itemToEdit) => {
    setItem(itemToEdit)
    setEditingId(itemToEdit.id)
    setEditMode(true)
  }

  const updateItem = async () => {
    try {
      await axios.put(`${endpoint}/${editingId}`, item)
      cancelEdit()
      fetchData()
    } catch (err) {
      console.error('Error al actualizar item:', err)
    }
  }

  const cancelEdit = () => {
    setItem(initialItem)
    setEditingId(null)
    setEditMode(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    item,
    setItem,
    addItem,
    deleteItem,
    startEdit,
    updateItem,
    cancelEdit,
    editMode
  }
}

export default useCrud
