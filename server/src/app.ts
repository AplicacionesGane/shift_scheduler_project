import express from 'express';
import bodyParser from 'body-parser';
import { json, urlencoded } from 'express';
import routes from './presentation/routes/index';
import errorHandler from './presentation/middleware/errorHandler';
import { connectDatabase } from './infrastructure/persistence/database';

const app = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Connect to the database
connectDatabase();

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

export default app;