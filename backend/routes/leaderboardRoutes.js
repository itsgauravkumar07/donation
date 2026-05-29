const express = require("express");
const Donation = require("../models/Donation");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const leaderboard = await Donation.aggregate([
      {
        $group: {
          _id: "$donorName",
          totalDonated: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          totalDonated: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;