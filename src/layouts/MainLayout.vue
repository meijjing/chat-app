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
        <q-btn
        v-if="$route.fullPath == '/'"
        icon="info"
        flat
        dense
        />
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <!-- <q-btn
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
        /> -->

        <q-btn
        v-if="userDetails.userId"
        @click="logoutUser(userDetails)"
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
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'


export default {
  name: 'MainLayout',
  mixins: [mixinOtherUserDetails],
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
      } else if (currentPath.includes('/chat')) {
        this.title = this.otherUserDetails.name
      } else if (currentPath === '/auth') {
        this.title = 'Login'
      }
    },
  }
}
</script>
<style scoped lang="scss">
</style>
