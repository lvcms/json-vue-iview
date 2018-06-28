<template>
    <upload
      :action=""
      :headers=""
      :multiple=""
      :data=""
      :name=""
      :with-credentials=""
      :show-upload-list=""
      :type=""
      :accept=""
      :max-size=""
      :before-upload=""
      :on-progress=""
      :on-success=""
      :on-error=""
      :on-preview=""
      :on-remove=""
      :on-format-error=""
      :on-exceeded-size="handleMaxSize"
      :default-file-list="defaultList"
    >
        <i-button type="ghost" icon="ios-cloud-upload-outline">Upload files</i-button>
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
