const express = require("express");
const Campaign = require("../models/Campaign");

const router = express.Router();

// Create Campaign
router.post("/", async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find();

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;