const express = require("express");
const router = express.Router();

const purchaseController = require("../controllers/purchaseController");
const auth = require("../middleware/auth");

// CREATE (Admin only)
router.post("/", auth(["Admin"]), purchaseController.createPurchase);

// GET ALL (all roles)
router.get("/", auth(["Admin", "Commander", "Logistics"]), purchaseController.getPurchases);

// OPTIONAL
router.get("/:id", purchaseController.getPurchaseById);
router.delete("/:id", purchaseController.deletePurchase);

module.exports = router;