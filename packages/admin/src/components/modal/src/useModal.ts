import type { InjectionKey, ComputedRef, Ref } from "vue"
import { createContext, useContext } from "../../utils/useContext"

export interface ModalContextProps {
	// 是否加载中
	loading: ComputedRef<boolean>
	// 设置加载中
	setLoading: (height: boolean) => Promise<void>
	// 高度
	heigth: Ref<number>
	// 宽度
	width: Ref<number>
	// 设置大小
	setSize: (width: number, height: number) => Promise<void>
}

const key: InjectionKey<ModalContextProps> = Symbol()

export function createModalContext(context: ModalContextProps) {
	return createContext<ModalContextProps>(context, key, { native: true })
}

export function useModalContext() {
	return useContext<ModalContextProps>(key)
}
