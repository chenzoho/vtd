import type Modal from "./modal.vue"
import { ExtractPropTypes, PropType } from "vue"
import { VxeModalPropTypes } from "vxe-table"
import modalSetting from "./setting"

export const modelProps = {
	loading: { type: Boolean as PropType<VxeModalPropTypes.Loading>, default: null },
	width: { type: Number, default: () => modalSetting.minWidth }
}

export type ModalProps = ExtractPropTypes<typeof modelProps>

export type ModalInstance = InstanceType<typeof Modal>
