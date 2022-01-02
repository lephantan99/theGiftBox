<template>
  <nav class="navbar bg-gray-100 flex justify-end">
    <!-- <div class="flex items-center">
      <span class="font-bold text-theme-1 m-3"> Left content</span>
    </div> -->
    <div class="flex items-center">
      <el-dropdown class="flex">
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
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  computed: {
    ...mapState({
      locale: (state) => state.locale,
    }),
  },
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
}
</style>
