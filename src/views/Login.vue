<template>
  <div class="login-container">
    <!-- Panel Izquierdo - Branding -->
    <div class="branding-panel">
      <div class="branding-content">
        <div class="logo-section">
          <div class="logo-circle">
            <i class="ti ti-briefcase"></i>
          </div>
          <h1 class="brand-name">ProspectCRM</h1>
        </div>
        <h2 class="welcome-title">Gestión Inteligente de Prospectos</h2>
        <p class="welcome-subtitle">
          Impulsa tu negocio con herramientas profesionales de seguimiento y análisis de clientes potenciales
        </p>
        <div class="features-list">
          <div class="feature-item">
            <i class="ti ti-check"></i>
            <span>Seguimiento en tiempo real</span>
          </div>
          <div class="feature-item">
            <i class="ti ti-check"></i>
            <span>Reportes y análisis detallados</span>
          </div>
          <div class="feature-item">
            <i class="ti ti-check"></i>
            <span>Gestión de equipos comerciales</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel Derecho - Formulario -->
    <div class="form-panel">
      <div class="form-container">
        <div class="form-header">
          <h2 class="form-title">Iniciar Sesión</h2>
          <p class="form-subtitle">Ingresa tus credenciales para acceder al sistema</p>
        </div>

        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="email">
              <i class="ti ti-mail"></i>
              Correo electrónico
            </label>
            <div class="input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="usuario@empresa.com"
                v-model="form.email"
                required
                autocomplete="email"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">
              <i class="ti ti-lock"></i>
              Contraseña
            </label>
            <div class="input-wrapper">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Ingrese su contraseña"
                v-model="form.password"
                required
                autocomplete="current-password"
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
                tabindex="-1"
              >
                <i :class="showPassword ? 'ti ti-eye-off' : 'ti ti-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe" />
              <span>Recordarme</span>
            </label>
            <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" class="btn-login" :disabled="loading">
            <span v-if="!loading">
              <i class="ti ti-login"></i>
              Iniciar Sesión
            </span>
            <span v-else class="loading-content">
              <i class="ti ti-loader spinning"></i>
              Verificando credenciales...
            </span>
          </button>

          <div v-if="error" class="error-message">
            <i class="ti ti-alert-circle"></i>
            {{ error }}
          </div>
        </form>

        <div class="divider">
          <span>o</span>
        </div>

        <div class="signup-section">
          <p class="signup-text">
            ¿No tienes una cuenta?
            <a href="/register" class="signup-link">Solicitar acceso</a>
          </p>
        </div>

        <div class="footer-links">
          <a href="#">Términos de servicio</a>
          <span class="separator">•</span>
          <a href="#">Política de privacidad</a>
          <span class="separator">•</span>
          <a href="#">Soporte</a>
        </div>
      </div>
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
const showPassword = ref(false)
const rememberMe = ref(false)

const login = async () => {
  error.value = null
  loading.value = true

  try {
    const res = await api.post('/login', form)

    localStorage.setItem('user', JSON.stringify(res.data.user))

    if (res.data.token) {
      localStorage.setItem('token', res.data.token)
    }

    router.push('/prospectos')
  } catch (e) {
    error.value =
      e.response?.data?.message ||
      'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.login-container {
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* ========== PANEL IZQUIERDO ========== */
.branding-panel {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.branding-panel::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -200px;
  right: -200px;
}

.branding-panel::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  bottom: -100px;
  left: -100px;
}

.branding-content {
  position: relative;
  z-index: 1;
  color: white;
  max-width: 500px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
}

.logo-circle {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.brand-name {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.welcome-subtitle {
  font-size: 1.125rem;
  line-height: 1.6;
  opacity: 0.95;
  margin-bottom: 40px;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
}

.feature-item i {
  font-size: 24px;
  background: rgba(255, 255, 255, 0.2);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

/* ========== PANEL DERECHO ========== */
.form-panel {
  flex: 1;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.form-container {
  width: 100%;
  max-width: 440px;
}

.form-header {
  margin-bottom: 32px;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 8px 0;
}

.form-subtitle {
  font-size: 0.95rem;
  color: #718096;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.form-group label i {
  font-size: 16px;
  color: #667eea;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s;
  background: #f7fafc;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: #667eea;
}

.toggle-password i {
  font-size: 20px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #4a5568;
}

.remember-me input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #667eea;
}

.forgot-password {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: #5a67d8;
  text-decoration: underline;
}

.btn-login {
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.btn-login:active:not(:disabled) {
  transform: translateY(0);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  background: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  padding: 12px 16px;
  color: #c53030;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-message i {
  font-size: 18px;
  flex-shrink: 0;
}

.divider {
  text-align: center;
  position: relative;
  margin: 32px 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e2e8f0;
}

.divider span {
  background: white;
  padding: 0 16px;
  position: relative;
  color: #a0aec0;
  font-size: 0.875rem;
  font-weight: 500;
}

.signup-section {
  text-align: center;
}

.signup-text {
  color: #4a5568;
  font-size: 0.95rem;
  margin: 0;
}

.signup-link {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
  transition: color 0.2s;
}

.signup-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}

.footer-links {
  margin-top: 32px;
  text-align: center;
  font-size: 0.8125rem;
  color: #a0aec0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.footer-links a {
  color: #718096;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #667eea;
}

.separator {
  color: #cbd5e0;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 1024px) {
  .branding-panel {
    display: none;
  }

  .form-panel {
    flex: 1;
  }
}

@media (max-width: 640px) {
  .form-panel {
    padding: 24px;
  }

  .form-title {
    font-size: 1.5rem;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>