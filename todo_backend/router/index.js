const Router = require('express').Router;
const router = new Router();
const userRouter = require('./user-router');
const todoRouter = require('./todo-router');

router.use('/auth', userRouter);
router.use('/todos', todoRouter);


module.exports = router;