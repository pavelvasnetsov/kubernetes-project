const Router = require('express');
const router = new Router();
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const {body} = require('express-validator');

router.post(
    '/registration',
    body('name', 'Miss value').exists(),
    body('password', 'Invalid lenght of password').isLength({min: 3, max: 32}), 
    body('login', 'Invalid lenght of username').isLength({min: 3, max: 32}), 
    userController.registration
);
router.post(
    '/login',
    body('password', 'Miss value').exists(), 
    body('login', 'Miss value').exists(), 
    userController.login
);
router.get(
    '/logout', 
    authMiddleware,
    userController.logout
);
router.get(
    '/refresh', 
    userController.refresh
);

module.exports = router;