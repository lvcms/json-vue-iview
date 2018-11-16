<template>
  <Row
    :gutter="gutter"
    :type="type"
    :align="align"
    :justify="justify"
  >
    <template
      v-for="(item, index, key) in row.content"
    >
      <jvi-col
       v-if="item.style=='col'"
       :col="item"
       :modal="modal"
       :key="key"
      />
      <subRow
        v-if="item.style=='row'"
        :row="item"
        :modal="modal"
        :key="key"
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
      row: Object,
      modal: {
            type: String,
            default: null
      },
    },
    computed: {
        config() {
            return this.row.hasOwnProperty('config')? this.row.config: Object
        },
        gutter() {
            return this.config.hasOwnProperty('gutter')? this.config.gutter: 0
        },
        type() {
            return this.config.hasOwnProperty('type')? this.config.type: null
        },
        align() {
            return this.config.hasOwnProperty('align')? this.config.align: null
        },
        justify() {
            return this.config.hasOwnProperty('justify')? this.config.justify: null
        },
    }
  }
</script>
<style lang="scss" scoped>
</style>
