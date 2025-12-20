const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const Dish = require("../models/Dish");
const mongoose = require("mongoose");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { categories } = req.body;

    let dishes;

    // ❗ KHÔNG lọc → 1 card random
    if (!categories || categories.length === 0) {
      dishes = await Dish.aggregate([
        { $match: { isAvailable: true } },
        { $sample: { size: 1 } },
      ]);
    } 
    // ❗ CÓ lọc → 3 card
    else {
      dishes = await Dish.aggregate([
        {
          $match: {
            isAvailable: true,
            categoryId: {
              $in: categories.map(
                (id) => new mongoose.Types.ObjectId(id)
              ),
            },
          },
        },
        { $sample: { size: 3 } },
      ]);
    }

    res.json(dishes);
  } catch (error) {
    console.error("❌ Omakase error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
