"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Dish {
  _id: string;
  name: string;
  price: number;
  restaurantName?: string;
  quantity: number; // ✅ Added quantity field
}

export default function CartPage() {
  const [cart, setCart] = useState<Dish[]>([]);
  const [total, setTotal] = useState<number>(0);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
      calculateTotal(parsedCart);
    }
  }, []);

  // ✅ Recalculate total price
  const calculateTotal = (items: Dish[]) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  // ✅ Remove item from cart
  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);

    // ✅ Hide cart icon if empty
    if (updatedCart.length === 0) {
      window.dispatchEvent(new Event("storage"));
    }
  };

  // ✅ Update quantity
  const updateQuantity = (index: number, change: number) => {
    const updatedCart = [...cart];
    const newQuantity = updatedCart[index].quantity + change;

    if (newQuantity >= 1) {
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      calculateTotal(updatedCart);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>

      {cart.length > 0 ? (
        <>
          <ul className="list-group mb-3">
            {cart.map((dish, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{dish.name}</strong> - ${dish.price.toFixed(2)} each
                  <br />
                  <small className="text-muted">
                    From <strong>{dish.restaurantName || "Unknown Restaurant"}</strong>
                  </small>
                </div>
                
                {/* ✅ Quantity Controls */}
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-secondary me-2" onClick={() => updateQuantity(index, -1)}>-</button>
                  <span>{dish.quantity}</span>
                  <button className="btn btn-sm btn-secondary ms-2" onClick={() => updateQuantity(index, 1)}>+</button>
                </div>

                <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>

          {/* ✅ Total Price */}
          <h4>Total: ${total.toFixed(2)}</h4>

          {/* ✅ Checkout & Continue Shopping */}
          <div className="d-flex justify-content-between">
            <Link href="/" className="btn btn-secondary">Continue Shopping</Link>
            <button className="btn btn-primary">Proceed to Checkout</button>
          </div>
        </>
      ) : (
        <>
          <p>Your cart is empty.</p>
          <Link href="/" className="btn btn-primary">Continue Shopping</Link>
        </>
      )}
    </div>
  );
}
