import axios from "axios"
import qs from "qs"
import type { AxiosInstance } from "axios"
import type { RequestConfig, RequestInterceptors } from "../types"

class Request {
	/**axios实例 */
	instance: AxiosInstance
	/**拦截器对象 */
	interceptorsObj?: RequestInterceptors

	/** 构造函数 */
	public constructor(config: RequestConfig) {
		this.instance = axios.create(config)
		this.interceptorsObj = config.interceptors
		// 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应

		// 使用实例拦截器
		this.instance.interceptors.request.use(this.interceptorsObj?.requestInterceptors, this.interceptorsObj?.requestInterceptorsCatch)
		this.instance.interceptors.response.use(this.interceptorsObj?.responseInterceptors, this.interceptorsObj?.responseInterceptorsCatch)
	}
	/**处理请求 */
	private handlerRequest(config: RequestConfig): void {
		// 如果请求有单独的拦截器,处理拦截器
		if (config.interceptors?.requestInterceptors) {
			config = config.interceptors.requestInterceptors(config)
		}
	}
	/**处理响应 */
	private handlerResponse(config: RequestConfig, response: any): any {
		if (config.interceptors?.responseInterceptors) {
			response = config.interceptors.responseInterceptors(response)
		}
		return response
	}
	/**处理除外 */
	private handlerError(config: RequestConfig, error: any): void {
		if (config.interceptors?.responseInterceptorsCatch) {
			config.interceptors.responseInterceptorsCatch(error)
		}
	}
	/**
	 *通用请求
	 *
	 * @template T
	 * @param {RequestConfig} config
	 * @return {*}  {Promise<T>}
	 * @memberof Request
	 */
	request<T>(config: RequestConfig): Promise<T> {
		return new Promise(async (resolve, reject) => {
			try {
				this.handlerRequest(config)
				let res = await this.instance.request<any, T>(config)
				res = this.handlerResponse(config, res) as unknown as Awaited<T>
				resolve(res)
			} catch (error) {
				this.handlerError(config, error)
				reject(error)
			}
		})
	}
	/**
	 * Get请求
	 *
	 * @param {string} url  地址
	 * @param {object} [params=null] url参数
	 * @returns  Promise
	 * @memberof Api
	 */
	get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
		return this.request({
			url: url,
			params: params,
			paramsSerializer: params => {
				return qs.stringify(params, { indices: false })
			}
		})
	}
	/**
	 * Post请求[application/json]
	 *
	 * @param {''} url  地址
	 * @param {{}} [data=null] body参数
	 * @param {{}} [params=null] url参数
	 * @returns  响应结果
	 * @memberof Api
	 */
	post<T>(url: string, data?: Record<string, unknown>, params?: Record<string, unknown>): Promise<T> {
		return this.request({
			url: url,
			data: data,
			params: params,
			paramsSerializer: params => {
				return qs.stringify(params, { indices: false })
			}
		})
	}
	/**
	 * Put请求
	 *
	 * @param {''} url  地址
	 * @param {FormData} [data=null] body参数
	 * @param {{}} [params=null] url参数
	 * @param {{}} [type=null]  Content-Type
	 * @returns  响应结果
	 * @memberof Api
	 */
	put<T>(url: string, data?: Record<string, unknown>, params?: Record<string, unknown>): Promise<T> {
		// application/json
		return this.request({
			url: url,
			data: data,
			params: params,
			paramsSerializer: params => {
				return qs.stringify(params, { indices: false })
			}
		})
	}
	/**
	 * Delete请求
	 *
	 * @param {string} url  地址
	 * @param {{}} [params=null] url参数
	 * @returns  Promise
	 * @memberof Api
	 */
	delete<T>(url: string, params?: Record<string, unknown>): Promise<T> {
		return this.request({
			url: url,
			params: params,
			paramsSerializer: params => {
				return qs.stringify(params, { indices: false })
			}
		})
	}
}

export { Request, RequestConfig, RequestInterceptors }
