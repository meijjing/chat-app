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

        <q-toolbar-title class="absolute-center" :key="$route.fullPath">
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
import { mapState } from 'vuex'


import { ref, onMounted } from 'vue'


export default {
  name: 'MainLayout',
  components: {
  },
  data() {
    return {
      // currentPath: this.$route.fullPath
    }
  },
  setup () {
    const title = ref('MeijjingChat')

    onMounted(() => {
      // console.log(this.$route.fullPath)


      // if (currentPath == '/') {
      //   title.value = 'MeijjingChat'
      // } else if (currentPath == '/chat') {
      //   title.value = 'Chat'
      // } else if (currentPath == '/auth') {
      //   title.value = 'Login'
      // }

    })

    

    // if (this.currentPath == '/') {
    //   title.value = 'MeijjingChat'
    // } else if (this.currentPath == '/chat') {
    //   title.value = 'Chat'
    // } else if (this.currentPath == '/auth') {
    //   title.value = 'Login'
    // }

    

    return {
      title,
    }
  },
  created() {

  },
  // computed: {
  //   ...mapState(),

  //   title() {
  //     let currentPath = this.$route.fullPath

  //     if (currentPath == '/') return 'MeijjingChat'
  //     else if (currentPath == '/chat') return 'Chat'
  //     else if (currentPath == '/auth') return 'Login'
  //   }

  // },
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
