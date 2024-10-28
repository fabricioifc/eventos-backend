const TodoRepository = require('../repositories/todoRepository');

class TodoService {
    async create(todo) {
        return await TodoRepository.create(todo);
    }

    async findAll() {
        return await TodoRepository.findAll();
    }

    async findById(id) {
        return await TodoRepository.findById(id);
    }

    async update(id, todo) {
        return await TodoRepository.update(id, todo);
    }

    async delete(id) {
        return await TodoRepository.delete(id);
    }
}

module.exports = new TodoService();