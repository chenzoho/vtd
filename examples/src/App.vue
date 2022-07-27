<template>
	<vxe-button content="默认颜色" @click="openModal"></vxe-button>
	<app-modal ref="modal1" show-footer min-height="200px" @show="open">
		<template #title> title </template>
		<span>default</span>
		<template #footer> footer </template>
	</app-modal>
</template>
<script setup lang="ts">
// 1
import { ref } from "vue"
import { AppModal } from "@vtd/vtd"
import type { ModalInstance } from "@vtd/vtd"

const modal1 = ref<ModalInstance>()
const openModal = () => {
	modal1.value?.open()
}

const open = () => {
	console.log("opne")
}
</script>
