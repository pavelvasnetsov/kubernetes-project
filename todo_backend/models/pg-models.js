const sequelize = require('../config_db/postgresql_db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    surname: {
        type: DataTypes.STRING,
        defaultValue: ''
    }
});

const Token = sequelize.define('token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    refreshToken: {
        type: DataTypes.STRING
    }
});

const Todo = sequelize.define('todo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }    
})

User.hasMany(Token);
Token.belongsTo(User);

User.hasMany(Todo);
Todo.belongsTo(User);

module.exports = {
    User,
    Token,
    Todo
};