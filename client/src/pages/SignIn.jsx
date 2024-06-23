import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignIn() {
  const [formData, setFormData] = useState({});

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log(data);
      setLoading(false);

      if (data.success === false) {
        setError(true);
        return;
      }
      setError(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(true);
    }
    // console.log(data);
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleInput}
        /> */}
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleInput}
        />

        <button
          disabled={loading ? true : false}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled: opacity-80"
        >
          {loading ? "loading..." : "Sign In"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>New User? </p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong"}</p>
    </div>
  );
}
