import { createRouter, createWebHashHistory } from 'vue-router'
import { hasToken } from '../utils/token'

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
      const isLogin = hasToken() || localStorage.isLogin
      isLogin ? next({ name: 'Home' }) : next() // 如果已登录，则直接跳过此页面进入下一页面
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */'../views/register/Register.vue'),
    beforeEnter (to, from, next) {
      const isLogin = hasToken() || localStorage.isLogin
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */'../views/shop/Shop')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */'../views/cart/Cart')
  },
  {
    path: '/orderConfirm/:id',
    name: 'OrderConfirm',
    component: () => import(/* webpackChunkName: "orderConfirm" */'../views/orderConfirm/OrderConfirm')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */'../views/order/Order')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "mine" */'../views/mine/Mine')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */'../views/search/Search')
  },
  {
    path: '/searchList',
    name: 'SearchList',
    component: () => import(/* webpackChunkName: "searchList" */'../views/searchList/SearchList')
  },
  {
    path: '/mineAddress',
    name: 'MineAddress',
    component: () => import(/* webpackChunkName: "mineAddress" */'../views/mineAddress/MineAddress')
  },
  {
    path: '/mineAddressCreate',
    name: 'MineAddressCreate',
    component: () => import(/* webpackChunkName: "mineAddressCreate" */'../views/mineAddressCreate/MineAddressCreate')
  },
  {
    path: '/mineAddressSelect',
    name: 'MineAddressSelect',
    component: () => import(/* webpackChunkName: "mineAddressSelect" */'../views/mineAddressSelect/MineAddressSelect')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = hasToken() || localStorage.isLogin
  if (!isLogin && (to.name !== 'Login' && to.name !== 'Register')) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
