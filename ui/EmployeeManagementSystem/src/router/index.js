import { createRouter, createWebHistory } from 'vue-router'
import Department from '../views/Department.vue'
import Employee from '../views/Employee.vue'
import Home from '../views/Home.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/department',
    name: 'Department',
    component: Department,
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
