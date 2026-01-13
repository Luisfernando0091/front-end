import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Prospectos from '../views/prospecto/prospecto.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/prospectos',
    name: 'prospectos',
    component: Prospectos,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
