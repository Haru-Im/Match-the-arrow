
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    updateDoc,
    doc,
    setDoc,
} from 'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDkb8zTqk9hXWCYWIt_mmnU99owthGbfIc",
    authDomain: "game-7c2e7.firebaseapp.com",
    databaseURL: "https://game-7c2e7-default-rtdb.firebaseio.com",
    projectId: "game-7c2e7",
    storageBucket: "game-7c2e7.appspot.com",
    messagingSenderId: "931652524762",
    appId: "1:931652524762:web:c334e9d8697e0402d423e3",
    measurementId: "G-72WZ4MD9DT"
  };
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export const addUser = async (name: string,profileImageUrl:string) => {
    try {
        const data = await getDocs(collection(db, 'users'))
        const users = data.docs.map((doc) => {
            return doc.data()
        })

        const isDuplicatedNickname = users.some((e) => e.name === name)

        if (!isDuplicatedNickname) {
            await setDoc(doc(db, 'users', String(users.length + 1)), {
                name,
                id: users.length + 1,
                score: 0,
                maxCombo : 0,
                profileImageUrl ,
            })

            return String(users.length + 1)
        }
    } catch (e) {
        console.log(e, 'error')
    }
}

export const getUserData = async () => {
    const data = await getDocs(collection(db, 'users'))
    const users = data.docs.map((doc) => {
        return doc.data()
    })

    console.log(users)

    return users
}

export const updateScore = async (score: number, userId: string) => {
    const ref = doc(db, 'users', userId)
    await updateDoc(ref, {
        score: score,
    })
}

export const checkUser = async (name:string) => {
    try {
        const data = await getDocs(collection(db, 'users'))
        const users = data.docs.map((doc) => {
            return doc.data()
        })

        console.log(name)

        const isUserExist = users.some((e) => e.name === name)

        return isUserExist
    } catch (e) {}
}
