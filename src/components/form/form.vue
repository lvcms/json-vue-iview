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
        :ref-name="refName+':'+index"
        :key="key"
      />
      <jvi-ag-grid
        v-if="item.component=='agGrid'"
        v-model="value[index]"
        :config="item"
        :thread-params="Object.assign(threadParams,{'component':index})"
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'jvi-form',
  data() {
    return {
    }
  },
  props: {
      layout:{},
      value:{},
      threadParams: Object,
  },
  computed: {
    ...mapState({
        buttonEvent: state => state.json.button,
    }),
    /**
    * [ref 获取唯一标识]
    * @type {String}
    */
    refName() {
      return this.threadParams.package+':'+this.threadParams.model+':'+this.threadParams.item
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
  watch: {
        buttonEvent: {
            handler: 'handleButtonEvent',
            deep: true
        },
  },
  methods: {
    ...mapActions([
        'handlerUpdateEvent',
        'eventFormSubmit',
        'graphqlError'
    ]),
    /**
    * [handleButtonEvent 事件监听]
    * @return {[type]} [description]
    */
    handleButtonEvent() {
        // 增加判断 ref 判断 防止操作其他定义 ref
        if (this.buttonEvent.params.ref === this.refName && this.buttonEvent.event) {
            if (this.buttonEvent.event.includes('formSubmit')) {
                this.formSubmit()
            }
            if (this.buttonEvent.event.includes('formReset')) {
                this.formReset()
            }
        }
    },
    formSubmit() {
      this.$refs[this.refName].validate((valid) => {
          if (valid) {
                this.$emit('form-submit');
                this.handlerUpdateEvent({
                    apollo: this.$apollo,
                    threadParams: this.threadParams,
                    params: this.value
                }).then((result) => {
                    this.eventFormSubmit(result).then( ({message}) => {
                        this.$Message.success(message)
                    })
                }).catch((error) => {
                    this.graphqlError(error).then( message => {
                        this.$Message.error(message)
                    })
                })
          } else {
              console.log('error submit!! 请检查你的提交信息是否符合规则');
              this.$Message.error('请检查你的提交信息是否符合规范');
          }
      })
    },
    formReset() {
        this.$emit('form-reset');
        this.$refs[this.refName].resetFields();
    },
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
