<template>
  <div class="page">

    <!-- ===================== HEADER ===================== -->
      <div class="header">
      <div class="header-content">
        <div class="header-icon">
          <i class="ti ti-clipboard-text"></i>
        </div>
        <div>
          <h1>Gestión de Prospectos</h1>
          <p class="header-subtitle">Administra y organiza tus prospectos de forma eficiente</p>
        </div>
      </div>
      <button class="btn primary btn-icon" @click="openCreate">
        <i class="ti ti-plus"></i>
        <span>Nuevo Prospecto</span>
      </button>
    </div>
    <!-- ===================== STATS ===================== -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #dbeafe; color: #2563eb;">📊</div>
        <div class="stat-content">
          <div class="stat-value">{{ prospectos.length }}</div>
          <div class="stat-label">Prospectos activos</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #dcfce7; color: #059669;">👤</div>
        <div class="stat-content">
          <div class="stat-value">{{ prospectos.filter(p => p.tipo_usuario === 'usuario').length }}</div>
          <div class="stat-label">Usuarios</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #fef3c7; color: #d97706;">🏢</div>
        <div class="stat-content">
          <div class="stat-value">{{ prospectos.filter(p => p.tipo_usuario === 'empresa').length }}</div>
          <div class="stat-label">Empresas</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #e0e7ff; color: #6366f1;">📄</div>
        <div class="stat-content">
          <div class="stat-value">Pág {{ pagination.current_page }}</div>
          <div class="stat-label">de {{ pagination.last_page }}</div>
        </div>
      </div>
    </div>

    <!-- ===================== BUSCADOR ===================== -->
    <div class="card search-card">
      <div class="search-header">
        <h3>🔍 Filtros de búsqueda</h3>
        <button v-if="searchId || searchMes || searchAnio" class="btn-clear-all" @click="clearSearch">
          ✕ Limpiar todo
        </button>
      </div>
      <div class="search-box">
        <div class="form-group">
          <label>🆔 Buscar por ID</label>
          <input
            v-model="searchId"
            type="number"
            placeholder="Ej: 120"
            @keyup.enter="searchById"
            class="input-with-icon"
          />
        </div>

        <div class="form-group">
          <label>📅 Mes</label>
          <select v-model="searchMes" class="select-enhanced">
            <option value="">Todos los meses</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>

        <div class="form-group">
          <label>📆 Año</label>
          <input
            v-model="searchAnio"
            type="number"
            placeholder="Ej: 2024"
            min="2020"
            max="2030"
            class="input-with-icon"
          />
        </div>

        <div class="search-actions">
          <button class="btn primary btn-search" @click="searchById">
            <span class="icon">🔍</span>
            Buscar
          </button>
        </div>
      </div>
    </div>

    <!-- ===================== TABLA ===================== -->
    <div class="card table-card">

      <!-- Loader -->
      <div v-if="loading" class="loader-container">
        <div class="loader"></div>
        <p>Cargando prospectos...</p>
      </div>

      <!-- Tabla -->
      <div v-else class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>nombres</th>
              <th>Producto</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Procedencia</th>
              <th>Concluciones-estado</th>
<!-- {              <th>Vendedor Asignado</th> -->
           <th>Asignacion de vendedor</th>
              <th>Acciones</th>

            </tr>
          </thead>

          <tbody>
            <tr v-for="p in prospectos" :key="p.id" class="table-row">
              <td>
                <span class="id-badge">#{{ p.id }}</span>
                          </td>
                          <td>
              {{ p.user_prospecto?.nombres || '—' }}
            </td>
              
            <td>
           <span class="product-tag">{{ p.producto?.productos || '—' }}</span>
           </td>
              <td>
                <div class="email-cell">
                  <span class="email-icon">✉️</span>
                  <span>{{ p.email }}</span>
                </div>
              </td>




              <td>
                <span class="badge" :class="p.tipo_usuario">
                  <span class="badge-dot"></span>
                  {{ p.tipo_usuario }}
                </span>
              </td>



              
              <td>
            <span class="badge">
              <span class="badge-dot"></span>
          {{ p.canal_digital?.canal || '—' }}
            </span>
          </td>

    <td>
  <template v-if="p.conclusion">
    <select 
      @change="cambiarEstado(p.id, $event.target.value)"
      :style="{ 
        backgroundColor: p.conclusion.background, 
        color: p.conclusion.colors,
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        fontWeight: 'bold',
        cursor: 'pointer',
        width: '140px'
      }"
    >
      <option 
        v-for="item in conclusiones" 
        :key="item.id" 
        :value="item.id"
        :selected="item.id === p.conclusion.id"
      >
        {{ item.conclusiones }}
      </option>
    </select>
  </template>
  <span v-else>—</span>
