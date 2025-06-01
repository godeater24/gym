# Trainer Management API

A RESTful API for managing gym trainers and their activities.

## Features

- Complete CRUD operations for trainers
- Endpoint to list activities by trainer
- Data validation
- Error handling
- API documentation with Swagger

## Installation

```bash
# Install dependencies
npm install

# Start the server
npm start

# Start the server with auto-reload (development)
npm run dev
```

## API Endpoints

Base path: `/trainers`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /trainers | List all trainers |
| GET | /trainers/{id} | Get a specific trainer |
| POST | /trainers | Create a new trainer |
| PUT | /trainers/{id} | Update a trainer |
| DELETE | /trainers/{id} | Delete a trainer |
| GET | /trainers/{id}/activities | List activities for a trainer |

## Trainer Model

```json
{
  "id": "string",
  "nombre": "string",
  "especialidad": "string",
  "horarios": ["lunes 8am", "miércoles 10am"],
  "certificaciones": ["string"]
}
```

## API Documentation

Swagger documentation is available at `/api-docs` when the server is running.

## Sample Requests

### Get all trainers

```bash
curl -X GET http://localhost:3000/trainers
```

### Get a specific trainer

```bash
curl -X GET http://localhost:3000/trainers/1
```

### Create a new trainer

```bash
curl -X POST http://localhost:3000/trainers \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana López",
    "especialidad": "Pilates",
    "horarios": ["martes 11am", "jueves 11am"],
    "certificaciones": ["Pilates Method Alliance", "BASI Pilates"]
  }'
```

### Update a trainer

```bash
curl -X PUT http://localhost:3000/trainers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "especialidad": "CrossFit",
    "horarios": ["lunes 8am", "miércoles 10am", "viernes 8am"],
    "certificaciones": ["CrossFit Level 1", "CrossFit Level 2", "NASM CPT"]
  }'
```

### Delete a trainer

```bash
curl -X DELETE http://localhost:3000/trainers/1
```

### Get activities for a trainer

```bash
curl -X GET http://localhost:3000/trainers/1/activities
```