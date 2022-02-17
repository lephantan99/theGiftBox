<template v-if="$fetchState.pending">
  <el-main>
    <el-row :gutter="20">
      <el-col :span="12"
        ><el-image :src="$e(product, 'mainImage')" fit="contain"> </el-image
      ></el-col>
      <el-col :span="12">
        <div>
          <p class="text-green">The Gift Box</p>
          <p class="font-bold text-xl">{{ $e(product, 'name') }}</p>
          <p>{{ $e(product, 'description') }}</p>
          <p class="line-through">
            {{ ($e(product, 'cost') * 1.2) | formatVnd }}
          </p>
          <p class="font-bold">{{ $e(product, 'cost') | formatVnd }}</p>
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
          <el-button
            type="success"
            plain
            class="w-5/12 h-16"
            @click="onAddCart"
          >
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
    <p class="mt-5">{{ $e(product, 'content') }}</p>
  </el-main>
</template>
<script>
import { Message } from 'element-ui'
import { mapState, mapActions, mapMutations } from 'vuex'
import { wishlistMutations } from '~/store/wishlist/mutations'
import { cartMutations } from '~/store/cart/mutations'
import { productMutations } from '~/store/product/mutations'

export default {
  layout: 'clientDefault',
  async fetch() {
    const { data } = await this.$clientApi.get(
      `/products/${this.$route.params.id}`
    )
    await this.setViewingProduct(data.data)
    // nếu mà không có thì get theo id url
    // this.$route.params.id
  },
  data() {
    return {
      productData: null,
    }
  },
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
      setViewingProduct: productMutations.SET.VIEWING,
    }),

    onAddWishList() {
      let currentWishList =
        JSON.parse(localStorage.getItem('wishList')) !== null
          ? JSON.parse(localStorage.getItem('wishList'))
          : []

      if (currentWishList !== null && currentWishList !== undefined) {
        // check exist
        const idWishList = currentWishList.map((e) => e.id)

        if (idWishList.includes(this.product.id)) {
          currentWishList = currentWishList.filter(
            (e) => e.id !== this.product.id
          )
          localStorage.setItem('wishList', JSON.stringify(currentWishList))
          this.$store.commit(wishlistMutations.REMOVE.DATA, this.product.id, {
            root: true,
          })
          Message.success('Sản phẩm này đã được xóa khỏi danh sách yêu thích')
        } else {
          currentWishList = [
            ...currentWishList,
            JSON.parse(JSON.stringify(this.product)),
          ]
          localStorage.setItem('wishList', JSON.stringify(currentWishList))
          this.$store.commit(wishlistMutations.ADD.DATA, this.product, {
            root: true,
          })
          Message.success('Sản phẩm này đã được thêm vào danh sách yêu thích')
        }
      } else {
        localStorage.setItem('wishList', JSON.stringify([this.product]))
        this.$store.commit(wishlistMutations.SET.DATA, this.product, {
          root: true,
        })
      }
    },
    onAddCart() {
      let currentCart =
        JSON.parse(localStorage.getItem('cart')) !== null
          ? JSON.parse(localStorage.getItem('cart'))
          : []

      if (currentCart !== null && currentCart !== undefined) {
        // check exist
        const idWishList = currentCart.map((e) => e.id)

        if (idWishList.includes(this.product.id)) {
          currentCart = currentCart.filter((e) => e.id !== this.product.id)
          localStorage.setItem('cart', JSON.stringify(currentCart))
          this.$store.commit(cartMutations.REMOVE.DATA, this.product.id, {
            root: true,
          })
          Message.success('Sản phẩm này đã được xóa khỏi giỏ hàng')
        } else {
          // this.product =
          Object.assign(this.product, { quantity: 1 })
          currentCart = [
            ...currentCart,
            JSON.parse(JSON.stringify(this.product)),
          ]
          localStorage.setItem('cart', JSON.stringify(currentCart))
          this.$store.commit(cartMutations.ADD.DATA, this.product, {
            root: true,
          })
          Message.success('Sản phẩm này đã được thêm vào giỏ hàng')
        }
      } else {
        Object.assign(this.product, { quantity: 1 })

        localStorage.setItem('cart', JSON.stringify([this.product]))
        this.$store.commit(cartMutations.SET.DATA, this.product, {
          root: true,
        })
      }
    },
  },
}
</script>
<style lang=""></style>
