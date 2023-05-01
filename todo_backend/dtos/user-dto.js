class UserDto {
    id;
    login;
    name;
    surname;

    constructor(model) {
        this.id = model.id;
        this.login = model.login;
        this.name = model.name;
        this.surname = model.surname;
    }
}

module.exports = UserDto;