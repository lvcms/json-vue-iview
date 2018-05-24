<template>
  <CheckboxGroup
    v-model="currentValue"
    :type="type"
    :size="size"
  >
    <template
      v-for="(option, index, key) in options"
    >
      <Checkbox
        :label="option.label"
        :disabled="option.disabled"
        :size="option.size"
        :true-value="option.trueValue"
        :false-value="option.falseValue"
      >
        <i :class="option.icon"></i>
        <span>{{ option.title }}</span>
      </Checkbox>
    </template>
  </CheckboxGroup>
</template>

<script>
export default {
  name: 'jvi-checkbox',
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
     * [currentValue 指定当前选中的项目数据。可以使用 v-model 双向绑定数据]
     * @type {String | Number}
     */
    currentValue: {
      get() {
        return this.value? this.value: this.config.default
      },
      set(newValue) {
        console.log(newValue);
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