</td>

  <!-- <td>
  <span v-if="p.vendedor" class="badge-vendedor">
    <span class="badge-dot"></span>
    {{ p.vendedor.nombres }}
  </span>
  <span v-else class="badge-none">Sin asignar</span>
</td> -->


<td>
  <select
    v-model="p.id_vendedor_atencion"
    @change="cambiarVendedor(p.id, p.id_vendedor_atencion)"
    class="select-enhanced"
  >
    <option value="">Sin asignar</option>
    <option
      v-for="v in vendedores"
      :key="v.id"
      :value="v.id"
    >
      {{ v.nombres }}
    </option>
  </select>
</td>

              <td>
                <div class="actions-cell">
                  <button class="btn-action warning" @click="editProspecto(p)" title="Editar prospecto">
                    <span>✏️</span>
                  </button>
                  <button class="btn-action danger" @click="deleteProspecto(p.id)" title="Eliminar">
                    <span>🗑️</span>
                  </button>
                  <button class="btn-action primary" @click="editUserProspecto(p.id)" title="Editar detalles">
                    <span>👤</span>
                  </button>
                  <button class="btn-action warning" @click="editSeguimientoProspecto(p.id)" title="Seguimiento">📊</button>

                </div>
              </td>
            </tr>

            <tr v-if="!loading && prospectos.length === 0">
              <td colspan="5" class="empty">
                <div class="empty-state">
                  <div class="empty-icon">📭</div>
                  <h3>No hay resultados</h3>
                  <p>Intenta ajustar los filtros de búsqueda</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGINACIÓN -->
      <div class="pagination" v-if="!loading && prospectos.length > 0">
        <button
          class="btn-pagination"
          :disabled="pagination.current_page === 1"
          @click="getProspectos(pagination.current_page - 1)"
        >
          ◀ Anterior
        </button>

        <div class="pagination-info">
          <span class="page-number">{{ pagination.current_page }}</span>
          <span class="separator">/</span>
          <span class="total-pages">{{ pagination.last_page }}</span>
        </div>

        <button
          class="btn-pagination"
          :disabled="pagination.current_page === pagination.last_page"
          @click="getProspectos(pagination.current_page + 1)"
        >
          Siguiente ▶
        </button>
      </div>
    </div>

    <!-- ===================== MODAL PROSPECTO ===================== -->
    <transition name="modal">
      <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
        <div class="modal modal-compact">
          <div class="modal-header">
            <h2>{{ isEditing ? '✏️ Editar Prospecto' : '➕ Nuevo Prospecto' }}</h2>
            <button class="btn-close" @click="closeModal">✕</button>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <label>✉️ Email</label>
              <input v-model="userForm.email" type="email" placeholder="ejemplo@email.com" />
            </div>

            <div class="form-group">
              <label>👤 Tipo de usuario</label>
              <select v-model="form.tipo_usuario">
                <option value="">Seleccione un tipo</option>
                <option value="usuario">Usuario</option>
                <option value="empresa">Empresa</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn secondary" @click="closeModal">Cancelar</button>
            <button class="btn primary" @click="submitForm">
              {{ isEditing ? '💾 Actualizar' : '💾 Guardar' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ===================== MODAL USER PROSPECTO ===================== -->
    <transition name="modal">
      <div v-if="showUserModal" class="modal-backdrop" @click.self="showUserModal = false">
        <div class="modal modal-large">
          <div class="modal-header primary">
            <h2>👤 Editar Detalles del Prospecto</h2>
            <button class="btn-close" @click="showUserModal = false">✕</button>
          </div>

          <div class="modal-body modal-grid">
            <!-- Identificación -->
            <div class="section-header">
              <h3>🆔 Identificación</h3>
            </div>

            <div class="form-group">
              <label>Código</label>
              <input v-model="userForm.prospecto_id" type="text" readonly class="input-readonly"/>
            </div>

            <!-- <div class="form-group">
              <label>Tipo de documento <span class="required">*</span></label>
              <input v-model="userForm.tipo_documento_id" type="text" />
            </div> -->


              <div class="form-group">
              <label>Tipo de documento</label>
              <input
                :value="userProspecto?.prospecto?.tipo_documento?.tipo_documento"
                type="text"
                readonly
                class="input-readonly"
              />
            </div>


            <div class="form-group">
              <label>Número de documento</label>
              <input v-model="userForm.numero_documento" type="text" placeholder="Ej: 12345678" />
            </div>

            <!-- Información Personal -->
            <div class="section-header">
              <h3>📝 Información Personal</h3>
            </div>

            <div class="form-group">
              <label>Nombres y apellidos <span class="required">*</span></label>
              <input v-model="userForm.nombres" type="text" placeholder="Nombre completo" />
            </div>

            <div class="form-group">
              <label>Sexo</label>
              <input
                type="text"
                :value="userForm.sexo?.sexo"
                readonly
                class="input-readonly"
              />
            </div>

            <div class="form-group">
              <label>Estado civil</label>
              <input
                :value="userProspecto?.estadocivil?.estado_civil || ''"
                type="text"
                readonly
                class="input-readonly"
              />
            </div>

            <div class="form-group">
              <label>Ocupación</label>
              <input v-model="userForm.ocupacion" type="text" placeholder="Profesión u oficio" />
            </div>

            <!-- Contacto -->
            <div class="section-header">
              <h3>📞 Contacto</h3>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input v-model="userForm.email" type="email" placeholder="correo@ejemplo.com" />
            </div>

            <div class="form-group">
              <label>Celular</label>
              <input v-model="userForm.celular" type="tel" placeholder="999 999 999" />
            </div>

            <!-- Ubicación -->
            <div class="section-header">
              <h3>📍 Ubicación</h3>
            </div>

            <div class="form-group">
              <label>Dirección</label>
              <input v-model="userForm.direccion_prospecto" type="text" placeholder="Dirección completa" />
            </div>

            <div class="form-group">
              <label>Ubigeo</label>
              <input v-model="userForm.ubigeo" type="text" />
            </div>

            <div class="form-group">
              <label>Departamento <span class="required">*</span></label>
              <input v-model="userForm.id_departamento" type="text" />
            </div>

            <div class="form-group">
              <label>Provincia <span class="required">*</span></label>
              <input v-model="userForm.id_provincia" type="text" />
            </div>

            <div class="form-group">
              <label>Distrito <span class="required">*</span></label>
              <input v-model="userForm.id_distrito" type="text" />
            </div>

            <!-- Productos y Certificados -->
            <div class="section-header">
              <h3>📦 Productos y Certificados</h3>
            </div>

            <div class="form-group">
              <label>Certificado</label>
              <input
                :value="userProspecto?.prospecto?.certificado?.certificados"
                type="text"
                readonly
                class="input-readonly"
              />
            </div>

            <div class="form-group">
              <label>Productos</label>
              <input
                :value="userProspecto?.prospecto?.producto?.productos || ''"
                type="text"
                readonly
                class="input-readonly"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn secondary" @click="showUserModal = false">Cancelar</button>
            <button class="btn primary" @click="submitUserForm">💾 Actualizar Información</button>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- ===================== TOAST ===================== -->
    <transition name="toast">
      <div v-if="toast.show" class="toast" :class="toast.type">
        <span class="toast-icon">{{ toast.type === 'success' ? '✓' : '⚠' }}</span>
        <span>{{ toast.message }}</span>
      </div>
    </transition>

    <!-- ===================== MODAL DE SEGUIMIENTO ===================== -->


<transition name="modal">
  <div v-if="showSeguimientoModal" class="modal-backdrop" @click.self="showSeguimientoModal = false">
    <div class="modal modal-large">

      <div class="modal-header warning">
        <h2>📊 Seguimiento del Prospecto</h2>
        <button class="btn-close" @click="showSeguimientoModal = false" aria-label="Cerrar">✕</button>
      </div>

      <div class="modal-body">
        
<div class="section-card">
          <h3 class="section-title">🔵Prospecto Nuevo </h3>
          
          <div class="form-row">
            <div class="form-group">
              <label>Fecha próxima cita <span class="required">*</span></label>
              <input 
                type="date" 
                v-model="seguimientoForm.fecha_proxima_cita"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <!-- <label>Atención 1 visita</label> -->
              <textarea 
                v-model="seguimientoForm.visita1" 
                class="form-control"
                placeholder="Escribe las notas de la primera visita..."
                rows="3"
              ></textarea>
            </div>
          </div>

        </div>

        <!-- Sección: Primera Visita -->
        <div class="section-card">
          <h3 class="section-title">🔵 Atencion 1 </h3>
          
          <div class="form-row">
            <div class="form-group">
              <label>Fecha próxima cita <span class="required">*</span></label>
              <input 
                type="date" 
                v-model="seguimientoForm.fecha_proxima_cita"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Atención 1 visita</label>
              <textarea 
                v-model="seguimientoForm.visita2" 
                class="form-control"
                placeholder="Escribe las notas de la primera visita..."
                rows="3"
              ></textarea>
            </div>
          </div>

          <div class="form-group">
            <label>Correo electrónico <span class="required">*</span></label>
            <input
              type="email"
              class="form-control"
              v-model="seguimientoForm.email"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div class="form-group">
            <label>Adjuntar imagen de envío de la proforma virtual (*)</label>
            
            <div v-if="seguimientoForm.nombre_archivo1" class="file-preview">
              <span class="file-icon">📎</span>
              <a :href="seguimientoForm.nombre_archivo1" target="_blank" class="file-link">
                Ver imagen actual
              </a>
            </div>

            <div class="file-upload-wrapper">
              <input
            ref="inputAceptacion"
            type="file"
            accept="image/*"
            @change="onFileChangeAceptacion"
            class="file-input"
            id="file-upload-aceptacion"
          />

              <label for="file-upload" class="file-label">
                <span class="file-icon">📁</span>
                Seleccionar imagen
              </label>
              <small class="help-text">Formatos: JPG, PNG, GIF (Max. 5MB)</small>
            </div>
          </div>

          <div class="form-group">
            <label>Adjuntar imagen de aceptación de la proforma virtual (*)</label>
            
            <div v-if="seguimientoForm.nombre_archivo2" class="file-preview">
              <span class="file-icon">📎</span>
              <a :href="seguimientoForm.nombre_archivo2" target="_blank" class="file-link">
                Ver imagen de aceptación actual
              </a>
            </div>

            <div class="file-upload-wrapper">
             <input
              ref="inputProforma"
              type="file"
              accept="image/*"
              @change="onFileChange"
              class="file-input"
              id="file-upload"
            />

              <label for="file-upload-aceptacion" class="file-label">
                <span class="file-icon">📁</span>
                Seleccionar imagen de aceptación
              </label>
              <small class="help-text">Formatos: JPG, PNG, GIF (Max. 5MB)</small>
            </div>
          </div>
        </div>

        <!-- Sección: Segunda Visita -->
        <div class="section-card">
          <h3 class="section-title">🟢 Atención 2</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label>Fecha próxima cita (Visita 2)</label>
              <input
                type="date"
                class="form-control"
                v-model="seguimientoForm.fechaproximacita_visita2"
              />
            </div>

            <div class="form-group">
              <label>Atención 2 </label>
              <textarea 
                v-model="seguimientoForm.visita3" 
                class="form-control"
                placeholder="Escribe las notas de la segunda visita..."
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Sección: Tercera Visita -->
        <div class="section-card">
          <h3 class="section-title">🟡 Atenacion 3</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label>Fecha próxima cita (Visita 3)</label>
              <input
                type="date"
                class="form-control"
                v-model="seguimientoForm.fechaproximacita_visita3"
              />
            </div>

            <div class="form-group">
              <label>Atención 3 visita</label>
              <textarea 
                v-model="seguimientoForm.visita4" 
                class="form-control"
                placeholder="Escribe las notas de la tercera visita..."
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

      </div>

      <div class="modal-footer">
        <button class="btn secondary" @click="showSeguimientoModal = false">
          ❌ Cancelar
        </button>
        <button class="btn primary" @click="guardarSeguimiento">
          💾 Guardar Seguimiento
        </button>
      </div>

    </div>
  </div>
</transition>>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const showSeguimientoModal = ref(false)

const API_BASE = 'http://localhost:8000/api/prospectos'
const API_USER = 'http://localhost:8000/api/user-prospecto'

const prospectos = ref([])
const loading = ref(false)
const fileProforma = ref(null)
const fileAceptacion = ref(null)

const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10
})

