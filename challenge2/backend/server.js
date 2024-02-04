import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import users from "./routers/users.js";
import currencies from "./routers/currencies.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", users);
app.use("/currencies", currencies);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
