const express = require("express");
const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");

const router = express.Router();

// Create Donation
router.post("/", async (req, res) => {
  try {
    const { donorName, email, amount, campaignId } = req.body;

    if (!donorName || !email || !amount || !campaignId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    const donation = await Donation.create({
      donorName,
      email,
      amount,
      campaignId,
    });

    // Update campaign raised amount
    campaign.raisedAmount += Number(amount);
    await campaign.save();

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Donations
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("campaignId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Single Donation
router.get("/:id", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate("campaignId", "title");

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;