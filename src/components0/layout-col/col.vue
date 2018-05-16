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
      v-for="(item, index, key) in content"
      :col="item"
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
      <jvi-form
        v-if="itemStyle=='form'"
        :layout="itemLayout"
      />
    </Card>
  </Col>
</template>

<script>
  import Cache from 'lf-cache'
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
        itemLayout: {}
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
      item() {
        // 获取项目名称 比如 form1 form2 table1  table2
        return this.col.content.config.item? this.col.content.config.item: null
      },
      itemStyle() {
        /**
         * [ 获取项目样式后才会启用项目组件 ]
         * [ 比如 form 组件 table 组件 ]
         */
        return this.itemLayout.style? this.itemLayout.style: false
      }
    },
    methods: {
      getItemLayout() {
        /**
         * [ 根据当前项目名称异步获取 layout 数据 ]
         * [ 注意：数据异步 ]
         */
        Cache.get(this.$route.name+":layout").then((data) => {
          this.itemLayout = data.itemLayout[this.item]
        })
      },
      getitemData() {

      }
    },
    mounted() {
      this.getItemLayout()
    }
  }
</script>
<style lang="scss" scoped>
  .ivu-card{
    margin-bottom: 1vh;
  }
</style>
