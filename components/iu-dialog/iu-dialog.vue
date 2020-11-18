<!-- 
/**
 * @Author: 老林头
 * @Date: 2020-11-16 11:29:09
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain: 对话框组件
 * @ChildComponents:
 */ -->
<template>
	<transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
		<div v-show="visible" class="iu-dialog__wrapper" @click.self="handleWrapperClick">
			<div ref="dialog" :style="style">
				<slot name="title">
					<span class="iu-dialog__title">{{ title }}</span>
				</slot>
				<slot></slot>
				<slot name="footer"></slot>
			</div>
		</div>
	</transition>
</template>

<script>
import Popup from '@/utils/popup';
export default {
	name: 'MyDialog',
	components: {},
	mixins: [Popup],

	props: {
		visible: {
			type: Boolean,
			default: false
		},
		modal: {
			type: Boolean,
			default: true
		},
		title: {
			type: String,
			default: ''
		},
		closeOnClickModal: {
			type: Boolean,
			default: true
		},
		fullscreen: Boolean,
		beforeClose: Function
	},
	data() {
		return {
			closed: false,
			key: 0
		};
	},
	//监听属性 类似于data概念
	computed: {
		style() {
			let style = {};
			if (!this.fullscreen) {
				style.marginTop = this.top;
				if (this.width) {
					style.width = this.width;
				}
			}
			return style;
		}
	},
	watch: {
		visible(val) {
			if (val) {
				this.closed = false;
				this.$emit('open');
				this.$el.addEventListener('scroll', this.updatePopper);
				this.$nextTick(() => {
					// this.$refs.dialog.scrollTop = 0;
				});
				if (this.appendToBody) {
					document.body.appendChild(this.$el);
				}
			} else {
				this.$el.removeEventListener('scroll', this.updatePopper);
				if (!this.closed) this.$emit('close');
				if (this.destroyOnClose) {
					this.$nextTick(() => {
						this.key++;
					});
				}
			}
		}
	},
	//方法集合
	methods: {
		handleWrapperClick() {
			if (!this.closeOnClickModal) return;
			this.handleClose();
		},
		handleClose() {
			if (typeof this.beforeClose === 'function') {
				this.beforeClose(this.hide);
			} else {
				this.hide();
			}
		},
		hide(cancel) {
			if (cancel !== false) {
				this.$emit('update:visible', false);
				this.$emit('close');
				this.closed = true;
			}
		},
		afterEnter() {
			this.$emit('opened');
		},
		afterLeave() {
			this.$emit('closed');
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
