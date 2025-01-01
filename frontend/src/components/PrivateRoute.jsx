// components/PrivateRoute.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login"); // Redirect to login page if not logged in
    }
  }, [router]);

  return <>{children}</>; // Render children if logged in
};

export default PrivateRoute;
