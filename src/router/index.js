import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StepsView from "@/views/StepsView";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/steps',
    name: 'steps',
    component: StepsView,
    props: route => ({
      edited: route.query.edited,
      index: route.query.index
    })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
