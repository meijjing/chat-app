import { firebaseAuth, firebaseDb } from "boot/firebase";

const state = {
  userDetails: {},
};

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload;
  },
};

const actions = {
  // 가입
  signUpUser({}, payload) {
    console.log("payload: ", payload);

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

  handleAuthStateChanged({ commit, dispatch, state }) {
    console.log("handleAuthStateChanged");
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // login
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).once("value", (snapshot) => {
          // console.log(snapshot)
          let userDetails = snapshot.val();
          // console.log('userDetails', userDetails)

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
        console.log(userDetails);

        this.$router.push("/");
      } else {
        // logout
        commit("setUserDetails", {});

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
    console.log(payload);
    firebaseDb.ref("users/" + payload.userId).update(payload.onOff);
  },

  // logout user
  logoutUser() {
    firebaseAuth.signOut();
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
