<!-- 
/**
 * @Author: 老林头
 * @Date: 2020-11-4 15:33:11
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain: input组件
 * @ChildComponents:
 */ -->
<template>
	<div>
		<!-- 	小程序不兼容		v-bind="$attrs" -->
		<input
			:value="value"
			class="uni-input"
			:placeholder='placeholder'
			ref="input"
			@focus="handleFocus"
			@blur="handleBlur"
			@input="handleInput"
			@change="handleChange"
		/>
	</div>
</template>

<script>
import emitter from '@/mixins/emitter.js';
export default {
	name: 'IuInput',

	componentName: 'IuInput',
	mixins: [emitter],
	components: {},
	props: {
		value: [String, Number],
		placeholder: String
	},
	data() {
		return {};
	},
	//监听属性 类似于data概念
	computed: {},
	watch: {
		value(val) {
			// console.log(val)
			// this.$nextTick(this.resizeTextarea);
			// if (this.validateEvent) {
			this.dispatch('IuFormItem', 'form-change', [val]);
			// }
		}
		// nativeInputValue() {
		// 	this.setNativeInputValue();
		// }
	},
	//方法集合
	methods: {
		setNativeInputValue() {
			const input = this.getInput();
			if (!input) return;
			if (input.value === this.nativeInputValue) return;
			input.value = this.nativeInputValue;
		},
		getInput() {
			return this.$refs.input;
		},
		handleFocus(event) {
			// this.focused = false;
			this.$emit('focus', event);
		},
		handleBlur(event) {
			// this.focused = false;
			this.$emit('blur', event);
			// if (this.validateEvent) {
			this.dispatch('IuFormItem', 'form-blur', [this.value]);
			// }
		},
		handleInput(event) {
			this.$emit('input', event.target.value);
		},
		handleChange(event) {
			this.$emit('change', event.target.value);
		}
	},
	created() {
		// console.log(this.$props)
	},
	mounted() {
		// this.setNativeInputValue();
	},
	beforeCreate() {},
	beforeMount() {},
	beforeUpdate() {},
	updated() {},
	beforeDestroy() {},
	destroyed() {}
};
</script>
<style lang="less" scoped>
// @import url();
</style>