const searchId = ref('')
const searchMes = ref('')
const searchAnio = ref('')

const showModal = ref(false)
const isEditing = ref(false)
const editId = ref(null)
const form = ref({ email: '', tipo_usuario: '' })

const showUserModal = ref(false)
const userForm = ref({ nombres: '', numero_documento: '', celular: '', direccion_prospecto: '' })
const userEditId = ref(null)
const userProspecto = ref(null)

const toast = ref({ show: false, message: '', type: 'success' })

const getProspectos = async (page = 1) => {
  loading.value = true
  try {
    const params = {
      page,
      per_page: pagination.value.per_page
    }

    if (searchId.value) params.id = searchId.value
    if (searchMes.value) params.mes = searchMes.value
    if (searchAnio.value) params.anio = searchAnio.value

    const res = await axios.get(API_BASE, { params })

    prospectos.value = res.data.data
    pagination.value.current_page = res.data.current_page
    pagination.value.last_page = res.data.last_page
  } catch {
    showToast('Error al cargar datos', 'error')
  } finally {
    loading.value = false
  }
}

const searchById = () => getProspectos(1)

const clearSearch = () => { 
  searchId.value = ''
  searchMes.value = ''
  searchAnio.value = ''
  getProspectos(1) 
}

const openCreate = () => { 
  isEditing.value = false
  form.value = { email: '', tipo_usuario: '' }
  userForm.value = { email: '', tipo_usuario: '' }
  showModal.value = true 
}

