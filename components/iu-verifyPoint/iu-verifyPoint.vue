<!--
/**
 * @Author: 老林头
 * @Date: 2020-12-9 17:25:55
 * @lastAuthor:
 * @lastChangeDate:
 * @description: 点击文字验证组件（需后端支持）
 * @unfinish：样式同意太累了，等闲了再说
 */
-->
<template>
		<view style="position: relative">
			<view class="verify-image-out">
				<view
					class="verify-image-panel"
					:style="{ width: imgSize.width, height: imgSize.height, 'margin-bottom': space + 'px' }"
				>
					<view class="verify-refresh" style="z-index:3" @click="refresh" v-show="showRefresh">
						<text class="iconfont icon-refresh"></text>
					</view>
					<image
						:src="pointBackImgBase"
						id="image"
						ref="canvas"
						style="width:100%;height:100%;display:block"
						@click="bindingClick ? canvasClick($event) : undefined"
					></image>
					<view
						v-for="(tempPoint, index) in tempPoints"
						:key="index"
						class="point-area"
						:style="{
							'background-color': '#1abd6c',
							color: '#fff',
							'z-index': 9999,
							width: '20px',
							height: '20px',
							'text-align': 'center',
							'line-height': '20px',
							'border-radius': '50%',
							position: 'absolute',
							top: parseInt(tempPoint.y - 10) + 'px',
							left: parseInt(tempPoint.x - 10) + 'px'
						}"
					>
						{{ index + 1 }}
					</view>
				</view>
			</view>
			<!-- 'height': this.barSize.height, -->
			<view
				class="verify-bar-area"
				:style="{ width: imgSize.width, color: barAreaColor, 'border-color': barAreaBorderColor, 'line-height': '40px' }"
			>
				<text class="verify-msg">{{ text }}</text>
			</view>
		</view>
</template>
<script type="text/babel">
/**
 * VerifyPoints
 * @description 点选
 */
import {rsaEncrypt} from '../../utils/index.js';
export default {
	name: 'VerifyPoints',
	props: {
		//默认的文字数量
		defaultNum: {
			type: Number,
			default: 7
		},
		//校对的文字数量
		checkNum: {
			type: Number,
			default: 3
		},
		//间隔
		space: {
			type: Number,
			default: 5
		},
		imgSize: {
			type: Object,
			default() {
				return {
					width: '310px',
					height: '155px'
				};
			}
		},
		barSize: {
			type: Object,
			default() {
				return {
					width: '310px',
					height: '40px'
				};
			}
		}
	},
	data() {
		return {
			fontPos: [], // 选中的坐标信息
			checkPosArr: [], //用户点击的坐标
			num: 1, //点击的记数
			pointBackImgBase: '',
			tempPoints: [],
			text: '',
			barAreaColor: '#000',
			barAreaBorderColor: '#ddd',
			showRefresh: true,
			bindingClick: true,
			imgLeft: '',
			imgTop: '',
			original:{
				width: 310,
				height: 155
			} // 图像原始尺寸
		};
	},
	computed: {
	},
	methods: {
		init() {
			//加载页面
			this.fontPos.splice(0, this.fontPos.length);
			this.checkPosArr.splice(0, this.checkPosArr.length);
			this.num = 1;
			this.getPictrue();
			this.$nextTick(() => {
				this.$emit('ready', this);
			});
		},
		canvasClick(e) {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#image')
				.boundingClientRect(data => {
					this.imgLeft = Math.ceil(data.left);
					this.imgTop = Math.ceil(data.top);
					this.checkPosArr.push(this.getMousePos(this.$refs.canvas, e));
					if (this.num == this.checkNum) {
						this.num = this.createPoint(this.getMousePos(this.$refs.canvas, e));
						// console.log(JSON.stringify(this.checkPosArr))
						//按比例转换坐标值
						this.checkPosArr = this.pointTransfrom(this.checkPosArr, this.imgSize);
						// console.log(JSON.stringify(this.checkPosArr))
						//等创建坐标执行完
						setTimeout(() => {
							//发送后端请求
							let data = {
								captchaType: 1,
								checkJson: rsaEncrypt(this.checkPosArr)
							};
							this.$network({
								url: `image/check`,
								data,
								method: 'POST',
								success: result => {
									if (result) {
										this.barAreaColor = '#4cae4c';
										this.barAreaBorderColor = '#5cb85c';
										this.text = '验证成功';
										this.showRefresh = false;
										this.bindingClick = false;
										this.$emit('success', true);
									} else {
										this.$emit('error', this);
										this.barAreaColor = '#d9534f';
										this.barAreaBorderColor = '#d9534f';
										this.text = '验证失败';
										setTimeout(() => {
											this.refresh();
										}, 700);
									}
								}
							})
						}, 400)
					}
					if (this.num < this.checkNum) {
						this.num = this.createPoint(this.getMousePos(this.$refs.canvas, e));
					}
				})
				.exec();
		},
		//获取坐标
		getMousePos: function(obj, e) {
			let position = {
				x: Math.ceil(e.detail.x) - this.imgLeft,
				y: Math.ceil(e.detail.y) - this.imgTop
			};
			return position;
		},
		//创建坐标点
		createPoint: function(pos) {
			this.tempPoints.push(Object.assign({}, pos));
			return ++this.num;
		},
		refresh: function() {
			this.tempPoints.splice(0, this.tempPoints.length);
			this.barAreaColor = '#000';
			this.barAreaBorderColor = '#ddd';
			this.bindingClick = true;

			this.fontPos.splice(0, this.fontPos.length);
			this.checkPosArr.splice(0, this.checkPosArr.length);
			this.num = 1;
			this.getPictrue();
			this.showRefresh = true;
		},
		// 请求背景图片和验证图片
		getPictrue() {
			const data = {
				type: 1
			};
			this.$network({
				url: `image/verify`, //仅为示例，并非真实接口地址。
				data,
				method: 'get',
				success: result => {
					this.pointBackImgBase = result.bgCanvas;
					this.text = '请依次点击【' + result.words + '】';
					this.original = result.size
				}
			});
		},
		//坐标转换函数
		pointTransfrom(pointArr, imgSize) {
			let newPointArr = pointArr.map(p => {
				let x = Math.round((this.original.width * p.x) / parseInt(imgSize.width));
				let y = Math.round((this.original.height * p.y) / parseInt(imgSize.height));
				return { x, y };
			});
			return newPointArr;
		}
	},
	watch: {
		// type变化则全面刷新
		type: {
			immediate: true,
			handler() {
				this.init();
			}
		}
	},
	mounted() {}
};
</script>

