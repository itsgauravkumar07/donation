const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const campaignRoutes = require("./routes/campaignRoutes");
const donationRoutes = require("./routes/donationRoutes");
const statsRoutes = require("./routes/statsRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/donations", donationRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Donation Tracking API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});