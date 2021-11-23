<template>
  <el-main>
    <!-- carousel -->
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in carouselData" :key="item.id">
        <el-image :src="item.image" :fit="contain"> </el-image>
      </el-carousel-item>
    </el-carousel>
    <!-- main content -->
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in itemData"
        :key="index"
        :span="8"
        class="mt-5"
      >
        <el-card>
          {{ item.name }}
          <el-image :src="item.image" :fit="contain"> </el-image>
          {{ item.price }} VND
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import { mapState } from 'vuex'
import { config } from './config'
import { authActions } from '~/store/auth/actions'
import { ExampleComponent } from '~/components/uncommon/Home'
export default {
  layout: 'clientDefault',
  name: 'Home',
  // meta: {
  //   config,
  // },
  // middleware: ['auth'],
  components: {},
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
      itemData: [
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
        {
          name: 'Quà tặng sinh nhật',
          image:
            'https://images.pexels.com/photos/5708969/pexels-photo-5708969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          price: 500000,
        },
      ],
    }
  },
  computed: mapState({
    locale: (state) => state.locale,
  }),
  methods: {
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
