<!-- 
/**
 * @Author: 老林头
 * @Date: 2020-10-23 17:25:03
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain: 表单元素公共组件
 * @ChildComponents:
 */ -->
<template>
	<div class="form-item" style="">
		<div style="margin-bottom: 6px;">
			<label
				:for="labelFor"
				v-if="label"
				:style="[{ 'font-weight': 600 }, { width: labelStyle }]"
				:class="['label-style', { 'label-required': isRequired }]"
			>
				{{ label }}
			</label>
			<div :style="{ 'margin-left': marginLeft.marginLeft, height: '80rpx' }">
				<slot></slot>
				<transition name="iu-zoom-in-top">
					<slot v-if="isShowMes" name="error" :error="validateMessage">
						<div class="validateMessage">
							<!-- :class="{
								'el-form-item__error--inline':
									typeof inlineMessage === 'boolean' ? inlineMessage : (elForm && elForm.inlineMessage) || false
							}" -->
							{{ validateMessage }}
						</div>
					</slot>
				</transition>
			</div>
		</div>
	</div>
</template>
<script>
import AsyncValidator from 'async-validator';
import Emitter from '@/mixins/emitter.js';
import objectAssign, { noop, getPropByPath } from '@/utils/util';

export default {
	name: 'IuFormItem',
	componentName: 'IuFormItem',
	mixins: [Emitter],
	inject: ['iuForm'],
	props: {
		label: { type: String, default: '' },
		prop: { type: String },
		labelWidth: String,
		required: {
			type: Boolean,
			default: undefined
		},
		rules: [Object, Array]
	},
	data() {
		return {
			isShowMes: false,
			validateMessage: '',
			labelFor: 'input' + new Date().valueOf()
		};
	},
	mounted() {
		if (this.prop) {
			this.dispatch('IuForm', 'form-add', this);
			// 设置初始值
			let initialValue = this.fieldValue;
			if (Array.isArray(initialValue)) {
				initialValue = [].concat(initialValue);
			}
			Object.defineProperty(this, 'initialValue', {
				value: initialValue
			});
			this.addValidateEvents();
		}
	},
	created() {
		this.$on('form-blur', this.onFieldBlur);
		this.$on('form-change', this.onFieldChange);
	},
	// 组件销毁前，将实例从 Form 的缓存中移除
	beforeDestroy() {
		this.dispatch('IuForm', 'form-remove', this);
	},
	computed: {
		labelStyle() {
			const labelWidth = this.labelWidth || this.form.labelWidth;
			if (labelWidth) {
				return labelWidth;
			}
			return '80rpx';
		},
		marginLeft() {
			const ret = {};
			// if (this.form.labelPosition === 'top') return ret;
			const labelWidth = this.labelWidth || this.form.labelWidth;
			if (labelWidth) {
				ret.marginLeft = labelWidth;
			}
			return ret;
		},
		form() {
			let parent = this.$parent;
			let parentName = parent.$options.componentName;
			while (parentName !== 'IuForm') {
				// if (parentName === 'MyFormItem') {
				// 	this.isNested = true;
				// }
				parent = parent.$parent;
				parentName = parent.$options.componentName;
			}
			return parent;
		},
		fieldValue() {
			const model = this.form.model;
			if (!model || !this.prop) {
				return;
			}

			let path = this.prop;
			if (path.indexOf(':') !== -1) {
				path = path.replace(/:/, '.');
			}
			return getPropByPath(model, path, true).v;
		},
		isRequired() {
			let rules = this.getRules();
			let isRequired = false;

			if (rules && rules.length) {
				rules.every(rule => {
					if (rule.required) {
						isRequired = true;
						return false;
					}
					return true;
				});
			}
			return isRequired;
		}
	},
	methods: {
		toJSON() {},
		addValidateEvents() {
			let rules = this.getRules();
			if (rules.length || this.required !== undefined) {
				this.$on('form-blur', this.onFieldBlur);
				this.$on('form-change', this.onFieldChange);
			}
		},
		getRules() {
			let formRules = this.form.rules;
			const selfRules = this.rules;
			const requiredRule = this.required !== undefined ? { required: !!this.required } : [];

			const prop = getPropByPath(formRules, this.prop || '');
			formRules = formRules ? prop.o[this.prop || ''] || prop.v : [];
			// 处理校验规则未添加导致的.filter is undefined报错
			return [].concat(selfRules || formRules || []).concat(requiredRule);
		},
		// 过滤出符合要求的 rule 规则
		getFilteredRule(trigger) {
			const rules = this.getRules();
			return rules
				.filter(rule => {
					if (!rule.trigger || trigger === '') return true;
					if (Array.isArray(rule.trigger)) {
						return rule.trigger.indexOf(trigger) > -1;
					} else {
						return rule.trigger === trigger;
					}
				})
				.map(rule => objectAssign({}, rule));
		},
		/**
		 * 校验表单数据
		 * @param trigger 触发校验类型
		 * @param callback 回调函数
		 */
		validate(trigger, callback = noop) {
			let rules = this.getFilteredRule(trigger);
			if (!rules || rules.length === 0) return true;
			// 使用 async-validator
			const validator = new AsyncValidator({ [this.prop]: rules });
			let model = { [this.prop]: this.fieldValue };
			validator.validate(model, { firstFields: true }, errors => {
				this.isShowMes = errors ? true : false;
				this.validateMessage = errors ? errors[0].message : '';
				if (callback) callback(this.validateMessage);
				this.elForm && this.elForm.$emit('validate', this.prop, !errors, this.validateMessage || null);
			});
		},
		resetField() {
			this.validateMessage = '';
			this.form.model[this.prop] = this.initialValue;
		},
		onFieldBlur() {
			this.validate('blur');
		},
		onFieldChange() {
			this.validate('change');
		}
	}
};
</script>
<style lang="less" scoped>
.form-item {
	.label-style {
		text-align: right;
		vertical-align: middle;
		float: left;
		font-size: 14px;
		color: #606266;
		line-height: 60rpx;
		padding: 0 12px 0 0;
		box-sizing: border-box;
	}
	/deep/ uni-input {
		// float: right;
		font-size: 14px;
		color: #606266;
		line-height: 60rpx;
		height: 60rpx;
		padding: 0 12px 0 0;
		box-sizing: border-box;
	}
	.validateMessage {
		color: #f56c6c;
		font-size: 12px;
		line-height: 1;
		// padding-top: 60rpx;
		position: absolute;
	}
}

.label-required:before {
	content: '*';
	color: red;
}
</style>
