<template>
  <div id="app">
    <jvi-modal
        v-for="(item,index) in modal"
        :config="item.config"
        :layout="item.layout"
        :name="index"
        :key="index"
    />
    <jvi-row
      v-for="(row, index) in layout"
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
        layout: Array,
        modal: Array,
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
            'eventLayout',
            'graphqlError',
      ]),
      initJson(){
        Cache.remember(this.$route.name+":layout", async () => {
          let apollo = await this.$apollo.query({
            query: gql`query ($package: String!, $model: String!) {
              model(package: $package, model: $model){
                layout
                modal
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
          this.modal = data. modal
          this.eventLayout(data)
        }).catch((error) => {
          this.graphqlError(error).then( message => {
            this.$Message.error(message)
          })
        })
      }
    }
  }
</script>
<style lang="scss" >
</style>
