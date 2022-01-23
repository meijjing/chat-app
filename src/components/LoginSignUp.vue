<template>
  <div>
    <q-form @submit="submitForm">
      <q-input
      v-if="tab == 'signUp'"
      outlined
      v-model="formData.name"
      label="Name"
      class="q-mb-sm" />

      <q-input
      outlined
      v-model="formData.email"
      type="email"
      label="Email"
      class="q-mb-sm" />

      <q-input
      outlined
      v-model="formData.password"
      type="password"
      label="Password"
      class="q-mb-sm" />

      <div class="row">
        <q-space />
        <q-btn
        type="submit"
        color="primary"
        :label="tab == 'login' ? 'Login' : 'Sign Up'"
        style="width: 100px" />
      </div>
    </q-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: '',
  components: {},
  props: ['tab'],
  data() {
  return {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions('stores', ['signUpUser', 'loginUser']),

    submitForm() {
      // 로그인
      if (this.tab == 'login') {
        console.log('login the user')
        this.loginUser(this.formData)
      } else {
        // 가입
        console.log('signup the user')
        this.signUpUser(this.formData)
      }
    }
  }
}
</script>
