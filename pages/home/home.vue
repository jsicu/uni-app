<!-- 首页 -->
<template>
	<view style="text-align: center;">
		首页
		<iu-button @click="loginOut" size="mini">推出</iu-button>
		<view style="margin: 0 10px;">
			<iu-verifyPoint  @ready="ready" />
		</view>
		<!-- <view style="margin: 0 10px;">
			<iu-verifySlider type="2" @ready="ready" />
		</view> -->
		<input v-model="value" auto-focus placeholder="将会获取焦点" />
		<iu-slider__independent />
	</view>
</template>

<script>
export default {
	components: { },
	data() {
		return {
			value: 'sdasdasdfasd'
		};
	},
	methods: {
		ready() {
			console.log('ready');
		},
		loginOut() {
			this.$network({
				url: 'security/logout',
				method: 'post',
				success: res => {
					console.log(res);
					uni.removeStorageSync('userInfo');
					uni.redirectTo({
						// navigateTo redirectTo
						url: '/pages/index/index'
					});
				}
			});
		}
	}
};
</script>

<style lang="less"></style>
