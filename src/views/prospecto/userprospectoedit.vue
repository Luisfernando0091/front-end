<template>
  <div class="page">
    <h2>Actualizar Datos</h2>

    <div class="card">
      <form @submit.prevent="saveUserProspecto">
        <!-- Nombres -->
        <div class="form-group">
          <label>Nombres</label>
          <input v-model="form.nombres" type="text" placeholder="Ingrese nombres" required />
        </div>

        <!-- Celular -->
        <div class="form-group">
          <label>Celular</label>
          <input v-model="form.celular" type="text" placeholder="Ingrese celular" />
        </div>

        <!-- Número de documento -->
        <div class="form-group">
          <label>Número de documento</label>
          <input v-model="form.numero_documento" type="text" placeholder="Ingrese número de documento" />
        </div>

        <!-- Dirección -->
        <div class="form-group">
          <label>Dirección</label>
          <input v-model="form.direccion_prospecto" type="text" placeholder="Ingrese dirección" />
        </div>

        <!-- Urbanización -->
        <div class="form-group">
          <label>Urbanización</label>
          <input v-model="form.urbanizacion" type="text" placeholder="Ingrese urbanización" />
        </div>

        <!-- Referencia -->
        <div class="form-group">
          <label>Referencia</label>
          <input v-model="form.referencia" type="text" placeholder="Ingrese referencia" />
        </div>

        <!-- Sexo -->
        <div class="form-group">
          <label>Sexo</label>
          <select v-model="form.id_sexo">
            <option value="">Seleccione</option>
            <option value="1">Masculino</option>
            <option value="2">Femenino</option>
          </select>
        </div>

        <!-- Estado Civil -->
        <div class="form-group">
          <label>Estado Civil</label>
          <select v-model="form.id_estado_civil">
            <option value="">Seleccione</option>
            <option value="1">Soltero(a)</option>
            <option value="2">Casado(a)</option>
            <option value="3">Divorciado(a)</option>
            <option value="4">Viudo(a)</option>
          </select>
        </div>

        <!-- Fecha de Nacimiento -->
        <div class="form-group">
          <label>Fecha de Nacimiento</label>
          <input v-model="form.fecha_nacimiento" type="date" />
        </div>

        <!-- Acciones -->
        <div class="actions">
          <button class="btn primary" type="submit">Guardar Cambios</button>
          <button class="btn" type="button" @click="cancelEdit">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
    
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
// Obtenemos el prospectoId desde la URL
const prospectoId = route.params.prospectoId;
console.log('Prospecto ID:', prospectoId); // <-- AQUI

// ===================== ROUTER =====================
const route = useRoute();
const router = useRouter();

// Obtenemos el prospectoId desde la URL
const prospectoId = route.params.prospectoId;

// ===================== FORMULARIO =====================
const form = ref({
  nombres: '',
  celular: '',
  numero_documento: '',
  direccion_prospecto: '',
  urbanizacion: '',
  referencia: '',
  id_sexo: '',
  id_estado_civil: '',
  fecha_nacimiento: '',
});

// Guardamos el ID interno del UserProspecto para el PUT
const userEditId = ref(null);

// ===================== FUNCIONES =====================

// 1️⃣ Cargar datos del UserProspecto
const loadUserProspecto = async () => {
  try {
    // Llamamos a la API para obtener user_prospecto según prospectoId
    const res = await axios.get(`/api/user-prospecto/prospecto/${prospectoId}`);
    
    // La API devuelve { user_prospecto: {...} }
            if (res.data) {
            form.value = res.data;        // cargamos directamente el objeto
            userEditId.value = res.data.id; // guardamos el ID real
            } else {
            alert('No se encontró User Prospecto para este prospecto.');
            }

  } catch (err) {
    console.error(err);
    alert('Error al cargar el User Prospecto');
  }
};

// 2️⃣ Guardar cambios
const saveUserProspecto = async () => {
  try {
    if (!userEditId.value) {
      alert('ID de User Prospecto no encontrado');
      return;
    }

    // Clonamos form para no modificar el original
    const payload = { ...form.value };
    delete payload.id; // importante: eliminar id

await axios.put(`/api/user-prospecto/${userEditId.value}`, payload);

    alert('User Prospecto actualizado con éxito');
    router.back();
  } catch (err) {
    console.error(err);
    alert('Error al actualizar User Prospecto');
  }
};


// 3️⃣ Cancelar edición y volver
const cancelEdit = () => {
  router.back();
};

// ===================== ON MOUNT =====================
onMounted(loadUserProspecto);
</script>

<style scoped>
.page {
  max-width: 700px;
  margin: 40px auto;
  font-family: system-ui;
}

.card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,.08);
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.btn {
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.primary {
  background: #2563eb;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>
