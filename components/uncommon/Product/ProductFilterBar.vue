<template>
  <div style="min-height: 90px">
    <FormWrapper
      ref="productFilterForm"
      :model="form"
      class="flex my-10 flex-wrap"
    >
      <InputWrapper
        rules="no_special"
        prop="name"
        class="el-default-input mb-3 mr-3"
        style="width: 200px"
      >
        <el-input
          v-model="form.name"
          :placeholder="$t('product.index.name')"
          type="text"
          autocomplete="off"
          clearable
        />
      </InputWrapper>
      <div class="flex flex-row justify-between ml-10" style="width: 220px">
        <span
          style="height: 40px"
          class="btn bg-theme-1 hover:bg-theme-1-600 text-white"
          @click="handleFilter"
        >
          <fa :icon="['fas', 'filter']" class="mr-2" />
          <span>
            {{ $t('home.filter') }}
          </span>
        </span>
        <span
          style="height: 40px"
          class="btn bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-100 text-center"
          @click="resetFilter"
        >
          <fa :icon="['fas', 'times']" class="mr-2" />
          <span style="min-width: 45px">
            {{ $t('home.reset-filter') }}
          </span>
        </span>
      </div>
    </FormWrapper>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import filterBarMixin from '~/mixins/components/filterBar'
import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'

// const moment = require('moment')

export default {
  components: {
    FormWrapper,
    InputWrapper,
  },
  mixins: [filterBarMixin],

  data() {
    return {
      form: {
        name: null,
      },
      filterMap: {
        name: '$contL',
      },
      filter: null,
    }
  },
  computed: {
    ...mapState({}),
  },
  created() {
    this.fillFormFromQuery(this.$store.state.product.query)
  },
  methods: {
    handleCategorySearch(payload) {
      this.$emit('my-product-search', payload)
    },
    handleFilter() {
      if (this.filter) {
        this.$emit('my-product-filter', this.filter)
      }
    },
    resetFilter() {
      this.form = {
        name: null,
      }
      this.filter = null
      // this.form.handle()
      this.$refs.productFilterForm.reset()
      this.$emit('my-product-filter-refresh')
    },
  },
}
</script>
