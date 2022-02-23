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
          Tạo Tài Khoản
        </h1>
        <p class="italic text-gray-400">
          Tạo tài khoản để bắt đầu sử dụng The Gift Box
        </p>
        <FormWrapper :model="form" class="mt-1" @onSubmit="postRegister">
          <InputWrapper prop="lastName" rules="required" label="LastName">
            <el-input v-model="form.lastName" placeholder="Họ"> </el-input>
          </InputWrapper>
          <InputWrapper prop="firstName" rules="required" label="FirstName">
            <el-input v-model="form.firstName" placeholder="Tên"> </el-input>
          </InputWrapper>
          <InputWrapper prop="email" rules="required|email" label="Email">
            <el-input v-model="form.email" placeholder="email@gmail.com">
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
          <InputWrapper prop="gender" rules="required" label="Gender">
            <br />
            <el-radio-group v-model="form.gender">
              <el-radio label="MALE">Nam</el-radio>
              <el-radio label="FEMALE">Nữ</el-radio>
            </el-radio-group>
          </InputWrapper>
          <InputWrapper prop="birthday" rules="required" label="Birthday">
            <br />

            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="Pick a day"
            >
            </el-date-picker>
          </InputWrapper>
          <InputWrapper prop="phoneNumber" rules="required" label="PhoneNumber">
            <br />
            <el-input
              v-model="form.phoneNumber"
              placeholder="Số điện thoại của bạn"
            >
            </el-input>
          </InputWrapper>

          <el-button
            type="primary"
            native-type="submit"
            class="w-full font-bold text-white"
            >Đăng ký</el-button
          >
          <el-row class="mt-5">
            Bạn đã có tài khoản?
            <a
              class="cursor-pointer underline underline-offset-8"
              @click="$router.push('/login')"
              >Đăng nhập</a
            >
          </el-row>
        </FormWrapper>
      </div>
    </div>
  </section>
</template>

<script>
import { userActions } from '~/store/user/actions'
import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'
export default {
  layout: 'blank',
  meta: {
    config: {
      authNotRequired: true,
    },
  },
  // middleware: 'auth',
  components: {
    FormWrapper,
    InputWrapper,
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: null,
        birthday: null,
        phoneNumber: '',
      },
    }
  },
  methods: {
    async postRegister() {
      console.log('data', this.form)
      const payload = {
        ...this.form,
        status: 'ACTIVE',
        role: {
          id: 4,
        },
      }
      await this.$store.dispatch(userActions.SUBMIT.SINGLE, payload)
      this.$router.push('/')
      // this.$refs.loginForm.reset()
    },
  },
}
</script>
