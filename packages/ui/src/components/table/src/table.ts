import type AppTable from "./table.vue"
import { VxeGridProps } from "vxe-table"

export const appTableProps: Partial<VxeGridProps> = {
	border: true,
	showHeaderOverflow: true,
	showOverflow: true,
	keepSource: true,
	columnConfig: {
		resizable: true
	},
	sortConfig: {
		trigger: "cell",
		remote: true
	},
	filterConfig: {
		remote: true
	},
	pagerConfig: {
		pageSize: 10,
		pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000]
	}
}

export type AppTableProps = Partial<VxeGridProps>

export type AppTableInstance = InstanceType<typeof AppTable>
