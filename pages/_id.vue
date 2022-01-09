<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="12"
        ><el-image :src="product.mainImage" fit="contain"> </el-image
      ></el-col>
      <el-col :span="12">
        <div>
          <p class="text-green">The Gift Box</p>
          <p class="font-bold text-xl">{{ product.name }}</p>
          <p>{{ product.description }}</p>
          <p class="line-through">{{ (product.cost * 1.2) | formatVnd }}</p>
          <p class="font-bold">{{ product.cost | formatVnd }}</p>
        </div>
        <el-row :gutter="20" class="mt-5 border-gray-400 border p-4 rounded-md">
          <el-col :span="8">
            <div class="flex justify-center text-blue">
              <fa :icon="['fa', 'hand-point-down']" />
            </div>
            <p class="text-center mt-2">
              Nhận ngay voucher giảm giá lên đến 20%
            </p>
          </el-col>
          <el-col :span="8" class="border-l border-r border-gray-400">
            <div class="flex justify-center text-blue">
              <fa :icon="['fa', 'hand-point-down']" />
            </div>
            <p class="text-center mt-2">
              Giao hàng đúng lịch, nhanh chóng, an toàn
            </p>
          </el-col>
          <el-col :span="8">
            <div class="flex justify-center text-blue">
              <fa :icon="['fa', 'hand-point-down']" />
            </div>
            <p class="text-center mt-2">
              Chính sách đền bù rủi ro, sự cố thỏa đáng
            </p>
          </el-col>
        </el-row>
        <el-row class="flex justify-around mt-10">
          <el-button type="success" plain class="w-5/12 h-16">
            <div class="flex justify-center items-center">
              <i
                class="w-6 h-6 text-4xl el-icon-shopping-cart-full cursor-pointer mr-4 mb-4"
              ></i>
              Thêm vào giỏ hàng
            </div>
          </el-button>
          <el-button
            type="danger"
            plain
            class="w-5/12 h-16"
            @click="onAddWishList"
          >
            <div class="flex justify-center items-center">
              <fa
                :icon="['far', 'heart']"
                class="w-6 h-6 text-xl cursor-pointer mr-2"
              />
              Yêu thích
            </div>
          </el-button>
        </el-row>
      </el-col>
    </el-row>
    <h1 class="uppercase font-semibold text-2xl mt-10">
      Thông tin về quà tặng
    </h1>
    <p class="mt-5">{{ product.content }}</p>
  </el-main>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { wishlistMutations } from '~/store/wishlist/mutations'

export default {
  layout: 'clientDefault',
  async fetch() {
    console.log('123', this.$store.state.product)
    if (this.$store.state.product?.viewing === null) {
      const { data } = await this.$authApi.get(
        `/products/${this.product?.id || 1}`
      )
    }
    // nếu mà không có thì get theo id url
  },
  // data() {
  //   return {
  //     product: null,
  //   }
  // },
  computed: mapState({
    product: (state) => state.product.viewing,
  }),

  meta: {
    config: {
      auth: true,
      permission: ['ALL'],
    },
  },
  methods: {
    ...mapMutations({
      addWishList: wishlistMutations.ADD.DATA,
    }),
    onAddWishList() {
      this.$store.commit(wishlistMutations.ADD.DATA, this.product, {
        root: true,
      })
    },
  },
}
</script>
<style lang=""></style>
