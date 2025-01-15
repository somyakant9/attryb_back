const express = require("express");
const router = express.Router();
const Oem = require("../models/OemSpec");
const OemSpec = require("../models/OemSpec");

// Get all OEM specs
router.get("/", async (req, res) => {
  try {
    const oemSpecs = await OemSpec.find();
    res.status(200).json({
      status: "success",
      results: oemSpecs.length,
      data: {
        oemSpecs,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search OEM specs by model and year
router.get("/search", async (req, res) => {
  const { model, year } = req.query;
  try {
    const oemSpecs = await OemSpec.find({ model, year });
    res.status(200).json(oemSpecs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
