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
          prop="enName"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('category.index.viName') }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.enName"
            :placeholder="$t('category.index.name')"
            type="text"
            autocomplete="off"
            clearable
          />
        </InputWrapper>
        <InputWrapper
          rules="required"
          prop="viName"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('category.index.enName') }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.viName"
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
const axios = require('axios')
import file from '~/mixins/file'
import { categoryActions } from '~/store/category/actions'

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
        viName: null,
        enName: null,
        enDescription: null,
        viDescription: null,
        thumbnail: 'Example',
        status: 'ACTIVE',
        parent: null,
      },
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions({
      createCate: categoryActions.SUBMIT.SINGLE,
    }),
    async onSubmit() {
      try {
        this.$loading()

        this.createCate(this.form)
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
