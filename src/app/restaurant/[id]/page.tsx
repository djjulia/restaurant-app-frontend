"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// ✅ Minimal Dish interface (avoid `any`)
interface Dish {
  _id: string;
  name: string;
  price: number;
}

// ✅ Minimal Restaurant interface
interface Restaurant {
  _id: string;
  name: string;
  address: string;
  cuisine: string;
  rating: number;
  dishes: Dish[];
}

export default function RestaurantDetails() {
  // Next.js can return `undefined` for `id`, so we safely cast or fallback
  const params = useParams() as { id?: string };
  const restaurantId = params?.id ?? "";

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  // ✅ Fetch restaurant details
  useEffect(() => {
    if (!restaurantId) return;

    const fetchRestaurant = async () => {
      try {
        // Replace with your actual backend URL
        const response = await fetch(`http://localhost:5000/api/restaurants/${restaurantId}`);
        if (!response.ok) throw new Error("Failed to fetch restaurant details.");
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  // ✅ If no ID, show a basic message (prevents type error)
  if (!restaurantId) {
    return <p>No restaurant ID provided.</p>;
  }

  // ✅ Loading state
  if (!restaurant) {
    return <p>Loading restaurant details...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>{restaurant.name}</h2>
      <p>
        <strong>Address:</strong> {restaurant.address}
      </p>
      <p>
        <strong>Cuisine:</strong> {restaurant.cuisine}
      </p>
      <p>
        <strong>Rating:</strong> {restaurant.rating} ★
      </p>

      <h3 className="mt-4">Menu</h3>
      {restaurant.dishes.length > 0 ? (
        <div className="row">
          {restaurant.dishes.map((dish) => (
            <div key={dish._id} className="col-md-4 mb-3">
              <div className="card p-3">
                <h5>{dish.name}</h5>
                <p>Price: ${dish.price}</p>
                <button className="btn btn-primary w-100">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No dishes available.</p>
      )}
    </div>
  );
}
