<template>
  <i-table
    :columns="columns"
    :data="currentValue"
    :stripe="stripe"
    :border="border"
    :show-header="showHeader"
    :width="width"
    :height="height"
    :loading="loading"
    :disabled-hover="disabledHover"
    :highlight-row="highlightRow"
    :row-class-name="rowClassName"
    :size="size"
    :no-data-text="noDataText"
    :no-filtered-data-text="noFilteredDataText"
    :ref="refTable"
  >
  </i-table>
</template>

<script>
export default {
  name: 'jvi-table',
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
     * [columns 表格列的配置描述，具体项见后文]
     * @return {[Array]} [description]
     * 列描述数据对象，是 columns 中的一项
     * 属性	说明	类型	默认值
     * type	列类型，可选值为 index、selection、expand、html	String	-
     * title	列头显示文字	String	#
     * key	对应列内容的字段名	String	-
     * width	列宽	Number	-
     * minWidth	最小列宽	Number	-
     * maxWidth	最大列宽	Number	-
     * align	对齐方式，可选值为 left 左对齐、right 右对齐和 center 居中对齐	String	left
     * className	列的样式名称	String	-
     * fixed	列是否固定在左侧或者右侧，可选值为 left 左侧和 right 右侧	String	-
     * ellipsis	开启后，文本将不换行，超出部分显示为省略号	Boolean	false
     * render	自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引，详见示例。 学习 Render 函数的内容	Function	-
     * renderHeader	自定义列头显示内容，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 column 和 index，分别为当前列数据和当前列索引。	Function	-
     * sortable	对应列是否可以排序，如果设置为 custom，则代表用户希望远程排序，需要监听 Table 的 on-sort-change 事件	Boolean	false
     * sortMethod	自定义排序使用的方法，接收三个参数 a 、 b 和 type，当设置 sortable: true 时有效。type 值为 asc 和 desc	Function	-
     * sortType	设置初始化排序。值为 asc 和 desc	String	-
     * filters	过滤数据的选项，格式为数组，数组中每项包含 label 和 value 属性，使用过滤，必须同时配置 filterMethod	Array	-
     * filterMethod	数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示	Function	-
     * filterMultiple	数据过滤的选项是否多选	Boolean	true
     * filteredValue	在初始化时使用过滤，数组，值为需要过滤的 value 集合	Array	-
     * filterRemote	使用远程过滤	Function	-
     * children	表头分组	Array	-
     */
    columns() {
      return this.config.hasOwnProperty('columns')? this.config.columns: []
    },
    /**
     * [stripe 	是否显示间隔斑马纹]
     * @return {[Boolean]} [description]
     */
    stripe() {
      return this.config.hasOwnProperty('stripe')? this.config.stripe: false
    },
    /**
     * [border 	是否显示纵向边框]
     * @return {[Boolean]} [description]
     */
    border() {
      return this.config.hasOwnProperty('border')? this.config.stripe: false
    },
    /**
     * [showHeader 	是否显示表头]
     * @return {[Boolean]} [description]
     */
    showHeader() {
      return this.config.hasOwnProperty('showHeader')? this.config.showHeader: true
    },
    /**
     * [width 表格宽度，单位 px]
     * @return {[Number | String]} [description]
     */
    width() {
      return this.config.hasOwnProperty('width')? this.config.width: null
    },
    /**
     * [height 表格高度，单位 px，设置后，如果表格内容大于此值，会固定表头]
     * @return {[Number | String]} [description]
     */
    height() {
      return this.config.hasOwnProperty('height')? this.config.height: null
    },
    /**
     * [loading 表格是否加载中]
     * @return {Boolean} [description]
     */
    loading() {
      return this.config.hasOwnProperty('loading')? this.config.loading: false
    },
    /**
     * [disabledHover 禁用鼠标悬停时的高亮]
     * @return {Boolean} [description]
     */
    disabledHover() {
      return this.config.hasOwnProperty('disabledHover')? this.config.disabledHover: false
    },
    /**
     * [highlightRow 禁用鼠标悬停时的高亮]
     * @return {Boolean} [description]
     */
    highlightRow() {
      return this.config.hasOwnProperty('highlightRow')? this.config.highlightRow: false
    },
    /**
     * [size 表格尺寸，可选值为 large、small、default 或者不填]
     * @return {[String]} [description]
     */
    size() {
      return this.config.hasOwnProperty('size')? this.config.size: null
    },
    /**
     * [noDataText 数据为空时显示的提示内容]
     * @return {[String]} [description]
     */
    noDataText() {
      return this.config.hasOwnProperty('noDataText')? this.config.noDataText: '暂无数据'
    },
    /**
     * [noFilteredDataText 筛选数据为空时显示的提示内容]
     * @return {[String]} [description]
     */
    noFilteredDataText() {
      return this.config.hasOwnProperty('noFilteredDataText')? this.config.noFilteredDataText: '暂无筛选结果'
    },

  },
  methods: {
    /** 表格行颜色 */
    rowClassName (row, index) {
      if (index === 0) {
          return 'table-info';
      } else if (index === 1) {
          return 'table-success';
      } else if (index === 2) {
          return 'table-warning';
      } else if (index === 3) {
          return 'table-error';
      }
      return '';
    }
  },
  mounted() {
    // console.log(this.refTable);
  }
}
</script>
<style lang="scss">
  .ivu-table .table-info td{
    background-color: #2db7f5;
    color: #fff;
  }
  .ivu-table .table-success td{
    background-color: #19be6b;
    color: #fff;
  }
  .ivu-table .table-warning td{
    background-color: #ff9900;
    color: #fff;
  }
  .ivu-table .table-error td{
    background-color: #ed4014;
    color: #fff;
  }
</style>
