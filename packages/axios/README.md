### 添加引用

```shell
pnpm  i  @vtd/axios axios qs mitt
```

### 添加 setup

```typescript
import { App } from "vue"

import api from "@vtd/axios"

/**
 * 初始化Api组件
 *
 * @export
 * @param {App<Element>} app  App<Element>
 */
export function setupApi(app: App<Element>): void {
	app.config.globalProperties.$api = api
	app.provide("$api", api)
}
```

### 订阅事件

```typescript
import { listenerRequest } from "@vtd/axios"

listenerRequest(error => {
	if (error && error.response) {
		// 服务层错误
		switch (error.response.status) {
			case 400:
				error.message = "请求错误"
				break
			case 401:
				error.message = "未授权"
				break
			case 403:
				error.message = "拒绝访问"
				break
			case 404:
				error.message = `请求地址出错: ${error.response.config.url}`
				break
			case 408:
				error.message = "请求超时"
				break
			case 500:
				error.message = "服务器内部错误"
				break
			case 501:
				error.message = "服务未实现"
				break
			case 502:
				error.message = "网关错误"
				break
			case 503:
				error.message = "服务不可用"
				break
			case 504:
				error.message = "网关超时"
				break
			case 505:
				error.message = "HTTP版本不受支持"
				break
			default:
		}
	} else {
		error.message = "请求未响应"
	}

	console.log(error.message)
})
```

### 重载实例

```typescript
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
```

### 自定义拦截器

```typescript
import { AxiosRequestConfig } from "axios"
import api from "@vtd/axios"

api.request({
	// 单次拦截器
	interceptors: {
		// 请求拦截器
		requestInterceptors(config: AxiosRequestConfig): AxiosRequestConfig {
			return config
		}
	}
})

// 自定义请求拦截器-全局请求拦截器-全局响应拦截器-自定义响应拦截器
```

