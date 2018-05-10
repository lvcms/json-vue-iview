<template>
  <Row
    :gutter="this.layout.gutter"
    :type="this.layout.type"
    :align="this.layout.align"
    :justify="this.layout.justify"
  >
          <Col span="6">
              <div>col-6</div>
          </Col>
          <Col span="6">
              <div>col-6</div>
          </Col>
          <Col span="6">
              <div>col-6</div>
          </Col>
          <Col span="6">
              <div>col-6</div>
          </Col>
          <Col span="6">
              <div>col-6</div>
          </Col>
          <Col span="6">
              <div>col-6</div>
          </Col>
          <Col span="6">
              <div>col-6</div>
          </Col>
          <Col span="6">
              <div>col-6</div>
          </Col>
          <Col span="6">
              <div>col-6</div>
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
        layout: {},
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
              }
            }`,
            variables: {
              package: this.package,
              model: this.model
            }
          })
          return apollo.data.model[0].layout
        } , 60*24*7).then((layout) => {
          this.layout = layout
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.ivu-col{
  div{
    background:rgba(0,153,229,.9);
  }
}
</style>
