import React, { useState, useEffect } from 'react';
import './Shop.css';
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    const fist20 = fakeData.slice(0, 20)
    // (১) এখানে আমরা এই useState এর সাহায্যে fakeData থেকে data গুলোকে সংগ্রহ করব । 
    const [data, setData] = useState(fist20);

    // (৭) user Add to cart বাটন এ click করার পর productHandler এর সাহায্যে যে কাজ গুলো করবে সেগুলোকে এই state এর সাহায্যে cart এ পাঠানো হবে ।
    const [cart, setCart] = useState([])

    useEffect(() => {
        // (৪.১) আমরা আমাদের localStorage এ যে প্রোডাক্ট key আর quantity কে data হিসেবে রেখেছি সেই key আর quantity কে access করার জন্য getDatabaseCart() function ব্যবহার করেছি ।
        const savedData = getDatabaseCart();
        // (৪.২) এখানে আমরা key টাকে আলাদাভাবে পাওয়ার জন্য savedData থেকে Object.keys এর সাহায্যে আলাদাকরে নিয়েছি । 
        const productKeys = Object.keys(savedData);

        // (৪.৩) আবার এখানে আমরা productKeys থেকে নেওয়া key দিয়ে ঐ key এর নির্দিষ্ট প্রোডাক্ট কে আলাদাভাবে পাওয়ার জন্য productKeys কে map করে প্রত্যেকটি উপাদানকে আলাদা করা হয় । এর পর সেই উপাদানকে fakeData থেকে find এর সাহায্যে productKeys থেকে পাওয়া key এর সাথে Match করিয়ে নির্দিষ্ট প্রোডাক্ট কে নেওয়া হয় । এবং প্রোডাক্ট এর সংখ্যাকেই তার quantity হিসেবে আলাদা করা হয় ।
        const cartProduct = productKeys.map( key => {
            const product = fakeData.find( itemKey => itemKey.key === key);
            product.quantity= savedData[key];
            return product
        });
        setCart(cartProduct);
    }, []);

    // (4) এই productHandler সাহায্যে আমরা প্রত্যেকটি product কে আলাদা আলাদা ভাবে select করতে চাই । তাই আমরা এখানে parameter হিসেবে clickedProduct দিয়েছি ।
    const productHandler = ( (clickedProduct) => {
        // (৪.৪) user যখন add to cart button এ click করবে তখন আমরা তার newCart এ select করা প্রোডাক্ট গুলোকে তার key গুলোকে এবং যতবার click করবে সেই click সংখ্যা বা quantity এর মান সংগ্রহ করে তার account বা cart এ রাখার জন্য আমরা getDatabaseCart function ব্যবহার করেছি । এটি হচ্ছে আমাদের Local storage । অর্থাৎ এক কথায় আমরা তার প্রোডাক্ট এর ডাটাগুলো কে data base এ রাখছি ।
        const addedKey = clickedProduct.key;
        const selectedProduct = cart.find( item => item.key === addedKey);
        let count = 1;
        let newCart;
        if(selectedProduct){
            count = selectedProduct.quantity + 1;
            selectedProduct.quantity = count;
            const others = cart.filter( item => item.key !== addedKey);
            newCart = [...others, selectedProduct]
        }
        else{
            clickedProduct.quantity = 1;
            newCart = [...cart, clickedProduct]
        }
        setCart(newCart)
        addToDatabaseCart(clickedProduct.key, count)
    });
    
    return (
        <div className="mainContainer">
            <div className="productSection">
                
                {// (২) এখানে আমরা useState থেকে পাওয়া data কে map করে এর প্রত্যেকটি উপাদানকে এক একটি item হিসেবে productData এর মাধ্যমে Product component pass করেছি । (5) আবার productHandler function টাকেও আমরা productData এর মাধ্যমে Product component এর button এ pass করেছি ।
                   data.map( item => <Product
                    key={item.key}
                    button={true} 
                    productData={item }
                    productHandler={productHandler}
                   ></Product>) 
                }
            </div>
            <div className="cartSection">
                {/* (৮) এখানে mainCart সাহায্যে cart এর তথ্যগুলোকে cart page এ pass করছি */}
                <Cart mainCart={cart}>
                    <Link to="/review"><button className="mainButton">Review</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;