<template>
	<vxe-modal ref="modal" v-bind="{ ...attach, ...$props, ...$attrs }">
		<template #title>
			<slot name="title"></slot>
		</template>
		<template #default>
			<el-form ref="form1" :model="form" label-width="120px">
				<slot></slot>
			</el-form>
		</template>
		<template #footer>
			<el-button-group>
				<el-button type="primary" @click="comfirm" :loading="loading">确认</el-button>
				<el-button @click="reset">重置</el-button>
				<el-button @click="cancel">取消</el-button>
			</el-button-group>
		</template>
	</vxe-modal>
</template>

<script lang="ts" setup name="AppFormModal">
import { computed, ref } from "vue"
import { VxeModalInstance } from "vxe-table"
import { fromModelProps } from "./modal"
import { ElButton, ElButtonGroup, ElForm } from "element-plus"
import type { FormInstance } from "element-plus"

const modal = ref<VxeModalInstance>()
const form1 = ref<FormInstance>()

const props = defineProps(fromModelProps)
let loading = ref(props.loading)
const attach = computed(() => {
	return { loading: loading.value }
})

// 打开
const open = async () => {
	loading.value = true
	modal.value?.open()
	if (props.proxy && props.proxy.query) {
		await props.proxy.query({ form: props.form, $form: form1 })
	}
	loading.value = false
}

//	保存
const comfirm = async () => {
	loading.value = true
	if (props.proxy && props.proxy.save) {
		const result = await props.proxy.save({ form: props.form, $form: form1 })
		if (result) modal.value?.close()
	}
	loading.value = false
}

// 重置
const reset = () => {
	form1.value?.resetFields()
}

//	取消
const cancel = () => {
	modal.value?.close()
}

defineExpose({ open })
</script>
