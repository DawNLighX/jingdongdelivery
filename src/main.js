import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { vLazy } from './utils/lazyLoad'
import { throttle } from './utils/throttle'
import 'normalize.css'
import './style/index.scss'

const app = createApp(App)

// 注册全局懒加载指令
app.directive('lazy', vLazy)

// 全局滚动节流
const throttledScroll = throttle(() => {
  // 触发全局滚动事件，供其他组件监听
  window.dispatchEvent(new Event('globalScroll'))
}, 300)

window.addEventListener('scroll', throttledScroll, true)

app.use(store).use(router).mount('#app')
