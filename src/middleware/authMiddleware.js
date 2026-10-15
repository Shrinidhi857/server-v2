import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized: No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

// Global middleware to log auth attempts (optional)
const authMiddleware = (req, res, next) => {
  console.log(`[AUTH] ${req.method} ${req.originalUrl}`);
  next();
};

export default authMiddleware;
