import React from 'react';
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // (৩) shop page থেকে পাঠানো data কে আমরা props এর সাহায্যে access করেছি । 
    const {name, seller, stock, img, price, key} = props.productData
    return (
        <div className="product">
            <dir>
                <img  className="productImg" src={img} alt=""/>
            </dir>
            <div className="productDetails">
                {/* (৯) product এর নামে click করলে এখানে আমরা প্রোডাক্ট এর details দেখানোর প্রোডাক্ট এর নামকে আমরা link এ পরিণত করেছি এবং parameter হিসেবে Dynamic parameter সেট করেছি । এখন আমরা একে App.js থেকে Router এর সাহায্যে Access করব । */}
                <h4><Link to={"/product/"+key}>{name}</Link></h4>
                <p>Seller : {seller}</p>
                <p>Left in stock {stock}</p>
                <p><b>Price : {price}</b></p>
                
                {// (৬) user যখন Add to cart বাটন এ click করবে তখন productHandler বাটন এ যে function সেট করা আছে সেই সেই অনুযায়ী কাজ করবে ।
                props.button && <button className="mainButton" 
                onClick={()=> props.productHandler(props.productData)}>
                Add to cart</button>
                }
            </div>
        </div>
    );
};

export default Product;