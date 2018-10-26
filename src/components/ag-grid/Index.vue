<template>
  <div>
    <ag-grid-vue
      :style="style"
      class="ag-theme-balham"
      :gridReady="onGridReady"


      :enableColResize="true"
      :suppressResize="true"
      :enableSorting="true"
      :enableFilter="true"
      :suppressMakeColumnVisibleAfterUnGroup="true"
      rowGroupPanelShow="always"
      :sideBar="sideBar"

      :rowData="currentValue"
      :columnDefs="columns"
      :localeText="localeText"
      :overlayLoadingTemplate="overlayLoadingTemplate"
      :firstDataRendered="onFirstDataRendered"
      :ref="refName"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
import 'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

import {AgGridVue} from 'ag-grid-vue'

import Vue from 'vue'
import Lang from './lang'

import CellImg from './cell/img'
import CellFileName from './cell/file-name'
import CellFileSize from './cell/file-size'
import CellStatus from './cell/status'
import CellButton from './cell/button'


export default {
  name: 'jvi-ag-grid',
  components: {
    AgGridVue,
    cellRendererImg:CellImg, //图片单元格渲染
    cellRendererFileName:CellFileName,
    cellRendererFileSize:CellFileSize,
    cellRendererStatus:CellStatus,
    cellRendererButton:CellButton,
  },
  data () {
    return {
      params: null,
      localeText: Lang,
      sideBar:{
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                },
                {
                    id: 'filters',
                    labelDefault: 'Filters',
                    labelKey: 'filters',
                    iconKey: 'filter',
                    toolPanel: 'agFiltersToolPanel',
                }
            ],
        }
    }
  },
  props: {
    config: {
        type: Object,
    },
    value: {
        type: [Array, Object],
    },
    refName: String // table ref 全栈唯一识别符
  },
  computed: {
    /**
     * [style 自定义 ag-grid 样式]
     * @return {[Object]} [description]
     */
    style() {
      return {
        width: '100%',
        height: '78vh'
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
      return this.config.hasOwnProperty('columns')? this.handlerColumns(this.config.columns): []
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
      return this.config.hasOwnProperty('onresize')? this.config.onresize: true
    }
  },
  created() {
    this.eventOn()
  },
  beforeDestroy() {
    this.$event.$off('button-event')
  },
  methods: {
    /**
    * [eventOn 事件监听]
    * @return {[type]} [description]
    */
    eventOn() {
      this.$event.$on('button-event', result => {
        // 增加判断 ref 判断 防止操作其他定义 ref
        if (result.params.ref === this.refName) {
          this.onButtinEvent(result)
        }
      })
    },
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
    /**
     * 监控窗口变化调整
     */
    onResize() {
      window.onresize = () =>{
        this.onFirstDataRendered(this.params)
      }
    },
    /**
     * [onButtinEvent 按钮事件触发]
     */
    onButtinEvent(result) {
        /**
         * 处理 发送数据有哪些
         * 后期增加模板替换 或者 正则替换
         */
        let post = result.params.post
        // 附加 id属性
        post.id = result.params.data.id

        switch (result.event) {
            case 'agGrid':
              this.$emit('button',post);
              break;
        }
    },
    /**
     * 处理 cloumns 数据
     *
     */
    handlerColumns(columns) {
        return columns.map((column) => {
            if (column.hasOwnProperty('cellRendererFramework')) {
                column.floatingFilterComponentParams = {
                    refName: this.refName,
                    params: column.params
                }
                delete column.params
            }
            return column
        });
    },
  },
  mounted() {
    this.onResize()
  }
}
</script>
<style lang="scss" >
@import './styles/ag-theme-balham.scss';
</style>
