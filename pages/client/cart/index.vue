<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card>
          <p class="font-semibold text-lg">Giỏ hàng</p>
          <el-row :gutter="20">
            <el-col
              v-for="(item, index) in cartList"
              :key="index"
              :span="12"
              class="mt-5 cursor-pointer"
            >
              <el-card>
                <el-image
                  :src="item.mainImage"
                  fit="fill"
                  style="height: 300px"
                  class="w-full"
                >
                </el-image>
                <el-tag type="warning">{{
                  item.product_categories[0].name
                }}</el-tag>
                <br />
                {{ item.name }}
                <br />
                <p class="line-through">{{ (item.cost * 1.2) | formatVnd }}</p>
                {{ item.cost | formatVnd }} <el-tag type="info">-16%</el-tag>
                <br />

                <el-input-number
                  v-model="item.quantity"
                  :min="1"
                  class="mt-5"
                  @change="handleChange"
                ></el-input-number>
                <el-row class="mt-5">
                  <el-col :span="12">
                    <el-button type="warning" @click="onRemoveItem(item)">
                      Bỏ khỏi giỏ hàng
                    </el-button>
                  </el-col>
                  <!-- <el-col :span="12">
                    <el-button> Thêm vào giỏ hàng </el-button>
                  </el-col> -->
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          Thông tin giỏ hàng
          <br />
          Tổng cộng: {{ total | formatVnd }}
          <el-row class="flex justify-end">
            <el-button type="success" @click="order">Đặt hàng</el-button>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { cartMutations } from '~/store/cart/mutations'
export default {
  layout: 'clientDefault',
  meta: {
    config: {
      auth: true,
      permission: ['ALL'],
    },
  },
  name: 'CartComponent',
  data() {
    return {
      cartList: null,
    }
  },

  computed: mapState({
    cart: (state) => JSON.parse(JSON.stringify(state.cart.data)),
    total: (state) => {
      const cart = state.cart.data
      let total = 0
      cart.forEach((element) => {
        total += element.cost
        console.log('element.cost', element.cost)
      })
      return total
    },
  }),
  created() {
    this.cartList = JSON.parse(JSON.stringify(this.$store.state.cart.data))
  },
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
    handleChange(value) {
      console.log('123123', value)
    },
    onRemoveItem(item) {
      console.log('heree', item.id)
      let currentCart =
        JSON.parse(localStorage.getItem('cart')) !== null
          ? JSON.parse(localStorage.getItem('cart'))
          : []
      currentCart = currentCart.filter((e) => e.id !== item.id)
      localStorage.setItem('cart', JSON.stringify(currentCart))
      this.cartList = currentCart
      this.$store.commit(cartMutations.REMOVE.DATA, item.id, {
        root: true,
      })
    },
  },
}
</script>
<style lang=""></style>
