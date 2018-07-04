<template>
  <Select
    v-model="currentValue"
    :style="style"
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    :filterable="filterable"
    :remote="remote"
    :remote-method="remoteMethod"
    :loading="loading"
    :loading-text="loadingText"
    :label="label"
    :size="size"
    :placeholder="placeholder"
    :not-found-text="notFoundText"
    :label-in-value="labelInValue"
    :transfer="transfer"
    :element-id="elementId"
  >
   <Option
     v-for="option in options"
     :value="option.value"
     :label="option.label"
     :disabled="option.disabled"
     :key="option.value"
   >
  </Option>
  </Select>
</template>

<script>
export default {
  name: 'jvi-select',
  props: {
    config: {
        type: Object,
    },
    value: {
        type: [String, Number, Array],
    },
  },
  computed: {
    /**
     * [currentValue 指定选中项目的 value 值，可以使用 v-model 双向绑定数据。单选时只接受 String 或 Number，多选时只接受 Array]
     * @type {String | Number, Array}
     */
    currentValue: {
      get() {
        return this.value? this.value: []
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },
    /**
     * [style 样式]
     * @return {[Object]} [description]
     */
    style() {
      return this.config.style? this.config.style: {}
    },
    /**
     * [multiple 是否支持多选]
     * @return {[Boolean]} [description]
     */
    multiple() {
      return this.config.multiple? this.config.multiple: false
    },
    /**
     * [disabled 是否支持多选]
     * @return {[Boolean]} [description]
     */
    disabled() {
      return this.config.disabled? this.config.disabled: false
    },
    /**
     * [clearable 是否可以清空选项，只在单选时有效]
     * @return {[Boolean]} [description]
     */
    clearable() {
      return this.config.clearable? this.config.clearable: false
    },
    /**
     * [filterable 是否支持搜索]
     * @return {[Boolean]} [description]
     */
    filterable() {
      return this.config.filterable? this.config.filterable: false
    },
    /**
     * [remote 	是否使用远程搜索]
     * @return {[Boolean]} [description]
     */
    remote() {
      return this.config.remote? this.config.remote: false
    },
    /**
     * [loading 当前是否正在远程搜索]
     * @return {[Boolean]} [description]
     */
    loading() {
      return this.config.loading? this.config.loading: false
    },
    /**
     * [loading 远程搜索中的文字提示]
     * @return {[String]} [description]
     */
    loadingText() {
      return this.config.loadingText? this.config.loadingText: '加载中'
    },
    /**
     * [label 仅在 remote 模式下，初始化时使用。因为仅通过 value 无法得知选项的 label，需手动设置。]
     * @return {[String | Number | Array]} [description]
     */
    label() {
      return this.config.label? this.config.label: ''
    },
    /**
     * [size 选择框大小，可选值为large、small、default或者不填]
     * @return {[String]} [description]
     */
    size() {
      return this.config.size? this.config.size: 'default'
    },
    /**
     * [placeholder 选择框默认文字]
     * @return {[String]} [description]
     */
    placeholder() {
      return this.config.placeholder? this.config.placeholder: '请选择'
    },
    /**
     * [notFoundText 选择框默认文字]
     * @return {[String]} [description]
     */
    notFoundText() {
      return this.config.notFoundText? this.config.notFoundText: '无匹配数据'
    },
    /**
     * [labelInValue 在返回选项时，是否将 label 和 value 一并返回，默认只返回 value]
     * @return {[Boolean]} [description]
     */
    labelInValue() {
      return this.config.labelInValue? this.labelInValue.labelInValue: false
    },
    /**
     * [transfer 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果]
     * @return {[Boolean]} [description]
     */
    transfer() {
      return this.config.transfer? this.labelInValue.transfer: false
    },
    /**
     * [elementId 给表单元素设置 id，详见 Form 用法。]
     * @return {[String]} [description]
     */
    elementId() {
      return this.config.elementId? this.config.elementId: ''
    },

    /**
     * [options Radio props]
     * @return {[Object]} [description]
     */
    options() {
      return this.config.options? this.config.options: {}
    },
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        } else {
          this.options = [];
        }
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>

</style>
