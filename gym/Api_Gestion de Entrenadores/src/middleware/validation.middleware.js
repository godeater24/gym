const Joi = require('joi');
const ApiError = require('../utils/api-error');

// Validation schema for trainer
const trainerSchema = Joi.object({
  nombre: Joi.string().required().min(2).max(100),
  especialidad: Joi.string().required().min(2).max(100),
  horarios: Joi.array().items(Joi.string()).min(1).required(),
  certificaciones: Joi.array().items(Joi.string()).required()
});

// Middleware to validate trainer data
const validateTrainer = (req, res, next) => {
  const { error } = trainerSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    return next(new ApiError(400, errorMessage));
  }
  
  next();
};

// Middleware to validate ID parameter
const validateId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id) {
    return next(new ApiError(400, 'ID parameter is required'));
  }
  
  next();
};

module.exports = {
  validateTrainer,
  validateId
};