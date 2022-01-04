<template>
  <el-main>
    <!-- carousel -->
    <div class="mt-12 flex justify-between uppercase font-bold text-xl">
      <div class="cursor-pointer">Quà tặng cho nam</div>
      <div class="cursor-pointer">Quà tặng cho nữ</div>
      <div class="cursor-pointer">Các dịp lễ</div>
      <div class="cursor-pointer">Ưu đãi</div>
    </div>
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
        class="mt-5"
      >
        <el-card>
          <el-image :src="item.mainImage" :fit="contain"> </el-image>
          {{ item.name }}
          <br />
          Price: {{ item.cost }} VND
        </el-card>
      </el-col>
    </el-row>
    <div class="my-10">
      <el-pagination layout="prev, pager, next" :total="25"> </el-pagination>
    </div>
  </el-main>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { config } from './config'
import { authActions } from '~/store/auth/actions'
import { productActions } from '~/store/product/actions'
import { ExampleComponent } from '~/components/uncommon/Home'
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
      console.log('hereee')
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
  }),
  methods: {
    ...mapActions({
      fetchProducts: productActions.FETCH.DATA,
    }),
    async logout() {
      await this.$store.dispatch(authActions.LOGOUT)
      this.$router.push('/')
    },
  },
  head() {
    return {
      title: this.$t('home.title'),
    }
  },
}
</script>
