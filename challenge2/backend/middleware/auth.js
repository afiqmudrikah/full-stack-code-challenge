import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", message: "No token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      jwt.verify(token, process.env.ACCESS_SECRET);
      next();
    } catch (error) {
      console.log(error.name);
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }
  } else {
    return res.status(403).json({ status: "error", message: "Missing token" });
  }
};

export { auth };
