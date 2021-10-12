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
  setup() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {
    submitForm() {
      if (this.tab == 'login') {
        console.log('login the user')
      } else {
        console.log('signup the user')
      }
    }
  }
}
</script>
