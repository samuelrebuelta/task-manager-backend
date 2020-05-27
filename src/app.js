const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('./database');
app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
app.use(authRoutes);
app.use(taskRoutes);

module.exports = app;

