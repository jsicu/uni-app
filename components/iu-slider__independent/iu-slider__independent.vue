<!-- 
/**
 * @Author: 老林头
 * @Date: 2020-12-01 14:00:55
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain: 前台滑块拼图验证（由于小程序不适用id节点，所以难以使用canvas绘制好看的滑块，只能为方形）
 * @Unfinish: 样式统一（由于滑块太丑了，所以不打算统一样式了）
 */ -->
<template>
	<view class="independent" v-if="show">
		<view
			v-if="refreshStatus"
			class="shuaxin iu-icon-refresh"
			:style="{ transform: `rotate(-${rotate}deg)` }"
			@click="refresh"
		/>
		<view class="imgWrap">
			<img class="img" :src="src" @error="imageError" />
			<view class="over" :style="{ left: left + 'px', top: top + 'px' }"></view>
			<view class="smartImg" :style="{ left: sleft + 'px', top: stop + 'px' }">
				<img class="simg" :style="{ left: -left + 'px', top: -top + 'px' }" :src="src" />
			</view>
			<transition name="iu-slider-success">
				<view v-if="!refreshStatus" class="mack" :style="{ color: acColor }">
					<image style="vertical-align: middle; width: 32rpx; height: 32rpx;" src="./Yes.png" />
					{{ ' ' + message }}
				</view>
				<view v-if="message == '验证失败，请重试'" class="mack" :style="{ color: acColor }">
					<image style="vertical-align: middle; width: 32rpx; height: 32rpx;" src="./fail.png" />
					{{ ' ' + message }}
				</view>
			</transition>
		</view>
		<view class="sliderBox" @touchend="sliderEnd">
			<movable-area class="sliderF">
				<movable-view
					:disabled="!refreshStatus"
					:animation="true"
					class="sliderS"
					:x="sliderx"
					direction="horizontal"
					@change="startMove"
				>
					<image class="icon" src="right.png" />
				</movable-view>
			</movable-area>

			<view class="bgC">
				拖动左边滑块完成上方拼图
				<view class="bgC_left" :style="{ width: backLeft + 'px' }"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Slider',
	props: {
		show: {
			type: Boolean,
			default: true
		}
	},
	watch: {
		show() {
			this.random();
		}
	},
	data() {
		return {
			isSuccess: false,
			refreshStatus: true,
			left: 0,
			top: 0,
			sleft: 0,
			stop: 0,
			sliderx: 0,
			backLeft: 0,
			bgC_color: '',
			message: '',
			acColor: '#333',
			src: '',
			rotateNum: 0,
			rotate: 0
		};
	},
	mounted() {
		this.random();
	},
	methods: {
		random() {
			let imgLegth = 8;
			let ram = Math.random();
			const index = Math.floor(ram * 3); // 选图
			this.left = Math.floor(80 * ram) + 140; // 140-220
			this.top = this.stop = Math.floor(80 * ram) + 10;
			this.src = `/static/sliderImg/${index}.png`;
		},
		refresh() {
			let rotateNum = this.rotateNum++;
			this.rotate = rotateNum * 360; // 刷新时选择读书
			this.message = '';
			this.random();
		},
		startMove(e) {
			if (!this.refreshStatus) return;
			this.backLeft = e.detail.x + 18;
			this.sleft = e.detail.x;
		},
		sliderEnd() {
			if (Math.abs(this.sleft - this.left) <= 5) {
				this.message = '验证成功!';
				this.refreshStatus = false;
				this.acColor = 'green';
			} else {
				this.message = '验证失败，请重试';
				this.acColor = 'red';
				setTimeout(() => {
					this.message = '';
					this.sliderx = 1;
					setTimeout(() => {
						this.sliderx = 0;
					}, 100);
				}, 1000);
			}
		},
		imageError(e) {
			console.error('image发生error事件，携带值为' + e.detail.errMsg);
		}
	}
};
</script>

<style lang="scss" scoped>
@mixin flexC {
	display: flex;
	align-items: center;
	justify-content: center;
}

.independent {
	position: relative;
	background: #fff;
	width: 300px;
	border-radius: 8px;
	overflow: hidden;
	padding-bottom: 20px;
	.shuaxin {
		position: absolute;
		z-index: 1;
		right: 20rpx;
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		transition: all 0.3s;
	}
	.title {
		width: 100%;
		height: 60px;
		font-size: 18px;
		color: #333;
		@include flexC;
	}

	.imgWrap {
		position: relative;
		width: 280px;
		height: 150px;
		border-radius: 8px;
		margin: 0 auto;
		overflow: hidden;
		background: #ddd;
		.mack {
			position: absolute;
			text-align: center;
			width: 100%;
			height: 25px;
			bottom: 0;
			background-color: #fff;
			opacity: 0.8;
			z-index: 10;
		}
		.img {
			display: block;
			width: 100%;
			height: 100%;
		}

		.over {
			position: absolute;
			left: 0;
			top: 0;
			width: 50px;
			height: 50px;
			background: #777;
			opacity: 0.5;
			box-shadow: inset 0 0 5px 5px rgba(0, 0, 0, 0.3);
		}

		.smartImg {
			position: absolute;
			z-index: 2;
			left: 0;
			top: 0;
			width: 50px;
			height: 50px;
			overflow: hidden;
			box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);

			.simg {
				position: absolute;
				display: block;
				width: 280px;
				height: 150px;
			}
		}
	}
}

.sliderBox {
	width: 266px;
	margin: 10px 17px;
	height: 36px;
	position: relative;

	.sliderF {
		width: 100%;
		height: 100%;
		z-index: 3;

		.sliderS {
			height: 36px;
			width: 36px;
			background: #007cff;
			border-radius: 36px;
			display: flex;
			justify-content: center;
			align-items: center;

			.icon {
				width: 20px;
				height: 20px;
			}
		}
	}

	.bgC {
		position: absolute;
		z-index: 1;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		height: 30px;
		border-radius: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #999999;
		box-shadow: inset 0 0 4px #ccc;
		text-align: center;
		overflow: hidden;
	}

	.bgC_left {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 0;
		height: 28px;
		border-top-left-radius: 28px;
		border-bottom-left-radius: 28px;
		line-height: 28px;
		font-size: 14px;
		background-color: #eee;
		box-shadow: inset 0 0 4px #ccc;
		text-align: center;
	}
}
</style>
