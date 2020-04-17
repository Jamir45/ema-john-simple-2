import React, { useContext, useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { useState, createContext } from "react";
import { Route, Redirect } from "react-router-dom";


firebase.initializeApp(firebaseConfig);

// (a) আমরা আমাদের Log in এর Information গুলো কে আমাদের website এর যেকোনো জায়গা থেকে জায়গা থেকে পাওয়ার জন্য  আমরা এখানে createContext(); টা কে call করেছি AuthContext নামে ।  createContext(); এটি একটি  Hooks API Reference ।
const AuthContext = createContext();

// (b) এবং পরর্বতীতে এখানে আমরা এই AuthContext টাকে Provider এর সাহায্যে AuthContext.Provider তেরী করে একটি network এ পরিণত করেছি এবং এই network এর মাঝখানে আমারা website এর সবগুলো component কে দিয়ে দিতে যাতে পারব । পরর্বতীতে আমারা website এর যেকোনো জায়গা থেকে যেকোনো component এর মধ্যে Log in এর Information গুলো কে নিতে পারি । তাই এই network এর নাম হিসেবে আমরা AutContextProvider ব্যবহার করেছি । 
export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
    }

// (c) এখানে useContext() এর সাহায্যে আমরা AuthContext() টাকে একবারে declare করেছি যাতে পরর্বতীতে যখন আমরা website এর কোনো component Log in এর Information গুলো কে নিতে চাইব তখন শুধু এই function টাকে অর্থাৎ useAuth() টাকে call করলেই কাজ হবে ।
export const useAuth = ()=> useContext(AuthContext);

const getUser = (user)=>{
    const {displayName, email, photoURL} = user;
    return {Name:displayName, Email:email, photoURL}
}


export const PrivateRoute =({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }



const Auth = ( () => {
    const [user, setUser] = useState(null);

    // 
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then( response =>{
            const signInUser = getUser(response.user);
            setUser(signInUser)
            return response.user;
        })
        .catch( error => {
            setUser(null);
            return error.massage;
        })
    }

    const signOut = () => {
        return firebase.auth().signOut()
        .then( () => {
            setUser(null);
        })
        .catch(function(error) {
            // An error happened.
        });
    }

    useEffect( () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              const currentUser = getUser(user)
              setUser(currentUser);
            } else {
              // No user is signed in.
            }
          });
    }, [])


    return {
        user,
        signInWithGoogle,
        signOut
    }
})

export default Auth;