import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { vLazy } from './utils/lazyLoad'
import 'normalize.css'
import './style/index.scss'

const app = createApp(App)

// 注册全局懒加载指令
app.directive('lazy', vLazy)

app.use(store).use(router).mount('#app')
