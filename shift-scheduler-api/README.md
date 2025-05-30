# Shift Scheduler API

## Overview
The Shift Scheduler API is a backend service designed to manage employee scheduling, shifts, and work schedules for retail or service-oriented businesses. Built using TypeScript, Express, Sequelize, and MySQL, this API provides a robust and scalable solution for managing employee shifts and schedules.

## Features
- **Employee Management**: Create, read, update, and delete employee records.
- **Shift Management**: Define shifts with start and end times.
- **Work Schedule Management**: Assign shifts to employees and manage their schedules.
- **Store Management**: Manage multiple store locations and their respective schedules.

## Technologies Used
- **TypeScript**: For type safety and better development experience.
- **Express**: A web framework for building the API.
- **Sequelize**: An ORM for interacting with the MySQL database.
- **MySQL**: The database used for storing application data.

## Project Structure
```
shift-scheduler-api
├── src
│   ├── domain
│   ├── application
│   ├── infrastructure
│   ├── presentation
│   ├── app.ts
│   └── server.ts
├── tests
├── migrations
├── seeders
├── docs
├── package.json
├── tsconfig.json
├── bunfig.toml
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- MySQL
- Bun

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd shift-scheduler-api
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Set up the database:
   - Create a MySQL database for the application.
   - Update the `.env.example` file with your database credentials and rename it to `.env`.

4. Run migrations:
   ```
   bun run migrate
   ```

5. Seed initial data (optional):
   ```
   bun run seed
   ```

### Running the Application
To start the server, run:
```
bun run start
```

The API will be available at `http://localhost:3000`.

## API Documentation
Refer to `docs/api.md` for detailed API endpoints and usage.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.