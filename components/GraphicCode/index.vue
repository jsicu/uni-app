<template>
	<view class="register">
		<view class="canvas-img-code" @click="refresh">
			<canvas
				:style="{ width: width + 'rpx', height: height + 'rpx' }"
				canvas-id="imgcanvas"
				@error="canvasIdErrorCallback"
			></canvas>
		</view>
	</view>
</template>
<script>
import { pool } from './cellPool.js';
export default {
	name: 'GraphicCode',
	props: {
		data: {
			type: Object,
			default: () => {}
		},
		// 是否区分大小写
		matchCase: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			verification: '' // 验证码容器，比较时使用
		};
	},
	computed: {
		width() {
			if (this.data?.width) {
				return data.width;
			} else {
				return 120;
			}
		},
		height() {
			if (this.data?.height) {
				return data.height;
			} else {
				return 60;
			}
		},
		numLen() {
			if (this.data?.numLen) {
				return data.numLen;
			} else {
				return 4;
			}
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		// 初始化验证码
		init: function() {
			const context = uni.createCanvasContext('imgcanvas', this);
			context.setFillStyle('white');
			context.fillRect(0, 0, this.width / 3, this.height / 3);
			let str = '';
			for (let i = 0; i < this.numLen; i++) {
				const c = pool[this.rn(0, pool.length - 1)];
				const deg = this.rn(-30, 30); // 旋转角度
				context.setFontSize(this.height / 3);
				context.setTextBaseline('top');
				context.setFillStyle(this.rc(80, 150));
				context.save();
				// 设置各个验证码的原点
				context.translate(parseInt((this.width / (2.5 * this.numLen)) * (i + 0.7)), this.height / 8);
				context.rotate((deg * Math.PI) / 180);
				context.fillText(c, 0, 0); // 验证码显示位置
				context.restore();
				str += c;
			}
			this.verification = str;
			uni.setStorage({
				key: 'imgcode',
				data: str
			});
			// 验证码背景
			for (var i = 0; i < (this.height * this.width) / 50; i++) {
				context.beginPath();
				context.arc(this.rn(0, this.width), this.rn(0, this.height), 1, 0, 2 * Math.PI);
				context.closePath();
				context.setFillStyle(this.rc(150, 200));
				context.fill();
			}
			context.draw();
		},
		// 字体颜色
		rc: function(min, max) {
			var r = this.rn(min, max);
			var g = this.rn(min, max);
			var b = this.rn(min, max);
			return `rgb(${r},${g},${b})`;
		},
		// 随机数
		rn: function(max, min) {
			return parseInt(Math.random() * (max - min)) + min;
		},
		refresh: function() {
			this.init();
		},
		checkCode(code) {
			if (!code) return false;
			if (this.matchCase) {
				for (let i = 0; i < this.verification.length; i++) {
					if (code[i] !== this.verification[i]) {
						this.refresh()
						return false;
					}
				}
			} else if (code.toLowerCase() !== this.verification.toLowerCase()) {
				this.refresh()
				return false;
			}
			return true
		},
		canvasIdErrorCallback: function(e) {
			console.error(e.detail.errMsg);
		}
	}
};
</script>
