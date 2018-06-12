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
  import { mapActions } from 'vuex'
  import Cache from 'lf-cache'
  import gql from 'graphql-tag'
  export default {
    name: 'jvi-index',
    data() {
      return {
        layout: {}
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
      ...mapActions([
        'graphqlError',
      ]),
      initJson(){
        Cache.remember(this.$route.name+":layout", async () => {
          let apollo = await this.$apollo.query({
            query: gql`query ($package: String!, $model: String!) {
              model(package: $package, model: $model){
                layout
                item
              }
            }`,
            variables: {
              package: this.package,
              model: this.model
            }
          })
          return apollo.data.model
        } , 60*24*7).then((data) => {
          this.layout = data.layout
          this.$event.$emit('model-layout-then', data);
        }).catch((error) => {
          this.graphqlError(error.message).then( message => {
            this.$Message.error(message)
          })
          this.$event.$emit('model-layout-catch', error);
        })
      }
    }
  }
</script>
<style lang="scss" >
</style>
