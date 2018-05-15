<template>
  <i-form
    ref="formValidate"
    :model="model"
    :rules="validate"
    :inline="inline"
    :label-position="top"
    :label-width="80"
    :show-message="true"
    :autocomplete="true"
  >
    <form-item label="E-mail" prop="mail">
        <i-input v-model="formValidate.mail" placeholder="Enter your e-mail"></i-input>
    </form-item>
    <form-item label="City" prop="city">
          <i-select v-model="formValidate.city" placeholder="Select your city">
              <i-option value="beijing">New York</i-option>
              <i-option value="shanghai">London</i-option>
              <i-option value="shenzhen">Sydney</i-option>
          </i-select>
    </form-item>
  </i-form>
</template>

<script>
export default {
  name: 'jvi-form',
  data() {
    return {
      formValidate: {
        mail: 'xilewanggou@126.com',
        city: 'beijing',
      }
    }
  },
  props: {
      form:{},
      model:{}
  },
  computed: {

  },
  created () {
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  .ivu-form-item{
    margin-bottom: 1vh;
  }
</style>
