import notify from "devextreme/ui/notify";
import _ from "lodash";

const state = {
  currentUser: null,
  signInLoading: false,
  users: [
    {
      userID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
      userCode: "1",
      userName: "drusmir",
      fullName: "Dal Rusmir",
      email: "drusmir@tpg.com",
      active: true,
      expiryDate: "2020-06-30",
      password: "123456",
      mustChangePassword: false
    },
    {
      userID: "f274ab28-59af-45af-86f5-97a149104476",
      userCode: "2",
      userName: "jsmith",
      fullName: "John Smith",
      email: "jsmith@tpg.com",
      active: true,
      expiryDate: "",
      password: "123456",
      mustChangePassword: false
    },
    {
      userID: "2652c185-09ab-4b8a-8518-7f184a4f2baf",
      userCode: "3",
      userName: "jpike",
      fullName: "Jane Pike",
      email: "jpike@tpg.com",
      active: true,
      expiryDate: "",
      password: "123456",
      mustChangePassword: false
    }
  ],
  firebaseUsers: []
};

const getters = {
  currentUser: (state) => state.currentUser,

  signInLoading: (state) => state.signInLoading,

  getUsers: (state) => state.users,

  getUserByID: (state) => (id) => {
    return state.users.find((user) => user.userID === id);
  },

  userExistsByUserCode: (state) => (userCode) => {
    if (
      state.users.find(
        (user) => user.userCode.toUpperCase() === userCode.toUpperCase()
      )
    ) {
      return true;
    } else {
      return false;
    }
  },

  userExistsByUserName: (state) => (id, userName) => {
    if (
      state.users.find(
        (user) =>
          user.userName.toUpperCase() === userName.toUpperCase() &&
          user.userID !== id
      )
    ) {
      return true;
    } else {
      return false;
    }
  },

  userExistsByEmail: (state) => (id, email) => {
    if (
      state.users.find(
        (user) =>
          user.email.toUpperCase() === email.toUpperCase() && user.userID !== id
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
};

const mutations = {
  userStatus: (state, user) => {
    // if (user) {
    //   state.currentUser = user;
    // } else {
    //   state.currentUser = null;
    // }
    user === null
      ? (state.currentUser = null)
      : (state.currentUser = user.email);
  },

  createUser: (state, user) => {
    state.users.push(user);
  },

  updateUser: (state, user) => {
    let index = _.findIndex(state.users, { userID: user.userID });
    //console.log(index)
    if (index >= 0) {
      state.users.splice(index, 1, user);
    }
  },

  deleteUser: (state, id) => {
    let index = _.findIndex(state.users, { userID: id });
    if (index >= 0) {
      state.users.splice(index, 1);
    }
  }
};

const actions = {
  /*setUsersRef: firestoreAction((context) => {
    return context.bindFirestoreRef(
      "firebaseUsers",
      dbUsersRef.orderBy("lastname")
    );
  }),*/

  signIn: async ({ commit }, user) => {
    try {
      state.signInLoading = true;
      /*const userData = await firebaseAuth.signInWithEmailAndPassword(
        user.email,
        user.password
      );*/
      const user = {
        userID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
        userCode: "1",
        userName: "drusmir",
        fullName: "Dal Rusmir",
        email: "drusmir@tpg.com",
        active: true,
        expiryDate: "2020-06-30",
        password: "123456",
        mustChangePassword: false
      };
      state.signInLoading = false;
      commit("userStatus", user);
      //console.log(userData.user)
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        state.signInLoading = false;
        notify("Wrong password!", "error", 5000);
      } else {
        state.signInLoading = false;
        notify(errorMessage, "error", 5000);
      }
    }
  },

  signOut: async ({ commit }) => {
    try {
      //await firebaseAuth.signOut();
    } catch (error) {
      const errorMessage = error.message;
      notify(errorMessage, "error", 5000);
    }
    commit("userStatus", null);
  },

  createUser: ({ commit }, user) => {
    commit("createUser", user);
  },

  updateUser: ({ commit }, user) => {
    commit("updateUser", user);
  },

  deleteUser: ({ commit }, id) => {
    commit("deleteUser", id);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
