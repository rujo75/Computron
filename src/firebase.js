import firebase from "firebase/app"
import "firebase/firestore"

const config = {
    apiKey: "AIzaSyCR-1xBn6MXF50cCDDR8Eq5-9gLQ5aUoYM",
    authDomain: "computron-7edc7.firebaseapp.com",
    databaseURL: "https://computron-7edc7.firebaseio.com",
    projectId: "computron-7edc7",
    storageBucket: "computron-7edc7.appspot.com",
    messagingSenderId: "1075511443334",
    appId: "1:1075511443334:web:fa8818053ce9c174207607"
}

firebase.initializeApp(config)

const db = firebase.firestore()

export const dbCompaniesRef = db.collection("companies")

// add to script section
// import { dbCompaniesRef } from "../firebase";
// add code to save data
// dbCompaniesRef.add(this.company)