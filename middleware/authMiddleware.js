import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    req.user = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
};
export default authMiddleware;
