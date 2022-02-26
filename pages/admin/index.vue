<template>
  <el-main></el-main>
</template>
<script>
import auth from '~/middleware/auth'
export default {
  meta: {
    config: {
      auth: true,
      permission: ['ADMIN', 'OPERATOR'],
    },
  },

  middleware: [
    auth,
    ({ store, redirect }) => {
      if (
        store.state.auth?.data.role.name === 'ADMIN' ||
        store.state.auth?.data?.role.name === 'OPERATOR'
      ) {
        console.log('Chỉ cho admin và ope truy cập trang admin')

        // return redirect('/admin')
      } else {
        return redirect('/')
      }
    },
  ],
}
</script>
<style lang=""></style>