const editProspecto = (p) => { 
  isEditing.value = true
  editId.value = p.id
  form.value = { email: p.email, tipo_usuario: p.tipo_usuario }
  userForm.value = { email: p.email, tipo_usuario: p.tipo_usuario }
  showModal.value = true 
}

const closeModal = () => { showModal.value = false }

const submitForm = async () => {
  try {
    if (isEditing.value) {
      await axios.put(`${API_BASE}/${editId.value}`, form.value)
      showToast('Prospecto actualizado correctamente')
    } else {
      await axios.post(API_BASE, form.value)
      showToast('Prospecto creado correctamente')
    }
    closeModal()
    getProspectos(pagination.value.current_page)
  } catch {
    showToast('Error al guardar el prospecto', 'error')
  }
}

const deleteProspecto = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este prospecto?')) return
  try {
    await axios.delete(`${API_BASE}/${id}`)
    showToast('Prospecto eliminado correctamente')
    getProspectos(pagination.value.current_page)
  } catch {
    showToast('Error al eliminar el prospecto', 'error')
  }
}

const editUserProspecto = async (prospectoId) => {
  try {
    const res = await axios.get(`${API_USER}/prospecto/${prospectoId}`)
    const data = res.data
    userProspecto.value = data

    userEditId.value = data.id

    userForm.value = {
      id: data.id,
      prospecto_id: data.prospecto_id,
      nombres: data.nombres,
      numero_documento: data.numero_documento,
      celular: data.celular,
      direccion_prospecto: data.direccion_prospecto,
      id_sexo: data.id_sexo,
      id_estado_civil: data.id_estado_civil,
      ubigeo: data.ubigeo,
      ocupacion: data.ocupacion,
      id_departamento: data.id_departamento,
      id_provincia: data.id_provincia,
      id_distrito: data.id_distrito,
      sexo: data.sexo,
      email: data.prospecto?.email || '',
      tipo_documento_id: data.prospecto?.tipo_documento_id || ''
      ,
      id_productos: data.prospecto?.id_productos || '',
      id_certificado: data.prospecto?.id_certificado || '',
      tipo_usuario: data.prospecto?.tipo_usuario || ''
    }

    showUserModal.value = true
  } catch (error) {
    console.error(error)
    showToast('Error al cargar los detalles', 'error')
  }
}


