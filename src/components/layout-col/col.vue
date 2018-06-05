<template>
  <Col
    :span="config.span"
    :order="config.order"
    :offset="config.offset"
    :push="config.push"
    :pull="config.pull"
    :xs="config.xs"
    :sm="config.sm"
    :md="config.md"
    :lg="config.lg"
  >
    <subCol
      v-if="content instanceof Array"
      v-for="(value, index, key) in content"
      :col="value"
      :key="index"
    />
    <Card
      v-if="content.style"
      :style="config.style"
    >
      <p
        v-if="card"
        slot="title"
      >
        <i :class="card.icon"></i>
        {{ card.title }}
      </p>
      <template v-if="itemValue">
        <jvi-form
          v-if="itemStyle=='form'"
          :layout="item"
          :value="itemValue"
          @form-submit="handleFormSubmit"
        />
      </template>
      <Spin
        v-else
        fix
      >
          <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
          <div>Loading</div>
      </Spin>
    </Card>
  </Col>
</template>

<script>
  import { mapActions } from 'vuex'
  import Cache from 'lf-cache'
  import gql from 'graphql-tag'

  export default {
    name: 'jvi-col',
    components: {
      subCol: () => import('./col.vue')
    },
    props: {
      col: Object
    },
    data() {
      return {
        item: {},
        itemValue: null
      }
    },
    computed: {
      package() {
        return this.$route.name.split(":")[0]
      },
      model() {
        return this.$route.name.split(":")[1]
      },
      config() {
        // 获取 col 配置
        return this.col.config
      },
      content() {
        return this.col.content
      },
      card() {
        // 获取 card 配置
        return this.col.content.config.card? this.col.content.config.card: null
      },
      itemName() {
        // 获取项目名称 比如 form1 form2 table1  table2
        return this.col.content.config.item? this.col.content.config.item: null
      },
      itemStyle() {
        /**
         * [ 获取项目样式后才会启用项目组件 ]
         * [ 比如 form 组件 table 组件 ]
         */
        return this.item.style? this.item.style: false
      }
    },
    watch: {
      itemValue:{
        handler: 'mergeItemValue',
        deep: true
      },
    },
    methods: {
      ...mapActions([
        'thenHandle', // map `this.callbackData(result)` to `this.$store.dispatch('callbackData', result)`
        'catchHandle',
      ]),
      getItem() {
        /**
         * [ 根据当前项目名称异步获取 layout 数据 ]
         * [ 注意：数据异步 ]
         */
        Cache.get(this.$route.name+":layout").then((data) => {
          this.item = data.item[this.itemName]
        })
      },
      getItemValue() {
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
          console.log(error);
          this.itemValue = {}
        })
      },
      /**
       * [mergeItemValue 后期合并多个 form 数据提交]
       * @return {[type]} [description]
       */
      mergeItemValue() {
        // console.log(this.package,this.model,this.itemName,this.itemValue);
      },
      handleFormSubmit() {
        this.$apollo.mutate({
          mutation: gql`mutation ($package: String!, $model: String!, $value: String!) {
            updateModel(package: $package, model: $model, value: $value){
              status,
              message,
              value
            }
          }`,
          variables: {
            package: this.package,
            model: this.model,
            value: JSON.stringify(this.itemValue)
          },
        }).then((result) => {
          this.$Message.success(result.data.updateModel.message)
          this.$event.$emit('form-submit-then', result);
        }).catch((error) => {
          this.$event.$emit('form-submit-catch', error);
        })
      }
    },
    mounted() {
      this.getItem()
      this.getItemValue()
    }
  }
</script>
<style lang="scss" scoped>
  .ivu-card{
    margin-bottom: 1vh;
  }
  .spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
