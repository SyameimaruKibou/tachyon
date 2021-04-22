import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexTable from "../components/IndexTable";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: IndexTable
  }
]

const router = new VueRouter({
  routes
})

export default router
