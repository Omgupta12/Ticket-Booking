const seatService = require('../services/seatService');

const bookSeats = async (req, res) => {
  const { numOfSeats } = req.body;

  if (numOfSeats > 7 || numOfSeats <= 0) {
    return res.status(400).json({ message: "You can only book between 1 to 7 seats." });
  }

  try {
    const bookedSeats = await seatService.bookSeats(numOfSeats);
    return res.status(200).json({ data: bookedSeats });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Not enough seats available!" });
  }
};

const getAllSeats = async (req, res) => {
  try {
    const seats = await seatService.getAllSeats();
    res.status(200).json(seats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const resetSeats = async (req, res) => {
  try {
    await seatService.resetSeats();
    res.status(200).json({ message: "All seats have been reset." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  bookSeats,
  getAllSeats,
  resetSeats,
};
