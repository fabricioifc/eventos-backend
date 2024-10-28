
const TodoService = require('../services/todoService');

class TodoController {
    async createTodo(req, res) {
        try {
            const todo = req.body;
            const newTodo = await TodoService.create(todo);
            res.status(201).json(newTodo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getTodos(req, res) {
        try {
            const todos = await TodoService.findAll();
            res.status(200).json(todos);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getTodoById(req, res) {
        try {
            const id = req.params.id;
            const todo = await TodoService.findById(id);
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json(todo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateTodo(req, res) {
        try {
            const id = req.params.id;
            const todo = req.body;
            const updatedTodo = await TodoService.update(id, todo);
            if (!updatedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json(updatedTodo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteTodo(req, res) {
        try {
            const id = req.params.id;
            const deletedTodo = await TodoService.delete(id);
            if (!deletedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(204).json();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new TodoController();