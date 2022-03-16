<template>
  <nav class="navbar bg-gray-100 flex justify-end">
    <!-- <div class="flex items-center">
      <span class="font-bold text-theme-1 m-3"> Left content</span>
    </div> -->
    <div class="flex items-center">
      <el-switch
        v-model="isEnData"
        inactive-text="English"
        active-color="#13ce66"
        inactive-color="#ff4949"
        class="mr-10"
        @change="onChangeLanguage"
      >
      </el-switch>
      <el-dropdown class="flex" @command="handleCommand">
        <div class="h-full flex items-center mr-5">
          <el-avatar
            size="medium"
            icon="el-icon-user-solid"
            class="bg-gray-300 mr-3"
          ></el-avatar>
          Admin
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
            command="goToClient"
            class="font-bold text-theme-1 hover:bg-theme-1-200"
          >
            {{ $t('navbar.goToClient') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import confirmAction from '~/mixins/confirmActions'
import { authActions } from '~/store/auth/actions'
export default {
  name: 'Navbar',
  mixins: [confirmAction],
  data() {
    return {
      isEnData: null,
    }
  },

  computed: {
    ...mapState({
      locale: (state) => state.locale,
    }),
  },
  created() {
    this.isEnData = this.$store.state.locale === 'en' ? true : false
  },
  methods: {
    handleCommand(command) {
      console.log('command', command)
      if (command === 'goToClient') {
        this.$router.push(`/`)
      } else {
        console.log('log out')
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
<style lang="scss" scoped>
.navbar {
  height: 50px;
}
/deep/.el-switch__label.is-active {
  color: initial !important;
}
</style>
