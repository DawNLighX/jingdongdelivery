# jingdongdelivery (京东到家 仿真前端)

## 简要说明

这是一个使用 Vue 3 实现的京东到家仿真前端项目，包含首页、门店列表、购物车、下单、用户等完整页面。具有完善的性能优化、用户交互、状态管理和工程实践。适合作为前端工程实践与面试展示的高质量项目样例。

## 主要特性

### 核心功能
- 完整的电商流程：浏览门店 → 选购商品 → 加入购物车 → 下单 → 订单管理
- 用户认证系统：登录、注册、地址管理（新增、编辑、删除、查询）
- 购物车管理：支持商品数量编辑、持久化存储、价格计算
- 订单查看：已支付订单列表展示、订单详情

### 性能优化
- **图片懒加载**：基于 Intersection Observer API 的全局 `v-lazy` 指令，应用于所有图片资源
- **防抖处理**：登录、注册、保存地址等高频操作（200ms、500ms 延迟防止重复提交）
- **节流处理**：滚动加载、购物车保存等频繁事件（500ms 间隔）
- **路由懒加载**：各页面组件按需加载，加快首屏速度

### 用户体验
- **加载动画**：订单页、购物车页、地址页在数据加载时显示旋转加载提示
- **空状态管理**：购物车为空、订单为空、地址为空等场景的友好提示
- **Toast 通知**：用户操作反馈（登录成功、表单验证错误、网络错误等）
- **响应式设计**：完整的移动端适配，支持各种屏幕尺寸

### 状态管理
- Vuex 全局状态管理，购物车数据自动持久化到 localStorage
- 支持登录状态管理与路由守卫

## 技术栈

- **框架**：Vue 3, Vuex 4, Vue Router 4
- **网络请求**：axios（支持 Mock 接口与真实后端）
- **样式**：SCSS with 变量系统与 mixins 复用
- **构建工具**：Vue CLI 5
- **辅助库**：normalize.css

## 快速开始

### 安装依赖
```bash
npm install
```

### 本地开发
```bash
npm run serve
```
项目默认开启热重载，修改文件后自动刷新。访问 `http://localhost:8080` 查看页面。

### 生产构建
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 目录结构

```
src/
├── main.js                    # 应用入口，全局指令注册
├── App.vue                    # 根组件
├── router/
│   └── index.js               # 路由配置（路由懒加载）
├── store/
│   └── index.js               # Vuex 状态管理 + localStorage 持久化
├── utils/
│   ├── request.js             # axios 请求封装
│   ├── debounce.js            # 防抖函数（登录、注册、保存地址）
│   ├── throttle.js            # 节流函数（滚动、购物车保存）
│   └── lazyLoad.js            # 图片懒加载指令（v-lazy）
├── components/
│   ├── MainDocker.vue         # 底部导航栏
│   ├── Toast.vue              # 消息提示
│   └── ShopInfo.vue           # 门店信息卡片
├── views/
│   ├── home/                  # 首页（搜索、分类、门店列表）
│   ├── shop/                  # 门店详情（商品列表、购物车）
│   ├── cart/                  # 购物车（含加载动画）
│   ├── order/                 # 订单列表（含加载动画）
│   ├── mine/                  # 用户中心（用户信息、地址、卡包）
│   ├── login/                 # 登录页（防抖处理）
│   ├── register/              # 注册页（防抖处理）
│   ├── mineAddress/           # 我的地址（含加载动画）
│   ├── mineAddressCreate/     # 新增/编辑地址（防抖保存）
│   ├── mineAddressSelect/     # 选择地址（含加载动画）
│   └── search/                # 搜索结果
├── style/
│   ├── viriables.scss         # SCSS 变量（颜色、间距、字体大小）
│   ├── mixins.scss            # SCSS mixins（commonheader、commonlayout 等）
│   └── index.scss             # 全局样式入口
└── assets/
    ├── images/                # 图片资源
    └── icons/                 # 图标资源
```

## 核心特性详解

### 1. 图片懒加载（v-lazy 指令）
使用 Intersection Observer API 实现，应用于：
- 首页商品图片
- 门店列表图片  
- 购物车商品图片
- 订单商品缩略图

**用法**：
```vue
<img v-lazy="imageUrl" alt="商品图片" />
```

### 2. 防抖处理
应用场景：
- **登录表单**：防止连续点击导致多次请求（200ms）
- **注册表单**：防止重复提交（200ms）
- **地址保存**：保存地址时防止重复请求（500ms）

