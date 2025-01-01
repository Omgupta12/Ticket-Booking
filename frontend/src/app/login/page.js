"use client";

import { useState } from "react";
import { login } from "../../utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "../../components/Toast";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [toast, setToast] = useState(null);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};
    if (!form.username) {
      newErrors.username = "Username is required.";
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear field-specific error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const { data } = await login(form);
      localStorage.setItem("user", JSON.stringify(data));
      setToast({ message: "Login successful!", type: "success" });
      router.push("/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed");
      setToast({
        message: err.response?.data?.message || "Login failed",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {serverError && (
        <p className="text-red-500 mb-4 text-center">{serverError}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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

        <div className="mb-4">
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

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">
          Do not have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up here
          </Link>
        </p>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)} // Close toast after 3 seconds
        />
      )}
    </div>
  );
};

export default Login;
