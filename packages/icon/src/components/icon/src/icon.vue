<script setup lang="ts" name="AppIcon">
import { computed, unref, ref, watch, nextTick, PropType } from "vue"
import { ElIcon } from "element-plus"
import Iconify from "@purge-icons/generated"
const prefixCls = "app-icon"
const props = defineProps({
	// icon name
	icon: {
		type: String,
		required: true
	},
	// icon color
	color: {
		type: [String, undefined] as PropType<string | undefined>,
		default: undefined
	},
	// icon size
	size: {
		type: Number,
		default: 16
	}
})
const elRef = ref<ElRef>(null)
const isLocal = computed(() => props.icon.startsWith("svg:"))
const symbolId = computed(() => {
	return unref(isLocal) ? `#icon-${props.icon.split("svg:")[1]}` : props.icon
})
const getIconifyStyle = computed(() => {
	const { color, size } = props
	return {
		fontSize: `${size}px`,
		color
	}
})
const updateIcon = async (icon: string) => {
	if (unref(isLocal)) return
	const el = unref(elRef)
	if (!el) return
	await nextTick()
	if (!icon) return
	const svg = Iconify.renderSVG(icon, {})
	if (svg) {
		el.textContent = ""
		el.appendChild(svg)
	} else {
		const span = document.createElement("span")
		span.className = "iconify"
		span.dataset.icon = icon
		el.textContent = ""
		el.appendChild(span)
	}
}
watch(
	() => props.icon,
	(icon: string) => {
		updateIcon(icon)
	}
)
</script>

<template>
	<ElIcon :class="prefixCls" :size="size" :color="color">
		<svg v-if="isLocal" aria-hidden="true">
			<use :xlink:href="symbolId" />
		</svg>

		<span v-else ref="elRef" :class="$attrs.class" :style="getIconifyStyle">
			<span class="iconify" :data-icon="symbolId"></span>
		</span>
	</ElIcon>
</template>
