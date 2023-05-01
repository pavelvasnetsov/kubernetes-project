class TodoDto {
    id;
    title;
    completed;

    constructor(model) {
        this.id = model.id;
        this.title = model.title;
        this.completed = model.completed;
    }
}

module.exports = TodoDto;