const { Todo } = require('../models');

class TodoRepository {
    async create(todo) {
        return await Todo.create(todo);
    }

    async findAll() {
        return await Todo.findAll();
    }

    async findById(id) {
        return await Todo.findByPk(id);
    }

    async update(id, todo) {
        return await Todo.update(todo, {
            where: { id },
        });
    }

    async delete(id) {
        return await Todo.destroy({
            where: { id },
        });
    }
}

module.exports = new TodoRepository();