const editSeguimientoProspecto = async (prospectoId) => {
  try {
    const res = await axios.get(`${API_USER}/prospecto/${prospectoId}`)
    const p = res.data.prospecto

  seguimientoForm.value = {
  prospecto_id: p.id,
  id_certificado: p.id_certificado,
  id_certificado_pro21: p.id_certificado_pro21,

  // 👇 FORMATEAR FECHA
  fecha_proxima_cita: formatDate(p.fechavisita1),

  revisado: p.revisado ?? false,

  email: p.email,

  visita1: p.visita1,
  fechavisita1: formatDate(p.fechavisita1),
  fechaproximacita_visita1: formatDate(p.fechaproximacita_visita1),

  visita2: p.visita2,
  fechavisita2: formatDate(p.fechavisita2),

  // 🔥 ESTA ES LA QUE TE INTERESA
  fechaproximacita_visita2: formatDate(p.fechavisita2),

  visita3: p.visita3,
  fechavisita3: formatDate(p.fechavisita3),
  fechaproximacita_visita3: formatDate(p.fechaproximacita_visita3),

  visita4: p.visita4,
  fechavisita4: formatDate(p.fechavisita4),
  fechaproximacita_visita4: formatDate(p.fechaproximacita_visita4),
  nombre_archivo1: p.nombre_archivo1 ?? null,
  nombre_archivo2: p.nombre_archivo2 ?? null,
  cantidadvisitas: p.cantidadvisitas ?? 0
}


    showSeguimientoModal.value = true
  } catch (e) {
    showToast('Error al cargar seguimiento', 'error')
  }
}

