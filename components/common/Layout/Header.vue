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
      <div class="w-1/6 flex justify-between">
        <p>{{ $t('header.signInSignUp') }}</p>
        <i class="w-12 h-12 text-4xl el-icon-shopping-cart-full"></i>
      </div>
    </div>
    <div class="mt-12 flex justify-between uppercase font-bold text-xl">
      <div>Quà tặng cho Nữ</div>
      <div>Quà tặng cho Nam</div>
      <div>Ưu đãi</div>
      <div>Quà tặng dịp lễ</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      input: '',
    }
  },
}
</script>
<style lang="scss">
.logo_header {
  width: 200px;
}
</style>
