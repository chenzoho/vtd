import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		dts({
			outputDir: ["dist/types"],
			exclude: ["src"],
			logDiagnostics: true
		}),
		vue()
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, "lib/main.ts"),
			name: "vtd",
			fileName: format => `vtd.${format}.js`
		},
		sourcemap: true,
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ["console.log"]
			},
			output: {
				comments: true
			}
		},
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
