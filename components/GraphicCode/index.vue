<template>
	<view class="register">
		<view class="canvas-img-code" @click="refresh">
			<canvas
				:style="{ width: width + 'px', height: height + 'px' }"
				canvas-id="imgcanvas"
				@error="canvasIdErrorCallback"
			></canvas>
		</view>
	</view>
</template>
<script>

export default {
	data() {
		return {
			verCode: '', //验证码
			width: 60,
			height: 25
		};
	},
	components: {},
	mounted() {
		this.init();
	},
	methods: {
		// 初始化验证码
		init: function() {
			console.log('start');
			var context = uni.createCanvasContext('imgcanvas', this),
				w = this.width,
				h = this.height;
			context.setFillStyle('white');
			context.setLineWidth(5);
			context.fillRect(0, 0, w, h);
			const test = ['a','1', 'i', '2']
			var pool = [
					'A',
					'B',
					'C',
					'D',
					'E',
					'F',
					'G',
					'H',
					'I',
					'J',
					'K',
					'L',
					'I',
					'M',
					'N',
					'O',
					'P',
					'Q',
					'R',
					'S',
					'T',
					'U',
					'V',
					'W',
					'S',
					'Y',
					'Z',
					'1',
					'2',
					'3',
					'4',
					'5',
					'6',
					'7',
					'8',
					'9',
					'0'
				],
				str = '';
			for (var i = 0; i < 4; i++) {
				var c = test[this.rn(0, test.length - 1)];
				var deg = this.rn(-30, 30);
				context.setFontSize(18);
				context.setTextBaseline('top');
				context.setFillStyle(this.rc(80, 150));
				context.save();
				// 设置各个验证码之间间距
				context.translate(10 * i + 15, parseInt(h / 1.5));
				context.rotate((deg * Math.PI) / 180);
				context.fillText(c, -15, -10);
				context.restore();
				str += c;
			}
			console.log(str)
			uni.setStorage({
				key: 'imgcode',
				data: str
			});
			// 验证码背景
			for (var i = 0; i < 20; i++) {
				context.beginPath();
				context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
				context.closePath();
				context.setFillStyle(this.rc(150, 200));
				context.fill();
			}
			context.draw();
			console.log('end');
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
		canvasIdErrorCallback: function(e) {
			console.error(e.detail.errMsg);
		}
	}
};
</script>
