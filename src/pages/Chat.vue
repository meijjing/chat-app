<template>
  <q-page class="flex column">

    <q-banner class="bg-grey-4 text-center">
      User is offline.
    </q-banner>

    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, i) in messages"
        :key="i"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
        :bg-color="message.from == 'me' ? 'grey-4' : 'blue-4'"
      />
    </div>


    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width">
          <q-input
          v-model="newMessage"
          bg-color="white"
          outlined
          rounded
          label="Message"
          dense
          @keyup.enter="sendMessage"
          >
            <template v-slot:after>
              <q-btn round dense flat icon="send" color="white" @click="sendMessage" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
// import { ref } from 'vue'

export default {
  name: 'ChatPage',
  data() {
    return {
      newMessage: '',
      messages: [
        {
          text: 'Hey, How r u',
          from: 'me'
        },
        {
          text: 'Good thanks, How r u?',
          from: 'Ryan'
        },
        {
          text: 'Pretty good!',
          from: 'me'
        }
      ],
    }
  },
  // setup() {
  //   const newMessage = ref('')
  //   const messages = [
  //     {
  //       text: 'Hey, How r u',
  //       from: 'me'
  //     },
  //     {
  //       text: 'Good thanks, How r u?',
  //       from: 'Ryan'
  //     },
  //     {
  //       text: 'Pretty good!',
  //       from: 'me'
  //     }
  //   ]
  //   return {
  //     newMessage,
  //     messages,

  //     sendMessage() {
  //       console.log('send Message!!')
  //       messages.push({
  //         text: this.newMessage,
  //         from: 'me'
  //       })
  //     }
  //   }
  // },
  methods: {
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: 'me'
      })
    }
  }
}
</script>
