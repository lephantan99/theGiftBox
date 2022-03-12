<template>
  <section class="flex flex-col items-center h-screen md:flex-row">
    <div class="hidden w-full h-screen bg-white lg:block md:w-1/3 lg:w-2/3">
      <img
        src="https://images.pexels.com/photos/6690691/pexels-photo-6690691.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        alt=""
        class="object-cover w-full h-full"
      />
    </div>
    <div
      class="flex items-center justify-center w-full h-screen px-6 bg-white md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12"
    >
      <div class="w-full h-100">
        <h1
          class="mt-12 text-2xl font-semibold text-black tracking-ringtighter sm:text-3xl title-font"
        >
          Đăng Nhập Tài Khoản
        </h1>
        <p class="italic text-gray-400">
          Hãy đăng nhập để tiếp tục trải nghiệm The Gift Box
        </p>
        <FormWrapper :model="form" class="mt-6" @onSubmit="postLogin">
          <InputWrapper prop="email" rules="required|email" label="Email">
            <el-input v-model="form.email" placeholder="mail_cua_ban@gmail.com">
            </el-input>
          </InputWrapper>
          <InputWrapper prop="password" rules="required" label="Mật khẩu">
            <el-input
              v-model="form.password"
              placeholder="Hãy nhập mật khẩu"
              type="password"
              show-password
            >
            </el-input>
          </InputWrapper>
          <el-button
            type="primary"
            native-type="submit"
            class="w-full font-bold text-white"
            >Đăng Nhập</el-button
          >
          <el-row class="mt-5"
            >Bạn chưa có tài khoản?
            <a
              class="cursor-pointer underline underline-offset-8"
              @click="$router.push('/register')"
              >Đăng ký</a
            ></el-row
          >
        </FormWrapper>
      </div>
    </div>
  </section>
</template>

<script>
import { authActions } from '~/store/auth/actions'
import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'
export default {
  layout: 'blank',
  meta: {
    config: {
      authNotRequired: true,
    },
  },
  middleware: 'auth',
  components: {
    FormWrapper,
    InputWrapper,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async postLogin() {
      await this.$store.dispatch(authActions.LOGIN, this.form)
      this.$router.push('/')
      this.$refs.loginForm.reset()
    },
  },
}
</script>
