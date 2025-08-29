# WUCW Pet Frontend

一个基于 Vue 3 + TypeScript + Element Plus 的宠物相关前端项目。

## 功能特性

- 🚀 Vue 3 + TypeScript + Vite
- 🎨 Element Plus UI 组件库
- 📱 响应式设计
- 🔐 完整的用户认证系统
- 🛡️ 路由守卫和权限控制
- 📦 Pinia 状态管理

## 登录系统

### 功能说明

项目实现了完整的用户认证系统，包括：

1. **登录界面**：使用 Element Plus 的表单组件，支持用户名/密码登录
2. **Token 管理**：自动管理 JWT token，支持过期检查
3. **路由守卫**：自动检查登录状态，未登录用户自动跳转到登录页
4. **用户状态管理**：使用 Pinia 管理用户登录状态和信息
5. **HTTP 拦截器**：自动添加 token 到请求头，处理 401 错误

### 使用方法

#### 1. 登录

访问 `/login` 页面，输入用户名和密码进行登录。

#### 2. 自动跳转

- 未登录用户访问需要认证的页面会自动跳转到登录页
- 已登录用户访问登录页会自动跳转到首页

#### 3. 登出

点击导航栏右上角的用户头像，选择"退出登录"即可登出。

### API 接口

#### 登录接口

```typescript
POST /api/user/login
{
  "username": "string",
  "password": "string"
}
```

#### 响应格式

```typescript
{
  "token": "string",
  "user": {
    "userid": "string",
    "username": "string",
    "usertype": "string",
    "phone": "string",
    "gender": "string",
    "birthday": "Date | null",
    "avatar": "string"
  }
}
```

## 开发环境

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── components/          # 组件
│   ├── Nav.vue         # 导航组件（包含用户信息）
│   └── Home/           # 首页相关组件
├── views/              # 页面
│   ├── LoginView.vue   # 登录页面
│   ├── HomeView.vue    # 首页
│   ├── AboutView.vue   # 关于页面
│   └── SettingsView.vue # 设置页面
├── stores/             # 状态管理
│   ├── user.ts         # 用户状态管理
│   └── counter.ts      # 计数器状态
├── router/             # 路由配置
│   └── index.ts        # 路由守卫和配置
├── utils/              # 工具函数
│   ├── auth.ts         # 认证工具
│   ├── http.ts         # HTTP 拦截器
│   └── apis/           # API 接口
└── assets/             # 静态资源
```

## 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **语言**: TypeScript
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **HTTP 客户端**: Axios
- **样式预处理**: SCSS

## 注意事项

1. 确保后端 API 接口正确配置
2. Token 默认过期时间为 24 小时
3. 所有需要认证的路由都添加了 `requiresAuth: true` 元信息
4. 登录成功后会自动跳转到首页

## 许可证

MIT License
