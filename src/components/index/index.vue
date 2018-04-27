<template>
    <div>
        123
    </div>
</template>

<script>
export default {
  name: 'jvi-index',
  computed: {
    packageModel() {
      return this.$route.name
    }
  },
  created () {
    this.initJson()
  },
  methods: {
    initJson(){
      console.log(this.packageModel);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
