// api.js
import { ref } from 'vue'
import axios from 'axios'

export const conclusiones = ref([]) // Lo exportamos para usarlo en el componente
export const vendedores = ref([]) // 👈 NUEVO

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export const cargarConclusiones = async () => {
  try {
    // Usamos 'api' (la instancia) y la ruta correcta sin repetir /api
    const res = await api.get('/conclusiones') 
    conclusiones.value = res.data
  } catch (error) {
    console.error('Error cargando conclusiones', error)
  }
}

export const cargarVendedores = async () => {
  try {
    const res = await api.get('/vendedores')
    vendedores.value = res.data
  } catch (error) {
    console.error('Error cargando vendedores', error)
  }
}

// 🔥 Asignar vendedor a prospecto
export const asignarVendedor = async (prospectoId, vendedorId) => {
  return api.put(`/prospectos/${prospectoId}/asignar-vendedor`, {
    id_vendedor_atencion: vendedorId
  })
}
export default api