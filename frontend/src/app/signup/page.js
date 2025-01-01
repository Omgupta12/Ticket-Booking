"use client";
import { useState } from "react";
import { signup } from "../../utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "../../components/Toast";

const Signup = () => {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [toast, setToast] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!form.username || form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long.";
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await signup(form);
      setToast({
        message: "Signup successful! Redirecting to login...",
        type: "success",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Signup failed.",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>
      {serverError && (
        <p className="text-red-500 mb-4 text-center">{serverError}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className={`border p-2 w-full rounded ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`border p-2 w-full rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`border p-2 w-full rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full">
          Signup
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-700">
            Login here
          </Link>
        </p>
      </div>

      {/* Show the toast if it's set */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Signup;
