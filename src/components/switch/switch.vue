<template>
    <i-switch
      v-model="currentValue"
      :size="size"
      :disabled="disabled"
      :true-value="trueValue"
      :false-value="falseValue"
    >
      <span slot="open">{{open}}</span>
      <span slot="close">{{close}}</span>
    </i-switch>
</template>

<script>
export default {
  name: 'jvi-switch',
  props: {
    config: {
        type: Object,
    },
    value:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * [currentValue 绑定的值，可使用 v-model 双向绑定]
     * @type {String | Number}
     */
    currentValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },
    /**
     * [size 开关的尺寸，可选值为large、small、default或者不写。建议开关如果使用了2个汉字的文字，使用 large。]
     * @return {[String]} [description]
     */
    size() {
      return this.config.size? this.config.size: 'large'
    },
    /**
     * [disabled 禁用开关]
     * @return {[Boolean]} [description]
     */
    disabled() {
      return this.config.disabled? this.config.disabled: false
    },
    /**
     * [trueValue 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用]
     * @return {[String, Number, Boolean]} [description]
     */
    trueValue() {
      return this.config.trueValue? this.config.trueValue: true
    },
    /**
     * [falseValue 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用]
     * @return {[String, Number, Boolean]} [description]
     */
    falseValue() {
      return this.config.falseValue? this.config.falseValue: false
    },
    /**
     * [open 自定义显示打开时的内容]
     * @return {[String]} [description]
     */
    open() {
      return this.config.open? this.config.open: '开启'
    },
    /**
     * [close自定义显示关闭时的内容]
     * @return {[String]} [description]
     */
    close() {
      return this.config.close? this.config.close: '关闭'
    },
  },
  mounted() {
    // console.log(this.config);
  }
}
</script>
<style lang="scss" scoped>

</style>
