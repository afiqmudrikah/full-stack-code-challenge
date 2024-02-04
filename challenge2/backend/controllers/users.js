import pool from "../db.js";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM user WHERE username = ? && password = ?",
      [username, password]
    );

    const rows = user[0];

    if (rows.length == 0) {
      return res.json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    console.log(rows[0].username);

    const payload = {
      username: rows[0].username,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET);

    res.json({
      accessToken,
      status: "ok",
      message: "User logged in",
    });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", message: "Unable to login" });
  }
};

export { loginUser };
