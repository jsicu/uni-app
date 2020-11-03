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
export default {
	name: 'my-Form',
	data() {
		return { fields: [] };
	},
	props: {
		model: { type: Object },
		rules: { type: Object },
		labelWidth: String,
	},
	provide() {
		return { form: this };
	},
	mounted() {
		console.log(this.labelWidth)
  },
	methods: {
		resetFields() {
			this.fields.forEach(field => field.resetField());
		},
		validate(cb) {
			return new Promise(async resolve => {
				let valid = true, count = 0;
				this.fields.forEach(field => {
					field.validate('', error => {
						if (error) valid = false;
						if (++count === this.fields.length) {
							resolve(valid);
							if (typeof cb === 'function') cb(valid);
						}
					});
				});
			});
		}
	},
	created() {
		this.$on('form-add', field => {
			if (field) this.fields.push(field);
		});
		this.$on('form-remove', field => {
			if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
		});
	}
};
</script>
