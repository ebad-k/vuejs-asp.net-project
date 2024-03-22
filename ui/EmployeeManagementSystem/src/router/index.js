import { createRouter, createWebHistory } from 'vue-router'
import Department from '../views/Department.vue'
import Employee from '../views/Employee.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true // This route requires authentication
    }
  },
  {
    path: '/home',
    name: 'Home2',
    component: Home,
    meta: {
      requiresAuth: true // This route requires authentication
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/department',
    name: 'Department',
    component: Department,
    meta: {
      requiresAuth: true // This route requires authentication
    }
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee,
    meta: {
      requiresAuth: true // This route requires authentication
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt');
  if (token && to.path === '/login') {
    // If user is already logged in and tries to access /login, redirect to /home
    next('/home');
  }else if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router
