import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { useAuth } from '../Login/useAuth';
import { Link } from 'react-router-dom';

const Header = () => {
    const auth = useAuth();
    console.log(auth.user);
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav className="navMenu">
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage Inventory</a>
                { // এখনে আমরা conditional operator এর সাহায্যে condition লিখেছি । যদি auth.user সত্যি হয় তাহলে অর্থাৎ যদি user sign in অবস্থায় থাকে তাহলে {auth.user.photoURL} মানে তার নাম photo show করবে । আর যদি auth.user মিথ্যা হয় তাহলে Sign in লেখা show করবে ।
                   auth.user ? <Link to="/login"><img id='profile' src={auth.user.photoURL} alt=""></img></Link> :
                   <Link to="/login">Sign in</Link>
                }
            </nav>
        </div>
    );
};

export default Header;