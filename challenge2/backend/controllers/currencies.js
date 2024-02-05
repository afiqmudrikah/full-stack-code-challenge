import pool from "../db.js";

const getAllCurrencies = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM currency");

    const rows = result[0];

    if (rows.length == 0) {
      return res.json({
        status: "error",
        message: "No results",
      });
    }

    res.json(rows);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", message: "Unable to retrieve data" });
  }
};

const addCurrency = async (req, res) => {
  try {
    const base = req.body.base.trim().toUpperCase();
    const counter = req.body.counter.trim().toUpperCase();
    const rate = parseFloat(req.body.rate);

    if (base.length !== 3 || counter.length !== 3) {
      return res.json({
        status: "error",
        message: "Base and counter must be 3 chars long",
      });
    }

    if (isNaN(rate)) {
      return res.json({
        status: "error",
        message: "Rate must be a number",
      });
    }

    await pool.query(
      "INSERT INTO currency (base, counter, rate) VALUES (?,?,?)",
      [base, counter, rate]
    );

    res.json({ status: "ok", message: "Added currency" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", message: "Unable to add" });
  }
};

const updateCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const base = req.body.base.trim().toUpperCase();
    const counter = req.body.counter.trim().toUpperCase();
    const rate = parseFloat(req.body.rate);

    if (base.length !== 3 || counter.length !== 3) {
      return res.json({
        status: "error",
        message: "Base and counter must be 3 chars long",
      });
    }

    if (isNaN(rate)) {
      return res.json({
        status: "error",
        message: "Rate must be a number",
      });
    }

    await pool.query(
      "UPDATE currency SET base = ?, counter = ?, rate = ? WHERE id = ?",
      [base, counter, rate, id]
    );

    res.json({ status: "ok", message: "Updated currency" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", message: "Unable to update" });
  }
};

const deleteCurrency = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM currency WHERE id = ?", [id]);

    res.json({ status: "ok", message: "Deleted currency" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", message: "Unable to update" });
  }
};

export { getAllCurrencies, addCurrency, updateCurrency, deleteCurrency };
