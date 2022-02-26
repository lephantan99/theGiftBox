<template>
  <div>
    <Breadcrumb :title="$t('order.title')" />
    <!-- <ProductFilterBar
      @my-order-filter="onFilter"
      @my-order-filter-refresh="onRefreshFilter"
    /> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Đang chờ" name="pending"></el-tab-pane>
      <el-tab-pane label="Đã xác nhận" name="confirmed"></el-tab-pane>
      <el-tab-pane label="Đang chuẩn bị" name="preparing"></el-tab-pane>
      <el-tab-pane label="Đang giao hàng" name="delivery"></el-tab-pane>
      <el-tab-pane label="Đã hoàn thành" name="finished"></el-tab-pane>
    </el-tabs>
    <DataTable
      v-loading="$fetchState.pending"
      :data="tableData"
      :total="dataTotal"
      :is-add="false"
      :limit="limit"
      :current-page="currentPage"
      :multiple-choice="false"
      :actions="orderTableActions"
      @my-table-on-action="handleTableEvents"
      @my-table-edit="onEdit"
    >
      <el-table-column type="index" width="50" label="STT" />
      <!-- eslint-disable prettier/prettier -->
      <!-- Just disable prettier/prettier here for shorter code -->
      <!-- <el-table-column :label="$t('drinks.index.code')" prop="id" /> -->
      <el-table-column :label="$t('order.note')" prop="note" />
      <el-table-column :label="$t('order.addressReceiver')" prop="addressReceiver" >
        <template slot-scope="scope">
          <div class="truncate" >{{ scope.row.addressReceiver}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.phoneNumberReceiver')" prop="phoneNumberReceiver" >
        <template slot-scope="scope">
          <div class="truncate" >{{ scope.row.phoneNumberReceiver}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.dateReceiverAdmin')" prop="dateReceiver" >
        <template slot-scope="scope">
          <div class="truncate" >{{ scope.row.dateReceiver | formatDate}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.status')" prop="status" >
        <template slot-scope="scope">
          <!-- <div class="truncate" >{{ scope.row.status === 'PENDING' ? 'Đang chờ' : scope.row.status === 'CONFIRMED' ? 'Đã xác nhận' : scope.row.status === 'PREPARING' ? 'Đang chuẩn bị' : scope.row.status === 'DELIVERY' ? 'Đang giao hàng' : 'Hoàn thành' }}</div> -->
          <div v-if="scope.row.status === 'PENDING'">
            <el-tag>Đang chờ</el-tag>
          </div>
          <div v-else-if="scope.row.status === 'CONFIRMED'">
            <el-tag type="success">Đã xác nhận</el-tag>
          </div>
          <div v-else-if="scope.row.status === 'PREPARING'">
            <el-tag type="info">Đang chuẩn bị</el-tag>
          </div>
          <div v-else-if="scope.row.status === 'DELIVERY'">
            <el-tag type="warning">Đang giao hàng</el-tag>
          </div>
          <div v-else>
            <el-tag type="danger">Đã hoàn thành</el-tag>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('drinks.index.types')" prop="category.name" /> -->
      <!-- eslint-enable prettier/prettier -->
    </DataTable>
  </div>
</template>
<script>
import { Breadcrumb } from '~templates/Breadcrumb'
import { DataTable } from '~templates/Table'
import { config } from './config'
import { mapState, mapActions, mapMutations } from 'vuex'
// import { ProductFilterBar } from '~/components/uncommon/Product'
import { orderMutations as moduleMutations } from '~/store/order/mutations'
import { orderActions as moduleActions } from '~/store/order/actions'
import { orderGetters as moduleGetters } from '~/store/order/getters'
import dataTableMixin from '~/mixins/components/table'

import auth from '~/middleware/auth'

export default {
  components: {
    Breadcrumb,
    DataTable,
    // ProductFilterBar,
  },
  meta: {
    config,
  },
  mixins: [dataTableMixin],
  middleware: [auth],
  async fetch() {
    await this.clearQuery()
    await this.fetchOrder()
    this.tableData = this.$store.state.order.data.filter(
      (e) => e.status === 'PENDING'
    )
  },
  data() {
    return {
      moduleMutations,
      moduleActions,
      moduleGetters,
      orderTableActions: [
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
      activeName: 'pending',
      tableData: [],
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.order.data,
      limit: (state) => state.order.query.count,
      currentPage: (state) => state.order.query.page,
      dataTotal: (state) => state.order.total,
    }),
  },
  // meta: {
  //   config: {
  //     auth: true,
  //     permission: ['ALL'],
  //   },
  // },
  methods: {
    ...mapActions({
      fetchOrder: moduleActions.FETCH.DATA,
    }),
    ...mapMutations({
      setViewing: moduleMutations.SET.VIEWING,
      clearQuery: moduleMutations.CLEAR.QUERY,
    }),
    onClick() {
      console.log('onclick')
      this.$router.push('/123123')
    },
    handleClick(tab, event) {
      if (tab.name === 'confirmed') {
        this.tableData = this.$store.state.order.data.filter(
          (e) => e.status === 'CONFIRMED'
        )
      } else if (tab.name === 'pending') {
        console.log('heheeh')
        this.tableData = this.$store.state.order.data.filter(
          (e) => e.status === 'PENDING'
        )
      } else if (tab.name === 'preparing') {
        this.tableData = this.$store.state.order.data.filter(
          (e) => e.status === 'PREPARING'
        )
      } else if (tab.name === 'delivery') {
        this.tableData = this.$store.state.order.data.filter(
          (e) => e.status === 'DELIVERY'
        )
      } else {
        this.tableData = this.$store.state.order.data.filter(
          (e) => e.status === 'FINISHED'
        )
      }
    },
    async onEdit(payload) {
      console.log('payload', payload)
      await this.setViewing(payload.rowData)
      this.$router.push(`/admin/orders/edit/${payload.rowData.id}`)
    },
  },
}
</script>
<style lang=""></style>
