# API Documentation

## Overview

The Shift Scheduler API provides endpoints for managing employees, shifts, work schedules, and stores. It is built using TypeScript, Express, Sequelize, and MySQL.

## Base URL

The base URL for all API endpoints is:

```
http://localhost:3000/api
```

## Endpoints

### Employees

#### Create Employee

- **POST** `/employees`
- **Description**: Create a new employee.
- **Request Body**:
  ```json
  {
    "name": "string",
    "role": "string"
  }
  ```
- **Response**:
  - **201 Created**: Employee created successfully.
  - **400 Bad Request**: Validation errors.

#### Get Employees

- **GET** `/employees`
- **Description**: Retrieve a list of all employees.
- **Response**:
  - **200 OK**: Returns an array of employees.

#### Get Employee by ID

- **GET** `/employees/:id`
- **Description**: Retrieve a specific employee by ID.
- **Response**:
  - **200 OK**: Returns the employee object.
  - **404 Not Found**: Employee not found.

#### Update Employee

- **PUT** `/employees/:id`
- **Description**: Update an existing employee.
- **Request Body**:
  ```json
  {
    "name": "string",
    "role": "string"
  }
  ```
- **Response**:
  - **200 OK**: Employee updated successfully.
  - **404 Not Found**: Employee not found.
  - **400 Bad Request**: Validation errors.

#### Delete Employee

- **DELETE** `/employees/:id`
- **Description**: Delete an employee.
- **Response**:
  - **204 No Content**: Employee deleted successfully.
  - **404 Not Found**: Employee not found.

### Shifts

#### Create Shift

- **POST** `/shifts`
- **Description**: Create a new shift.
- **Request Body**:
  ```json
  {
    "startTime": "string",
    "endTime": "string"
  }
  ```
- **Response**:
  - **201 Created**: Shift created successfully.
  - **400 Bad Request**: Validation errors.

#### Get Shifts

- **GET** `/shifts`
- **Description**: Retrieve a list of all shifts.
- **Response**:
  - **200 OK**: Returns an array of shifts.

#### Get Shift by ID

- **GET** `/shifts/:id`
- **Description**: Retrieve a specific shift by ID.
- **Response**:
  - **200 OK**: Returns the shift object.
  - **404 Not Found**: Shift not found.

#### Update Shift

- **PUT** `/shifts/:id`
- **Description**: Update an existing shift.
- **Request Body**:
  ```json
  {
    "startTime": "string",
    "endTime": "string"
  }
  ```
- **Response**:
  - **200 OK**: Shift updated successfully.
  - **404 Not Found**: Shift not found.
  - **400 Bad Request**: Validation errors.

#### Delete Shift

- **DELETE** `/shifts/:id`
- **Description**: Delete a shift.
- **Response**:
  - **204 No Content**: Shift deleted successfully.
  - **404 Not Found**: Shift not found.

### Work Schedules

#### Get Work Schedule

- **GET** `/schedules`
- **Description**: Retrieve the work schedule for all employees.
- **Response**:
  - **200 OK**: Returns the work schedule.

### Stores

#### Create Store

- **POST** `/stores`
- **Description**: Create a new store.
- **Request Body**:
  ```json
  {
    "name": "string",
    "location": "string"
  }
  ```
- **Response**:
  - **201 Created**: Store created successfully.
  - **400 Bad Request**: Validation errors.

#### Get Stores

- **GET** `/stores`
- **Description**: Retrieve a list of all stores.
- **Response**:
  - **200 OK**: Returns an array of stores.

#### Get Store by ID

- **GET** `/stores/:id`
- **Description**: Retrieve a specific store by ID.
- **Response**:
  - **200 OK**: Returns the store object.
  - **404 Not Found**: Store not found.

#### Update Store

- **PUT** `/stores/:id`
- **Description**: Update an existing store.
- **Request Body**:
  ```json
  {
    "name": "string",
    "location": "string"
  }
  ```
- **Response**:
  - **200 OK**: Store updated successfully.
  - **404 Not Found**: Store not found.
  - **400 Bad Request**: Validation errors.

#### Delete Store

- **DELETE** `/stores/:id`
- **Description**: Delete a store.
- **Response**:
  - **204 No Content**: Store deleted successfully.
  - **404 Not Found**: Store not found.

## Error Handling

All error responses will include a JSON object with the following structure:

```json
{
  "error": "string",
  "message": "string"
}
```

## Conclusion

This API documentation provides a comprehensive overview of the endpoints available in the Shift Scheduler API. For further details, please refer to the source code or contact the development team.