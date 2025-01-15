const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");

router.post("/", async (req, res) => {
  try {
    const inventory = new Inventory({ ...req.body });
    await inventory.save();
    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all car listings
router.get("/", async (req, res) => {
  try {
    const inventory = await Inventory.find();
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
    const updatedInventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInventory)
      return res.status(404).json({ error: "Inventory item not found" });

    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete one or multiple car listings by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Expecting an array of IDs
    console.log(id);
    const deleted = await Inventory.findByIdAndDelete({_id : id});
    // const Multipledeleted = await Inventory.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: ` item deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
