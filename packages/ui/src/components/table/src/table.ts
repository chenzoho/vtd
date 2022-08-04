import type AppTable from "./table.vue"
import { ExtractPropTypes, PropType } from "vue"

export const appTableProps = {
	loading: { type: Boolean as PropType<boolean>, default: false },
	check: { type: Boolean as PropType<boolean>, default: false },
	radio: { type: Boolean as PropType<boolean>, default: false }
}

export type AppTableProps = ExtractPropTypes<typeof appTableProps>

export type AppTableInstance = InstanceType<typeof AppTable>
