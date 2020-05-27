const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    id: String,
    user: String,
    description: String,
    priority: { type: String, enum: ['High', 'Low'] },
    creationDate: Date,
    completed: Boolean
});

module.exports = mongoose.model('Task', taskSchema);