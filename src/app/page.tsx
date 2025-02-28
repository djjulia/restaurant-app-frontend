"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Dish {
  _id: string;
  name: string;
  price: number;
  restaurantName?: string;
}

interface Restaurant {
  _id: string;
  name: string;
  address: string;
  cuisine: string;
  rating: number;
  dishes: Dish[];
}

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/restaurants");
        if (!response.ok) throw new Error("Failed to fetch restaurants.");
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  // ✅ Search Restaurants and Dishes
  const filteredRestaurants = restaurants
    .map((restaurant) => {
      const matchesRestaurant = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchingDishes = restaurant.dishes?.filter((dish) =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (matchesRestaurant || (matchingDishes && matchingDishes.length > 0)) {
        return { ...restaurant, dishes: matchingDishes || [] };
      }

      return null;
    })
    .filter(Boolean) as Restaurant[]; // ✅ Ensure no null values

  return (
    <div className="container mt-4">
      <h1>Restaurant List</h1>

      {/* ✅ Search Bar */}
      <input
        type="text"
        className="form-control my-3"
        placeholder="Search for restaurants or dishes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* ✅ Display Results */}
      {filteredRestaurants.length > 0 ? (
        <div className="row">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant._id} className="col-md-4 mb-4">
              <div className="card p-3">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.address}</p>
                <p>{restaurant.cuisine}</p>
                <p>Rating: {restaurant.rating} ★</p>
                <Link href={`/restaurant/${restaurant._id}`} className="btn btn-primary">
                  View Details
                </Link>

                {/* ✅ Display matching dishes if searching for them */}
                {searchQuery && restaurant.dishes?.length > 0 && (
                  <div className="mt-2">
                    <h5>Matching Dishes:</h5>
                    <ul className="list-group">
                      {restaurant.dishes.map((dish) => (
                        <li key={dish._id} className="list-group-item">
                          {dish.name} - ${dish.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No restaurants or dishes found.</p>
      )}
    </div>
  );
}
