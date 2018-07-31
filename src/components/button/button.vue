<template>
  <i-button
    :type="type"
    :ghost="ghost"
    :size="size"
    :shape="shape"
    :long="long"
    :style="style"
    :html-type="htmlType"
    :disabled="disabled"
    :loading="loading"
    :icon="icon"
    :custom-icon="customIcon"
    :to="to"
    :replace="replace"
    :target="target"
    @click="handleButtin()"
  >
    {{buttonSubmit.title}}
  </i-button>
</template>

<script>
export default {
  name: 'jvi-button',
  props: {
    config: {
        type: Object,
    },
    value: {
        type: [Array, Object],
    },
  },
  computed: {
    /**
     * [type 按钮类型，可选值为 default、primary、dashed、text、info、success、warning、error或者不设置]
     * @return {String} [description]
     */
    type() {
      return this.config.hasOwnProperty('type')? this.config.type: 'default'
    },
    /**
     * [ghost 幽灵属性，使按钮背景透明]
     * @return {Boolean} [description]
     */
    ghost() {
      return this.config.hasOwnProperty('ghost')? this.config.ghost: false
    },
    /**
     * [size 按钮大小，可选值为large、small、default或者不设置]
     * @return {String} [description]
     */
    size() {
      return this.config.hasOwnProperty('size')? this.config.size: 'default'
    },
    /**
     * [shape 按钮形状，可选值为circle或者不设置]
     * @return {String} [description]
     */
    shape() {
      return this.config.hasOwnProperty('shape')? this.config.shape: null
    },
    /**
     * [long 开启后，按钮的长度为 100%]
     * @return {Boolean} [description]
     */
    long() {
      return this.config.hasOwnProperty('long')? this.config.long: false
    },
    /**
     * [htmlType 设置button原生的type，可选值为button、submit、reset]
     * @return {String} [description]
     */
    htmlType() {
      return this.config.hasOwnProperty('htmlType')? this.config.htmlType: 'button'
    },
    /**
     * [disabled 设置按钮为禁用状态]
     * @return {Boolean} [description]
     */
    disabled() {
      return this.config.hasOwnProperty('disabled')? this.config.disabled: false
    },
    /**
     * [loading 设置按钮为加载中状态]
     * @return {Boolean} [description]
     */
    loading() {
      return this.config.hasOwnProperty('loading')? this.config.loading: false
    },
    /**
     * [icon 设置按钮的图标类型]
     * @return {String} [description]
     */
    icon() {
      return this.config.hasOwnProperty('icon')? this.config.icon: null
    },
    /**
     * [customIcon 设置按钮的自定义图标]
     * @return {String} [description]
     */
    customIcon() {
      return this.config.hasOwnProperty('customIcon')? this.config.customIcon: null
    },
    /**
     * [to 跳转的链接，支持 vue-router 对象]
     * @return {String | Object} [description]
     */
    to() {
      return this.config.hasOwnProperty('to')? this.config.to: null
    },
    /**
     * [replace 路由跳转时，开启 replace 将不会向 history 添加新记录]
     * @return {Boolean} [description]
     */
    replace() {
      return this.config.hasOwnProperty('replace')? this.config.replace: false
    },
    /**
     * [target 相当于 a 链接的 target 属性]
     * @return {Boolean} [description]
     */
    target() {
      return this.config.hasOwnProperty('target')? this.config.target: '_self'
    },
    /**
     * [event 按钮点击事件]
     * @return {Boolean} [description]
     */
    event() {
      return this.config.hasOwnProperty('event')? this.config.event: null
    },

  },
  methods: {
    handleButtin() {
      this.$event.$emit('buttin-event', this.event);
    }
  },
  mounted() {
    // console.log(this.refTable);
  }
}
</script>
<style lang="scss" scoped>
</style>
