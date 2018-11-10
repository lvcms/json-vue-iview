<template>
  <Card
    :style="cardStyle"
  >
    <p
      v-if="cardTitle"
      slot="title"
    >
      <i
        v-if="cardIcon"
        :class="cardIcon"
      />
      {{ cardTitle }}
    </p>
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
  </Card>
</template>

<script>
  import { mapActions } from 'vuex'
  import Cache from 'lf-cache'
  import gql from 'graphql-tag'

  export default {
    name: 'jvi-item',
    props: {
      config: Object
    },
    data() {
      return {
        itemLayout: {},
        itemValue: false
      }
    },
    computed: {
      package() {
        return this.$route.name.split(":")[0]
      },
      model() {
        return this.$route.name.split(":")[1]
      },
      /**
       * [cardStyle 获取 card 样式配置]
       * @return {[Object]} [description]
       */
      cardStyle() {
        return this.config.card.style? this.config.card.style: {}
      },
      /**
       * [cardTitle 获取 card 标题]
       * @return {[String]} [description]
       */
      cardTitle() {
        return this.config.card.title? this.config.card.title: ''
      },
      /**
       * [cardIcon 获取 icon 图标]
       * @return {[String]} [description]
       */
      cardIcon() {
        return this.config.card.icon? this.config.card.icon: ''
      },
      /**
       * [itemName 获取项目名称 比如 form1 form2 table1  table2]
       * @return {[Object]} [description]
       */
      itemName() {
        return this.config.item? this.config.item: null
      },
      /**
       * [threadParams 线程参数]
       * @return {[Object]} [description]
       */
      threadParams() {
        return {
            item: this.config.item,
            package: this.package,
            model: this.model,
        }
      },
      /**
       * 是否需要获取项目 vlaue
       * @return {[Boolean]} [description]
       */
      isValue() {
        return (typeof(this.itemLayout.isValue) == "undefined")? true: this.itemLayout.isValue
      },
      /**
       * 获取项目样式后才会启用项目组件
       * [ 比如 form 组件 table 组件 ]
       * @return {[Boolean]} [description]
       */
      itemStyle() {
        return this.itemLayout.style? this.itemLayout.style: ''
      }
    },
    methods: {
      ...mapActions([
            'eventFormSubmit',
            'graphqlError',
            'eventUpdate',
      ]),
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
        if (this.isValue) {
          this.$apollo.query({
            query: gql`query ($package: String!, $model: String!, $item: String!) {
              model(package: $package, model: $model, item: $item){
                value
              }
            }`,
            variables: {
              package: this.package,
              model: this.model,
              item: this.itemName
            },
            fetchPolicy: 'network-only',
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
  .ivu-card{
    margin-bottom: 1vh;
    min-width: 275px;
  }
  .spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
