<template>
  <section class="flex flex-col items-center h-screen md:flex-row">
    <div class="hidden w-full h-screen bg-white lg:block md:w-1/3 lg:w-2/3">
      <img
        src="https://dummyimage.com/1000x800/F3F4F7/64748b"
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
          Hãy đăng nhập để sử dụng S-Group Management System
        </p>
        <!-- <form class="mt-6" action="#" method="POST">
          <div>
            <label
              class="block text-sm font-medium leading-relaxed tracking-tighter text-gray-700"
              >Email
            </label>
            <input
              id=""
              type="email"
              name=""
              placeholder="Your Email "
              class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
              autofocus
              autocomplete
              required
            />
          </div>
          <div class="mt-4">
            <label
              class="block text-sm font-medium leading-relaxed tracking-tighter text-gray-700"
              >Password</label
            >
            <input
              id=""
              type="password"
              name=""
              placeholder="Your Password"
              minlength="6"
              class="w-full px-4 py-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
              required
            />
          </div>
          <div class="mt-2 text-right">
            <a
              href="#"
              class="text-sm font-semibold leading-relaxed text-gray-700 hover:text-black focus:text-blue-700"
              >Forgot Password?</a
            >
          </div>
          <button
            type="submit"
            class="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
          >
            Log In
          </button>
        </form> -->
        <FormWrapper :model="form" class="mt-6" @onSubmit="handleSubmitForm">
          <InputWrapper prop="email" rules="required|email" label="Email">
            <el-input v-model="form.email" placeholder="mail_cua_ban@gmail.com">
            </el-input>
          </InputWrapper>
          <InputWrapper prop="password" rules="required" label="Password">
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
