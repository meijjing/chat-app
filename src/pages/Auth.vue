<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="signUp" label="Sing up" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <Login-SignUp :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="signUp">
          <Login-SignUp :tab="tab" />
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import LoginSignUp from 'components/LoginSignUp.vue'

export default {
  name: 'AuthPage',
  components: {
    'Login-SignUp': LoginSignUp
  },
  setup() {
    return {
      tab: ref('login')
    }
  }
}
</script>
