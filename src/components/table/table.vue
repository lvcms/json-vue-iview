<template>
  <i-table
    :columns="columns"
    :data="values"
    :stripe="stripe"
    :border="border"
    :show-header="showHeader"
    :width="width"
    :height="height"
    :loading="loading"
    :disabled-hover="disabledHover"
    size="small"
    ref="table"
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
  },
  computed: {
    /**
     * [currentValue 绑定的值，可使用 v-model 双向绑定]
     * @type {String | Number}
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
      return this.config.hasOwnProperty('columns')? this.config.columns: [
        {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
      ]
    },
    values() {
      return this.config.hasOwnProperty('values')? this.config.values: [
        {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
      ]
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


  },
  mounted() {
    // console.log(this.config);
  }
}
</script>
<style lang="scss" scoped>
</style>
