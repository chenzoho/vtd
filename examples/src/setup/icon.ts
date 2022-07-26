import "virtual:svg-icons-register"
import { App } from "vue"
import { AppIcon } from "@vtd/icon"

/**
 * 初始化Icon组件
 *
 * @export
 * @param {App<Element>} app  App<Element>
 */
export function setupIcon(app: App<Element>): void {
	app.use(AppIcon)
}
