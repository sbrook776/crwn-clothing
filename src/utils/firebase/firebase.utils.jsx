import { initializeApp } from 'firebase/app';

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import {
    getFirestore, doc, getDoc, setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAPg7jmfaJ_oqfgkG9B4HjvObaU5tmSew0",
    authDomain: "crwn-clothing-db-8ce8e.firebaseapp.com",
    projectId: "crwn-clothing-db-8ce8e",
    storageBucket: "crwn-clothing-db-8ce8e.appspot.com",
    messagingSenderId: "25013876369",
    appId: "1:25013876369:web:543d5e2d8be63ccc0f7130"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
  
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
            const { displayName, email } = userAuth;
            const createdAt = new Date();

            try {
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    createdAt
                });
            } catch (error) {
                console.log('error creating the user', error.message);
            }
        }
    
    // if user data does not exist
    // create / set the document with the data from userAuth in my collection

    // if user data exists

    return userDocRef
};