<template>
  <div>
    <el-container class="main relative min-h-[980px]">
      <Header />
      <!-- el-main -->
      <nuxt class="relative" />
      <Footer class="absolute bottom-0 left-0 h-72 mb-[-300px]" />
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
  max-width: 1440px !important;
  margin: auto;
}
</style>
