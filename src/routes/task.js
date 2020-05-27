const express = require('express');
const taskController = require('../controllers/task')
const api = express.Router();
const { isAuth } = require('../controllers/auth');

api.get('/api/tasks', isAuth, taskController.fetchTasks);
api.post('/api/task', isAuth, taskController.postTask);
api.put('/api/task/:id/update', isAuth, taskController.putTask);
api.delete('/api/task/:id/delete', isAuth, taskController.deleteTask);

module.exports = api;