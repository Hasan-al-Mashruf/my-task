import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase/Firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [name, setName] = useState()
    const [value, setValue] = useState(0)
    const [loadData, setloadData] = useState(false)
    const [user, setUser] = useState({})
    const [completedTask, setCompletedTask] = useState(null)
    const [pendingTask, setPendingTask] = useState(null)

    const createUser = (email, password) => {
        setloadData(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setloadData(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = (provider) => { 
        setloadData(true)
        return signInWithPopup(auth, provider)
    }

    const logOutuser = () => {
        return signOut(auth)
    }

    const updateName = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setloadData(false)
        });
        return () => unsubscribe();
    }, [])

    const authInfo = { name, value, setValue, loadData, setloadData, user, createUser, updateName, logOutuser, loginUser, googleLogin, setCompletedTask, completedTask, setPendingTask, pendingTask }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;