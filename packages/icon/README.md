添加引用

```shell
pnpm  i  @vtd/icon element-plus  @purge-icons/generated
```

### 添加外部依赖

```shell
// 安装开发依赖
pnpm i  unplugin-icons  unplugin-auto-import  unplugin-vue-components vite-plugin-svg-icons -D

// 安装需要的icon
pnpm i  @iconify-json/ep
```

### 修改vite

```typescript
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path, { resolve } from "path"

import vueJsx from "@vitejs/plugin-vue-jsx"
import setupExt from "vite-plugin-vue-setup-extend"
import { viteMockServe } from "vite-plugin-mock"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import Components from "unplugin-vue-components/vite"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

//	see https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		setupExt(),
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
```

### 添加setup

```typescript
import "virtual:svg-icons-register"
import { App } from "vue"
import AppIcon from "@vtd/icon"
import "@vtd/icon/dist/index.css"

/**
 * 初始化Icon组件
 *
 * @export
 * @param {App<Element>} app  App<Element>
 */
export function setupIcon(app: App<Element>): void {
	app.use(AppIcon)
}
```

