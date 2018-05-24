<template>
  <i-form
    :ref="ref"
    :model="value"
    :rules="validate"
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
        :prop="index"
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
        <jvi-switch
          v-if="item.component=='switch'"
          :config="item"
          v-model="value[index]"
        />
        <jvi-radio
          v-if="item.component=='radio'"
          :config="item"
          v-model="value[index]"
        />
      </form-item>
    </template>
    <form-item>
        <i-button
          v-if="!buttonSubmit.hidden"
          :type="buttonSubmit.type"
          :style="buttonSubmit.style"
          :disabled="buttonSubmit.disabled"
          @click="handleSubmit(ref)"
        >
          {{buttonSubmit.title}}
        </i-button>
        <i-button
          v-if="!buttonReset.hidden"
          :type="buttonReset.type"
          :style="buttonReset.style"
          :disabled="buttonReset.disabled"
          @click="handleReset(ref)"
        >
          {{buttonReset.title}}
        </i-button>
    </form-item>
  </i-form>
</template>

<script>
export default {
  name: 'jvi-form',
  data() {
    return {
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
       * @type {Object}
       */
      return this.layout.item? this.layout.item: {}
    },
    /**
     * [buttonSubmit 提交按钮]
     * @type {Object}
     */
    buttonSubmit() {
      return this.layout.config.buttonSubmit? this.layout.config.buttonSubmit: {
        hidden: false,
        disabled: false,
        type: 'primary',
        title: '提交'
      }
    },
    /**
     * [buttonSubmit 提交按钮]
     * @type {Object}
     */
    buttonReset() {
      return this.layout.config.buttonReset? this.layout.config.buttonReset: {
        hidden: false,
        disabled: false,
        type: 'ghost',
        title: '重置',
        style: {
          marginLeft: '3vh'
        }
      }
    }
  },
  created () {
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.$emit('form-submit');
          } else {
              console.log('error submit!! 请检查你的提交信息是否符合规则');
              this.$Message.error('请检查你的提交信息是否符合规范');
          }
      })
    },
    handleReset(name) {;
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    // console.log(this.value);
  }
}
</script>
<style lang="scss" scoped>
  .ivu-form-item{
    margin-bottom: 1vh;
  }
</style>
