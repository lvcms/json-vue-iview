<template>
    <div>
        {{ size }}
    </div>
</template>
<script>
import FileSize from 'filesize'
export default {
    created() {;
    },
    data () {
        return {
        }
    },
    computed: {
        size() {
            return FileSize(this.params.value)
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
</style>
