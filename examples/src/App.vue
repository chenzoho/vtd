<template>
	<vxe-button content="默认颜色" @click="openModal"></vxe-button>
	<app-form-modal ref="modal1" v-bind="save" show-footer min-height="200px">
		<template #title> title </template>
		<span>default</span>
	</app-form-modal>
</template>
<script setup lang="ts">
// 1
import { reactive, ref } from "vue"
import { AppFormModal } from "@vtd/vtd"
import type { ModalInstance } from "@vtd/vtd"

const modal1 = ref<ModalInstance>()
const openModal = () => {
	modal1.value?.open()
}

const save = reactive({
	form: { id: 1, name: "lilei" },
	proxy: {
		save: async () => {
			console.log(1)
			return true
		}
	}
})
</script>
