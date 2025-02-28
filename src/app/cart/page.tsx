"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Dish {
  _id: string;
  name: string;
  price: number;
  restaurantName?: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<Dish[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    calculateTotal(updatedCart);
    window.dispatchEvent(new Event("storage"));
  };

  const calculateTotal = (items: Dish[]) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalPrice);
  };

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p className="mb-0">From: {item.restaurantName}</p>
                  <p className="mb-0">Price: ${item.price.toFixed(2)}</p>
                </div>
                <button className="btn btn-danger" onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <h4>Total: ${total.toFixed(2)}</h4>

          <div className="d-flex justify-content-between">
            <Link href="/" className="btn btn-secondary">Continue Shopping</Link>
            <button className="btn btn-primary">Proceed to Checkout</button>
          </div>
        </>
      ) : (
        <div>
          <p>Your cart is empty.</p>
          <Link href="/" className="btn btn-secondary">Continue Shopping</Link>
        </div>
      )}
    </div>
  );
}
