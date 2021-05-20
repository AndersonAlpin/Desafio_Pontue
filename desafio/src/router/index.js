import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Student from '@/views/Student.vue'
import Admin from '@/views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/student',
    name: 'Student',
    component: Student,
    beforeEnter: (to, from, next) => {
      let keyUserString = localStorage.getItem('keyUser')
      let keyUser = JSON.parse(keyUserString)

      if (keyUser.token != undefined) {
        if (keyUser.role == 'aluno') {
          next();
        } else {
          next('/admin');
        }
      } else {
        next('/');
      }
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      let keyUserString = localStorage.getItem('keyUser')
      let keyUser = JSON.parse(keyUserString)

      if (keyUser.token != undefined) {
        if (keyUser.role == 'admin') {
          next();
        } else {
          next('/student');
        }
      } else {
        next('/');
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
