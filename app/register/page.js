"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address:"",
    ContactNumber:"",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="container mt-5">
      <h2>User Registration</h2>

      <form onSubmit={handleSubmit} className="col-md-4">

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Address"
          placeholder="Enter address"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          type="string"
          name="Contact Number"
          placeholder="Enter Contact Number"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <button className="btn btn-success w-100">
          Register
        </button>

      </form>
    </div>
  );
}