<template>
  <Row
    :gutter="row.gutter"
    :type="row.type"
    :align="row.align"
    :justify="row.justify"
  >
    <Col
      v-for="(item, index, key) in itemLayout"
      :span="item.col.span"
      :order="item.col.order"
      :offset="item.col.offset"
      :push="item.col.push"
      :pull="item.col.pull"
      :xs="item.col.xs"
      :sm="item.col.sm"
      :md="item.col.md"
      :lg="item.col.lg"
      :key="index"
    >
      <Card :style="item.col.style">
        123
      </Card>
    </Col>
  </Row>
</template>

<script>
  import Cache from 'lf-cache'
  import gql from 'graphql-tag'
  export default {
    name: 'jvi-index',
    data() {
      return {
        row: {},
        itemLayout: {},
      }
    },
    computed: {
      package() {
        return this.$route.name.split(":")[0]
      },
      model() {
        return this.$route.name.split(":")[1]
      },
    },
    created () {
      this.initJson()
    },
    methods: {
      initJson(){
        Cache.remember(this.$route.name+":layout", async () => {
          let apollo = await this.$apollo.query({
            query: gql`query ($package: String!, $model: String!) {
              model(package: $package, model: $model){
                layout
                itemLayout
              }
            }`,
            variables: {
              package: this.package,
              model: this.model
            }
          })
          return apollo.data.model[0]
        } , 60*24*7).then((data) => {
          this.row = data.layout
          this.itemLayout = data.itemLayout
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
