<template>
  <Row :gutter="16">
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
        data: {},
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
        // this.$apollo.query({
        //   query: gql`query ($package: String!, $model: String!) {
        //     model(package: $package, model: $model){
        //       data
        //     }
        //   }`,
        //   variables: {
        //     package: packageModel[0],
        //     model: packageModel[1]
        //   }
        // }).then((data) => {
        //   this.data = data.data.model[0].data
        // })
        Cache.remember(this.$route.name, async () => {
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
          return apollo.data.model[0]
        } , 60*24*7).then((model) => {
          console.log(model);
          // this.layout = model[0].layout
          // console.log(this.layout);
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
