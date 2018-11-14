<template>
  <i-button
    v-if="display"
    :type="type"
    :ghost="ghost"
    :size="size"
    :shape="shape"
    :long="long"
    :html-type="htmlType"
    :disabled="disabled"
    :loading="loading"
    :custom-icon="customIcon"
    :to="to"
    :replace="replace"
    :target="target"
    @click="handlerClick"
    :style="style"
  >
    <i :class="icon" style="width:auto"></i>
    {{title}}
  </i-button>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'jvi-button',
  props: {
    config: Object,
    params: {
      type: [String,Number,Object],
      default:null // 传入 params 值 例：当前操作数据 id
    },
  },
  computed: {
    /**
     * [style 自定义按钮样式 一般用于控制位置]
     * @return {String} [description]
     */
    style() {
      return this.config.hasOwnProperty('style')? this.config.type: {}
    },
    /**
     * [type 按钮类型，可选值为 default、primary、dashed、text、info、success、warning、error或者不设置]
     * @return {String} [description]
     */
    type() {
      return this.config.hasOwnProperty('type')? this.config.type: 'default'
    },
    /**
     * [ghost 幽灵属性，使按钮背景透明]
     * @return {Boolean} [description]
     */
    ghost() {
      return this.config.hasOwnProperty('ghost')? this.config.ghost: false
    },
    /**
     * [size 按钮大小，可选值为large、small、default或者不设置]
     * @return {String} [description]
     */
    size() {
      return this.config.hasOwnProperty('size')? this.config.size: 'default'
    },
    /**
     * [shape 按钮形状，可选值为circle或者不设置]
     * @return {String} [description]
     */
    shape() {
      return this.config.hasOwnProperty('shape')? this.config.shape: null
    },
    /**
     * [long 开启后，按钮的长度为 100%]
     * @return {Boolean} [description]
     */
    long() {
      return this.config.hasOwnProperty('long')? this.config.long: false
    },
    /**
     * [htmlType 设置button原生的type，可选值为button、submit、reset]
     * @return {String} [description]
     */
    htmlType() {
      return this.config.hasOwnProperty('htmlType')? this.config.htmlType: 'button'
    },
    /**
     * [disabled 设置按钮为禁用状态]
     * @return {Boolean} [description]
     */
    disabled() {
      return this.config.hasOwnProperty('disabled')? this.config.disabled: false
    },
    /**
     * [loading 设置按钮为加载中状态]
     * @return {Boolean} [description]
     */
    loading() {
      return this.config.hasOwnProperty('loading')? this.config.loading: false
    },
    /**
     * [icon 设置按钮的图标类型]
     * @return {String} [description]
     */
    icon() {
      return this.config.hasOwnProperty('icon')? this.config.icon: null
    },
    /**
     * [customIcon 设置按钮的自定义图标]
     * @return {String} [description]
     */
    customIcon() {
      return this.config.hasOwnProperty('customIcon')? this.config.customIcon: null
    },
    /**
     * [to 跳转的链接，支持 vue-router 对象]
     * @return {String | Object} [description]
     */
    to() {
      return this.config.hasOwnProperty('to')? this.config.to: null
    },
    /**
     * [replace 路由跳转时，开启 replace 将不 会向 history 添加新记录]
     * @return {Boolean} [description]
     */
    replace() {
      return this.config.hasOwnProperty('replace')? this.config.replace: false
    },
    /**
     * [target 相当于 a 链接的 target 属性]
     * @return {String} [description]
     */
    target() {
      return this.config.hasOwnProperty('target')? this.config.target: '_self'
    },
    /**
     * [title 按钮显示标题内容]
     * @return {String} [description]
     */
    title() {
      return this.config.hasOwnProperty('title')? this.config.title: null
    },
    /**
     * [title 按钮是否显示]
     * @return {Boolean} [description]
     */
    display() {
        return this.config.hasOwnProperty('display')? this.config.display: true
    },
    /**
     * [confirm 确认框对象]
     * @return {Boolean} [description]
     */
    confirm() {
        let confirm = {
            title:'危险提示',
            content:'此操作具有不可逆性, 是否继续?',
            cancel:'已取消操作',
            okText: '确定',
            cancelText: '取消'
        }
        return this.config.hasOwnProperty('confirm')? Object.assign(confirm,this.config.confirm): false
    },
    /**
     * [modal 按钮点击触发弹窗事件]
     *  触发弹窗名称
     *  默认 false 不触发
     * @return {String | Boolean} [description]
     */
    modal() {
      return this.config.hasOwnProperty('modal')? this.config.modal: false
    },
    /**
     * [event 按钮点击事件]
     * @return {String} [description]
     */
    event() {
      return this.config.hasOwnProperty('event')? this.config.event: null
    },
  },
  methods: {
    ...mapActions([
        'eventModal',
        'eventButton',
    ]),
    handlerClick() {
        this.handlerConfirm().then(() => {
            let params = {
                event: this.event,
                params: this.params
            }
            if (this.modal) {
                this.eventModal({
                    name: this.modal,
                    params
                })     //打开弹窗
            }
            this.$emit('click',params)
            this.eventButton(params)
        })
    },
    handlerConfirm() {
        return new Promise((resolve, reject) => {
            if (this.confirm) {
                this.$Modal.confirm({
                    title: this.confirm.title,
                    content: this.confirm.content,
                    okText: this.confirm.okText,
                    cancelText: this.confirm.cancelText,
                    onOk: () => {
                        resolve()
                    },
                    onCancel: () => {
                        this.$Message.info(this.confirm.cancel);
                    }
                })
            }else{
                resolve()
            }
        })
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
</style>

