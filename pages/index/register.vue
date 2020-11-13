<!-- 
/**
 * @Author: 老林头
 * @Date: 2020-11-12 15:00:16
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain: 注册页面
 * @ChildComponents:
 */ -->
<template>
	<view class="content" style="margin-top: 50rpx;">
		<my-Form ref="form" :model="formData" :rules="rules" label-width="180rpx" style="width: 500rpx;">
			<my-FormItem label="用户名:" prop="name">
				<my-Input type="text" v-model="formData.name" placeholder="请输入用户名" />
			</my-FormItem>
			<my-FormItem label="密码:" prop="password">
				<input type="text" v-model="formData.password" placeholder="请输入密码" />
			</my-FormItem>
			<my-FormItem label="确认密码:" prop="confirmPassword">
				<input type="text" v-model="formData.confirmPassword" placeholder="请再次输入密码" />
			</my-FormItem>
			<my-FormItem label="验证码:">
				<view style="display: inline-flex;">
				<input type="text" v-model="formData.code" placeholder="请输入验证码" />
				<pic-code ref='code' matchCase />
				</view>
			</my-FormItem>
			<view style="text-align: center;">
				<my-Button @click="handleSubmit" type="primary" style="width: 100%;" :loading="loading">登录</my-Button>
			</view>
			<view style="display: flex;justify-content: space-between;">
				<my-Button @click="register" type="text" size="mini">注册</my-Button>
				<my-Button @click="forgetPwd" type="text" size="mini">忘记密码?</my-Button>
			</view>
		</my-Form>
	</view>
</template>

<script>
	import picCode from '@/components/GraphicCode'
export default {
	name: '',
	components: {picCode},
	data() {
		return {
			loading: false,
			formData: { name: '', password: '' },
			rules: {
				name: [{ required: true, message: '不能为空' }],
				password: [
					{ required: true, message: '不能为空', trigger: 'blur' },
					{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
				],
				confirmPassword: [{ required: true, message: '不能为空', trigger: 'blur' }]
			}
		};
	},
	//监听属性 类似于data概念
	computed: {},
	watch: {},
	//方法集合
	methods: {
		handleSubmit() {
		 const code = this.$refs.code.checkCode(this.formData.code)
		 console.log(code)
		}
	},
	created() {},
	mounted() {},
	beforeCreate() {},
	beforeMount() {},
	beforeUpdate() {},
	updated() {},
	beforeDestroy() {},
	destroyed() {}
};
</script>
<style lang="scss" scoped>
// @import url();
</style>
