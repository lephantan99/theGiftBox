<template>
  <div>
    <div class="w-full flex justify-between items-end">
      <el-image
        :src="require('~/assets/img/logo.png')"
        class="logo_header cursor-pointer"
      />
      <el-row class="w-1/2 flex" :gutter="20">
        <el-col :span="8">
          <el-input
            v-model="input"
            placeholder="Tìm kiếm sản phẩm"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="onSearch"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-select
            v-model="sort"
            placeholder="Sắp xếp theo thời gian chuẩn bị"
            class="w-full"
            @change="onSearch"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button @click="onReset">Bỏ lọc</el-button>
        </el-col>
      </el-row>
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
        <!-- <el-switch
          v-model="isEnData"
          inactive-text="English"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="onChangeLanguage"
        >
        </el-switch> -->

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
              {{ $e(auth, 'firstName') }} {{ $e(auth, 'lastName') }}
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
                v-if="
                  auth.role.name === 'ADMIN' || auth.role.name === 'OPERATOR'
                "
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
      <div class="cursor-pointer" @click="$router.push('/')">
        Quà tặng gợi ý
      </div>
      <div class="cursor-pointer" @click="$router.push('/')">
        Quà tặng cho nam
      </div>
      <div class="cursor-pointer" @click="$router.push('/')">
        Quà tặng cho nữ
      </div>
      <div class="cursor-pointer" @click="$router.push('/')">Các dịp lễ</div>
      <div class="cursor-pointer" @click="$router.push('/client/post')">
        Bài viết
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import confirmAction from '~/mixins/confirmActions'
import { authActions } from '~/store/auth/actions'
import { productActions } from '~/store/product/actions'
import { productMutations } from '~/store/product/mutations'
import { rootMutations } from '~/store/mutations'

export default {
  name: 'Header',
  mixins: [confirmAction],
  data() {
    return {
      input: '',
      sort: '',
      isEnData: null,
      options: [
        { value: 'ASC', label: 'Tăng dần' },
        { value: 'DESC', label: 'Giảm dần' },
      ],
    }
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth?.data,
      wishlist: (state) => state.wishlist.data,
      cart: (state) => state.cart.data,
      isEn: (state) => (state.locale === 'en' ? true : false),
    }),
  },
  created() {
    this.isEnData = this.$store.state.locale === 'en' ? true : false
  },
  methods: {
    ...mapActions({
      fetchProduct: productActions.FETCH.DATA,
    }),
    ...mapMutations({
      setQuery: productMutations.SET.QUERY,
      clearQuery: productMutations.CLEAR.QUERY,
      setLang: rootMutations.SET.LANG,
    }),
    async onSearch() {
      await this.$router.push('/')
      if (this.sort !== '' && this.input !== '') {
        await this.setQuery({
          filter: `name||$contL||${this.input}`,
          sort: `preparationTime,${this.sort}`,
        })
        await this.fetchProduct()
      } else if (this.input !== '') {
        await this.setQuery({
          filter: `name||$contL||${this.input}`,
        })
        await this.fetchProduct()
      } else if (this.sort !== '') {
        await this.setQuery({
          sort: `preparationTime,${this.sort}`,
        })
        await this.fetchProduct()
      } else {
        this.clearQuery()
        await this.fetchProduct()
      }
    },
    onReset() {
      this.input = ''
      this.sort = ''
      this.clearQuery()
      this.fetchProduct()
    },
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
    async onChangeLanguage() {
      if (this.isEnData === true) {
        // set en
        // this.setLang('en')
        this.$changeLocale('en')
      } else {
        // set vi
        // this.setLang('vi')
        this.$changeLocale('vi')
      }
    },
  },
}
</script>
<style lang="scss">
.logo_header {
  width: 200px;
}
.el-switch__label.is-active {
  color: initial;
}
</style>
