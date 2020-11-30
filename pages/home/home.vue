<!-- 首页 -->
<template>
	<view>
		首页
		<iu-button @click="loginOut" size="mini">推出</iu-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
