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
