'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(storedCart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* ✅ Logo + Text Side by Side */}
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image src="/logo.png" alt="Julia Camp's First App" width={40} height={40} className="me-2" />
          <span>Restaurant App</span>
        </Link>

        <div className="d-flex align-items-center">
          {/* 🛒 Move Cart Icon BEFORE Other Buttons */}
          {cartCount > 0 && (
            <Link href="/cart" className="me-3" style={{ fontSize: "24px", textDecoration: "none" }}>
              🛒 <span className="badge bg-danger">{cartCount}</span>
            </Link>
          )}

          {session ? (
            <>
              <span className="me-3">Welcome, {session.user?.name}!</span>
              <button className="btn btn-outline-danger me-2" onClick={() => signOut()}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/register" className="btn btn-outline-success me-2">
                Register
              </Link>
              <button className="btn btn-primary me-2" onClick={() => signIn()}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
