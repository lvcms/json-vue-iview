<template>
    <Tabs
        :value="value"
        :type="type"
        :size="size"
        :closable="closable"
        :animated="animated"
        :capture-focus="captureFocus"
    >
        <TabPane
            v-for="(prop, index) in props"
            :label="prop.hasOwnProperty('label')? prop.label: null"
            :name="prop.hasOwnProperty('name')? prop.name: null"
            :icon="prop.hasOwnProperty('icon')? prop.icon: null"
            :disabled="prop.hasOwnProperty('disabled')? prop.disabled: false"
            :closable="prop.hasOwnProperty('closable')? prop.closable: false"
            :key="index"
        >
            <jvi-item
                v-if="prop.content.hasOwnProperty('item')"
                :item-name="prop.content.item"
            />
            <div
                v-if="prop.content.hasOwnProperty('html')"
                v-html="prop.content.html"
            />
        </TabPane>
    </Tabs>
</template>

<script>
  export default {
    name: 'jvi-tabs',
    props: {
      config: Object,
      props: Array
    },
    computed: {
      /**
       * [value 当前激活 tab 面板的 name，可以使用 v-model 双向绑定数据]
       * 默认为第一项的 name
       * @return {[String]} [description]
       */
      value() {
        return this.config.hasOwnProperty('value')? this.config.value: null
      },
      /**
       * [type 页签的基本样式，可选值为 line 和 card]
       * @return {[String]} [description]
       */
      type() {
        return this.config.hasOwnProperty('type')? this.config.type: 'line'
      },
      /**
       * [size 尺寸，可选值为 default 和 small，仅在 type="line" 时有效]
       * @return {[String]} [description]
       */
      size() {
        return this.config.hasOwnProperty('size')? this.config.size: 'default'
      },
      /**
       * [closable 是否可以关闭页签，仅在 type="card" 时有效]
       * @return {[Boolean]} [description]
       */
      closable() {
        return this.config.hasOwnProperty('closable')? this.config.closable: false
      },
      /**
       * [animated 是否使用 CSS3 动画]
       * @return {[Boolean]} [description]
       */
      animated() {
        return this.config.hasOwnProperty('animated')? this.config.animated: true
      },
      /**
       * [captureFocus 是否可以关闭页签，仅在 type="card" 时有效]
       * @return {[Boolean]} [description]
       */
      captureFocus() {
        return this.config.hasOwnProperty('captureFocus')? this.config.captureFocus: false
      },
    },
    methods: {
        propsa(prop){
            console.log(prop);

        },
    },
    mounted() {
    }
  }
</script>
<style lang="scss" scoped>
</style>
