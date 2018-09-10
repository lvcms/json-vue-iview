<template>
  <div>
    <ag-grid-vue
      style="width: 100%; height: 350px;"
      class="ag-theme-balham"
      :overlayLoadingTemplate="overlayLoadingTemplate"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
import {AgGridVue} from 'ag-grid-vue'
export default {
  name: 'jvi-ag-grid',
  components: {
    AgGridVue
  },
  props: {
    config: {
        type: Object,
    },
    value: {
        type: [Array, Object],
    },
    refTable: String // table ref 全栈唯一识别符
  },
  computed: {
    overlayLoadingTemplate() {
      return '<span class="ag-overlay-loading-center">正在加载行,请稍候...</span>'
    }
  },
  methods: {
  },
  mounted() {
    // console.log(this.refTable);
  }
}
</script>
<style lang="scss">

</style>
