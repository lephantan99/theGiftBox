<template>
  <el-main></el-main>
</template>
<script>
export default {
  meta: {
    config: {
      auth: true,
      permission: ['ALL'],
    },
  },
  middleware: [
    ({ store, redirect }) => {
      if (
        store.state.auth?.data.role.name === 'ADMIN' ||
        store.state.auth?.data?.role.name === 'OPERATOR'
      ) {
        console.log('Chỉ cho admin và ope truy cập trang admin')

        // return this.$router.push('/admin')
      } else {
        console.log('heree3')

        // return redirect('')
      }
    },
  ],
}
</script>
<style lang=""></style>
