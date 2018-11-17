<template>
  <div>
    <ag-grid-vue
      :style="style"
      class="ag-theme-balham"
      :gridReady="onGridReady"

        :deltaRowDataMode="true"
      :getRowNodeId="getRowNodeId"

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
import { mapState, mapActions } from 'vuex'

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
      gridReady: null,
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
            defaultToolPanel: null
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
    threadParams: Object
  },
  computed: {
    ...mapState({
        buttonEvent: state => state.json.button,
    }),
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
     * [ref 获取唯一标识]
     * @type {String}
     */
    refName() {
      return this.threadParams.package+':'+this.threadParams.model+':'+this.threadParams.item+':'+this.threadParams.component
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
    },
    /**
     * 设置id
     */
    getRowNodeId() {
        return data=>data.id
    },
    /**
     * 初始化 api
     */
    gridApi() {
        return this.gridReady.api
    }
  },
  watch: {
        buttonEvent: 'handleButtonEvent',

  },
  methods: {
    ...mapActions([
        'handlerUpdateEvent',
        'graphqlError'
    ]),

    /**
    * [handleButtonEvent 事件监听]
    * @return {[type]} [description]
    */
    handleButtonEvent() {
        // 增加判断 ref 判断 防止操作其他定义 ref
        if (this.buttonEvent.params.ref === this.refName && this.buttonEvent.event) {
            /**
             * 处理 发送数据有哪些
             * 后期增加模板替换 或者 正则替换
             */
            if (this.buttonEvent.event.includes('agGrid')) {
                this.handlerUpdateEvent({
                    apollo: this.$apollo,
                    threadParams: this.threadParams,
                    params: this.buttonEvent.params.postParams
                }).then((result) => {
                    this.handleUpdateEvent(result.data.updateModel.value)
                    this.$Message.success(result.data.updateModel.message)
                }).catch((error) => {
                    this.graphqlError(error).then( message => {
                        this.$Message.error(message)
                    })
                })
            }
        }
    },
    /**
    * [handleUpdateEvent 更新数据事件监听]
    * @return {[type]} [description]
    */
    handleUpdateEvent(data) {
        if (data.hasOwnProperty('handler')) {
            let params = data.params
            switch (data.handler) {
                case 'update':
                    this.handlerUpdateValue(params)
                    break;
                case 'add':
                    this.handlerAddRow(params)
                    break;
                case 'delete':
                    this.handlerDeleteRow(params)
                    break;
                default:
                    break;
            }
        }
    },
    /**
    * [handlerUpdateValue 更新数据]
    * @return {[type]} [description]
    */
    handlerUpdateValue(params) {
        params.forEach(param => {
            let rowNode = this.gridApi.getRowNode(param.id);
            rowNode.setData(Object.assign(rowNode.data,param))
        });
    },
    handlerAddRow(params) {
        this.gridApi.updateRowData({ add: params})
    },
    handlerDeleteRow(params) {
        params.forEach(param => {
            let rowNode = this.gridApi.getRowNode(param.id);
            this.gridApi.updateRowData({ remove: [rowNode.data]});
        });
    },
    /**
     * [onGridReady 加载 gridApi 用于更高功能开发]
     */
    onGridReady(params) {
        this.gridReady = params
    },
    /**
     * 默认情况下调整列大小
     */
    onFirstDataRendered(gridReady) {
      if (this.onresize) {
        gridReady.api.sizeColumnsToFit()
      }
    },
    /**
     * 监控窗口变化调整
     */
    onResize() {
      window.onresize = () =>{
        this.onFirstDataRendered(this.gridReady)
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
                    params: column.params,
                    $store:this.$store
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
