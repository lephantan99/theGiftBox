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
                    <el-button> Bỏ yêu thích </el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button> Thêm vào giỏ hàng </el-button>
                  </el-col>
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
}
</script>
<style lang=""></style>
