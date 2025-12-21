const Dish = require("../models/Dish");

const SuggestionController = {
  // GET /api/suggestions
  getSuggestions: async (req, res) => {
    try {
      const dishes = await Dish.find();
      res.json(dishes);
    } catch (err) {
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  },
};

module.exports = SuggestionController;

