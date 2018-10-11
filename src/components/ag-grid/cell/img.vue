<template>
<div>
    <img
        :src="params.value"
        :style="params.colDef.floatingFilterComponentParams.style"
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
            :src="params.value"
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
        // console.log(this)
    },
    data () {
        return {
            dialog: false,
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
    border-radius:6px;
  }
  .img-atuo{
    width: 100%;
  }
</style>
