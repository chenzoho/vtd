import type FormModal from "./modal.vue"
import { ExtractPropTypes, PropType, Ref } from "vue"

export interface ProxyConfig {
	query?(params: ProxyParams, ...args: any[]): Promise<void>
	save?(params: ProxyParams, ...args: any[]): Promise<boolean>
}

export interface ProxyParams {
	form: any
	$form: Ref
}

export const fromModelProps = {
	/** 加载 */
	loading: { type: Boolean as PropType<boolean> },
	/** 表单 */
	form: { type: Object as PropType<any> },
	/** 链接 */
	proxy: { type: Object as PropType<ProxyConfig> }
}

export type FormModalProps = ExtractPropTypes<typeof fromModelProps>

export type FormModalInstance = InstanceType<typeof FormModal>
