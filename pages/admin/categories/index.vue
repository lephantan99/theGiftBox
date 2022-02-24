<template>
  <div>
    <Breadcrumb :title="$t('post.category.title')" />
    <!-- <CategoryFilterBar
      @my-category-filter="onFilter"
      @my-category-filter-refresh="onRefreshFilter"
    /> -->
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
      @my-table-add-new="$router.push(`/admin/productCategories/create`)"
    >
      <el-table-column type="index" width="50" label="STT" />
      <!-- eslint-disable prettier/prettier -->
      <!-- Just disable prettier/prettier here for shorter code -->
      <!-- <el-table-column :label="$t('drinks.index.code')" prop="id" /> -->
      <el-table-column :label="$t('post.category.name')" prop="enName" />
      <el-table-column :label="$t('post.category.description')" prop="enDescription" >
        <template slot-scope="scope">
          <div class="truncate" >{{ scope.row.enDescription}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('post.category.createdBy')" prop="user.firstName" />
      <!-- <el-table-column :label="$t('drinks.index.types')" prop="category.name" /> -->
      <!-- eslint-enable prettier/prettier -->
    </DataTable>
  </div>
</template>
<script>
import { Breadcrumb } from '~templates/Breadcrumb'
import { DataTable } from '~templates/Table'
import { mapState, mapActions, mapMutations } from 'vuex'
// import { CategoryFilterBar } from '~/components/uncommon/Category'
import { postCategoryMutations as moduleMutations } from '~/store/post/category/mutations'
import { postCategoryActions as moduleActions } from '~/store/post/category/actions'
import { postCategoryGetters as moduleGetters } from '~/store/post/category/getters'
import dataTableMixin from '~/mixins/components/table'

export default {
  components: {
    Breadcrumb,
    DataTable,
    // CategoryFilterBar,
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
      data: (state) => state.post.category.data,
      limit: (state) => state.post.category.query.count,
      currentPage: (state) => state.post.category.query.page,
      dataTotal: (state) => state.post.category.total,
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
