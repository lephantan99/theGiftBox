<template>
  <div>
    <Breadcrumb :title="$t('review.title')" />
    <!-- <TagFilterBar
      @my-review-filter="onFilter"
      @my-review-filter-refresh="onRefreshFilter"
    /> -->
    <DataTable
      v-loading="$fetchState.pending"
      :data="data"
      :total="dataTotal"
      :limit="limit"
      :current-page="currentPage"
      :multiple-choice="false"
      :actions="reviewTableActions"
      :is-add="false"
      @my-table-on-action="handleTableEvents"
      @my-table-delete="onDelete"
    >
      <el-table-column type="index" width="50" label="STT" />
      <!-- eslint-disable prettier/prettier -->
      <!-- Just disable prettier/prettier here for shorter code -->
      <!-- <el-table-column :label="$t('drinks.index.code')" prop="id" /> -->
      <el-table-column :label="$t('review.index.name')" prop="firstName" >
        <template slot-scope="scope">
          {{ $e(scope.row.user, 'lastName') + ' ' +  $e(scope.row.user, 'firstName')}}

        </template>
      </el-table-column>
      <el-table-column :label="$t('review.index.title')" prop="title" />
      <el-table-column :label="$t('review.index.content')" prop="content" />
      <el-table-column :label="$t('review.index.createdAt')" prop="createdAt" >
        <template slot-scope="scope">
          {{ moment(scope.row.createdAt).format('DD/MM/YYYY') }}

        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('drinks.index.types')" prop="review.name" /> -->
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
import { reviewMutations as moduleMutations } from '~/store/review/mutations'
import { reviewActions as moduleActions } from '~/store/review/actions'
import { reviewGetters as moduleGetters } from '~/store/review/getters'
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
      reviewTableActions: [
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
      data: (state) => state.review.data,
      limit: (state) => state.review.query.count,
      currentPage: (state) => state.review.query.page,
      dataTotal: (state) => state.review.total,
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
      deleteReview: moduleActions.DELETE.SINGLE,
    }),
    moment,
    onClick() {
      console.log('onclick')
      this.$router.push('/123123')
    },
    async onDelete(payload) {
      this.$loading()
      await this.deleteReview(payload.rowData.id)
      await this.$fetch()
      this.$loading().close()
    },
  },
}
</script>
<style lang=""></style>
