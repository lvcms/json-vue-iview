<template>
    <i-input
      v-model="currentValue"
      :type="type"
      :size="size"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :icon="icon"
      :rows="rows"
      :autosize="autosize"
      :number="number"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :element-id="elementId"
      :spellcheck="spellcheck"
      :wrap="wrap"
      :style="style"
    >
      <span slot="prepend" v-if="prepend">
        <i v-if="prepend.icon" :class="prepend.icon"></i>
        <span v-else>
          {{prepend}}
        </span>
      </span>
      <span slot="append" v-if="append">
        <i v-if="append.icon" :class="append.icon"></i>
        <span v-else>
          {{append}}
        </span>
      </span>
    </i-input>
</template>

<script>
export default {
  name: 'jvi-input',
  props: {
    config: {
        type: Object,
    },
    value: {
        type: [String, Number],
    },
  },
  computed: {
    /**
     * [currentValue 绑定的值，可使用 v-model 双向绑定]
     * @type {String | Number}
     */
    currentValue: {
      get() {
        return this.value? this.value: this.config.default
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },
    /**
     * [type 输入框类型，可选值为 text、password、textarea、url、email、date]
     * @return {[String]} [description]
     */
    type() {
      return this.config.type? this.config.type: 'text'
    },
    /**
     * [size 输入框尺寸，可选值为large、small、default或者不设置]
     * @return {[String]} [description]
     */
    size() {
      return this.config.size? this.config.size: null
    },
    /**
     * [placeholder 占位文本]
     * @return {[String]} [description]
     */
    placeholder() {
      return this.config.placeholder? this.config.placeholder: null
    },
    /**
     * [clearable 是否显示清空按钮]
     * @return {[Boolean]} [description]
     */
    clearable() {
      return this.config.clearable? this.config.clearable: false
    },
    /**
     * [disabled 设置输入框为禁用状态]
     * @return {[Boolean]} [description]
     */
    disabled() {
      return this.config.disabled? this.config.disabled: false
    },
    /**
     * [readonly 设置输入框为只读]
     * @return {[Boolean]} [description]
     */
    readonly() {
      return this.config.readonly? this.config.readonly: false
    },
    /**
     * [maxlength 最大输入长度]
     * @return {[Number]} [description]
     */
    maxlength() {
      return this.config.maxlength? this.config.maxlength: null
    },
    /**
     * [icon 输入框尾部图标，仅在 text 类型下有效 必须是 iview 图标]
     * @return {[String]} [description]
     */
    icon() {
      return this.config.icon? this.config.icon: null
    },
    /**
     * [rows 文本域默认行数，仅在 textarea 类型下有效]
     * @return {[Number]} [description]
     */
    rows() {
      return this.config.rows? this.config.rows: 2
    },
    /**
     * [autosize 自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 }]
     * @return {[Boolean | Object]} [description]
     */
    autosize() {
      return this.config.autosize? this.config.autosize: false
    },
    /**
     * [number 将用户的输入转换为 Number 类型]
     * @return {[Boolean]} [description]
     */
    number() {
      return this.config.number? this.config.number: false
    },
    /**
     * [autofocus 自动获取焦点]
     * @return {[Boolean]} [description]
     */
    autofocus() {
      return this.config.autofocus? this.config.autofocus: false
    },
    /**
     * [autocomplete 自动获取焦点]
     * @return {[String]} [description]
     */
    autocomplete() {
      return this.config.autocomplete? this.config.autocomplete: 'off'
    },
    /**
     * [elementId 给表单元素设置 id，详见 Form 用法。]
     * @return {[String]} [description]
     */
    elementId() {
      return this.config.elementId? this.config.elementId: null
    },
    /**
     * [spellcheck 原生的 spellcheck 属性]
     * @return {[Boolean]} [description]
     */
    spellcheck() {
      return this.config.spellcheck? this.config.spellcheck: false
    },
    /**
     * [wrap 原生的 wrap 属性，可选值为 hard 和 soft，仅在 textarea 下生效]
     * @return {[String]} [description]
     */
    wrap() {
      return this.config.wrap? this.config.wrap: 'soft'
    },
    /**
     * [style 自定义样式]
     * @return {[Object]} [description]
     */
    style() {
      return this.config.style? this.config.style: {}
    },
    /**
     * [prepend 前置内容，仅在 text 类型下有效]
     * @return {[String | Object]} [description]
     */
    prepend() {
      return this.config.prepend? this.config.prepend: false
    },
    /**
     * [append 后置内容，仅在 text 类型下有效]
     * @return {[String | Object]} [description]
     */
    append() {
      return this.config.append? this.config.append: false
    }
  },
  mounted() {
    // console.log(this.config);
  }
}
</script>
<style lang="scss" scoped>
  i{
     width:14px;
     height:14px;
  }
</style>
