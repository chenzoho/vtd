import {
	InjectionKey,
	provide,
	inject,
	reactive,
	readonly as defineReadonly,
	// defineComponent,
	UnwrapRef
} from "vue"

/** 上下文对象惨参数 */
export interface CreateContextOptions {
	/** 只读参数 */
	readonly?: boolean
	/** 是否传递 */
	createProvider?: boolean
	/** 是否传递原生数据 */
	native?: boolean
}

type ShallowUnwrap<T> = {
	[P in keyof T]: UnwrapRef<T[P]>
}

/** 创建上下文对象 */
export function createContext<T>(context: any, key: InjectionKey<T> = Symbol(), options: CreateContextOptions = {}) {
	const { readonly = true, createProvider = false, native = false } = options

	const state = reactive(context)
	const provideData = readonly ? defineReadonly(state) : state
	!createProvider && provide(key, native ? context : provideData)

	return {
		state
	}
}

/** 使用上下文对象 */
export function useContext<T>(key: InjectionKey<T>, native?: boolean): T

/** 使用上下文对象 */
export function useContext<T>(key: InjectionKey<T> = Symbol(), defaultValue?: any): ShallowUnwrap<T> {
	return inject(key, defaultValue || {})
}
