# jingdongdelivery (京东到家 仿真前端)

## 简要说明

这是一个使用 Vue 3 实现的京东到家仿真前端项目，包含首页、门店列表、购物车、下单、用户等完整页面。具有完善的性能优化、用户交互、状态管理和工程实践。适合作为前端工程实践与面试展示的高质量项目样例。

## 主要特性

### 核心功能
- 完整的电商流程：浏览门店 → 选购商品 → 加入购物车 → 下单 → 订单管理
# jingdongdelivery（前端）

简短说明
-----------------
基于 Vue 3 的京东到家仿真前端，包含门店浏览、商品展示、购物车、下单、用户登录/注册与地址管理等完整流程，适合作为联调后端或教学演示的项目。

快速上手
-----------------
先决条件
- Node.js（推荐 14+）
- npm

安装依赖
```bash
cd jingdongdelivery
npm install
```

开发运行
```bash
npm run serve
```
默认本地地址：`http://localhost:8080`。若需要与本地后端联调，请确认 `src/utils/request.js` 的 `baseURL` 指向后端（含端口），并保持 `withCredentials: true` 以便携带 HttpOnly cookie。

构建（生产）
```bash
npm run build
```

项目要点
-----------------
- 网络请求：`src/utils/request.js` 封装了 axios，支持自动刷新 accessToken（通过后端 HttpOnly refreshToken）
- 登录流程：登录成功后前端保存 `accessToken`（本地存储），后端通过 HttpOnly cookie 管理 refreshToken
- 图片懒加载：全局 `v-lazy` 指令（基于 Intersection Observer）
# jingdongdelivery（前端）

简短说明
-----------------
基于 Vue 3 的京东到家仿真前端，包含门店浏览、商品展示、购物车、下单、用户登录/注册与地址管理等完整流程，适合作为联调后端或教学演示的项目。

快速上手
-----------------
先决条件
- Node.js（推荐 14+）
- npm

安装依赖
```bash
cd jingdongdelivery
npm install
```

开发运行
```bash
npm run serve
```
默认本地地址：`http://localhost:8080`。若需要与本地后端联调，请确认 `src/utils/request.js` 的 `baseURL` 指向后端（含端口），并保持 `withCredentials: true` 以便携带 HttpOnly cookie。

构建（生产）
```bash
npm run build
```

项目要点
-----------------
- 网络请求：`src/utils/request.js` 封装了 axios，支持自动刷新 accessToken（通过后端 HttpOnly refreshToken）
- 登录流程：登录成功后前端保存 `accessToken`（本地存储），后端通过 HttpOnly cookie 管理 refreshToken
- 图片懒加载：全局 `v-lazy` 指令（基于 Intersection Observer）
- 防抖/节流：提供 `debounce` 与 `throttle` 用于高频事件防护
- 状态管理：Vuex 管理购物车、用户等状态并持久化到 localStorage

与后端联调注意事项
- 确保 `baseURL` 与后端端口一致（例如 `http://192.168.1.2:3001`）
- 要求后端 CORS 允许前端 origin 且 `credentials: true`，前端 axios 使用 `withCredentials: true`
- cookie 的跨域策略：开发环境下后端应将 refreshToken cookie 配置为 `sameSite: 'lax'` 和 `secure: false`（HTTP），生产环境使用 `sameSite: 'none'` 和 `secure: true`（HTTPS）

目录结构（核心）
```
src/
├── main.js
├── App.vue
├── router/
├── store/
├── utils/
│   ├── request.js
│   ├── debounce.js
│   ├── throttle.js
│   └── lazyLoad.js
├── components/
└── views/
```

常见操作示例
```javascript
import { post } from '@/utils/request'

// 登录
const res = await post('/api/user/login', { username, password })

// 获取地址列表
const list = await get('/api/user/address')
```

常见问题
- 登录失败但后端返回 200：检查后端返回的 JSON 结构，前端期望 `errno === 0` 表示成功，且 `data.accessToken` 存在
- 跨域问题：确保后端与前端都配置了 `withCredentials` 与 `credentials: true`，并且 `baseURL` 使用正确的 IP/端口/协议
- secure cookie 在 HTTP 下失败：在本地开发请勿将 `secure` 设为 `true`

如何切换到真实后端
在 `src/utils/request.js` 中修改 `baseURL`：
```javascript
const instance = axios.create({
  baseURL: 'http://192.168.1.2:3001',
  withCredentials: true
})
```

贡献与联系
- 欢迎提交 Issue/PR
- 如需我帮助生成 API 文档或对接部署流水线，我可以继续协助

---

以上为 `jingdongdelivery` 的简明 README，已覆盖联调和常见问题。若希望我把 README 用更详细的 API 调用示例或截图补充进去，请告诉我要补充的部分。
├── utils/
