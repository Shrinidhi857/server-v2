import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controller/userController.js";
import validateUser from "../middleware/inputValidator.js";

const router = express.Router();

router.post("/", validateUser, createUser);
router.get("/all", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", validateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;
