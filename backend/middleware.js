import { JWT_SECRET } from "./config";

const jwt = require("jsonwebtoken");

export function authMiddleware(req, res, next) {
  const tokenPayload = req.headers?.authorization;
  if (!tokenPayload) {
    return res.status(401).json({
      error: "Unauthorized: No token provided",
    });
  }
  const tokenArray = tokenPayload.split(" ");
  if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
  const token = tokenArray[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}
