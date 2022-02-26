<template>
  <el-main class="p-8">
    <Breadcrumb
      :title="$t('tags.create.title')"
      des-route="tags"
      has-back-button
    />
    <FormWrapper ref="userAddForm" :model="form" @onSubmit="onSubmitTag">
      <!-- Thông tin sản phẩm -->
      <el-card shadow="never" style="border-radius: 15px" class="border-none">
        <h2 class="text-lg font-bold text-dark mb-5">
          {{ $t('tags.create.title') }}
        </h2>
        <InputWrapper
          rules="required"
          prop="enName"
          class="el-default-input dark mb-3 mr-3"
        >
          <label class="my-1 block text-dark">
            {{ $t('product.index.viName') }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.enName"
            :placeholder="$t('product.index.name')"
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
            {{ $t('product.index.enName') }}<span class="text-red">*</span>
          </label>
          <el-input
            v-model="form.viName"
            :placeholder="$t('product.index.name')"
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
import { tagActions } from '~/store/tag/actions'

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
  async fetch() {
    this.$loading()
    const { data } = await this.fetchSingle(this.$route.params.id)
    console.log('data', data)
    Object.keys(this.form).forEach((key) => {
      this.form[key] = data.data[key]
    })
    this.$loading().close()
  },
  data() {
    return {
      form: {
        viName: null,
        enName: null,
      },
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions({
      fetchSingle: tagActions.FETCH.SINGLE,
      update: tagActions.UPDATE.SINGLE,
    }),
    async onSubmitTag() {
      try {
        this.$loading()

        this.update({
          form: this.form,
          id: this.$route.params.id,
        })
      } catch (err) {
        this.$dev.error(err)
      } finally {
        this.$loading().close()
      }
    },
  },
  head() {
    return {
      title: this.$t('tags.create.title'),
    }
  },
}
</script>
