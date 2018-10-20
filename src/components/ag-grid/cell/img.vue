<template>
<div>
    <img
        :src="img"
        :style="style"
        alt=""
        class="img-rounded"
        @click="dialog = true"
    >
    <Modal
        v-model="dialog"
        :closable="false"
        :footer-hide="true"
    >
        <img
            :src="img"
            class="img-responsive img-rounded img-atuo"
            alt=""
            @click="dialog = false"
        >
    </Modal>
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
        value() {
            return this.params.value
        },
        config() {
            return this.params.colDef.hasOwnProperty('floatingFilterComponentParams')? this.params.colDef.floatingFilterComponentParams: {}
        },
        refName() {
            return this.config.refName
        },
        img() {
            return this.value
        },
        style() {
            return this.config.params.style
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
  .img-responsive{
    display:block;
    height:auto;
  }
  .img-rounded{
    border-radius:4px;
  }
  .img-atuo{
    width: 100%;
  }
</style>
