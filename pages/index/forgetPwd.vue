<!-- 
/**
 * @Author: 老林头
 * @Date: 2020-11-16 10:21:50
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain: 找回密码
 * @ChildComponents:
 */ -->
<template>
	<view class="content" style="padding-top: 40rpx;">
		<iu-form ref="form" :model="formData" :rules="rules" label-width="180rpx" style="width: 600rpx;">
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
				<mySlider @success=" () => { formData.slider = true; } "
				></mySlider>
			</iu-formItem>
			<view style="text-align: center;">
				<iu-button @click="handleRegister" type="primary" style="width: 100%;" :loading="loading">确定</iu-button>
			</view>
			<iu-button @click="signIn" type="text" size="mini" style="float: right;">返回登录</iu-button>
		</iu-form>
		<iu-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
			@onConfirm="onConfirm"
		>
		  <span>这是一段信息</span>
		  <!-- <span slot="footer" class="dialog-footer">
		    <iu-button @click="dialogVisible = false">取 消</iu-button>
		    <iu-button type="primary" @click="dialogVisible = false">确 定</iu-button>
		  </span> -->
		</iu-dialog>
	</view>
</template>

<script>
import mySlider from '@/components/Slider.vue';
export default {
	name: '',
	components: { mySlider },
	data() {
		return {
			dialogVisible: false,
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
		onConfirm() {
			console.log('dsadasdas')
		},
		handleRegister() {
			this.dialogVisible = true
			// this.$refs.form.validate(valid => {
			// 	if (valid) console.log(this.formData);
			// 	else console.log('校验失败');
			// });
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

</style>
