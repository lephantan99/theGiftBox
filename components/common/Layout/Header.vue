<template>
  <div>
    <div class="w-full flex justify-between items-end">
      <el-image
        :src="require('~/assets/img/logo.png')"
        class="logo_header cursor-pointer"
      />
      <div class="w-1/3">
        <el-input
          v-model="input"
          placeholder="Please input"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="w-1/5 flex justify-between items-center">
        <!-- <fa
          :icon="['far', 'heart']"
          class="w-8 h-8 mr-5 text-xl cursor-pointer mb-3"
        /> -->
        <el-badge
          :value="wishlist.length"
          class="item w-[32px] mr-5"
          @click.native="onShowWishList"
        >
          <fa
            :icon="['far', 'heart']"
            class="w-8 h-8 mr-5 text-xl cursor-pointer mb-3"
          />
        </el-badge>
        <el-badge
          :value="cart.length"
          class="item w-[32px] mr-5"
          @click.native="onShowCart"
        >
          <i
            class="w-12 h-12 text-4xl el-icon-shopping-cart-full cursor-pointer"
          ></i>
        </el-badge>

        <p v-if="!auth" class="cursor-pointer" @click="$router.push('/login')">
          {{ $t('header.signInSignUp') }}
        </p>

        <p v-else>
          <el-dropdown class="flex" @command="handleCommand">
            <div class="h-full flex items-center mr-5">
              <el-avatar
                size="medium"
                icon="el-icon-user-solid"
                class="bg-gray-300 mr-3"
              ></el-avatar>
              Admin user
              <!-- <span class="ml-3 font-bold">
            {{ $e(auth, 'fullName') }}
          </span> -->
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="logout"
                class="font-bold text-theme-1 hover:bg-theme-1-200"
              >
                {{ $t('navbar.logout') }}
              </el-dropdown-item>
              <el-dropdown-item
                command="showInfo"
                class="font-bold text-theme-1 hover:bg-theme-1-200"
              >
                {{ $t('navbar.info') }}
              </el-dropdown-item>
              <el-dropdown-item
                command="goToAdmin"
                class="font-bold text-theme-1 hover:bg-theme-1-200"
              >
                {{ $t('navbar.goToAdmin') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </p>
      </div>
    </div>
    <div class="mt-12 flex justify-between uppercase font-bold text-xl">
      <div class="cursor-pointer">Quà tặng gợi ý</div>
      <div class="cursor-pointer">Quà tặng cho nam</div>
      <div class="cursor-pointer">Quà tặng cho nữ</div>
      <div class="cursor-pointer">Các dịp lễ</div>
      <div class="cursor-pointer">Ưu đãi</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import confirmAction from '~/mixins/confirmActions'
import { authActions } from '~/store/auth/actions'

export default {
  name: 'Header',
  mixins: [confirmAction],
  data() {
    return {
      input: '',
    }
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth?.data,
      wishlist: (state) => state.wishlist.data,
      cart: (state) => state.cart.data,
    }),
  },
  methods: {
    onShowWishList() {
      this.$router.push('/client/wishlist')
    },
    onShowCart() {
      this.$router.push('/client/cart')
    },
    handleCommand(command) {
      if (command === 'goToAdmin') {
        this.$router.push('/admin')
      } else if (command === 'logout') {
        this.confirmAction(
          async () => {
            this.$root.$emit('force-allow-to-leave')
            await this.$store.dispatch(authActions.LOGOUT)
            this.$message.success(this.$t('success.logout'))
            this.$router.push(`/login`)
          },
          () => {},
          'Bạn có chắc chắn muốn đăng xuất không?',
          'Xác nhận đăng xuất khỏi hệ thống'
        )
      } else {
        this.$router.push('/client/info')
      }
    },
  },
}
</script>
<style lang="scss">
.logo_header {
  width: 200px;
}
</style>
