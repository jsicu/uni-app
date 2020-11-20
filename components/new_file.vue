<!-- 
/**
 * @Author: 老林头
 * @Date: 2020-11-20 14:00:55
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain:
 * @ChildComponents:
 */ -->
<template>
	<view style="position: relative;">
		<movable-area class="slider__border">
			<movable-view class="slider__content" friction="2" direction="horizontal" damping="50" @change="drag" @htouchmove="drag">
				<view class="slider__movable">>></view>
			</movable-view>
		</movable-area>
		<view class="slider__front" :style="{ width: frontWidt, backgroundColor: forntBg }"></view>
		<view class="slider__background"><view class="slider__text">向右滑动验证</view></view>
	</view>
</template>

<script>
export default {
	name: '',
	components: {},
	props: {
		forntBg: {
			type: String,
			default: 'green' //滑块滑动后的颜色
		}
	},
	data() {
		return {
			// 滑块
			frontWidt: 0
		};
	},

	//监听属性 类似于data概念
	computed: {},
	watch: {},
	//方法集合
	methods: {
		drag(e) {
			console.log(e.detail.x);
			this.frontWidt = e.detail.x + 'px';
			// let rpx = this.data.rpx
			// var coord = e.detail.x;
			// let wid = this.data.maxNum - (coord) * rpx
			// this.setData({
			//   coord: coord,
			//   text: wid
			// })
		}
	},
	created() {},
	mounted() {}
};
</script>
<style lang="scss" scoped>
// @import url();
.slider__border {
	position: absolute;
	background-color: #4fca9b;
	overflow: hidden;
	border: 1px solid #c0c0c0;
	border-radius: 4px;
	font-size: 32rpx;
	height: 60rpx;
	line-height: 60rpx;
	width: 100%;
}
.slider__content {
	overflow: hidden;
	z-index: 45;
	height: 90rpx;
	width: 80rpx;
	background-color: transparent;
}
.slider__movable {
	height: 60rpx;
	line-height: 60rpx;
	position: absolute;
	left: 0;
	top: 0;
	color: #787878;
	border-right: 1px solid #cccccc;
	line-height: 50rpx;
	background-color: #fff;
	text-align: center;
	width: 80rpx;
}
.slider__front {
	padding-top: 1px;
	height: 100%;
	position: absolute;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
	opacity: 0.8;
}
.slider__background {
	opacity: 0.8;
	.slider__text {
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 25rpx;
	}
}
</style>
