const Purchase = require("../models/Purchase");
const Asset = require("../models/Asset");

// ✅ CREATE PURCHASE (Admin)
exports.createPurchase = async (req, res) => {
  try {
    const { assetName, quantity, base } = req.body;

    // 🔥 validation
    if (!assetName || !quantity || !base) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔥 update asset quantity
    await Asset.findOneAndUpdate(
      { assetName, base },
      { $inc: { quantity: Number(quantity) } }, // ✅ convert to number
      { upsert: true, new: true }
    );

    // 🔥 save purchase record
    const purchase = new Purchase({
      assetName,
      quantity: Number(quantity),
      base
    });

    await purchase.save();

    res.status(201).json({
      message: "Purchase added successfully",
      purchase
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL PURCHASES (for dashboard)
exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ date: -1 });

    res.json(purchases);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET SINGLE PURCHASE (optional)
exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.json(purchase);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE PURCHASE (optional)
exports.deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.id);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.json({ message: "Purchase deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};