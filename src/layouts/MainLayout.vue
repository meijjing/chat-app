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

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
        to="/auth"
        icon="account_circle"
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


// import { ref } from 'vue'

export default {
  name: 'MainLayout',
  components: {
  },
  data() {
    return {
      title: '',
      currentPath: this.$route.fullPath
    }
  },
  created() {
    console.log(this.currentPath)
  },
  setup () {
    // const title = ref('');
    // const currentPath = ref(this.$route.fullPath);

    return {
      // title,
      // currentPath,
    }
  },
  watch: {
    currentPath() {
      console.log(this.currentPath, '현재페이지')
      // const currentPath = this.$route.fullPath

      if (this.currentPath == '/') {
        this.title = 'MeijjingChat'
      } else if (this.currentPath === '/chat') {
        this.title = 'Chat'
      } else if (this.currentPath === '/auth') {
        this.title = 'Login'
      }

    }

  },
  // created() {
  //     if (currentPath == '/') return 'MeijjingChat'
  //     else if (currentPath == '/chat') return 'Chat'
  //     else if (currentPath == '/auth') return 'Login'
  // },
  // created () {
  //   const currentPath = this.$route.fullPath

  //   if (currentPath == '/') {
  //     this.title = 'MeijjingChat'
  //   } else if (currentPath === '/chat') {
  //     this.title = 'Chat'
  //   } else if (currentPath === '/auth') {
  //     this.title = 'Login'
  //   }
  // }
}
</script>
