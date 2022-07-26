import Request from "./request"
import { AxiosResponse, AxiosRequestConfig } from "axios"
import { setRequestListener } from "./hooks/useRequest"
import defaultSetting from "./setting"
import { IRequsetSetting } from "./types"

const install = (options?: Partial<IRequsetSetting>) => {
	let setting: IRequsetSetting
	if (options) {
		setting = Object.assign({}, defaultSetting, options)
	} else {
		setting = defaultSetting
	}

	return new Request({
		baseURL: import.meta.env.BASE_URL,
		timeout: 1000 * 60 * 5,
		interceptors: {
			// 请求拦截器
			requestInterceptors: (config: AxiosRequestConfig) => {
				// baseURL
				if (setting.baseURL) {
					const baseURL = import.meta.env[setting.baseURL]
					if (baseURL) {
						config.baseURL = import.meta.env[setting.baseURL]
					}
				}

				// timeout
				if (setting.timeout) {
					config.timeout = setting.timeout
				}

				// jwt
				if (!setting.token) {
					const token = window.sessionStorage.getItem("token") ?? window.localStorage.getItem("token")
					if (token) {
						config.headers!.Authorization = "Bearer " + token
					}
				}

				// attach
				if (setting.attaches.length > 0) {
					setting.attaches.forEach(e => {
						const attach = window.sessionStorage.getItem(e) ?? window.localStorage.getItem(e)
						if (attach) {
							config.headers![attach] = attach
						}
					})
				}

				return config
			},
			// 响应拦截器
			responseInterceptors: (result: AxiosResponse) => {
				if (setting.parser) {
					return setting.parser(result)
				}
				return result
			},
			// 响应错误拦截
			responseInterceptorsCatch(err) {
				setRequestListener(err)
			}
		}
	})
}

export default install
