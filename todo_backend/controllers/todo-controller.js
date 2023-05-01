const todoService = require('../services/todo-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class TodoController {
    async getAllTodos(request, response, next) {
        try {
            const { id: userId } = request.user;

            const todos = await todoService.getAllTodos(userId);
            return response.json(todos);
        } catch (e) {
            next(e);
        }
    }

    async createTodo(request, response, next) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(
                    'Required fields are missing',
                    errors.array()
                ))
            }

            const { id: userId } = request.user;
            const { title, completed } = request.body;

            const todos = await todoService.createTodo(userId, title, completed);
            return response.json(todos);
        } catch (e) {
            next(e);
        }
    }

    async editTodo(request, response, next) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(
                    'Required fields are missing',
                    errors.array()
                ))
            }

            const { id: userId } = request.user;
            const { title, completed } = request.body;
            const { id: todoId } = request.params;

            const todos = await todoService.editTodo(userId, todoId, title, completed);
            return response.json(todos);
        } catch (e) {
            next(e);
        }
    }

    async deleteTodo(request, response, next) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(
                    'Required fields are missing',
                    errors.array()
                ))
            }
            const { id: userId } = request.user;
            const { id: todoId } = request.params;

            const todos = await todoService.deleteTodo(userId, todoId);
            return response.json(todos);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TodoController();