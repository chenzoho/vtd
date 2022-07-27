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
			name: "vtd.axios",
			fileName: format => `vtd.axios.${format}.js`
		},
		sourcemap: true,
		// minify: "terser",
		// terserOptions: {
		// 	compress: {
		// 		drop_console: true,
		// 		drop_debugger: true
		// 	},
		// 	keep_classnames: true
		// },
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ["vue", "axios", "qs", "mitt"],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: "Vue"
				}
			}
		}
	}
})
