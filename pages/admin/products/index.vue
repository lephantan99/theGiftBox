<template>
  <div>
    <Breadcrumb :title="$t('product.title')" />
    <ProductFilterBar
      @my-product-filter="onFilter"
      @my-product-filter-refresh="onRefreshFilter"
    />
    <DataTable
      v-loading="$fetchState.pending"
      :data="data"
      :total="dataTotal"
      :limit="limit"
      :current-page="currentPage"
      :multiple-choice="false"
      :actions="productTableActions"
      @my-table-on-action="handleTableEvents"
      @my-table-edit="onEdit"
      @my-table-delete="onDelete"
      @my-table-add-new="$router.push(`/admin/products/create`)"
    >
      <el-table-column type="index" width="50" label="STT" />
      <!-- eslint-disable prettier/prettier -->
      <!-- Just disable prettier/prettier here for shorter code -->
      <!-- <el-table-column :label="$t('drinks.index.code')" prop="id" /> -->
      <el-table-column :label="$t('product.index.name')" prop="name" />
      <el-table-column :label="$t('product.index.description')" prop="description" />
      <el-table-column :label="$t('product.index.cost')" prop="cost" />
      <!-- <el-table-column :label="$t('drinks.index.types')" prop="category.name" /> -->
      <!-- eslint-enable prettier/prettier -->
    </DataTable>
  </div>
</template>
<script>
import { Breadcrumb } from '~templates/Breadcrumb'
import { DataTable } from '~templates/Table'
import { mapState, mapActions, mapMutations } from 'vuex'
import { ProductFilterBar } from '~/components/uncommon/Product'
import { productMutations as moduleMutations } from '~/store/product/mutations'
import {
  productActions as moduleActions,
  productActions,
} from '~/store/product/actions'
import { productGetters as moduleGetters } from '~/store/product/getters'
import dataTableMixin from '~/mixins/components/table'

export default {
  components: {
    Breadcrumb,
    DataTable,
    ProductFilterBar,
  },
  mixins: [dataTableMixin],
  // async fetch() {
  //   console.log('123123')
  //   const { data } = await this.fetchSingleProduct(this.$route.params.id)
  //   console.log('123123')
  // },
  data() {
    return {
      moduleMutations,
      moduleActions,
      moduleGetters,
      productTableActions: [
        {
          name: 'edit',
          label: 'table.edit',
          permission: ['ALL'],
        },
        {
          name: 'delete',
          label: 'table.delete',
          permission: ['ALL'],
        },
      ],
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.product.data,
      limit: (state) => state.product.query.count,
      currentPage: (state) => state.product.query.page,
      dataTotal: (state) => state.product.total,
      viewing: (state) => state.product.viewing,
    }),
  },
  meta: {
    config: {
      auth: true,
      permission: ['ALL'],
    },
  },
  methods: {
    ...mapActions({
      fetchSingleProduct: productActions.FETCH.SINGLE,
      deleteProduct: productActions.DELETE.SINGLE,
    }),
    fillForm() {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = this.viewingDrink[key]
      })
    },
    onClick() {
      console.log('onclick')
      this.$router.push('/123123')
    },
    onEdit(payload) {
      this.$router.push(`/admin/products/edit/${payload.rowData.id}`)
    },
    async onDelete(payload) {
      this.$loading()
      await this.deleteProduct(payload.rowData.id)
      await this.$fetch()
      this.$loading().close()
    },
  },
}
</script>
<style lang=""></style>
