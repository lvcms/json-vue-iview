<template>
  <i-form
    :ref="ref"
    :model="value"
    :rules="formValidate"
    :inline="inline"
    :label-position="labelPosition"
    :label-width="labelWidth"
    :show-message="showMessage"
    :autocomplete="autocomplete"
  >
    <template
     v-if="items"
     v-for="(item, index, key) in items"
    >
      <form-item
        :label="item.label"
        :prop="item.index"
        :label-width="item.labelWidth"
        :label-for="item.labelFor"
        :required="item.required"
        :rules="item.rules"
        :error="item.error"
        :show-message="item.showMessage"
      >
        <jvi-input
          v-if="item.component=='input'"
          :config="item"
          v-model="value[index]"
        />
      </form-item>
    </template>
  </i-form>
</template>

<script>
export default {
  name: 'jvi-form',
  data() {
    return {
      formValidate: {
        mail: 'xilewanggou@126.com',
        city: 'beijing',
      },
      input:'demo'
    }
  },
  props: {
      layout:{},
      value:{}
  },
  computed: {
    ref() {
      /**
       * [ref 获取唯一标识]
       * @type {String}
       */
      return this.layout.config.ref? this.layout.config.ref: null
    },
    validate() {
      /**
       * [validate 表单验证规则，具体配置查看  async-validator]
       * @type {Object}
       */
      return this.layout.config.validate? this.layout.config.validate: {}
    },
    inline() {
      /**
       * [inline 是否开启行内表单模式]
       * @type {Boolean}
       */
      return this.layout.config.inline? this.layout.config.inline: false
    },
    labelPosition() {
      /**
       * [labelPosition 表单域标签的位置，可选值为 left、right、top]
       * @type {String}
       */
      return this.layout.config.labelPosition? this.layout.config.labelPosition: 'right'
    },
    labelWidth() {
      /**
       * [labelWidth 表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值]
       * @type {Number}
       */
      return this.layout.config.labelWidth? this.layout.config.labelWidth: 0
    },
    showMessage() {
      /**
       * [showMessage 是否显示校验错误信息]
       * @type {Boolean}
       */
      return this.layout.config.showMessage? this.layout.config.showMessage: true
    },
    autocomplete() {
      /**
       * [autocomplete 原生的 autocomplete 属性，可选值为 off 或 on]
       * @type {String}
       */
      return this.layout.config.autocomplete? this.layout.config.autocomplete: 'off'
    },
    items() {
      /**
       * [autocomplete 原生的 autocomplete 属性，可选值为 off 或 on]
       * @type {String}
       */
      return this.layout.item? this.layout.item: {}
    }
  },
  created () {
  },
  methods: {

  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
  .ivu-form-item{
    margin-bottom: 1vh;
  }
</style>
