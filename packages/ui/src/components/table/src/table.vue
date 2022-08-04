<template>
	<vxe-grid ref="grid" v-bind="{ ...props, ...$props, ...$attrs }">
		<template #empty><slot name="empty"></slot></template>
		<template #form><slot name="form"></slot></template>
		<template #toolbar><slot name="toolbar"></slot></template>
		<template #top><slot name="top"></slot></template>
		<template #bottom><slot name="bottom"></slot></template>
		<template #pager><slot name="pagers"></slot></template>
	</vxe-grid>
</template>

<script lang="ts" setup name="AppTable">
import { ref } from "vue"
import { VxeGridInstance } from "vxe-table"
import { appTableProps } from "./table"

const grid = ref<VxeGridInstance>()

defineProps(appTableProps)

const refresh = () => {
	grid.value?.commitProxy("query")
}

defineExpose({ refresh })
</script>
