import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function loginWithGoogle() {
        return auth.signInWithPopup(provider);
    }

    function logout() {
        return auth.signOut()
    }

    function forgotPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function returnUserData() {
        return console.log(currentUser)
        // return currentUser.getIdToken().then((val) => {
        //     console.log(val)
        // })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
    
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        loginWithGoogle,
        signup,
        logout,
        forgotPassword,
        updateEmail,
        updatePassword,
        returnUserData,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
