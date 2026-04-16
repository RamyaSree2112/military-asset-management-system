const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");
const auth = require("../middleware/auth");

router.post("/add", assetController.addAsset);

router.get("/", auth(["Admin", "Commander", "Logistics"]), assetController.getAssets);

module.exports = router;