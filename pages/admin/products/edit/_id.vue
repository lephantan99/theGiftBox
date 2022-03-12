<template>
  <el-main class="p-8">
    <Breadcrumb
      :title="$t('product.create.title')"
      des-route="products"
      has-back-button
    />
    <FormWrapper ref="userAddForm" :model="form" @onSubmit="onSubmitProduct">
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
        <InputWrapper
          rules="required"
          prop="content"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('product.index.content') }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.content"
            :placeholder="$t('product.index.content')"
            type="text"
            autocomplete="off"
            clearable
          />
        </InputWrapper>
        <InputWrapper prop="avatar" class="el-default-input mb-3 flex-1">
          <label class="my-1 inline-block text-dark">
            {{ $t('product.index.mainImage') }}
          </label>
          <FileUploader v-model="imageList" :limit="1" preview />
          <!-- <MediaPicker
            id="image-picker"
            v-model="imageList"
            type="DRINK"
            :thumbnail="$e(form, 'image?.link?.thumbnail') || ''"
            :preview="[$e(form, 'image?.link?.origin')]"
            @my-media-picker-selected="handleImagePicked"
            @my-media-picker-clear="handleImageClear"
          /> -->
        </InputWrapper>
        <InputWrapper
          rules="required"
          prop="cost"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('product.index.cost') }}<span class="text-red">*</span>
          </label>
          <!-- <el-input
            v-model="form.cost"
            :placeholder="$t('product.index.cost')"
            type="text"
            autocomplete="off"
            clearable
          /> -->
          <el-input-number
            v-model="form.cost"
            :min="10000"
            :max="1000000000"
            :step="10000"
          ></el-input-number>
        </InputWrapper>
        <InputWrapper
          style="width: 200px"
          rules="required"
          prop="preparationTime"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('product.index.preparationTime')
            }}<span class="text-red">*</span>
          </label>
          <!-- <el-input
            v-model="form.preparationTime"
            style="width: 200px"
            :placeholder="$t('product.index.preparationTime')"
            type="text"
            autocomplete="off"
            clearable
          /> -->
          <el-input-number
            v-model="form.preparationTime"
            :min="1"
            :max="100"
          ></el-input-number>
        </InputWrapper>
        <InputWrapper
          style="width: 200px"
          rules="required"
          prop="preparationTime"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('product.index.category') }}<span class="text-red">*</span>
          </label>
          <el-select
            v-model="form.product_categories"
            multiple
            placeholder="Select"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
import { mapActions, mapState } from 'vuex'
import { config } from './config'
import { Breadcrumb } from '~templates/Breadcrumb'
import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'
import { FileUploader } from '~templates/Input'
import { userActions } from '~/store/user/actions'
// import { MediaPicker } from '~templates/Media'
const axios = require('axios')
import file from '~/mixins/file'
import { productActions } from '~/store/product/actions'
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
    FileUploader,
    // MediaPicker,
  },
  mixins: [file],
  async fetch() {
    const { data } = await this.fetchSingleProduct(this.$route.params.id)
    this.fillForm()
    const response = await this.fetchProductCategory()
    this.options = response.data
  },
  data() {
    return {
      form: {
        name: null,
        description: null,
        content: null,
        mainImage: null,
        cost: null,
        preparationTime: null,
        viewCount: 1,
        product_categories: [],
      },
      imageList: [],
      options: [],
    }
  },
  computed: {
    ...mapState({
      viewing: (state) => state.product.viewing,
    }),
    baseImageURL() {
      return `${process.env.API_URL}/upload/images/`
    },
    baseDocumentURL() {
      return `${process.env.API_URL}/upload/documents/`
    },
  },
  methods: {
    ...mapActions({
      fetchProductCategory: productCategoryActions.FETCH.DATA,
      submitSingleUser: userActions.SUBMIT.SINGLE,
      updateProduct: productActions.UPDATE.SINGLE,
      fetchSingleProduct: productActions.FETCH.SINGLE,
    }),
    fillForm() {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = this.viewing.data[key]
      })
      this.imageList.push({ url: this.viewing.data.mainImage })
      // JSON.parse(
      //   JSON.stringify(this.viewing.data.product_categories)
      // ).forEach((e) => this.form.product_categories.push(e.id))
      const Ids = this.viewing.data.product_categories.map((e) => e.id)
      this.form.product_categories = Ids
    },
    resetUserAddForm() {
      this.confirmAction(() => {
        this.$refs.userAddForm.reset()
      })
    },
    async onSubmitProduct() {
      try {
        this.$loading()
        const form = JSON.parse(JSON.stringify(this.form))
        Object.keys(form).forEach((key) => {
          if (!form[key]) delete form[key]
        })
        const image = this.imageList[0]
        if (image) {
          const payload = {
            name: this.imageList[0].fileName,
            type: this.imageList[0].mimeType,
          }
          const { data } = await this.$authApi.post(
            '/medias/presigned-url',
            payload
          )
          this.form.mainImage = data.data.url
          const url = data.data.presignedUrl
          this.$axios.$request({
            headers: {
              'content-type': `image/jpeg`,
            },
            method: 'put',
            url,
            data: this.imageList[0].raw,
          })
          // this.$axios.onRequest((url) => {
          //   console.log('Making request to ' + url)
          // })
        }
        this.form.product_categories = this.form.product_categories.map((e) => {
          return { id: e }
        })
        this.updateProduct({
          form: this.form,
          id: this.viewing.data.id,
        })
      } catch (err) {
        this.$dev.error(err)
      } finally {
        this.$loading().close()
      }
    },
    handleImagePicked(pickedImages) {
      this.form.image.mimeType =
        'image/' + /(?:\.([^.]+))?$/.exec(pickedImages[0].fileName)[1] // Extract extension from file's name
      this.form.image.link.origin = pickedImages[0].links.origin
      this.form.image.link.medium = pickedImages[0].links.medium
      this.form.image.link.thumbnail = pickedImages[0].links.thumbnail
    },
    handleImageClear() {
      delete this.form.image
    },
  },
  head() {
    return {
      title: this.$t('product.create.title'),
    }
  },
}
</script>
