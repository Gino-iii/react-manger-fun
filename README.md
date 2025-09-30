# React Manager Fun

一个基于 React 18 + TypeScript + Ant Design 的现代化后台管理系统。

## 技术栈

- **React 18** - 最新的 React 版本
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速的构建工具
- **Ant Design** - 企业级 UI 组件库
- **React Router** - 路由管理
- **Zustand** - 轻量级状态管理
- **Axios** - HTTP 请求库

## 项目结构

```
src/
├── components/          # 公共组件
│   └── Layout/         # 主布局组件
├── views/              # 页面组件
│   ├── Dashboard/      # 仪表盘
│   ├── Login/          # 登录页
│   ├── UserManagement/ # 用户管理
│   └── NotFound/       # 404页面
├── store/             # 状态管理
│   └── authStore.ts    # 认证状态
├── utils/              # 工具函数
│   └── request.ts      # HTTP请求封装
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 功能特性

- ✅ 用户认证与授权
- ✅ 响应式布局
- ✅ 路由管理
- ✅ 状态管理
- ✅ 用户管理 CRUD
- ✅ 仪表盘统计
- ✅ 现代化 UI 设计

## 快速开始

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

### 代码检查

```bash
npm run lint
```

## 开发说明

### 默认登录账号

- 用户名：admin
- 密码：admin

### 环境配置

项目已配置开发环境代理，API 请求会自动代理到 `http://localhost:8080`。

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 代码规范
- 使用 Prettier 进行代码格式化

## 部署

构建完成后，将 `dist` 目录下的文件部署到 Web 服务器即可。

## 许可证

MIT 
