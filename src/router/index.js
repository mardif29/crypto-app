import { createRouter, createWebHistory } from '@ionic/vue-router'
import CryptoList from '../CryptoList.vue'

const routes = [{ path: '/', component: CryptoList }]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
