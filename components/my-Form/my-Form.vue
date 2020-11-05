<!-- 
/**
 * @Author: 林中奇
 * @Date: 2020-10-23 17:25:03
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain: 表单公共组件
 * @ChildComponents:
 */ -->
<template>
	<div><slot></slot></div>
</template>
<script>
import objectAssign from '@/utils/util.js';
export default {
	name: 'MyForm',
	componentName: 'MyForm',
	data() {
		return { fields: [] };
	},
	props: {
		model: { type: Object },
		rules: { type: Object },
		labelWidth: String
	},
	provide() {
		return { myForm: this };
	},
	mounted() {},
	created() {
		this.$on('form-add', field => {
			if (field) this.fields.push(field);
			console.log(this.field)
		});
		this.$on('form-remove', field => {
			if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
		});
	},
	methods: {
		resetFields() {
			this.fields.forEach(field => field.resetField());
		},
		validate(callback) {
			if (!this.model) {
				console.warn('[Element Warn][Form]model is required for validate to work!');
				return;
			}

			let promise;
			// if no callback, return promise
			if (typeof callback !== 'function' && window.Promise) {
				promise = new window.Promise((resolve, reject) => {
					callback = function(valid) {
						valid ? resolve(valid) : reject(valid);
					};
				});
			}

			let valid = true;
			let count = 0;
			// 如果需要验证的fields为空，调用验证时立刻返回callback
			if (this.fields.length === 0 && callback) {
				callback(true);
			}
			let invalidFields = {};
			this.fields.forEach(field => {
				field.validate('', (message, field) => {
					if (message) {
						valid = false;
					}
					invalidFields = objectAssign({}, invalidFields, field);
					if (typeof callback === 'function' && ++count === this.fields.length) {
						callback(valid, invalidFields);
					}
				});
			});

			if (promise) {
				return promise;
			}
		}
	}
};
</script>
