<template>
  <router-view />
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions('stores', ['handleAuthStateChanged'])
  },
  mounted() {
    this.handleAuthStateChanged()
  }
}
</script>
