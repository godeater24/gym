const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Trainer Management API running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});