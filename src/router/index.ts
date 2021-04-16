import { createRouter,createWebHistory} from 'vue-router'

const router = createRouter({
  // 指定路由模式
  history: createWebHistory(),
  // 路由地址
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      children:[
        {
          path: '/TS',
          name: 'ts',
          component: () => import('../views/practice/TS.vue')
        },
        {
          path: '/Vue3',
          name: 'Vue3',
          component: () => import('../views/practice/Vue3.vue')
        },
        {
          path: '/Axios',
          name: 'Axios',
          component: () => import('../views/practice/Axios.vue')
        },
        {
          path: '/Test',
          name: 'Test',
          component: () => import('../views/practice/Test.vue')
        },
        {
          path: '/LisUI',
          name: 'LisUI',
          component: () => import('../views/practice/LisUI.vue')
        },
        {
          path: '/LogicFlow',
          name: 'LogicFlow',
          component: () => import('../views/practice/LogicFlow.vue')
        },
        {
          path: '/LeetCode',
          name: 'LeetCode',
          component: () => import('../views/practice/leetcode.vue')
        },
        {
          path: '/Wheel',
          name: 'Wheel',
          component: () => import('../views/practice/Wheel.vue')
        }
      ]
    }
  ]
})

export default router