<template>
  <Card

  >
    123
  </Card>
</template>

<script>


  export default {
    name: 'jvi-item',
    props: {
      config: Object
    },
    mounted() {
      console.log(this.config);
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
