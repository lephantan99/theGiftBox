<template>
  <el-main class="p-8">
    <Breadcrumb
      :title="$t('categories.create.title')"
      des-route="categories"
      has-back-button
    />
    <FormWrapper ref="userAddForm" :model="form" @onSubmit="onSubmit">
      <!-- Thông tin sản phẩm -->
      <el-card shadow="never" style="border-radius: 15px" class="border-none">
        <h2 class="text-lg font-bold text-dark mb-5">
          {{ $t('categories.create.title') }}
        </h2>
        <InputWrapper
          rules="required"
          prop="enTitle"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('category.index.viTitle') }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.enTitle"
            :placeholder="$t('category.index.name')"
            type="text"
            autocomplete="off"
            clearable
          />
        </InputWrapper>
        <InputWrapper
          rules="required"
          prop="viTitle"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('category.index.enTitle') }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.viTitle"
            :placeholder="$t('category.index.name')"
            type="text"
            autocomplete="off"
            clearable
          />
        </InputWrapper>
        <InputWrapper
          rules="required"
          prop="enDescription"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('category.index.enDescription')
            }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.enDescription"
            :placeholder="$t('category.index.description')"
            type="text"
            autocomplete="off"
            clearable
          />
        </InputWrapper>
        <InputWrapper
          rules="required"
          prop="viDescription"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('category.index.viDescription')
            }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.viDescription"
            :placeholder="$t('category.index.viDescription')"
            type="text"
            autocomplete="off"
            clearable
          />
        </InputWrapper>
        <InputWrapper
          rules="required"
          prop="note"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('category.index.note') }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.note"
            :placeholder="$t('category.index.note')"
            type="text"
            autocomplete="off"
            clearable
          />
        </InputWrapper>
        <InputWrapper
          rules="required"
          prop="enContent"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('category.index.enContent') }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.enContent"
            :placeholder="$t('category.index.content')"
            type="textarea"
            :rows="4"
            autocomplete="off"
            clearable
          />
        </InputWrapper>
        <InputWrapper
          rules="required"
          prop="viContent"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('category.index.viContent') }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.viContent"
            :placeholder="$t('category.index.content')"
            type="textarea"
            :rows="4"
            autocomplete="off"
            clearable
          />
        </InputWrapper>
        <InputWrapper
          style="width: 200px"
          rules="required"
          prop="tags"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('product.index.tag') }}<span class="text-red">*</span>
          </label>
          <el-select v-model="form.tags" multiple placeholder="Select">
            <el-option
              v-for="item in tags"
              :key="item.id"
              :label="item.enName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </InputWrapper>
        <InputWrapper
          style="width: 200px"
          rules="required"
          prop="categories"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('product.index.category') }}<span class="text-red">*</span>
          </label>
          <el-select v-model="form.categories" multiple placeholder="Select">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.enName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </InputWrapper>
        <InputWrapper prop="avatar" class="el-default-input mb-3 flex-1">
          <label class="my-1 inline-block text-dark">
            {{ $t('posts.index.mainImage') }}
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

        <el-row class="flex justify-end">
          <el-button
            size="small"
            type="success"
            native-type="submit"
            class="bg-theme-1 hover:bg-theme-1-600 text-white font-bold border-none rounded-md outline-none"
          >
            {{ $t('tag.create.submit') }}
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
import { FileUploader } from '~templates/Input'

const axios = require('axios')
import file from '~/mixins/file'
import { categoryActions } from '~/store/category/actions'
import { tagActions } from '~/store/tag/actions'
import { postActions } from '~/store/post/actions'

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
  },
  mixins: [file],
  async fetch() {
    const tags = await this.fetchTag()
    this.tags = tags.data
    const categories = await this.fetchCategories()
    this.categories = categories.data
  },
  data() {
    return {
      form: {
        viTitle: null,
        enTitle: null,
        enDescription: null,
        viDescription: null,
        enContent: null,
        viContent: null,
        note: null,
        thumbnail: 'Example',
        status: 'ACTIVE',
        tags: [],
        categories: [],
      },
      tags: [],
      categories: [],
      imageList: [],
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions({
      createPost: postActions.SUBMIT.SINGLE,
      fetchTag: tagActions.FETCH.DATA,
      fetchCategories: categoryActions.FETCH.DATA,
    }),
    async onSubmit() {
      try {
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
          this.form.thumbnail = data.data.url
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
        this.form.categories = this.form.categories.map((e) => {
          return { id: e }
        })
        this.form.tags = this.form.tags.map((e) => {
          return { id: e }
        })
        this.createPost(this.form)
      } catch (err) {
        this.$dev.error(err)
      } finally {
        this.$loading().close()
      }
    },
  },
  head() {
    return {
      title: this.$t('categories.create.title'),
    }
  },
}
</script>
