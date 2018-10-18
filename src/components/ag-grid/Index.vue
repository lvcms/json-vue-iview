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
      :ref="refTable"
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
            defaultToolPanel: ''
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
    package() {
      return this.$route.name.split(":")[0]
    },
    model() {
      return this.$route.name.split(":")[1]
    },
    refName() {
      /**
       * [ref 获取唯一标识]
       * @type {String}
       */
      return this.package+':'+this.model+':'+this.name
    },
    /**
     * [columns 自定义 ag-grid 样式]
     * @return {[Object]} [description]
     */
    columns() {
        return [
            {
                "headerName":"ID",
                "field":"id",
                "width": 120,
            },
            {
                "headerName":"图片",
                "field":"url",
                "width": 160,
                "autoHeight":true,
                "floatingFilterComponentParams":{
                    "style":{
                        width:'55px',
                        height:'55px',
                    },
                },
                "cellRendererFramework":'cellRendererImg'
            },
            {
                "headerName":"文件名",
                "field":"name",
                "autoHeight":true,
                "editable":true,
                enableRowGroup: true,
                "cellRendererFramework": 'cellRendererFileName'

            },
            {"headerName":"文件大小","field":"size","editable":false,
                enableRowGroup: true,
                width: 150,
                "cellRendererFramework": 'cellRendererFileSize'

            },
            {"headerName":"存储器","field":"disk"},
            {"headerName":"下载次数",width: 150,"field":"download"},
            {
                "headerName":"状态",
                "field":"status",
                "autoHeight":true,
                "floatingFilterComponentParams":{
                    'open':{
                        "color":'success',
                        "icon":'fa fa-check',
                        "title": '正常'
                    },
                    'close':{
                        "color":'error',
                        "icon":'fa fa-close',
                        "title": '禁用'
                    },
                },
                "cellRendererFramework":'cellRendererStatus'
            },
            {"headerName":"时间","autoHeight":true,"field":"created_at"},
            {
                "headerName":"操作",
                "autoHeight":true,
                "field":"id",
                "floatingFilterComponentParams":{
                    "refName": this.refName,
                    "buttons" :[
                        {
                            "type":'success',
                            "icon":'fa fa-check',
                            "title": '编辑',
                            "event": 'agGridEdit',
                            "size": 'small',
                            "refName": this.refName,
                        },
                        {
                            "type":'info',
                            "icon":'fa fa-check',
                            "title": '新增',
                            "event": 'agGridAdd',
                            "size": 'small',
                        },
                        {
                            "type":'info',
                            "icon":'fa fa-check',
                            "title": '新增',
                            "event": 'agGridAdd',
                            "size": 'small',
                        },
                        {
                            "type":'info',
                            "icon":'fa fa-check',
                            "title": '新增',
                            "event": 'agGridAdd',
                            "size": 'small',
                        },
                    ]
                },
                "cellRendererFramework":'cellRendererButton'
            }
        ]
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
    }
  },
  created() {
    this.eventOn()
  },
  beforeDestroy() {
    this.$event.$off('buttin-event')
  },
  methods: {
    /**
    * [eventOn 事件监听]
    * @return {[type]} [description]
    */
    eventOn() {
      this.$event.$on('buttin-event', result => {
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
        console.log('处理按钮事件',result);

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
