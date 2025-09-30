/**
 * Vite构建工具配置文件
 * 配置开发服务器、路径别名、插件等
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 开发服务器配置
  server: {
    host: 'localhost',  // 服务器主机名
    port: 8080,         // 服务器端口号
    proxy: {
      // API代理配置，将/api开头的请求代理到后端服务器
      '/api': 'http://api-driver.marsview.com.cn'
    }
  },
  // 路径解析配置
  resolve: {
    alias: {
      // 配置路径别名，@指向src目录，方便导入模块
      '@': path.resolve(__dirname, './src')
    }
  },
  // 插件配置
  plugins: [react()]  // 使用React插件支持JSX和热更新
}) 
