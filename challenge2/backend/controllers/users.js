import pool from "../db.js";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
  try {
    const username = req.body.username.trim();
    const password = req.body.password;

    const user = await pool.query(
      "SELECT * FROM user WHERE username = ? && password = ?",
      [username, password]
    );

    const rows = user[0];

    if (rows.length == 0) {
      return res.json({
        status: "error",
        message: "Invalid username or password",
      });
    }

    const payload = {
      username: rows[0].username,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET);

    res.json({
      status: "ok",
      message: "User logged in",
      accessToken,
    });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", message: "Unable to login" });
  }
};

export { loginUser };
