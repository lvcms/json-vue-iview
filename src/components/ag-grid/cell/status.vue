<template>
    <tag :color="tags.color" type="border">
      <i :class="tags.icon" style="width:auto"></i>
      {{tags.title}}
    </tag>
</template>
<script>
export default {
    created() {
    },
    data () {
        return {

        }
    },
    computed: {
        value() {
            return this.params.value
        },
        config() {
            return this.params.colDef.hasOwnProperty('floatingFilterComponentParams')? this.params.colDef.floatingFilterComponentParams: {}
        },
        refName() {
            return this.config.refName
        },

        value() {
            return this.params.value
        },
        tags() {
            return this.config.params[this.value]
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
</style>
