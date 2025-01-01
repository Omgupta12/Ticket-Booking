const pool = require("../config/db");

// Function to book seats
const bookSeats = async (numOfSeats) => {
  // Fetch all unreserved seats ordered by row and seat number
  const availableSeats = await pool.query(
    "SELECT id, row_number, seat_number FROM seats WHERE is_reserved = FALSE ORDER BY row_number, seat_number ASC"
  );

  if (availableSeats.rows.length < numOfSeats) {
    throw new Error("Not enough available seats.");
  }

  // Group seats by row number
  const rowsMap = new Map();
  availableSeats.rows.forEach((seat) => {
    if (!rowsMap.has(seat.row_number)) {
      rowsMap.set(seat.row_number, []);
    }
    rowsMap.get(seat.row_number).push(seat);
  });

  let seatIdsToBook = [];

  // Step 1: Try to book seats in the same row
  for (const [row, seats] of rowsMap) {
    if (seats.length >= numOfSeats) {
      seatIdsToBook = seats.slice(0, numOfSeats).map((seat) => seat.id);
      break;
    }
  }

  // Step 2: If not enough seats in one row, book from nearby rows
  if (seatIdsToBook.length === 0) {
    for (const [row, seats] of rowsMap) {
      if (seatIdsToBook.length >= numOfSeats) break;
      const seatsToTake = seats.slice(0, numOfSeats - seatIdsToBook.length);
      seatsToTake.forEach((seat) => seatIdsToBook.push(seat.id));
    }
  }

  if (seatIdsToBook.length < numOfSeats) {
    throw new Error("Not enough available seats.");
  }

  // Update database to mark seats as reserved
  await pool.query(
    "UPDATE seats SET is_reserved = TRUE WHERE id = ANY($1::int[])",
    [seatIdsToBook]
  );

  // Fetch and return the booked seats
  const bookedSeats = await pool.query(
    "SELECT * FROM seats WHERE id = ANY($1::int[])",
    [seatIdsToBook]
  );

  return bookedSeats.rows;
};

// Function to get all seats
const getAllSeats = async () => {
  const result = await pool.query(
    "SELECT * FROM seats ORDER BY row_number, seat_number"
  );
  return result.rows;
};

// Function to reset seats
const resetSeats = async () => {
  await pool.query("UPDATE seats SET is_reserved = FALSE");
};

module.exports = {
  bookSeats,
  getAllSeats,
  resetSeats,
};