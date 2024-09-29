/*
 * @Author: yjl
 * @Date: 2024-08-21 21:06:50
 * @LastEditors: yjl
 * @Description: 描述
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: "mock", // mock 文件夹路径
      localEnabled: true, // 开发环境下启用
      // injectCode: `
      // import { setupProdMockServer } from '../mock/_createProductionServer';
      
      // setupProdMockServer();
      // `,
    }),
  ],
});

