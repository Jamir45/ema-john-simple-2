import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();

    // এখানে আমরা signInHandler নামে একটি function তৈরী করেছি এবং এর ভিতরে auth.signInWithGoogle() function টাকে দিয়ে দিয়েছি । কারণ user যখন Sign In করবে তখন তাকে window.location.pathname = "/review"; সাহায্যে Automatic ভাবে review page এ নিয়ে আসা হবে । 
    const signInHandler = () =>{
        auth.signInWithGoogle()
        .then( result =>{
            window.location.pathname = "/review";
        });
    }

    // এখানে আমরা signOutHandler নামে একটি function তৈরী করেছি এবং এর ভিতরে auth.signOut() function টাকে দিয়ে দিয়েছি । কারণ user যখন Sign Out করবে তখন তাকে window.location.pathname = "/"; সাহায্যে Automatic ভাবে Home page এ নিয়ে আসা হবে । 
    const signOutHandler = () =>{
        auth.signOut()
        .then( result =>{
            window.location.pathname = "/";
        });
    }

    return (
        <div>
            <h1>This is log is page</h1>
            { // এখনে আমরা conditional operator এর সাহায্যে condition লিখেছি । যদি auth.user সত্যি হয় তাহলে অর্থাৎ যদি user sign in অবস্থায় থাকে তাহলে Sign Out বাটন show করবে । আর যদি auth.user মিথ্যা হয় তাহলে Sign in Button show করবে ।
                auth.user ? <button onClick={signOutHandler}>Sign Out</button> :
                <button onClick={signInHandler}>Sign In</button>
            }
        </div>
    );
};

export default Login;