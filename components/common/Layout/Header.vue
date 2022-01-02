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
      <div class="w-1/6 flex justify-between items-center">
        <p v-if="!auth" class="cursor-pointer" @click="$router.push('/login')">
          {{ $t('header.signInSignUp') }}
        </p>
        <i
          class="w-12 h-12 text-4xl el-icon-shopping-cart-full cursor-pointer"
        ></i>
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
