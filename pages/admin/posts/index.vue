<template>
  <div>
    <Breadcrumb :title="$t('post.title')" />
    <!-- <ProductFilterBar
      @my-post-filter="onFilter"
      @my-post-filter-refresh="onRefreshFilter"
    /> -->
    <DataTable
      v-loading="$fetchState.pending"
      :data="data"
      :total="dataTotal"
      :limit="limit"
      :current-page="currentPage"
      :multiple-choice="false"
      :actions="postTableActions"
      @my-table-on-action="handleTableEvents"
      @my-table-edit="onEdit"
      @my-table-delete="onDelete"
      @my-table-add-new="$router.push(`/${roleGroup}/posts/create`)"
    >
      <el-table-column type="index" width="50" label="STT" />
      <!-- eslint-disable prettier/prettier -->
      <!-- Just disable prettier/prettier here for shorter code -->
      <!-- <el-table-column :label="$t('drinks.index.code')" prop="id" /> -->
      <el-table-column :label="$t('post.index.name')" prop="name" />
      <el-table-column :label="$t('post.index.description')" prop="description" />
      <el-table-column :label="$t('post.index.cost')" prop="cost" />
      <!-- <el-table-column :label="$t('drinks.index.types')" prop="category.name" /> -->
      <!-- eslint-enable prettier/prettier -->
    </DataTable>
  </div>
</template>
<script>
import { Breadcrumb } from '~templates/Breadcrumb'
import { DataTable } from '~templates/Table'
import { mapState, mapActions, mapMutations } from 'vuex'
// import { ProductFilterBar } from '~/components/uncommon/Product'
import { postMutations as moduleMutations } from '~/store/post/mutations'
import { postActions as moduleActions } from '~/store/post/actions'
import { postGetters as moduleGetters } from '~/store/post/getters'
import dataTableMixin from '~/mixins/components/table'

export default {
  components: {
    Breadcrumb,
    DataTable,
    // ProductFilterBar,
  },
  mixins: [dataTableMixin],
  data() {
    return {
      moduleMutations,
      moduleActions,
      moduleGetters,
      postTableActions: [
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
      data: (state) => state.post.data,
      limit: (state) => state.post.query.count,
      currentPage: (state) => state.post.query.page,
      dataTotal: (state) => state.post.total,
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
