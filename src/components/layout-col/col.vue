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
      <jvi-item
        v-if="value.style == 'item'"
        :config="value.config"
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
     * @return {[String]} [description]
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
