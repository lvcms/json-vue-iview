<template>
  <div>
    <ag-grid-vue
      :style="style"
      class="ag-theme-balham"
      :gridReady="onGridReady"

      :rowData="currentValue"
      :columnDefs="columns"
      :localeText="localeText"
      :overlayLoadingTemplate="overlayLoadingTemplate"
      :suppressResize="true"
      :firstDataRendered="onFirstDataRendered"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/ag-theme-balham.css'
/**
 * 修改 22 23 行
 * valid = true
 * current = true
 * ./node_modules/ag-grid-enterprise/dist/lib/licenseManager.js
 */
import 'ag-grid-enterprise'
import {AgGridVue} from 'ag-grid-vue'
import Lang from './lang'
export default {
  name: 'jvi-ag-grid',
  components: {
    AgGridVue
  },
  data () {
    return {
      params: null,
      localeText: Lang,
    }
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
    /**
     * [style 自定义 ag-grid 样式]
     * @return {[Object]} [description]
     */
    style() {
      return {
        width: '100%',
        height: '52vh'
      }
    },
    /**
     * [currentValue 绑定的值，可使用 v-model 双向绑定]
     * @type {Array | Object}
     */
    currentValue: {
      get() {
        return this.value? this.value: this.config.default
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },
    /**
     * [columns 自定义 ag-grid 样式]
     * @return {[Object]} [description]
     */
    columns() {
      return this.config.hasOwnProperty('columns')? this.config.columns: []
    },
    /**
     * [overlayLoadingTemplate 自定义加载模板]
     * @return {[String]} [description]
     */
    overlayLoadingTemplate() {
      return '<span class="ag-overlay-loading-center">正在加载行,请稍候...</span>'
    },
    /**
     * [onresize 是否根据窗口自动调整]
     * @return {[Boolea]} [description]
     */
    onresize() {
      return this.config.hasOwnProperty('onresize')? this.config.onresize: false
    },
  },
  methods: {
    /**
     * [onGridReady 加载 gridApi 用于更高功能开发]
     */
    onGridReady(params) {
      this.params = params
    },
    /**
     * 默认情况下调整列大小
     */
    onFirstDataRendered(params) {
      if (this.onresize) {
        params.api.sizeColumnsToFit()
      }
    },
    /** 1
     * 监控窗口变化调整
     */
    onResize() {
      window.onresize = () =>{
        this.onFirstDataRendered(this.params)
      }
    }
  },
  mounted() {
    this.onResize()
  }
}
</script>
<style lang="scss">

</style>
