const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");

router.post("/", async (req, res) => {
  try {
    const { dealerId } = req.user;
    const inventory = new Inventory({ ...req.body, dealerId });
    await inventory.save();
    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all car listings
router.get("/", async (req, res) => {
  try {
    const { dealerId } = req.user;
    const inventory = await Inventory.find({ dealerId });
    res.status(200).json({
      status: "success",
      length: inventory.length,
      data: {
        inventory,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific car listing by ID
router.put("/:id", async (req, res) => {
  try {
    const { dealerId } = req.user;
    const updatedInventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInventory)
      return res.status(404).json({ error: "Inventory item not found" });

    if (car.dealerId.toString() !== dealerId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this car" });
    }

    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete one or multiple car listings by ID
router.delete("/", async (req, res) => {
  try {
     const { dealerId } = req.user;  
    const { ids } = req.body; // Expecting an array of IDs
    const deleted = await Inventory.findByIdAndDelete(ids);
    // const Multipledeleted = await Inventory.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: `${deleted.deletedCount} items deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
