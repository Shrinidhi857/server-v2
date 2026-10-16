// Standardized response functions

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

const handlePaginatedResponse = (res, status, message, data, page, limit, total) => {
  res.status(status).json({
    status,
    message,
    data,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const newUser = await createUserService(name, email);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  try {
    const allUsers = await getAllUsersService();
    const total = allUsers.length;
    const startIndex = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(startIndex, startIndex + limit);

    handlePaginatedResponse(
      res,
      200,
      "Users fetched with pagination successfully",
      paginatedUsers,
      page,
      limit,
      total
    );
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const id = req.params.id || req.body.id;

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

    handleResponse(res, 200, "User updated successfully", updatedUser);
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
