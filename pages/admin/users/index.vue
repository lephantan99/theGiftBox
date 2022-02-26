<template>
  <div>
    <Breadcrumb :title="$t('user.title')" />
    <!-- <TagFilterBar
      @my-user-filter="onFilter"
      @my-user-filter-refresh="onRefreshFilter"
    /> -->
    <DataTable
      v-loading="$fetchState.pending"
      :data="data"
      :total="dataTotal"
      :limit="limit"
      :current-page="currentPage"
      :multiple-choice="false"
      :actions="userTableActions"
      :is-add="false"
      @my-table-on-action="handleTableEvents"
      @my-table-edit="onEdit"
      @my-table-delete="onDelete"
      @my-table-add-new="$router.push(`/${roleGroup}/categories/create`)"
    >
      <el-table-column type="index" width="50" label="STT" />
      <!-- eslint-disable prettier/prettier -->
      <!-- Just disable prettier/prettier here for shorter code -->
      <!-- <el-table-column :label="$t('drinks.index.code')" prop="id" /> -->
      <el-table-column :label="$t('user.index.name')" prop="firstName" >
        <template slot-scope="scope">
          {{ scope.row.firstName + ' ' +  scope.row.lastName}}

        </template>
      </el-table-column>
      <el-table-column :label="$t('user.index.email')" prop="email" />
      <el-table-column :label="$t('user.index.phoneNumber')" prop="phoneNumber" />
      <el-table-column :label="$t('user.index.createdAt')" prop="createdAt" >
        <template slot-scope="scope">
          {{ moment(scope.row.createdAt).format('DD/MM/YYYY') }}

        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('drinks.index.types')" prop="user.name" /> -->
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
import { userMutations as moduleMutations } from '~/store/user/mutations'
import { userActions as moduleActions } from '~/store/user/actions'
import { userGetters as moduleGetters } from '~/store/user/getters'
import dataTableMixin from '~/mixins/components/table'
import auth from '~/middleware/auth'

export default {
  components: {
    Breadcrumb,
    DataTable,
    // TagFilterBar,
  },
  middleware: [auth],
  mixins: [dataTableMixin],
  data() {
    return {
      moduleMutations,
      moduleActions,
      moduleGetters,
      userTableActions: [
        // {
        //   name: 'edit',
        //   label: 'table.edit',
        //   permission: ['ALL'],
        // },
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
      data: (state) => state.user.data,
      limit: (state) => state.user.query.count,
      currentPage: (state) => state.user.query.page,
      dataTotal: (state) => state.user.total,
    }),
  },
  meta: {
    config: {
      auth: true,
      permission: ['ADMIN'],
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
