import React, { useEffect, useState } from 'react';
import './Review.css'
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Reviewall from './Reviewall';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import Auth from '../Login/useAuth';

const Review = () => {
    const auth = Auth();
    // (১৩) এবার useEffect থেকে পাওয়া data গুলোকে আমরা এই useState() এ রেখে দিব । এবং এখান থেকে data নিয়ে আমরা পরর্তীতে ব্যবহার করব ।
    const [data, setData] = useState([]);

    // (১২) useEffect  প্রধাণত dataBase থেকে data load করার জন্য ব্যবহার করা হয় । তাই আমরা আমদের localStorage থেকে data নেওয়ার জন্য এখানে useEffect ব্যবহার করেছি । 
    useEffect(() => {
        // (১২.১) আমরা আমাদের localStorage এ যে প্রোডাক্ট key আর quantity কে data হিসেবে রেখেছি সেই key আর quantity কে access করার জন্য getDatabaseCart() function ব্যবহার করেছি ।
        const savedData = getDatabaseCart();
        // (১২.২) এখানে আমরা key টাকে আলাদাভাবে পাওয়ার জন্য savedData থেকে Object.keys এর সাহায্যে আলাদাকরে নিয়েছি । 
        const productKeys = Object.keys(savedData);
        console.log(productKeys)
        fetch('https://node-mongo-jamir.herokuapp.com/reviewProducts', {
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            // (১২.৩) আবার এখানে আমরা productKeys থেকে নেওয়া key দিয়ে ঐ key এর নির্দিষ্ট প্রোডাক্ট কে আলাদাভাবে পাওয়ার জন্য productKeys কে map করে প্রত্যেকটি উপাদানকে আলাদা করা হয় । এর পর সেই উপাদানকে fakeData থেকে find এর সাহায্যে productKeys থেকে পাওয়া key এর সাথে Match করিয়ে নির্দিষ্ট প্রোডাক্ট কে নেওয়া হয় । এবং প্রোডাক্ট এর সংখ্যাকেই তার quantity হিসেবে আলাদা করা হয় ।
            const cartProduct = productKeys.map( key => {
                const product = data.find( itemKey => itemKey.key === key);
                product.quantity= savedData[key];
                return product
            });
            setData(cartProduct);
            })
    }, []);

    // (১৪) এবার আমাদের cart এ add করা প্রোডাক্ট কে remove করার জন্য removeHandler function টি লিখেছি । এখানে আমরা প্রথমে প্রোডাক্ট এর key কে access করে নিয়েছি । তার পর উপরের useState এ রাখা data কে filter করে এই যে প্রোডাক্ট এর key এর সাথে এই key match করবে সেই প্রোডাক্ট কে removed করে দিবে । 
    const removeHandler = ( (removed) => {
        const newCart = data.filter( item => item.key !== removed);
        setData(newCart);
        removeFromDatabaseCart(removed);
    })

    const placeOrderHandler = ( () => {
        setData([]);
        processOrder();
    })

    return (
        <div className="mainContainer">
            <div className="productSection">
                { // (১৫) এখানে আমরা useEffect এর data গুলোকে reviewProduct এবং removeHandler function কে removeHandler হিসেবে Reviewall component এ pass করেছি । 
                    data.map( item => <Reviewall 
                        key = {item.key}
                        removeHandler={removeHandler}
                        reviewProduct={item}>
                        </Reviewall>)
                }
                {
                    !data.length && <h1>You have no any type of product. Please continue your shopping</h1>
                }
            </div>
            <div className="cartSection">
                {/* (১৬) Review page এ আমরা cart component টাকে দেখানোর জন্য আরমা cart component এই Review Page এ call করেছি । */}
                <Cart mainCart={data}>
                    <Link to="/shipment">
                     { 
                         auth.user ? <button className="mainButton">Proceed Order</button> :
                         <button className="mainButton">SignIn Need</button>
                     }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;