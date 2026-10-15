// standaradized response function

import {
  createUserService,
  getAllUsersService,
  deleteUsersService,
  updateUsersService,
  getUserByIdService,
} from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const newUser = await createUserService(name, email);
    handleResponse(res, 201, "User created Successfully", newUser);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.body;

  try {
    const user = await getUserByIdService(id);
    if (!user) return handleResponse(res, 404, "User not found.");

    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const updatedUser = await updateUsersService(req.params.id, name, email);
    if (!updatedUser) return handleResponse(res, 404, "User not found.");

    handleResponse(res, 200, "User Updated successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await deleteUsersService(id);
    if (!user) return handleResponse(res, 404, "User not found.");

    handleResponse(res, 200, "User deleted successfully", user);
  } catch (err) {
    next(err);
  }
};
