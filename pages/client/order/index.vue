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
        // const payload = {
        //   note: this.form.note,
        //   addressReceiver: this.form.addressReceiver,
        //   phoneNumberReceiver: this.form.phoneNumberReceiver,
        //   dateReceiver: this.form.dateReceiver,
        //   orderProducts: this.cart,
        //   total: this.total.toString(),
        //   status: 'PENDING',
        // }
        // this.submitOrder(payload)
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        //parameters
        var partnerCode = 'MOMOYBMG20220214'
        var accessKey = 'J8bJOS9RbMWWH1R9'
        var secretkey = 'LYtlHA1ApEfzXllftkEuBOzxcFZqqIlz'
        var requestId = partnerCode + new Date().getTime()
        var orderId = requestId
        var orderInfo = 'Thanh toán đơn hàng the gift box'
        var redirectUrl = 'http://192.168.1.186:3010/client/order'
        var ipnUrl = 'https://callback.url/notify'
        // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
        // var amount = '50000'
        var requestType = 'captureWallet'
        var extraData = '' //pass empty value if your merchant does not have stores

        //before sign HMAC SHA256 with format
        // accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature =
          'accessKey=' +
          accessKey +
          '&amount=' +
          this.total +
          '&extraData=' +
          extraData +
          '&ipnUrl=' +
          ipnUrl +
          '&orderId=' +
          orderId +
          '&orderInfo=' +
          orderInfo +
          '&partnerCode=' +
          partnerCode +
          '&redirectUrl=' +
          redirectUrl +
          '&requestId=' +
          requestId +
          '&requestType=' +
          requestType
        //puts raw signature
        console.log('--------------------RAW SIGNATURE----------------')
        console.log(rawSignature)
        //signature
        const crypto = require('crypto')
        var signature = crypto
          .createHmac('sha256', secretkey)
          .update(rawSignature)
          .digest('hex')
        console.log('--------------------SIGNATURE----------------')
        console.log(signature)

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
          partnerCode: partnerCode,
          accessKey: accessKey,
          requestId: requestId,
          amount: this.total,
          orderId: orderId,
          orderInfo: orderInfo,
          redirectUrl: redirectUrl,
          ipnUrl: ipnUrl,
          extraData: extraData,
          requestType: requestType,
          signature: signature,
          lang: 'en',
        })
        //Create the HTTPS objects
        const https = require('https')
        const options = {
          hostname: 'test-payment.momo.vn',
          port: 443,
          path: '/v2/gateway/api/create',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody),
          },
        }
        //Send the request and get the response
        const req = https.request(options, (res) => {
          console.log(`Status: ${res.statusCode}`)
          console.log(`Headers: ${JSON.stringify(res.headers)}`)
          res.setEncoding('utf8')
          res.on('data', (body) => {
            console.log('Body: ')
            console.log(body)
            console.log('payUrl: ')
            // window.open(body.payUrl)
            window.open(JSON.parse(body).payUrl)
          })
          res.on('end', () => {
            console.log('No more data in response.')
          })
        })

        req.on('error', (e) => {
          console.log(`problem with request: ${e.message}`)
        })
        // write data to request body
        console.log('Sending....')
        req.write(requestBody)
        req.end()
      }
    },
  },
}
</script>
<style lang=""></style>
