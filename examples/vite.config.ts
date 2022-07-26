import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path, { resolve } from "path"

import jsx from "@vitejs/plugin-vue-jsx"
import ext from "vite-plugin-vue-setup-extend"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import Components from "unplugin-vue-components/vite"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

//	see https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		jsx(),
		ext(),
		// add
		Icons({ compiler: "vue3" }),
		// iconify
		Components({
			resolvers: [
				IconsResolver({
					prefix: "icon",
					enabledCollections: ["ep"]
				})
			]
		}),
		// custom
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [path.resolve(process.cwd(), "src/assets/icon")],
			// 指定symbolId格式
			symbolId: "icon-[dir]-[name]"
		})
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src")
		}
	}
})
