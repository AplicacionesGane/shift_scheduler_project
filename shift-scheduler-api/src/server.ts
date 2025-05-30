import express from 'express';
import { json } from 'body-parser';
import { connectDatabase } from './infrastructure/persistence/database';
import routes from './presentation/routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());

// Connect to the database
connectDatabase();

// Routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});