<template>
  <i-col
    :span="config.span"
    :order="config.order"
    :offset="config.offset"
    :push="config.push"
    :pull="config.pull"
    :xs="config.xs"
    :sm="config.sm"
    :md="config.md"
    :lg="config.lg"
  >
    <template
      v-for="(value, index) in content"
    >
      <div
        v-if="value.style == 'item'"
        :key="index"
      >
        <jvi-item
            v-if="value.content.hasOwnProperty('item')"
            :item-name="value.content.item"
        />
        <div
            v-if="value.content.hasOwnProperty('html')"
            v-html="value.content.html"
        />
      </div>
      <jvi-tabs
        v-if="value.style == 'tabs'"
        :config="value.config"
        :props="value.props"
        :key="index"
      />
      <jvi-card
        v-if="value.style == 'card'"
        :config="value.config"
        :content="value.content"
        :key="index"
      />
      <subCol
        v-if="value.style == 'col'"
        :col="value"
        :key="index"
      />
    </template>
  </i-col>
</template>

<script>
  export default {
    name: 'jvi-col',
    components: {
      subCol: () => import('./col.vue')
    },
    props: {
      col: Object
    },
    computed: {
      /**
       * [config 获取 col 配置]
       * @return {[Object]} [description]
       */
      config() {
        return this.col.config
      },
      content() {
        return this.col.content
      },
    }
  }
</script>
<style lang="scss" scoped>
</style>
