import Request from "@vtd/axios"
import { AxiosResponse, AxiosRequestConfig } from "axios"

/** 默认requst */
const api1 = new Request({
	baseURL: import.meta.env.BASE_URL,
	timeout: 1000 * 60 * 5,
	interceptors: {
		// 请求拦截器
		requestInterceptors: (config: AxiosRequestConfig) => {
			// jwt
			const token = window.sessionStorage.getItem("accessToken") ?? window.localStorage.getItem("accessToken")
			if (token) {
				config.headers!.Authorization = "Bearer " + token
			}

			return config
		},
		// 响应拦截器
		responseInterceptors: (result: AxiosResponse) => {
			return result
		}
	}
})

export default api1
