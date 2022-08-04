<template>
	<vxe-modal ref="modal" v-bind="{ ...props, ...$props, ...$attrs }">
		<template #title>
			<slot name="title"></slot>
		</template>
		<template #default>
			<slot></slot>
		</template>
		<template #footer>
			<slot name="footer"></slot>
		</template>
	</vxe-modal>
</template>

<script lang="ts" setup name="VtdModal">
import { ref } from "vue"
import { VxeModalInstance } from "vxe-table"
import { modelProps } from "./modal"
import modalSetting from "./setting"

// const modal = ref(null)
const modal = ref<VxeModalInstance>()
defineProps(modelProps)

const props = modalSetting

const open = () => {
	modal.value?.open()
}

defineExpose({ open })
</script>
