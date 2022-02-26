<template>
  <div>
    <Breadcrumb :title="$t('tag.title')" />
    <!-- <TagFilterBar
      @my-tag-filter="onFilter"
      @my-tag-filter-refresh="onRefreshFilter"
    /> -->
    <DataTable
      v-loading="$fetchState.pending"
      :data="data"
      :total="dataTotal"
      :limit="limit"
      :current-page="currentPage"
      :multiple-choice="false"
      :actions="tagTableActions"
      @my-table-on-action="handleTableEvents"
      @my-table-edit="onEdit"
      @my-table-delete="onDelete"
      @my-table-add-new="$router.push(`/admin/tags/create`)"
    >
      <el-table-column type="index" width="50" label="STT" />
      <!-- eslint-disable prettier/prettier -->
      <!-- Just disable prettier/prettier here for shorter code -->
      <!-- <el-table-column :label="$t('drinks.index.code')" prop="id" /> -->
      <el-table-column :label="$t('tag.index.name')" prop="enName" />
      <el-table-column :label="$t('tag.index.createdBy')" prop="user.firstName" />
      <el-table-column :label="$t('tag.index.createdAt')" prop="createdAt" >
        <template slot-scope="scope">
          {{ moment(scope.row.createdAt).format('DD/MM/YYYY') }}

        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('drinks.index.types')" prop="tag.name" /> -->
      <!-- eslint-enable prettier/prettier -->
    </DataTable>
  </div>
</template>
<script>
import { Breadcrumb } from '~templates/Breadcrumb'
import { DataTable } from '~templates/Table'
import { mapState, mapActions, mapMutations } from 'vuex'
// import { TagFilterBar } from '~/components/uncommon/Tag'
import moment from 'moment'
import { tagMutations as moduleMutations } from '~/store/tag/mutations'
import { tagActions as moduleActions } from '~/store/tag/actions'
import { tagGetters as moduleGetters } from '~/store/tag/getters'
import dataTableMixin from '~/mixins/components/table'

export default {
  components: {
    Breadcrumb,
    DataTable,
    // TagFilterBar,
  },
  mixins: [dataTableMixin],
  data() {
    return {
      moduleMutations,
      moduleActions,
      moduleGetters,
      tagTableActions: [
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
      data: (state) => state.tag.data,
      limit: (state) => state.tag.query.count,
      currentPage: (state) => state.tag.query.page,
      dataTotal: (state) => state.tag.total,
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
      delete: moduleActions.DELETE.SINGLE,
    }),
    moment,
    onClick() {
      console.log('onclick')
      this.$router.push('/123123')
    },
    onEdit(payload) {
      this.$router.push(`/admin/tags/edit/${payload.rowData.id}`)
    },
    async onDelete(payload) {
      this.$loading()
      await this.delete(payload.rowData.id)
      await this.$fetch()
      this.$loading().close()
    },
  },
}
</script>
<style lang=""></style>
