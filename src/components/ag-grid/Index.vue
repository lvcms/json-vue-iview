<template>
  <div>
    <ag-grid-vue
      :style="style"
      class="ag-theme-material"
      :gridReady="onGridReady"

      :rowData="currentValue"
      :columnDefs="columns"
      :localeText="localeText"
      :overlayLoadingTemplate="overlayLoadingTemplate"
      :enableColResize="true"
      :suppressResize="true"
      :firstDataRendered="onFirstDataRendered"
      :ref="refTable"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
import 'ag-grid-enterprise'
import {AgGridVue} from 'ag-grid-vue'

import Vue from 'vue'
import Lang from './lang'

import CellImg from './cell/img'
import CellStatus from './cell/status'

export default {
  name: 'jvi-ag-grid',
  components: {
    AgGridVue,
    cellRendererImg:CellImg, //图片单元格渲染
    cellRendererStatus:CellStatus,
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
        return [
            {
                "headerName":"ID",
                "field":"id",
            },
            {
                "headerName":"图片",
                "field":"url",
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
            },
            {"headerName":"文件大小","field":"size","editable":false},
            {"headerName":"文件类型","field":"extension"},
            {"headerName":"存储器","field":"disk"},
            {"headerName":"下载次数","field":"download"},
            {
                "headerName":"状态",
                "field":"status",
                "autoHeight":true,
                "floatingFilterComponentParams":{
                    "color":'success',
                    "icon":'fa fa-check',
                    "title": '开启'
                },
                "cellRendererFramework":'cellRendererStatus'
            },
            {"headerName":"时间","autoHeight":true,"field":"created_at"}
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
          switch (result.event) {
            case 'agGridAdd':
              this.onAdd()
              break;
            case 'agGridEdit':
              this.onEdit()
              break;
            case 'agGrid':
              this.onButtinEvent(result)
              break;
          }
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

    },
  },
  mounted() {
    this.onResize()
  }
}
</script>
<style lang="scss" >
// Color
$primary-color          : #2d8cf0;
$info-color             : #2db7f5;
$success-color          : #19be6b;
$processing-color       : $primary-color;
$warning-color          : #ff9900;
$error-color            : #ed4014;
$normal-color           : #e6ebf1;
$link-color             : #2D8cF0;
$link-hover-color       : #ebf7ff;
$link-active-color      : shade($link-color, 5%);
$selected-color         : fade($primary-color, 90%);
$tooltip-color          : #fff;
$subsidiary-color       : #808695;
$rate-star-color        : #f5a623;

$icon-color: #515a6e;
$icons-path: "~ag-grid/src/styles/icons/";

// changes the border color
// $border-color: #FF0000;

// Changes the font size
$secondary-font-size14px: 14px;
$font-size: 12px;

// Changes the font family
$font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;

// Reverts the cell horizontal padding change between ag-fresh and ag-theme-fresh
// $cell-horizontal-padding: 2px;

// changes the icon color
// $icon-color: red;
@import '~ag-grid/src/styles/ag-grid.scss';
@import '~ag-grid/src/styles/ag-theme-material.scss';
.ag-theme-material {
    table-layout: fixed;
    .ag-cell-focus {
        // background-color: $normal-color;
        border:1px solid #ffffff!important;
    }
    .ag-row-hover {
        background-color: $link-hover-color;
    }
    .ag-column-hover {
        // background-color: $normal-color ;
    }
}
</style>
