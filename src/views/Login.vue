<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="title">Iniciar Sesión</h2>

      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="Ingrese su email"
            v-model="form.email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            v-model="form.password"
            required
          />
        </div>

        <button type="submit" class="btn-login" :disabled="loading">
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>

        <p v-if="error" class="error-message">{{ error }}</p>
      </form>

      <p class="signup-text">
        ¿No tienes cuenta?
        <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const error = ref(null)
const loading = ref(false)

const login = async () => {
  error.value = null
  loading.value = true

  try {
    const res = await api.post('/login', form)

    /*
      Laravel puede devolver:
      {
        user: {...},
        token: "xxxxx"
      }
    */

    localStorage.setItem('user', JSON.stringify(res.data.user))

    if (res.data.token) {
      localStorage.setItem('token', res.data.token)
    }

    // 🔥 REDIRECCIÓN
    router.push('/prospectos')
  } catch (e) {
    error.value =
      e.response?.data?.message ||
      'Credenciales incorrectas o error de servidor'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #667eea, #764ba2);
  font-family: 'Inter', sans-serif;
}

.login-card {
  background-color: #fff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 0.65rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
}

.form-group input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  outline: none;
}

.btn-login {
  padding: 0.7rem 0;
  border: none;
  border-radius: 8px;
  background-color: #667eea;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-login:hover:not(:disabled) {
  background-color: #5a67d8;
}

.error-message {
  color: #e53e3e;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.signup-text {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #555;
}

.signup-text a {
  color: #667eea;
  font-weight: 500;
  text-decoration: none;
}

.signup-text a:hover {
  text-decoration: underline;
}
</style>
