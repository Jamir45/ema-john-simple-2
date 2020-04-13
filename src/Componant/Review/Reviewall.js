import React from 'react';

const Reviewall = (props) => {
    const {name, seller, stock, img, price, quantity, key} = props.reviewProduct;
    return (
        <div className="product">
            <dir>
                <img  className="productImg" src={img} alt=""/>
            </dir>
            <div className="productDetails">
                <h4>{name}</h4>
                <p>Seller : {seller}</p>
                <p>Left in stock {stock}</p>
                <p>Quantity : {quantity}</p>
                <p><b>Price : {price}</b></p>
                
                {// (১৬) user যখন Remove Item বাটন এ click করবে তখন removeHandler বাটন এ যে function সেট করা আছে সেই সেই অনুযায়ী কাজ করবে ।
                <button className="mainButton" onClick={ () => props.removeHandler(key)}>
                Remove Item</button>
                }
            </div>
        </div>
    );
};

export default Reviewall;