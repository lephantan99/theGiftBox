<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="8"> <el-card>Thông tin user</el-card> </el-col>
      <el-col :span="16">
        <el-card>
          <p class="font-semibold text-lg">Sản Phẩm Yêu Thích</p>
          <el-row :gutter="20">
            <el-col
              v-for="(item, index) in wishlist"
              :key="index"
              :span="12"
              class="mt-5 cursor-pointer"
            >
              <el-card>
                <el-image :src="item.mainImage" fit="contain"> </el-image>
                <el-tag type="warning">{{
                  item.product_categories[0].name
                }}</el-tag>
                <br />
                {{ item.name }}
                <br />
                <p class="line-through">{{ (item.cost * 1.2) | formatVnd }}</p>
                {{ item.cost | formatVnd }} <el-tag type="info">-16%</el-tag>
                <el-row class="mt-5">
                  <el-col :span="12">
                    <el-button @click="onAddWishList(item, index)">
                      Bỏ yêu thích
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
    </el-row>
  </el-main>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { Message } from 'element-ui'
import { wishlistMutations } from '~/store/wishlist/mutations'

export default {
  layout: 'clientDefault',
  meta: {
    config: {
      auth: true,
      permission: ['ALL'],
    },
  },
  computed: mapState({
    wishlist: (state) => state.wishlist.data,
  }),
  methods: {
    onAddWishList(item, index) {
      let currentWishList =
        JSON.parse(localStorage.getItem('wishList')) !== null
          ? JSON.parse(localStorage.getItem('wishList'))
          : []

      if (currentWishList !== null && currentWishList !== undefined) {
        // check exist
        const idWishList = currentWishList.map((e) => e.id)

        if (idWishList.includes(item.id)) {
          currentWishList = currentWishList.filter((e) => e.id !== item.id)
          localStorage.setItem('wishList', JSON.stringify(currentWishList))
          this.$store.commit(wishlistMutations.REMOVE.DATA, item.id, {
            root: true,
          })
          Message.success('Sản phẩm này đã được xóa khỏi danh sách yêu thích')
        } else {
          currentWishList = [
            ...currentWishList,
            JSON.parse(JSON.stringify(item)),
          ]
          localStorage.setItem('wishList', JSON.stringify(currentWishList))
          this.$store.commit(wishlistMutations.ADD.DATA, item, {
            root: true,
          })
          Message.success('Sản phẩm này đã được thêm vào danh sách yêu thích')
        }
      } else {
        localStorage.setItem('wishList', JSON.stringify([item]))
        this.$store.commit(wishlistMutations.SET.DATA, item, {
          root: true,
        })
      }
    },
  },
}
</script>
<style lang=""></style>