<style scoped>
.verify-tips {
	position: absolute;
	left: 0px;
	bottom: 0px;
	width: 100%;
	height: 30px;
	background-color: rgb(231, 27, 27, 0.5);
	line-height: 30px;
	color: #fff;
}
.tips-enter-active {
  transition: all 1.5s ease;
}
.tips-leave-active {
  transition: all 1.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.tips-enter, .tips-leave-to {
  transform: translateY(25px);
  opacity: 0;
}

/*滑动验证码*/
.verify-bar-area {
	position: relative;
	background: #ffffff;
	text-align: center;
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
	border: 1px solid #ddd;
	-webkit-border-radius: 12rpx;
}

.verify-image-panel {
	margin: 0;
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
	border-top: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
	border-radius: 16rpx;
	position: relative;
	overflow: hidden;
}

.verify-image-panel .verify-refresh {
	width: 25px;
	height: 25px;
	text-align: center;
	padding: 5px;
	cursor: pointer;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 2;
}

.verify-image-panel .icon-refresh {
	font-size: 20px;
	color: #fff;
}

.verify-bar-area .verify-msg {
	z-index: 3;
	height: 30px;
	width: 310px;
}

.iconfont {
	font-family: 'iconfont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.icon-refresh:before {
	content: ' ';
	display: block;
	width: 16px;
	height: 16px;
	position: absolute;
	margin: auto;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 9999;
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGUlEQVQ4T5WTwVHDQAxF3z9yCx24A1wBkxLSASkhHQCXnEMHpgKgAkIFQAehA3cg5me0mY2JE6OLx2vprfT9JU5ERCyAG6AFeuALeJO0G6arPoiIOXAPXANdFjrF54a+A4+S+ogwvDkAImIJPABLSduRzpyzAW7dEfC8ByTNHxamnyouZxGxAtbA1X6sBHjG+aXizPVodwn8UM7tm00+G1WnhzwDPPdOksn/DgNeLcyYcJeIBdBJMmhyRIRF7wzw7M0UDQae6SXNDJilBn5OihTTXbflN1rA7VQha90KwLdbg5Uke2I00rFtGbm2coG8SHoaErJt78mPLV9Md7RM6TT7wsJ+VhAvzncWHu3JH0Dl+cZ/x+/nPPILIyiEL2NqG0oAAAAASUVORK5CYII=');
	background-size: contain;
}
</style>
