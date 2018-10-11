<template>
  <div>
    <img :src="src" :alt="alt">
  </div>
</template>

<script>
export default {
  name: 'jvi-img',
  props: {
    src: String,
    alt: String,
  },
  mounted() {
    console.log(this.src);
  }
}
</script>
<style lang="scss">

</style>
