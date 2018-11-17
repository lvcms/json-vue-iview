<template>
    <div>
        <Modal
            v-model="$store.state.json.modal[name]"
            :title="title"
            :closable="closable"
            :maskClosable="maskClosable"
            :loading="loading"
            :scrollable="scrollable"
            :fullscreen="fullscreen"
            :draggable="draggable"
            :width="width"
            :footerHide="footerHide"
            :styles="styles"
            :className="className"
            :zIndex="zIndex"
        >
            <jvi-row
                v-for="(row, index) in layout"
                :row="row"
                :modal="name"
                :key="index"
            />
        </Modal>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'jvi-modal',
    props: {
      config: Object,
      layout: Array,
      name: String,
    },
    computed: {
        ...mapState({
            buttonEvent: state => state.json.button,
        }),
        /**
         * [title 页签的基本样式，可选值为 line 和 card]
         * @return {[String]} [description]
         */
        title() {
            return this.config.hasOwnProperty('title')? this.config.title: null
        },
        /**
         * [closable 是否显示右上角的关闭按钮，关闭后 Esc 按键也将关闭]
         * @return {[Boolean]} [description]
         */
        closable() {
            return this.config.hasOwnProperty('closable')? this.config.closable: true
        },
        /**
         * [maskClosable 是否允许点击遮罩层关闭]
         * @return {[Boolean]} [description]
         */
        maskClosable() {
            return this.config.hasOwnProperty('maskClosable')? this.config.maskClosable: true
        },
        /**
         * [loading 点击确定按钮时，确定按钮是否显示 loading 状态，开启则需手动设置value来关闭对话框]
         * @return {[Boolean]} [description]
         */
        loading() {
            return this.config.hasOwnProperty('loading')? this.config.loading: false
        },
        /**
         * [scrollable 页面是否可以滚动]
         * @return {[Boolean]} [description]
         */
        scrollable() {
            return this.config.hasOwnProperty('scrollable')? this.config.scrollable: false
        },
        /**
         * [fullscreen 是否全屏显示]
         * @return {[Boolean]} [description]
         */
        fullscreen() {
            return this.config.hasOwnProperty('fullscreen')? this.config.fullscreen: false
        },
        /**
         * [draggable 是否可以拖拽移动]
         * @return {[Boolean]} [description]
         */
        draggable() {
            return this.config.hasOwnProperty('draggable')? this.config.draggable: false
        },
        /**
         * [mask 是否显示遮罩层，开启 draggable 时，强制不显示]
         * @return {[Boolean]} [description]
         */
        mask() {
            return this.config.hasOwnProperty('mask')? this.config.mask: true
        },
        /**
         * [width 对话框宽度，对话框的宽度是响应式的，当屏幕尺寸小于 768px 时，宽度会变为自动auto。当其值不大于 100 时以百分比显示，大于 100 时为像素]
         * @return {[Number | String]} [description]
         */
        width() {
            return this.config.hasOwnProperty('width')? this.config.width: 520
        },
        /**
         * [footerHide 不显示底部]
         * @return {[Boolean]} [description]
         */
        footerHide() {
            return this.config.hasOwnProperty('footerHide')? this.config.footerHide: true
        },
        /**
         * [styles 设置浮层样式，调整浮层位置等，该属性设置的是.ivu-modal的样式]
         * @return {[Object]} [description]
         */
        styles() {
            return this.config.hasOwnProperty('styles')? this.config.styles: {}
        },
        /**
         * [className 设置对话框容器.ivu-modal-wrap的类名，可辅助实现垂直居中等自定义效果]
         * @return {[String]} [description]
         */
        className() {
            return this.config.hasOwnProperty('className')? this.config.className: null
        },
        /**
         * [zIndex 是否显示遮罩层，开启 draggable 时，强制不显示]
         * @return {[Number]} [description]
         */
        zIndex() {
            return this.config.hasOwnProperty('zIndex')? this.config.zIndex: 1000
        },
        /**
         * [mask 是否显示遮罩层，开启 draggable 时，强制不显示]
         * @return {[Boolean]} [description]
         */
        mask() {
            return this.config.hasOwnProperty('mask')? this.config.mask: true
        },
    },
    watch: {
        buttonEvent: {
            handler: 'handleButtonEvent',
            deep: true
        },
    },
    methods: {
        /**
        * [handleButtonEvent 事件监听]
        * @return {[type]} [description]
        */
        handleButtonEvent() {
            // 增加判断 ref 判断 防止操作其他定义 ref
            if (this.buttonEvent.event) {
                if (this.buttonEvent.event.includes('closeModal')) {
                    this.$store.state.json.modal[this.name] = false
                }
            }
        },
    },
    mounted() {
    }
  }
</script>
<style lang="scss" >
</style>
