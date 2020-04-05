import { firebaseAuth } from "../../firebase";
import { firestoreAction } from "vuexfire";
import { dbUsersRef } from "../../firebase";
import notify from 'devextreme/ui/notify';

const state = {
    currentUser: null,
    users: []
};

const getters = {
    currentUser: state => state.currentUser,
    getUsers: state => state.users
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
    }
};

const actions = {
    setUsersRef: firestoreAction(context => {
        return context.bindFirestoreRef("users", dbUsersRef.orderBy("lastname"));
    }),
    signIn: async ({ commit }, user) => {
        try {
            const userData = await firebaseAuth.signInWithEmailAndPassword(
                user.email,
                user.password
            );
            commit("userStatus", userData.user);
            console.log(userData.user)
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
                notify("Wrong password!", "error", 5000);
            } else {
                notify(errorMessage, "error", 5000);
            }
        }
    },

    signOut: async ({ commit }) => {
        try {
            await firebaseAuth.signOut();
        } catch (error) {
            const errorMessage = error.message;
            notify(errorMessage, "error", 5000);
        }
        commit("userStatus", null);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
