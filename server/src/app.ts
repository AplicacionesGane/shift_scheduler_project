import { routerEmploye } from './presentation/routes/employee.routes';
import { routerStores } from './presentation/routes/stores.routes';
import { routerMocks } from '@presentation/routes/mocks.routes';


import { sequelize } from '@infrastructure/persistence/database';
import express from 'express';
import { routerShift } from './presentation/routes/shift.routes';

const app = express();

// Middleware to parse JSON bodies
app.disable('x-powered-by')
    .use(express.json())
    .use(express.urlencoded({ extended: true }));


// test route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API',
        status: 'success',
    });
});

// implement routes
app.use('/api', routerEmploye);
app.use('/api', routerStores);
app.use('/api', routerMocks);
app.use('/api', routerShift);

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit the process if the database connection fails
    });

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
