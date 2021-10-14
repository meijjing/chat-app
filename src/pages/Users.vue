<template>
  <q-page class="flex q-pa-md">
    <q-list
    class="full-width"
    separator>

      <q-item
      v-for="(user, key) in users"
      :key="key"
      :to="'/chat/' + key"
      class="q-py-md"
      clickable
      v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge
          :color="user.online ? 'blue-6' : 'grey-6'">
            {{ user.online ? 'Online' : 'Offline' }}
          </q-badge>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UsersPage',
  computed: {
    ...mapGetters('stores', ['users'])
  },
  // created() {
  //   console.log('여기유저', this.users)
  // }
}
</script>
