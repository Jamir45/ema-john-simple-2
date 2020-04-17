import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const Productdetails = () => {
    // (১০) user যখন কোনো প্রোডাক্ট এর নামে  click করবে তখন Router এর সাহায্যে সেই প্রোডাক্ট এর Dynamic parameter কে Access করার জন্য আমরা এখানে useParams() function ব্যবহার করেছি । useParams() এটি একটি rect এর Library function । এর সাহায্যে আমরা প্রোডাক্ট এর নির্দিষ্ট key কে নিতে পারব ।
    const {key} = useParams();
    // (১১) এবার useParams() এর সাহায্যে নেয়া key পর সেই key দিয়ে fakeData এর প্রোডাক্টের key এর সাথে Match করিয়ে আমরা নির্দিষ্ট প্রোডাক্ট এর Details নিতে পারব । 
    const [datas, serData] = useState(null);
    useEffect( ()=>{
        fetch('https://node-mongo-jamir.herokuapp.com/product/'+key)
        .then(res => res.json())
        .then(data => {
            serData(data);
        })
    }, [])
    return (
        <div>
            {
               datas && <Product button={false} productData={datas}></Product>
            }
        </div>
    );
};

export default Productdetails;