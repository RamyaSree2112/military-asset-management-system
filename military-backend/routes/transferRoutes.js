const express = require("express");
const router = express.Router();

const transferController = require("../controllers/transferController");
const auth = require("../middleware/auth");

// CREATE (Admin + Commander)
router.post("/", auth(["Admin", "Commander"]), transferController.transferAsset);

// GET ALL (all roles)
router.get("/", auth(["Admin", "Commander", "Logistics"]), transferController.getTransfers);

// OPTIONAL
router.get("/:id", transferController.getTransferById);
router.delete("/:id", transferController.deleteTransfer);

module.exports = router;