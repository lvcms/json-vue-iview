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
        img() {
            return this.params.value
        },
        style() {
            return this.params.colDef.hasOwnProperty('floatingFilterComponentParams')? this.params.colDef.floatingFilterComponentParams.style: {}
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
