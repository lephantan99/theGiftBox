<template>
  <el-main>
    <el-card :gutter="20">
      <h1 class="items-center text-center">Thông tin đơn hàng</h1>
      <el-row>
        <FormWrapper
          ref="orderForm"
          class="my-5"
          :model="form"
          @onSubmit="$emit('my-order-form-submit', form)"
        >
          <InputWrapper rules="required" prop="note">
            <label class="font-medium">{{ $t('order.note') }}</label>
            <el-input
              v-model="form.note"
              type="text"
              :placeholder="$t('orrder.note')"
            ></el-input>
          </InputWrapper>
          <InputWrapper rules="required" prop="addressReceiver">
            <label class="font-medium">{{ $t('order.addressReceiver') }}</label>
            <el-input
              v-model="form.addressReceiver"
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
              type="text"
              :placeholder="$t('order.phoneNumberReceiver')"
            ></el-input>
          </InputWrapper>
        </FormWrapper>
      </el-row>
    </el-card>
  </el-main>
</template>
<script>
import { FormWrapper, InputWrapper } from '~templates/Form'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  components: {
    FormWrapper,
    InputWrapper,
  },
  data() {
    return {
      form: {
        userName: '',
        password: '',
      },
    }
  },
  layout: 'clientDefault',
  meta: {
    config: {
      auth: true,
      permission: ['ALL'],
    },
  },
  computed: mapState({
    cart: (state) => state.cart.data,
  }),
  methods: {
    order() {
      if (this.$store.state.auth.data !== null) {
        // go to thanh toán
        this.$router.push('/client/order')
      } else {
        // Message.success('Sản phẩm này đã được xóa khỏi giỏ hàng')
        this.$router.push('/login')
      }
    },
  },
}
</script>
<style lang=""></style>
