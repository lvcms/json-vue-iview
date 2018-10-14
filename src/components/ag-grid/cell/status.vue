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
        tags() {
            return this.params.colDef.floatingFilterComponentParams
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
</style>
