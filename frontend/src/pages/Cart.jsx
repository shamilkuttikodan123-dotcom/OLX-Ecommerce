
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import {
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
} from "../features/cart/cartSlice";

import { checkout } from "../features/checkout/checkoutSlice";

import "./cart.css";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);


        useEffect(() => {
             localStorage.setItem( 'cart', JSON.stringify(cartItems) );}, 
        [cartItems]);



    const { loading, success, error } = useSelector((state) => state.checkout );

    const total = cartItems.reduce( (sum, item) => sum + Number(item.price) * item.quantity,0 );

    const handleCheckout = async () => {
        const productId = cartItems.map((item) => item.id);

        try {
            await dispatch(checkout(productId)).unwrap();

            dispatch(clearCart());
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    };

    return (
        <div>
            <Navbar/>

        
        <div className="cart-page">
            <h1>Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p>
                    {success
                        ? "Checkout completed successfully!"
                        : "Your cart is empty."}
                </p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <h2>{item.title}</h2>

                            <p>Price: ₹{item.price}</p>

                            <button
                                onClick={() =>
                                    dispatch(decreaseQuantity(item.id))
                                }
                            >
                                -
                            </button>

                            <span> {item.quantity} </span>

                            <button
                                onClick={() =>
                                    dispatch(increaseQuantity(item.id))
                                }
                            >
                                +
                            </button>

                            <button
                                onClick={() =>
                                    dispatch(removeFromCart(item.id))
                                }
                            >
                                Remove
                            </button>

                            <p>
                                Subtotal: ₹
                                {Number(item.price) * item.quantity}
                            </p>

                            <hr />
                        </div>
                    ))}

                    <h2 className="cart-total">
                        Total: ₹{total}
                    </h2>

                    {error && (
                        <p className="error-message">
                            Checkout failed. Please try again.
                        </p>
                    )}

                    <button
                        className="checkout-button"
                        onClick={handleCheckout}
                        disabled={loading || cartItems.length === 0}
                    >
                        {loading ? "Processing..." : "Checkout"}
                    </button>
                </>
            )}
        </div>
        </div>
    );
};

export default Cart;
