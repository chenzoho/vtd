import { Request } from "./request"
import { setRequestListener, removeRequestListener, listenerRequest } from "./hooks/useRequest"
import { AxiosResponse, AxiosRequestConfig } from "axios"
import type { RequestConfig, RequestInterceptors } from "./request"

/** 默认requst */
const api = new Request({
	baseURL: import.meta.env.BASE_URL,
	timeout: 1000 * 60 * 5,
	interceptors: {
		// 请求拦截器
		requestInterceptors: (config: AxiosRequestConfig) => {
			// jwt
			const token = window.sessionStorage.getItem("token") ?? window.localStorage.getItem("token")
			if (token) {
				config.headers!.Authorization = "Bearer " + token
			}

			// app
			const system = window.sessionStorage.getItem("system") ?? window.localStorage.getItem("system")
			if (system) {
				config.headers!.system = system
			}

			// app
			const unique = window.sessionStorage.getItem("unique") ?? window.localStorage.getItem("unique")
			if (unique) {
				config.headers!.unique = unique
			}

			return config
		},
		// 响应拦截器
		responseInterceptors: (result: AxiosResponse) => {
			return result
		},
		// 响应错误拦截
		responseInterceptorsCatch(err) {
			setRequestListener(err)
		}
	}
})

export { api, Request, RequestConfig, RequestInterceptors, setRequestListener, removeRequestListener, listenerRequest }
