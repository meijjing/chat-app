import { firebaseAuth, firebaseDb } from "boot/firebase";

let messagesRef

const state = {
  userDetails: {},
  users: {}, 
  messages: {},
};

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload;
  },
  addUser(state, payload) {
    console.log(payload);
    state.users[payload.userId] = payload.userDetails;
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails)
  },
  addMessage(state, payload) {
    state.messages[payload.messageId] = payload.messageDetails
    // console.log(state.messages)
  },
  clearMessages(state) {
    state.messages = {}
  }
};

const actions = {
  // 가입
  signUpUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log(response);

        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).set({
          email: payload.email,
          name: payload.name,
          online: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // 로그인
  loginUser({}, payload) {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // logout user
  logoutUser() {
    firebaseAuth.signOut();
  },

  handleAuthStateChanged({ commit, dispatch, state }) {
    console.log("handleAuthStateChanged");
    firebaseAuth.onAuthStateChanged((user) => {

      
      if (user) {
        console.log('user on')
        // login
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).once("value", (snapshot) => {
          let userDetails = snapshot.val();

          commit("setUserDetails", {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId,
          });
        });

        dispatch("firebaseUpdateUser", {
          userId: userId,
          onOff: {
            online: true,
          },
        });
        dispatch("firebaseGetUsers")

        this.$router.push("/");
      
      
      
      } else {

        console.log("user off")
        // logout
        // commit("setUserDetails", {});

        dispatch("firebaseUpdateUser", {
          userId: state.userDetails.userId,
          onOff: {
            online: false,
          },
        });
        this.$router.replace("/auth");
      }
    });
  },

  firebaseUpdateUser({}, payload) {
    firebaseDb.ref("users/" + payload.userId).update(payload.onOff);
  },

  firebaseGetUsers({ commit }) {
    firebaseDb.ref('users').on('child_added', snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('addUser', {
        userId,
        userDetails,
      })
    })

    firebaseDb.ref('users').on('child_changed', snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('updateUser', {
        userId,
        userDetails,
      })
    })
  },

  firebaseGetMessage({ commit, state }, otherUserId) {
    let userId = state.userDetails.userId
    messagesRef = firebaseDb.ref('/chats/' + userId + '/' + otherUserId)
    messagesRef.on('child_added', snapshot => {
      let messageDetails = snapshot.val()
      let messageId = snapshot.key

      commit('addMessage', {
        messageId,
        messageDetails
      })
    })
  },

  firebaseStopGettingMessages({ commit }) {
    if (messagesRef) {
      messagesRef.off('child_added')
      commit('clearMessages')
    }
  },

  firebaseSendMessage({ state }, payload) {
    firebaseDb.ref('chats/' + state.userDetails.userId + '/' + payload.otherUserId).push(payload.message)

    payload.message.from = 'them'
    firebaseDb.ref('chats/' + payload.otherUserId + '/' + state.userDetails.userId).push(payload.message)
  }


};

const getters = {
  users: state => {
    let usersFiltered = {}
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        usersFiltered[key] = state.users[key];
      }
    })

    return usersFiltered;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
