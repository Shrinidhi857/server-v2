import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controller/userController.js";
import validateUser from "../middleware/inputValidator.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User management endpoints
router.post("/", validateUser("createUser"), createUser);
router.get("/", protect, getAllUsers); // Paginated: ?page=1&limit=10
router.get("/all", protect, getAllUsers); // Backward compatibility
router.get("/:id", protect, getUser);
router.put("/:id", protect, validateUser("updateUser"), updateUser);
router.delete("/:id", protect, deleteUser);

export default router;
