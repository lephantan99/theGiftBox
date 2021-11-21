<template>
  <el-main> Content</el-main>
</template>
<script>
import { mapState } from 'vuex'
import { config } from './config'
import { authActions } from '~/store/auth/actions'
import { ExampleComponent } from '~/components/uncommon/Home'
export default {
  layout: 'clientDefault',
  name: 'Home',
  // meta: {
  //   config,
  // },
  // middleware: ['auth'],
  components: {},
  data() {
    return {
      file: null,
    }
  },
  computed: mapState({
    locale: (state) => state.locale,
  }),
  methods: {
    async logout() {
      await this.$store.dispatch(authActions.LOGOUT)
      this.$router.push('/')
    },
  },
  head() {
    return {
      title: this.$t('home.title'),
    }
  },
}
</script>
