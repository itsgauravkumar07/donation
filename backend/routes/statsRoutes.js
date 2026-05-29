const express = require("express");
const Campaign = require("../models/Campaign");
const Donation = require("../models/Donation");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalCampaigns = await Campaign.countDocuments();

    const totalDonations = await Donation.countDocuments();

    const totalRaisedResult = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmountRaised: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalAmountRaised =
      totalRaisedResult.length > 0
        ? totalRaisedResult[0].totalAmountRaised
        : 0;

    res.json({
      totalCampaigns,
      totalDonations,
      totalAmountRaised,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;