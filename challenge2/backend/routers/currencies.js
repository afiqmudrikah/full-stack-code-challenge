import express from "express";
import {
  addCurrency,
  deleteCurrency,
  getAllCurrencies,
  updateCurrency,
} from "../controllers/currencies.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllCurrencies);
router.post("/", addCurrency);
router.patch("/:id", updateCurrency);
router.delete("/:id", deleteCurrency);

export default router;
