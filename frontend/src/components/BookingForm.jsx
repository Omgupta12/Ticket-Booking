"use client";

import { useState } from "react";

const BookingForm = ({ onBookSeats }) => {
  const [seatCount, setSeatCount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const seatCountNumber = parseInt(seatCount, 10);
    if (seatCountNumber < 1 || seatCountNumber > 7 || isNaN(seatCountNumber)) {
      alert("Please enter a valid number of seats (1-7)");
      return;
    }
    onBookSeats(seatCountNumber);
    setSeatCount("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
      <input
        type="number"
        value={seatCount}
        onChange={(e) => setSeatCount(e.target.value)}
        placeholder="Enter number of seats"
        className="border p-2 rounded w-52"
        min="1"
        max="7"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Book
      </button>
    </form>
  );
};

export default BookingForm;
