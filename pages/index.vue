<template>
  <el-main>
    <!-- carousel -->
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in carouselData" :key="item.id">
        <el-image :src="item.image" fit="contain"> </el-image>
      </el-carousel-item>
    </el-carousel>
    <!-- main content -->
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in products"
        :key="index"
        :span="8"
        class="mt-5 cursor-pointer"
        @click.native="gotoDetailProduct(item, index)"
      >
        <el-card class="h-[28rem]">
          <el-image :src="item.mainImage" class="w-full h-[280px]" fit="fill">
          </el-image>
          <el-tag type="warning">{{ item.product_categories[0].name }}</el-tag>
          <br />
          {{ item.name }}
          <br />
          <p class="line-through">
            {{ item.cost | formatVnd }}
            <!-- {{ (item.cost * (1 + item.sale / 100)) | formatVnd }} -->
          </p>
          <!-- {{ item.cost | formatVnd }} -->
          {{ (item.cost * (1 - item.sale / 100)) | formatVnd }}
          <el-tag type="info">-{{ item.sale }}%</el-tag>
          <br />
          <p class="text-xs">
            Thời gian chuẩn bị: {{ item.preparationTime }} h
          </p>
        </el-card>
      </el-col>
    </el-row>
    <div class="my-10 flex justify-end">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </el-main>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { config } from './config'
import { authActions } from '~/store/auth/actions'
import { productActions } from '~/store/product/actions'
import { productMutations } from '~/store/product/mutations'
export default {
  layout: 'clientDefault',
  name: 'Home',
  // meta: {
  //   config,
  // },
  // middleware: ['auth'],
  components: {},
  async fetch() {
    try {
      this.$loading()
      await this.fetchProducts()
      this.$loading().close()
    } catch (error) {
      this.$loading().close()
    }
  },
  data() {
    return {
      file: null,
      carouselData: [
        {
          id: 1,
          image:
            'https://images.pexels.com/photos/5414059/pexels-photo-5414059.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        },
        {
          id: 2,
          image:
            'https://images.pexels.com/photos/5414059/pexels-photo-5414059.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        },
        {
          id: 3,
          image:
            'https://images.pexels.com/photos/5414059/pexels-photo-5414059.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        },
        {
          id: 4,
          image:
            'https://images.pexels.com/photos/5414059/pexels-photo-5414059.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        },
        {
          id: 5,
          image:
            'https://images.pexels.com/photos/5414059/pexels-photo-5414059.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        },
      ],
      itemData: [],
    }
  },
  computed: mapState({
    locale: (state) => state.locale,
    products: (state) => state.product.data,
    total: (state) => state.product.total,
  }),
  methods: {
    ...mapActions({
      fetchProducts: productActions.FETCH.DATA,
    }),
    ...mapMutations({
      setViewingProduct: productMutations.SET.VIEWING,
    }),
    async logout() {
      await this.$store.dispatch(authActions.LOGOUT)
      this.$router.push('/')
    },
    gotoDetailProduct(item, index) {
      this.setViewingProduct(item)
      this.$router.push(`/${item.id}`)
    },
    async handleCurrentChange(val) {
      this.$loading()
      this.$store.commit(productMutations.SET.QUERY, {
        count: 10,
        page: val,
      })
      await this.$store.dispatch(productActions.FETCH.DATA)
      this.$loading().close()
    },
  },
  head() {
    return {
      title: this.$t('home.title'),
    }
  },
}
</script>
