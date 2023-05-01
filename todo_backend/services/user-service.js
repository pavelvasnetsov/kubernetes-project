const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user-dto');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');
const { User } = require('../models/pg-models');

class UserService {
    async registration(login, password, name, surname) {        
        surname = surname ? surname : "";

        const candidate = await User.findOne({where: {login}});
        if (candidate) {
            throw ApiError.BadRequest(`User with login ${login} already exists`);
        }

        const hashedPassword = await bcrypt.hash(password, 3);

        const user = await User.create({
            login,
            password: hashedPassword,
            name,
            surname
        });

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({
            id: userDto.id,
            login: userDto.login
        });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async login(login, password) {
        const user = await User.findOne({where: {login}});
        if (!user) {
            throw ApiError.BadRequest(`User with login ${login} doesn't exist`);
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid password');
        }

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({
            id: userDto.id,
            login: userDto.login
        });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            return refreshToken;
        }
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await User.findByPk(userData.id);
        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({
            id: userDto.id,
            login: userDto.login
        });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();