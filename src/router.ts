let routerPath = '/home'

import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from 'vue-router'

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: (import.meta as any).env.SSR
      ? createMemoryHistory()
      : createWebHistory(),
    routes: [
      {
        path: '/',
        component: () => import('./pages/Home.vue'),
        props: true,
      },
      {
        path: routerPath + '/',
        component: () => import('./pages/Home.vue'),
        props: true,
      },
    ],
  })
}