const submitUserForm = async () => {
  try {
    // 1. Construimos el objeto para UserProspecto
    // IMPORTANTE: Incluimos prospecto_id porque el backend lo requiere
    const userData = {
      prospecto_id: userForm.value.prospecto_id 
    };

    const fields = [
      'nombres', 'numero_documento', 'celular', 'direccion_prospecto', 
      'ubigeo', 'ocupacion', 'id_departamento', 'id_provincia', 'id_distrito'
    ];
    
    // Solo agregamos los campos que tengan algún valor
    fields.forEach(field => {
      if (userForm.value[field] !== undefined && userForm.value[field] !== null && userForm.value[field] !== '') {
        userData[field] = userForm.value[field];
      }
    });

    // 2. Construimos el objeto para Prospecto (email y tipo)
    const prospectoData = {};
    if (userForm.value.email) prospectoData.email = userForm.value.email;
    if (userForm.value.tipo_usuario) prospectoData.tipo_usuario = userForm.value.tipo_usuario;

    // 3. Preparamos las peticiones
    const updates = [
      axios.put(`${API_USER}/${userEditId.value}`, userData)
    ];

    // Solo enviamos a la tabla principal si hay cambios de email o tipo
    if (Object.keys(prospectoData).length > 0) {
      updates.push(axios.put(`${API_BASE}/${userForm.value.prospecto_id}`, prospectoData));
    }

    // Ejecutamos ambas actualizaciones
    await Promise.all(updates);

    showToast('Información actualizada correctamente');
    showUserModal.value = false;
    getProspectos(pagination.value.current_page);
  } catch (error) {
    console.error("Error al actualizar:", error.response?.data);
    // Extraemos el error específico del backend para mostrarlo en el Toast
    const errorDetail = error.response?.data?.errors;
    const firstError = errorDetail ? Object.values(errorDetail)[0][0] : 'Error al actualizar';
    
    showToast(firstError, 'error');
  }
}
const showToast = (msg, type = 'success') => {
  toast.value = { show: true, message: msg, type }
  setTimeout(() => (toast.value.show = false), 3000)
}
// --- NUEVO: Para manejar los estados ---
const conclusiones = ref([]) // Lista de estados (Venta, Interesado, etc.)

const getConclusiones = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/conclusiones')
    conclusiones.value = res.data
  } catch (error) {
    console.error('Error al cargar conclusiones', error)
  }
}

const cambiarEstado = async (prospectoId, nuevoEstadoId) => {
  try {
    // Usamos API_BASE que ya tienes definida como 'http://localhost:8000/api/prospectos'
    await axios.put(`${API_BASE}/${prospectoId}`, {
      id_estado_prospecto: nuevoEstadoId
    })
    showToast('Estado actualizado correctamente')
    getProspectos(pagination.value.current_page) // Recarga la tabla
  } catch (error) {
    showToast('Error al actualizar el estado', 'error')
  }
}
// ---------------------------------------
onMounted(() => {
  getProspectos()
  getConclusiones() // <-- AGREGA ESTA LÍNEA
    getVendedores()


})



const vendedores = ref([])

const getVendedores = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/vendedores')
    vendedores.value = res.data
  } catch (e) {
    showToast('Error al cargar vendedores', 'error')
  }
}

const cambiarVendedor = async (prospectoId, vendedorId) => {
  try {
    await axios.put(`${API_BASE}/${prospectoId}`, {
      id_vendedor_atencion: vendedorId
    })
    showToast('Vendedor asignado correctamente')
  } catch (e) {
    showToast('Error al asignar vendedor', 'error')
  }
}

const seguimientoForm = ref({
  prospecto_id: null,
  id_certificado: null,
  id_certificado_pro21: null,
  fecha_proxima_cita: null,
  revisado: false,

  visita1: null,
  fechavisita1: null,
  fechaproximacita_visita1: null,

  email: null,

  visita2: null,
  fechavisita2: null,
  fechaproximacita_visita2: null,

  visita3: null,
  fechavisita3: null,
  fechaproximacita_visita3: null,

  visita4: null,
  fechavisita4: null,
  fechaproximacita_visita4: null,
  nombre_archivo1: null,
  nombre_archivo2: null,
  cantidadvisitas: 0
})

