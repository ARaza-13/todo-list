class Task {
    constructor(name, description, dueDate = 'No date', projectId, taskId) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.projectId = projectId;
        this.taskId = taskId;
        this.important = false;
        this.completed = false;
    }

    editTask(name, description, dueDate = 'No date') {
        this.name = name;
        this.description = description;
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

    setDate(dueDate) {
        this.dueDate = dueDate;
    }

    getDate() {
        return this.dueDate;
    }

    getDateFormatted() {
        return Date.parse(this.dueDate);
    }

    setNextTaskId(taskId) {
        this.taskId = taskId;
    }

    setComplete() {
        if (!this.completed) {
            this.completed = true;
        } else {
            this.completed = false;
        }
    }

    setImportant() {
        if (!this.important) {
            this.important = true;
        } else {
            this.important = false;
        }
    }
}

export default Task;