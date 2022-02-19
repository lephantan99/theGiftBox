<template>
  <el-main>
    <el-card :gutter="20">
      <h1 class="items-center text-center font-bold text-xl">
        Thông tin đơn hàng
      </h1>
      <el-row>
        <FormWrapper
          ref="orderForm"
          class="my-5"
          :model="form"
          @onSubmit="onSubmitOrder"
        >
          <InputWrapper rules="required" prop="note">
            <label class="font-medium">{{ $t('order.note') }}</label>
            <el-input
              v-model="form.note"
              rules="required"
              type="text"
              :placeholder="$t('order.note')"
            ></el-input>
          </InputWrapper>
          <InputWrapper rules="required" prop="addressReceiver">
            <label class="font-medium">{{ $t('order.addressReceiver') }}</label>
            <el-input
              v-model="form.addressReceiver"
              rules="required"
              type="text"
              :placeholder="$t('order.addressReceiver')"
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
            <el-table-column prop="name" label="Name"> </el-table-column>
            <el-table-column prop="quantity" label="Quantity">
            </el-table-column>
            <el-table-column prop="cost" label="Cost"> </el-table-column>
          </el-table>
          <el-row class="mt-5 font-bold" :gutter="20">
            <el-col :offset="16" :span="8">
              Tổng tiền đơn hàng: {{ total | formatVnd }}</el-col
            >
          </el-row>
          <el-row class="flex justify-end mt-5">
            <el-button type="success" @click="onSubmitOrder">
              Thanh toán
            </el-button>
          </el-row>
        </el-row>
      </el-row>
    </el-card>
  </el-main>
</template>
<script>
import { FormWrapper, InputWrapper } from '~templates/Form'
import { mapState, mapActions, mapMutations } from 'vuex'
import { orderActions } from '~/store/order/actions'
export default {
  components: {
    FormWrapper,
    InputWrapper,
  },
  async fetch() {
    this.$store.state.cart.data.forEach((element) => {
      this.preTime += element.preparationTime
    })
    this.preTime = Math.round(this.preTime / 24 + 1)
  },
  data() {
    return {
      form: {
        note: '',
        addressReceiver: '',
        phoneNumberReceiver: '',
        dateReceiver: null,
      },
      datePickerOptions: {
        disabledDate(date) {
          let currentCart =
            JSON.parse(localStorage.getItem('cart')) !== null
              ? JSON.parse(localStorage.getItem('cart'))
              : []
          let preTime = null
          if (currentCart !== null && currentCart !== undefined) {
            currentCart.forEach((element) => {
              preTime += element.preparationTime
            })
            preTime = Math.round(preTime / 24 + 1)
          }
          var someDate = new Date()
          var result = someDate.setDate(someDate.getDate() + preTime)
          return date < new Date(result)
        },
      },
      preTime: null,
    }
  },
  layout: 'clientDefault',
  meta: {
    config: {
      auth: true,
      permission: ['ALL'],
    },
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.data,
      total: (state) => {
        let total = 0
        state.cart.data.forEach((element) => {
          total += element.cost
        })
        return total
      },
    }),
  },
  methods: {
    ...mapActions({
      submitOrder: orderActions.SUBMIT.SINGLE,
    }),
    order() {
      if (this.$store.state.auth.data !== null) {
        // go to thanh toán
        this.$router.push('/client/order')
      } else {
        // Message.success('Sản phẩm này đã được xóa khỏi giỏ hàng')
        this.$router.push('/login')
      }
    },
    onSubmitOrder() {
      if (
        this.form.note === '' ||
        this.form.addressReceiver === '' ||
        this.form.phoneNumberReceiver === ''
      ) {
        this.$message.error(this.$t('Vui lòng điền đầy đủ thông tin!'))
      } else if (this.cart.length === 0) {
        this.$message.warning(this.$t('Không có sản phẩm nào trong đơn hàng!'))
      } else {
        const payload = {
          note: this.form.note,
          addressReceiver: this.form.addressReceiver,
          phoneNumberReceiver: this.form.phoneNumberReceiver,
          dateReceiver: this.form.dateReceiver,
          orderProducts: this.cart,
          total: this.total.toString(),
          status: 'PENDING',
        }
        this.submitOrder(payload)
      }
    },
  },
}
</script>
<style lang=""></style>