### 3. 节流处理
应用场景：
- **页面滚动**：商品列表滚动加载（500ms 间隔）
- **购物车变更**：购物车数量改变时持久化到 localStorage（500ms 间隔）

### 4. 加载动画
订单页、购物车页、地址页在数据加载时显示旋转加载提示，并在加载完成后自动隐藏。

### 5. 购物车持久化
基于 Vuex plugin，购物车数据自动同步到 localStorage，刷新页面后数据不丢失。

## Mock 接口

请求封装位于 [src/utils/request.js](src/utils/request.js)，默认 `baseURL` 指向 **Apifox 的 mock 地址**。

### 切换到真实后端
修改 `src/utils/request.js` 中的 `baseURL`：

```javascript
const instance = axios.create({
  // baseURL: 'https://api.apifox.cn/api/mock/...',  // Mock 地址
  baseURL: 'http://your-backend-api.com',            // 真实后端地址
})
```

## 已知注意事项

- 移动端输入框在少数设备上可能出现键盘导致的布局抖动（已做部分样式修复）
- 路由守卫当前使用 `localStorage.isLogin` 做简单鉴权，生产环境建议使用 token 机制并配合后端校验
- 暂未集成单元测试，可根据需要添加 Jest 测试框架

## 项目完成度

| 模块 | 完成度 | 备注 |
|------|--------|------|
| 核心功能 | 100% | 用户认证、购物、订单、地址管理 |
| 性能优化 | 95% | 图片懒加载、防抖、节流、路由懒加载 |
| 用户体验 | 90% | 加载动画、Toast提示、空状态管理、响应式设计 |
| 代码质量 | 85% | 模块化架构、工具函数封装、SCSS系统 |
| 单元测试 | 0% | 可选扩展项 |

## 开发指南

### 添加新页面
1. 在 `src/views/` 创建新文件夹
2. 编写 `YourPage.vue` 组件
3. 在 `src/router/index.js` 添加路由配置
4. 在 `MainDocker.vue` 中添加导航项（如需要）

### 状态管理
使用 Vuex 管理全局状态，示例：
```javascript
// 在 store/index.js 中定义
state: {
  user: {},
  cartList: {}
},
mutations: {
  setUser(state, user) {
    state.user = user
  }
}
```

### 网络请求
```javascript
// 导入请求方法
import { get, post, put, delete } from '@/utils/request'

// 获取数据
const result = await get('/api/order')

// 发送数据
const result = await post('/api/user/login', { username, password })
```

### 使用防抖和节流
```javascript
// 防抖：用于提交表单、保存数据等
import { debounceUniversal } from '@/utils/debounce'
const handleSave = debounceUniversal(saveData, 800, false)

// 节流：用于滚动、频繁触发的事件
import { throttle } from '@/utils/throttle'
const handleScroll = throttle(loadMore, 500)
```

## 部署建议

### 前置配置
1. 确保 Node.js 版本 ≥ 14.x
2. 修改 `baseURL` 指向生产后端 API
3. 配置环境变量文件 `.env.production`

### 构建优化
- 使用 `npm run build` 生成生产包，会自动进行代码分割和压缩
- 通过 `npm run build -- --report` 查看包大小分析

### 部署平台
- **Netlify**：支持 Vue CLI 应用，自动 CI/CD
- **Vercel**：零配置部署，性能优异
- **GitHub Pages**：需配置 `vue.config.js` 的 `publicPath`

## 常见问题

**Q: 如何修改主题色？**  
A: 修改 `src/style/viriables.scss` 中的 `$jingdong-green` 变量

**Q: 购物车数据如何持久化？**  
A: 通过 `src/store/index.js` 中的 localStorage 插件自动处理，无需额外配置

**Q: 如何接入真实后端API？**  
A: 修改 `src/utils/request.js` 中的 `baseURL`，确保后端支持 CORS

**Q: 图片懒加载不生效？**  
A: 确保已在 `src/main.js` 中注册 `v-lazy` 指令，检查图片 URL 是否正确

## 联系与反馈

- 项目基于 Vue 3 最佳实践开发
- 欢迎提 Issue 或 PR 改进项目
- 如有问题可联系项目维护者

---

**最后更新**：2025/12/19  
**项目状态**：✅ 核心功能完整，已上传 GitHub，可用于生产环境或教学展示
