<template>
    <i-input
      v-model="currentValue"
    >
    123
    </i-input>
</template>

<script>
export default {
  name: 'jvi-upload',
  props: {
    config: {
        type: Object,
    },
    value: {
        type: [String, Number],
    },
  },
  computed: {
    /**
     * [currentValue 绑定的值，可使用 v-model 双向绑定]
     * @type {String | Number}
     */
    currentValue: {
      get() {
        return this.value? this.value: this.config.default
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
  i{
     width:14px;
     height:14px;
  }
</style>
