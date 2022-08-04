import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import ext from "vite-plugin-vue-setup-extend"

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		dts({
			outputDir: ["dist/types"],
			// exclude: ["src"],
			logDiagnostics: true
		}),
		ext()
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/main.ts"),
			name: "vtd.admin",
			fileName: format => `vtd.admin.${format}.js`
		},
		sourcemap: true,
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ["vue"],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: "Vue"
				}
			}
		}
	}
})
