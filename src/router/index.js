import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '@/views/HomeView'
// import OrdersView from '@/views/OrdersView'

const HomeView = () => import('@/views/HomeView')
const OrdersView = () => import('@/views/OrdersView')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: OrdersView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
