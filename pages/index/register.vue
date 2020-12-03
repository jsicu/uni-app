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
	<view class="content" style="padding-top: 40rpx;">
		<iu-form ref="form" :model="formData" :rules="rules" label-width="220rpx" style="width: 600rpx;">
			<iu-formItem label="用户名:" prop="name">
				<iu-input type="text" v-model="formData.name" placeholder="请输入用户名" />
			</iu-formItem>
			<iu-formItem label="新密码:" prop="password">
				<input type="text" v-model="formData.password" placeholder="请输入新密码" />
			</iu-formItem>
			<iu-formItem label="确认密码:" prop="confirmPassword">
				<input type="text" v-model="formData.confirmPassword" placeholder="请再次输入密码" />
			</iu-formItem>
			<iu-formItem label="电子邮箱:" prop="email">
				<input type="text" v-model="formData.email" placeholder="请输入电子邮箱" />
			</iu-formItem>
			<iu-formItem label="电子验证码:">
				<view style="display: inline-flex;">
					<input type="text" v-model="formData.code" placeholder="请输入电子验证码" />
					<iu-button @click="getVerificationCode" type="text" size="mini" style="width: 160rpx;">获取验证码</iu-button>
				</view>
			</iu-formItem>
			<iu-formItem label="验证码:">
				<mySlider @success=" () => { formData.slider = true; } "/>
			</iu-formItem>
			<iu-formItem label="验证码:">
				<iu-slider @success="success" />
			</iu-formItem>
			<iu-formItem label="验证码:">
				<!-- <my-progress handleSize="20px" strokeWidth="20px" handleBorderRadius="0" /> -->
				<my-progress />
			</iu-formItem>
			<!-- <iu-formItem label="验证码1:">
				<iu-verify />
			</iu-formItem> -->
			<view style="text-align: center;">
				<iu-button @click="handleRegister" type="primary" style="width: 100%;" :loading="loading">注册</iu-button>
			</view>
			<iu-button @click="signIn" type="text" size="mini" style="float: right;">已有账号，返回登录</iu-button>
		</iu-form>
		<!-- <verifySlider /> -->
		<iu-slider__independent />
	</view>
</template>

<script>
import mySlider from '@/components/Slider.vue';
import verifySlider from '../../components/verifySlider.vue'
export default {
	name: '',
	components: { mySlider, verifySlider },
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
		success() {
			console.log('sadas')
		},
		handleRegister() {
			this.$refs.form.validate(valid => {
				if (valid) console.log(this.formData);
				else console.log('校验失败');
			});
		},
		getVerificationCode() {
			console.log('获取邮箱验证码');
		},
		signIn() {
			uni.navigateTo({ // navigateTo redirectTo
				url: '/pages/index/index'
			});
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
/deep/ .el-button {
	// padding: 12rpx 24rpx;
}
</style>