const formatDate = (dateString) => {
  if (!dateString) return null
  return dateString.substring(0, 10)
}

const guardarSeguimiento = async () => {
  try {
    const formData = new FormData()

    // 👉 campos normales (MENOS los archivos)
    Object.keys(seguimientoForm.value).forEach(key => {
      if (
        seguimientoForm.value[key] !== null &&
        key !== 'nombre_archivo1' &&
        key !== 'nombre_archivo2'
      ) {
        formData.append(key, seguimientoForm.value[key])
      }
    })

    // 👉 archivos reales
    if (fileProforma.value) {
      formData.append('nombre_archivo1', fileProforma.value)
    }

    if (fileAceptacion.value) {
      formData.append('nombre_archivo2', fileAceptacion.value)
    }

    // 👉 Laravel PUT con multipart
    formData.append('_method', 'PUT')

    await axios.post(
      `http://localhost:8000/api/prospecto/${seguimientoForm.value.prospecto_id}/seguimiento`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    showToast('Seguimiento actualizado correctamente')
    showSeguimientoModal.value = false

    // limpiar archivos
    fileProforma.value = null
    fileAceptacion.value = null

    getProspectos(pagination.value.current_page)

  } catch (e) {
    console.error(e.response?.data || e)
    showToast('Error al guardar seguimiento', 'error')
  }
}


const onFileChange = (e) => {
  fileProforma.value = e.target.files[0]
}

const onFileChangeAceptacion = (e) => {
  fileAceptacion.value = e.target.files[0]
}


</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  min-height: 100vh;
}

/* ===================== HEADER ===================== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.5s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.header-subtitle {
  color: #64748b;
  font-size: 0.95rem;
}

/* ===================== STATS GRID ===================== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  animation: fadeIn 0.5s ease 0.2s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.stat-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.25rem;
}

/* ===================== CARD ===================== */
.card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  overflow: hidden;
  animation: fadeIn 0.5s ease 0.4s both;
}

/* ===================== SEARCH ===================== */
.search-card {
  background: white;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid #f1f5f9;
}

