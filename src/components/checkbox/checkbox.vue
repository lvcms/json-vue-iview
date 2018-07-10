<template>
  <div>
    <Checkbox
      v-if="allSelect"
      :indeterminate="indeterminate"
      :value="checkAll"
      @click.prevent.native="handleCheckAll"
    >
        {{ allSelectName }}
    </Checkbox>
    <CheckboxGroup
      v-model="currentValue"
      :type="type"
      :size="size"
      @on-change="checkAllGroupChange"
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
          :key="key"
        >
          <i :class="option.icon"></i>
          <span>{{ option.title }}</span>
        </Checkbox>
      </template>
    </CheckboxGroup>
  </div>
</template>

<script>
export default {
  name: 'jvi-checkbox',
  data () {
    return {
      indeterminate: false,
      checkAll:false,
    }
  },
  props: {
    config: {
        type: Object,
    },
    value: {
        type: [String, Array],
    },
  },
  computed: {
    /**
     * [currentValue 指定当前选中的项目数据。可以使用 v-model 双向绑定数据]
     * @type {String}
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
    /**
     * [optionLabels 根据配置获取全选后的 label ]
     * @return {[Object]} [description]
     */
    optionLabels() {
      return this.config.options.map(item=>item.label)
    },
    /**
     * [allSelect 全选是否显示]
     * @return {[Boolean]} [description]
     */
    allSelect() {
      return this.config.allSelect? this.config.allSelect: false
    },
    /**
     * [allSelectName 全选名称]
     * @return {[String]} [description]
     */
    allSelectName() {
      return this.config.allSelectName? this.config.allSelectName: '全选'
    }
  },
  methods: {
    handleCheckAll() {
      if (this.indeterminate) {
          this.checkAll = false;
      } else {
          this.checkAll = !this.checkAll;
      }
      this.indeterminate = false
      if (this.checkAll) {
          this.currentValue = this.optionLabels;
      } else {
          this.currentValue = [];
      }
    },
    checkAllGroupChange (data) {
      if (data.length) {
        if ((this.optionLabels.length == data.length)) {
          this.checkAll = true
          this.indeterminate = false
        }else {
          this.checkAll = false
          this.indeterminate = true
        }
      }else{
        this.checkAll = false
        this.indeterminate = false
      }
    }
  },
  mounted() {
    this.checkAllGroupChange(this.currentValue)
  }
}
</script>
<style lang="scss" scoped>
</style>
