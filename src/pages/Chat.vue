<template>
  <q-page
  id="pageChat"
  ref="pageChat"
  class="page-chat flex column">

    <q-banner
    v-if="!otherUserDetails.online"
    class="bg-grey-4 text-center fixed-top">
      {{ otherUserDetails.name }} is offline.
    </q-banner>

    <div
    :class="{ 'invisible' : !showMessages }"
    class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from == 'me' ? '' : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
        :bg-color="message.from == 'me' ? 'indigo-11' : 'white'"
      />
    </div>


    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width">
          <q-input
          v-model="newMessage"
          ref="newMessage"
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
import { mapState, mapActions } from 'vuex'
import { ref } from 'vue'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'

export default {
  name: 'ChatPage',
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      newMessage: '',
      showMessages: false
    }
  },
  computed: {
    ...mapState('stores', ['messages', 'userDetails']),
    otherUserDetails() {
      console.log('otherUserDetails: ', this.$store.state.stores.users[this.$route.params.otherUserId])
      return this.$store.state.stores.users[this.$route.params.otherUserId]
    }
  },
  watch: {
    // messages() {
    //   // 화면에 추가된 후 동작하도록
    //   this.$nextTick(() => {
    //     console.log('page scroll!!')
    //     let pageChat = this.$refs.pageChat;
    //     console.log(pageChat.scrollHeight)
    //     pageChat.scrollTo({ top: pageChat.scrollHeight, behavior: 'smooth' });
    //   });
    // },

  },
  // created () {
  //   this.scrollToBottom()
  // },
  mounted() {
    this.firebaseGetMessage(this.$route.params.otherUserId)
    this.scrollToBottom()
  },
  unmounted() {
    this.firebaseStopGettingMessages()
  },
  methods: {
    ...mapActions('stores', ['firebaseGetMessage', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
    sendMessage() {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: 'me'
        },
        otherUserId: this.$route.params.otherUserId
      })
      this.clearMessage()
    },
    clearMessage() {
      this.newMessage = ''
      this.$refs.newMessage.focus()
    },
    scrollToBottom() {
      const el = this.$refs.pageChat.$el;
      setTimeout(() => {
        window.scrollTo(0, el.scrollHeight)
        this.showMessages = true
      }, 100)
    }
  },

}
</script>
<style scoped lang="scss">

.page-chat {
  background: #e7e5f3;
  &:before {
    content: '';
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    opacity: .1;
    background: 
    linear-gradient(135deg, #5d5a74 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px),
    linear-gradient(225deg, #5d5a74 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px)0 64px;
    background-color:#5d5a74;
    background-size: 64px 128px;
  }
}
.q-banner {
  top: 50px;
  z-index: 2;
  background-color: #acacb6!important;
  opacity: .8;
  color: #000;
  box-shadow: 0 2px 8px 2px rgba(0,0,0,0.3);
}

.q-message {
  z-index: 1;

  .q-message-name {
    margin-bottom: 3px!important;
  }

  .q-message-text {
    padding: 10px 20px!important;
    display: flex!important;;
    align-items: center!important;;
  }
}





</style>
