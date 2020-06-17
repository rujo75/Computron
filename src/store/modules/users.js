import { firebaseAuth } from "../../firebase";
import { firestoreAction } from "vuexfire";
import { dbUsersRef } from "../../firebase";
import notify from 'devextreme/ui/notify';

const state = {
    currentUser: null,
    signInLoading: false,
    users: [
        {
            userID: "185bad2d-0a16-4e6b-a6a1-49ac2d380c57",
            userName: "drusmir",
            fullName: "Dal Rusmir",
            email: "drusmir@tpg.com",
            enabled: true,
            expiryDate: "2020-06-30",
            password: "123456",
            mustChangePassword: false
        },
        {
            userID: "f274ab28-59af-45af-86f5-97a149104476",
            userName: "jsmith",
            fullName: "John Smith",
            email: "jsmith@tpg.com",
            enabled: true,
            expiryDate: "",
            password: "123456",
            mustChangePassword: false
        },
        {
            userID: "2652c185-09ab-4b8a-8518-7f184a4f2baf",
            userName: "jpike",
            fullName: "Jane Pike",
            email: "jpike@tpg.com",
            enabled: true,
            expiryDate: "",
            password: "123456",
            mustChangePassword: false
        }
    ],
    firebaseUsers: []
};

const getters = {
    currentUser: state => state.currentUser,
    signInLoading: state => state.signInLoading,
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
        return context.bindFirestoreRef("firebaseUsers", dbUsersRef.orderBy("lastname"));
    }),
    signIn: async ({ commit }, user) => {
        try {
            state.signInLoading = true;
            const userData = await firebaseAuth.signInWithEmailAndPassword(
                user.email,
                user.password
            );
            state.signInLoading = false;
            commit("userStatus", userData.user);
            console.log(userData.user)
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
