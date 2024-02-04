import express from "express";
const router = express.Router();

import { loginUser } from "../controllers/users.js";

router.post("/", loginUser);

export default router;
