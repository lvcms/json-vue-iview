<template>
  <i-form
    :ref="refName"
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
        :key="'form'+key"
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
        <jvi-checkbox
          v-if="item.component=='checkbox'"
          :config="item"
          v-model="value[index]"
        />
        <jvi-select
          v-if="item.component=='select'"
          :config="item"
          v-model="value[index]"
        />
        <jvi-upload
          v-if="item.component=='upload'"
          :config="item"
          v-model="value[index]"
        />
      </form-item>
      <jvi-table
        v-if="item.component=='table'"
        v-model="value[index]"
        :config="item"
        :ref-table="refName+':'+index"
        :key="key"
      />
      <jvi-ag-grid
        v-if="item.component=='agGrid'"
        v-model="value[index]"
        :config="item"
        :ref-table="refName+':'+index"
        :key="key"
      />
      <jvi-button
        v-if="item.component=='button'"
        :config="item"
        :key="key"
        :params="{
          ref: refName
        }"
      />
    </template>
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
      value:{},
      name: String,
  },
  computed: {
    package() {
      return this.$route.name.split(":")[0]
    },
    model() {
      return this.$route.name.split(":")[1]
    },
    refName() {
      /**
       * [ref 获取唯一标识]
       * @type {String}
       */
      return this.package+':'+this.model+':'+this.name
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
  },
  created() {
    this.eventOn()
  },
  beforeDestroy() {
    this.$event.$off('buttin-event')
  },
  methods: {
    /**
    * [eventOn 事件监听]
    * @return {[type]} [description]
    */
    eventOn() {
      this.$event.$on('buttin-event', result => {
        // 增加判断 ref 判断 防止操作其他定义 ref
        if (result.params.ref === this.refName) {
          switch (result.event) {
            case 'form-submit':
              this.formSubmit()
              break;
            case 'form-reset':
              this.formReset()
              break;
          }
        }
      })
    },
    formSubmit() {
      this.$refs[this.refName].validate((valid) => {
          if (valid) {
              this.$emit('form-submit');
          } else {
              console.log('error submit!! 请检查你的提交信息是否符合规则');
              this.$Message.error('请检查你的提交信息是否符合规范');
          }
      })
    },
    formReset() {
      this.$refs[this.refName].resetFields();
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
