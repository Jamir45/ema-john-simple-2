import React from 'react';

const Cart = (props) => {
    const cart = props.mainCart
    // let total = cart.reduce( (total, item) => total+item.price, 0);
    let total = 0;
    for( let i=0; i<cart.length; i++){
        const product = cart[i];
        total = total+product.price * product.quantity;
    }

    let shipping = 0;
    if(total > 0 && total < 300){
        shipping = 4.99;
    }
    else if(total > 301 && total < 600){
        shipping = 7.99;
    }
    else if(total > 601 && total < 900){
        shipping = 10.99;
    }
    else if(total > 901){
        shipping = 0}

    let vat = (total+shipping)*2 / 100;
    const totalPrice = (total + shipping + vat);
    const formatNumber = ( (number) => {
        const precision = number.toFixed(2);
        return Number(precision)
    })

    return (
        <div>
            <h3>Order Summery</h3>
            <h5>Product Added : {cart.length}</h5>
            <p>Product Price : $ {formatNumber(total)}</p>
            <p>Shipping Charge : $ {shipping}</p>
            <p>Tex + Vat : $ {formatNumber(vat)}</p>
            <p><b>Total Price : $ {formatNumber(totalPrice)}</b></p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;