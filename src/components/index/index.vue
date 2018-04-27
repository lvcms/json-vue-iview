<template>
    <div>
        123
    </div>
</template>

<script>
  import Cache from 'lf-cache'
  import gql from 'graphql-tag'
  export default {
    name: 'jvi-index',
    computed: {
      routeNmae() {
        return this.$route.name
      }
    },
    created () {
      this.initJson()
    },
    methods: {
      initJson(){
        let packageModel = this.routeNmae.split(":")
        Cache.remember(this.routeNmae, async () => {
          let apollo = await this.$apollo.query({
            query: gql`query ($package: String!, $model: String!) {
              model(package: $package, model: $model){
                layout
                data
              }
            }`,
            variables: {
              package: packageModel[0],
              model: packageModel[1]
            }
          })
          return apollo.data.sidebar
        } , 60*24*7).then((sidebar) => {
          this.sidebar = sidebar
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
