<template>
    <i-switch
      v-model="currentValue"
    />
</template>

<script>
export default {
  name: 'jvi-switch',
  props: {
    config: {
        type: Object,
        default: {}
    },
    value:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * [currentValue 绑定的值，可使用 v-model 双向绑定]
     * @type {String | Number}
     */
    currentValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },
  },
  mounted() {
    // console.log(this.config);
  }
}
</script>
<style lang="scss" scoped>

</style>
