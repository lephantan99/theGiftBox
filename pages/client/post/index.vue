<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <el-card>
          <p class="text-center font-bold text-xl">Bài đăng nổi bật</p>
        </el-card>
        <el-card v-for="post in posts" :key="post.id" :gutter="20" class="mt-5">
          <el-col :span="12">
            <el-image
              style="width: 400px; height: 400px"
              :src="post.thumbnail"
              fit="fill"
            ></el-image>
          </el-col>
          <el-col :span="12">
            <el-row class="font-bold text-xl">{{ post.enTitle }}</el-row>
            <el-row class="mt-5">{{ post.enContent }}</el-row>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { postActions } from '~/store/post/actions'
export default {
  layout: 'clientDefault',
  meta: {
    config: {
      auth: true,
      permission: ['ALL'],
    },
  },
  async fetch() {
    this.$loading()
    const { data } = await this.fetchPost()
    console.log(data)
    this.posts = data
    console.log(this.posts)

    this.$loading().close()
  },
  data() {
    return {
      posts: [],
    }
  },
  computed: mapState({
    wishlist: (state) => state.wishlist.data,
  }),
  methods: {
    ...mapActions({
      fetchPost: postActions.FETCH.DATA,
    }),
  },
}
</script>
<style lang=""></style>
