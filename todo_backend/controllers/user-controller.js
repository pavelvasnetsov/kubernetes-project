const userService = require('../services/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';

class UserConroller{
    async registration(request, response, next) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(
                    'Validation error',
                    errors.array()
                ))
            }

            const {login, password, name, surname} = request.body;
            const userData = await userService.registration(login, password, name, surname);

            response.cookie(
                REFRESH_TOKEN_COOKIE_NAME, 
                userData.refreshToken, 
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                }
            );

            return response.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(request, response, next) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(
                    'Required fields are missing',
                    errors.array()
                ))
            }

            const {login, password} = request.body;
            const userData = await userService.login(login, password);

            response.cookie(
                REFRESH_TOKEN_COOKIE_NAME, 
                userData.refreshToken, 
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                }
            );

            return response.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(request, response, next) {
        try {
            const {refreshToken} = request.cookies;
            const token = await userService.logout(refreshToken);

            response.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

            return response.status(200).json({
                success: true
            });
        } catch (e) {
            next(e);
        }
    }

    async refresh(request, response, next) {
        try {
            const {refreshToken} = request.cookies;
            const userData = await userService.refresh(refreshToken);

            response.cookie(
                REFRESH_TOKEN_COOKIE_NAME, 
                userData.refreshToken, 
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                }
            );
            
            return response.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserConroller();