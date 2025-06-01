const { v4: uuidv4 } = require('uuid');

// In-memory activities database
let activities = [
  {
    id: "1",
    nombre: "Entrenamiento funcional - principiantes",
    descripcion: "Clase de entrenamiento funcional para principiantes",
    trainerId: "1",
    duracion: 60, // minutos
    capacidad: 15,
    dias: ["lunes", "miércoles", "viernes"],
    hora: "8am"
  },
  {
    id: "2",
    nombre: "Entrenamiento funcional - avanzado",
    descripcion: "Clase de entrenamiento funcional para nivel avanzado",
    trainerId: "1",
    duracion: 60, // minutos
    capacidad: 10,
    dias: ["miércoles"],
    hora: "10am"
  },
  {
    id: "3",
    nombre: "Yoga para principiantes",
    descripcion: "Clase de yoga para principiantes",
    trainerId: "2",
    duracion: 75, // minutos
    capacidad: 20,
    dias: ["martes", "jueves"],
    hora: "9am"
  },
  {
    id: "4",
    nombre: "Power Yoga",
    descripcion: "Clase de yoga de alta intensidad",
    trainerId: "2",
    duracion: 60, // minutos
    capacidad: 15,
    dias: ["sábado"],
    hora: "10am"
  },
  {
    id: "5",
    nombre: "Musculación - Tren superior",
    descripcion: "Clase enfocada en ejercicios para el tren superior",
    trainerId: "3",
    duracion: 90, // minutos
    capacidad: 8,
    dias: ["lunes", "viernes"],
    hora: "6pm"
  },
  {
    id: "6",
    nombre: "Musculación - Tren inferior",
    descripcion: "Clase enfocada en ejercicios para el tren inferior",
    trainerId: "3",
    duracion: 90, // minutos
    capacidad: 8,
    dias: ["miércoles"],
    hora: "6pm"
  }
];

class ActivityService {
  // Get all activities
  static async getAllActivities() {
    return activities;
  }

  // Get activities by trainer ID
  static async getActivitiesByTrainerId(trainerId) {
    return activities.filter(activity => activity.trainerId === trainerId);
  }

  // Get activity by ID
  static async getActivityById(id) {
    return activities.find(activity => activity.id === id);
  }

  // Create a new activity
  static async createActivity(activityData) {
    const newActivity = {
      id: uuidv4(),
      ...activityData
    };
    
    activities.push(newActivity);
    return newActivity;
  }

  // Update an activity
  static async updateActivity(id, activityData) {
    const index = activities.findIndex(activity => activity.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const updatedActivity = {
      ...activities[index],
      ...activityData,
      id // Ensure ID doesn't change
    };
    
    activities[index] = updatedActivity;
    return updatedActivity;
  }

  // Delete an activity
  static async deleteActivity(id) {
    const initialLength = activities.length;
    activities = activities.filter(activity => activity.id !== id);
    
    return initialLength > activities.length;
  }
}

module.exports = ActivityService;