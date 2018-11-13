<template>
  <Card
    :style="style"
  >
    <p
      v-if="title"
      slot="title"
    >
      <i
        v-if="icon"
        :class="icon"
      />
      {{ title }}
    </p>
    <jvi-item
        v-if="item"
        :item-name="item"
    />
    <div
        v-if="html"
        v-html="html"
    />
  </Card>
</template>

<script>
  export default {
    name: 'jvi-card',
    props: {
      config: Object,
      content: Object
    },
    computed: {
      /**
       * [style 获取 card 样式配置]
       * @return {[Object]} [description]
       */
      style() {
        return this.config.hasOwnProperty('style')? this.config.style: {}
      },
      /**
       * [title 获取 card 标题]
       * @return {[String]} [description]
       */
      title() {
        return this.config.hasOwnProperty('title')? this.config.title: ''
      },
      /**
       * [icon 获取 icon 图标]
       * @return {[String]} [description]
       */
      icon() {
        return this.config.hasOwnProperty('icon')? this.config.icon: ''
      },
      /**
       * [html 渲染 html]
       * @return {[String]} [description]
       */
      html() {
        return this.content.hasOwnProperty('html')? this.content.html: false
      },
      /**
       * [item 渲染 item 项目]
       * @return {[String]} [description]
       */
      item() {
        return this.content.hasOwnProperty('item')? this.content.item: false
      },
    },
    methods: {
    },
    mounted() {
    }
  }
</script>
<style lang="scss" scoped>
  .ivu-card{
    margin-bottom: 1vh;
    min-width: 275px;
  }
</style>
