"use client";
import { useEffect, useState } from "react";
import SeatGrid from "../components/SeatGrid";
import BookingForm from "../components/BookingForm";
import ResetButton from "../components/ResetButton";
import axios from "axios";
import PrivateRoute from "../components/PrivateRoute";
import Toast from "../components/Toast";

const Home = () => {
  const [seats, setSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const { data } = await axios.get(
        "https://seatbooking-backend-tsp2.onrender.com/api/seats"
      );
      setSeats(data);
      setBookedSeats(data.filter((seat) => seat.is_reserved).length);
    } catch (err) {
      console.error(err);
      setToast({
        message: "Failed to load seats data.",
        type: "error",
      });
    }
  };

  const handleBookSeats = async (seatCount) => {
    try {
      const { data } = await axios.post(
        "https://seatbooking-backend-tsp2.onrender.com/api/seats/book",
        {
          numOfSeats: seatCount,
        }
      );
      setToast({
        message: "Seats booked successfully!",
        type: "success",
      });
      fetchSeats();
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Booking failed.",
        type: "error",
      });
    }
  };

  const handleReset = async () => {
    try {
      await axios.post(
        "https://seatbooking-backend-tsp2.onrender.com/api/seats/reset"
      );
      setToast({
        message: "All bookings reset successfully!",
        type: "success",
      });
      fetchSeats();
    } catch (err) {
      console.error(err);
      setToast({
        message: "Failed to reset bookings.",
        type: "error",
      });
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6">Seat Booking</h1>

        <div className="flex flex-col sm:flex-row justify-around items-start w-full gap-10">
          <div className="w-full sm:w-2/3">
            <SeatGrid seats={seats} />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 mt-4 w-full sm:w-1/3">
            <BookingForm onBookSeats={handleBookSeats} />
            <ResetButton onReset={handleReset} />
            <div className="mt-4 text-gray-700">
              <p>Booked Seats = {bookedSeats}</p>
              <p>Available Seats = {80 - bookedSeats}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Show the toast if it's set */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </PrivateRoute>
  );
};

export default Home;
