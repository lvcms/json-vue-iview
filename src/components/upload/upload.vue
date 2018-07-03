<template>
    <upload
      :action="action"
      :headers="headers"
      :multiple="multiple"
      :data="data"

      :default-file-list="defaultList"
    >
      <i-button type="ghost" icon="ios-cloud-upload-outline">Upload files</i-button>
    </upload>
</template>

      // :data=""
      // :name=""
      // :with-credentials=""
      // :show-upload-list=""
      // :type=""
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
        'type': this.config.type? this.config.type: 'file',
        'package': this.package? this.package: ''
      }
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
