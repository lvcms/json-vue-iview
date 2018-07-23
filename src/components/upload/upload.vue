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
      :max-size="maxSize"
      :on-exceeded-size="handleMaxSize"
      :on-format-error="handleFormatError"
      :on-success="handleSuccess"

      :default-file-list="defaultList"
    >
      <div class="cloud-upload">
        <img v-if="imageUrl"
          :src="imageUrl"
        >
        <span v-else>
          <Icon type="ios-cloud-upload" size="57" class="ios-cloud-upload"></Icon>
          <p>点击或拖动文件在这里上传</p>
        </span>
      </div>
    </upload>
</template>
<script>
export default {
  name: 'jvi-upload',
  props: {
    config: {
        type: Object,
    },
    value: {
        type: [Object],
    },
  },
  data() {
    return {
      newImageUrl:null,
    };
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
     * [id 图片 id ]
     * @return {[Number]} [description]
     */
    id() {
      return this.value.hasOwnProperty('id')? this.value.id: 0
    },
    /**
     * [imageUrl 图片 url ]
     * @return {[String]} [description]
     */
    imageUrl() {
      if (this.newImageUrl) {
        return this.newImageUrl
      }
      return this.value.hasOwnProperty('url')? this.value.url: null
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
      return this.config.hasOwnProperty('action')? this.config.action: '/'
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
      return this.config.hasOwnProperty('multiple')? this.config.multiple: false
    },
    /**
     * [data 	上传时附带的额外参数 ]
     * @return {[Boolean]} [description]
     */
    data() {
      return {
        'fileType': this.config.hasOwnProperty('fileType')? this.config.fileType: 'file',
        'package': this.package? this.package: ''
      }
    },
    /**
     * [name 	上传的文件字段名 ]
     * @return {[String]} [description]
     */
    name() {
      return this.config.hasOwnProperty('name')? this.config.name: 'file'
    },
    /**
     * [withCredentials 支持发送 cookie 凭证信息 ]
     * @return {[Boolean]} [description]
     */
    withCredentials() {
      return this.config.hasOwnProperty('withCredentials')? this.config.withCredentials: false
    },
    /**
     * [showUploadList 是否显示已上传文件列表 ]
     * @return {[Boolean]} [description]
     */
    showUploadList() {
      return this.config.hasOwnProperty('showUploadList')? this.config.showUploadList: true
    },
    /**
     * [type 上传控件的类型，可选值为 select（点击选择），drag（支持拖拽） ]
     * @return {[String]} [description]
     */
    type() {
      return this.config.hasOwnProperty('type')? this.config.type: 'select'
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
      return this.config.hasOwnProperty('format')? this.config.format.split(","): []
    },
    /**
     * [defaultList 设置属性 default-file-list 设置默认已上传的列表。]
     * @return {[Array]} [description]
     */
    defaultList() {
      return this.config.hasOwnProperty('defaultList')? this.config.defaultList: []
    },
    /**
     * [maxSize 文件大小限制，单位 kb]
     * @return {[Number]} [description]
     */
    maxSize() {
      return this.config.hasOwnProperty('maxSize')? this.config.maxSize: null
    },

  },
  methods: {
    /**
     * 上传文件格式错误提示
     */
    handleFormatError (file) {
      this.$Notice.warning({
          title: '文件格式不正确',
          desc: file.name + ' 的文件格式不正确，请选择 '+this.format+' 等格式文件。'
      });
    },
    /**
     * 上传文件超过大小设置提示
     */
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '文件超过大小限制',
        desc: '文件  ' + file.name + ' 太大，不能超过 '+this.bytesToSize(this.maxSize)+' 。'
      });
    },
    handleSuccess (res, file) {
      /* [if 上传成功定义显示图片赋值ID]*/
        if (res.type=="success") {
          this.currentValue = res.value.id;
          if (this.config.fileType == 'image') {
            this.newImageUrl = res.value.url
          }
        }
        this.$Notice.success({
          title: res.message,
          desc: '文件  ' + file.name + ' 上传成功！ '
        });

    },
    /**
    * 文件大小计算
    */
    bytesToSize (bytes) {
      if (bytes === 0) return '0 KB'
      let k = 1024 // or 1024
      let sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      let i = Math.floor(Math.log(bytes) / Math.log(k))
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }
  },
  mounted() {
    // console.log(this.config);
  }
}
</script>
<style lang="scss" scoped>
  .ios-cloud-upload{
    color: #3399ff;
    margin-left:-27px;
    margin-top: 2vh;
  }
  .cloud-upload{
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    max-width: 100%;
    height: auto;
    padding:0.07in;
  }
</style>
