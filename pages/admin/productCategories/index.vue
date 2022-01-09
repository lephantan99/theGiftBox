<template>
  <div>
    <Breadcrumb :title="$t('product.category.title')" />
    <ProductCategoryFilterBar
      @my-product-category-filter="onFilter"
      @my-product-category-filter-refresh="onRefreshFilter"
    />
    <DataTable
      v-loading="$fetchState.pending"
      :data="data"
      :total="dataTotal"
      :limit="limit"
      :current-page="currentPage"
      :multiple-choice="false"
      :actions="categoryTableActions"
      @my-table-on-action="handleTableEvents"
      @my-table-edit="onEdit"
      @my-table-delete="onDelete"
      @my-table-add-new="$router.push(`/${roleGroup}/categories/create`)"
    >
      <el-table-column type="index" width="50" label="STT" />
      <!-- eslint-disable prettier/prettier -->
      <!-- Just disable prettier/prettier here for shorter code -->
      <!-- <el-table-column :label="$t('drinks.index.code')" prop="id" /> -->
      <el-table-column :label="$t('product.category.name')" prop="name" />
      <el-table-column :label="$t('product.category.description')" prop="description" />
      <!-- <el-table-column :label="$t('drinks.index.types')" prop="category.name" /> -->
      <!-- eslint-enable prettier/prettier -->
    </DataTable>
  </div>
</template>
<script>
import { Breadcrumb } from '~templates/Breadcrumb'
import { DataTable } from '~templates/Table'
import { mapState, mapActions, mapMutations } from 'vuex'
import { ProductCategoryFilterBar } from '~/components/uncommon/Product'
import { categoryMutations as moduleMutations } from '~/store/product/category/mutations'
import { categoryActions as moduleActions } from '~/store/product/category/actions'
import { categoryGetters as moduleGetters } from '~/store/product/category/getters'
import dataTableMixin from '~/mixins/components/table'

export default {
  components: {
    Breadcrumb,
    DataTable,
    ProductCategoryFilterBar,
  },
  mixins: [dataTableMixin],
  data() {
    return {
      moduleMutations,
      moduleActions,
      moduleGetters,
      categoryTableActions: [
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
      data: (state) => state.product.category.data,
      limit: (state) => state.product.category.query.count,
      currentPage: (state) => state.product.category.query.page,
      dataTotal: (state) => state.product.category.total,
    }),
  },
  meta: {
    config: {
      auth: true,
      permission: ['ALL'],
    },
  },
  methods: {
    onClick() {
      console.log('onclick')
      this.$router.push('/123123')
    },
  },
}
</script>
<style lang=""></style>
