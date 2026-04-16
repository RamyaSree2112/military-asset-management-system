const Asset = require("../models/Asset");

// add asset
exports.addAsset = async (req, res) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all assets
exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};