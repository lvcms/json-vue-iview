<template>
  <RadioGroup
    v-model="currentValue"
    :type="type"
    :size="size"
    :vertical="vertical"
  >
    <template
      v-for="(option, index, key) in options"
    >
      <Radio
        :label="option.label"
        :disabled="option.disabled"
        :size="option.size"
        :true-value="option.trueValue"
        :false-value="option.falseValue"
      >
        <i :class="option.icon"></i>
        <span>{{ option.title }}</span>
      </Radio>
    </template>
  </RadioGroup>
</template>

<script>
export default {
  name: 'jvi-radio',
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
     * [currentValue 指定当前选中的项目数据。可以使用 v-model 双向绑定数据]
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
     * [type 可选值为 button 或不填，为 button 时使用按钮样式]
     * @return {[String]} [description]
     */
    type() {
      return this.config.type? this.config.type: null
    },
    /**
     * [size 尺寸，可选值为large、small、default或者不设置]
     * @return {[String]} [description]
     */
    size() {
      return this.config.size? this.config.size: null
    },
    /**
     * [vertical 是否垂直排列，按钮样式下无效]
     * @return {[Boolean]} [description]
     */
    vertical() {
      return this.config.vertical? this.config.vertical: false
    },
    /**
     * [options Radio props]
     * @return {[Object]} [description]
     */
    options() {
      return this.config.options? this.config.options: {}
    },

  },
  mounted() {
    // console.log(this.config);
  }
}
</script>
<style lang="scss" scoped>

</style>
