
//1. Load environment variables
require('dotenv').config();

//2. Import libraries
const express = require('express');
const cors = require('cors')

console.log('Backend started');

//3. Create the app
const app = express();
app.use(cors())

// Add express.json() BEFORE all route registrations
app.use(express.json());

// attach  API for instructor, courses,...
app.use('/instructors', require('./src/routes/instructors'));
app.use('/courses', require('./src/routes/courses'));
app.use('/aircraft_types', require('./src/routes/aircraft_types'));
app.use('/authorizations', require('./src/routes/authorizations'));
app.use('/check_events', require('./src/routes/check_events'));
app.use('/course_aircraft_mm', require('./src/routes/course_aircraft_mm'));

//5. Import Routes
const testDbRoutes = require('./src/routes/test-db');

//6. Register Routes
app.use('/test-db', testDbRoutes);

//7. Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
