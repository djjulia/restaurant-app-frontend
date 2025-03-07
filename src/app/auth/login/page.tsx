"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    console.log("🔍 Attempting to sign in with:", email, password);

    // signIn("credentials") calls NextAuth's credentials provider 
    // redirect: false means we manually handle success or error
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("🔍 signIn result:", result);

    // If signIn returns { error: "..." }, we display it
    if (result?.error) {
      setError(result.error || "Invalid email or password.");
    } else {
      // Otherwise, we assume success -> go to home page
      router.push("/");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="mb-4 text-center">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don&rsquo;t have an account? <a href="/auth/register">Register here</a>
        </p>
      </div>
    </div>
  );
}
