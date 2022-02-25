<template>
  <el-main class="p-8">
    <Breadcrumb
      :title="$t('orders.edit.title')"
      des-route="orders"
      has-back-button
    />
    <el-row>
      <FormWrapper ref="orderForm" class="my-5" :model="form">
        <InputWrapper rules="required" prop="note">
          <label class="font-medium">{{ $t('order.note') }}</label>
          <el-input
            v-model="form.note"
            rules="required"
            type="text"
            :placeholder="$t('order.note')"
            disabled
          ></el-input>
        </InputWrapper>
        <InputWrapper rules="required" prop="addressReceiver">
          <label class="font-medium">{{ $t('order.addressReceiver') }}</label>
          <el-input
            v-model="form.addressReceiver"
            rules="required"
            type="text"
            :placeholder="$t('order.addressReceiver')"
            disabled
          ></el-input>
        </InputWrapper>
        <InputWrapper rules="required" prop="phoneNumberReceiver">
          <label class="font-medium">{{
            $t('order.phoneNumberReceiver')
          }}</label>
          <el-input
            v-model="form.phoneNumberReceiver"
            rules="required"
            type="text"
            :placeholder="$t('order.phoneNumberReceiver')"
            disabled
          ></el-input>
        </InputWrapper>
        <InputWrapper rules="required" prop="dateReceiver">
          <label class="font-medium"
            >{{ $t('order.dateReceiver') }} <br />
            Chú thích: Thời gian chuẩn bị hàng cần {{ preTime }} ngày</label
          >
          <br />
          <el-date-picker
            v-model="form.dateReceiver"
            type="date"
            placeholder="Chọn ngày"
            :picker-options="datePickerOptions"
            disabled
          >
          </el-date-picker>
        </InputWrapper>
      </FormWrapper>
      <el-row>
        Thông tin đơn hàng
        <!-- <el-row :gutter="20">
            <el-col :span="8"> Tên sản phẩm </el-col>
            <el-col :span="8"> Số lượng </el-col>
            <el-col :span="8"> Giá tiền </el-col>
          </el-row>
          <el-row
            v-for="(item, index) in cart"
            :key="item.id"
            :gutter="20"
            class="mt-5"
          >
            <el-col :span="8">{{ index + 1 }}. {{ item.name }}</el-col>
            <el-col :span="8"> {{ item.quantity }} </el-col>
            <el-col :span="8"> {{ item.cost | formatVnd }} </el-col>
          </el-row> -->

        <el-table :data="cart" style="width: 100%" border>
          <el-table-column prop="product.name" label="Name"> </el-table-column>
          <el-table-column prop="quantity" label="Quantity"> </el-table-column>
          <el-table-column prop="product.cost" label="Cost"> </el-table-column>
        </el-table>
        <el-row class="mt-5 font-bold" :gutter="20">
          <el-col :offset="16" :span="8">
            Tổng tiền đơn hàng: {{ total | formatVnd }}</el-col
          >
        </el-row>
        <el-row>
          Trạng thái đơn hàng hiện tại:
          <el-tag class="font-bold">{{ current }}</el-tag>
        </el-row>
        <el-row class="text-center font-bold">
          Chuyển trạng thái đơn hàng
        </el-row>
        <el-row class="flex justify-center mt-5">
          <el-button
            type="info"
            :disabled="step > -1"
            @click="onChangeStatus('PENDING')"
          >
            Đang chờ
          </el-button>
          <el-button
            type="primary"
            :disabled="step > 0"
            @click="onChangeStatus('CONFIRMED')"
          >
            Đã xác nhận
          </el-button>
          <el-button
            type="warning"
            :disabled="step > 1"
            @click="onChangeStatus('PREPARING')"
          >
            Đang chuẩn bị
          </el-button>
          <el-button
            type="danger"
            :disabled="step > 2"
            @click="onChangeStatus('DELIVERY')"
          >
            Đang phân phối
          </el-button>
          <el-button
            type="success"
            :disabled="step > 3"
            @click="onChangeStatus('FINISHED')"
          >
            Đã hoàn thành
          </el-button>
        </el-row>
      </el-row>
    </el-row>
    <!--  -->
  </el-main>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { config } from './config'
import { Breadcrumb } from '~templates/Breadcrumb'
import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'
import { STATUS } from '~/constants/config/base/order'
import { orderActions } from '~/store/order/actions'

export default {
  name: 'Home',
  meta: {
    config,
  },
  middleware: ['auth'],
  components: {
    Breadcrumb,
    FormWrapper,
    InputWrapper,
  },
  data() {
    return {
      form: {
        note: null,
        addressReceiver: null,
        phoneNumberReceiver: null,
        dateReceiver: null,
      },
      tableData: [],
    }
  },

  computed: {
    ...mapState({
      order: (state) => state.order.viewing,
      cart: (state) => state.order?.viewing?.orderProducts,
      current: (state) => state.order?.viewing?.status,
      total: (state) => {
        let total = 0
        const products = state.order?.viewing?.orderProducts
        if (products && products.length > 0) {
          products.forEach((element) => {
            total += element.product.cost
          })
        }
        return total
      },
      step: (state) => {
        console.log('state', state.order)
        return STATUS.indexOf(state.order.viewing.status)
      },
    }),
  },
  created() {
    this.form.note = this.$store.state.order.viewing.note
    this.form.addressReceiver = this.$store.state.order.viewing.addressReceiver
    this.form.phoneNumberReceiver = this.$store.state.order.viewing.phoneNumberReceiver
    this.form.dateReceiver = this.$store.state.order.viewing.dateReceiver
    this.tableData = this.$store.state.order.viewing.orderProducts
  },
  methods: {
    ...mapActions({
      updateOrder: orderActions.UPDATE.SINGLE,
    }),
    ...mapMutations({}),
    /**
     * Fill the form with fetched customer
     */
    onUpdateOrder() {},
    resetOrderEditForm() {},
    onChangeStatus(payload) {
      console.log('payload', payload)
      console.log('this', this.$route.params.id)
      this.updateOrder({
        form: { status: payload },
        id: this.$route.params.id,
      })
    },
  },
  head() {
    return {
      title: this.$t('customers.edit.title'),
    }
  },
}
</script>
