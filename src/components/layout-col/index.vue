<template>
  <Col
    :span="col.config.span"
    :order="col.config.order"
    :offset="col.config.offset"
    :push="col.config.push"
    :pull="col.config.pull"
    :xs="col.config.xs"
    :sm="col.config.sm"
    :md="col.config.md"
    :lg="col.config.lg"
  >
    <subCol
      v-if="col.content instanceof Array"
      v-for="(item, index, key) in col.content"
      :col="item"
      :key="index"
    />
    <Card
      v-if="col.content.style"
      :style="col.config.style"
    >
      {{col.content.config}}
    </Card>
  </Col>
</template>

<script>
  export default {
    name: 'jvi-col',
    components: {
      subCol: () => import('./index.vue')
    },
    props: {
      col: Object
    }
  }
</script>
<style lang="scss" scoped>
</style>
