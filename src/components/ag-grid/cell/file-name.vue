<template>
    <div>
        <i :class="icon" style="width:auto"></i>
        {{ fileName }}
    </div>
</template>
<script>
import Icons from 'file-icons-js'
export default {
    created() {
    },
    data () {
        return {
        }
    },
    computed: {
        fileName() {
            return this.params.value
        },
        icon() {
            return Icons.getClassWithColor(this.fileName)
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
</style>
