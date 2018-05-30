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
  >
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
        return this.value? this.value: this.config.default
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
     * [label 选择框大小，可选值为large、small、default或者不填]
     * @return {[String]} [description]
     */
    size() {
      return this.config.size? this.config.size: ''
    },
    /**
     * [placeholder 选择框默认文字]
     * @return {[String]} [description]
     */
    placeholder() {
      return this.config.placeholder? this.config.placeholder: '请选择'
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        } else {
          // this.options = [];
        }
    }
  },
  mounted() {
    // console.log(this.config);
  }
}
</script>
<style lang="scss" scoped>

</style>
