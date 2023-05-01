const Router = require('express');
const router = new Router();
const todoController = require('../controllers/todo-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const {body, param} = require('express-validator');

router.get(
    '',
    authMiddleware,
    todoController.getAllTodos
);
router.post(
    '',
    body('title').exists(),
    body('completed').exists(),
    authMiddleware,
    todoController.createTodo
);
router.put(
    '/:id',
    param('id', 'ID parameter should be a number').isNumeric(),
    body('title').exists(),
    body('completed').exists(),
    authMiddleware,
    todoController.editTodo
);
router.delete(
    '/:id',
    param('id', 'ID parameter should be a number').isNumeric(),
    authMiddleware,
    todoController.deleteTodo
)

module.exports = router;