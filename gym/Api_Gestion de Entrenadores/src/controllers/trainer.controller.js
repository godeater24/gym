const TrainerService = require('../services/trainer.service');
const ActivityService = require('../services/activity.service');
const ApiError = require('../utils/api-error');

class TrainerController {
  // Get all trainers
  static async getAllTrainers(req, res, next) {
    try {
      const trainers = await TrainerService.getAllTrainers();
      return res.status(200).json({
        status: 'success',
        data: {
          count: trainers.length,
          trainers
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get a specific trainer by ID
  static async getTrainerById(req, res, next) {
    try {
      const { id } = req.params;
      const trainer = await TrainerService.getTrainerById(id);
      
      if (!trainer) {
        throw new ApiError(404, `Trainer with ID ${id} not found`);
      }
      
      return res.status(200).json({
        status: 'success',
        data: {
          trainer
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Create a new trainer
  static async createTrainer(req, res, next) {
    try {
      const trainerData = req.body;
      const newTrainer = await TrainerService.createTrainer(trainerData);
      
      return res.status(201).json({
        status: 'success',
        message: 'Trainer created successfully',
        data: {
          trainer: newTrainer
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Update a trainer
  static async updateTrainer(req, res, next) {
    try {
      const { id } = req.params;
      const trainerData = req.body;
      
      const updatedTrainer = await TrainerService.updateTrainer(id, trainerData);
      
      if (!updatedTrainer) {
        throw new ApiError(404, `Trainer with ID ${id} not found`);
      }
      
      return res.status(200).json({
        status: 'success',
        message: 'Trainer updated successfully',
        data: {
          trainer: updatedTrainer
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete a trainer
  static async deleteTrainer(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await TrainerService.deleteTrainer(id);
      
      if (!deleted) {
        throw new ApiError(404, `Trainer with ID ${id} not found`);
      }
      
      return res.status(200).json({
        status: 'success',
        message: 'Trainer deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Get activities for a trainer
  static async getTrainerActivities(req, res, next) {
    try {
      const { id } = req.params;
      
      // Check if trainer exists
      const trainer = await TrainerService.getTrainerById(id);
      if (!trainer) {
        throw new ApiError(404, `Trainer with ID ${id} not found`);
      }
      
      // Get activities for the trainer
      const activities = await ActivityService.getActivitiesByTrainerId(id);
      
      return res.status(200).json({
        status: 'success',
        data: {
          trainer: {
            id: trainer.id,
            nombre: trainer.nombre
          },
          count: activities.length,
          activities
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TrainerController;