.search-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.btn-clear-all {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-clear-all:hover {
  background: #fecaca;
  transform: scale(1.05);
}

.search-box {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  align-items: flex-end;
}

.search-actions {
  display: flex;
  gap: 1rem;
}

/* ===================== FORM ELEMENTS ===================== */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.required {
  color: #dc2626;
  font-weight: 700;
}

input, select {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: white;
  font-family: inherit;
  color: #334155;
}

input:focus, select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

input::placeholder {
  color: #94a3b8;
}

.input-readonly {
  background-color: #f8fafc;
  color: #64748b;
  border-color: #e2e8f0;
  cursor: not-allowed;
}

/* ===================== BUTTONS ===================== */
.btn {
  padding: 0.875rem 1.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active {
  transform: translateY(0);
}

.btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn.secondary {
  background: #e2e8f0;
  color: #475569;
}

.btn.secondary:hover {
  background: #cbd5e1;
}

.btn-icon {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon {
  font-size: 1.25rem;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* ===================== TABLE ===================== */
.table-card {
  padding: 0;
}

.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

th {
  padding: 1.25rem 1.5rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  padding: 1.5rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.95rem;
  color: #334155;
}

tbody tr {
  transition: all 0.2s ease;
}

tbody tr:hover {
  background: #f8fafc;
}

.id-badge {
  background: #e0e7ff;
  color: #4f46e5;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.email-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.email-icon {
  font-size: 1.25rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.badge.usuario {
  background: #dbeafe;
  color: #1e40af;
}

.badge.usuario .badge-dot {
  background: #1e40af;
}

.badge.empresa {
  background: #dcfce7;
  color: #166534;
}

.badge.empresa .badge-dot {
  background: #166534;
}

.product-tag {
  background: #fef3c7;
  color: #92400e;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.btn-action {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
}

.btn-action:hover {
  transform: scale(1.1);
}

.btn-action.warning {
  background: #fef3c7;
  color: #92400e;
}

.btn-action.warning:hover {
  background: #fde68a;
}

.btn-action.danger {
  background: #fee2e2;
  color: #991b1b;
}

.btn-action.danger:hover {
  background: #fecaca;
}

.btn-action.primary {
  background: #dbeafe;
  color: #1e40af;
}

.btn-action.primary:hover {
  background: #bfdbfe;
}

.empty {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  font-size: 4rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.25rem;
  color: #475569;
  font-weight: 600;
}

.empty-state p {
  color: #94a3b8;
  font-size: 0.95rem;
}

/* ===================== PAGINATION ===================== */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: #f8fafc;
  border-top: 2px solid #e2e8f0;
}

.btn-pagination {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 0.5rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.btn-pagination:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.btn-pagination:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.page-number {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.125rem;
}

.separator {
  color: #94a3b8;
  font-size: 1.125rem;
}

.total-pages {
  color: #64748b;
  font-size: 1.125rem;
}

/* ===================== LOADER ===================== */
.loader-container {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.loader-container p {
  color: #64748b;
  font-weight: 500;
}

.loader {
  width: 60px;
  height: 60px;
  border: 4px solid #e2e8f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===================== MODAL ===================== */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  padding: 1rem;
}

.modal {
  background: white;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid #e2e8f0;
}

.modal-compact {
  max-width: 500px;
}

.modal-large {
  max-width: 1000px;
}

.modal-header {
  padding: 2rem;
  border-bottom: 2px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.modal-header.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: inherit;
}

.btn-close {
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close:hover {
  background: rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

.modal-body {
  padding: 2rem;
}

.modal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.section-header {
  grid-column: span 2;
  margin-top: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
}

.section-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 2px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: #f8fafc;
}

/* ===================== TOAST ===================== */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  color: white;
  font-weight: 600;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 300px;
}

.toast-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  font-size: 1rem;
}

.toast.success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.toast.error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

/* ===================== TRANSITIONS ===================== */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal, .modal-leave-to .modal {
  transform: scale(0.9) translateY(20px);
}

.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 1024px) {
  .search-box {
    grid-template-columns: 1fr 1fr;
  }

  .modal-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .page {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .header-content {
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .search-box {
    grid-template-columns: 1fr;
  }

  .search-actions {
    flex-direction: column;
  }

  .modal {
    max-width: 100%;
    border-radius: 0.5rem;
  }

  table {
    font-size: 0.85rem;
  }

  th, td {
    padding: 1rem;
  }

  .actions-cell {
    flex-wrap: wrap;
  }

  .toast {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.5rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .modal-header, .modal-body, .modal-footer {
    padding: 1.5rem;
  }
}

/* ===================== SCROLLBAR ===================== */
.modal::-webkit-scrollbar,
.table-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.modal::-webkit-scrollbar-track,
.table-wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.modal::-webkit-scrollbar-thumb,
.table-wrapper::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}

.modal::-webkit-scrollbar-thumb:hover,
.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* Animación del modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.9) translateY(-20px);
}

/* Backdrop */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
}

/* Modal principal */
.modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-large {
  max-width: 900px;
}

/* Header */
.modal-header {
  padding: 24px;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px 12px 0 0;
}

.modal-header.warning {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.btn-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

/* Body */
.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

/* Secciones */
.section-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #667eea;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.section-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #495057;
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #dee2e6;
}

/* Formulario */
.form-row {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
}

.required {
  color: #dc3545;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #ced4da;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s;
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

textarea.form-control {
  resize: vertical;
  min-height: 80px;
}

/* Vista previa de archivo */
.file-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border: 2px solid #28a745;
  border-radius: 6px;
  margin-bottom: 12px;
}

.file-icon {
  font-size: 1.2rem;
}

.file-link {
  color: #667eea;
  text-decoration: none;
  flex: 1;
  font-weight: 500;
}

.file-link:hover {
  text-decoration: underline;
}

/* Upload de archivos */
.file-upload-wrapper {
  position: relative;
}

.file-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.file-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  border: 2px dashed #ced4da;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  color: #495057;
  font-weight: 500;
}

.file-label:hover {
  border-color: #667eea;
  background: #f8f9fa;
  transform: translateY(-2px);
}

.help-text {
  display: block;
  margin-top: 6px;
  color: #6c757d;
  font-size: 0.85rem;
}

/* Footer */
.modal-footer {
  padding: 20px 24px;
  border-top: 2px solid #e9ecef;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  background: #f8f9fa;
  border-radius: 0 0 12px 12px;
}

/* Botones */
.btn {
  padding: 12px 28px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
}

.btn.primary:active {
  transform: translateY(0);
}

.btn.secondary {
  background: #6c757d;
  color: white;
}

.btn.secondary:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-backdrop {
    padding: 10px;
  }

  .modal {
    max-height: 95vh;
  }

  .modal-header h2 {
    font-size: 1.2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .section-card {
    padding: 16px;
  }
}
</style>