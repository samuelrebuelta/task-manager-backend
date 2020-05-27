const Task = require('../models/task');

// Fetch tasks
exports.fetchTasks = (req, res) => {
    Task.find({ user: req.user }).sort({ creationDate: 'asc' })
        .then(data => { res.status(200).json({ message: 'Tasks fetched succesfully', data }); })
        .catch(error => res.status(400).json({ message: 'Error', error }));
}

// Create task
exports.postTask = function (req, res) {
    const { _id, description } = req.body;
    const user = req.user;
    const task = new Task({
        _id,
        user,
        description,
        priority: 'High',
        creationDate: new Date(),
        completed: false
    });
    task.save()
        .then(() => res.status(200).json({ message: 'Task added successfully' }))
        .catch(error => res.status(500).json({ message: 'Error', error }));
}

// Update task
exports.putTask = (req, res) => {
    const { completed, description } = req.body;
    Task.findOneAndUpdate({ _id: req.params.id }, { $set: { completed, description } }, { upsert: true })
        .then(() => res.status(200).json({ message: 'Task status updated succesfully' }))
        .catch(error => res.status(400).json({ message: 'Error', error }));
}

// Delete task
exports.deleteTask = (req, res) => {
    Task.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Task deleted succesfully' }))
        .catch(error => res.status(400).json({ message: 'Error', error }));
}