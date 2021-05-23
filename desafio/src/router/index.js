import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Aluno from '@/views/Aluno.vue'
import Admin from '@/views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      let json = localStorage.getItem('userKey')
      let userKey = JSON.parse(json)

      if (userKey && userKey.token != undefined) {
        if (userKey.role == 'aluno') {
          next('/aluno');
        } else {
          next('/admin');
        }
      } else {
        next();
      }
    }
  },
  {
    path: '/aluno',
    name: 'Aluno',
    component: Aluno,
    beforeEnter: (to, from, next) => {
      let json = localStorage.getItem('userKey')
      let userKey = JSON.parse(json)

      if (userKey && userKey.token != undefined) {
        if (userKey.role == 'aluno') {
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
      let json = localStorage.getItem('userKey')
      let userKey = JSON.parse(json)

      if (userKey && userKey.token != undefined) {
        if (userKey.role == 'admin') {
          next();
        } else {
          next('/aluno');
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