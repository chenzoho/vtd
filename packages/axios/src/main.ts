import Request, { RequestConfig, RequestInterceptors } from "./request"
import { removeRequestListener, listenerRequest } from "./hooks/useRequest"
import install from "./install"
import { IRequsetSetting } from "./types"
import { App } from "vue"

// let request: Request

export function setupApi(app: App<Element>, options?: Partial<IRequsetSetting>): void {
	request = install(options)
	// app.config.globalProperties.$api = api
	// app.provide("$api", api)
}

// export default request
export { RequestConfig, RequestInterceptors, removeRequestListener, listenerRequest }
