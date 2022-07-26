import type { AxiosRequestConfig } from "axios"
export interface RequestInterceptors {
	// 请求拦截
	requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
	requestInterceptorsCatch?: (err: any) => any
	// 响应拦截
	responseInterceptors?: (config: any) => any
	responseInterceptorsCatch?: (err: any) => any
}
// 自定义传入的参数
export interface RequestConfig extends AxiosRequestConfig {
	interceptors?: RequestInterceptors
}

/** 通用返回结果 */
export interface OperationResult<T = any> {
	/** 状态码 */
	status: number
	/** 消息 */
	msg: string
	/** 结果 */
	data?: T
	/** 是否成功 */
	isSucceed: boolean
}

/** 请求默认设置  */
interface IRequsetSetting {
	/** baseUrl环境变量 */
	baseURL: string
	/** 超时时间 */
	timeout: number
	/** token标识 */
	token: string
	/** 附加数据 */
	attaches: Array<string>
	/** 默认数据解析器 */
	parser: (res: any) => any
}
