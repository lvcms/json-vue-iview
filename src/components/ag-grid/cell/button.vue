<template>
    <div
        v-if="buttons"
        class="cell-button"
    >
        <jvi-button
            class="cell-jvi-button"
            v-for="(config,key) in buttons"
            :config="config"
            :params="buttonParams"
            :key="key"
        />
    </div>
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
        data() {
            return this.params.data
        },
        buttonParams() {
            return {
                ref: this.refName,
                data: this.data,
                value: this.value
            }
        },
        buttons() {
            return this.params.colDef.hasOwnProperty('floatingFilterComponentParams')? this.params.colDef.floatingFilterComponentParams.buttons:[];
        },

    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
    .cell-button{
        >.cell-jvi-button{
            margin: 0px 5px 5px 0px;
        }
    }
</style>
