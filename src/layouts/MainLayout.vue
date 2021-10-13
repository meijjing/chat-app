<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="justify-between">

        <q-btn
        v-if="$route.fullPath.includes('/chat')"
        @click="this.$router.go(-1)"
        icon="arrow_back"
        flat
        dense
        />
        {{ userDetails.name }}

        <q-toolbar-title class="absolute-center">
          <router-link to="/">{{ title }}</router-link>
        </q-toolbar-title>

        <q-btn
        v-if="!userDetails.userId"
        to="/auth"
        icon="account_circle"
        flat
        dense
        />

        <q-btn
        v-else
        @click="logoutUser"
        icon="logout"
        flat
        dense
        />

      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { mapState, mapActions } from 'vuex'


export default {
  name: 'MainLayout',
  components: {
  },
  data() {
    return {
    }
  },
  setup () {
    const title = ref('MeijjingChat')

    return {
      title,
    }
  },
  updated() {
    this.titleName();
  },
  computed: {
    ...mapState('stores', ['userDetails']),

  },
  methods: {
    ...mapActions('stores', ['logoutUser']),

    titleName() {
      const currentPath = this.$route.fullPath

      if (currentPath == '/') {
        this.title = 'MeijjingChat'
      } else if (currentPath === '/chat') {
        this.title = 'Chat'
      } else if (currentPath === '/auth') {
        this.title = 'Login'
      }
    }
  }
}
</script>
