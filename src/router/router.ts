import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  {
    name: 'main',
    path: '/',
    component: () => import('@/views/MainView.vue'),
  },
  {
    name: 'genres',
    path: '/genres',
    component: () => import('@/views/GenresView.vue'),
  },
  {
    name: 'about',
    path: '/about/:id',
    component: () => import('@/views/AboutView.vue'),
    props: (route) => ({ id: Number(route.params.id) }),
  },
  {
    name: 'movies',
    path: '/movies',
    component: () => import('@/views/MoviesView.vue'),
  },
  {
    name: 'account',
    path: '/account',
    component: () => import('@/views/AccountView.vue'),
    children: [
      { path: '', redirect: '/account/favorites' },
      {
        name: 'account-profile',
        path: 'profile',
        component: () => import('@/views/ProfileView.vue'),
      },
      {
        name: 'account-favorites',
        path: 'favorites',
        component: () => import('@/views/FavoritesView.vue'),
      },
    ],
    meta: {
      requiredAuth: true,
    },
  },
]

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }
  if (to.hash) {
    return { el: to.hash }
  }
  return { left: 0, top: 0 }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior,
  routes,
})

router.beforeEach((to) => {
  const user = useUserStore()
  if (to.meta.requiredAuth && !user.userAuth) {
    return '/'
  }
})

export default router
