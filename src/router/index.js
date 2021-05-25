import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexTable from "../components/IndexTable";
import UserLayout from "../layouts/UserLayout";
import Login from "../components/user/Login";
import Register from "../components/user/Register";

const routes = [
  {
    path: '/admin',
    name: '/admin',
    component: IndexTable
  },
  {
    path: '/user/login',
    name: '/user/login',
    component: UserLayout,
    children: [
      {
        path: '',
        component: Login
      }
    ]
  },
  {
    path: '/user/register',
    name: '/user/register',
    component: UserLayout,
    children: [
      {
        path: '',
        component: Register
      }
    ]
  },
  {
    path: '/',
    name: '/',
    component: IndexTable
  }
]


const router = new VueRouter({
  mode: "history",
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

export default router
