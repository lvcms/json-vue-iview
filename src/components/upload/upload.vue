<template>
    <upload
      :action="action"
      :headers="headers"
      :multiple="multiple"
      :data="data"
      :name="name"
      :with-credentials="withCredentials"
      :show-upload-list="showUploadList"
      :type="type"
      :accept="accept"
      :format="format"

      :default-file-list="defaultList"
    >
      <i-button type="ghost" icon="ios-cloud-upload-outline">Upload files</i-button>
    </upload>
</template>

      // :accept=""
      // :max-size=""
      // :before-upload=""
      // :on-progress=""
      // :on-success=""
      // :on-error=""
      // :on-preview=""
      // :on-remove=""
      // :on-format-error=""
      // :on-exceeded-size="handleMaxSize"

<script>
export default {
  name: 'jvi-upload',
  props: {
    config: {
        type: Object,
    },
    value: {
        type: [String, Number],
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
     * [package 当前操作包 ]
     * @return {[String]} [description]
     */
    package() {
        return this.$route.name.split(":")[0]
    },
    /**
     * [action 上传的地址，必填 ]
     * @return {[String]} [description]
     */
    action() {
      return this.config.action? this.config.action: '/'
    },
    /**
     * [headers 设置上传的请求头部 ]
     * @return {[String]} [description]
     */
    headers() {
      return {}
    },
    /**
     * [multiple 是否支持多选文件 ]
     * @return {[Boolean]} [description]
     */
    multiple() {
      return this.config.multiple? this.config.multiple: false
    },
    /**
     * [data 	上传时附带的额外参数 ]
     * @return {[Boolean]} [description]
     */
    data() {
      return {
        'fileType': this.config.fileType? this.config.fileType: 'file',
        'package': this.package? this.package: ''
      }
    },
    /**
     * [name 	上传的文件字段名 ]
     * @return {[String]} [description]
     */
    name() {
      return this.config.name? this.config.name: 'file'
    },
    /**
     * [withCredentials 支持发送 cookie 凭证信息 ]
     * @return {[Boolean]} [description]
     */
    withCredentials() {
      return this.config.withCredentials? this.config.withCredentials: false
    },
    /**
     * [showUploadList 是否显示已上传文件列表 ]
     * @return {[Boolean]} [description]
     */
    showUploadList() {
      return this.config.showUploadList? this.config.showUploadList: true
    },
    /**
     * [type 上传控件的类型，可选值为 select（点击选择），drag（支持拖拽） ]
     * @return {[String]} [description]
     */
    type() {
      return this.config.type? this.config.type: 'select'
    },
    /**
     * [accept 接受上传的文件类型 ]
     * @return {[String]} [description]
     */
    accept() {
      return '.'+this.format.join(",.")
    },
    /**
     * [format 支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用 ]
     * @return {[Array]} [description]
     */
    format() {
      return this.config.format? this.config.format.split(","): []
    },
    /**
     * [defaultList 设置属性 default-file-list 设置默认已上传的列表。]
     * @return {[Array]} [description]
     */
    defaultList() {
      return this.config.defaultList? this.config.defaultList: []
    },
  },
  methods: {
    /**
     * 上传文件超过大小设置提示
     */
    handleMaxSize (file) {
        this.$Notice.warning({
            title: 'Exceeding file size limit',
            desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
    },
  },
  mounted() {
    // console.log(this.config);
  }
}
</script>
<style lang="scss" scoped>
  i{
     width:14px;
     height:14px;
  }
</style>
