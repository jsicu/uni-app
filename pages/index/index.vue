<!-- 登录页 -->
<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area"><text class="title">hello world</text></view>
		<iu-form ref="form" :model="formData" :rules="rules" label-width="160rpx" style="width: 500rpx;">
			<iu-formItem label="用户名:" prop="name">
				<iu-input type="text" v-model="formData.name" placeholder="请输入用户名" />
			</iu-formItem>
			<iu-formItem label="密码:" prop="password">
				<iu-input type="password" v-model="formData.password" placeholder="请输入密码" />
			</iu-formItem>
			<iu-formItem label="验证码:" prop="verify">
				<view style="display: inline-flex;">
					<iu-input type="text" v-model="formData.verify" placeholder="请输入四位数验证码" />
					<iu-graphic ref="graphic" />
				</view>
			</iu-formItem>
			<!-- <br /> -->
			<view style="text-align: center;">
				<iu-button @click="handleSubmit" type="primary" style="width: 100%;">登录</iu-button>
			</view>
			<view style="display: flex;justify-content: space-between;">
				<iu-button @click="register" type="text" size="mini">注册</iu-button>
				<iu-button @click="forgetPwd" type="text" size="mini">忘记密码?</iu-button>
			</view>
		</iu-form>
	</view>
</template>

<script>
import { JSEncrypt } from 'jsencrypt';

export default {
	components: {},
	data() {
		return {
			formData: { name: '18838789f53eb4ec743f3630794be6a8ee858dc3', password: '123456' },
			rules: {
				name: [{ required: true, message: '必填项不得为空!' }],
				password: [{ required: true, message: '必填项不得为空!' }],
				verify: [{ required: false, message: '必填项不得为空!' }]
			}
		};
	},
	onLoad() {},
	methods: {
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					// if (!this.$refs.graphic.checkCode(this.formData.verify)) return console.log('验证码错误');
					this.$network({
						url: 'security/publicKey',
						success: res => {
							this.publicKey(res);
						}
					});
				} else console.log('校验失败');
			});
		},
		toJSON() {},
		async publicKey(publicKey) {
			// 获取加密公钥
			if (publicKey) {
				const encrypt = new JSEncrypt();
				encrypt.setPublicKey(publicKey);
				const encrypted = encrypt.encrypt(this.formData.password);
				this.$set(this.formData, 'password', encrypted);
				this.login()
			}
		},
		async login() {
			//  加密后登录
			this.$network({
				url: 'security/login',
				method: 'post',
				data: this.formData,
				success: res => {
					console.log(res);
					uni.setStorage({
					    key: 'userInfo',
					    data: res,
					    success: function () {
					        console.log('success');
					    }
					});
					uni.redirectTo({
						// navigateTo redirectTo
						url: '/pages/home/home'
					});
				},
				fail: err=> console.log(err)
			});
		},
		register() {
			
			// this.$refs.form.resetFields();
			// uni.navigateTo({
			// 	// navigateTo redirectTo
			// 	url: '/pages/index/register'
			// });
		},
		forgetPwd() {
			uni.navigateTo({
				// navigateTo redirectTo
				url: '/pages/index/forgetPwd'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
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
