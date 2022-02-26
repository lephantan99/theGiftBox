<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <p class="font-semibold text-lg">Thông tin user</p>
          <el-avatar
            class="mt-5"
            size="large"
            :src="profile.avatar"
          ></el-avatar>
          <br />
          <p>Họ và tên: {{ profile.firstName }} {{ profile.lastName }}</p>
          <p>Email: {{ profile.email }}</p>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <p class="font-semibold text-lg">Đơn hàng của bạn</p>
          <el-row v-for="(item, index) in orders" :key="item.id" :gutter="20">
            <el-col :span="2">{{ index + 1 }}.</el-col>
            <el-col :span="22">
              <el-row>Ghi chú (lời chúc): {{ item.note }}</el-row>
              <el-row>
                <el-col :span="8">
                  Địa chỉ nhận hàng: {{ item.addressReceiver }}
                </el-col>
                <el-col :span="16">
                  Ngày mong muốn nhận hàng:
                  {{ moment(item.dateReceiver).format('LLLL') }}
                </el-col>
              </el-row>
            </el-col>
            <el-row class="ml-10">Danh sách sản phẩm đã đặt: </el-row>
            <el-row
              v-for="(order, idx) in item.orderProducts"
              :key="order.order"
              class="ml-10"
            >
              <el-col :span="2">{{ idx + 1 }}.</el-col>
              <el-col :span="22">
                <el-row class="flex">
                  <el-col :span="6">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="order.product.mainImage"
                      fit="fill"
                    >
                    </el-image>
                  </el-col>
                  <el-col :span="18">
                    <el-row>{{ order.product.name }}</el-row>
                    <el-row>{{ order.product.cost | formatVnd }}</el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-row>
          <div v-if="!isShow" class="flex justify-end">
            <el-button type="success" @click="isShow = !isShow">
              Đánh giá
            </el-button>
          </div>
          <el-row v-for="(item, index) in orders" :key="item.id + 'review'">
            <FormWrapper
              v-if="isShow"
              :model="form"
              class="mt-6"
              @onSubmit="onSubmitReview(index)"
            >
              <InputWrapper prop="title" label="Tiêu đề đánh giá">
                <el-input
                  v-model="form.title"
                  placeholder="Hãy nhập tiêu đề đánh giá"
                >
                </el-input>
              </InputWrapper>
              <InputWrapper
                prop="content"
                rules="required"
                label="Nội dung đánh giá"
              >
                <el-input
                  v-model="form.content"
                  placeholder="Hãy nhập nội dung đánh giá"
                  type="type"
                >
                </el-input>
              </InputWrapper>
              <el-row class="flex justify-end">
                <el-button
                  type="primary"
                  class="font-bold text-white"
                  @click="isShow = !isShow"
                >
                  Hủy
                </el-button>
                <el-button
                  type="primary"
                  native-type="submit"
                  class="font-bold text-white"
                >
                  Gửi đánh giá
                </el-button>
              </el-row>
            </FormWrapper>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { orderActions } from '~/store/order/actions'
import { orderMutations } from '~/store/order/mutations'
import { reviewActions } from '~/store/review/actions'
import moment from 'moment'
import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'

export default {
  layout: 'clientDefault',
  meta: {
    config: {
      auth: true,
      permission: ['ALL'],
    },
  },
  components: {
    FormWrapper,
    InputWrapper,
  },
  async fetch() {
    this.$loading()
    this.setQuery({
      filter: `userId||$eq||${this.profile.id}`,
    })
    const { data } = await this.getOrdesOfUser()
    this.orders = data
    this.$loading().close()
  },
  data() {
    return {
      isShow: false,
      orders: [],
      form: {
        title: null,
        content: null,
      },
    }
  },
  computed: mapState({
    profile: (state) => state.auth.data,
    wishlist: (state) => state.wishlist.data,
  }),
  methods: {
    moment,
    ...mapActions({
      getOrdesOfUser: orderActions.FETCH.DATA,
      submitReview: reviewActions.SUBMIT.SINGLE,
    }),
    ...mapMutations({
      setQuery: orderMutations.SET.QUERY,
    }),
    onSubmitReview(index) {
      const products = this.orders[index].orderProducts.map((e) => {
        return { id: e.product.id }
      })
      products.forEach((element) => {
        console.log(element)
        const payload = {
          ...this.form,
          products: [element],
        }
        this.submitReview(payload)
      })
      // this.form = {
      //   ...this.form,
      //   products,
      // }
      // this.submitReview(this.form)
    },
  },
}
</script>
<style lang=""></style>
