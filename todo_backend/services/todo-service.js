const ApiError = require('../exceptions/api-error');
const TodoDto = require('../dtos/todo-dto');
const { Todo } = require('../models/pg-models');

class TodoService {
    async getAllTodos(userId) {
        const usersTodos = await Todo.findAll({where: {userId}});
        usersTodos.sort((t1, t2) => t2.createdAt - t1.createdAt)
        return usersTodos.map(todo => new TodoDto(todo));
    }

    async createTodo(userId, title, completed) {
        const usersTodo = await Todo.create({
            userId,
            title,
            completed
        });

        return new TodoDto(usersTodo);
    }

    async editTodo(userId, todoId, title, completed) {
        const [ countOfUpdatedTodos ] = await Todo.update({
            title,
            completed
        }, {
            where: {
                id: todoId,
                userId
            }
        });

        if (!countOfUpdatedTodos) {
            throw ApiError.BadRequest(`There isn't todo with ID ${todoId} for user with ID ${userId}`);
        }

        const editedTodo = await Todo.findOne({
            where: {
                id: todoId
            }
        });

        return new TodoDto(editedTodo);
    }

    async deleteTodo(userId, todoId) {
        const deletedTodo = await Todo.findOne({
            where: {
                id: todoId,
                userId
            }
        });

        if (!deletedTodo) {
            throw ApiError.BadRequest(`There isn't todo with ID ${todoId} for user with ID ${userId}`);
        }

        const countDeletedTodos = await Todo.destroy({
            where: {
                id: todoId,
                userId
            }
        });

        return new TodoDto(deletedTodo);
    }
}

module.exports = new TodoService()