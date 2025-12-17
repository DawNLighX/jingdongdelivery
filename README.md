# jingdongdelivery

## Project setup
# jingdongdelivery (京东到家 仿真前端)

简要说明
--
这是一个使用 Vue 3 实现的京东到家仿真前端项目，包含首页、门店列表、购物车、下单、用户等基本页面。适合作为前端工程实践与面试展示的项目样例。

主要特性
--
- 基于 Vue 3 + Vuex + Vue Router 的单页应用（SPA）架构
- 购物车状态持久化（Vuex plugin 同步到 localStorage）
- axios 封装的请求层，已对接 Apifox Mock 接口
- 响应式布局与移动端适配（SCSS 变量与 mixins）

技术栈
--
- Vue 3, Vuex 4, Vue Router 4
- axios
- SCSS (sass)
- Vue CLI 5 (构建工具)

快速开始（PowerShell）
--
在项目根目录执行：

```powershell
npm install
npm run serve
```

开发与构建
--
- 本地开发：`npm run serve`，默认开启热重载
- 生产打包：`npm run build`
- 代码检查：`npm run lint`

目录说明（关键）
--
- `src/main.js`：应用入口，挂载 router 与 store
- `src/router/index.js`：路由配置（懒加载组件）
- `src/store/index.js`：Vuex 状态管理与持久化插件
- `src/views/`：页面视图（Home, Shop, Cart, Order, Mine, Login 等）
- `src/components/`：可复用组件（MainDocker、Toast、ShopInfo 等）
- `src/assets/`：图片与图标资源
- `src/style/`：全局样式、变量与 mixins

Mock 接口
--
请求封装位于 `src/utils/request.js`，默认 `baseURL` 指向 Apifox 的 mock 地址。如需切换到真实后端，请修改该文件。

已知注意事项
--
- 移动端输入框在少数设备上可能出现键盘导致的布局抖动（已做部分样式修复）；若需要我可以继续定位并提供兼容方案。
- 路由守卫当前使用 `localStorage.isLogin` 做简单鉴权，生产环境建议使用 token 机制并配合后端校验。

如何贡献 / 运行测试
--
1. Fork 本仓库并克隆
2. 安装依赖：`npm install`
3. 本地运行：`npm run serve`

联系与说明
--
如需我帮你生成项目 README 英文版、部署到 Netlify/Vercel、或为 `store` 添加单元测试（Jest），回复我想要的选项即可。

---
（生成于本地仓库）
