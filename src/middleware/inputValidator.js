const schemas = {
  createUser: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  updateUser: Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
  }),
};

const validateUser = (schemaName = "createUser") => {
  return (req, res, next) => {
    const { error } = schemas[schemaName].validate(req.body);
    if (error)
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    next();
  };
};
export default validateUser;
