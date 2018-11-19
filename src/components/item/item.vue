<template>
<div>
    <template v-if="itemValue">
      <jvi-form
          v-if="itemStyle=='form'"
          :layout="itemLayout"
          :value="itemValue"
          :thread-params="threadParams"
      />
    </template>
    <Spin
        v-else
        fix
    >
      <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
</div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Cache from 'lf-cache'
  import _ from 'lodash'
  import gql from 'graphql-tag'

  export default {
    name: 'jvi-item',
    props: {
      itemName: String,
      modal: {
            type: String,
            default: null
      },
    },
    data() {
      return {
        itemLayout: {},
        itemValue: false,
        isItemValue: false,
        params: {},
      }
    },
    computed: {
      ...mapState({
          itemParams: state => state.json.itemParams,
      }),
      package() {
        return this.$route.name.split(":")[0]
      },
      model() {
        return this.$route.name.split(":")[1]
      },
      /**
       * [threadParams 线程参数]
       * @return {[Object]} [description]
       */
      threadParams() {
        return {
            item: this.itemName,
            package: this.package,
            model: this.model,
        }
      },
      /**
       * 是否需要获取项目 vlaue
       * @return {[Boolean]} [description]
       */
      isValue() {
        return (typeof(this.itemLayout.config.isValue) == "undefined")? true: this.itemLayout.config.isValue
      },
      /**
       * 获取项目样式后才会启用项目组件
       * [ 比如 form 组件 table 组件 ]
       * @return {[Boolean]} [description]
       */
      itemStyle() {
        return this.itemLayout.style? this.itemLayout.style: 'form'
      }
    },
    watch: {
        itemParams: {
            handler: 'handlerItemParams',
            deep: true
        },
    },
    methods: {
      ...mapActions([
        'getValue',
        'graphqlError',
      ]),
      handlerItemParams(value) {
        if (value.hasOwnProperty(this.modal)) {
          this.params = value[this.modal]
          this.isItemValue = true
          // 注销 form 组件重新渲染
          this.itemValue = false
          this.getItemValue()

        }
      },
      /**
       * [getItem 根据当前项目名称异步获取 layout 数据 ]
       * [ 注意：然后获取项目值 itemValue ]
       * [ 注意：数据异步 ]
       * @return {[Object]} [description]
       */
      getItem() {
        Cache.get(this.$route.name+":layout").then((data) => {
          this.itemLayout = data.item[this.itemName]
          this.getItemValue()
        })
      },
      /**
       * [getItemValue 获取项目 value 数据 ]
       * [ 注意：数据异步 ]
       * @return {[Object]} [description]
       */
      getItemValue() {
        if (this.isValue || this.isItemValue) {
          this.getValue({
              apollo: this.$apollo,
              threadParams: this.threadParams,
              params:this.params
          }).then((result) => {
            this.itemValue = JSON.parse(JSON.stringify(result.data.model.value))
          }).catch((error) => {
            this.graphqlError(error).then( message => {
              this.$Message.error(message)
            })
            this.itemValue = {}
          })
        }else{
          this.itemValue = {}
        }
      },
    },
    mounted() {
      this.getItem()
    }
  }
</script>
<style lang="scss" scoped>
  .spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
