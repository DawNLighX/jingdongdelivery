import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import Login from '../views/login/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter (to, from, next) { // 访问某页面之前完成某操作，to表示要去的页面，from表示从哪里来，next是调用跳转
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next() // 如果isLogin为true，则直接跳过此页面进入下一页面
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => { // 每次路由导航被触发时，实际跳转发生之前
  const { isLogin } = localStorage;
  (isLogin || to.name === 'Login') ? next() : next({ name: 'Login' }) // 如果isLogin为true且目标位置为login时，调用跳转，否则去登录页面
})

export default router
