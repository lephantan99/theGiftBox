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
        <fa
          :icon="['far', 'heart']"
          class="w-8 h-8 mr-5 text-xl cursor-pointer mb-3"
        />
        <i
          class="w-12 h-12 text-4xl el-icon-shopping-cart-full cursor-pointer"
        ></i>
        <p v-if="!auth" class="cursor-pointer" @click="$router.push('/login')">
          {{ $t('header.signInSignUp') }}
        </p>

        <p v-else>
          <el-dropdown class="flex">
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
            </el-dropdown-menu>
          </el-dropdown>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      input: '',
    }
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth?.data,
    }),
  },
}
</script>
<style lang="scss">
.logo_header {
  width: 200px;
}
</style>
