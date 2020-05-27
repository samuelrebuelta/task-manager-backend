const express = require('express');
const authController = require('../controllers/auth')
const api = express.Router();

api.post('/api/signUp', authController.signUp);
api.post('/api/signIn', authController.signIn);

module.exports = api;
