const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Import routes
const trainerRoutes = require('./routes/trainer.routes');

// Import error middleware
const errorMiddleware = require('./middleware/error.middleware');

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/trainers', trainerRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Trainer Management API',
    documentation: '/api-docs',
    version: '1.0.0'
  });
});

// Swagger documentation
try {
  const swaggerDocument = YAML.load(path.join(__dirname, 'docs/swagger.yaml'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.error('Unable to load Swagger documentation:', error.message);
}

// Error handling middleware
app.use(errorMiddleware);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

module.exports = app;