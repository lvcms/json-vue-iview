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
      v-if="style"
      :style="config.style"
    >
      <p
        v-if="card"
        slot="title"
      >
        <i :class="card.icon"></i>
        {{ card.title }}
      </p>
      {{ item }}
      <jvi-form
        v-if="style=='form'"
        :form="itemLayout"
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
        return this.col.config
      },
      content() {
        return this.col.content
      },
      card() {
        return this.col.content.config.card? this.col.content.config.card: null
      },
      item() {
        return this.col.content.config.item? this.col.content.config.item: null
      },
      style() {
        return this.col.content.style? this.col.content.style: null
      }
    },
    methods: {
      getItemLayout() {
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
