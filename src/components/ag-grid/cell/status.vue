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
            return this.params.colDef.floatingFilterComponentParams
        },
        tags() {
            return this.config[this.value]
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
</style>
