import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */'../views/home/Home.vue') // 异步加载组件路由
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */'../views/login/Login.vue'),
    beforeEnter (to, from, next) { // 访问某页面之前完成某操作，to表示要去的页面，from表示从哪里来，next是调用跳转
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next() // 如果isLogin为true，则直接跳过此页面进入下一页面
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */'../views/register/Register.vue'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */'../views/shop/Shop.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => { // 每次路由导航被触发时，实际跳转发生之前
  const { isLogin } = localStorage;
  (!isLogin && (to.name !== 'Login' && to.name !== 'Register')) ? next({ name: 'Login' }) : next() // 如果isLogin为true且目标位置为login时，调用跳转，否则去登录页面
})

export default router
