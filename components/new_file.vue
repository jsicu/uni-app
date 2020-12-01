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
		<movable-area class="iu-slider" :style="{ border: _isSuccess ? `1px solid #7ac23c` : `1px solid #c0c0c0` }">
			<movable-view
				class="iu-slider__content"
				friction="2"
				direction="horizontal"
				damping="2"
				@change="sliderMove"
				:disabled="disabled || _isSuccess"
			>
				<view v-if="_isSuccess" class="iu-slider__movable">
					<img src="./Yes.png" alt="成功" style="vertical-align: middle; width: 32rpx; height: 32rpx;" />
				</view>
				<view v-else class="iu-slider__movable">>></view>
			</movable-view>
			<view class="iu-slider__front" :style="{ background: _sliderBarBg, width: _sliderBarWidth }"></view>
			<view class="iu-slider__background">
				<view class="iu-slider__text">{{ _isSuccess ? '验证成功' : '向右滑动验证' }}</view>
			</view>
		</movable-area>
	</view>
</template>

<script>
export default {
	name: 'Slider',
	components: {},
	props: {
		activeColor: {
			type: String,
			default: 'green' //滑块滑动后的颜色
		},
		unactiveColor: {
			type: String,
			default: '#4fca9b' //滑块滑动后的颜色
		},
		disabled: {
			type: Boolean,
			default: false // 是否禁选
		}
	},
	data() {
		return {
			percent: 0, // progress进度
			buttonWidth: 0, // 滑块宽度
			sliderWidth: 0 // 滑块总宽度
		};
	},

	//监听属性 类似于data概念
	computed: {
		_isSuccess() {
			if (this.percent == 100) {
				this.$emit('success');
				return true;
			} else {
				return false;
			}
		},
		_sliderBarBg() {
			return `linear-gradient(to right, ${this.activeColor} ${this.percent}%, ${this.unactiveColor} ${this.percent}%)`;
		},
		_sliderBarWidth() {
			return `calc(${this.sliderWidth}px - ${this.buttonWidth}px)`;
		}
	},
	watch: {},
	//方法集合
	methods: {
		sliderMove(e) {
			this.percent = ((e.detail.x / (this.sliderWidth - this.buttonWidth - 2)) * 100).toFixed(1);
		}
	},
	created() {},
	// 获取基础数据
	mounted() {
		this.$nextTick(function() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.iu-slider')
				.boundingClientRect(data => {
					this.sliderWidth = data.width;
				})
				.exec();
			query
				.select('.iu-slider__content')
				.boundingClientRect(data => {
					this.buttonWidth = data.width;
				})
				.exec();
		});
	},
	beforeMount() {
		const res = uni.getSystemInfoSync();
		const scale = 750 / res.windowWidth;
	}
};
</script>
<style lang="scss" scoped>
// // @import url();
// // .iu-slider {
// // 	position: absolute;
// // 	background-color: #4fca9b;
// // 	overflow: hidden;
// // 	border: 1px solid #c0c0c0;
// // 	border-radius: 4px;
// // 	font-size: 32rpx;
// // 	height: 60rpx;
// // 	line-height: 60rpx;
// // 	width: 100%;
// // }
// .slider__content {
// 	overflow: hidden;
// 	z-index: 45;
// 	height: 90rpx;
// 	width: 80rpx;
// 	background-color: transparent;
// }
// .slider__movable {
// 	height: 60rpx;
// 	line-height: 60rpx;
// 	position: absolute;
// 	left: 0;
// 	top: 0;
// 	color: #787878;
// 	// border-right: 1px solid #cccccc;
// 	line-height: 50rpx;
// 	background-color: #fff;
// 	text-align: center;
// 	width: 80rpx;
// }
// .slider__front {
// 	padding-top: 1px;
// 	height: 100%;
// 	position: absolute;
// 	border-top-left-radius: 4px;
// 	border-bottom-left-radius: 4px;
// 	opacity: 0.8;
// }
// .slider__background {
// 	opacity: 0.8;
// 	padding-top: 1px;
// 	.slider__text {
// 		height: 60rpx;
// 		line-height: 60rpx;
// 		text-align: center;
// 		font-size: 25rpx;
// 	}
// }
</style>
