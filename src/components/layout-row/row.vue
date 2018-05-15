<template>
  <Row
    :gutter="row.config.gutter"
    :type="row.config.type"
    :align="row.config.align"
    :justify="row.config.justify"
  >
    <template
      v-for="(item, index, key) in row.content"
    >
      <jvi-col
       v-if="item.style=='col'"
       :col="item"
      />
      <subRow
        v-if="item.style=='row'"
        :row="item"
      />
    </template>
  </Row>
</template>

<script>
  export default {
    name: 'jvi-row',
    components: {
      subRow: () => import('./row.vue')
    },
    props: {
      row: Object
    }
  }
</script>
<style lang="scss" scoped>
</style>
