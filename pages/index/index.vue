<!-- 登录页 -->
<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area"><text class="title">hello world</text></view>
		<my-Form ref="form" :model="formData" :rules="rules" label-width="160rpx" style="width: 500rpx;">
			<my-FormItem label="用户名:" prop="name">
				<my-Input type="text" v-model="formData.name" placeholder="请输入用户名" />
			</my-FormItem>
			<my-FormItem label="密码:" prop="mail"><input type="text" v-model="formData.mail" placeholder="请输入密码" /></my-FormItem>
			<!-- <br /> -->
			<view style="text-align: center;">
				<my-Button @click="handleSubmit" type="primary" style="width: 100%;" :loading="loading">登录</my-Button>
				<!-- <my-Button @click="handleReset" type="text" disabled>重置</my-Button> -->
			</view>
			<view style="display: flex;justify-content: space-between;">
				<my-Button @click="register" type="text" size="mini" >注册</my-Button>
				<my-Button @click="forgetPwd" type="text" size="mini">忘记密码?</my-Button>
			</view>
		</my-Form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			formData: { name: '', mail: '' },
			rules: {
				name: [{ required: true, message: '不能为空' }],
				mail: [
					{ required: true, message: '不能为空', trigger: 'blur' },
					{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
				]
			}
		};
	},
	onLoad() {},
	methods: {
		handleSubmit() {
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
			}, 5000);
			this.$refs.form.validate(valid => {
				if (valid) console.log(this.formData);
				else console.log('校验失败');
			});
		},
		register() {
			this.$refs.form.resetFields();
			uni.navigateTo({ // navigateTo redirectTo
				url: '/pages/index/register'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
/deep/ .el-button {
	// padding: 12rpx 24rpx;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
