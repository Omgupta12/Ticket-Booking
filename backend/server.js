const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const seatRoutes = require("./routes/seatRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
