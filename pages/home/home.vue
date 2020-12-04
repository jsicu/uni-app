<!-- 首页 -->
<template>
	<view>
		首页
		<iu-button @click="loginOut" size="mini">推出</iu-button>
		<verifySlider />
		<input v-model="value" auto-focus placeholder="将会获取焦点"/>
	</view>
</template>

<script>
	import verifySlider from '../../components/verifySlider.vue'
	export default {
		components: {verifySlider},
		data() {
			return {
				value: 'sdasdasdfasd',
			};
		},
		methods:{
			loginOut() {
				this.$network({
					url: 'security/logout',
					method: 'post',
					success: (res) => {
						console.log(res)
						uni.removeStorageSync('userInfo')
						uni.redirectTo({
							// navigateTo redirectTo
							url: '/pages/index/index'
						});
					}
				})
			}
		}
	}
</script>

<style lang="less">

</style>
