const express = require('express');
const router = express.Router();
const TrainerController = require('../controllers/trainer.controller');
const { validateTrainer, validateId } = require('../middleware/validation.middleware');

// GET /trainers - List all trainers
router.get('/', TrainerController.getAllTrainers);

// GET /trainers/:id - Get a specific trainer by ID
router.get('/:id', validateId, TrainerController.getTrainerById);

// POST /trainers - Create a new trainer
router.post('/', validateTrainer, TrainerController.createTrainer);

// PUT /trainers/:id - Update a trainer
router.put('/:id', validateId, validateTrainer, TrainerController.updateTrainer);

// DELETE /trainers/:id - Delete a trainer
router.delete('/:id', validateId, TrainerController.deleteTrainer);

// GET /trainers/:id/activities - Get activities for a trainer
router.get('/:id/activities', validateId, TrainerController.getTrainerActivities);

module.exports = router;