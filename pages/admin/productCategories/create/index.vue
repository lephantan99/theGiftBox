<template>
  <el-main class="p-8">
    <Breadcrumb
      :title="$t('product.create.title')"
      des-route="products"
      has-back-button
    />
    <FormWrapper
      ref="userAddForm"
      :model="form"
      @onSubmit="onSubmitProductCategory"
    >
      <!-- Thông tin sản phẩm -->
      <el-card shadow="never" style="border-radius: 15px" class="border-none">
        <h2 class="text-lg font-bold text-dark mb-5">
          {{ $t('product.create.title') }}
        </h2>
        <InputWrapper
          rules="required"
          prop="name"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('product.index.name') }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.name"
            :placeholder="$t('product.index.name')"
            type="text"
            autocomplete="off"
            clearable
          />
        </InputWrapper>
        <InputWrapper
          rules="required"
          prop="description"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('product.index.description') }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.description"
            :placeholder="$t('product.index.description')"
            type="text"
            autocomplete="off"
            clearable
          />
        </InputWrapper>

        <el-row class="flex justify-end">
          <el-button
            size="small"
            type="success"
            native-type="submit"
            class="bg-theme-1 hover:bg-theme-1-600 text-white font-bold border-none rounded-md outline-none"
          >
            {{ $t('product.create.submit') }}
          </el-button>
        </el-row>
      </el-card>
    </FormWrapper>
    <!--  -->
  </el-main>
</template>
<script>
import moment from 'moment'
import { mapActions } from 'vuex'
import { config } from './config'
import { Breadcrumb } from '~templates/Breadcrumb'
import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'
import { userActions } from '~/store/user/actions'
// import { MediaPicker } from '~templates/Media'
const axios = require('axios')
import file from '~/mixins/file'
import { productCategoryActions } from '~/store/productCategory/actions'

export default {
  name: 'UserCreate',
  meta: {
    config,
  },
  middleware: ['auth'],
  components: {
    Breadcrumb,
    FormWrapper,
    InputWrapper,
    // MediaPicker,
  },
  mixins: [file],
  data() {
    return {
      form: {
        name: null,
        description: null,
      },
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions({
      createProductCategory: productCategoryActions.SUBMIT.SINGLE,
    }),
    async onSubmitProductCategory() {
      try {
        this.$loading()

        this.createProductCategory(this.form)
      } catch (err) {
        this.$dev.error(err)
      } finally {
        this.$loading().close()
      }
    },
  },
  head() {
    return {
      title: this.$t('product.create.title'),
    }
  },
}
</script>
