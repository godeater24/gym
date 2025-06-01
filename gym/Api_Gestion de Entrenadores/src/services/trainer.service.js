const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/api-error');

// In-memory trainers database
let trainers = [];

class TrainerService {
  // Get all trainers
  static async getAllTrainers() {
    return trainers;
  }

  // Get trainer by ID
  static async getTrainerById(id) {
    return trainers.find(trainer => trainer.id === id);
  }

  // Create a new trainer
  static async createTrainer(trainerData) {
    const newTrainer = {
      id: uuidv4(),
      ...trainerData
    };
    
    trainers.push(newTrainer);
    return newTrainer;
  }

  // Update a trainer
  static async updateTrainer(id, trainerData) {
    const index = trainers.findIndex(trainer => trainer.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const updatedTrainer = {
      ...trainers[index],
      ...trainerData,
      id // Ensure ID doesn't change
    };
    
    trainers[index] = updatedTrainer;
    return updatedTrainer;
  }

  // Delete a trainer
  static async deleteTrainer(id) {
    const initialLength = trainers.length;
    trainers = trainers.filter(trainer => trainer.id !== id);
    
    return initialLength > trainers.length;
  }

  // Seed some initial trainers for testing
  static seedTrainers() {
    trainers = [
      {
        id: "1",
        nombre: "Juan Pérez",
        especialidad: "Entrenamiento funcional",
        horarios: ["lunes 8am", "miércoles 10am", "viernes 8am"],
        certificaciones: ["CrossFit Level 1", "NASM CPT"]
      },
      {
        id: "2",
        nombre: "María González",
        especialidad: "Yoga",
        horarios: ["martes 9am", "jueves 5pm", "sábado 10am"],
        certificaciones: ["Yoga Alliance 200HR", "Yoga Therapy"]
      },
      {
        id: "3",
        nombre: "Carlos Rodríguez",
        especialidad: "Musculación",
        horarios: ["lunes 6pm", "miércoles 6pm", "viernes 6pm"],
        certificaciones: ["NSCA CSCS", "IFBB Pro"]
      }
    ];
    return trainers;
  }
}

// Seed initial data
TrainerService.seedTrainers();

module.exports = TrainerService;