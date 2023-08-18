class Task {
    constructor(name, description, prority, dueDate = 'No date') {
        this.name = name;
        this.description = description;
        this.prority = prority;
        this.dueDate = dueDate;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    setPrority(prority) {
        this.prority = prority;
    }

    getPrority() {
        return this.prority;
    }

    setDate(dueDate) {
        this.dueDate = dueDate;
    }

    getDate() {
        return this.dueDate;
    }
}

export default Task;