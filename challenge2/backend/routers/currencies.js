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
router.post("/", auth, addCurrency);
router.patch("/:id", auth, updateCurrency);
router.delete("/:id", auth, deleteCurrency);

export default router;
