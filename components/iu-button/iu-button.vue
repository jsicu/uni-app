<!-- 
/**
 * @Author: 老林头
 * @Date: 2020-11-10 16:24:22
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain:
 * @ChildComponents:
 */ -->
<template>
  <button
    class="iu-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'iu-button--' + type : '',
      buttonSize ? 'iu-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
		:style="inlineStyle"
  >
    <i class="iu-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'IuButton',

    inject: {
      iuForm: {
        default: ''
      },
      iuFormItem: {
        default: ''
      }
    },

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean,
			// #ifdef MP
			style: String,
			// #endif
    },
		data() {
			return {
			}
		},

    computed: {
			inlineStyle() {
				if(this.style) return this.style
				return {}
			},
      _iuFormItemSize() {
        return (this.iuFormItem || {}).iuFormItemSize;
      },
      buttonSize() {
        return this.size || this._iuFormItemSize || (this.$ELEMENT || {}).size;
      },
      buttonDisabled() {
        return this.disabled || (this.iuForm || {}).disabled;
      }
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
