import React from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => { console.log(data) }
    const auth = useAuth();

    return (
        <div className="form">
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Enter your name" />
                {errors.name && <span className="error">Name field is required</span>}
                <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Enter your email" />
                {errors.email && <span className="error">Email field is required</span>}
                <input name="Address " ref={register({ required: true })} placeholder="Enter your address" />
                {errors.Address && <span className="error">Address field is required</span>}
                <input name="addressLine2" ref={register} placeholder="Enter your address (Optional)" />
                <input name="country" ref={register({ required: true })} placeholder="Enter your country name" />
                {errors.country && <span className="error">Country field is required</span>}
                <input name="city" ref={register({ required: true })} placeholder="Enter your city name" />
                {errors.city && <span className="error">City field is required</span>}
                <input name="zipcode" ref={register({ required: true })} placeholder="Enter your zip code" />
                {errors.zipcode && <span className="error">Zip code field is required</span>}

                <input type="submit" />
            </form>
        </div>
    )
};

export default Shipment;