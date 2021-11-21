<template>
  <div>
    <el-container class="main">
      <Header />
      <!-- el-main -->
      <nuxt class="relative" />
      <Footer />
    </el-container>
  </div>
</template>
<script>
import { Header, Footer } from '~/components/common/Layout'

export default {
  name: 'Blank',
  components: {
    Header,
    Footer,
  },
}
</script>

<style lang="scss">
.main {
  display: flex !important;
  flex-direction: column !important;
  font-family: Montserrat, sans-serif;
  width: 1440px !important;
  margin: auto;
}
</style>
