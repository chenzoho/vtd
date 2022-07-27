import { App } from "vue"

import { api } from "@vtd/axios"
import api1 from "./api1"

import "./subscriber"

/**
 * 初始化Api组件
 *
 * @export
 * @param {App<Element>} app  App<Element>
 */
export function setupApi(app: App<Element>): void {
	app.config.globalProperties.$api = api
	app.provide("$api", api)
	app.provide("$api1", api1)
}
