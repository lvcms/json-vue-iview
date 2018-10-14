<template>
    <jvi-button
        :config="config"
        :params="params"
    />
</template>
<script>
export default {
    created() {
    },
    data () {
        return {
            dialog: false,
        }
    },
    computed: {
        refName() {
            return this.params.colDef.hasOwnProperty('floatingFilterComponentParams')? this.params.colDef.floatingFilterComponentParams.refName: null
        },
        value() {
            return this.params.value
        },
        params() {
            return {
                ref: this.refName,
                value: this.value
            }
        },
        config() {
            return this.params.colDef.hasOwnProperty('floatingFilterComponentParams')? this.params.colDef.floatingFilterComponentParams: {}
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
</style>
