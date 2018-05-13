<template>
  <div id="app">
    <jvi-row
      v-for="(row, index, key) in layout"
      :row="row"
      :key="index"
    />
  </div>
</template>

<script>
  import Cache from 'lf-cache'
  import gql from 'graphql-tag'
  export default {
    name: 'jvi-index',
    data() {
      return {
        layout: {},
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
          this.layout = data.layout
          console.log(this.layout);
          this.itemLayout = data.itemLayout
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
