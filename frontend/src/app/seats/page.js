"use client";

import React, { useState } from "react";
import SeatGrid from "@/components/SeatGrid";
import BookingForm from "@/components/BookingForm";
import ResetButton from "@/components/ResetButton";
import Toast from "@/components/Toast";

const Seats = () => {
  const [seats, setSeats] = useState(
    Array.from({ length: 80 }, (_, i) => ({
      id: i + 1,
      is_reserved: false,
    }))
  );
  const [toast, setToast] = useState(null);

  // Handle seat booking logic
  const handleBookSeats = (seatCount) => {
    const availableSeats = seats.filter((seat) => !seat.is_reserved);
    if (availableSeats.length < seatCount) {
      setToast({
        message: "Not enough seats available!",
        type: "error",
      });
      return;
    }

    let updatedSeats = [...seats];
    let seatsBooked = 0;

    updatedSeats = updatedSeats.map((seat) => {
      if (seatsBooked < seatCount && !seat.is_reserved) {
        seat.is_reserved = true;
        seatsBooked++;
      }
      return seat;
    });

    setSeats(updatedSeats);

    setToast({
      message: `${seatCount} seats booked successfully!`,
      type: "success",
    });
  };

  // Handle resetting all seats
  const handleReset = () => {
    const resetSeats = seats.map((seat) => ({
      ...seat,
      is_reserved: false,
    }));
    setSeats(resetSeats);

    setToast({
      message: "All seats have been reset.",
      type: "success",
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Seat Booking System</h1>

      <SeatGrid seats={seats} />
      <BookingForm onBookSeats={handleBookSeats} />
      <ResetButton onReset={handleReset} />

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

export default Seats;
