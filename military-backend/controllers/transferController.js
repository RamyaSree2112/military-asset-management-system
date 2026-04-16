const Transfer = require("../models/Transfer");
const Asset = require("../models/Asset");

// ✅ CREATE TRANSFER
exports.transferAsset = async (req, res) => {
  try {
    const { assetName, quantity, fromBase, toBase } = req.body;

    // 🔥 validation
    if (!assetName || !quantity || !fromBase || !toBase) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const qty = Number(quantity);

    if (qty <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    // 🔥 check available stock
    const sourceAsset = await Asset.findOne({
      assetName,
      base: fromBase
    });

    if (!sourceAsset || sourceAsset.quantity < qty) {
      return res.status(400).json({
        message: "Not enough stock in source base"
      });
    }

    // 🔥 reduce from source
    await Asset.findOneAndUpdate(
      { assetName, base: fromBase },
      { $inc: { quantity: -qty } }
    );

    // 🔥 add to destination
    await Asset.findOneAndUpdate(
      { assetName, base: toBase },
      { $inc: { quantity: qty } },
      { upsert: true, new: true }
    );

    // 🔥 save transfer record
    const transfer = new Transfer({
      assetName,
      quantity: qty,
      fromBase,
      toBase
    });

    await transfer.save();

    res.status(201).json({
      message: "Transfer successful",
      transfer
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};



// ✅ GET ALL TRANSFERS (for dashboard)
exports.getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find().sort({ date: -1 });

    res.json(transfers);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ GET SINGLE TRANSFER (optional)
exports.getTransferById = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id);

    if (!transfer) {
      return res.status(404).json({ message: "Transfer not found" });
    }

    res.json(transfer);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ DELETE TRANSFER (optional)
exports.deleteTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findByIdAndDelete(req.params.id);

    if (!transfer) {
      return res.status(404).json({ message: "Transfer not found" });
    }

    res.json({ message: "Transfer deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};