import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/list'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'list'
      },
      {
        path: 'list',
        component: () => import('@/views/List.vue')
      },
      {
        path: 'map',
        component: () => import('@/views/Map.vue')
      }
    ]
  },
  {
    path: '/collection/:collectionId',
    component: () => import('@/views/Collection.vue')
  },
  {
    path: '/institute/:instituteId',
    component: () => import('@/views/Institute.vue')
  },
  {
    path: '/item/:itemId',
    component: () => import('@/views/Item.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
