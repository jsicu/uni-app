<!-- 登录页 -->
<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area"><text class="title">hello world</text></view>
		<my-Form ref="form" :model="formData" :rules="rules" label-width="120rpx" style="width: 500rpx;">
			<my-FormItem label="名称:" prop="name">
				<my-Input type="text" v-model="formData.name" placeholder="请输入用户名" />
			</my-FormItem>
			<my-FormItem label="邮箱:" prop="mail"><input type="text" v-model="formData.mail" placeholder="请输入密码" /></my-FormItem>
			<button @click="handleSubmit">提交</button>
			<button @click="handleReset">重置</button>
		</my-Form>
		<!-- <view>
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">input</view>
					<input class="uni-input" name="input" placeholder="这是一个输入框" />
				</view>
			</form>
		</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: { name: '', mail: '' },
			rules: {
				name: [{ required: true, message: '不能为空', trigger: 'blur' }],
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
			// uni.redirectTo({ // navigateTo
			// 	url: '/pages/home/home?id=1&name=uniapp'
			// });
			this.$refs.form.validate(valid => {
				if (valid) console.log('提交成功');
				else console.log('校验失败');
			});
		},
		handleReset() {
			this.$refs.form.resetFields();
		}
	}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
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
